# Implementation Plan: Coolify Image Storage Setup

## 🎯 Goal
Configure a storage service (MinIO or Garage) on the user's Coolify instance (`https://coolify.ddmedia.com.br/`) to host public images (avatars, etc.) with accessible URLs.

## 🛠️ Proposed Tech Stack
- **Service**: MinIO (Recommended) or Garage.
- **Access**: S3-compatible API.
- **Protocol**: HTTPS via Coolify's built-in reverse proxy.

## 📋 Task List

### Phase 1: Access & Discovery
- [ ] Obtain login credentials from the USER for `https://coolify.ddmedia.com.br/`.
- [ ] Access the Coolify dashboard and verify the available resources.

### Phase 2: Deployment
- [ ] Deploy **MinIO** (or Garage) as a new service.
- [ ] Configure environment variables (Root User, Root Password).
- [ ] Set up a persistent volume for data.
- [ ] Assign a subdomain (e.g., `storage.ddmedia.com.br` or a Coolify-generated one).

### Phase 3: Configuration
- [ ] Create a new bucket (e.g., `public-assets`).
- [ ] Set bucket policy to **Public** (Read-Only) to allow direct image URLs.
- [ ] Configure CORS (if needed for frontend uploads).

### Phase 4: Verification
- [ ] Upload a test image via the MinIO Console.
- [ ] Verify image access via public URL (e.g., `https://storage.ddmedia.com.br/public-assets/test.png`).
- [ ] Provide the USER with the API credentials (Access Key, Secret Key) for app integration.

## ⚠️ Requirements
- **Coolify Credentials**: Email and Password.
- **DNS (Optional)**: Access to point a subdomain if the user wants a premium URL.

## 🔄 Status Tracker
- **Status**: [PLANNING]
- **Current Step**: Waiting for credentials.
