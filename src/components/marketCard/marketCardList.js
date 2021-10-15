import React from "react";

import { makeStyles, GridList, GridListTile } from "@material-ui/core";
import MarketCard from "./marketCard";

import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 280,
    width: 200,
  },
  control: {
    padding: theme.spacing(2),
  },
  gridList: {
    padding: "auto",
    margin: "auto",
  },
}));

const MarketCardList = (props) => {
  const classes = useStyles();
  // console.log(props.marketCards);

  const getGridListCols = () => {
    if (isWidthUp("xs", props.width)) {
      return 3;
    }

    if (isWidthUp("lg", props.width)) {
      return 3;
    }

    if (isWidthUp("md", props.width)) {
      return 2;
    }
    if (isWidthUp("sm", props.width)) {
      return 2;
    }

    return 1;
  };

  return (
    <GridList
      spacing={25}
      cellHeight={440}
      cols={getGridListCols()}
      className={classes.gridList}
    >
      {props.marketCards.map((cardItem, index) => {
        return (
          <GridListTile key={index}>
            <MarketCard
              name={cardItem.name}
              frequency={cardItem.rarity}
              owner={cardItem.owner}
              imgUrl={"https://ipfs.io/ipfs/"+cardItem.cid}
              price={cardItem.sellPrice}
              auctionPrice={cardItem.maxBid}
              type={cardItem.clothType}
              isBiddable={cardItem.isBiddable}
              isOnSale={cardItem.isOnSale}
              id={cardItem.id}
              isProfile={props.isProfile}
            />
          </GridListTile>
        );
      })}
    </GridList>
  );
};

{

}

export default withWidth()(MarketCardList);
