import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

import {
  myUsername,
  myAddress,
  allItems,
  isBiddable,
  isOnSale,
  rarityLevel,
} from "./atoms";

import { filterCheck } from "../utils/filterCheck";
import { allFilterCheck } from "../utils/allFilterCheck";

const getMyUsername = selector({
  key: "getMyUsername", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const username = get(myUsername);
    const address = get(myAddress);

    if (address && address !== "" && username.length > 0) {
      return username;
    } else if (address && address !== "") {
      return (
        address.slice(0, 4) +
        "..." +
        address.slice(address.length - 2, address.length)
      );
    } else {
      return null;
    }
  },
});

const getHeads = selector({
  key: "getHeads", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    let tempIsBiddable = get(isBiddable);
    let tempIsOnSale = get(isOnSale);
    let tempRarityLevel = get(rarityLevel);

    const temp = get(allItems);
    const tempClothType = "1";

    return filterCheck(
      temp,
      tempIsBiddable,
      tempIsOnSale,
      tempRarityLevel,
      tempClothType
    );
  },
});

const getMiddles = selector({
  key: "getMiddles", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    let tempIsBiddable = get(isBiddable);
    let tempIsOnSale = get(isOnSale);
    let tempRarityLevel = get(rarityLevel);

    const temp = get(allItems);
    const tempClothType = "2";
    return filterCheck(
      temp,
      tempIsBiddable,
      tempIsOnSale,
      tempRarityLevel,
      tempClothType
    );
  },
});

const getBottoms = selector({
  key: "getBottoms", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    let tempIsBiddable = get(isBiddable);
    let tempIsOnSale = get(isOnSale);
    let tempRarityLevel = get(rarityLevel);

    console.log("tempIsBiddable", tempIsBiddable);
    console.log("tempIsOnSale", tempIsOnSale);
    console.log("tempRarityLevel", tempRarityLevel);
    const temp = get(allItems);

    const tempClothType = "3";
    return filterCheck(
      temp,
      tempIsBiddable,
      tempIsOnSale,
      tempRarityLevel,
      tempClothType
    );
  },
});

const getAllItemsFiltered = selector({
  key: "getAllItemsFiltered", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    let tempIsBiddable = get(isBiddable);
    let tempIsOnSale = get(isOnSale);
    let tempRarityLevel = get(rarityLevel);

    console.log("tempIsBiddable", tempIsBiddable);
    console.log("tempIsOnSale", tempIsOnSale);
    console.log("tempRarityLevel", tempRarityLevel);
    const temp = get(allItems);

    // const tempClothType = "3" || "2" || "1";
    return allFilterCheck(temp, tempIsBiddable, tempIsOnSale, tempRarityLevel);
  },
});


const unFilteredGetHeads = selector({
  key: "unFilteredGetHeads", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    let tempIsBiddable = get(isBiddable);
    let tempIsOnSale = get(isOnSale);
    let tempRarityLevel = get(rarityLevel);

    const temp = get(allItems);
    const tempClothType = "1";

    return temp.filter((item) => { return item.clothType === tempClothType});
  },
});

const unFilteredGetMiddles = selector({
  key: "unFilteredGetMiddles", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const temp = get(allItems);
    const tempClothType = "2";
    return temp.filter((item) => {return item.clothType === tempClothType});

}});

const unFilteredGetBottoms = selector({
  key: "unFilteredGetBottoms", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
  const temp = get(allItems);

    const tempClothType = "3";
    return temp.filter((item) => {return item.clothType === tempClothType});
  },
});


export {
  getMyUsername,
  getHeads,
  getMiddles,
  getBottoms,
  getAllItemsFiltered,
  unFilteredGetHeads,
  unFilteredGetMiddles,
  unFilteredGetBottoms

};
