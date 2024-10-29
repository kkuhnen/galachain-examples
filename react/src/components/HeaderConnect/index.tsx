import { type FC } from "react";
import { useGalaChainContext } from "~/hooks/useGalaChainContext";
import ConnectButton from "~/components/ConnectButton";
import "./styles.css";

const HeaderConnect: FC = () => {
  const { address, isConnected } = useGalaChainContext();
  return (
    <div className="user-info">
      <span
        className={`header-connect-status ${isConnected ? "connected" : ""}`}
      >
        {isConnected && (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="avatar-icon"
              role="img"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="address">{address}</span>
          </>
        )}
      </span>
      <ConnectButton
        className={isConnected ? "icon secondary" : "primary"}
        aria-label={isConnected ? "Disconnect wallet" : "Connect wallet"}
      >
        {isConnected && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="link-icon"
            role="img"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {!isConnected && <span>Connect</span>}
      </ConnectButton>
    </div>
  );
};

export default HeaderConnect;
