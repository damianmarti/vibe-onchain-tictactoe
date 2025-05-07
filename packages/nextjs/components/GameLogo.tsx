export const GameLogo = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="relative w-16 h-16">
        {/* Outer circle */}
        <div className="absolute inset-0 rounded-full border-4 border-primary animate-pulse"></div>

        {/* X and O symbols */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-2">
            {/* X */}
            <div className="relative w-6 h-6">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4">
                  <div className="absolute w-1 h-4 bg-blue-500 transform rotate-45 rounded-full"></div>
                  <div className="absolute w-1 h-4 bg-blue-500 transform -rotate-45 rounded-full"></div>
                </div>
              </div>
            </div>
            {/* O */}
            <div className="relative w-6 h-6">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full border-2 border-red-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight">
          Vibe On-Chain
        </h1>
        <h2 className="text-xl font-bold text-base-content leading-tight">Tic Tac Toe</h2>
      </div>
    </div>
  );
};
