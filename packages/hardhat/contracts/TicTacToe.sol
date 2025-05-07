// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TicTacToe {
    // Game state
    enum Player { None, X, O }
    enum GameState { Active, Won, Draw }
    
    struct Game {
        address playerX;
        address playerO;
        Player currentTurn;
        Player[9] board;
        GameState state;
        address winner;
    }
    
    // Mapping of game ID to Game struct
    mapping(uint256 => Game) public games;
    uint256 public nextGameId;
    
    // Events
    event GameCreated(uint256 gameId, address playerX, address playerO);
    event MoveMade(uint256 gameId, address player, uint8 position);
    event GameWon(uint256 gameId, address winner);
    event GameDraw(uint256 gameId);
    
    // Create a new game
    function createGame(address _playerO) public returns (uint256) {
        require(_playerO != msg.sender, "Cannot play against yourself");
        
        uint256 gameId = nextGameId++;
        games[gameId] = Game({
            playerX: msg.sender,
            playerO: _playerO,
            currentTurn: Player.X,
            board: [Player.None, Player.None, Player.None,
                   Player.None, Player.None, Player.None,
                   Player.None, Player.None, Player.None],
            state: GameState.Active,
            winner: address(0)
        });
        
        emit GameCreated(gameId, msg.sender, _playerO);
        return gameId;
    }
    
    // Make a move
    function makeMove(uint256 gameId, uint8 position) public {
        require(position < 9, "Invalid position");
        Game storage game = games[gameId];
        
        require(game.state == GameState.Active, "Game is not active");
        require(
            (game.currentTurn == Player.X && msg.sender == game.playerX) ||
            (game.currentTurn == Player.O && msg.sender == game.playerO),
            "Not your turn"
        );
        require(game.board[position] == Player.None, "Position already taken");
        
        // Make the move
        game.board[position] = game.currentTurn;
        
        // Check for win or draw
        if (checkWin(game.board, game.currentTurn)) {
            game.state = GameState.Won;
            game.winner = msg.sender;
            emit GameWon(gameId, msg.sender);
        } else if (checkDraw(game.board)) {
            game.state = GameState.Draw;
            emit GameDraw(gameId);
        } else {
            // Switch turns
            game.currentTurn = game.currentTurn == Player.X ? Player.O : Player.X;
        }
        
        emit MoveMade(gameId, msg.sender, position);
    }
    
    // Get game state
    function getGame(uint256 gameId) public view returns (
        address playerX,
        address playerO,
        Player currentTurn,
        Player[9] memory board,
        GameState state,
        address winner
    ) {
        Game storage game = games[gameId];
        return (
            game.playerX,
            game.playerO,
            game.currentTurn,
            game.board,
            game.state,
            game.winner
        );
    }
    
    // Check for win
    function checkWin(Player[9] memory board, Player player) internal pure returns (bool) {
        // Check rows
        for (uint i = 0; i < 9; i += 3) {
            if (board[i] == player && board[i+1] == player && board[i+2] == player) {
                return true;
            }
        }
        
        // Check columns
        for (uint i = 0; i < 3; i++) {
            if (board[i] == player && board[i+3] == player && board[i+6] == player) {
                return true;
            }
        }
        
        // Check diagonals
        if (board[0] == player && board[4] == player && board[8] == player) {
            return true;
        }
        if (board[2] == player && board[4] == player && board[6] == player) {
            return true;
        }
        
        return false;
    }
    
    // Check for draw
    function checkDraw(Player[9] memory board) internal pure returns (bool) {
        for (uint i = 0; i < 9; i++) {
            if (board[i] == Player.None) {
                return false;
            }
        }
        return true;
    }
} 