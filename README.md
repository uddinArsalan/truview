# Truview

A modern social media platform focused on real-time engagement and seamless user experiences.

## Overview

Truview enables users to share, interact, and engage through a dynamic feed system. Built with performance and scalability in mind, it offers real-time updates and secure content management.

## Key Features

* **Dynamic Feed System**
  * Infinite scroll functionality
  * Smart pagination for optimal performance
  * Real-time post updates

* **Interactive Engagement**
  * Like and comment on posts
  * Track post interactions
  * Real-time notification system

* **Secure & Robust**
  * Auth0 authentication
  * Secure file uploads via Backblaze + Cloudflare
  * Type-safe development with TypeScript

## Tech Stack

### Frontend
* Next.js
* Tailwind CSS
* Shadcn UI Components
* React Query
* Radix UI
* Axios

### Backend & Data
* Next.js API Routes
* Prisma ORM
* Vercel PostgreSQL
* Auth0
* Backblaze (File Storage)
* Cloudflare (CDN)

## Installation

```shell
# Clone the repository
git clone https://github.com/uddinArsalan/truview.git

# Navigate to project directory
cd truview

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Run development server
pnpm run dev
```

## Environment Variables

Create a `.env.local` file with the following:

```env

POSTGRES_DATABASE=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_HOST=
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=

AUTH0_SECRET=
AUTH0_BASE_URL=
AUTH0_ISSUER_BASE_URL=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
AUTH0_MANAGEMENT_CLIENT_ID=
AUTH0_MANAGEMENT_CLIENT_SECRET=

BACKBLAZE_BUCKET_ID=
BACKBLAZE_KEY_ID=
BACKBLAZE_APP_KEY=

```

## Roadmap

- [ ] WebSocket integration for real-time updates
- [ ] Comprehensive unit test coverage
- [ ] CI/CD pipeline implementation
- [ ] Enhanced user profiles
- [ ] Advanced content moderation

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch:
    ```shell
    git checkout -b feature/AmazingFeature
    ```
3. Commit your changes:
    ```shell
    git commit -m 'Add some AmazingFeature'
    ```
4. Push to the branch:
    ```shell
    git push origin feature/AmazingFeature
    ```
5. Open a Pull Request


## Contact

Project Link: [Truview](https://truview-one.vercel.app/)

---

Built with ♥ using Next.js and TypeScript