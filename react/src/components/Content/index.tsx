import { type FC } from "react";
import ViewDisconnected from "~/components/ViewDisconnected";
import ViewConnected from "~/components/ViewConnected";
import ViewUnregistered from "~/components/ViewUnregistered";
import { useGalaChainContext } from "~/hooks/useGalaChainContext";

const Content: FC = () => {
  const { isConnected, isRegistered } = useGalaChainContext();
  return (
    <>
      {!isConnected && <ViewDisconnected />}
      {isConnected && !isRegistered && <ViewUnregistered />}
      {isConnected && isRegistered && <ViewConnected />}
    </>
  );
};

export default Content;
