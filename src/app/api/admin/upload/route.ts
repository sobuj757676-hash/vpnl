import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'auto', // e.g. 'us-east-1' or 'auto' for R2
  endpoint: process.env.AWS_ENDPOINT_URL_S3, // e.g. 'https://<account_id>.r2.cloudflarestorage.com'
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/svg+xml',
];

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folder = formData.get('folder') as string || 'uploads';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only JPEG, PNG, WEBP, AVIF, and SVG are allowed.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let uploadBuffer: Buffer | Uint8Array = buffer;
    let contentType = file.type;
    let extension = file.name.split('.').pop()?.toLowerCase() || '';

    // Auto-convert to WebP if not SVG, WEBP or AVIF
    if (!['image/svg+xml', 'image/webp', 'image/avif'].includes(file.type)) {
      uploadBuffer = await sharp(buffer)
        .webp({ quality: 80 })
        .toBuffer();
      contentType = 'image/webp';
      extension = 'webp';
    }

    const fileName = `${uuidv4()}.${extension}`;
    const key = `${folder}/${fileName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME || '',
      Key: key,
      Body: uploadBuffer,
      ContentType: contentType,
      // ACL: 'public-read' // Omit if using bucket policies or R2 public buckets
    });

    await s3Client.send(command);

    // Construct the public URL based on the storage provider's public domain
    const publicDomain = process.env.NEXT_PUBLIC_S3_DOMAIN || `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com`;
    const fileUrl = `${publicDomain}/${key}`;

    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
