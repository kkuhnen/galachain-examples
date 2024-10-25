# React Example App for GalaChain

This React application serves as a demonstration of how to use the [GalaChain SDK](https://github.com/GalaChain/sdk) to connect and interact with GalaChain. It provides examples of connecting a wallet, registering a user, and fetching balances.

## Features

1. Demonstrates wallet connection using the `BrowserConnectClient`
1. Demonstrates checking if a user is registered using the `PublicKeyApi`
1. Demonstrates registering a user using `WalletUtils`
1. Demonstrates fetching a user's balances using the `TokenApi`

## Prerequisites

- Node.js 20.x or higher
- npm (>=10.x)
- A web3-compatible browser extension like MetaMask

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:GalaChain/examples.git
   ```
1. Change into the project directory:
   ```bash
   cd examples/react
   ```
1. Optional: use nvm to switch to the correct version of Node.js:
   ```bash
   nvm use
   ```
1. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Run the application
   - in development mode:
     ```bash
     npm run dev
     ```
   - in production mode:
     ```bash
     npm run build
     npm run preview
     ```
1. Open the application in your browser
   - http://localhost:5173 for dev mode
   - http://localhost:4173 for production mode
