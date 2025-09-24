import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Accept any metadata payload and pin it to IPFS
    const body = await request.json()

    // Upload metadata to IPFS
    const pinataApiKey = process.env.PINATA_API_KEY
    const pinataSecretKey = process.env.PINATA_SECRET_KEY

    if (!pinataApiKey || !pinataSecretKey) {
      return NextResponse.json({ error: 'IPFS configuration missing' }, { status: 500 })
    }

    // Determine a friendly name for pin metadata (optional)
    const metaName = (body?.title || body?.name || 'document') as string

    const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'pinata_api_key': pinataApiKey,
        'pinata_secret_api_key': pinataSecretKey,
      },
      body: JSON.stringify({
        pinataContent: body,
        pinataMetadata: {
          name: `${metaName}-metadata`,
          keyvalues: {
            type: 'document-metadata',
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
      metadata: body,
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