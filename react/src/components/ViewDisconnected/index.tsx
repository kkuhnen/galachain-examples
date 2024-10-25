import { type FC } from "react";
import ConnectButton from "~/components/ConnectButton";
import LoadingSpinner from "~/components/LoadingSpinner";
import PageContent from "~/components/PageContent";
import { useEthereumContext } from "~/hooks/useEthereumContext";
import "./styles.css";

const ViewDisconnected: FC = () => {
  const { isPendingConnection } = useEthereumContext();
  return (
    <PageContent pageTitle="Connect Wallet" centered srOnlyTitle>
      {isPendingConnection && (
        <div className="view-disconnected-loading-spinner">
          <LoadingSpinner />
        </div>
      )}
      {!isPendingConnection && (
        <>
          <p className="view-disconnected-message">
            Please connect your wallet to see your balances
          </p>
          <ConnectButton className="primary large" />
        </>
      )}
    </PageContent>
  );
};

export default ViewDisconnected;
