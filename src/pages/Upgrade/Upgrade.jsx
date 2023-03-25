import React, { useRef } from "react";
import "./Upgrade.scss";
import { useState, useEffect } from "react";
import WhiteButton from "../../components/WhiteButton/WhiteButton";
import { createTheme, Slider } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import ProgressBar from "@ramonak/react-progress-bar";
import { get_session_token, get_user } from "../../network/communication";
import Banner from "../../components/Banner/Banner";
import { getMostMissedColor } from "../../constants/constants.js";
import Xarrow from "react-xarrows";
import { StaticMathField } from "react-mathquill";
import AnalyticsBadge from "../../components/AnalyticsBadge/AnalyticsBadge";
import { lightBlue } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import { alpha } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";

function Upgrade(props) {
  var user = props.user;
  var setUser = props.setUser;
  useEffect(() => {
    get_user(function (user) {
      if (user.success) {
        setUser(user);
      }
      else {
        window.location.href = "https://quizzynow.com/upgrade"
      }
    });
    document.title = "Quizzy+ - Quizzy";
  }, []);

  const [pricing, setPricing] = useState(
    user?.membership % 2 == 0 ? "yearly" : "monthly"
  );

  const [pricingAnalytics, setPricingAnalytics] = useState(
    user?.plans != undefined && user?.plans.analytics != undefined
      ? user?.plans.analytics
      : 1
  );

  const LightBlue = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "#8358E8",
      "&:hover": {
        backgroundColor: alpha("#8358E8", theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#8358E8",
    },
  }));

  var currentPlan = user?.membership > 0 && user?.membership_info?.plan;

  const [mostDifficultTermsTemplate] = useState({
    abase: 7,
    adaptation: 5,
    abess: 2,
    abdicate: 1,
  });

  const [mostDifficultTermsDefinitions] = useState({
    abase: "to belittle or degrade (someone)",
    adaptation: "to change to be better suited at something",
    abess: "female superior of nuns",
    abdicate: "to give up one's throne"
  })
  const [highestMissedTermIndex] = useState(
    mostDifficultTermsTemplate["abase"]
  );
  const [oftenSliderValue, setOftenSliderValue] = useState(100);
  const [oftenSliderLabel, setOftenSliderLabel] = useState("Extremely often");

  const theme = createTheme({
    palette: {
      primary: {
        main: "#8358E8",
      },
    },
  });

  const GetRandomFriend = function () {
    return user?.friends[
      Object.keys(user?.friends)[
        Math.floor(Math.random() * Object.keys(user?.friends).length)
      ]
    ];
  };

  const [plans] = useState([
    //50 KB regular image upload size; 500 KB basic; 3 MB standard
    {
      plan: "Quizzy+ Basic",
      priceMonthly: "3.99",
      priceYearly: "37.99",
      planId: [1, 2],
      banners: [["MOST POPULAR", "red"]],
      features: [
        "No ads",
        "Animated avatars",
        "Custom Recall Sessions",
        "500 KB Image Upload Size",
        "Quizzy+ Badge",
        "Quizzy+ Theme",
      ],
    },
    {
      plan: "Quizzy+ Premium",
      outdatedPriceMonthly: "11.99",
      outdatedPriceYearly: "120.99",
      priceMonthly: "7.99",
      priceYearly: "79.99",
      planId: [3, 4],
      banners: [["RECOMMENDED", "purple"]],
      features: [
        "Everything in Quizzy+ Basic",
        "5 MB Image Upload Size",
        "Most Difficult Terms",
        "Combine Sets",
        "Add Tasks",
        "Study Reports",
        "Priority Support",
      ],
    },
  ]);

  const [otherPlans] = useState([
    {
      plan: "Analytics",
      outdatedPriceYearly: "34.99",
      priceYearly: "32.99",
      priceMonthly: "2.99",
      features: [
        "Memory Retention",
        "Recall Difficulty Distribution",
        "Term Attempt Distribution",
        "Friend Comparison",
      ],
    },
  ]);

  const createCheckoutSession = function (productId) {
    window.location.href =
      "https://quizzynow.com/php/payments/payment_init.php?product=" +
      productId +
      "&auth_cookie=" +
      get_session_token();
  };

  useEffect(() => {
    setPricing(
      user?.membership > 0 && user?.membership % 2 == 0 ? "yearly" : "monthly"
    );
  }, [user]);

  return (
    <>
      <main className="upgrade-background">
        {/* Rightmost SVG */}
        <Helmet>
          <meta
            name="description"
            content="Upgrade your Quizzy membership to Quizzy+ to soar past your classmates and turn that A into an A+!"
          />
          <meta property="og:title" content="Upgrade - Quizzy" />
          <meta
            property="og:description"
            content="Upgrade your Quizzy membership to Quizzy+ to soar past your classmates and turn that A into an A+!"
          />
          <meta name="theme-color" content="#f5f5fb" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui"
          />
          <meta
            property="og:image"
            content="https://quizzynow.com/Untitled-1.png"
          />
        </Helmet>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="727.091"
          height="1178.775"
          viewBox="0 0 727.091 1178.775"
          className="right-svg-cover">
          <path
            id="Path_283"
            data-name="Path 283"
            d="M11035.293-6480s-46.44,56.477-39.177,110.044,98.054,107.134,96.843,218.73-149.148,470.94-43.223,566.914,92.854,198.642,172.75,191.946,499.949,0,499.949,0V-6570.831Z"
            transform="translate(-10995.345 6570.831)"
            fill="#8358e8"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="727.091"
          height="1178.775"
          viewBox="0 0 727.091 1178.775"
          className="right-svg-cover right-svg-cover-transparent">
          <path
            id="Path_284"
            data-name="Path 284"
            d="M11035.293-6480s-46.44,56.477-39.177,110.044,98.054,107.134,96.843,218.73-149.148,470.94-43.223,566.914,92.854,198.642,172.75,191.946,499.949,0,499.949,0V-6570.831Z"
            transform="translate(-10995.345 6570.831)"
            fill="#8358e8"
            opacity="0.16"
          />
        </svg>
        {/* Cloud SVGs */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="153"
          height="31"
          viewBox="0 0 153 31"
          className="cloud-svg cloud-svg-1">
          <rect
            id="Rectangle_1187"
            data-name="Rectangle 1187"
            width="153"
            height="31"
            rx="15.5"
            fill="#8358e8"
            opacity="0.27"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="199"
          height="31"
          viewBox="0 0 199 31"
          className="cloud-svg cloud-svg-2">
          <rect
            id="Rectangle_1188"
            data-name="Rectangle 1188"
            width="199"
            height="31"
            rx="15.5"
            fill="#8358e8"
            opacity="0.4"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="103"
          height="31"
          viewBox="0 0 103 31"
          className="cloud-svg cloud-svg-3">
          <rect
            id="Rectangle_1189"
            data-name="Rectangle 1189"
            width="103"
            height="31"
            rx="15.5"
            fill="#8358e8"
            opacity="0.7"
          />
        </svg>

        {/* Circles */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          className="circle"
          id="circle-1">
          <circle
            id="Ellipse_421"
            data-name="Ellipse 421"
            cx="16"
            cy="16"
            r="16"
            fill="#e7deff"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 64 64"
          className="circle"
          id="circle-2">
          <circle
            id="Ellipse_419"
            data-name="Ellipse 419"
            cx="32"
            cy="32"
            r="32"
            fill="#c7b6f4"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="126"
          height="126"
          viewBox="0 0 126 126"
          className="circle"
          id="circle-3">
          <circle
            id="Ellipse_420"
            data-name="Ellipse 420"
            cx="63"
            cy="63"
            r="63"
            fill="#a586ee"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="56"
          height="56"
          viewBox="0 0 56 56"
          className="circle"
          id="circle-4">
          <circle
            id="Ellipse_425"
            data-name="Ellipse 425"
            cx="28"
            cy="28"
            r="28"
            fill="#fff"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          className="circle"
          id="circle-5">
          <circle
            id="Ellipse_424"
            data-name="Ellipse 424"
            cx="15"
            cy="15"
            r="15"
            fill="#fff"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="56"
          height="56"
          viewBox="0 0 56 56"
          className="circle"
          id="circle-6">
          <circle
            id="Ellipse_423"
            data-name="Ellipse 423"
            cx="28"
            cy="28"
            r="28"
            fill="#fff"
          />
        </svg>
        {/* Angled cloud things */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="409.581"
          height="313.813"
          viewBox="0 0 409.581 313.813"
          className="circle"
          id="angled-cloud">
          <g
            id="Group_2054"
            data-name="Group 2054"
            transform="translate(-1415 -736.451)">
            <g
              id="Rectangle_1191"
              data-name="Rectangle 1191"
              transform="translate(1415 996.376) rotate(-34)"
              fill="#fff"
              stroke="#707070"
              stroke-width="1"
              opacity="0.16">
              <rect width="450.201" height="65" rx="32.5" stroke="none" />
              <rect
                x="0.5"
                y="0.5"
                width="449.201"
                height="64"
                rx="32"
                fill="none"
              />
            </g>
            <g
              id="Rectangle_1192"
              data-name="Rectangle 1192"
              transform="translate(1419.207 885.112) rotate(-34)"
              fill="#fff"
              stroke="#707070"
              stroke-width="1"
              opacity="0.16">
              <rect width="265.85" height="65" rx="32.5" stroke="none" />
              <rect
                x="0.5"
                y="0.5"
                width="264.85"
                height="64"
                rx="32"
                fill="none"
              />
            </g>
          </g>
        </svg>

        <div className="upgrade-center-container">
          <div className="upgrade-top-container">
            <div className="upgrade-title-container">
              <h1 className="upgrade-text">Upgrade</h1>
              <h2 className="subtitle-text">Let's turn that A into an A+</h2>
              <p className="normal-text">
                Check out our Quizzy+ and Analytics packages to supercharge your
                studying
              </p>
              <div className="buttons">
                <WhiteButton
                  className="cta-btn"
                  text="View plans"
                  onClick={() => {
                    window.location.href = "#plans";
                  }}></WhiteButton>
                {/*<WhiteButton
                  className="cta-btn"
                text="View plans"></WhiteButton>*/}
              </div>
            </div>
            <div className="how-often-container">
              <p className="title">How often do you want to study this set?</p>
              <p className="sub-title">
                Quizzy will schedule Recall Sessions often.
              </p>
              <div className="very-often">
                <p className="often-text">Very Often</p>
                <div className="plus-icon" style={{ marginLeft: "10px" }}>
                  <p className="plus-icon">PLUS</p>
                </div>
              </div>

              <ProgressBar
                borderRadius={50}
                completed={100}
                isLabelVisible={false}
                className="prog-bar"
                bgColor={"#8358E8"}
                height="15px"></ProgressBar>
            </div>
          </div>
        </div>
      </main>
      <div className="quizzy-upgrade-sections">
        <section className="upgrade-bottom-content-container">
          <h3>Our Quizzy+ Packages</h3>
          <p className="caption">
            Quizzy+ comes in two packages: Quizzy+ Basic, and Quizzy+ Premium.{" "}
            <br></br>See which one is right for you
          </p>
          <div className="switch">
            <p
              className="monthly"
              style={pricing == "monthly" ? { color: "#8358E8" } : {}}>
              Monthly
            </p>
            <LightBlue
              size="medium"
              checked={pricing === "yearly"}
              onChange={(e) =>
                setPricing(e.target.checked ? "yearly" : "monthly")
              }
            />
            <p
              className="yearly"
              style={pricing == "yearly" ? { color: "#8358E8" } : {}}>
              Yearly
            </p>
          </div>
          <div className="plans" id="plans">
            <div className="flip">
              <div
                className="flip-front"
                style={
                  pricing === "monthly"
                    ? { opacity: 1, transform: "rotateY(0deg)", zIndex: "5" }
                    : { transform: "rotateY(180deg)" }
                }>
                <div className="plan quizzy-basic">
                  <Banner text={"MOST POPULAR"} color={"red"}></Banner>
                  <h3 className="plan-name">{plans[0].plan}</h3>
                  <div className="purple-line"></div>
                  <h2 className="price">
                    ${plans[0].priceMonthly}
                    <span className="per-time">/month</span>
                  </h2>
                  <button
                    className="purple-button"
                    onClick={() => {
                      createCheckoutSession(0).then(function (data) {
                        console.log(data);
                      });
                    }}>
                    <p>Get Started</p>
                  </button>
                  <div className="features">
                    {plans[0].features.map((feature) => (
                      <div className="feature">
                        <svg
                          id="done_black_24dp_1_"
                          data-name="done_black_24dp (1)"
                          xmlns="http://www.w3.org/2000/svg"
                          width="35.293"
                          height="35.293"
                          viewBox="0 0 35.293 35.293">
                          <path
                            id="Path_132"
                            data-name="Path 132"
                            d="M0,0H35.293V35.293H0Z"
                            fill="none"
                          />
                          <path
                            id="Path_133"
                            data-name="Path 133"
                            d="M11.635,21.188,5.459,15.011,3.4,17.07l8.235,8.235L29.281,7.659,27.223,5.6Z"
                            transform="translate(1.6 2.635)"
                            fill="#8358e8"
                          />
                        </svg>
                        <p>{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>{" "}
              </div>
              <div
                className="flip-back"
                style={
                  pricing === "yearly"
                    ? { opacity: 1, transform: "rotateY(0deg)" }
                    : { transform: "rotateY(180deg)" }
                }>
                <div className="plan quizzy-basic">
                  <Banner text={"MOST POPULAR"} color={"red"}></Banner>
                  <h3 className="plan-name">{plans[0].plan}</h3>
                  <div className="purple-line"></div>
                  {plans[0].outdatedPriceYearly && (
                    <div className="price price-outdated">
                      <h1>${plans[0].outdatedPriceYearly}</h1>
                      <h3>/yearly</h3>
                      <div className="strikethrough"></div>
                    </div>
                  )}
                  <h2 className="price">
                    ${plans[0].priceYearly}
                    <span className="per-time">/yearly</span>
                  </h2>
                  <button
                    className="purple-button"
                    onClick={() => {
                      createCheckoutSession(1).then(function (data) {
                        console.log(data);
                      });
                    }}>
                    <p>Get Started</p>
                  </button>
                  <div className="features">
                    {plans[0].features.map((feature) => (
                      <div className="feature">
                        <svg
                          id="done_black_24dp_1_"
                          data-name="done_black_24dp (1)"
                          xmlns="http://www.w3.org/2000/svg"
                          width="35.293"
                          height="35.293"
                          viewBox="0 0 35.293 35.293">
                          <path
                            id="Path_132"
                            data-name="Path 132"
                            d="M0,0H35.293V35.293H0Z"
                            fill="none"
                          />
                          <path
                            id="Path_133"
                            data-name="Path 133"
                            d="M11.635,21.188,5.459,15.011,3.4,17.07l8.235,8.235L29.281,7.659,27.223,5.6Z"
                            transform="translate(1.6 2.635)"
                            fill="#8358e8"
                          />
                        </svg>
                        <p>{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flip">
              <div
                className="flip-front"
                style={
                  pricing === "monthly"
                    ? { opacity: 1, transform: "rotateY(0deg)", zIndex: "5" }
                    : { transform: "rotateY(180deg)" }
                }>
                <div
                  className="plan quizzy-premium"
                  style={
                    pricing === "monthly"
                      ? { opacity: 1, transform: "rotateY(0deg)", zIndex: "5" }
                      : { transform: "rotateY(180deg)" }
                  }>
                  <Banner text={"RECOMMENDED"} color={"purple"}></Banner>
                  <h3 className="plan-name">{plans[1].plan}</h3>
                  <div className="purple-line"></div>
                  <div className="price price-outdated">
                    <h1>${plans[1].outdatedPriceMonthly}</h1>
                    <h3>/month</h3>
                    <div className="strikethrough"></div>
                  </div>
                  <h2 className="price">
                    ${plans[1].priceMonthly}
                    <span className="per-time">/month</span>
                  </h2>
                  <button
                    className="purple-button"
                    onClick={() => {
                      createCheckoutSession(2).then(function (data) {
                        console.log(data);
                      });
                    }}>
                    <p>Get Started</p>
                  </button>
                  <div className="features">
                    {plans[1].features.map((feature) => (
                      <div className="feature">
                        <svg
                          id="done_black_24dp_1_"
                          data-name="done_black_24dp (1)"
                          xmlns="http://www.w3.org/2000/svg"
                          width="35.293"
                          height="35.293"
                          viewBox="0 0 35.293 35.293">
                          <path
                            id="Path_132"
                            data-name="Path 132"
                            d="M0,0H35.293V35.293H0Z"
                            fill="none"
                          />
                          <path
                            id="Path_133"
                            data-name="Path 133"
                            d="M11.635,21.188,5.459,15.011,3.4,17.07l8.235,8.235L29.281,7.659,27.223,5.6Z"
                            transform="translate(1.6 2.635)"
                            fill="#8358e8"
                          />
                        </svg>
                        <p>{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className="flip-back"
                style={
                  pricing === "yearly"
                    ? { opacity: 1, transform: "rotateY(0deg)" }
                    : { transform: "rotateY(180deg)" }
                }>
                <div className="plan quizzy-basic">
                  <Banner text={"RECOMMENDED"} color={"purple"}></Banner>
                  <h3 className="plan-name">{plans[1].plan}</h3>
                  <div className="purple-line"></div>
                  <div className="line" />
                  {plans[1].outdatedPriceYearly && (
                    <div className="price price-outdated">
                      <h1>${plans[1].outdatedPriceYearly}</h1>
                      <h3>/yearly</h3>
                      <div className="strikethrough"></div>
                    </div>
                  )}
                  <h2 className="price">
                    ${plans[1].priceYearly}
                    <span className="per-time">/yearly</span>
                  </h2>
                  <button
                    className="purple-button"
                    onClick={() => {
                      createCheckoutSession(3).then(function (data) {
                        console.log(data);
                      });
                    }}>
                    <p>Get Started</p>
                  </button>
                  <div className="features">
                    {plans[1].features.map((feature) => (
                      <div className="feature">
                        <svg
                          id="done_black_24dp_1_"
                          data-name="done_black_24dp (1)"
                          xmlns="http://www.w3.org/2000/svg"
                          width="35.293"
                          height="35.293"
                          viewBox="0 0 35.293 35.293">
                          <path
                            id="Path_132"
                            data-name="Path 132"
                            d="M0,0H35.293V35.293H0Z"
                            fill="none"
                          />
                          <path
                            id="Path_133"
                            data-name="Path 133"
                            d="M11.635,21.188,5.459,15.011,3.4,17.07l8.235,8.235L29.281,7.659,27.223,5.6Z"
                            transform="translate(1.6 2.635)"
                            fill="#8358e8"
                          />
                        </svg>
                        <p>{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="upgrade-bottom-content-container upgrade-analytics-package-container">
          <h3>Our analytics package</h3>
          <p className="caption">
            We also offer an analytics package, where you can get detailed
            information about your studying,
          </p>
          <div className="switch">
            <p
              className="monthly"
              style={pricingAnalytics == 1 ? { color: "#8358E8" } : {}}>
              Monthly
            </p>
            <LightBlue
              size="medium"
              checked={pricingAnalytics == 2}
              onChange={(e) => setPricingAnalytics(e.target.checked ? 2 : 1)}
            />
            <p
              className="yearly"
              style={pricingAnalytics == 2 ? { color: "#8358E8" } : {}}>
              Yearly
            </p>
          </div>
          <div className="plans">
            <div className="flip">
              <div
                className="flip-front"
                style={
                  pricingAnalytics == 1
                    ? { opacity: 1, transform: "rotateY(0deg)", zIndex: "5" }
                    : { transform: "rotateY(180deg)" }
                }>
                <div
                  className="plan analytics"
                  id="analytics
            ">
                  <div className="left">
                    <h3 className="plan-name">{"ANALYTICS"}</h3>
                    <div className="purple-line"></div>
                    <h2 className="price">
                      $2.99
                      <span className="per-time">/month</span>
                    </h2>
                    <button
                      className="purple-button"
                      onClick={() => {
                        createCheckoutSession(5).then(function (data) {
                          console.log(data);
                        });
                      }}>
                      <p>Get Started</p>
                    </button>
                  </div>

                  <div className="features">
                    {otherPlans[0].features.map((feature) => (
                      <div className="feature">
                        <svg
                          id="done_black_24dp_1_"
                          data-name="done_black_24dp (1)"
                          xmlns="http://www.w3.org/2000/svg"
                          width="35.293"
                          height="35.293"
                          viewBox="0 0 35.293 35.293">
                          <path
                            id="Path_132"
                            data-name="Path 132"
                            d="M0,0H35.293V35.293H0Z"
                            fill="none"
                          />
                          <path
                            id="Path_133"
                            data-name="Path 133"
                            d="M11.635,21.188,5.459,15.011,3.4,17.07l8.235,8.235L29.281,7.659,27.223,5.6Z"
                            transform="translate(1.6 2.635)"
                            fill="#8358e8"
                          />
                        </svg>
                        <p>{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className="flip-back"
                style={
                  pricingAnalytics == 2
                    ? { opacity: 1, transform: "rotateY(0deg)", zIndex: "5" }
                    : { transform: "rotateY(180deg)" }
                }>
                <div
                  className="plan analytics"
                  id="analytics
            ">
                  <div className="left">
                    <h3 className="plan-name">{"ANALYTICS"}</h3>
                    <div className="purple-line"></div>
                    {otherPlans[0].outdatedPriceYearly && (
                      <div className="price price-outdated">
                        <h1>${otherPlans[0].outdatedPriceYearly}</h1>
                        <h3>/year</h3>
                        <div
                          className="strikethrough"
                          style={{ width: "70%" }}></div>
                      </div>
                    )}
                    <h2 className="price" style={{ marginTop: 0 }}>
                      {otherPlans[0].priceYearly}
                      <span className="per-time">/year</span>
                    </h2>
                    <button
                      className="purple-button"
                      onClick={() => {
                        createCheckoutSession(6).then(function (data) {
                          console.log(data);
                        });
                      }}>
                      <p>Get Started</p>
                    </button>
                  </div>

                  <div className="features">
                    {otherPlans[0].features.map((feature) => (
                      <div className="feature">
                        <svg
                          id="done_black_24dp_1_"
                          data-name="done_black_24dp (1)"
                          xmlns="http://www.w3.org/2000/svg"
                          width="35.293"
                          height="35.293"
                          viewBox="0 0 35.293 35.293">
                          <path
                            id="Path_132"
                            data-name="Path 132"
                            d="M0,0H35.293V35.293H0Z"
                            fill="none"
                          />
                          <path
                            id="Path_133"
                            data-name="Path 133"
                            d="M11.635,21.188,5.459,15.011,3.4,17.07l8.235,8.235L29.281,7.659,27.223,5.6Z"
                            transform="translate(1.6 2.635)"
                            fill="#8358e8"
                          />
                        </svg>
                        <p>{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="information-section">
          <div className="purple-line"></div>
          <h3>Ace your tests with Most Difficult Terms</h3>
          <div className="info-divider">
            <div className="checkmarks">
              <div className="checkmark">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="38.759"
                  height="29.51"
                  viewBox="0 0 38.759 29.51">
                  <path
                    id="Path_133"
                    data-name="Path 133"
                    d="M15.733,28.944,6.483,19.694,3.4,22.777,15.733,35.11,42.159,8.683,39.076,5.6Z"
                    transform="translate(-3.4 -5.6)"
                  />
                </svg>
                <p>
                  See which terms you miss the most, so you know what to focus
                  on next time you study.
                </p>
              </div>
              <div className="checkmark">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="38.759"
                  height="29.51"
                  viewBox="0 0 38.759 29.51">
                  <path
                    id="Path_133"
                    data-name="Path 133"
                    d="M15.733,28.944,6.483,19.694,3.4,22.777,15.733,35.11,42.159,8.683,39.076,5.6Z"
                    transform="translate(-3.4 -5.6)"
                  />
                </svg>
                <p>
                  Know the terms your friends are struggling with, so you can
                  plan study sessions with them and work on mastering those
                  specific terms.
                </p>
              </div>
              <WhiteButton
                className="get-started-btn"
                text="Get Started"
                href="/upgrade#plans"></WhiteButton>
            </div>
            <div className="most-missed">
              {
                <div className="chart">
                  <div
                    className="labels"
                    style={
                      {
                        // marginTop: Object.keys(quizDetails[2]).length * 5 + "px",
                      }
                    }>
                    {Object.keys(mostDifficultTermsTemplate).map((key) => (
                      <div className="label">
                        {Object.keys(user.friends).length > 0 && (
                          <img
                            className="avatar"
                            src={GetRandomFriend().avatar}></img>
                        )}
                        <h5>{key}</h5>{" "}
                        <div
                          className="chart-part"
                          style={{
                            width:
                              (mostDifficultTermsTemplate[key] /
                                Object.keys(mostDifficultTermsTemplate)
                                  .length) *
                                100 +
                              "%", //(missed / total
                            backgroundColor: getMostMissedColor(
                              mostDifficultTermsTemplate[key] /
                                highestMissedTermIndex
                            ),
                          }}></div>{" "}
                        
                        {
                          <div className="missed-number">
                            <h5
                              className="n-times"
                              style={{
                                color: getMostMissedColor(
                                  mostDifficultTermsTemplate[key] /
                                    highestMissedTermIndex
                                ),
                              }}>
                              {mostDifficultTermsTemplate[key] +
                                " time" +
                                (mostDifficultTermsTemplate[key] > 1
                                  ? "s"
                                  : "")}
                            </h5>

                            <h5 className="missed-definition">
                              {/*mostDifficultTermsDefinitions[key]*/}
                            </h5>
                          </div>
                        }
                      </div>
                    ))}
                  </div>
                </div>
              }
            </div>
          </div>
        </section>
        <section className="information-section information-section-2">
          <div className="info-divider">
            <div className="checkmarks">
              <div className="purple-line"></div>
              <h3>Supercharge your studying with more Recall Sessions</h3>
              <div className="checkmark">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="38.759"
                  height="29.51"
                  viewBox="0 0 38.759 29.51">
                  <path
                    id="Path_133"
                    data-name="Path 133"
                    d="M15.733,28.944,6.483,19.694,3.4,22.777,15.733,35.11,42.159,8.683,39.076,5.6Z"
                    transform="translate(-3.4 -5.6)"
                  />
                </svg>
                <p>
                  Schedule more Recall Sessions and learn your terms in time for
                  your exams
                </p>
              </div>
              <div className="checkmark">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="38.759"
                  height="29.51"
                  viewBox="0 0 38.759 29.51">
                  <path
                    id="Path_133"
                    data-name="Path 133"
                    d="M15.733,28.944,6.483,19.694,3.4,22.777,15.733,35.11,42.159,8.683,39.076,5.6Z"
                    transform="translate(-3.4 -5.6)"
                  />
                </svg>
                <p>
                  Schedule Recall Sessions very often to improve your active
                  recall and long-term memory
                </p>
              </div>
            </div>
            <div className="images">
              <div className="add-task">
                <div className="cover">
                  <div className="title-wrap">
                    <h1 className="title">Add Task</h1>
                    <div
                      className="plus-icon"
                      style={{ display: "inlineFlex" }}>
                      <p className="plus-icon">PLUS</p>
                    </div>
                  </div>
                  <p className="subtitle">Add a task to your schedule</p>
                </div>
                <>
                  <p>Which task would you like to add?</p>
                  <div className="task-list">
                    <div className={"task flashcards"}>
                      <div className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18.835"
                          height="18.835"
                          viewBox="0 0 18.835 18.835">
                          <path
                            id="indeterminate_check_box_FILL0_wght400_GRAD0_opsz48"
                            d="M9.4,16.15H21.46V14.58H9.4ZM7.57,24.835A1.609,1.609,0,0,1,6,23.265V7.57A1.609,1.609,0,0,1,7.57,6h15.7a1.609,1.609,0,0,1,1.57,1.57v15.7a1.609,1.609,0,0,1-1.57,1.57Zm0-1.57h15.7V7.57H7.57v15.7Zm0,0h0V7.57h0v15.7Z"
                            transform="translate(-6 -6)"
                            fill="#8358e8"
                          />
                        </svg>
                      </div>
                      <p className="task-name">Flashcards</p>
                    </div>
                    <div className={"selected task recall-sessions"}>
                      <div className="icon">
                        <svg
                          id="notifications_active_black_24dp"
                          xmlns="http://www.w3.org/2000/svg"
                          width="23.674"
                          height="23.674"
                          viewBox="0 0 23.674 23.674">
                          <path
                            id="Path_63"
                            data-name="Path 63"
                            d="M0,0H23.674V23.674H0Z"
                            fill="none"
                          />
                          <path
                            id="Path_64"
                            data-name="Path 64"
                            d="M11.145,20.141a1.824,1.824,0,0,0,1.829-1.809H9.317A1.824,1.824,0,0,0,11.145,20.141Zm5.486-5.428V10.19c0-2.777-1.49-5.1-4.114-5.718V3.857a1.372,1.372,0,0,0-2.743,0v.615C7.159,5.087,5.66,7.4,5.66,10.19v4.523L3.831,16.522v.9H18.46v-.9Zm-1.829.9H7.488V10.19c0-2.244,1.381-4.071,3.657-4.071S14.8,7.946,14.8,10.19ZM7.1,3.929,5.8,2.636a9.4,9.4,0,0,0-3.767,7.1H3.859A7.621,7.621,0,0,1,7.1,3.929ZM18.432,9.737h1.829a9.46,9.46,0,0,0-3.767-7.1L15.2,3.929A7.666,7.666,0,0,1,18.432,9.737Z"
                            transform="translate(0.691 0.851)"
                            fill="#8358e8"
                          />
                        </svg>
                      </div>
                      <p className="task-name">Recall Sessions</p>
                    </div>
                    <div className={"task quiz"}>
                      <div className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20">
                          <path
                            id="quiz_FILL0_wght400_GRAD0_opsz48"
                            d="M15.575,17.5a1.024,1.024,0,1,0-.725-.3A.988.988,0,0,0,15.575,17.5Zm-.625-3.15h1.175a3.222,3.222,0,0,1,.212-1.075,3.913,3.913,0,0,1,.813-.975,4.994,4.994,0,0,0,.938-1.137,2.363,2.363,0,0,0,.263-1.137,2.432,2.432,0,0,0-.788-1.875A2.925,2.925,0,0,0,15.5,7.425a2.917,2.917,0,0,0-2.8,1.95l1.125.475a2.418,2.418,0,0,1,.688-.95,1.547,1.547,0,0,1,.988-.325A1.722,1.722,0,0,1,16.712,9a1.4,1.4,0,0,1,.462,1.075,1.668,1.668,0,0,1-.225.875,3,3,0,0,1-.8.8,4.26,4.26,0,0,0-1,1.163,3.731,3.731,0,0,0-.2,1.438ZM8.5,21A1.538,1.538,0,0,1,7,19.5V5.5a1.439,1.439,0,0,1,.45-1.05A1.439,1.439,0,0,1,8.5,4h14a1.439,1.439,0,0,1,1.05.45A1.439,1.439,0,0,1,24,5.5v14A1.538,1.538,0,0,1,22.5,21Zm0-1.5h14V5.5H8.5ZM5.5,24a1.439,1.439,0,0,1-1.05-.45A1.439,1.439,0,0,1,4,22.5V7H5.5V22.5H21V24Zm3-18.5v0Z"
                            transform="translate(-4 -4)"
                            fill="#8358e8"
                          />
                        </svg>
                      </div>
                      <p className="task-name">Quiz</p>
                    </div>
                  </div>
                </>
              </div>
              <div className="often-select">
                <div className="container-bottom">
                  <div className="top">
                    <p className="title">
                      How often do you want to study this set?
                    </p>
                    <p className="sub-title">
                      {oftenSliderLabel == "Not very often" &&
                        "Quizzy will rarely schedule Recall Sessions for this set. This gives you a low chance of scoring well on your tests."}
                      {oftenSliderLabel == "Often" &&
                        "Quizzy will schedule Recall Sessions for this set often. This gives you a good chance of scoring well on your tests."}
                      {oftenSliderLabel == "Very often" &&
                        "Quizzy will schedule Recall Sessions for this set very often."}
                      {oftenSliderLabel == "Extremely often" &&
                        "Quizzy will schedule Recall Sessions for this set extremely often."}
                    </p>
                  </div>
                  <div className="center">
                    <div className="slider">
                      <a className="slider-label">
                        {oftenSliderLabel}{" "}
                        <div
                          className="plus-icon"
                          style={{ marginLeft: "10px" }}>
                          <p className="plus-icon">PLUS</p>
                        </div>
                      </a>
                      <ThemeProvider theme={theme}>
                        <Slider
                          color="primary"
                          value={oftenSliderValue}
                          step={null}
                          //marks={marks}
                          valueLabelDisplay="off"
                          getAriaValueText={() => {
                            return false;
                          }}
                          sx={{
                            "& .MuiSlider-track": {
                              height: "10px",
                            },
                            "& .MuiSlider-rail": {
                              height: "10px",
                              background: "#C8C8C8",
                              opacity: 1,
                            },
                            "& .MuiSlider-thumbColorPrimary": {
                              background: "white",
                              filter:
                                "drop-shadow(0px 0px 15px rgba(0, 0, 0, 16%))",
                              width: "26px",
                              height: "26px",
                              boxShadow: "none",
                              "::before": {
                                boxShadow: "none",
                              },
                            },
                          }}
                        />
                      </ThemeProvider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="information-section information-section-3">
          <div className="info-divider">
            <div className="checkmarks">
              <div className="purple-line"></div>
              <h3>Discover confusing terms with Analytics</h3>
              <div className="checkmark">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="38.759"
                  height="29.51"
                  viewBox="0 0 38.759 29.51">
                  <path
                    id="Path_133"
                    data-name="Path 133"
                    d="M15.733,28.944,6.483,19.694,3.4,22.777,15.733,35.11,42.159,8.683,39.076,5.6Z"
                    transform="translate(-3.4 -5.6)"
                  />
                </svg>
                <p>Differentiate between the correct terms and definitions</p>
              </div>
              <div className="checkmark">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="38.759"
                  height="29.51"
                  viewBox="0 0 38.759 29.51">
                  <path
                    id="Path_133"
                    data-name="Path 133"
                    d="M15.733,28.944,6.483,19.694,3.4,22.777,15.733,35.11,42.159,8.683,39.076,5.6Z"
                    transform="translate(-3.4 -5.6)"
                  />
                </svg>
                <p>
                  Predict how well you'll do on future quizzes with Quizzy's
                  Smart Projection
                </p>
              </div>
              <div className="checkmark">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="38.759"
                  height="29.51"
                  viewBox="0 0 38.759 29.51">
                  <path
                    id="Path_133"
                    data-name="Path 133"
                    d="M15.733,28.944,6.483,19.694,3.4,22.777,15.733,35.11,42.159,8.683,39.076,5.6Z"
                    transform="translate(-3.4 -5.6)"
                  />
                </svg>
                <p>
                  See how your memory of individual terms improves over time
                </p>
              </div>
              <WhiteButton
                className="get-started-btn"
                text="Get Started"
                href="/upgrade#plans"></WhiteButton>
            </div>
            <div className="images">
              <h3 className="confused-about-terms">
                You seem to be confused about these terms
                <AnalyticsBadge></AnalyticsBadge>
              </h3>
              <div className="confused-terms">
                <div
                  className="confused-word confused-term"
                  id="confused-term-0">
                  <p>Assets</p>
                </div>
                <div className="confused-definition">
                  {["Property owned"].map((k, count) => (
                    <>
                      <Xarrow
                        start={"confused-term-" + count}
                        end={"incorrect-def-" + count}
                        showHead={false}
                        color={"#D83C3C"}
                        startAnchor={"middle"}
                      />
                      <div
                        className="confused-word confused-definition-incorrect"
                        id={"incorrect-def-" + count}>
                        <p>{k}</p>
                      </div>
                    </>
                  ))}
                  {["Property of value"].map((k, count) => (
                    <>
                      <Xarrow
                        start={"confused-term-" + count}
                        end={"correct-def-" + count}
                        showHead={false}
                        color={"#58E892"}
                        dashness={true}
                        path={"straight"}
                        startAnchor={"middle"}
                      />
                      <div
                        className="confused-word confused-definition-correct"
                        id={"correct-def-" + count}>
                        <p>{k}</p>
                      </div>
                    </>
                  ))}
                </div>
              </div>
              <div className="confused-terms">
                <div
                  className="confused-word confused-term"
                  id="confused-term-1">
                  <p>Pythagorean Theorem</p>
                </div>
                <div className="confused-definition">
                  {["ax^2+bx+c", "x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}"].map(
                    (k) => (
                      <>
                        <Xarrow
                          start={"confused-term-1"}
                          end={"incorrect-def-" + k}
                          showHead={false}
                          color={"#D83C3C"}
                          path={"straight"}
                          startAnchor={"middle"}
                        />
                        <div
                          className="confused-word confused-definition-incorrect"
                          id={"incorrect-def-" + k}>
                          <StaticMathField>{k}</StaticMathField>
                        </div>
                      </>
                    )
                  )}
                  {["a^2+b^2=c^2"].map((k, count) => (
                    <>
                      <Xarrow
                        start={"confused-term-1"}
                        end={"correct-def-" + k}
                        showHead={false}
                        color={"#58E892"}
                        path={"straight"}
                        dashness={true}
                        startAnchor={"middle"}
                      />
                      <div
                        className="confused-word confused-definition-correct"
                        id={"correct-def-" + k}>
                        <StaticMathField>{k}</StaticMathField>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Upgrade;
