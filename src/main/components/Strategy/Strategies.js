import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Form, Badge, Modal, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import Logout from "src/main/layouts/nav/Logout";
import { Checkbox} from "@material-ui/core";
import { RadioButton, RadioButtonGroup , Radio} from '@material-ui/core';
import { FaPlus, FaMinus } from 'react-icons/fa';

const symbols = [
  { value: "BANKNIFTY", label: "BANKNIFTY" },
  { value: "FINNIFTY", label: "FINNIFTY" },
  { value: "MIDCPNIFTY", label: "MIDCPNIFTY" },
  { value: "NIFTY", label: "NIFTY" },
];

const lots = Array.from({ length: 15 }, (_, index) => ({
  value: (index + 1).toString(),
  label: (index + 1).toString(),
}));


const Strategies = () => {
  const [selectedOptionSymbol, setSelectedOptionSymbol] = useState(null);
  const [getAllExpiryData, setGetAllExpiryData] = useState([]);
  const [expiryOptions, setExpiryOptions] = useState([]);
  const [getAllStrikesData, setGetAllStrikesData] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [ltpSpread, setLtpSpread] = useState(0);
  const [legs, setLegs] = useState([]);
  const [tradeOption, setTradeOption] = useState('buy');
  const [tarBuyChecked, setTarBuyChecked] = useState(false);
  const [tarSellChecked, setTarSellChecked] = useState(false);
  const [tarBuyValue, setTarBuyValue] = useState('');
  const [tarSellValue, setTarSellValue] = useState('');
  const [leg1, setLeg1] = useState(0);
  const [leg2, setLeg2] = useState(0);
  const [leg3, setLeg3] = useState(0);
  const [leg4, setLeg4] = useState(0);

  const toggleCheckbox = (checkbox) => {
    if (checkbox === 'tarBuy') {
      setTarBuyChecked(!tarBuyChecked);
    } else if (checkbox === 'tarSell') {
      setTarSellChecked(!tarSellChecked);
    }
  };


  const handleTarBuyChange = (e) => {
    setTarBuyValue(e.target.value);
    let legValues;

    if (legs && legs.length === 3) {
        legValues = calculateLimitOrderLegPriceForThreeLegsTarBuy(e.target.value, legs);
    } else if (legs && legs.length === 4) {
        legValues = calculateLimitOrderLegPriceForFourLegsTarBuy(e.target.value, legs);
    } else {
        legValues = calculateLimitOrderLegPrice(e.target.value);
    }

    setLeg1(legValues.leg1Value);
    setLeg2(legValues.leg2Value);
    setLeg3(legValues.leg3Value);
    setLeg4(legValues.leg4Value);
  };

  const handleTarSellChange = (e) => {
      setTarSellValue(e.target.value);
      let legValues;

      if (legs && legs.length === 3) {
          legValues = calculateLimitOrderLegPriceForThreeLegsTarSell(e.target.value, legs);
      } else if (legs && legs.length === 4) {
          legValues = calculateLimitOrderLegPriceForFourLegsTarSell(e.target.value, legs);
      } else {
          legValues = calculateLimitOrderLegPriceforSell(e.target.value);
      }

      setLeg1(legValues.leg1Value);
      setLeg2(legValues.leg2Value);
      setLeg3(legValues.leg3Value);
      setLeg4(legValues.leg4Value);
  };

  const calculateLimitOrderLegPrice = (tarBuyValue) => {
    const selectedLegIndex = tarBuyChecked ? 0 : 1;
    const otherLegIndex = selectedLegIndex === 0 ? 1 : 0;
    const selectedLegPrice = legs[selectedLegIndex]?.price || 0;
    const otherLegPrice = legs[otherLegIndex]?.price || 0;
    const selectedLegType = legs[selectedLegIndex]?.type || 'BUY';
    const otherLegType = legs[otherLegIndex]?.type || 'BUY';
    const tarBuy = parseFloat(tarBuyValue);
  
    let leg1, leg2;
  
    if (tarBuyChecked) {
      if (selectedLegType === otherLegType && selectedLegType === 'BUY') {
        // Buy + Buy
        leg1 = tarBuy - (parseFloat(otherLegPrice) || 0);
        leg2 = ((parseFloat(selectedLegPrice) - tarBuy) || 0) * -1;
      } else if (selectedLegType === otherLegType && selectedLegType === 'SELL') {
        // Sell + Sell
        leg1 = tarBuy + (parseFloat(otherLegPrice) || 0);
        leg2 = ((parseFloat(selectedLegPrice) + tarBuy) || 0);
      } else {
        // Buy - Sell or Sell - Buy
        leg1 = tarBuy + (parseFloat(otherLegPrice) || 0);
        leg2 = (tarBuy - (parseFloat(selectedLegPrice) || 0)) * -1;
      }
    }
  
    return {
      leg1Value: `Buy Limit Order Leg 1 Price: ${leg1.toFixed(2)}`,
      leg2Value: `Buy Limit Order Leg 2 Price: ${leg2.toFixed(2)}`,
    };
  };
  
  const calculateLimitOrderLegPriceforSell = (tarSellValue) => {
    const selectedLegIndex = tarSellChecked ? 0 : 1;
    const otherLegIndex = selectedLegIndex === 0 ? 1 : 0;
    const selectedLegPrice = legs[selectedLegIndex]?.price || 0;
    const otherLegPrice = legs[otherLegIndex]?.price || 0;
    const selectedLegType = legs[selectedLegIndex]?.type || 'BUY';
    const otherLegType = legs[otherLegIndex]?.type || 'BUY';
    const tarSell = parseFloat(tarSellValue);
  
    let leg1, leg2;
  
    if (tarSellChecked) {
      if (selectedLegType === otherLegType && selectedLegType === 'BUY') {
        // Buy + Buy
        leg1 = tarSell - (parseFloat(otherLegPrice) || 0);
        leg2 = ((parseFloat(selectedLegPrice) - tarSell) || 0) * -1;
      } else if (selectedLegType === otherLegType && selectedLegType === 'SELL') {
        // Sell + Sell
        leg1 = tarSell + (parseFloat(otherLegPrice) || 0);
        leg2 = ((parseFloat(selectedLegPrice) + tarSell) || 0);
      } else {
        // Buy - Sell or Sell - Buy
        leg1 = tarSell + (parseFloat(otherLegPrice) || 0);
        leg2 = (tarSell - (parseFloat(selectedLegPrice) || 0)) * -1;
      }
    }
  
    return {
      leg1Value: `Sell Limit Order Leg 1 Price: ${leg1.toFixed(2)}`,
      leg2Value: `Sell Limit Order Leg 2 Price: ${leg2.toFixed(2)}`,
    };
  };

  const calculateLimitOrderLegPriceForThreeLegsTarBuy = (tarBuyValue, legs) => {
    const selectedLegIndex = tarBuyChecked ? 0 : 1;
    const otherLegIndex = selectedLegIndex === 0 ? 1 : 0;
    const thirdLegIndex = 2; // the third leg index is always 2
    const selectedLegPrice = legs[selectedLegIndex]?.price || 0;
    const otherLegPrice = legs[otherLegIndex]?.price || 0;
    const thirdLegPrice = legs[thirdLegIndex]?.price || 0;

    const selectedLegLots = legs[selectedLegIndex]?.lot?.value || 1;
    const otherLegLots = legs[otherLegIndex]?.lot?.value || 1;
    const thirdLegLots = legs[thirdLegIndex]?.lot?.value || 1;

    const selectedLegMultiplier = legs[selectedLegIndex]?.type === 'BUY' ? 1 : -1;
    const otherLegMultiplier = legs[otherLegIndex]?.type === 'BUY' ? 1 : -1;
    const thirdLegMultiplier = legs[thirdLegIndex]?.type === 'BUY' ? 1 : -1;

    const tarBuy = parseFloat(tarBuyValue);

    const leg1 = tarBuy - otherLegPrice * otherLegLots * otherLegMultiplier - thirdLegPrice * thirdLegLots * thirdLegMultiplier;
    const leg2 = (tarBuy - selectedLegPrice * selectedLegLots * selectedLegMultiplier - thirdLegPrice * thirdLegLots * thirdLegMultiplier) / 2;
    const leg3 = tarBuy - selectedLegPrice * selectedLegLots * selectedLegMultiplier - otherLegPrice * otherLegLots * otherLegMultiplier;

    return {
        leg1Value: `Buy Limit Order Leg 1 Price: ${leg1.toFixed(2)}`,
        leg2Value: `Buy Limit Order Leg 2 Price: ${leg2.toFixed(2)}`,
        leg3Value: `Buy Limit Order Leg 3 Price: ${leg3.toFixed(2)}`,
    };
  };

  const calculateLimitOrderLegPriceForThreeLegsTarSell = (tarSellValue, legs) => {
    const selectedLegIndex = tarSellChecked ? 0 : 1;
    const otherLegIndex = selectedLegIndex === 0 ? 1 : 0;
    const thirdLegIndex = 2; // the third leg index is always 2
    const selectedLegPrice = legs[selectedLegIndex]?.price || 0;
    const otherLegPrice = legs[otherLegIndex]?.price || 0;
    const thirdLegPrice = legs[thirdLegIndex]?.price || 0;

    const selectedLegLots = legs[selectedLegIndex]?.lot?.value || 1;
    const otherLegLots = legs[otherLegIndex]?.lot?.value || 1;
    const thirdLegLots = legs[thirdLegIndex]?.lot?.value || 1;

    const selectedLegMultiplier = legs[selectedLegIndex]?.type === 'BUY' ? 1 : -1;
    const otherLegMultiplier = legs[otherLegIndex]?.type === 'BUY' ? 1 : -1;
    const thirdLegMultiplier = legs[thirdLegIndex]?.type === 'BUY' ? 1 : -1;

    const tarSell = parseFloat(tarSellValue);

    const leg1 = tarSell - otherLegPrice * otherLegLots * otherLegMultiplier - thirdLegPrice * thirdLegLots * thirdLegMultiplier;
    const leg2 = (tarSell - selectedLegPrice * selectedLegLots * selectedLegMultiplier - thirdLegPrice * thirdLegLots * thirdLegMultiplier) / 2;
    const leg3 = tarSell - selectedLegPrice * selectedLegLots * selectedLegMultiplier - otherLegPrice * otherLegLots * otherLegMultiplier;

    return {
        leg1Value: `Sell Limit Order Leg 1 Price: ${leg1.toFixed(2)}`,
        leg2Value: `Sell Limit Order Leg 2 Price: ${leg2.toFixed(2)}`,
        leg3Value: `Sell Limit Order Leg 3 Price: ${leg3.toFixed(2)}`,
    };
  };

  const calculateLimitOrderLegPriceForFourLegsTarBuy = (tarBuyValue, legs) => {
    const selectedLegIndex = tarBuyChecked ? 0 : 1;
    const otherLegIndex = selectedLegIndex === 0 ? 1 : 0;
    const thirdLegIndex = 2; // the third leg index is always 2
    const fourthLegIndex = 3; // the fourth leg index is always 3
    const selectedLegPrice = legs[selectedLegIndex]?.price || 0;
    const otherLegPrice = legs[otherLegIndex]?.price || 0;
    const thirdLegPrice = legs[thirdLegIndex]?.price || 0;
    const fourthLegPrice = legs[fourthLegIndex]?.price || 0;

    const selectedLegLots = legs[selectedLegIndex]?.lot?.value || 1;
    const otherLegLots = legs[otherLegIndex]?.lot?.value || 1;
    const thirdLegLots = legs[thirdLegIndex]?.lot?.value || 1;
    const fourthLegLots = legs[fourthLegIndex]?.lot?.value || 1;

    const selectedLegMultiplier = legs[selectedLegIndex]?.type === 'BUY' ? 1 : -1;
    const otherLegMultiplier = legs[otherLegIndex]?.type === 'BUY' ? 1 : -1;
    const thirdLegMultiplier = legs[thirdLegIndex]?.type === 'BUY' ? 1 : -1;
    const fourthLegMultiplier = legs[fourthLegIndex]?.type === 'BUY' ? 1 : -1;

    const tarBuy = parseFloat(tarBuyValue);

    const leg1 = tarBuy - otherLegPrice * otherLegLots * otherLegMultiplier - thirdLegPrice * thirdLegLots * thirdLegMultiplier - fourthLegPrice * fourthLegLots * fourthLegMultiplier;
    const leg2 = tarBuy - selectedLegPrice * selectedLegLots * selectedLegMultiplier - thirdLegPrice * thirdLegLots * thirdLegMultiplier - fourthLegPrice * fourthLegLots * fourthLegMultiplier;
    const leg3 = tarBuy - selectedLegPrice * selectedLegLots * selectedLegMultiplier - otherLegPrice * otherLegLots * otherLegMultiplier - fourthLegPrice * fourthLegLots * fourthLegMultiplier;
    const leg4 = tarBuy - selectedLegPrice * selectedLegLots * selectedLegMultiplier - otherLegPrice * otherLegLots * otherLegMultiplier - thirdLegPrice * thirdLegLots * thirdLegMultiplier;

    return {
        leg1Value: `Buy Limit Order Leg 1 Price: ${leg1.toFixed(2)}`,
        leg2Value: `Buy Limit Order Leg 2 Price: ${leg2.toFixed(2)}`,
        leg3Value: `Buy Limit Order Leg 3 Price: ${leg3.toFixed(2)}`,
        leg4Value: `Buy Limit Order Leg 4 Price: ${leg4.toFixed(2)}`,
    };
  };


  const calculateLimitOrderLegPriceForFourLegsTarSell = (tarSellValue, legs) => {
    const selectedLegIndex = tarSellChecked ? 0 : 1;
    const otherLegIndex = selectedLegIndex === 0 ? 1 : 0;
    const thirdLegIndex = 2; // Assuming the third leg index is always 2
    const fourthLegIndex = 3; // Assuming the fourth leg index is always 3
    const selectedLegPrice = legs[selectedLegIndex]?.price || 0;
    const otherLegPrice = legs[otherLegIndex]?.price || 0;
    const thirdLegPrice = legs[thirdLegIndex]?.price || 0;
    const fourthLegPrice = legs[fourthLegIndex]?.price || 0;

    const selectedLegLots = legs[selectedLegIndex]?.lot?.value || 1;
    const otherLegLots = legs[otherLegIndex]?.lot?.value || 1;
    const thirdLegLots = legs[thirdLegIndex]?.lot?.value || 1;
    const fourthLegLots = legs[fourthLegIndex]?.lot?.value || 1;

    const selectedLegMultiplier = legs[selectedLegIndex]?.type === 'BUY' ? 1 : -1;
    const otherLegMultiplier = legs[otherLegIndex]?.type === 'BUY' ? 1 : -1;
    const thirdLegMultiplier = legs[thirdLegIndex]?.type === 'BUY' ? 1 : -1;
    const fourthLegMultiplier = legs[fourthLegIndex]?.type === 'BUY' ? 1 : -1;

    const tarSell = parseFloat(tarSellValue);

    const leg1 = tarSell - otherLegPrice * otherLegLots * otherLegMultiplier - thirdLegPrice * thirdLegLots * thirdLegMultiplier - fourthLegPrice * fourthLegLots * fourthLegMultiplier;
    const leg2 = tarSell - selectedLegPrice * selectedLegLots * selectedLegMultiplier - thirdLegPrice * thirdLegLots * thirdLegMultiplier - fourthLegPrice * fourthLegLots * fourthLegMultiplier;
    const leg3 = tarSell - selectedLegPrice * selectedLegLots * selectedLegMultiplier - otherLegPrice * otherLegLots * otherLegMultiplier - fourthLegPrice * fourthLegLots * fourthLegMultiplier;
    const leg4 = tarSell - selectedLegPrice * selectedLegLots * selectedLegMultiplier - otherLegPrice * otherLegLots * otherLegMultiplier - thirdLegPrice * thirdLegLots * thirdLegMultiplier;

    return {
        leg1Value: `Sell Limit Order Leg 1 Price: ${leg1.toFixed(2)}`,
        leg2Value: `Sell Limit Order Leg 2 Price: ${leg2.toFixed(2)}`,
        leg3Value: `Sell Limit Order Leg 3 Price: ${leg3.toFixed(2)}`,
        leg4Value: `Sell Limit Order Leg 4 Price: ${leg4.toFixed(2)}`,
    };
  };

  const addLeg = () => {
    setLegs((prevLegs) => [
      ...prevLegs,
      {
        // selectedOptionSymbol: null,
        expiryOptions: [],
        selectedExpiry: null,
        selectedStrike: null,
        type: "BUY",
        lot: { value: "1", label: "1" },
        price: "",
        bidInfo: "",
        askInfo: "",
      },
    ]);
  };

  const removeLeg = (index) => {
    const updatedLegs = [...legs];
    updatedLegs.splice(index, 1);
    setLegs(updatedLegs);
  };

  const toggleLegType = (index) => {
    const updatedLegs = [...legs];
    updatedLegs[index].type = updatedLegs[index].type === "BUY" ? "SELL" : "BUY";
    setLegs(updatedLegs);
  };

  const handleExpiryChange = (index, selectedExpiry) => {
    const updatedLegs = [...legs];
    updatedLegs[index].selectedExpiry = selectedExpiry;
    updatedLegs[index].expiryDates.sort((a, b) => new Date(a) - new Date(b));
    setLegs(updatedLegs);
  };
  
  const handleStrikeChange = (index, selectedStrike) => {
    const updatedLegs = [...legs];
    updatedLegs[index].selectedStrike = selectedStrike;
    updatedLegs[index].strikes.sort((a, b) => a.StrikePrice - b.StrikePrice);
    setLegs(updatedLegs);
  };
  
  const handleTypeChange = async (index, selectedType) => {
    const updatedLegs = [...legs];
    updatedLegs[index].selectedType = selectedType;

    if (selectedType.value === "CE" || selectedType.value === "PE") {
      try {
        const jwtAccessToken = localStorage.getItem('jwt_access_token');
        const jwtXtsAccessToken = localStorage.getItem('xts_access_token');

        const ltpUrl = `http://127.0.0.1:8081/lms-service/get_ltp_price/${selectedOptionSymbol.value}?access_token=${jwtXtsAccessToken}&source=WEB`;

        const ltpResponse = await axios.get(ltpUrl, {
          params: {
            symbol: selectedOptionSymbol.value,
            expiry: legs[index]?.selectedExpiry?.value, 
            strike: legs[index]?.selectedStrike?.value,
            type: selectedType.value,
          },
          headers: { "Auth-Token": jwtAccessToken, "Content-Type": "application/json" },
        });

        if (ltpResponse.status === 200) {
          const ltpPrice = ltpResponse.data?.LastTradedPrice;
          updatedLegs[index].price = ltpPrice;
          updatedLegs[index].bidInfo = ltpResponse.data.BidInfo || "";
          updatedLegs[index].askInfo = ltpResponse.data.AskInfo || "";
          updatedLegs[index].premium = calculatePremium(updatedLegs[index].lot.value, ltpPrice);
          setLegs(updatedLegs);
          setSelectedType(selectedType);
        } else {
          console.error('Error fetching LTP data:', ltpResponse.statusText);
          toast.error('Failed to fetch LTP!');
        }
      } catch (error) {
        console.error('Error processing LTP response:', error);
        toast.error('Failed to fetch LTP!');
      }
    }

    setLegs(updatedLegs);
  };

  const handleBidInfoChange = (index, e) => {
    console.log('Bid Info changed:', e.target.value);
    const updatedLegs = [...legs];
    updatedLegs[index].bidInfo = e.target.value;
    setLegs(updatedLegs);
  };
  const handleAskInfoChange = (index, e) => {
    const updatedLegs = [...legs];
    updatedLegs[index].askInfo = e.target.value;
    setLegs(updatedLegs);
  };
  const refreshLegTypes = async () => {
    try {
      const jwtAccessToken = localStorage.getItem('jwt_access_token');
      const jwtXtsAccessToken = localStorage.getItem('xts_access_token');
  
      const refreshPromises = legs.map(async (leg, index) => {
        if (leg.selectedType?.value === "CE" || leg.selectedType?.value === "PE") {
          if (leg.selectedOptionSymbol) {
            const ltpUrl = `http://127.0.0.1:8081/lms-service/get_ltp_price/${leg.selectedOptionSymbol.value}?access_token=${jwtXtsAccessToken}&source=WEB`;
  
            const ltpResponse = await axios.get(ltpUrl, {
              params: {
                symbol: leg.selectedOptionSymbol.value,
                expiry: leg.selectedExpiry?.value,
                strike: leg.selectedStrike?.value,
                type: leg.selectedType.value,
              },
              headers: { "Auth-Token": jwtAccessToken, "Content-Type": "application/json" },
            });
  
            if (ltpResponse.status === 200) {
              const ltpPrice = ltpResponse.data?.LastTradedPrice;
              const updatedLegs = [...legs];
              updatedLegs[index].price = ltpPrice;
              updatedLegs[index].premium = calculatePremium(leg.lot.value, ltpPrice);
              setLegs(updatedLegs);
            } else {
              console.error('Error fetching LTP data:', ltpResponse.statusText);
              toast.error('Failed to fetch LTP!');
            }
          }
        }
      });
  
      await Promise.all(refreshPromises);
    } catch (error) {
      console.error('Error processing LTP response:', error);
      toast.error('Failed to fetch LTP!');
    }
  };
  

  const calculatePremium = (lots, price) => {
    const lotSize = 50; // 1 lot = 50 shares
    const premium = lots * lotSize * price;
    return premium;
  };
  
  const handleLotsChange = (index, selectedOption) => {
    const updatedLegs = [...legs];
    updatedLegs[index].lot = selectedOption;
    updatedLegs[index].premium = calculatePremium(selectedOption.value, updatedLegs[index].price);
    setLegs(updatedLegs);
  };
  
  const handlePriceChange = (index, event) => {
    const updatedLegs = [...legs];
    updatedLegs[index].price = event.target.value;
    updatedLegs[index].premium = calculatePremium(updatedLegs[index].lot.value, event.target.value);
    setLegs(updatedLegs);
  };
  const handleSymbolChange = async (index, selectedOption) => {
    try {
      const jwtAccessToken = localStorage.getItem('jwt_access_token');
      const jwtXtsAccessToken = localStorage.getItem('xts_access_token');

      const instrumentsUrl = `http://127.0.0.1:8081/lms-service/instruments/${selectedOption.value}?access_token=${jwtXtsAccessToken}&source=WEB`;
      const expiryUrl = `http://127.0.0.1:8081/lms-service/expiry/${selectedOption.value}?exchangeSegment=2&series=OPTIDX`;

      const [expiryResponse, instrumentsResponse] = await Promise.all([
        axios.get(expiryUrl, { headers: { "Auth-Token": jwtAccessToken } }),
        axios.get(instrumentsUrl, { headers: { "Auth-Token": jwtAccessToken, "Content-Type": "application/json" } }),
      ]);

      if (expiryResponse.status === 200 && instrumentsResponse.status === 200) {
        const expiryData = expiryResponse.data;
        const instrumentsData = instrumentsResponse.data;

        const updatedLegs = [...legs];
        updatedLegs[index].symbol = selectedOption;
        updatedLegs[index].expiryDates = expiryData?.data?.result || [];
        updatedLegs[index].strikes = getAllStrikesData?.result || [];
        // Sort expiryDates array in ascending order
        updatedLegs[index].expiryDates.sort((a, b) => new Date(a) - new Date(b));

        // Sort strikes array in ascending order
        updatedLegs[index].strikes.sort((a, b) => a.StrikePrice - b.StrikePrice);
        setLegs(updatedLegs);
        setGetAllStrikesData(instrumentsData?.data || []);
        setGetAllExpiryData(expiryData?.data?.result || []);
      } else {
        console.error(
          'Error fetching data:',
          expiryResponse.statusText,
          instrumentsResponse.statusText
        );
        toast.error('Failed to fetch Expiry or Instruments!');
      }
    } catch (error) {
      console.error('Error processing response:', error);
      toast.error('Failed to fetch Expiry or Instruments!');
    }
  };

  // Function to calculate the final net premium
  const calculateFinalNetPremium = () => {
    // Separate Buy and Sell legs
    const buyLegs = legs.filter((leg) => leg.type === "BUY");
    const sellLegs = legs.filter((leg) => leg.type === "SELL");

    // Calculate net premium for each leg
    const buyNetPremium = buyLegs.reduce((total, leg) => total + leg.premium, 0);
    const sellNetPremium = sellLegs.reduce((total, leg) => total + leg.premium, 0);

    // Calculate the final net premium
    const finalNetPremium = buyNetPremium - sellNetPremium;

    // Determine the display text based on the condition
    const displayText = finalNetPremium > 0 ? "GET" : "PAY";

    return { finalNetPremium, displayText };
  };

  const { finalNetPremium, displayText } = calculateFinalNetPremium();


  const calculateSpread = () => {
    // Define multipliers
    const buyMultiplier = 1;
    const sellMultiplier = -1;
  
    // Separate Buy and Sell legs
    const buyLegs = legs.filter((leg) => leg.type === "BUY");
    const sellLegs = legs.filter((leg) => leg.type === "SELL");
  
    // Initialize bid and ask spread variables
    let bidSpread = 0;
    let askSpread = 0;
  
    // Function to calculate spread for a pair of legs (buy and sell)
    const calculateSpreadForPair = (buyLeg, sellLeg) => {
      const bidSpreadForPair = buyLeg.bidInfo * buyMultiplier + sellLeg.askInfo * sellMultiplier;
      const askSpreadForPair = buyLeg.askInfo * buyMultiplier + sellLeg.bidInfo * sellMultiplier;
  
      // Update overall bid and ask spread
      bidSpread += bidSpreadForPair;
      askSpread += askSpreadForPair;
    };
  
    // Calculate bid and ask spread for all possible combinations
    for (let i = 0; i < buyLegs.length; i++) {
      for (let j = 0; j < sellLegs.length; j++) {
        calculateSpreadForPair(buyLegs[i], sellLegs[j]);
      }
    }
  
    // If there are additional legs, calculate spread accordingly
    for (let i = 0; i < legs.length; i++) {
      if (legs[i].type === "BUY" && legs.length % 2 === 0) {
        bidSpread += legs[i].bidInfo * buyMultiplier;
        askSpread += legs[i].askInfo * buyMultiplier;
      } else if (legs[i].type === "SELL" && legs.length % 2 === 0) {
        bidSpread += legs[i].askInfo * sellMultiplier;
        askSpread += legs[i].bidInfo * sellMultiplier;
      }
    }
    return { bidSpread, askSpread };
  };
  
  // Use the calculateSpread function to get bidSpread and askSpread
  const { bidSpread, askSpread } = calculateSpread();

  const calculateMarketSpread = () => {
    // Separate Buy and Sell legs
    const buyLegs = legs.filter((leg) => leg.type === "BUY");
    const sellLegs = legs.filter((leg) => leg.type === "SELL");
  
    // Check if there are exactly two legs, one of each type
    if (legs.length === 2 && buyLegs.length === 1 && sellLegs.length === 1) {
      // Case: First leg is Buy and second leg is Sell
      const marketSpreadCase1 = buyLegs[0].askInfo - sellLegs[0].bidInfo;
  
      // Case: Both legs are Buy
      const marketSpreadCase2 = buyLegs.reduce((total, buyLeg) => total + buyLeg.askInfo, 0);
  
      // Case: Both legs are Sell
      const marketSpreadCase3 = sellLegs.reduce((total, sellLeg) => total + sellLeg.bidInfo, 0);
  
      // Determine which case to use based on the overall legs types
      const marketSpread = marketSpreadCase1 >= 0 ? marketSpreadCase1 :
        marketSpreadCase2 >= 0 ? marketSpreadCase2 :
        marketSpreadCase3;
  
      return marketSpread;
    } else {
      // Default calculation when not meeting the specified criteria
      // Check if there are exactly two legs and both are Buy
      if (legs.length === 2 && buyLegs.length === 2 && sellLegs.length === 0) {
        // Case: Both legs are Buy
        const marketSpreadCase2 = buyLegs.reduce((total, buyLeg) => total + buyLeg.askInfo, 0);
        return marketSpreadCase2;
      }
  
      // Check if there are exactly two legs and both are Sell
      if (legs.length === 2 && buyLegs.length === 0 && sellLegs.length === 2) {
        // Case: Both legs are Sell
        const marketSpreadCase3 = sellLegs.reduce((total, sellLeg) => total + sellLeg.bidInfo, 0);
        return marketSpreadCase3;
      }
      // Initialize market spread variable
      let marketSpread = 0;
  
      // Function to calculate market spread for a pair of legs (BUY and SELL)
      const calculateMarketSpreadForPair = (buyLeg, sellLeg) => {
        const spreadForPair = buyLeg.askInfo - sellLeg.bidInfo;
        // Update overall market spread
        marketSpread += spreadForPair;
      };
  
      // Calculate market spread for all possible combinations of BUY and SELL legs
      buyLegs.forEach((buyLeg) => {
        sellLegs.forEach((sellLeg) => {
          calculateMarketSpreadForPair(buyLeg, sellLeg);
        });
      });
  
      return marketSpread;
    }
  };
  
  const marketSpread = calculateMarketSpread();
  
  const calculateLtpSpread = () => {
    // Calculate LTP Spread based on finalNetPremium and update the state
    const calculatedLtpSpread = finalNetPremium / 50;
    setLtpSpread(calculatedLtpSpread);
  };

  const calculateMarketBuy = (legs) => {
    const buyLegs = legs.filter((leg) => leg.type === "BUY");
    const sellLegs = legs.filter((leg) => leg.type === "SELL");
  
    const buyMultiplier = 1;
    const sellMultiplier = -1;
  
    const marketBuy = legs.reduce((total, leg) => {
      const legValue = leg.type === "BUY" ? leg.askInfo : leg.bidInfo;
      const legMultiplier = leg.type === "BUY" ? buyMultiplier : sellMultiplier;
      return total + legValue * leg.lot.value * legMultiplier;
    }, 0);
  
    return marketBuy;
  };
  
  const calculateMarketSell = (legs) => {
    const buyLegs = legs.filter((leg) => leg.type === "BUY");
    const sellLegs = legs.filter((leg) => leg.type === "SELL");
  
    const buyMultiplier = 1;
    const sellMultiplier = -1;
  
    const marketSell = legs.reduce((total, leg) => {
      const legValue = leg.type === "BUY" ? leg.bidInfo : leg.askInfo;
      const legMultiplier = leg.type === "BUY" ? buyMultiplier : sellMultiplier;
      return total + legValue * leg.lot.value * legMultiplier;
    }, 0);
  
    return marketSell;
  };
  
  const marketBuy = calculateMarketBuy(legs);
  const marketSell = calculateMarketSell(legs);

  
  useEffect(() => {
    calculateLtpSpread();
  }, [finalNetPremium]);

 return (
    <div className="container mw-100 mt-5">
      <div className="card">
        <div className="card-header">
          <div className="col-lg-4">
            <h3>Symbol</h3>
            {legs.map((legItem, index) => (
              <Select
                key={index}
                value={legItem.selectedOptionSymbol}
                onChange={(selectedOption) => {
                  setSelectedOptionSymbol(selectedOption);
                  handleSymbolChange(index, selectedOption);
                }}
                options={symbols}
                name={`symbols-${index}`}
              />
            ))}
          </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div className="col-md-6">
            <button className="btn btn-primary me-2" onClick={addLeg}>
              <FaPlus /> Add Leg
            </button>
            <button
              className="btn btn-danger"
              onClick={() => removeLeg(legs.length - 1)}
              disabled={legs.length === 0}
            >
              <FaMinus /> Remove Leg
            </button>
          </div>
          <Logout/>
        </div>

        {/* Legs */}
        {legs?.map((legItem, index) => (
          <div className="row mt-5 mb-4" key={index}>
            <div className="col-md-1">
              <label htmlFor="state">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; B/S </label>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Badge href="" bg={legItem.type === "BUY" ? "secondary" : "danger"} onClick={() => toggleLegType(index)}>
                {legItem.type}
              </Badge>
            </div>
            <div className="col-md-2 mb-3">
              <label htmlFor="state">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Expiry</label>
              <Select
                value={legItem.selectedExpiry}
                options={(legItem.expiryDates?.length) ? (
                  legItem.expiryDates.map(date => ({
                    value: date,
                    label: new Date(date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })
                  }))
                ) : []}
                id="expiry"
                name="expiry"
                onChange={(selectedExpiry) => handleExpiryChange(index, selectedExpiry)}
              />
            </div>
            <div className="col-md-1 mb-3">
              <label htmlFor="zip">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Strike</label>
              <Select
                value={legItem.selectedStrike}
                options={(legItem.strikes?.length) ? (
                  legItem.strikes.map(strike => ({
                    value: strike?.StrikePrice?.toString(),
                    label: strike?.StrikePrice?.toString() || 'N/A',
                  }))
                ) : []}
                id="strike"
                name="strike"
                onChange={(selectedStrike) => handleStrikeChange(index, selectedStrike)}
              />
            </div>
            <div className="col-md-1 mb-3">
              <label htmlFor="state">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Type</label>
              <Select
                value={legItem.selectedType} // Use the value from the state
                options={[
                  { value: "CE", label: "CE" },
                  { value: "PE", label: "PE" },
                ]}
                id="type"
                name="type"
                onChange={(selectedType) => handleTypeChange(index, selectedType)}
              />
            </div>
            <div className="col-md-1 mb-3">
              <label htmlFor="lot">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lots</label>
                <Select
                  value={legItem.lot}
                  onChange={(option) => handleLotsChange(index, option)}
                  options={lots}
                  name="lots"
                />
              </div>
            <div className="col-md-1 mb-3">
              <label htmlFor="price">&nbsp;&nbsp;Price per share</label>
              <input
                type="text"
                className="form-control"
                placeholder=""
                value={legItem.price}
                onChange={(e) => handlePriceChange(index, e)}
              />
            </div>
            <div className="col-md-1 mb-3">
              <label htmlFor="bidInfo">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bid Info</label>
              <input
                type="text"
                className="form-control"
                placeholder=""
                value={legItem.bidInfo}
                onChange={(e) => handleBidInfoChange(index, e)}
              />
            </div>
          <div className="col-md-1 mb-3">
            <label htmlFor="askInfo">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ask Info</label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              value={legItem.askInfo}
              onChange={(e) => handleAskInfoChange(index, e)}
            />
          </div>
            <div className="col-md-1 mt-5">
              <div
                className="btn btn-danger shadow btn-xs sharp"
                title="Delete"
                onClick={() => removeLeg(index)}
              >
                <i className="fa fa-trash"></i>
              </div>
            </div>
            <div className="col-md-1 mb-3">
        <label htmlFor="state">Price per lot</label>
        <br />
        {typeof legItem.price === 'number' ? (legItem.price * 50).toFixed(2) : 'Invalid Price'} {/* Assuming 1 lot = 50 shares */}
      </div>
      <div className="col-md-1 mb-3">
        <label htmlFor="state">Net Premium</label>
        <br />
        {typeof legItem.premium === 'number' ? legItem.premium.toFixed(2) : 'Invalid Premium'}
      </div>
            </div>
            
          ))}
        </div>
        {/* Display the final net premium */}
        <div className="row mt-5">
          <div className="col-md-4">
            <table className="table responsive striped bordered">
              <tbody>
              <tr>
            <th colSpan="2" className="text-center font-weight-bold">
              Result
            </th>
          </tr>
              <tr>
                <td>Final Net Premium</td>
                <td style={{ color: finalNetPremium > 0 ? "green" : "red" }}>
                  {displayText} {Math.abs(finalNetPremium).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td>Final Bid Spread</td>
                <td>{Math.abs(bidSpread).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Final Ask Spread</td>
                <td>{Math.abs(askSpread).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Market Spread</td>
                <td style={{ color: marketSpread >= 0 ? "green" : "red" }}>
                  {Math.abs(marketSpread).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td>LTP Spread</td>
                <td style={{ color: ltpSpread > 0 ? "green" : "red" }}>
                  {ltpSpread.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td>Market Buy</td>
                <td>{marketBuy.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Market Sell</td>
                <td>{marketSell.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="container mt-3">
        <div className="card">
        <div className="card-body">
          <h5 className="card-title">Limit Order Calculations</h5>
          <p className="card-text">Give the Proper Input to get correct TarBuy AND TarSell</p>
        </div>
      <div className="row mt-3">
        <div className="col-md-2">
        </div>
        <div className="col-md-2">
        </div>
      <div className="col-md-2">
        <label>
          <Radio
            type="radio"
            name="tradeOption"
            checked={tradeOption === 'buy'}
            onChange={() => setTradeOption('buy')}
          />
          &nbsp;Buy&nbsp;
        <span style={{ fontSize: '1.1em' }}>
            <i className="fas fa-arrow-alt-circle-up text-success"></i> 
        </span>
        </label>
        </div>
        <div className="col-md-2">
        <label>
          <Radio
            type="radio"
            name="tradeOption"
            checked={tradeOption === 'sell'}
            onChange={() => setTradeOption('sell')}
          />
          &nbsp;
        <span>Sell&nbsp;
            <i className="fas fa-arrow-alt-circle-down text-danger"></i> 
        </span>
        </label>
        </div>
      <div className="row mt-3">
      <div className="col-md-2">
        </div>
      <div className="col-md-2">
        </div>
        <div className="col-md-2">
        &nbsp;&nbsp;&nbsp;
          <label>
            <Checkbox
              type="checkbox"
              checked={tradeOption === 'buy' && tarBuyChecked}
              onChange={() => toggleCheckbox('tarBuy')}
              disabled={tradeOption === 'sell'}
            />
            TarBuy
          </label>
          </div>
        <div className="col-md-2">
        &nbsp;&nbsp;&nbsp;&nbsp;
        <label>
          <Checkbox
            type="checkbox"
            checked={tradeOption === 'sell' && tarSellChecked}
            onChange={() => toggleCheckbox('tarSell')}
            disabled={tradeOption === 'buy'}
          />
          TarSell
        </label>
          <br/>
          <br/>
          <br/>
          <br/>
          </div>
            <div className="row">
              <div className="col-lg-3"></div>
              <div className="col-md-1">
            </div>
              <div className="col-lg-4">
                {tradeOption === 'buy' && tarBuyChecked && (
                  <div className="mb-4">
                    <label htmlFor="tarBuyInput">TarBuy Input:</label>
                    <input
                      type="text"
                      id="tarBuyInput"
                      className="form-control"
                      value={tarBuyValue}
                      onChange={handleTarBuyChange}
                    />
                  </div>
                )}
                {tradeOption === 'sell' && tarSellChecked && (
                  <div className="mb-4">
                    <label htmlFor="tarSellInput">TarSell Input:</label>
                    <input
                      type="text"
                      id="tarSellInput"
                      className="form-control"
                      value={tarSellValue}
                      onChange={handleTarSellChange}
                    />
                  </div>
                )}
                <div>
                  <p className="fs-5">{leg1}</p>
                  <p className="fs-5">{leg2}</p>
                  <p className="fs-5">{leg3}</p>
                  <p className="fs-5">{leg4}</p>
                  <br/>
                  <br/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Strategies;