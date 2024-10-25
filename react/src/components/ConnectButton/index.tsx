import { type FC, type ReactNode } from "react";
import { useEthereumContext } from "~/hooks/useEthereumContext";

interface IProps {
  children?: ReactNode;
  className?: string;
}

const ConnectButton: FC<IProps> = ({ children, className }) => {
  const { isConnected, isPendingConnection, connect, disconnect } =
    useEthereumContext();
  return (
    <button
      className={className}
      disabled={isPendingConnection ? true : undefined}
      onClick={isConnected ? disconnect : connect}
    >
      {children}
      {!children && <span>{isConnected ? "Disconnect" : "Connect"}</span>}
    </button>
  );
};

export default ConnectButton;
