 import React from "react";
 import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
// import React, { Suspense, useEffect, lazy } from 'react'
// import { HashRouter, Route, Switch } from 'react-router-dom'
import { RecoilRoot } from "recoil";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import MarketPlace from "./containers/marketPlace/marketPlace";
import Profile from "./containers/profile/profile";
import ItemPage from "./containers/itemPage/itemPage";
import IndexPage from "./containers/index/index";
import AvatarPage from "./containers/avatarPage/avatarPage";
import NotFoundPage from "./containers/notFoundPage/notFoundPage";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navbar from "./components/navbar/navbar";
import {  useRecoilValue, useRecoilState } from "recoil";
// import Footer from './components/Footer'
import { snackbarControllerAtom, snackbarTextAtom,  } from "./recoils/atoms";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Web3 from "web3";
const App = () => {
  const [metamask, setMetamask] = React.useState(false);

  const [snackbarController, setSnackbarController] = useRecoilState(snackbarControllerAtom);
  const snackbarText = useRecoilValue(snackbarTextAtom);



  const darkTheme = createMuiTheme({
    palette: {
      background: {
        paper: "#130A0C",
        default: "#130A0C",
      },

      text: {
        primary: "#f1ffe3",
        secondary: "#f1ffe3",

      },
      type: "dark",
      primary: {
      main: "#040404",
      },
      secondary: {
      main: "#11cb5f",
      },
      abc: {
        main: "#DF922B",
        hover: {
          borderColor: "#DF922B",
          color: "#DF922B",
        },
      },
    },
    status: {
      danger: "#0000ff",
    },
  });
// const web3 = new Web3("https://bsc-dataseed.binance.org");
  React.useEffect(() =>{
    if(!window.web3.eth && !window.ethereum){
      setMetamask(false);
    }
    else{
      setMetamask(true);
    }
  },[window.web3.eth, window.ethereum]);

  return (
    <>

    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        {metamask && <Navbar />}
    <Router>
        <Switch>
            <Route exact strict path="/" component={IndexPage} />
            <Route  exact strict path="/marketplace" component={MarketPlace} />
            <Route  exact strict path="/allItems" component={MarketPlace} />
            <Route exact strict path="/profile/:address" component={Profile} />
            <Route exact strict path="/item/:id" component={ItemPage} />
            <Route exact strict path="/avatars" component={AvatarPage} />
            <Route  exact strict path="/notFound" component={NotFoundPage} />
            </Switch>
            <Snackbar
              open={snackbarController}
              autoHideDuration={8000}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              onClose={()=>{
                setSnackbarController(false)
              }}
          >
            <SnackbarContent style={{
                backgroundColor:'#ff2015',
                color:"#f2f2f2",
                }}
                message={<span id="client-snackbar" >{snackbarText}</span>}
            />
          </Snackbar>
         </Router>
        </ThemeProvider>

        </>
  );
};

export default App;
