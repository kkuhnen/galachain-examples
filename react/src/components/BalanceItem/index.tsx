import { type FC, useId, useState } from "react";
import { BigNumber } from "bignumber.js";
import { type ITokenBalanceWithMetadata } from "~/types";
import "./styles.css";

interface IProps {
  data: ITokenBalanceWithMetadata;
}

const BalanceItem: FC<IProps> = ({ data }) => {
  const { token, balance } = data;
  const [isExpanded, setIsExpanded] = useState(false);
  const detailsId = useId();
  const now = Date.now();

  const lockedInstancesMap = balance.instanceIds
    ? balance.lockedHolds?.reduce((acc, hold) => {
        if (!hold.expires || hold.expires > now) {
          acc[BigNumber(hold.instanceId).toString()] = hold.quantity;
        }
        return acc;
      }, {} as { [instanceId: string]: BigNumber })
    : undefined;

  const lockedInstances = lockedInstancesMap
    ? Object.keys(lockedInstancesMap)
    : [];

  const inUseInstancesMap = balance.instanceIds
    ? balance.inUseHolds?.reduce((acc, hold) => {
        if (!hold.expires || hold.expires > now) {
          acc[BigNumber(hold.instanceId).toString()] = hold.quantity;
        }
        return acc;
      }, {} as { [instanceId: string]: BigNumber })
    : undefined;

  const inUseInstances = inUseInstancesMap
    ? Object.keys(inUseInstancesMap)
    : [];

  const availableInstances = balance.instanceIds?.filter((id) => {
    const k = BigNumber(id).toString();
    return !lockedInstancesMap?.[k] && !inUseInstancesMap?.[k];
  });

  const totalQuantity = BigNumber(
    token.isNonFungible ? balance.instanceIds?.length ?? 0 : balance.quantity
  );

  const totalLocked = token.isNonFungible
    ? lockedInstances.length
    : balance.lockedHolds?.reduce(
        (acc, hold) =>
          acc.plus(!hold.expires || hold.expires > now ? hold.quantity : 0),
        BigNumber(0)
      );

  const totalInUse = token.isNonFungible
    ? inUseInstances.length
    : balance.inUseHolds?.reduce(
        (acc, hold) =>
          acc.plus(!hold.expires || hold.expires > now ? hold.quantity : 0),
        BigNumber(0)
      );

  const availableQuantity = totalQuantity
    .minus(totalLocked ?? 0)
    .minus(totalInUse ?? 0);

  return (
    <div className="balance-item">
      <div className={`balance-item-info ${isExpanded ? "expanded" : ""}`}>
        <div className="balance-item-image">
          {token.image && <img src={token.image} alt="" width="100" />}
        </div>
        <div className="balance-item-info-content">
          <h2 className="balance-item-title">
            <span className={token.isNonFungible ? "balance-name-wrap" : ""}>
              {token.name}
              {!token.isNonFungible && token.name !== token.symbol
                ? ` (${token.symbol})`
                : ""}
            </span>
          </h2>
          <div
            id={detailsId}
            className={`balance-details ${isExpanded ? "" : "hidden"}`}
          >
            <p>{token.description}</p>
            <hr />
            <dl className="balance-details-grid">
              <dt>In wallet</dt>
              <dd>
                {token.isNonFungible && (
                  <InstanceIdList instanceIds={balance.instanceIds} />
                )}
                {!token.isNonFungible && totalQuantity.toString()}
              </dd>
              <dt>Locked</dt>
              <dd className="balance-item-unavailable">
                {token.isNonFungible && (
                  <InstanceIdList instanceIds={lockedInstances} />
                )}
                {!token.isNonFungible && (totalLocked?.toString() ?? "0")}
              </dd>
              <dt>In use</dt>
              <dd className="balance-item-unavailable">
                {token.isNonFungible && (
                  <InstanceIdList instanceIds={inUseInstances} />
                )}
                {!token.isNonFungible && (totalInUse?.toString() ?? "0")}
              </dd>
              <dt>Available</dt>
              <dd>
                {token.isNonFungible && (
                  <InstanceIdList instanceIds={availableInstances} />
                )}
                {!token.isNonFungible && availableQuantity.toString()}
              </dd>
            </dl>
          </div>
          <div className="balance-item-available-summary">
            {token.isNonFungible && (
              <InstanceIdList instanceIds={availableInstances} />
            )}
            {!token.isNonFungible && (
              <span>{availableQuantity.toString()}</span>
            )}
          </div>
        </div>
        <div className="balance-item-actions">
          <button
            aria-label={
              isExpanded
                ? `Hide ${token.name} details`
                : `Show ${token.name} details`
            }
            aria-expanded={isExpanded ? "true" : "false"}
            aria-controls={detailsId}
            onClick={() => setIsExpanded(!isExpanded)}
            className="secondary icon"
          >
            {isExpanded ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                width={24}
                role="img"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 15.75 7.5-7.5 7.5 7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                width={24}
                role="img"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const InstanceIdList = ({
  instanceIds,
}: {
  instanceIds?: BigNumber.Value[];
}) => {
  if (!instanceIds?.length) {
    return <span>-</span>;
  }
  return (
    <ul className="balance-item-instance-ids">
      {instanceIds.map((id) => {
        const k = BigNumber(id).toString();
        return (
          <li key={k}>
            <span>#{k}</span>
            &nbsp;
          </li>
        );
      })}
    </ul>
  );
};

export default BalanceItem;
