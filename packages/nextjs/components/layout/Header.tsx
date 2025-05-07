import { ConnectButton } from "@rainbow-me/rainbowkit";
import { GameLogo } from "~~/components/GameLogo";

export const Header = () => {
  return (
    <div className="sticky top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 shadow-md px-4 py-2">
      <div className="navbar-start w-full">
        <div className="flex items-center">
          <GameLogo />
        </div>
      </div>
      <div className="navbar-end">
        <ConnectButton />
      </div>
    </div>
  );
};
