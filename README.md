# 🎮 Tic Tac Toe on the Blockchain

A decentralized Tic Tac Toe game built with Next.js, Hardhat, and Scaffold-ETH 2. Play against your friends on the Sepolia testnet!

## 🚀 Features

- 🎯 Play Tic Tac Toe on the blockchain
- 🔗 Create games by connecting with opponent's wallet address
- 🔄 Real-time game state updates
- 📱 Mobile-friendly responsive design
- 🔒 Secure and transparent gameplay
- 📤 Share game links with friends

## 🛠️ Tech Stack

- **Frontend**: Next.js, TailwindCSS
- **Smart Contract**: Solidity
- **Development**: Hardhat, Scaffold-ETH 2
- **Network**: Sepolia Testnet
- **Wallet Integration**: wagmi, viem

## 🏗️ Getting Started

### Prerequisites

- Node.js (v16+)
- pnpm
- MetaMask or any Web3 wallet
- Sepolia testnet ETH

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/tic-tac-toe.git
cd tic-tac-toe
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. In a new terminal, start the local blockchain:

```bash
pnpm chain
```

5. Deploy the smart contract:

```bash
pnpm deploy
```

## 🎮 How to Play

1. Connect your wallet (MetaMask or any Web3 wallet)
2. Get some Sepolia testnet ETH from a faucet
3. Create a new game by entering your opponent's wallet address
4. Share the game link with your opponent
5. Take turns making moves on the board
6. The first player to get three in a row wins!

## 📝 Smart Contract

The game is powered by a Solidity smart contract that handles:

- Game creation
- Move validation
- Win condition checking
- Game state management

## 🔧 Development

### Project Structure

```
├── packages/
│   ├── nextjs/          # Frontend application
│   └── hardhat/         # Smart contract development
├── contracts/           # Solidity smart contracts
└── scripts/            # Deployment and utility scripts
```

### Available Scripts

- `pnpm dev` - Start the development server
- `pnpm chain` - Start the local blockchain
- `pnpm deploy` - Deploy the smart contract
- `pnpm test` - Run tests
- `pnpm lint` - Run linter

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Scaffold-ETH 2](https://github.com/scaffold-eth/scaffold-eth-2)
- Inspired by traditional Tic Tac Toe
