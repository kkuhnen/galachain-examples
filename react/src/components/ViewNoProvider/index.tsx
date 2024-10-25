import { type FC } from "react";
import PageContent from "~/components/PageContent";
import "./styles.css";

const ViewNoProvider: FC = () => (
  <PageContent pageTitle="Missing Ethereum Provider" centered srOnlyTitle>
    <p className="view-no-provider-message">
      An Ethereum provider is required to use this app. <br />
      Please install a web3 wallet like MetaMask and then refresh this page.
    </p>
    <div>
      <a
        href="https://metamask.io/download/"
        target="_blank"
        className="btn primary large"
      >
        Get MetaMask
      </a>
    </div>
  </PageContent>
);

export default ViewNoProvider;
