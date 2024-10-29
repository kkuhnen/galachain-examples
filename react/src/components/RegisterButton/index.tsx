import { type FC, type ReactNode } from "react";
import { useGalaChainContext } from "~/hooks/useGalaChainContext";

interface IProps {
  children?: ReactNode;
  className?: string;
}

const ConnectButton: FC<IProps> = ({ children, className }) => {
  const { address, isRegistered, isPendingRegistration, registerUser } =
    useGalaChainContext();
  const handleClick = () => {
    if (address && !isRegistered) {
      registerUser(address);
    }
  };
  if (isRegistered) {
    return <></>;
  }
  return (
    <button
      className={className}
      disabled={isPendingRegistration ? true : undefined}
      onClick={handleClick}
    >
      {children}
      {!children && <span>Register Wallet</span>}
    </button>
  );
};

export default ConnectButton;
