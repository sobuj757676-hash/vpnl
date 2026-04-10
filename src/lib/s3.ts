import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { env } from './env'

const s3Client = new S3Client({
  region: env.S3_REGION || process.env.S3_REGION || 'us-east-1',
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY_ID || process.env.S3_ACCESS_KEY_ID || '',
    secretAccessKey: env.S3_SECRET_ACCESS_KEY || process.env.S3_SECRET_ACCESS_KEY || '',
  },
  // If using Cloudflare R2 or MinIO
  endpoint: env.S3_ENDPOINT || process.env.S3_ENDPOINT,
  forcePathStyle: !!(env.S3_FORCE_PATH_STYLE || process.env.S3_FORCE_PATH_STYLE),
})

const BUCKET_NAME = env.S3_BUCKET_NAME || process.env.S3_BUCKET_NAME || 'vpn-assets'

export const generatePresignedUploadUrl = async (key: string, contentType: string, expiresIn = 3600): Promise<string> => {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  })

  return await getSignedUrl(s3Client, command, { expiresIn })
}

export const generatePresignedDownloadUrl = async (key: string, expiresIn = 3600): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  })

  return await getSignedUrl(s3Client, command, { expiresIn })
}

export const deleteFile = async (key: string): Promise<void> => {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  })

  await s3Client.send(command)
}

export default s3Client
