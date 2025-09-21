import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to IPFS using Pinata or other IPFS service
    const pinataApiKey = process.env.PINATA_API_KEY
    const pinataSecretKey = process.env.PINATA_SECRET_KEY

    if (!pinataApiKey || !pinataSecretKey) {
      return NextResponse.json({ error: 'IPFS configuration missing' }, { status: 500 })
    }

    const formDataForPinata = new FormData()
    formDataForPinata.append('file', new Blob([buffer]), file.name)
    
    const metadata = JSON.stringify({
      name: file.name,
      keyvalues: {
        uploadedAt: new Date().toISOString(),
        fileType: file.type,
        fileSize: file.size.toString()
      }
    })
    formDataForPinata.append('pinataMetadata', metadata)

    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        'pinata_api_key': pinataApiKey,
        'pinata_secret_api_key': pinataSecretKey,
      },
      body: formDataForPinata,
    })

    if (!response.ok) {
      throw new Error('Failed to upload to IPFS')
    }

    const result = await response.json()
    
    return NextResponse.json({
      success: true,
      ipfsHash: result.IpfsHash,
      ipfsUrl: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type
    })

  } catch (error) {
    console.error('IPFS upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file to IPFS' },
      { status: 500 }
    )
  }
}