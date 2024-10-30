import {
  BrowserConnectClient,
  PublicKeyApi,
  WalletUtils,
} from "@gala-chain/connect";
import { useCallback, useMemo, useState } from "react";
import {
  GALACHAIN_PUBLIC_KEY_CONTRACT_GATEWAY_URL,
  GALACHAIN_WALLET_REGISTRATION_URL,
} from "~/constants";
import { type IUserAliasObject } from "~/types";
import { getAddressWithoutPrefix } from "~/utils";

export const useGalaChain = (localStorageKey: string) => {
  const browserConnectClient = useMemo(() => new BrowserConnectClient(), []);
  const publicKeyClient = useMemo(
    () =>
      new PublicKeyApi(
        GALACHAIN_PUBLIC_KEY_CONTRACT_GATEWAY_URL,
        browserConnectClient
      ),
    [browserConnectClient]
  );
  const [address, setAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isPendingConnection, setIsPendingConnection] = useState(false);
  const [isPendingRegistration, setIsPendingRegistration] = useState(false);

  const setConnected = useCallback(
    (newAddress: string) => {
      setAddress(newAddress);
      setIsConnected(true);
      setIsPendingConnection(false);
      localStorage.setItem(localStorageKey, "true");
    },
    [localStorageKey]
  );

  const setDisconnected = useCallback(() => {
    setIsConnected(false);
    setAddress("");
    setIsPendingConnection(false);
    localStorage.removeItem(localStorageKey);
  }, [localStorageKey]);

  // Handle account changes
  const handleAccountChanged = useCallback(
    (address: string | string[] | null) => {
      if (address) {
        setConnected(typeof address === "string" ? address : address[0]);
      } else {
        setDisconnected();
      }
    },
    [setDisconnected, setConnected]
  );

  // Reload on chain change
  const reloadWindow = useCallback(() => {
    window.location.reload();
  }, []);

  // subscribe to account and chain changes
  const subscribeToEvents = useCallback(() => {
    browserConnectClient.on("accountChanged", handleAccountChanged);
    if (window.ethereum) {
      window.ethereum.on("chainChanged", reloadWindow);
    }
  }, [browserConnectClient, handleAccountChanged, reloadWindow]);

  // unsubscribe from account and chain changes
  const unsubscribeFromEvents = useCallback(() => {
    browserConnectClient.off("accountChanged", handleAccountChanged);
    if (window.ethereum?.removeListener) {
      window.ethereum.removeListener("chainChanged", reloadWindow);
    }
  }, [browserConnectClient, handleAccountChanged, reloadWindow]);

  // get user address alias from GalaChain
  const getUserAddressAlias = useCallback(
    async (address: string) => {
      if (!address) {
        return "";
      }
      try {
        const response = await publicKeyClient.GetObjectByKey<IUserAliasObject>(
          {
            objectId: `\u0000GCUP\u0000${getAddressWithoutPrefix(
              address
            )}\u0000`,
          }
        );
        return response.Data.alias ?? "";
      } catch (error) {
        // if the wallet is not registered, GetObjectByKey will throw an error
        // so we can ignore it and return an empty string
        console.error("Error getting user address alias:", error);
        return "";
      }
    },
    [publicKeyClient]
  );

  // register eth user on GalaChain
  const registerUser = useCallback(
    async (address: string) => {
      if (!address || isRegistered) {
        return;
      }
      try {
        if (address) {
          setIsPendingRegistration(true);
          // register eth user
          const publicKeyResponse = await browserConnectClient.getPublicKey();
          if (!publicKeyResponse.publicKey) {
            throw new Error("No public key found for address " + address);
          }
          const registerWalletReponse = await WalletUtils.registerWallet(
            GALACHAIN_WALLET_REGISTRATION_URL,
            publicKeyResponse.publicKey
          );
          // success response is a string: "Wallet registered successfully"
          if (registerWalletReponse) {
            setIsRegistered(true);
          }
        }
      } catch (error) {
        console.error("Error registering user:", error);
        setIsRegistered(false);
      } finally {
        setIsPendingRegistration(false);
      }
    },
    [isRegistered, browserConnectClient]
  );

  // disconnect (simply reset the state)
  const disconnect = useCallback(() => {
    setDisconnected();
    unsubscribeFromEvents();
    browserConnectClient.disconnect();
  }, [setDisconnected, unsubscribeFromEvents, browserConnectClient]);

  // connect to browser provider
  const connect = useCallback(async () => {
    if (!window.ethereum) {
      disconnect();
      return;
    }

    if (browserConnectClient.galaChainAddress) {
      setConnected(browserConnectClient.galaChainAddress);
      subscribeToEvents();
      return;
    }

    try {
      setIsPendingConnection(true);
      const address = await browserConnectClient.connect();
      if (address) {
        const addressAlias = await getUserAddressAlias(address);
        // if alias is the same as the address, then the user is registered as an eth user
        setIsRegistered(addressAlias === address);
        setConnected(address);
        subscribeToEvents();
      } else {
        disconnect();
      }
    } catch (error) {
      console.error("Error connecting to Ethereum provider:", error);
      disconnect();
    }
  }, [
    browserConnectClient,
    disconnect,
    getUserAddressAlias,
    setConnected,
    subscribeToEvents,
  ]);

  // initial connection on mount
  const init = useCallback(async () => {
    if (localStorage.getItem(localStorageKey) !== "true") {
      return;
    }
    await connect();
  }, [connect, localStorageKey]);

  return {
    browserConnectClient,
    // state
    isConnected,
    isRegistered,
    isPendingConnection,
    isPendingRegistration,
    address,
    // actions
    connect,
    disconnect,
    init,
    registerUser,
    subscribeToEvents,
    unsubscribeFromEvents,
  };
};
