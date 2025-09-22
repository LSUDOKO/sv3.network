import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { expect } from 'chai'
import hre from 'hardhat'
import { getAddress, keccak256, toBytes, encodePacked } from 'viem'

describe('DocumentRWA', function () {
  async function deployDocumentRWAFixture() {
    const [owner, user1, user2, user3] = await hre.viem.getWalletClients()
    
    const documentRWA = await hre.viem.deployContract('DocumentRWA')
    const publicClient = await hre.viem.getPublicClient()

    return { 
      documentRWA, 
      owner, 
      user1, 
      user2, 
      user3, 
      publicClient 
    }
  }

  describe('Deployment', function () {
    it('Should deploy with correct initial state', async function () {
      const { documentRWA } = await loadFixture(deployDocumentRWAFixture)
      
      expect(await documentRWA.read.name()).to.equal('DocumentRWA')
      expect(await documentRWA.read.symbol()).to.equal('DRWA')
      expect(await documentRWA.read.getActiveDocumentCount()).to.equal(0n)
      expect(await documentRWA.read.getTotalSignatureCount()).to.equal(0n)
    })
  })

  describe('Document Creation', function () {
    it('Should create a document successfully', async function () {
      const { documentRWA, user1, publicClient } = await loadFixture(deployDocumentRWAFixture)
      
      const title = 'Test Document'
      const description = 'Test Description'
      const ipfsHash = 'QmTestHash123456789012345678901234567890123456'
      const signers = [user1.account.address]
      
      const hash = await documentRWA.write.createDocument([
        title,
        description,
        ipfsHash,
        signers
      ], { account: user1.account })
      
      await publicClient.waitForTransactionReceipt({ hash })
      
      // Check document was created
      expect(await documentRWA.read.getActiveDocumentCount()).to.equal(1n)
      
      // Check document details
      const document = await documentRWA.read.getDocument([1n])
      expect(document[0]).to.equal(1n) // id
      expect(document[1]).to.equal(title)
      expect(document[2]).to.equal(description)
      expect(document[3]).to.equal(ipfsHash)
      expect(document[4]).to.equal(getAddress(user1.account.address)) // creator
      expect(document[5]).to.be.greaterThan(0n) // createdAt
      expect(document[6]).to.equal(false) // isDeleted
      
      // Check NFT was minted
      expect(await documentRWA.read.ownerOf([1n])).to.equal(getAddress(user1.account.address))
      expect(await documentRWA.read.balanceOf([user1.account.address])).to.equal(1n)
    })

    it('Should emit DocumentCreated event', async function () {
      const { documentRWA, user1, publicClient } = await loadFixture(deployDocumentRWAFixture)
      
      const title = 'Test Document'
      const description = 'Test Description'
      const ipfsHash = 'QmTestHash123456789012345678901234567890123456'
      const signers = [user1.account.address]
      
      const hash = await documentRWA.write.createDocument([
        title,
        description,
        ipfsHash,
        signers
      ], { account: user1.account })
      
      await publicClient.waitForTransactionReceipt({ hash })
      
      const events = await documentRWA.getEvents.DocumentCreated()
      expect(events).to.have.lengthOf(1)
      expect(events[0].args.id).to.equal(1n)
      expect(events[0].args.creator).to.equal(getAddress(user1.account.address))
    })

    it('Should revert with invalid IPFS hash', async function () {
      const { documentRWA, user1 } = await loadFixture(deployDocumentRWAFixture)
      
      const title = 'Test Document'
      const description = 'Test Description'
      const invalidIpfsHash = 'invalid_hash'
      const signers = [user1.account.address]
      
      await expect(
        documentRWA.write.createDocument([
          title,
          description,
          invalidIpfsHash,
          signers
        ], { account: user1.account })
      ).to.be.rejectedWith('Invalid IPFS hash')
    })

    it('Should revert with empty title', async function () {
      const { documentRWA, user1 } = await loadFixture(deployDocumentRWAFixture)
      
      const title = ''
      const description = 'Test Description'
      const ipfsHash = 'QmTestHash123456789012345678901234567890123456'
      const signers = [user1.account.address]
      
      await expect(
        documentRWA.write.createDocument([
          title,
          description,
          ipfsHash,
          signers
        ], { account: user1.account })
      ).to.be.rejectedWith('Title cannot be empty')
    })

    it('Should revert with no signers', async function () {
      const { documentRWA, user1 } = await loadFixture(deployDocumentRWAFixture)
      
      const title = 'Test Document'
      const description = 'Test Description'
      const ipfsHash = 'QmTestHash123456789012345678901234567890123456'
      const signers: string[] = []
      
      await expect(
        documentRWA.write.createDocument([
          title,
          description,
          ipfsHash,
          signers
        ], { account: user1.account })
      ).to.be.rejectedWith('At least one signer required')
    })
  })

  describe('Document Updates', function () {
    async function createDocumentFixture() {
      const fixture = await loadFixture(deployDocumentRWAFixture)
      const { documentRWA, user1, publicClient } = fixture
      
      const title = 'Test Document'
      const description = 'Test Description'
      const ipfsHash = 'QmTestHash123456789012345678901234567890123456'
      const signers = [user1.account.address]
      
      const hash = await documentRWA.write.createDocument([
        title,
        description,
        ipfsHash,
        signers
      ], { account: user1.account })
      
      await publicClient.waitForTransactionReceipt({ hash })
      
      return { ...fixture, documentId: 1n }
    }

    it('Should update document title', async function () {
      const { documentRWA, user1, documentId, publicClient } = await loadFixture(createDocumentFixture)
      
      const newTitle = 'Updated Title'
      
      const hash = await documentRWA.write.updateDocument([
        documentId,
        newTitle,
        'Test Description',
        'QmTestHash123456789012345678901234567890123456'
      ], { account: user1.account })
      
      await publicClient.waitForTransactionReceipt({ hash })
      
      const document = await documentRWA.read.getDocument([documentId])
      expect(document[1]).to.equal(newTitle)
    })

    it('Should emit DocumentUpdated event', async function () {
      const { documentRWA, user1, documentId, publicClient } = await loadFixture(createDocumentFixture)
      
      const newTitle = 'Updated Title'
      
      const hash = await documentRWA.write.updateDocument([
        documentId,
        newTitle,
        'Test Description',
        'QmTestHash123456789012345678901234567890123456'
      ], { account: user1.account })
      
      await publicClient.waitForTransactionReceipt({ hash })
      
      const events = await documentRWA.getEvents.DocumentUpdated()
      expect(events).to.have.lengthOf(1)
      expect(events[0].args.id).to.equal(documentId)
    })

    it('Should revert when non-owner tries to update', async function () {
      const { documentRWA, user2, documentId } = await loadFixture(createDocumentFixture)
      
      await expect(
        documentRWA.write.updateDocument([
          documentId,
          'Hacked Title',
          'Test Description',
          'QmTestHash123456789012345678901234567890123456'
        ], { account: user2.account })
      ).to.be.rejectedWith('Only document owner can perform this action')
    })

    it('Should revert for non-existent document', async function () {
      const { documentRWA, user1 } = await loadFixture(createDocumentFixture)
      
      await expect(
        documentRWA.write.updateDocument([
          999n,
          'Title',
          'Description',
          'QmTestHash123456789012345678901234567890123456'
        ], { account: user1.account })
      ).to.be.rejectedWith('Document does not exist')
    })
  })

  describe('Signer Management', function () {
    async function createDocumentFixture() {
      const fixture = await loadFixture(deployDocumentRWAFixture)
      const { documentRWA, user1, publicClient } = fixture
      
      const title = 'Test Document'
      const description = 'Test Description'
      const ipfsHash = 'QmTestHash123456789012345678901234567890123456'
      const signers = [user1.account.address]
      
      const hash = await documentRWA.write.createDocument([
        title,
        description,
        ipfsHash,
        signers
      ], { account: user1.account })
      
      await publicClient.waitForTransactionReceipt({ hash })
      
      return { ...fixture, documentId: 1n }
    }

    it('Should add signer successfully', async function () {
      const { documentRWA, user1, user2, documentId, publicClient } = await loadFixture(createDocumentFixture)
      
      const hash = await documentRWA.write.addSigner([
        documentId,
        user2.account.address
      ], { account: user1.account })
      
      await publicClient.waitForTransactionReceipt({ hash })
      
      expect(await documentRWA.read.isAuthorizedSigner([documentId, user2.account.address])).to.be.true
      expect(await documentRWA.read.getSignerCount([documentId])).to.equal(2n)
    })

    it('Should emit SignerAdded event', async function () {
      const { documentRWA, user1, user2, documentId, publicClient } = await loadFixture(createDocumentFixture)
      
      const hash = await documentRWA.write.addSigner([
        documentId,
        user2.account.address
      ], { account: user1.account })
      
      await publicClient.waitForTransactionReceipt({ hash })
      
      const events = await documentRWA.getEvents.SignerAdded()
      expect(events).to.have.lengthOf(1)
      expect(events[0].args.documentId).to.equal(documentId)
      expect(events[0].args.signer).to.equal(getAddress(user2.account.address))
    })

    it('Should remove signer successfully', async function () {
      const { documentRWA, user1, user2, documentId, publicClient } = await loadFixture(createDocumentFixture)
      
      // First add the signer
      let hash = await documentRWA.write.addSigner([
        documentId,
        user2.account.address
      ], { account: user1.account })
      await publicClient.waitForTransactionReceipt({ hash })
      
      // Then remove the signer
      hash = await documentRWA.write.removeSigner([
        documentId,
        user2.account.address
      ], { account: user1.account })
      await publicClient.waitForTransactionReceipt({ hash })
      
      expect(await documentRWA.read.isAuthorizedSigner([documentId, user2.account.address])).to.be.false
      expect(await documentRWA.read.getSignerCount([documentId])).to.equal(1n)
    })

    it('Should revert when adding existing signer', async function () {
      const { documentRWA, user1, documentId } = await loadFixture(createDocumentFixture)
      
      await expect(
        documentRWA.write.addSigner([
          documentId,
          user1.account.address
        ], { account: user1.account })
      ).to.be.rejectedWith('Address is already a signer')
    })

    it('Should revert when removing non-existent signer', async function () {
      const { documentRWA, user1, user2, documentId } = await loadFixture(createDocumentFixture)
      
      await expect(
        documentRWA.write.removeSigner([
          documentId,
          user2.account.address
        ], { account: user1.account })
      ).to.be.rejectedWith('Address is not a signer')
    })
  })

  describe('Document Signing', function () {
    async function createDocumentWithSignersFixture() {
      const fixture = await loadFixture(deployDocumentRWAFixture)
      const { documentRWA, user1, user2, user3, publicClient } = fixture
      
      const title = 'Test Document'
      const description = 'Test Description'
      const ipfsHash = 'QmTestHash123456789012345678901234567890123456'
      const signers = [user1.account.address, user2.account.address, user3.account.address]
      
      const hash = await documentRWA.write.createDocument([
        title,
        description,
        ipfsHash,
        signers
      ], { account: user1.account })
      
      await publicClient.waitForTransactionReceipt({ hash })
      
      return { ...fixture, documentId: 1n }
    }

    it('Should sign document successfully', async function () {
      const { documentRWA, user2, documentId, publicClient } = await loadFixture(createDocumentWithSignersFixture)
      
      // Create a signature (simplified for testing)
      const message = `Sign document ${documentId}`
      const signature = await user2.signMessage({ message })
      
      const hash = await documentRWA.write.signDocument([
        documentId,
        signature
      ], { account: user2.account })
      
      await publicClient.waitForTransactionReceipt({ hash })
      
      expect(await documentRWA.read.hasSignature([documentId, user2.account.address])).to.be.true
      expect(await documentRWA.read.getSignatureCount([documentId])).to.equal(1n)
    })

    it('Should emit DocumentSigned event', async function () {
      const { documentRWA, user2, documentId, publicClient } = await loadFixture(createDocumentWithSignersFixture)
      
      const message = `Sign document ${documentId}`
      const signature = await user2.signMessage({ message })
      
      const hash = await documentRWA.write.signDocument([
        documentId,
        signature
      ], { account: user2.account })
      
      await publicClient.waitForTransactionReceipt({ hash })
      
      const events = await documentRWA.getEvents.DocumentSigned()
      expect(events).to.have.lengthOf(1)
      expect(events[0].args.documentId).to.equal(documentId)
      expect(events[0].args.signer).to.equal(getAddress(user2.account.address))
    })

    it('Should revert when unauthorized user tries to sign', async function () {
      const { documentRWA, owner, documentId } = await loadFixture(createDocumentWithSignersFixture)
      
      const message = `Sign document ${documentId}`
      const signature = await owner.signMessage({ message })
      
      await expect(
        documentRWA.write.signDocument([
          documentId,
          signature
        ], { account: owner.account })
      ).to.be.rejectedWith('Not authorized to sign this document')
    })

    it('Should revert when signing twice', async function () {
      const { documentRWA, user2, documentId, publicClient } = await loadFixture(createDocumentWithSignersFixture)
      
      const message = `Sign document ${documentId}`
      const signature = await user2.signMessage({ message })
      
      // First signature
      let hash = await documentRWA.write.signDocument([
        documentId,
        signature
      ], { account: user2.account })
      await publicClient.waitForTransactionReceipt({ hash })
      
      // Second signature should fail
      await expect(
        documentRWA.write.signDocument([
          documentId,
          signature
        ], { account: user2.account })
      ).to.be.rejectedWith('Document already signed by this address')
    })
  })

  describe('Document Deletion', function () {
    async function createDocumentFixture() {
      const fixture = await loadFixture(deployDocumentRWAFixture)
      const { documentRWA, user1, publicClient } = fixture
      
      const title = 'Test Document'
      const description = 'Test Description'
      const ipfsHash = 'QmTestHash123456789012345678901234567890123456'
      const signers = [user1.account.address]
      
      const hash = await documentRWA.write.createDocument([
        title,
        description,
        ipfsHash,
        signers
      ], { account: user1.account })
      
      await publicClient.waitForTransactionReceipt({ hash })
      
      return { ...fixture, documentId: 1n }
    }

    it('Should delete document successfully', async function () {
      const { documentRWA, user1, documentId, publicClient } = await loadFixture(createDocumentFixture)
      
      const hash = await documentRWA.write.deleteDocument([documentId], { account: user1.account })
      await publicClient.waitForTransactionReceipt({ hash })
      
      const document = await documentRWA.read.getDocument([documentId])
      expect(document[6]).to.be.true // isDeleted
      
      expect(await documentRWA.read.getActiveDocumentCount()).to.equal(0n)
      
      // NFT should be burned
      await expect(
        documentRWA.read.ownerOf([documentId])
      ).to.be.rejectedWith('ERC721NonexistentToken')
    })

    it('Should emit DocumentDeleted event', async function () {
      const { documentRWA, user1, documentId, publicClient } = await loadFixture(createDocumentFixture)
      
      const hash = await documentRWA.write.deleteDocument([documentId], { account: user1.account })
      await publicClient.waitForTransactionReceipt({ hash })
      
      const events = await documentRWA.getEvents.DocumentDeleted()
      expect(events).to.have.lengthOf(1)
      expect(events[0].args.id).to.equal(documentId)
    })

    it('Should revert when non-owner tries to delete', async function () {
      const { documentRWA, user2, documentId } = await loadFixture(createDocumentFixture)
      
      await expect(
        documentRWA.write.deleteDocument([documentId], { account: user2.account })
      ).to.be.rejectedWith('Only document owner can perform this action')
    })
  })

  describe('Ownership Transfer', function () {
    async function createDocumentFixture() {
      const fixture = await loadFixture(deployDocumentRWAFixture)
      const { documentRWA, user1, publicClient } = fixture
      
      const title = 'Test Document'
      const description = 'Test Description'
      const ipfsHash = 'QmTestHash123456789012345678901234567890123456'
      const signers = [user1.account.address]
      
      const hash = await documentRWA.write.createDocument([
        title,
        description,
        ipfsHash,
        signers
      ], { account: user1.account })
      
      await publicClient.waitForTransactionReceipt({ hash })
      
      return { ...fixture, documentId: 1n }
    }

    it('Should transfer document ownership', async function () {
      const { documentRWA, user1, user2, documentId, publicClient } = await loadFixture(createDocumentFixture)
      
      const hash = await documentRWA.write.transferDocumentOwnership([
        documentId,
        user2.account.address
      ], { account: user1.account })
      
      await publicClient.waitForTransactionReceipt({ hash })
      
      expect(await documentRWA.read.ownerOf([documentId])).to.equal(getAddress(user2.account.address))
      
      const document = await documentRWA.read.getDocument([documentId])
      expect(document[4]).to.equal(getAddress(user2.account.address)) // creator field updated
    })

    it('Should revert when non-owner tries to transfer', async function () {
      const { documentRWA, user2, user3, documentId } = await loadFixture(createDocumentFixture)
      
      await expect(
        documentRWA.write.transferDocumentOwnership([
          documentId,
          user3.account.address
        ], { account: user2.account })
      ).to.be.rejectedWith('Only document owner can perform this action')
    })
  })

  describe('View Functions', function () {
    async function createMultipleDocumentsFixture() {
      const fixture = await loadFixture(deployDocumentRWAFixture)
      const { documentRWA, user1, user2, publicClient } = fixture
      
      // Create multiple documents
      for (let i = 0; i < 3; i++) {
        const hash = await documentRWA.write.createDocument([
          `Document ${i + 1}`,
          `Description ${i + 1}`,
          'QmTestHash123456789012345678901234567890123456',
          [user1.account.address]
        ], { account: user1.account })
        await publicClient.waitForTransactionReceipt({ hash })
      }
      
      return { ...fixture }
    }

    it('Should get user documents correctly', async function () {
      const { documentRWA, user1 } = await loadFixture(createMultipleDocumentsFixture)
      
      const userDocs = await documentRWA.read.getUserDocuments([user1.account.address])
      expect(userDocs).to.have.lengthOf(3)
      expect(userDocs[0]).to.equal(1n)
      expect(userDocs[1]).to.equal(2n)
      expect(userDocs[2]).to.equal(3n)
    })

    it('Should get signers correctly', async function () {
      const { documentRWA, user1, user2, publicClient } = await loadFixture(createMultipleDocumentsFixture)
      
      // Add user2 as signer to document 1
      const hash = await documentRWA.write.addSigner([
        1n,
        user2.account.address
      ], { account: user1.account })
      await publicClient.waitForTransactionReceipt({ hash })
      
      const signers = await documentRWA.read.getSigners([1n])
      expect(signers).to.have.lengthOf(2)
      expect(signers).to.include(getAddress(user1.account.address))
      expect(signers).to.include(getAddress(user2.account.address))
    })

    it('Should return correct counts', async function () {
      const { documentRWA } = await loadFixture(createMultipleDocumentsFixture)
      
      expect(await documentRWA.read.getActiveDocumentCount()).to.equal(3n)
      expect(await documentRWA.read.getTotalSignatureCount()).to.equal(0n)
    })
  })
})