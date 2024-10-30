import {
  TokenApi,
  FetchBalancesWithPaginationRequest,
} from "@gala-chain/connect";
import { type FC, useCallback, useEffect, useMemo, useState } from "react";
import { GALACHAIN_TOKEN_CONTRACT_GATEWAY_URL } from "~/constants";
import { useGalaChainContext } from "~/hooks/useGalaChainContext";
import { type ITokenBalanceWithMetadata } from "~/types";
import { stringifyTokenClassKey } from "~/utils";
import BalanceItem from "~/components/BalanceItem";
import LoadingSpinner from "~/components/LoadingSpinner";
import "./styles.css";

interface IProps {
  limit?: number;
}

const Balances: FC<IProps> = ({ limit = 10 }) => {
  const { address, browserConnectClient } = useGalaChainContext();
  const [isPending, setIsPending] = useState(false);
  const [balances, setBalances] = useState<ITokenBalanceWithMetadata[]>([]);
  const [nextPageBookmark, setNextPageBookmark] = useState("");

  const tokenClient = useMemo(() => {
    return new TokenApi(
      GALACHAIN_TOKEN_CONTRACT_GATEWAY_URL,
      browserConnectClient!
    );
  }, [browserConnectClient]);

  const fetchBalances = useCallback(
    async (params: FetchBalancesWithPaginationRequest) => {
      try {
        setIsPending(true);
        const userBalances = await tokenClient.FetchBalancesWithTokenMetadata(
          params
        );
        setBalances((oldBalances) => {
          const newBalances = params.bookmark ? [...oldBalances] : [];
          userBalances.Data.results.forEach((b) => {
            // force type - there is a conflict here due to class with private properties that are exposed in the response
            newBalances.push(b as unknown as ITokenBalanceWithMetadata);
          });
          return newBalances;
        });
        setNextPageBookmark(userBalances.Data.nextPageBookmark ?? "");
      } catch (error) {
        console.error("Error fetching balances:", error);
      } finally {
        setIsPending(false);
      }
    },
    [tokenClient]
  );

  const loadMoreBalances = () => {
    if (isPending) {
      return;
    }
    fetchBalances({
      owner: address,
      limit,
      bookmark: nextPageBookmark,
    });
  };

  useEffect(() => {
    fetchBalances({
      owner: address,
      limit,
    });
  }, [address, fetchBalances, limit]);

  return (
    <div>
      {isPending && !balances.length && (
        <div className="animate-pulse">
          <div className="balances-list-loading-skeleton" />
          <div className="balances-list-loading-skeleton" />
          <div className="balances-list-loading-skeleton" />
        </div>
      )}
      {!isPending && !balances.length && (
        <p className="balances-list-no-results">No balances found</p>
      )}
      {!!balances.length && (
        <>
          <ul className="balances-list">
            {balances.map((balance) => (
              <li key={stringifyTokenClassKey(balance.token)}>
                <BalanceItem data={balance} />
              </li>
            ))}
          </ul>
          {!!nextPageBookmark && (
            <div className="balances-list-load-more">
              <button className="secondary large" onClick={loadMoreBalances}>
                {isPending && (
                  <LoadingSpinner className="balances-list-loading-spinner" />
                )}
                {isPending ? "Loading balances" : "Load more balances"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Balances;
