import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Form, Badge } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import Logout from "src/main/layouts/nav/Logout";

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
  // const [legs, setLegs] = useState([]);
  const [legs, setLegs] = useState([
    {
      selectedOptionSymbol: null,
      expiryOptions: [],
      selectedExpiry: null,
      selectedStrike: null,
      type: "BUY",
      lot: { value: "1", label: "1" },
      price: "",
      // other properties for the leg
    },
  ]);

  const getUniqueSelectedTypes = () => {
    const selectedTypes = legs.map((leg) => leg.selectedType?.value).filter(Boolean);
    return [...new Set(selectedTypes)];
  };

  // const refreshLegTypes = () => {
  //   const updatedLegs = [...legs];
  //   updatedLegs.forEach((leg, index) => {
  //     updatedLegs[index].selectedType = selectedType;
  //   });
  //   setLegs(updatedLegs);
  // };

  const addLeg = () => {
    setLegs((prevLegs) => [
      ...prevLegs,
      {
        selectedOptionSymbol: null,
        expiryOptions: [],
        selectedExpiry: null,
        selectedStrike: null,
        type: "BUY",
        lot: { value: "1", label: "1" },
        price: "",
        bidInfo: "",  // Add bidInfo property
        askInfo: "",
        // other properties for the leg
      },
    ]);
  };

  const removeLeg = (index) => {
    const updatedLegs = [...legs];
    updatedLegs.splice(index, 1);
    setLegs(updatedLegs);
  };

  const handleDecrement = (index) => {
    const updatedLegs = [...legs];
    updatedLegs[index].lot =
      lots.find((lot) => lot.value === updatedLegs[index].lot.value - 1) || lots[0];
    setLegs(updatedLegs);
  };

  const handleIncrement = (index) => {
    const updatedLegs = [...legs];
    updatedLegs[index].lot =
      lots.find((lot) => lot.value === updatedLegs[index].lot.value + 1) || lots[lots.length - 1];
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
          // const bidinfo = ltpResponse.data?.BidInfo?.Price || ""; // Set to empty string if Bid Info is undefined
          // const askinfo = ltpResponse.data?.AskInfo?.Price || "";

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



    // // Function to calculate the final net premium
    // const calculateFinalNetPremium = () => {
    //   // Separate Buy and Sell legs
    //   const buyLegs = legs.filter((leg) => leg.type === "BUY");
    //   const sellLegs = legs.filter((leg) => leg.type === "SELL");
  
    //   // Calculate net premium for each leg
    //   const buyNetPremium = buyLegs.reduce((total, leg) => total + leg.premium, 0);
    //   const sellNetPremium = sellLegs.reduce((total, leg) => total + leg.premium, 0);
  
    //   // Calculate the final net premium
    //   return sellNetPremium - buyNetPremium;
    // };
  // Function to calculate the final net premium
  const calculateFinalNetPremium = () => {
    // Separate Buy and Sell legs
    const buyLegs = legs.filter((leg) => leg.type === "BUY");
    const sellLegs = legs.filter((leg) => leg.type === "SELL");

    // Calculate net premium for each leg
    const buyNetPremium = buyLegs.reduce((total, leg) => total + leg.premium, 0);
    const sellNetPremium = sellLegs.reduce((total, leg) => total + leg.premium, 0);

    // Calculate the final net premium
    const finalNetPremium = sellNetPremium - buyNetPremium;

    // Determine the display text based on the condition
    const displayText = finalNetPremium > 0 ? "GET" : "PAY";

    return { finalNetPremium, displayText };
  };

  const { finalNetPremium, displayText } = calculateFinalNetPremium();


  const calculateSpread = () => {
    // Separate Buy and Sell legs
    const buyLegs = legs.filter((leg) => leg.type === "BUY");
    const sellLegs = legs.filter((leg) => leg.type === "SELL");
  
    // If there is only one leg, return its bid and ask prices directly
    if (legs.length === 1) {
      const singleLeg = legs[0];
      return {
        bidSpread: singleLeg.bidInfo,
        askSpread: singleLeg.askInfo,
      };
    }
  
    // Initialize bid and ask spread variables
    let bidSpread = 0;
    let askSpread = 0;
  
    // Function to calculate spread for a pair of legs (buy and sell)
    const calculateSpreadForPair = (buyLeg, sellLeg) => {
      const bidSpreadForPair = buyLeg.bidInfo - sellLeg.askInfo;
      const askSpreadForPair = buyLeg.askInfo - sellLeg.bidInfo;
  
      // Update overall bid and ask spread
      bidSpread += bidSpreadForPair;
      askSpread += askSpreadForPair;
    };

    // Function to calculate spread for legs of the same type
    const calculateSpreadForSameType = (legsOfType) => {
      const bidSpreadForSameType = legsOfType.reduce((total, leg) => total + leg.bidInfo, 0);
      const askSpreadForSameType = legsOfType.reduce((total, leg) => total + leg.askInfo, 0);
  
      // Update overall bid and ask spread
      bidSpread += bidSpreadForSameType;
      askSpread += askSpreadForSameType;
    };

    // Calculate bid and ask spread for all possible combinations
    buyLegs.forEach((buyLeg) => {
      sellLegs.forEach((sellLeg) => {
        calculateSpreadForPair(buyLeg, sellLeg);
      });
    });
    // Calculate bid and ask spread for legs of the same type
    if (buyLegs.length > 1) {
      calculateSpreadForSameType(buyLegs);
    }
  
    if (sellLegs.length > 1) {
      calculateSpreadForSameType(sellLegs);
    }
  
    return { bidSpread, askSpread };
  };

  // // Function to calculate bid spread and ask spread
  // const calculateSpread = () => {
  //   // Separate Buy and Sell legs
  //   const buyLegs = legs.filter((leg) => leg.type === "BUY");
  //   const sellLegs = legs.filter((leg) => leg.type === "SELL");

  //   // Calculate bid spread for each leg
  //   const bidSpread = buyLegs.reduce((total, buyLeg) => {
  //     const sellLegsForBuy = sellLegs.map((sellLeg) => sellLeg.bidInfo || 0);
  //     return total + buyLeg.bidInfo - Math.max(...sellLegsForBuy);
  //   }, 0);

  //   // Calculate ask spread for each leg
  //   const askSpread = sellLegs.reduce((total, sellLeg) => {
  //     const buyLegsForSell = buyLegs.map((buyLeg) => buyLeg.askInfo || 0);
  //     return total + Math.max(...buyLegsForSell) - sellLeg.askInfo;
  //   }, 0);

  //   return { bidSpread, askSpread };
  // };

  // Use the calculateSpread function to get bidSpread and askSpread
  const { bidSpread, askSpread } = calculateSpread();

  // Display bidSpread and askSpread in your component
  console.log("Bid Spread:", bidSpread);
  console.log("Ask Spread:", askSpread);

  // const calculateMarketSpread = () => {
  //   // Separate Buy and Sell legs
  //   const buyLegs = legs.filter((leg) => leg.type === "BUY");
  //   const sellLegs = legs.filter((leg) => leg.type === "SELL");
  
  //   // Initialize market spread variable
  //   let marketSpread = 0;
  
  //   // Function to calculate market spread for a pair of legs (BUY and SELL)
  //   const calculateMarketSpreadForPair = (buyLeg, sellLeg) => {
  //     const spreadForPair = buyLeg.askInfo - sellLeg.bidInfo;
  //     // Update overall market spread
  //     marketSpread += spreadForPair;
  //   };
  
  //   // Calculate market spread for all possible combinations of BUY and SELL legs
  //   buyLegs.forEach((buyLeg) => {
  //     sellLegs.forEach((sellLeg) => {
  //       calculateMarketSpreadForPair(buyLeg, sellLeg);
  //     });
  //   });
  
  //   return marketSpread;
  // };
  // const marketSpread = calculateMarketSpread();


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
  
      // Determine which case to use based on the legs' types
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
  
      // Default calculation when not meeting the specified criteria
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
          </div>
          <div className="col-lg-8">
            <button className="btn btn-primary me-2" onClick={addLeg}>
              Add Leg
            </button>
            <button
              className="btn btn-danger"
              onClick={() => removeLeg(legs.length - 1)}
              disabled={legs.length === 0}
            >
              Remove Leg
            </button>
          </div>
          <Logout/>
        </div>

        {/* Legs */}
        {legs?.map((legItem, index) => (
          <div className="row mt-5 mb-4" key={index}>
            <div className="col-md-1 mb-3">
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
            <div className="col-md-2 mb-3">
              <label htmlFor="zip">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Strike</label>
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
            <div className="col-md-2 mb-3">
              <label htmlFor="state">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Type</label>
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
            <div className="col-md-2 mb-3">
              <label htmlFor="lot">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lots</label>
              {/* <div className="form-control custom-dropdown-container"> */}
                {/* <button className="minus" onClick={() => handleDecrement(index)}>
                  -
                </button> */}
                <Select
                  value={legItem.lot}
                  onChange={(option) => handleLotsChange(index, option)}
                  options={lots}
                  name="lots"
                />
                {/* <button className="plus" onClick={() => handleIncrement(index)}>
                  +
                </button> */}
              </div>
            {/* </div> */}
            <div className="col-md-1 mb-3">
              <label htmlFor="price">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Price per share</label>
              <input
                type="text"
                className="form-control"
                placeholder=""
                value={legItem.price}
                onChange={(e) => handlePriceChange(index, e)}
              />
            </div>
            <div className="col-md-1 mb-3">
              <label htmlFor="bidInfo">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bid Info</label>
              <input
                type="text"
                className="form-control"
                placeholder=""
                value={legItem.bidInfo}
                onChange={(e) => handleBidInfoChange(index, e)}
              />
            </div>
          <div className="col-md-1 mb-3">
            <label htmlFor="askInfo">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ask Info</label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              value={legItem.askInfo}
              onChange={(e) => handleAskInfoChange(index, e)}
            />
          </div>
            <div className="col-md-1 mt-5 mb-3">
              <div
                className="btn btn-danger shadow btn-xs sharp"
                title="Delete"
                onClick={() => removeLeg(index)}
              >
                <i className="fa fa-trash"></i>
              </div>
            </div>
            <div className="col-md-4 mb-3">
      <label htmlFor="state">Price per lot</label>
      <br />
      {typeof legItem.price === 'number' ? (legItem.price * 50).toFixed(2) : 'Invalid Price'} {/* Assuming 1 lot = 50 shares */}
    </div>

    <div className="col-md-2 mb-3">
      <label htmlFor="state">Net Premium</label>
      <br />
  {typeof legItem.premium === 'number' ? legItem.premium.toFixed(2) : 'Invalid Premium'}
    </div>
          </div>
          
        ))}
      </div>
      {/* Display the final net premium */}
      <div className="row mt-5">
        <div className="col-md-12 text-center">
          {/* <h4>Final Net Premium: {calculateFinalNetPremium().toFixed(2)}</h4> */}
          <h2 style={{ color: finalNetPremium > 0 ? "green" : "red" }}>
            Final Net Premium: {displayText} {Math.abs(finalNetPremium).toFixed(2)}
          </h2>
        </div>
        <div className="col-md-12 text-center">
          <h2>
            Final Bid Spread: {Math.abs(bidSpread).toFixed(2)}
          </h2>
        </div>
        <div className="col-md-12 text-center">
          <h2>
            Final Ask Spread: {Math.abs(askSpread).toFixed(2)}
          </h2>
        </div>
        <div className="col-md-12 text-center">
          <h2 style={{ color: marketSpread >= 0 ? "green" : "red" }}>
            Market Spread: {Math.abs(marketSpread).toFixed(2)}
          </h2>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12 text-center">
          <button className="btn btn-info" onClick={refreshLegTypes}>
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default Strategies;