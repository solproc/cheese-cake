import React from "react";
import { Container, Typography, Button } from "@material-ui/core";
import MarketTab from "../../components/marketCard/marketTab";
import Web3 from "web3";
import * as fs from "fs";
import NftContract from "../../abis/nft.json";
import addresses from "../../constants/contracts";
import { useRecoilCallback } from "recoil";
import {
  allItems,
  isBiddable,
  isOnSale,
  rarityLevel,
} from "../../recoils/atoms";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
const MarketPlace = () => {
  const [address, setAddress] = React.useState();

  const [data, setData] = useRecoilState(allItems);

  React.useEffect(async () => {
    const web3 = new Web3("https://bsc-dataseed.binance.org");
    let accounts = await window.ethereum.enable();
    let myAddress = await window.ethereum.selectedAddress;
    setAddress(myAddress);

    var nft_contract_interface = new window.web3.eth.Contract(
      NftContract.abi,
      addresses.NFT_CONTRACTS_ADDRESS
    );

    nft_contract_interface.methods
      .totalSupply()
      .call()
      .then((totalNftCount) => {
        let nftIds = [];
        for (var i = 0; i < totalNftCount; i++) {
          nftIds.push(i);
        }
        Promise.all(
          nftIds.map((index) => {
            return Promise.resolve(
              nft_contract_interface.methods
                .tokenByIndex(index)
                .call()
                .then((currentTokenId) => {
                  return nft_contract_interface.methods
                    .nfts(currentTokenId - 1)
                    .call()
                    .then((currentNftData) => {

                    return nft_contract_interface.methods
                        .ownerOf(currentTokenId)
                        .call()
                        .then((owner) => {
                          return {
                            ...currentNftData,
                            id: currentTokenId - 1,
                            owner: owner,
                          };
                        });
                    });
                })
            );
          })
        )
          .then((values) => {
            setData(values);
          })
          .catch((err) => console.log("err", err));
      });
  }, [window.web3.eth]);

  console.log("data", data);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" style={{ marginBottom: 20, marginTop: 30 }}>
        Cheese Cake Shop
      </Typography>
      <MarketTab style={{ marginTop: 10 }} />
    </Container>
  );
};

export default MarketPlace;
