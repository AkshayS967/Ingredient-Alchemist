"use client";

import { NextUIProvider } from "@nextui-org/react";
import { RecipeAPI } from "./RecipeAPI";

export function Providers({ children }) {
  return (
    <NextUIProvider>
      <RecipeAPI>{children}</RecipeAPI>
    </NextUIProvider>
  );
}
