# Country Information Application

## Documentation

This document provides instructions on how to install, run, and test the Country information application.

### Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing the Application](#testing-the-application)
- [Environment Variables](#environment-variables)

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/FedeHerrera/CountryInfo.git
   ```

2. Navigate to the backend folder and install dependencies:

   ```bash
   cd countryinfo/backend
   npm install
   ```

3. Navigate to the frontend folder and install dependencies:

   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. Ensure you have the necessary environment variables set up.

   - Create a `.env` file in the `backend` directory and add the following:

     ```
     COUNTRY_API_URL=<your_country_api_url>
     POPULATION_API_URL=<your_population_api_url>
     ```

     Replace `<your_country_api_url>` and `<your_population_api_url>` with the appropriate URLs for your APIs.

   - Create a `.env` file in the `frontend` directory and add:

     ```
     NEXT_PUBLIC_BACKEND_URL=<your_public_backend_url>
     ```

2. Start the backend server:

   ```bash
   cd ../backend
   npm run dev
   ```

3. In a new terminal, start the frontend application:

   ```bash
   cd ../frontend
   npm run dev
   ```

4. Open your browser and navigate to [http://localhost:3000] to view the application.

### Testing the Application

You can test the application by going to http://localhost:3000 after setting the back-end and front-end up.

### Environment Variables

The following environment variables must be set for the application to function properly:

- **Backend:**
  - `COUNTRY_API_URL`: The API URL for country information.
  - `POPULATION_API_URL`: The API URL for population data.

- **Frontend:**
  - `NEXT_PUBLIC_BACKEND_URL`: The URL of your backend server (e.g., `http://localhost:3001`).
