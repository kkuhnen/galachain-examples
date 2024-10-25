import {
  type FC,
  type ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";
import { useEthereum } from "~/hooks/useEthereum";
import { IEthereumContext } from "~/types";

interface IProps {
  children?: ReactNode;
}

const localStorageKey = "galachain-react-examples.isEthereumConnected";

export const EthereumContext = createContext<IEthereumContext | undefined>(
  undefined
);

const EthereumProvider: FC<IProps> = ({ children }) => {
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
  } = useEthereum(localStorageKey);

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
    <EthereumContext.Provider
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
    </EthereumContext.Provider>
  );
};

export default EthereumProvider;
