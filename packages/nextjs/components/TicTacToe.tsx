import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Hash, decodeEventLog } from "viem";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { useDeployedContractInfo, useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

type Player = "None" | "X" | "O";
type GameState = "Active" | "Won" | "Draw";

interface Game {
  playerX: string;
  playerO: string;
  currentTurn: Player;
  board: Player[];
  state: GameState;
  winner: string;
}

type GameData = readonly [
  string, // playerX
  string, // playerO
  number, // currentTurn (0: None, 1: X, 2: O)
  readonly number[], // board (0: None, 1: X, 2: O)
  number, // state (0: Active, 1: Won, 2: Draw)
  string, // winner
];

const mapPlayer = (value: number): Player => {
  switch (value) {
    case 0:
      return "None";
    case 1:
      return "X";
    case 2:
      return "O";
    default:
      return "None";
  }
};

const mapGameState = (value: number): GameState => {
  switch (value) {
    case 0:
      return "Active";
    case 1:
      return "Won";
    case 2:
      return "Draw";
    default:
      return "Active";
  }
};

export const TicTacToe = () => {
  const { address } = useAccount();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [gameId, setGameId] = useState<bigint | undefined>(undefined);
  const [opponentAddress, setOpponentAddress] = useState("");
  const [isCreatingGame, setIsCreatingGame] = useState(false);
  const [createGameHash, setCreateGameHash] = useState<Hash | undefined>(undefined);
  const [makeMoveHash, setMakeMoveHash] = useState<Hash | undefined>(undefined);

  // Load game ID from URL on component mount
  useEffect(() => {
    const gameIdParam = searchParams.get("gameId");
    if (gameIdParam) {
      try {
        setGameId(BigInt(gameIdParam));
      } catch (error) {
        console.error("Invalid game ID in URL:", error);
      }
    }
  }, [searchParams]);

  const { data: deployedContractData } = useDeployedContractInfo("TicTacToe");

  const { data: gameData, refetch: refetchGame } = useScaffoldReadContract({
    contractName: "TicTacToe",
    functionName: "getGame",
    args: [gameId],
    query: {
      enabled: gameId !== undefined && gameId !== null,
    },
  }) as { data: GameData | undefined; refetch: () => void };

  // Convert tuple to Game object
  const game: Game | undefined = gameData
    ? {
        playerX: gameData[0],
        playerO: gameData[1],
        currentTurn: mapPlayer(gameData[2]),
        board: gameData[3].map(mapPlayer),
        state: mapGameState(gameData[4]),
        winner: gameData[5],
      }
    : undefined;

  const { writeContractAsync: createGame } = useScaffoldWriteContract({
    contractName: "TicTacToe",
  });

  const { writeContractAsync: makeMove } = useScaffoldWriteContract({
    contractName: "TicTacToe",
  });

  const { data: createGameReceipt } = useWaitForTransactionReceipt({
    hash: createGameHash,
    query: {
      enabled: createGameHash !== undefined,
    },
  });

  const { data: makeMoveReceipt } = useWaitForTransactionReceipt({
    hash: makeMoveHash,
    query: {
      enabled: makeMoveHash !== undefined,
    },
  });

  // Handle create game receipt
  useEffect(() => {
    if (createGameReceipt && isCreatingGame) {
      const event = createGameReceipt.logs[0];
      if (event && event.data && deployedContractData?.abi) {
        try {
          const decodedEvent = decodeEventLog({
            abi: deployedContractData.abi,
            data: event.data,
            topics: event.topics,
          });
          if (decodedEvent.eventName === "GameCreated") {
            const newGameId = decodedEvent.args.gameId;
            setGameId(newGameId);
            // Update URL with new game ID
            router.push(`?gameId=${newGameId.toString()}`);
            setCreateGameHash(undefined);
            setIsCreatingGame(false);
            notification.success("Game created successfully!");
          }
        } catch (error) {
          console.error("Failed to decode event:", error);
        }
      }
    }
  }, [createGameReceipt, isCreatingGame, deployedContractData?.abi, router]);

  // Handle make move receipt
  useEffect(() => {
    if (makeMoveReceipt) {
      refetchGame();
      setMakeMoveHash(undefined);
    }
  }, [makeMoveReceipt, refetchGame]);

  const handleCreateGame = async () => {
    if (!opponentAddress) {
      notification.error("Please enter opponent's address");
      return;
    }

    try {
      setIsCreatingGame(true);
      const hash = await createGame({
        functionName: "createGame",
        args: [opponentAddress],
      });
      setCreateGameHash(hash);
    } catch (error) {
      notification.error("Failed to create game");
      console.error(error);
      setIsCreatingGame(false);
    }
  };

  const handleMakeMove = async (position: number) => {
    if (!gameId) return;

    try {
      const hash = await makeMove({
        functionName: "makeMove",
        args: [gameId, position],
      });
      setMakeMoveHash(hash);
    } catch (error) {
      notification.error("Failed to make move");
      console.error(error);
    }
  };

  const renderCell = (index: number) => {
    const cellValue = game?.board?.[index];
    const isCellClickable =
      game?.state === "Active" &&
      cellValue === "None" &&
      ((game.currentTurn === "X" && address === game.playerX) ||
        (game.currentTurn === "O" && address === game.playerO));

    return (
      <button
        key={index}
        className={`aspect-square w-full border-2 border-gray-200 text-4xl sm:text-5xl font-bold transition-all duration-200 rounded-lg ${
          isCellClickable
            ? "hover:bg-white hover:scale-105 cursor-pointer active:scale-95 bg-white/80"
            : "cursor-not-allowed bg-white/50"
        } ${cellValue === "X" ? "text-blue-600" : cellValue === "O" ? "text-red-600" : "text-gray-300"}`}
        onClick={() => isCellClickable && handleMakeMove(index)}
        disabled={!isCellClickable}
      >
        {cellValue !== "None" ? cellValue : ""}
      </button>
    );
  };

  const renderGameStatus = () => {
    if (!game) return null;

    const isYourTurn =
      game.state === "Active" &&
      ((game.currentTurn === "X" && address === game.playerX) ||
        (game.currentTurn === "O" && address === game.playerO));

    if (game.state === "Won") {
      return (
        <div className="text-lg sm:text-2xl font-bold text-green-600 animate-bounce bg-green-50/80 p-3 rounded-xl text-center">
          Winner: {game.winner === address ? "You" : "Opponent"}
        </div>
      );
    }
    if (game.state === "Draw") {
      return (
        <div className="text-lg sm:text-2xl font-bold text-yellow-600 bg-yellow-50/80 p-3 rounded-xl text-center">
          Game ended in a draw!
        </div>
      );
    }
    return (
      <div className="text-lg sm:text-2xl font-bold">
        <span
          className={`${isYourTurn ? "text-green-600 animate-pulse" : "text-gray-600"} bg-gray-50/80 p-3 rounded-xl inline-block`}
        >
          Current turn: {game.currentTurn === "X" ? "X" : "O"} (
          {game.currentTurn === "X"
            ? game.playerX === address
              ? "You"
              : "Opponent"
            : game.playerO === address
              ? "You"
              : "Opponent"}
          )
        </span>
      </div>
    );
  };

  const handleNewGame = () => {
    setGameId(undefined);
    router.push("/");
  };

  const handleShareGame = () => {
    if (gameId) {
      const gameUrl = `${window.location.origin}?gameId=${gameId.toString()}`;
      navigator.clipboard.writeText(gameUrl);
      notification.success("Game link copied to clipboard!");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 pt-6 pb-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Tic Tac Toe</h1>
        <p className="text-white/90 text-base">Play on the blockchain!</p>
      </div>

      {gameId === undefined ? (
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6 w-[95vw] sm:w-[480px] mx-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Create New Game</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="opponent" className="block text-sm font-medium text-gray-700 mb-2">
                Opponent&apos;s Address
              </label>
              <input
                type="text"
                id="opponent"
                value={opponentAddress}
                onChange={e => setOpponentAddress(e.target.value)}
                placeholder="0x..."
                className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50"
              />
            </div>
            <button
              onClick={handleCreateGame}
              disabled={isCreatingGame || !opponentAddress}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed text-base font-medium shadow-lg shadow-blue-500/30"
            >
              {isCreatingGame ? "Creating Game..." : "Create Game"}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6 w-[95vw] sm:w-[480px] mx-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Game #{gameId}</h2>
            {renderGameStatus()}
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 bg-gray-50 p-2 rounded-lg">
            {Array.from({ length: 9 }).map((_, index) => renderCell(index))}
          </div>

          <div className="space-y-3">
            <button
              onClick={handleNewGame}
              className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 active:scale-95 transition-all duration-200 text-base font-medium shadow-lg shadow-gray-500/30"
            >
              New Game
            </button>
            <button
              onClick={handleShareGame}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 active:scale-95 transition-all duration-200 text-base font-medium shadow-lg shadow-green-500/30"
            >
              Share Game
            </button>
          </div>

          <div className="mt-6 p-4 bg-blue-50/80 backdrop-blur-sm rounded-lg">
            <h3 className="text-base font-semibold text-blue-800 mb-3">How to Play</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-blue-700/90">
              <li className="pl-2">Connect your wallet</li>
              <li className="pl-2">Enter the other player&apos;s address</li>
              <li className="pl-2">Click &quot;Create Game&quot;</li>
              <li className="pl-2">Wait for the other player to make their move</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};
