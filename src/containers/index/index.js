import React, { useState } from "react";
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
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    background: (props) =>
      props.color === 'red'
        ? 'linear-gradient(45deg, green 30%, #FF8E53 90%)'
        : 'linear-gradient(20deg, green 30%, darkcyan 90%)',
    border: 0,
    borderRadius: 12,
    boxShadow: (props) =>
      props.color === 'red'
        ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
        : '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    margin: 8,
  },
  root2: {
    background: (props) =>
      props.color === 'red'
        ? 'linear-gradient(45deg, green 30%, #FF8E53 90%)'
        : 'linear-gradient(45deg, darkgreen 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 12,
    boxShadow: (props) =>
      props.color === 'red'
        ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
        : '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    margin: 8,
  },
  boxes:{
    border: "1.5px solid #121212",
    borderRadius: 12,
    height: 280,
    width: 200,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: 5,
    padding:10,
    "&:hover": {
      backgroundColor: "#130A0C",
      borderColor: "#130A0C",
      boxShadow:
        "0 1px 3px rgba(255,255,255,0.12), 0 1px 3px rgba(255,255,255,0.24)",
      transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
      transition: "transform 0.15s ease-in-out",
    "&:hover": {
      transform: "scale3d(1.05, 1.05, 1)",
    },
    }
  },
  boxText:{
    margin:5,
    textAlign:"center",
    marginTop: 20
  },
});

const Index = () => {
  const [address, setAddress] = React.useState();
  const classes = useStyles();
  const [data, setData] = useRecoilState(allItems);

  React.useEffect(async () => {
    const web3 = new Web3("https://bsc-dataseed1.binance.org");
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
        for (var i = 15; i < totalNftCount; i=i+1) {

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

//  console.log("data", data);
const [sortStatus, setSortStatus] = useState(true);
const handleSort = () => {
    const data = [];
    if (sortStatus) {
        let sorted = data.sort((a, b) => a[1] - b[1]);
      data(sorted);
        setSortStatus(!sortStatus);
    } else {
        let sorted = data.sort((a, b) => b[1] - a[1]);
        data(sorted);
        setSortStatus(!sortStatus);
    }
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h2" style={{ marginBottom: 20, marginTop: 30 }}>
      <br /> 🥮 CheeseCake NFT Marketplace   <br />
      </Typography>
    <div className="boxes">
    <p> <b> IF YOU DO NOT FIND YOUR ASSETS HERE, THEN PLEASE NAVIGATE TO ALL ITEMS OR PROFILE PAGES.</b></p><br /><br />
    </div>

      <MarketTab style={{ marginTop: 10 }} />
      <button onClick={handleSort}>ClickMe to Sort</button>
    <div className="boxes">
    <p> <b> IF YOU DO NOT FIND YOUR ASSETS HERE, THEN PLEASE NAVIGATE TO ALL ITEMS OR PROFILE PAGES.</b></p>
    </div>
    </Container>
  );
};

// export default MarketPlace;

export default Index;
