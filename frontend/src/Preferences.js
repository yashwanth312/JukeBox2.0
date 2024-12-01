import React from "react";
import { useFormik } from "formik";
import Web3 from "web3";
import contractTransactABI from "./abi.json";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import "./styles.css";

import removedBgImage from "./images/Streaks Left.png";
import removedright from "./images/Streaks Right.png";
import boxes from "./images/block network.png";
import judebox from "./images/Jukebox.png";
import vibebox from "./images/VibeBox Logo.png";


function Preferences(props) {
  const prices = {
    bw: 0.0005,
    pv: 0.0002,
    il: 0.001,
  };

  const contractAddress = "0x1a470475Eef956B34e3E7134dCD6Fc703460a4dc";

  const calculateTotal = () => {
    return (
      (formik.values.theme === "bw" ? prices.bw : 0) +
      (formik.values.theme === "pv" ? prices.pv : 0) +
      (formik.values.theme === "il" ? prices.il : 0)
    ).toFixed(6);
  };

  const formik = useFormik({
    initialValues: {
      theme: "",
    },
    onSubmit: (values) => {
      const total = calculateTotal();
      Transact(total);
    },
  });

  async function Transact(amount) {

    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(contractTransactABI, contractAddress);
    const amountWei = web3.utils.toWei(amount.toString(), "ether");

    const selectedTheme = formik.values.theme || "N/A"; 

    console.log(selectedTheme)
    console.log(props.userAddress)
    console.log(amountWei)

    await contract.methods
      .sendRequest([selectedTheme])
      .send({
        from: props.userAddress,
        value: amountWei,
      });
  }

  return (

    <Box sx={{ maxWidth: 400, margin: "0 auto", padding: 2 }}>
      <Typography variant="h5" gutterBottom align="center">
        Choose a Theme
      </Typography>

    <Box className="custom-container">
      {/* Add the image */}
      <img src={removedBgImage} alt="Background" className="top-right-image" />
      <img src={removedright} alt="Background" className="top-left-image" />
      <img src={boxes} alt="Bottom Image" className="box-image" />
      <img src={judebox} alt="Bottom Image" className="judeleft-image" />
      <img src={judebox} alt="Bottom Image" className="juderight-image" />
      <img src={vibebox} alt="Bottom Image" className="vibebox-image" />
      <form onSubmit={formik.handleSubmit}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="song-label">Theme</InputLabel>
          <Select
            labelId="song-label"
            id="theme"
            name="theme"
            value={formik.values.theme}
            onChange={formik.handleChange}
            label="Song (0.0005 ETH)"
          >
            <MenuItem value="pv">Purple Vibes</MenuItem>
            <MenuItem value="il">Inferno of Love</MenuItem>
            <MenuItem value="bw">Blue Waves</MenuItem>

          </Select>
        </FormControl>

        

        <Typography variant="h6" className="custom-highlight" gutterBottom>
          Total Price: {calculateTotal()} ETH
        </Typography>

        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" className="custom-button" type="submit">
            Transfer
          </Button>
        </Box>
      </form>
    </Box>
    </Box>
  );
}

export default Preferences;
