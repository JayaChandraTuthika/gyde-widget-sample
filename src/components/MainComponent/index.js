import { useState } from "react";
import { FaLightbulb } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { TailSpin } from "react-loader-spinner";

import Widget from "../Widget";

import "./index.css";
import jsonData from "./data.json";

let statusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  sucess: "SUCCESS",
  failure: "FAILURE",
};
// console.log(jsonData);

const MainComponent = () => {
  const [widgetOpen, toggleWidget] = useState(false);
  const [floatingClass, setClass] = useState("");
  const [widgetData, setData] = useState({});
  const [status, setStatus] = useState(statusConstants.initial);

  const renderWidget = () => {
    // console.log("called");
    return <Widget details={widgetData} />;
  };
  // console.log(element)
  const ontoggleClick = () => {
    if (!widgetOpen) {
      // console.log("called")

      getWidgetDetails();
    }
    toggleWidget(!widgetOpen);
  };

  const renderLoader = () => (
    <div className="loader-container">
      <TailSpin color="blue" />
    </div>
  );

  const getWidgetDetails = async () => {
    setStatus(statusConstants.inProgress);

    const response = await fetch("www.google.com");
    console.log(response);
    if (response.ok === true) {
      // const data = await response.json()
      // console.log(data)
      const data = jsonData.answerArray.map((each) => ({
        id: uuidv4(),
        ...each,
      }));
      setTimeout(() => {
        setStatus(statusConstants.sucess);
        setData(data);
      }, 1000);
    } else {
      setStatus(statusConstants.failure);
    }
  };

  let element;

  switch (status) {
    case statusConstants.sucess:
      element = renderWidget();
      break;
    case statusConstants.inProgress:
      element = renderLoader();
      break;
    case statusConstants.failure:
      element = <h1>Failure</h1>;
      break;
    default:
      break;
  }

  return (
    <div className="main-bg">
      Hello
      <button type="button" className="widget-open-btn" onClick={ontoggleClick}>
        <FaLightbulb className="bulb-icon" />
      </button>
      <div className={`original ${widgetOpen ? "widget-container-1" : ""}`}>
        {/* {widgetOpen? <Widget/>: <h1>Loading</h1>} */}
        <div>
          <button
            type="button"
            className="widget-close-btn"
            onClick={ontoggleClick}
          >
            <FaLightbulb className="bulb-icon" />
          </button>
        </div>
        <div className="widget-bg-container">
          <div className="widget-card-header">
            <div className="widget-header-text-container">
              <h1 className="wh-heading">Hey there 👋,</h1>
              <p className="wh-para">I am Gyde for Gyde!</p>
            </div>
            <select className="laguage-select">
              <option className="laguage-option">English</option>
              <option className="laguage-option">Hindi</option>
            </select>
          </div>
          {element}
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
