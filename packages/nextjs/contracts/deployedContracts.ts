/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  31337: {
    TicTacToe: {
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      abi: [
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "gameId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "address",
              name: "playerX",
              type: "address",
            },
            {
              indexed: false,
              internalType: "address",
              name: "playerO",
              type: "address",
            },
          ],
          name: "GameCreated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "gameId",
              type: "uint256",
            },
          ],
          name: "GameDraw",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "gameId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "address",
              name: "winner",
              type: "address",
            },
          ],
          name: "GameWon",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "gameId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "address",
              name: "player",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint8",
              name: "position",
              type: "uint8",
            },
          ],
          name: "MoveMade",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_playerO",
              type: "address",
            },
          ],
          name: "createGame",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "games",
          outputs: [
            {
              internalType: "address",
              name: "playerX",
              type: "address",
            },
            {
              internalType: "address",
              name: "playerO",
              type: "address",
            },
            {
              internalType: "enum TicTacToe.Player",
              name: "currentTurn",
              type: "uint8",
            },
            {
              internalType: "enum TicTacToe.GameState",
              name: "state",
              type: "uint8",
            },
            {
              internalType: "address",
              name: "winner",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "gameId",
              type: "uint256",
            },
          ],
          name: "getGame",
          outputs: [
            {
              internalType: "address",
              name: "playerX",
              type: "address",
            },
            {
              internalType: "address",
              name: "playerO",
              type: "address",
            },
            {
              internalType: "enum TicTacToe.Player",
              name: "currentTurn",
              type: "uint8",
            },
            {
              internalType: "enum TicTacToe.Player[9]",
              name: "board",
              type: "uint8[9]",
            },
            {
              internalType: "enum TicTacToe.GameState",
              name: "state",
              type: "uint8",
            },
            {
              internalType: "address",
              name: "winner",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "gameId",
              type: "uint256",
            },
            {
              internalType: "uint8",
              name: "position",
              type: "uint8",
            },
          ],
          name: "makeMove",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "nextGameId",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
    YourContract: {
      address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_owner",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "greetingSetter",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "newGreeting",
              type: "string",
            },
            {
              indexed: false,
              internalType: "bool",
              name: "premium",
              type: "bool",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "GreetingChange",
          type: "event",
        },
        {
          inputs: [],
          name: "greeting",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "premium",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_newGreeting",
              type: "string",
            },
          ],
          name: "setGreeting",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "totalCounter",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "userGreetingCounter",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "withdraw",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          stateMutability: "payable",
          type: "receive",
        },
      ],
      inheritedFunctions: {},
    },
  },
  11155420: {
    TicTacToe: {
      address: "0x1BdAD4e1A24B07a6f9B0dA8614D00345E10943dB",
      abi: [
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "gameId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "address",
              name: "playerX",
              type: "address",
            },
            {
              indexed: false,
              internalType: "address",
              name: "playerO",
              type: "address",
            },
          ],
          name: "GameCreated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "gameId",
              type: "uint256",
            },
          ],
          name: "GameDraw",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "gameId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "address",
              name: "winner",
              type: "address",
            },
          ],
          name: "GameWon",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "uint256",
              name: "gameId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "address",
              name: "player",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint8",
              name: "position",
              type: "uint8",
            },
          ],
          name: "MoveMade",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_playerO",
              type: "address",
            },
          ],
          name: "createGame",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "games",
          outputs: [
            {
              internalType: "address",
              name: "playerX",
              type: "address",
            },
            {
              internalType: "address",
              name: "playerO",
              type: "address",
            },
            {
              internalType: "enum TicTacToe.Player",
              name: "currentTurn",
              type: "uint8",
            },
            {
              internalType: "enum TicTacToe.GameState",
              name: "state",
              type: "uint8",
            },
            {
              internalType: "address",
              name: "winner",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "gameId",
              type: "uint256",
            },
          ],
          name: "getGame",
          outputs: [
            {
              internalType: "address",
              name: "playerX",
              type: "address",
            },
            {
              internalType: "address",
              name: "playerO",
              type: "address",
            },
            {
              internalType: "enum TicTacToe.Player",
              name: "currentTurn",
              type: "uint8",
            },
            {
              internalType: "enum TicTacToe.Player[9]",
              name: "board",
              type: "uint8[9]",
            },
            {
              internalType: "enum TicTacToe.GameState",
              name: "state",
              type: "uint8",
            },
            {
              internalType: "address",
              name: "winner",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "gameId",
              type: "uint256",
            },
            {
              internalType: "uint8",
              name: "position",
              type: "uint8",
            },
          ],
          name: "makeMove",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "nextGameId",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
