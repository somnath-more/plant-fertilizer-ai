# Deployment Implementation Plan

Goal: Implement the user-approved GitHub Actions / GHCR / Compose strategy.
Architecture: Separate reusable frontend and backend CI/publish workflows; one coordinator gates staging and production on both. Release-specific runtime configuration travels over verified SSH, with application rollback.

- [x] Split CI and publishing; check feature pushes and PRs, publish only main SHA images.
- [x] Add Compose, runtime template, secure transfer, readiness and rollback scripts.
- [x] Document GitHub environments, server prerequisites and limitations.
- [x] Validate Compose interpolation, workflow structure, script syntax and rollback behavior where tools permit.

Constraints: No live deployment, no credentials in images, preserve unrelated changes. External MySQL databases must be provisioned separately. Existing automatic Hibernate schema updates mean image rollback cannot reverse schema changes.

Validation: Compose interpolation and workflow assertions passed; Bash syntax and mocked success/rollback/cleanup passed. Live Docker engine unavailable. Existing ESLint configuration fails before linting. No live deployment or full Maven suite executed.
