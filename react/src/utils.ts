import { type ITokenClass } from "./types";

export const stringifyTokenClassKey = (
  tokenClass: Pick<
    ITokenClass,
    "additionalKey" | "category" | "collection" | "type"
  >
) => {
  if (
    tokenClass.additionalKey &&
    tokenClass.category &&
    tokenClass.collection &&
    tokenClass.type
  ) {
    return `${tokenClass.collection}|${tokenClass.category}|${tokenClass.type}|${tokenClass.additionalKey}`;
  }
  return "";
};

export const getAddressWithoutPrefix = (address: string) => {
  return address.replace(/0x|eth\|/, "");
};
