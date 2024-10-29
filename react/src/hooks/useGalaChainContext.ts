import { useContext } from "react";
import { GalaChainContext } from "~/components/GalaChainContext";

export const useGalaChainContext = () => {
  const context = useContext(GalaChainContext);
  if (!context) {
    throw new Error(
      "useGalaChainContext must be used within a GalaChainContextProvider"
    );
  }
  return context;
};
