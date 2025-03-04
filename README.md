# Asset Price Checker

This project is a monorepo-based application designed for scalability and maintainability, built with a focus on modern practices. The backend API service is implemented using NestJS and provides an easy-to-use interface for checking asset prices across Stocks, and cryptocurrencies. The application leverages Turborepo for efficient development, yahoo-finance2 for fetching financial data, and is optimized with Docker for consistent environments and image optimization for faster loading times.


## Tech Stack
- **NestJS**: A framework for building efficient, reliable, and scalable server-side applications.
- **Turborepo**: A high-performance build system for JavaScript and TypeScript codebases, helping us manage multiple applications and libraries within the monorepo.
- **yahoo-finance2**: A library for fetching real-time and historical financial data, including stocks, crypto, and other assets.
- **Docker Compose**: Used for containerizing the app, ensuring consistent environments and easy deployment.
- **Image Optimization**: Optimizing images to reduce size and improve performance.
- **Caching**: Implemented to improve API performance by caching responses and reducing unnecessary network calls.
- **pnpm**: A fast and disk-efficient package manager for JavaScript.

## Features

- **Real-time Price Check**: Fetch real-time asset prices for Stocks and cryptocurrencies using the Yahoo Finance API.
- **Caching**: Optimized caching layer to reduce redundant API calls and improve response times.
- **Image Optimization**: Built-in image optimization for faster load times and reduced bandwidth usage.
- **Scalable Architecture**: Built with a monorepo setup to scale easily and manage multiple services.

## Getting Started

### Prerequisites

- Docker
- Node.js (preferably LTS version)
- pnpm (installed globally or via `corepack`)

### Start the Services

To start the backend service and other associated containers, run the following command:

```bash
docker compose up -d
```

This will set up the app and make it available at `http://localhost:8080`.

### Postman Collection

For testing and interacting with the API, you can import the provided Postman collection:

```bash
./postman-collection/Assets-Price-Checker.postman_collection.json
```

### API Documentation

The API documentation is available at:

[API Docs](http://localhost:8080/api)

**Note**: Ensure that the service is up and running before accessing the API documentation.

---


The app should be up and running at [http://localhost:8080](http://localhost:8080).

## Directory Structure

```
├── apps
│   └── backend       # NestJS backend API service
├── postman-collection
│   └── Assets-Price-Checker.postman_collection.json # Postman collection for testing
└── package.json      # Monorepo package manager configuration
└── turbo.json        # turbo configuration
```

Feel free to extend the API and add new services as the project grows. We use **Turborepo** for efficient handling of multiple packages, making it easy to scale and manage.

---

### Development Workflow

1. **Install Dependencies**: Use pnpm to install project dependencies.

   ```bash
   pnpm install
   ```

2. **Run Development Server**: If you'd like to run the backend in development mode, use the following command:

   ```bash
   cd apps/backend
   pnpm run dev
   ```

3. **Build Project**: For production build, use:

   ```bash
   pnpm run build
   ```

---

### Notes

- The backend service is containerized using Docker for consistent deployment environments.
- **Image Optimization**: Image assets are optimized for performance.
- **Caching**: Response caching has been implemented to enhance the performance of frequent requests.
- And last one add unit test for coverage all line
---

Let me know if you'd like further improvements or additions!