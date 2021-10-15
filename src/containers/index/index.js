import React from "react";
import Snackbar from '@material-ui/core/Snackbar';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
  AppBar,
  Tab,
  Tabs,
  Box,
  Button,
  IconButton,
  Switch,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  Select,
  Input,
  TextField,
  SnackbarContent
} from "@material-ui/core";


import StoreMallDirectorySharpIcon from '@material-ui/icons/StoreMallDirectorySharp';
import DirectionsRunSharpIcon from '@material-ui/icons/DirectionsRunSharp';
import FormatListNumberedSharpIcon from '@material-ui/icons/FormatListNumberedSharp';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ShareSharpIcon from '@material-ui/icons/ShareSharp';


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
  const classes = useStyles();
    const [snackOpen, setSnackOpen] = React.useState(false);

    React.useEffect(() =>{
        if(!window.eth && !window.ethereum){
            setSnackOpen(true);
          }
          else{
            setSnackOpen(false);
          }
    },[window.eth, window.ethereum]);

    function MyButton(props) {
      const { color, ...other } = props;
      const classes = useStyles(props);
      return <Button className={classes.root} {...other} />;
    }

    return (
<Container maxWidth="md">
    <Snackbar
        open={snackOpen}
        // autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        // onClose={()=>{
        //             setSnackOpen(false)
        //         }}
    >
      <SnackbarContent style={{
          backgroundColor:'#130A0C',
          color: '#DF922B',
          width: "100%",
          fontSize: 14,
          }}
          message={<span id="client-snackbar" >In order to proceed to the marketplace and profile pages, you should install Metamask extension to your browser.</span>}
      />
    </Snackbar>
    <Typography variant="h2" align="center" component="h1" gutterbottom="true" style={{paddingTop:"2vw", color:"#DF922B", fontSize: 70}}>
         <br />    🥮 Cheese Cake Shop <br /> <br />
            </Typography>
        <div style = {{
              display: "flex",
              flexDirection: "row",
              marginTop: 30,
              marginRight:"2vw",
              marginLeft:"6vw"
            }}
            >
              <div  className={classes.boxes}
                    onClick={() => {
                    window.location.href = "/marketplace";
                  }}>
                <StoreMallDirectorySharpIcon style={{ color: "#DF662B", fontSize: 50}}/>
                <Typography className ={classes.boxText}>
                  Buy & Sell
                </Typography>
              </div>
              <div className={classes.boxes}
                  onClick={() => {
                        window.location.href = "/marketplace";
                  }}
                  >
                <DirectionsRunSharpIcon style={{ color: "#DF662B", fontSize: 50}}/>
                <Typography className ={classes.boxText}>
                  Chase & Bid
                </Typography>
              </div>
              <div className={classes.boxes}
                  onClick={() => {
                        window.location.href = "/marketplace";
                  }}
              >
                <FormatListNumberedSharpIcon style={{ color: "#DF662B", fontSize: 50}}/>
                <Typography className ={classes.boxText}>
                  Make Best Deal!
                </Typography>
              </div>
              </div>

        <Grid style={{marginRight: "3vw", marginLeft: "3vw", marginTop:20}}>

        </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="baseline"
      >
        <Grid>
          <React.Fragment>
          {!snackOpen?
            <MyButton style={{marginTop: "2"},  {marginBottom: "2"}} onClick={() => {
                      window.location.href = "/marketplace";
                    }} color="black"><b>Go To MarketPlace!</b></MyButton>
                    :<MyButton style={{marginTop: "2"}, {marginBottom: "2"}} disabled onClick={() => {
                      window.location.href = "/marketplace";
                    }} color="black"><b>Go To MarketPlace!</b></MyButton>}
          </React.Fragment>
        </Grid>
      </Grid>
    </Container>
    )
}
export default Index;
