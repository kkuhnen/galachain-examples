import { useContext } from "react";
import { EthereumContext } from "~/components/EthereumContext";

export const useEthereumContext = () => {
  const context = useContext(EthereumContext);
  if (!context) {
    throw new Error(
      "useEthereumContext must be used within a EthereumContextProvider"
    );
  }
  return context;
};
