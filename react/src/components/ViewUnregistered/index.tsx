import { type FC } from "react";
import LoadingSpinner from "~/components/LoadingSpinner";
import PageContent from "~/components/PageContent";
import RegisterButton from "~/components/RegisterButton";
import { useGalaChainContext } from "~/hooks/useGalaChainContext";
import "./styles.css";

const ViewUnregistered: FC = () => {
  const { isPendingRegistration } = useGalaChainContext();
  return (
    <PageContent pageTitle="Register Wallet" centered srOnlyTitle>
      {isPendingRegistration && (
        <div className="view-unregistered-loading-spinner">
          <LoadingSpinner />
        </div>
      )}
      {!isPendingRegistration && (
        <>
          <p className="view-unregistered-message">
            Your wallet is not yet registered on GalaChain. <br />
            Please register to continue.
          </p>
          <RegisterButton className="primary large" />
        </>
      )}
    </PageContent>
  );
};

export default ViewUnregistered;
