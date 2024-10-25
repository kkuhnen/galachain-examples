import { type FC } from "react";
import Balances from "~/components/Balances";
import PageContent from "~/components/PageContent";

const ViewDisconnected: FC = () => (
  <PageContent pageTitle="Balances">
    <Balances />
  </PageContent>
);

export default ViewDisconnected;
