import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { documentId, title, description, ipfsHash, signers, creator } = await request.json()

    if (!documentId || !title || !ipfsHash || !creator) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create metadata object for IPFS
    const metadata = {
      name: title,
      description: description || '',
      image: `https://gateway.pinata.cloud/ipfs/${ipfsHash}`,
      attributes: [
        {
          trait_type: 'Document Type',
          value: 'Legal Document'
        },
        {
          trait_type: 'Creator',
          value: creator
        },
        {
          trait_type: 'Signers Count',
          value: signers?.length || 0
        },
        {
          trait_type: 'Created At',
          value: new Date().toISOString()
        }
      ],
      properties: {
        documentId,
        ipfsHash,
        signers: signers || [],
        creator,
        createdAt: new Date().toISOString(),
        status: 'pending'
      }
    }

    // Upload metadata to IPFS
    const pinataApiKey = process.env.PINATA_API_KEY
    const pinataSecretKey = process.env.PINATA_SECRET_KEY

    if (!pinataApiKey || !pinataSecretKey) {
      return NextResponse.json({ error: 'IPFS configuration missing' }, { status: 500 })
    }

    const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'pinata_api_key': pinataApiKey,
        'pinata_secret_api_key': pinataSecretKey,
      },
      body: JSON.stringify({
        pinataContent: metadata,
        pinataMetadata: {
          name: `${title}-metadata`,
          keyvalues: {
            type: 'document-metadata',
            documentId: documentId.toString()
          }
        }
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to upload metadata to IPFS')
    }

    const result = await response.json()
    
    return NextResponse.json({
      success: true,
      metadataHash: result.IpfsHash,
      metadataUrl: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`,
      metadata
    })

  } catch (error) {
    console.error('Metadata upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload metadata to IPFS' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const ipfsHash = searchParams.get('hash')

    if (!ipfsHash) {
      return NextResponse.json({ error: 'IPFS hash required' }, { status: 400 })
    }

    const response = await fetch(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch metadata from IPFS')
    }

    const metadata = await response.json()
    
    return NextResponse.json({
      success: true,
      metadata
    })

  } catch (error) {
    console.error('Metadata fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch metadata from IPFS' },
      { status: 500 }
    )
  }
}