"use client";

import { Suspense } from "react";
import { TicTacToe } from "~~/components/TicTacToe";

export default function Home() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <TicTacToe />
    </Suspense>
  );
}
