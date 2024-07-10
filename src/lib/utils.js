import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export const ConvertStringtoObject = (queryString) => {
  queryString = queryString.startsWith("?")
    ? queryString.slice(1)
    : queryString;

  const keyValuePairs = queryString.split("&");

  const queryObject = {};

  keyValuePairs.forEach((pair) => {
    let [key, value] = pair.split("=");

    if (!isNaN(value)) {
      value = Number(value);
    }
    queryObject[key] = value;
  });

  return queryObject;
};
