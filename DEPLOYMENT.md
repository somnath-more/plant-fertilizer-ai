# Container builds and publishing

GitHub Actions checks the frontend build and runs `mvn verify` for all seven backend services on pull requests and pushes to `main`. After a successful push to `main`, it publishes eight images to GitHub Container Registry (GHCR):

- `ghcr.io/somnath-more/plant-fertilizer-ai/frontend`
- `ghcr.io/somnath-more/plant-fertilizer-ai/api-gateway`
- `ghcr.io/somnath-more/plant-fertilizer-ai/auth-service`
- `ghcr.io/somnath-more/plant-fertilizer-ai/blog-service`
- `ghcr.io/somnath-more/plant-fertilizer-ai/image-storage-service`
- `ghcr.io/somnath-more/plant-fertilizer-ai/order-service`
- `ghcr.io/somnath-more/plant-fertilizer-ai/product-service`
- `ghcr.io/somnath-more/plant-fertilizer-ai/service-registry`

Each image receives `latest` and `sha-<short commit>` tags. Publishing uses the workflow's `GITHUB_TOKEN` and requires no personal access token. GHCR may keep new packages private until their visibility is changed in package settings. This workflow publishes images; it does not deploy them to a server.

Build locally from the repository root:

```sh
docker build -t plant-frontend ./frontend
docker build -f backend/Dockerfile --build-arg SERVICE=product-service -t plant-product-service ./backend
```

Replace `product-service` with any of the seven service folder names to build another backend image. The frontend image listens on port 80. Set `API_GATEWAY_URL` to the gateway's reachable URL when running it; its default is `http://api-gateway:8080`. The frontend sends requests to `/api/v1`, which Nginx forwards to that gateway. For local Vite development, the dev server forwards `/api` to `http://localhost:8080`.

Backend credentials are supplied when containers run, never as Docker build arguments. Auth and the gateway must receive the same `JWT_SECRET` (at least 32 bytes for HS256). The four database services (`auth-service`, `blog-service`, `order-service`, and `product-service`) use `DB_URL`, `DB_USERNAME`, and `DB_PASSWORD`. They can also use `REDIS_HOST`, `REDIS_PORT`, and `EUREKA_URL`. The gateway and image-storage service use `EUREKA_URL`; the registry listens on port 8761. Use the hostname of the database, Redis, and registry container in these URLs rather than `localhost` when they run on the same Docker network.

Additional runtime settings are `GOOGLE_CLIENT_ID` and `INSTAGRAM_ACCESS_TOKEN` for auth, `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` for orders, `PRODUCT_SERVICE_BASE_URL` for the order-to-product call, and `IMAGE_STORAGE_URL` for the product-to-image call. Image storage requires `CLOUDFLARE_R2_ACCOUNT_ID`, `CLOUDFLARE_R2_ACCESS_KEY`, `CLOUDFLARE_R2_SECRET_KEY`, `CLOUDFLARE_R2_BUCKET_NAME`, and `CLOUDFLARE_R2_PUBLIC_URL`. Set the optional repository variable `VITE_GOOGLE_CLIENT_ID` before publishing the frontend to enable Google sign-in; this is a public OAuth client identifier and is included in browser assets.

Local `.env` and `.env.*` files are ignored by Git and excluded from Docker build contexts. Keep real credentials in a runtime secret store or a local ignored environment file. Previously committed credentials still exist in Git history and must be rotated and removed from the pushed commits if GitHub push protection rejects them.
