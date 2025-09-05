# IT Source

React, TypeScript and Vite project.

## Prerequisites

- Node.js 20 or newer
- npm

## Getting started

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/IT-Source.git
   cd IT-Source
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   The app reads the API base URL from `.env` files. For development you can use:

   ```
   VITE_API_BASE=/api
   ```

   Copy `.env.development` to `.env` and adjust if required.

4. **Run in development mode**

   ```bash
   npm run dev
   ```

   The site will be available at [http://localhost:5173](http://localhost:5173).

5. **Create a production build**

   ```bash
   npm run build
   ```

6. **Preview the production build**

   ```bash
   npm run preview
   ```

## Useful scripts

- `npm run lint` – run ESLint to check the code.

