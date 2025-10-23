// AWS Configuration
// TODO: Replace with your actual AWS credentials and region

export const AWS_CONFIG = {
  region: 'us-east-1', // Replace with your region
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY || '',
  },
}

export const DYNAMODB_TABLES = {
  INVOICES: import.meta.env.VITE_DYNAMODB_INVOICES_TABLE || 'invoices',
  SETTINGS: import.meta.env.VITE_DYNAMODB_SETTINGS_TABLE || 'user-settings',
}

export const S3_CONFIG = {
  bucket: import.meta.env.VITE_S3_BUCKET || 'invoice-pdfs',
  region: AWS_CONFIG.region,
}
