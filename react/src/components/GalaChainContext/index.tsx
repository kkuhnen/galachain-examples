import {
  type FC,
  type ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";
import { useGalaChain } from "~/hooks/useGalaChain";
import { IGalaChainContext } from "~/types";

interface IProps {
  children?: ReactNode;
}

const localStorageKey = "galachain-react-examples.isGalaChainConnected";

export const GalaChainContext = createContext<IGalaChainContext | undefined>(
  undefined
);

const GalaChainProvider: FC<IProps> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const {
    browserConnectClient,
    isConnected,
    isRegistered,
    isPendingConnection,
    isPendingRegistration,
    address,
    connect,
    init,
    disconnect,
    registerUser,
    unsubscribeFromEvents,
  } = useGalaChain(localStorageKey);

  // Automatically check if connected on inital load
  useEffect(() => {
    const initConnect = async () => {
      await init();
      setIsInitialized(true);
    };
    initConnect();
    return () => {
      // Cleanup on unmount
      unsubscribeFromEvents();
    };
  }, [init, unsubscribeFromEvents]);

  return (
    <GalaChainContext.Provider
      value={{
        address,
        browserConnectClient,
        isConnected,
        isRegistered,
        isPendingConnection,
        isPendingRegistration,
        connect,
        disconnect,
        registerUser,
      }}
    >
      {isInitialized ? children : <div></div>}
    </GalaChainContext.Provider>
  );
};

export default GalaChainProvider;
