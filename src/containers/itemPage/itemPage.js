import React from "react";
import Web3 from "web3";
import {
  makeStyles,
  Button,
  Grid,
  Container,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  Typography,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PanToolSharpIcon from "@material-ui/icons/PanToolSharp";
import LocalOfferSharpIcon from "@material-ui/icons/LocalOfferSharp";
import StarsIcon from "@material-ui/icons/Stars";
import CakeIcon from "@material-ui/icons/Cake";
import DnsIcon from "@material-ui/icons/Dns";
import ItemButtonGroup from "../../components/itemButtonGroup/itemButtonGroup";
import NftContract from "../../abis/nft.json";

import { getUsername } from "../../utils/getUsernameFromAddress";

import addresses from "../../constants/contracts";
import { useRecoilCallback } from "recoil";
import {
  allItems,
  itemData,
  myAddress,
  transactionData,
  itemIdAtom,
} from "../../recoils/atoms";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import {
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TwitterIcon
} from "react-share";

import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, RedditShareButton } from "react-share";

 const title = `${document.title}`;
 const shareUrl = `${window.location.href}`;
// const hashtag1 = "#CheeseCake";
// const hashtag2 = "#NFT";
// const hashtag3 = "#cheeseswap";
// const hashtag4 = "#BSC";


const transactionColors = {
  "On Sale": "#8f84d8ff",
  "Sale Cancelled": "#8058bcff",
  sold: "#b246b1ff",
  "Auction Starts": "#00D54B",
  "Auction Cancelled": "#f0388bff",
  Bidded: "#fa7658ff",
  "Sold From Auction": "#ff9a17ff",
  "Bid Withdrawn": "#f7c11fff",
  claimed: "#fd397eff",
};

const useStyles = makeStyles({
  myButton: {
    color: "#DF922B",
    backgroundColor: "#121212",
    height: 42,
    position: "relative",
    top: 7,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 5,
    border: "1px solid",
    borderColor: "#DF922B",
    "&:hover": {
      backgroundColor: "#DF922B",
      borderColor: "#DF922B",
      color: "#000",
    },
  },
});

const ItemPage = (props) => {


  const [data, setData] = useRecoilState(itemData);
  const [address, setAddress] = useRecoilState(myAddress);
  const [transactions, setTransactions] = useRecoilState(transactionData);
  const [id, setId] = useRecoilState(itemIdAtom);
  const [owner, setOwner] = React.useState("...");
  const web3 = new Web3("https://bsc-dataseed.binance.org");
  if(!window.web3.eth && !window.ethereum){
    window.location.href = window.location.origin;
  }

  React.useEffect(async () => {
    let accounts = await window.ethereum.enable();
    let myAddress = await window.ethereum.selectedAddress;
    setAddress(myAddress);
    const myId = props.match.params.id;
    setId(myId);


    var nft_contract_interface = new window.web3.eth.Contract(
      NftContract.abi,
      addresses.NFT_CONTRACTS_ADDRESS
    );


    nft_contract_interface.methods
      .tokenByIndex(myId)
      .call()
      .then((currentTokenId) => {
        return nft_contract_interface.methods
          .nfts(currentTokenId - 1)
          .call()
          .then((currentNftData) => {
            nft_contract_interface.methods
              .ownerOf(currentTokenId)
              .call()
              .then((owner) => {

                setData({ ...currentNftData, owner: owner });

                getUsername(nft_contract_interface, owner).then(
                  (data) => {
                    setOwner(data.username);
                  }
                );
              })
              .catch((error) => {
                console.log(error);
              });
          });
      })
      .catch((error) => {
        console.log(error);
        window.location = "/notFound";
      });

    nft_contract_interface
      .getPastEvents("nftTransaction", {
        filter: { id: parseInt(myId) + 1},
        fromBlock: 0,   // contract creation block
        toBlock: "latest",
      })
      .then((events) => {
        console.log("events.console.log", events);
        events.reverse();
        console.log("events.console.log reverse", events);
        setTransactions(events);
      });

      nft_contract_interface.events.nftTransaction({
        filter: { id: parseInt(myId) + 1 },
        fromBlock: 0,
        toBlock: "latest",
    }, function(error, events){})
    .on('data', function(events){

        window.location.reload();

    })
    .on('changed', function(events){

        console.log("events is changed",events);
    })
    .on('error', console.error);

  }, [window.web3.eth]);

  const classes = useStyles();

  if (
    !data ||
    data.owner == undefined ||
    transactions == undefined ||
    id == undefined
  ) {
    return <div>loading</div>;
  }

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="flex-start"

    >
      <Grid item xs={3}>
        <Grid
          container
          style={{ marginTop: 80 }}
          direction="column"
          justify="center"
          alignItems="center"
          style={{ height: 490 }}
        >
          <div>
            <img style={{ width: 490 }} src={"https://ipfs.io/ipfs/"+data.cid} />
          </div>

        </Grid>
      </Grid>
      <Grid item xs={8}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          style={{ height: "90vh" }}
        >
          <Grid container style={{ marginTop: 40 }}>
            <Grid item xs={12}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
              >
              <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginLeft: 20,
                  }}
                >
                  <div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <Typography variant="h2" display="block"    gutterbottom="true">
                        {data.name}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginBottom: 20,
                      }}
                    >
                      <StarsIcon
                        style={{
                          verticalAlign: "middle",
                          marginTop: 5,
                          marginRight: 10,
                          fontSize: 20,
                        }}
                      />
                      <Typography
                        variant="overline"
                        display="block"
                        gutterbottom="true"
                      >
                        Rarity: {data.rarity}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginBottom: 10,
                      }}
                    >
                      <AccountCircleIcon
                        style={{
                          verticalAlign: "middle",
                          marginTop: 15,
                          marginRight: 10,
                          fontSize: 20,
                        }}
                      />
                      <Typography
                        variant="body1"
                        display="block"
                        gutterbottom="true"
                        style={{ marginRight: 10, marginTop: 15 }}
                      >
                        Owner:{" "}
                      </Typography>
                      <Button
                        variant="outlined"
                        className={classes.myButton}
                        onClick={() => {
                          window.location = "/profile/" + data.owner;
                        }}
                      >
                        {owner}
                        </Button>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginBottom: 10,
                      }}
                    >
                      <LocalOfferSharpIcon
                        style={{
                          verticalAlign: "middle",
                          marginTop: 3,
                          marginRight: 10,
                          fontSize: 20,
                        }}
                      />
                      <Typography variant="body1" display="block" gutterbottom ="true">
                        Price: {data.isOnSale ? window.web3.utils.fromWei(data.sellPrice) + " BNB" : "-"}
                      </Typography>
                    </div>
                    <div>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <PanToolSharpIcon
                          style={{
                            verticalAlign: "middle",
                            marginRight: 10,
                            marginTop: 2,
                            fontSize: 20,
                          }}
                        />
                        <Typography
                          variant="body1"
                          display="block"
                          gutterbottom="true"
                        >
                          Highest Bid:{" "}
                          {data.isBiddable ? window.web3.utils.fromWei(data.maxBid) + " BNB" : "-"}
                        </Typography>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <StarsIcon
                            style={{
                              verticalAlign: "middle",
                              marginRight: 10,
                              marginTop: 24,
                              fontSize: 20,
                            }}
                          />
                          <Typography
                            variant="body1"
                            display="block"
                            gutterbottom="true"
                          >
                          <br /> IPFS Proof: <a href={"https://ipfs.io/ipfs/"+data.cid} target="_blank" rel="nopener nofollow">&nbsp;<b>{"https://ipfs.io/ipfs/"+data.cid}</b></a>

                          </Typography>
                          </div>
                          <div style={{ display: "flex", flexDirection: "row" }}>
                            <CakeIcon
                              style={{
                                verticalAlign: "middle",
                                marginRight: 10,
                                marginTop: 24,
                                fontSize: 20,
                              }}
                            />
                            <Typography
                              variant="body1"
                              display="block"
                              gutterbottom="true"
                            >
                            <br /> CheeseCake Type: &nbsp;&nbsp;<b>{data.clothType}</b>

                            </Typography>
                            </div>
                        <div style={{ display: "flex", flexDirection: "row", marginTop: 20, paddingLeft: 5, paddingRight: 5, marginLeft: 5, marginRight: 5 }}>
                        <h3> Share: </h3>&nbsp;&nbsp;
                        <TwitterShareButton
                          url={shareUrl}
                          title={title}
                          hashtags={["CheeseCake", "NFT", "BSC", "CheeseSwap"]}
                          className="socialShare">
                         <TwitterIcon
                          size={32}
                          round />
                        </TwitterShareButton> &nbsp;&nbsp;
                        <FacebookShareButton
                          url={shareUrl}
                          title={title}
                          hashtags={["CheeseCake", "NFT", "BSC", "CheeseSwap"]}
                          className="socialShare">
                         <FacebookIcon
                          size={32}
                          round />
                        </FacebookShareButton> &nbsp;&nbsp;
                        <LinkedinShareButton
                          url={shareUrl}
                          title={title}
                          hashtags={["CheeseCake", "NFT", "BSC", "CheeseSwap"]}
                          className="socialShare">
                         <LinkedinIcon
                          size={32}
                          round />
                        </LinkedinShareButton> &nbsp;&nbsp;
                        <RedditShareButton
                          url={shareUrl}
                          title={title}
                          hashtags={["CheeseCake", "NFT", "BSC", "CheeseSwap"]}
                          className="socialShare">
                         <RedditIcon
                          size={32}
                          round />
                        </RedditShareButton>
                        </div>

                    </div>
                  </div>
                  <div style={{ marginRight: 140, marginTop: 30 }}>
                    <ItemButtonGroup />
                  </div>
                </div>
                {/* </Paper> */}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
              >
                {/* <Paper variant="outlined"> */}
                <TableContainer
                  component={Paper}
                  style={{ marginTop: 50, width: "60vw", height: "40vh" }}
                >
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="center"
                          style={{
                            backgroundColor: "#232323",
                          }}
                        >
                          Type
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            backgroundColor: "#232323",
                          }}
                        >
                          From
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            backgroundColor: "#232323",
                          }}
                        >
                          To
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            backgroundColor: "#232323",
                          }}
                        >
                          Amount
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            backgroundColor: "#232323",
                          }}
                        >
                          Txn
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transactions.map((transaction, index) => {
                        console.log(transaction);
                        return (
                          <TableRow
                            key={index}
                            style={{
                              backgroundColor:
                                transactionColors[
                                  transaction.returnValues.transactionType
                                ],
                            }}
                          >
                            <TableCell align="center" style={{color:"#000", fontSize: 16}}>
                              {transaction.returnValues.transactionType}
                            </TableCell>

                            <TableCell align="center" style={{color:"#000", fontSize: 16}}>
                              {transaction.returnValues.fromAddress ==
                              "0x0000000000000000000000000000000000000000"? (
                                "-"
                              ) : (
                                <Button
                                  size="small"
                                  style={{fontSize: 16}}
                                  color="primary"
                                  onClick={() => {
                                    window.location = "/profile/" + data.owner;
                                  }}
                                >
                                  {transaction.returnValues.fromAddress.slice(
                                    0,
                                    4
                                  ) +
                                    "..." +
                                    transaction.returnValues.fromAddress.slice(
                                      transaction.returnValues.fromAddress
                                        .length - 2,
                                      transaction.returnValues.fromAddress
                                        .length
                                    )}
                                </Button>
                              )}
                            </TableCell>
                            <TableCell align="center" style={{color:"#000", fontSize: 16}}>
                              {transaction.returnValues.toAddress ==
                              "0x0000000000000000000000000000000000000000"? (
                                "-"
                              ) : (
                                <Button
                                  size="small"
                                  style={{fontSize: 16}}
                                  color="primary"
                                  onClick={() => {
                                    window.location = "/profile/" + data.owner;
                                  }}
                                >
                                  {transaction.returnValues.toAddress.slice(
                                    0,
                                    4
                                  ) +
                                    "..." +
                                    transaction.returnValues.toAddress.slice(
                                      transaction.returnValues.toAddress
                                        .length - 2,
                                      transaction.returnValues.toAddress.length
                                    )}
                                </Button>
                              )}
                            </TableCell>
                            <TableCell align="center" style={{color:"#000", fontSize: 16}}>
                              {transaction.returnValues.value == 0
                                ? " - "
                                : window.web3.utils.fromWei(transaction.returnValues.value) + " BNB"}
                            </TableCell>
                            <TableCell align="center" style={{color:"#000", fontSize: 16}}>
                            <Button
                                  size="small"
                                  style={{fontSize: 16}}
                                  color="primary"
                                  onClick={() => {
                                    window.location.href =  "https://bscscan.com/tx/" + transaction.transactionHash;
                                  }}
                                >
                              {transaction.transactionHash.slice(0, 4) +
                                "..." +
                                transaction.transactionHash.slice(
                                  transaction.transactionHash.length - 2,
                                  transaction.transactionHash.length
                                )}
                            </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
                {/* </Paper> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ItemPage;
