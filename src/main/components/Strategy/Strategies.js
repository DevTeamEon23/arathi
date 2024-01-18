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
  const [legs, setLegs] = useState([]);

  const addLeg = () => {
    setLegs(prevLegs => [...prevLegs, { type: "BUY", symbol: "nifty", lot: { value: "1", label: "1" }, price: "" }], () => {
      console.log('After adding leg:', legs);
    });
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
    setLegs(updatedLegs);
  };

  const handleStrikeChange = (index, selectedStrike) => {
    const updatedLegs = [...legs];
    updatedLegs[index].selectedStrike = selectedStrike;
    setLegs(updatedLegs);
  };
  const handleTypeChange = (index, selectedType) => {
    const updatedLegs = [...legs];
    updatedLegs[index].selectedType = selectedType;
    setLegs(updatedLegs);
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
      // const jwtXtsAccessToken = localStorage.getItem('xts_access_token');
  
      const expiryResponse = await fetch(
        `http://127.0.0.1:8081/lms-service/expiry/${selectedOption.value}`,
        {
          method: 'GET',
          params: {
            exchangeSegment: 2,
            series: 'OPTIDX',
          },
          headers: {
            "Auth-Token": jwtAccessToken,
          },
        }
      );

      const jwtXtsAccessToken = localStorage.getItem('xts_access_token');
      const queryParams = new URLSearchParams({
        access_token: jwtXtsAccessToken,
        source: 'WEB',
      });
      
      const url = `http://127.0.0.1:8081/lms-service/instruments/${selectedOption.value}?${queryParams}`;
      
      const instrumentsResponse = await fetch(url, {
        method: 'GET',
        headers: {
          "Auth-Token": jwtAccessToken,
          "Content-Type": "application/json", // Set the content type if needed
        },
      });

      const ltpResponse = await axios.get(
        `http://127.0.0.1:8081/lms-service/get_ltp_price/${selectedOptionSymbol.value}?${queryParams}`,
        {
          params: {
            symbol: selectedOptionSymbol.value,
            expiry: legs.selectedExpiry?.value || "25JAN2024",
            // expiry: "25JAN2024", // Assuming you have selectedExpiry in leg
            strike: legs.selectedStrike?.value || "21500", 
            // strike: "21500", // Assuming you have selectedStrike in leg
            type: legs.selectedType?.value || "PE", // Assuming you have a static type or it is dynamic
            // access_token: jwtAccessToken,
            // source: "WEB",
          },
          headers: {
            "Auth-Token": jwtAccessToken,
            "Content-Type": "application/json", // Set the content type if needed
          },
        }
      );
  
      if (expiryResponse.ok && instrumentsResponse.ok) {
        const expiryData = await expiryResponse.json();
        const instrumentsData = await instrumentsResponse.json();
        console.log("expiryData:", expiryData);
        console.log("instrumentsData:", instrumentsData);
  
        const updatedLegs = [...legs];
        updatedLegs[index].symbol = selectedOption;
        updatedLegs[index].expiryDates = expiryData.result || [];
        updatedLegs[index].strikes = instrumentsData || [];
        updatedLegs[index].price = ltpResponse.data.LastTradedPrice;
        updatedLegs[index].premium = calculatePremium(
          updatedLegs[index].lot.value,
          ltpResponse.data.LastTradedPrice
        );

        setLegs(updatedLegs);
        setGetAllExpiryData(expiryData?.result || []);
      } else {
        console.error('Error fetching data:', expiryResponse.statusText, instrumentsResponse.statusText);
        toast.error('Failed to fetch Expiry!');
      }
    } catch (error) {
      console.error('Error processing response:', error);
      toast.error('Failed to fetch Expiry!');
    }
  };
  

  return (
    <div className="container mw-100 mt-5">
      <div className="card">
        <div className="card-header">
          <div className="col-lg-4">
            <h3>Symbol</h3>
            <Select
              value={selectedOptionSymbol}
              onChange={(selectedOption) => {
                setSelectedOptionSymbol(selectedOption);
                handleSymbolChange(0, selectedOption); // Assuming 0 is the index, adjust accordingly
              }}
              options={symbols}
              name="symbols"
            />
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
                // value={legItem.selectedExpiry}
                value = {"25JAN2024"}
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
            // value={legItem.selectedStrike}
            value={"21500"}
            options={getAllStrikesData}
            id="strike"
            name="strike"
            onChange={(selectedStrike) => handleStrikeChange(index, selectedStrike)}
          />
            </div>
            <div className="col-md-2 mb-3">
              <label htmlFor="state">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Type</label>
              <Select
                // value={legItem.selectedType}
                value={"CE"}
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
      {legItem.price * 50} {/* Assuming 1 lot = 50 shares */}
    </div>

    <div className="col-md-2 mb-3">
      <label htmlFor="state">Net Premium</label>
      <br />
      {legItem.premium}
    </div>
          </div>
          
        ))}
      </div>
      
    </div>
  );
};

export default Strategies;