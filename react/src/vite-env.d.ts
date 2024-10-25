/// <reference types="vite/client" />

interface Window {
  ethereum?: import("@gala-chain/connect").ExtendedEip1193Provider & {
    on(event: "chainChanged", callback: (chainId: string) => void): void;
    removeListener(event: "chainChanged", callback: (chainId: string) => void);
  };
}
