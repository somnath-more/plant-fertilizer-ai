# Deployment setup

## Release flow

Feature pushes and PRs targeting main run separate frontend.yml and backend.yml checks. A push to main runs release.yml, which calls both workflows, publishes all eight images with the full commit SHA, deploys staging, then deploys the same images to production. Configure production approval in GitHub; YAML alone does not require approval. Concurrent main releases are serialized (GitHub may replace older pending runs with newer ones).

## GitHub configuration

Create Settings > Environments > staging and production. Configure each with different values:

| Kind | Name | Value |
| --- | --- | --- |
| Variable | DEPLOY_HOST | Server DNS name or IPv4 address (SSH port 22) |
| Variable | DEPLOY_USER | Dedicated Linux deployment user |
| Secret | DEPLOY_SSH_KEY | Private SSH key; install its public key in the user's authorized_keys |
| Secret | SSH_KNOWN_HOSTS | Verified SSH known_hosts entry for that server; verify the fingerprint independently |
| Secret | RUNTIME_ENV | Entire contents of deploy/.env.example, filled with that environment's values |

RUNTIME_ENV contains AUTH_DB_URL, AUTH_DB_USERNAME, AUTH_DB_PASSWORD; PRODUCT_DB_URL, PRODUCT_DB_USERNAME, PRODUCT_DB_PASSWORD; ORDER_DB_URL, ORDER_DB_USERNAME, ORDER_DB_PASSWORD; BLOG_DB_URL, BLOG_DB_USERNAME, BLOG_DB_PASSWORD; JWT_SECRET; CLOUDFLARE_R2_ACCOUNT_ID, CLOUDFLARE_R2_ACCESS_KEY, CLOUDFLARE_R2_SECRET_KEY, CLOUDFLARE_R2_BUCKET_NAME, CLOUDFLARE_R2_PUBLIC_URL. Optional entries are GOOGLE_CLIENT_ID, INSTAGRAM_ACCESS_TOKEN, RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.

Use Docker Compose dotenv syntax (not shell commands), one entry per line. Single-quote values containing dollar signs or hashes. JWT_SECRET must be random and at least 32 bytes. Database URLs must point to an accessible external MySQL database, not localhost inside the container. Provision the four schemas and restricted users separately. Do not include IMAGE_TAG or IMAGE_PREFIX: the workflow adds them.

Set repository variable VITE_GOOGLE_CLIENT_ID if enabling browser Google sign-in. It is public and baked into the frontend image, and must work for both staging and production origins to promote one image. Backend GOOGLE_CLIENT_ID must match. Separate OAuth client IDs would require frontend runtime configuration; this is not implemented here.

GITHUB_TOKEN is supplied automatically. No GHCR personal access token is needed: the temporary job token is used to pull images and its Docker login is deleted on exit. Enable Actions package publishing and allow this repository to read its packages if needed.

Protect main: require the Frontend build and all seven backend Test checks before merging, block direct pushes, and require PR review as appropriate. Restrict both deployment Environments to main. Configure required reviewers for production; availability depends on repository visibility and GitHub plan. See https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments.

## Server preparation (once per server)

Use separate staging and production Linux servers. Install Docker Engine with Compose v2 supporting --wait, Bash, tar, coreutils and util-linux/flock. Give the deployment user Docker access (this is effectively administrator access), a writable home, and SSH access from your runner. Host-key verification is mandatory. A GitHub-hosted runner's IP addresses vary; choose an appropriate runner/network policy for your infrastructure.

Provision MySQL externally with backups and per-service users. Redis runs privately in Compose as a cache. Verify adequate RAM for seven JVMs and all containers. No database, Redis, registry, or backend ports are published. The frontend binds to 127.0.0.1:8080; configure a host reverse proxy with your domain and TLS to proxy to that address. Configure Google OAuth origins/callbacks and third-party credentials for each environment.

## How secrets reach containers

GitHub reads the selected Environment's RUNTIME_ENV. transfer.sh writes it to a temporary runner directory, adds the release SHA, and streams the deployment bundle through SSH stdin to a private server directory. deploy.sh passes runtime.env to Compose; Compose passes only the declared values to each service. Secrets never enter Docker builds or remote command arguments. There is no manually maintained server .env.

Successful releases retain runtime.env with owner-only permissions in ~/plant-deploy/releases; current records the active release directory. This is necessary for restart and rollback. Docker administrators can inspect container environment values. Restrict server access, rotate secrets in GitHub and redeploy to apply changes. Previous releases contain old credentials; apply an operator-defined retention policy without removing the current release or required rollback target. Do not run docker compose config without --quiet in CI because rendered configuration contains secrets.

## Deployment behavior and limits

The script validates configuration and pulls all images before replacing containers, waits for health checks, and restores the previous successful release on startup failure. First-deployment failure stops the new stack. Failed rollback reports an error. Container replacement can cause brief downtime.

Frontend and Redis health checks perform HTTP/Redis checks. Backend checks only verify listening TCP ports, not database readiness, Eureka routing or full business functionality. Add application readiness endpoints and end-to-end smoke tests before claiming production readiness.

Existing services use Hibernate ddl-auto=update. Application rollback DOES NOT reverse schema changes or external side effects. Back up databases and adopt reviewed backward-compatible migrations before schema-sensitive production releases. No migration framework or automatic database recovery is added by this change.

Images are built once from main; the frontend is currently built a second time inside its Dockerfile after the CI build. Frontend lint is not yet a release gate because the existing ESLint configuration fails with `Plugin "" not found`. This change does not provision servers, databases, DNS, TLS or GitHub Environment settings, and does not perform a live deployment.
