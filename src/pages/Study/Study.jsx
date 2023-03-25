import React, { useRef } from "react";
import "./Study.scss";
import { useParams } from "react-router-dom";
import ReactDOM from "react-dom";

import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { getMostMissedColor } from "../../constants/constants.js";

import { data, ScatterChart } from "../../components/ScatterChart/ScatterChart";
import { VerticalBarChart } from "../../components/VerticalBarChart/VerticalBarChart";
import { HorizontalBarChart } from "../../components/HorizontalBarChart/HorizontalBarChart";
import { SteppedLineChart } from "../../components/SteppedLineChart/SteppedLineChart";
import LineChart from "../../components/LineChart/LineChart";
import DoughnutChart from "../../components/DoughnutChart/DoughnutChart";
import TestProgress from "../../components/TestProgress/TestProgress";
import RecallProgress from "../../components/RecallProgress/RecallProgress";
import StudyCalendar from "../../components/StudyCalendar/StudyCalendar";
import FlipCard from "../../components/FlipCard/FlipCard";
import Tags from "../../components/Tags/Tags";

import * as configs from "../../DATA/chart_configs/study.js";
import { studyData } from "../../DATA/page_data/study.js";
import {
  get_set_data,
  get_user,
  on_set_closed,
  get_session_token,
  update_set,
  get_tag_color_index,
  get_recall_results,
  get_friends_most_difficult_terms,
} from "../../network/communication";
import { Helmet } from "react-helmet-async";
import MDEditor from "@uiw/react-md-editor";
import { useSpeechSynthesis } from "react-speech-kit";
import Popup from "../../components/Popup/Popup";
import AnalyticsBadge from "../../components/AnalyticsBadge/AnalyticsBadge";
import AddTask from "../../components/AddTask/AddTask";
import WhiteButton from "../../components/WhiteButton/WhiteButton";
import Xarrow, { Xwrapper } from "react-xarrows";
import { MultipleLineChart } from "../../components/MultipleLineChart/MultipleLineChart";
import { addStyles, StaticMathField } from "react-mathquill";
import ProgressBar from "@ramonak/react-progress-bar";
import AnalyticsBanner from "../../components/AnalyticsBanner/AnalyticsBanner";
import PlaceholderRectangle from "../../components/PlaceholderRectangle/PlaceholderRectangle";

function Study(props) {
  // addStyles();
  var currentFlipCardRef = useRef();
  const [slideDirection, setSlideDirection] = useState(null);
  const navigate = useNavigate();
  const { speak, cancel, voices } = useSpeechSynthesis();
  const selectedVoiceIndex = 1;
  const [user, setUser] = useState({
    name: "",
    streak: 0,
    today: { pending: 0, completed: 0, streak_saved: 0 },
    streak_calendar: { this_month: [] },
    email_verified: true,
  });
  useEffect(() => {
    get_user(function (user) {
      setUser(user);
      console.log(user);
    });
  }, []);
  const setDateInput = useRef(null);
  const [slideleft, setSlideLeft] = useState(0);
  const [slideright, setSlideRight] = useState(0);

  const [appear, setAppear] = useState(0);
  const [addTestDateClicked, setAddTestDateClicked] = useState(false);
  const [editTestDateClicked, setEditTestDateClicked] = useState(false);
  const [selectedFriendComparison, setSelectedFriendComparison] =
    useState(null);

  const [mostDifficultTermData, setMostDifficultTermData] = useState([]);
  const [LRMData, setLRMData] = useState([]);
  const [LRMHistory, setLRMHistory] = useState([]);
  const [LRMHistoryLabels, setLRMHistoryLabels] = useState([]);
  const [mostDifficultTerms, setMostDifficultTerms] = useState([]);
  const [friendsMostDifficultTerms, setFriendsMostDifficultTerms] = useState(
    []
  );
  const [myMDTsFriendsAssociation, setMyMDTsFriendsAssociation] = useState([]);
  const [extremelyMostDifficultTerm, setExtremelyMostDifficultTerm] = useState(
    []
  );
  const [friendsRecallProgress, setFriendsRecallProgress] = useState([]);

  const [soundEnabled, setSoundEnabled] = useState(false);
  const pen = useRef(null);
  const { setid, title } = useParams("");
  const [setdata, setSetData] = useState({
    title: "",
    terms: {},
    test: {},
    creator: {},
    tags: [],
    creation_date: null,
    psd: {
      study_history_by_activity: {},
      study_time_distribution: {},
      time_spent_on_learning: {},
      recall_progress: [[], []],
      mastery_progress: [[], []],
      most_difficult_terms: [],
    },
  });

  const [expectedTitle, setExpectedTitle] = useState(null);
  const [currentCard, setCurrentCard] = useState({
    front: "",
    back: "",
    front_img: null,
    back_img: null,
    front_equation: null,
    back_equation: null,
    num: -1,
  });
  const [genericQuizzyPlusPopupEnabled, setGenericQuizzyPlusPopupEnabled] =
    useState(false);
  const [addTaskVisible, setAddTaskVisible] = useState(false);
  const [leaderboardKeys, setLeaderboardKeys] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const token = get_session_token();
  const tags = setdata.tags;

  const [highestMissedTermIndex, setHighestMissedTermIndex] = useState(0);
  var urlTitle = "";
  useEffect(() => {
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      on_set_closed(setid, "flashcards", token, () => {});
    });
  }, []);

  useEffect(() => {
    get_set_data(setid, token, function (data) {
      if (!data["title"] || data["success"] === false) {
        window.location.href = "https://quizzynow.com/404";
      }
      setSetData(data);
      setExpectedTitle(
        !data["title"]
          ? "ERROR"
          : data["title"].replace(/\s+/g, "-").toLowerCase()
      );
      var front_img = data.terms[0][2];
      var back_img = data.terms[0][3];
      var front_equation = data.terms[0][4];
      var back_equation = data.terms[0][5];
      setCurrentCard({
        front: data.terms[0][0],
        back: data.terms[0][1],
        num: 0,
        nterms: data.terms.length,
        front_img: front_img,
        back_img: back_img,
        front_equation: front_equation,
        back_equation: back_equation,
      });
      for (var key in data?.psd?.most_difficult_terms) {
        if (data?.psd?.most_difficult_terms[key] > highestMissedTermIndex) {
          setHighestMissedTermIndex(data?.psd?.most_difficult_terms[key]);
        }
      }
      /*setMostDifficultTerms(data?.psd?.most_difficult_terms.sort((a, b) => {
        return a > b; 
      }))*/
      setMostDifficultTerms(data.psd.most_difficult_terms);
      document.title = data["title"] + " - Quizzy";
    });
    get_recall_results(setid, function (d) {
      setLRMData(d.lrm_data);
      setLRMHistory(d.lrm_history[0]);
      setLRMHistoryLabels(d.lrm_history[1]);
    });
    get_friends_most_difficult_terms(setid, function (d) {
      setFriendsMostDifficultTerms(d["friends_most_difficult_terms"]);
      setMyMDTsFriendsAssociation(d["my_mdts_friend_association"]);
      setExtremelyMostDifficultTerm(d["extremely_most_missed_term_info"]);
      setFriendsRecallProgress(d["friends_recall_progress"]);
      var leaderboardKeys = Object.keys(d["leaderboard"]);
      leaderboardKeys.sort((a, b) => {
        if (d["leaderboard"][a] > d["leaderboard"][b]) {
          return -1;
        } else if (d["leaderboard"][a] < d["leaderboard"][b]) {
          return 1;
        }
        return 0;
      });
      setLeaderboard(d["leaderboard"]);
      setLeaderboardKeys(leaderboardKeys);
      setSelectedFriendComparison(leaderboardKeys[0]);
    });
  }, []);

  urlTitle = "/study/" + setid + "/" + expectedTitle;

  var recallDates = [];
  if (setdata !== undefined && setdata?.psd?.recall_dates !== undefined) {
    setdata.psd.recall_dates.map((date, index) => {
      if (index <= 4) {
        recallDates.push(new Date(date));
      }
    });
  }

  function onLeftArrowClicked() {
    var n = currentCard.num;
    if (n == 0) {
      return;
    }
    setSlideDirection("right");
    setSlideRight(1);
  }

  function onRightArrowClicked() {
    var n = currentCard.num;
    if (n == setdata.terms.length - 1) {
      return;
    }
    setSlideDirection("left");
    setSlideLeft(1);
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = new Date().toLocaleString("en-US", {
    month: "long",
  });

  var [todayISO] = new Date().toISOString().split("T");

  function randomHexColor() {
    return (
      "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")
    );
  }

  function dateSortFunction() {}

  const COLORS = [
    "#E85871",
    "#8358E8",
    "#58AEE8",
    "#58E8D4",
    "#58E866",
    "#E8E858",
    "#E88458",
    "#5883E8",
    "#58E8E3",
    "#58E8A5",
    "#4D4D4D",
    "#86A8E7",
  ];

  var studyTimeDistrib = {
    labels: [],
    data: [],
    bgColor: COLORS,
    textInside: "0",
    rotate: -45,
    divider: 2.6,
  };

  var masteryProg = {
    labels: ["Mastery Progress", "NaN"],
    data: [0, 100],
    bgColor: ["#8358E8", "#363636"],
    textInside: "0%",
    rotate: -45,
    mastery: true,
    divider: 2.6,
  };

  var recallProg = {
    fill: [
      {
        title: "Reviewing",
        data: [],
        color: "#7B7B7B",
      },
      {
        title: "Learned",
        data: [],
        color: "#58E892",
      },
    ],
    labels: [],
    /*plugins: {
      testDate: {
        id: "testDate",
        beforeDatasetsDraw(chart, args, pluginOptions) {
          const {ctx, data, chartArea: { left, right, top, bottom, width, height}, scales: {x, y}} = chart; 
          ctx.save();
          ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
          ctx.fillRect(x, top, y, height);
          ctx.restore();
          
        }
      }
    }*/
  };

  var friendsRecallProg = {
    // TODO: do this
    fill: [],
    labels: [],
    /*elements: {
      point: {
        pointStyle: [pointImage, "circle", "triangle", pointImage],
      },
    },*/
  };
  Object.keys(friendsRecallProgress).map((username) => {
    if (
      friendsRecallProgress[username] != undefined &&
      friendsRecallProgress[username][0] != undefined
    ) {
      var fillPush = {
        title: username,
        data: [],
      };
      var datePush = [];

      Object.keys(friendsRecallProgress[username][0]).map((date) => {
        if (!friendsRecallProg.labels.includes(date)) {
          friendsRecallProg.labels.push(date);
        }
        fillPush.data.push(friendsRecallProgress[username][0][date]);
      });

      if (username === user.username) {
        fillPush.color = "#8358E8";
      }

      var avatarImage = new Image(25, 25);
      /*var fillPushPointStyle = [] 

      if (fillPush.data.length > 0) {
        for (var i = 0; i < fillPush.data.length-1; i++) {
          fillPushPointStyle.push("circle");
        }
      }
      */
      avatarImage.src = friendsRecallProgress[username][2];

      //fillPushPointStyle.push(avatarImage) // Last point will be the avatar
      fillPush.pointStyle = [avatarImage];
      //friendsRecallProg.fill.push(fillPush);
    }
  });

  friendsRecallProg.labels.sort(function (x, y) {
    // Sort labels
    //10:00 PM, 9:00 PM
    let pattern = /([\d]+)\/([\d]+)\/([\d]+)/;
    let match1 = x.match(pattern);
    let month1 = match1[1];
    let day1 = match1[2];
    let year1 = match1[3];

    let match2 = y.match(pattern);
    let month2 = match2[1];
    let day2 = match2[2];
    let year2 = match2[3];

    if (year1 > year2) {
      return 1;
    } else if (year2 > year1) {
      return -1;
    }

    if (month1 > month2) {
      return 1;
    } else if (month2 > month1) {
      return -1;
    }

    if (month1 == month2) {
      return day1 > day2 ? 1 : -1;
    }

    return 0;
  });

  Object.keys(friendsRecallProgress).map((username) => {
    if (
      friendsRecallProgress[username] != undefined &&
      friendsRecallProgress[username][0] != undefined
    ) {
      var fillPush = {
        title: username,
        data: [],
      };
      var datePush = [];

      var count = 0;
      friendsRecallProg.labels.forEach((date) => {
        var data = friendsRecallProgress[username][0][date];
        if (data != undefined && data != null) {
          fillPush.data.push(friendsRecallProgress[username][0][date]);
        } else {
          fillPush.data.push(0);
        }
      });

      if (username === user.username) {
        fillPush.color = "#8358E8";
      }

      var avatarImage = new Image(25, 25);

      avatarImage.src = friendsRecallProgress[username][2];

      fillPush.pointStyle = [avatarImage];

      friendsRecallProg.fill.push(fillPush);
    }
  });

  for (var i in LRMHistory) {
    for (var key in LRMHistory[i]) {
      recallProg.fill[i].data.push(LRMHistory[i][key]);
    }
  }

  for (var i in LRMHistoryLabels) {
    recallProg.labels.push(LRMHistoryLabels[i]);
  }

  var mastery_prog = setdata.psd.mastery_progress;
  masteryProg.data = [mastery_prog, 1 - mastery_prog];

  masteryProg.textInside = Math.floor(mastery_prog * 100) + "%";

  for (var key in setdata.psd.study_time_distribution.std) {
    if (setdata.psd.study_time_distribution.std.hasOwnProperty(key)) {
      studyTimeDistrib.labels.push(key);
      studyTimeDistrib.data.push(setdata.psd.study_time_distribution.std[key]);
    }
  }

  var timeSpentOnLearning = {
    labels: [],
    datasets: [],
  };

  var time_spent_on_learning = setdata.psd.time_spent_on_learning;
  var increment = 0;

  for (var setName in time_spent_on_learning) {
    var data = [];
    for (var timeStamp in time_spent_on_learning[setName]) {
      if (!timeSpentOnLearning.labels.includes(timeStamp)) {
        timeSpentOnLearning.labels.push(timeStamp);
      }
    }
    timeSpentOnLearning.labels.sort(function (x, y) {
      //10:00 PM, 9:00 PM
      let pattern = /([\d]+):([\d]+) ([\w]+)/;
      let match1 = x.match(pattern);
      let hour1 = match1[1];
      let minute1 = match1[2];
      let str1 = match1[3];
      let match2 = y.match(pattern);
      let hour2 = match2[1];
      let minute2 = match2[2];
      let str2 = match2[3];
      /* Check AM/PM */
      if (str1 == "AM" && str2 == "PM") {
        // AM comes before PM.
        return -1;
      } else if (str1 == "PM" && str2 == "AM") {
        return 1;
      }
      /* Assuming both are one str, check hours */
      if (hour2 > hour1) {
        return -1;
      } else if (hour1 > hour2) {
        return 1;
      }
      /* Assuming both hours are the same, check minutes */
      if (minute2 > minute1) {
        return -1;
      } else if (minute1 > minute2) {
        return 1;
      }
      return 0; /* Both dates are exactly the same lol. Do nothing. */
    });
    for (var timeStamp in time_spent_on_learning[setName]) {
      var i = timeSpentOnLearning.labels.indexOf(timeStamp);
      data[i] = time_spent_on_learning[setName][timeStamp];
    }
    timeSpentOnLearning.datasets.push({
      label: setName,
      data: data,
      borderColor: COLORS[increment],
      backgroundColor: COLORS[increment],
      lineTension: 0,
      fill: false,
      stepped: true,
      pointRadius: 0,
    });
    increment++;
  }

  const tot = setdata.psd.study_time_distribution.total;

  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " mins " : " mins ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " secs" : " secs") : "";

    if (mDisplay != "") {
      hDisplay = h + "hrs ";
      mDisplay = m + "m ";
      if (s > 0) {
        sDisplay = s + "s";
      }
    }
    return hDisplay + mDisplay + sDisplay;
  }

  studyTimeDistrib.textInside = tot > 0 ? secondsToHms(tot) : "0 hours";

  if (tot <= 0) {
    studyTimeDistrib.labels = ["Empty"];
    studyTimeDistrib.data = [24 * 60 * 60];
    studyTimeDistrib.bgColor = ["#363636"];
  }

  const addZero = (num) => (num >= 10 ? num : "0" + num);

  const removeTimeFromDate = (date) => {
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const createDate = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const isToday = (someDate) => {
    if (typeof someDate === "string") {
      someDate = createDate(someDate);
    }

    someDate = removeTimeFromDate(someDate);
    const today = new Date();
    return (
      someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
    );
  };

  const stringifyDate = (rawDate, includeYear = false, monthString = false) => {
    const date = new Date(rawDate);

    const day = addZero(date.getDate() + 1);

    const month = addZero(date.getMonth() + 1);
    const year = date.getFullYear();

    if (monthString) {
      return months[parseInt(date.getMonth())] + " " + day;
    }

    return `${month}/${day}${
      includeYear ? `/${year.toString().substr(2)}` : ""
    }`;
  };

  const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + minutes + " " + ampm;
  };

  if (expectedTitle != null && title != expectedTitle) {
    return <Navigate to={urlTitle}></Navigate>;
  }
  if (expectedTitle == "ERROR") {
    return <Navigate to="/404"></Navigate>;
  }

  const creator_url = "/users/" + setdata.creator.userid; //+ "/" + setdata.creator.username

  return (
    <>
      {setdata.title.length > 0 && (
        <AddTask
          user={user}
          visible={addTaskVisible}
          setVisible={setAddTaskVisible}
          setsOverride={[
            {
              title: setdata?.title,
              terms: setdata?.terms,
              id: setdata?.id,
              description: setdata?.description,
            },
          ]}
          taskOverride={1}
          stageOverride={2}></AddTask>
      )}

      <div className="study">
        <main>
          {/* Top Section */}
          <Helmet>
            <meta
              name="description"
              property="description"
              content={setdata.description}
            />
            ;
            <meta property="og:description" content={setdata.description} />
            <meta property="og:title" content={setdata.title + " - Quizzy"} />
            <meta property="title" content={setdata.title + " - Quizzy"} />
            <meta
              name="og:url"
              property="og:url"
              content={window.location.href}
            />
            <title>{setdata.title + " - Quizzy"}</title>
            {user && user.membership == 0 && (
              <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7056673711339024"
                crossorigin="anonymous"></script>
            )}
          </Helmet>

          <Popup
            enabled={genericQuizzyPlusPopupEnabled}
            setEnabled={setGenericQuizzyPlusPopupEnabled}
            variant="genericQuizzy+Popup"
            title="Upgrade to Quizzy+ for this feature!"
            subtitle={
              "This feature is only available to Quizzy+ users."
            }></Popup>

          <section className="top">
            {setdata != undefined && setdata.terms.length > 0 ? (
              <div className="left">
                <p>Study</p>
                <button className="purple">
                  <img
                    src="/images/study/flashcards.svg"
                    alt="flashcards icon"
                  />
                  <p>Flashcards</p>
                </button>
                <button
                  className="purple recall-button"
                  onClick={function () {
                    window.location = window.location.href + "/recall";
                  }}>
                  <img src="/images/study/recall.svg" alt="recall icon" />
                  <p>Recall</p>
                </button>
                <button
                  className="purple quiz-button"
                  onClick={function () {
                    navigate("quiz");
                  }}>
                  <img src="/images/study/quiz.svg" alt="quiz icon" />
                  <p>Quiz</p>
                </button>
                {/*}
          <div className="coming_soon">
            <p>Coming Soon</p>
            <button>
              <img src="/images/study/quiz.svg" alt="quiz icon" />
              <p>Quiz</p>
            </button>
          </div>*/}
              </div>
            ) : (
              <PlaceholderRectangle
                className="left"
                width="15%"
                height="150px"></PlaceholderRectangle>
            )}

            <div className="right">
              <div className="top_bar">
                {setdata.average_mastery_time && (
                  <p className="avg_mastery">
                    Average Mastery Time: {setdata.avg_mastery_time} days
                  </p>
                )}

                {setdata.psd.test && setdata.psd.test.test_date && (
                  <div className="test_announcement">
                    <p>
                      Test on {stringifyDate(setdata.psd.test.test_date, true)}
                    </p>
                    <img
                      className="small_pen"
                      src="/images/study/pen.svg"
                      alt="pen icon"
                    />
                  </div>
                )}

                <div className="title">
                  {setdata.title ? (
                    <>
                      <h1>{setdata.title}</h1>
                      {setdata.editable && (
                        <img
                          className="big_pen"
                          src="/images/study/pen.svg"
                          alt="pen icon"
                          ref={pen}
                          onClick={() => {
                            navigate("./edit");
                          }}
                        />
                      )}
                    </>
                  ) : (
                    <PlaceholderRectangle
                      className="title-placeholder"
                      width="300px"
                      height="30px"
                      color="#888787"
                    />
                  )}
                </div>
                <p>
                  {setdata &&
                  setdata.terms &&
                  Object.keys(setdata.terms).length > 0 ? (
                    `${Object.keys(setdata.terms).length} terms`
                  ) : (
                    <PlaceholderRectangle
                      className="terms-placeholder"
                      width="100px"
                      height="20px"
                      color="#888787"
                    />
                  )}
                </p>
                {setdata.creator ? (
                  setdata.creator.avatar_url ? (
                    <div className="user">
                      <img className="pfp" src={setdata.creator.avatar_url} />
                      <Link to={creator_url} className="username">
                        {setdata.creator.username}
                      </Link>
                      {setdata.creator.verified && (
                        <img
                          src="/images/user/check.svg"
                          title="This user is verified."
                          alt="checkmark icon"
                        />
                      )}
                    </div>
                  ) : (
                    <div className="user">
                      <PlaceholderRectangle
                        className="pfp-placeholder"
                        width="50px"
                        height="50px"
                        radius="50%"
                        color="#888787"
                      />
                      <PlaceholderRectangle
                        className="username-placeholder"
                        width="100px"
                        height="20px"
                        marginTop="10px"
                        color="#888787"
                      />
                    </div>
                  )
                ) : (
                  <PlaceholderRectangle
                    className="user-placeholder"
                    width="150px"
                    height="70px"
                    color="#888787"
                  />
                )}
              </div>
              <div ref={currentFlipCardRef} className="content">
                {setdata != undefined && setdata.terms.length > 0 ? (
                  <>
                    <a
                      className="arrow"
                      onClick={onLeftArrowClicked}
                      style={{ opacity: currentCard.num == 0 ? 0.3 : 1 }}>
                      &lt;
                    </a>
                    <FlipCard
                      onAnimationEnd={function (e) {
                        var animName = e.animationName;
                        var n = currentCard.num;
                        if (animName == "slideleft") {
                          setSlideLeft(0);
                          setCurrentCard({
                            front: setdata.terms[n + 1][0],
                            back: setdata.terms[n + 1][1],
                            front_img: setdata.terms[n + 1][2],
                            back_img: setdata.terms[n + 1][3],
                            front_equation: setdata.terms[n + 1][4],
                            back_equation: setdata.terms[n + 1][5],
                            num: n + 1,
                          });
                          setAppear(1);
                          if (soundEnabled) {
                            cancel();
                            speak({
                              text: setdata.terms[n + 1][0],
                              voice: voices[selectedVoiceIndex],
                            });
                          }
                        } else if (animName == "slideright") {
                          setSlideRight(0);
                          setCurrentCard({
                            front: setdata.terms[n - 1][0],
                            back: setdata.terms[n - 1][1],
                            front_img: setdata.terms[n - 1][2],
                            back_img: setdata.terms[n - 1][3],
                            front_equation: setdata.terms[n - 1][4],
                            back_equation: setdata.terms[n - 1][5],
                            num: n - 1,
                          });
                          setAppear(1);
                          if (soundEnabled) {
                            cancel();
                            speak({
                              text: setdata.terms[n - 1][0],
                              voice: voices[selectedVoiceIndex],
                            });
                          }
                        } else if (animName == "appear") {
                          setAppear(0);
                        }
                        setSlideDirection(null);
                      }}
                      slideleft={slideleft}
                      slideright={slideright}
                      appear={appear}
                      currentCard={currentCard}
                      nterms={setdata.terms.length}
                      soundEnabled={soundEnabled}
                      selectedVoiceIndex={selectedVoiceIndex}
                    />
                    <a
                      className="arrow"
                      onClick={onRightArrowClicked}
                      style={{
                        opacity:
                          currentCard.num == setdata.terms.length - 1 ? 0.3 : 1,
                      }}>
                      &gt;
                    </a>
                  </>
                ) : (
                  <PlaceholderRectangle
                    className="flashcard-placeholder"
                    width="60%"
                    height="25rem"
                    color="#888787"
                  />
                )}
              </div>
            </div>
          </section>

          <section className="info-section">
            <div className="set-info">
              <h1 className="title">{setdata.title}</h1>
              <div className="user">
                <img
                  className="pfp"
                  src={setdata.creator.avatar_url}
                  alt="User icon"
                />
                <Link to={creator_url} className="username">
                  {setdata.creator.username}
                </Link>
                {setdata.creator.verified && (
                  <img
                    src="/images/user/check.svg"
                    title="This user is verified."
                    alt="checkmark icon"
                  />
                )}
              </div>
              <div data-color-mode="light" className="description">
                <MDEditor.Markdown
                  source={setdata.description}></MDEditor.Markdown>
              </div>

              <Tags tags={tags} readonly={true}></Tags>
              <div className="actions-container"></div>
            </div>
          </section>
          <section className="set-information">
            <h2 className="your-studying">Your Studying</h2>
            <section className="test">
              {setdata?.psd?.test?.test_date ? (
                <>
                  {!editTestDateClicked ? ( // haven't clicked edit test date
                    <>
                      <div className="date-announcement date-created">
                        <h3>
                          Test coming up{" "}
                          {stringifyDate(
                            setdata?.psd?.test?.test_date,
                            false,
                            true
                          )}
                        </h3>

                        <img
                          src="/images/study/test/edit.svg"
                          className="edit-icon"
                          alt="edit icon"
                          onClick={function () {
                            setEditTestDateClicked(true);
                          }}
                        />
                      </div>
                      <p className="label">
                        {" "}
                        {isToday(setdata?.psd?.test?.test_date)
                          ? "Today's your Test! Good luck!"
                          : "Do some practice Quizzes to prepare for your test on " +
                            stringifyDate(
                              setdata?.psd?.test?.test_date,
                              false,
                              true
                            )}
                        {}
                      </p>
                    </>
                  ) : (
                    <div className="date-announcement">
                      <h3>
                        Test coming up{" "}
                        {stringifyDate(
                          setdata?.psd?.test?.test_date,
                          false,
                          true
                        )}
                      </h3>
                      <p className="label">
                        Add your Test Date and Quizzy will personalize your
                        studying
                      </p>
                      <input
                        type="date"
                        className="add-test-date-picker"
                        min={todayISO}
                        ref={setDateInput}
                        defaultValue={setdata?.psd?.test?.test_date}></input>
                      <WhiteButton
                        text={"Confirm Test Date"}
                        className="add-test-date"
                        onClick={() => {
                          update_set(
                            setid,
                            get_session_token(),
                            "test-date",
                            setDateInput.current.value
                          ).then(function (response) {
                            window.location.reload();
                          });
                        }}
                        svg={
                          <svg
                            id="pending_actions_black_24dp"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20.777"
                            height="28"
                            viewBox="0 0 20.777 28">
                            <rect
                              id="Rectangle_165"
                              data-name="Rectangle 165"
                              width="17.277"
                              height="28"
                              transform="translate(1.489)"
                              fill="none"
                            />
                            <path
                              id="Path_76"
                              data-name="Path 76"
                              d="M19.005,13.7a5.771,5.771,0,1,0,5.771,5.771A5.773,5.773,0,0,0,19.005,13.7Zm1.9,8.484L18.428,19.7V16.005h1.154v3.22l2.135,2.135ZM20.16,3.309H16.489a3.449,3.449,0,0,0-6.51,0H6.309A2.315,2.315,0,0,0,4,5.617V22.931a2.315,2.315,0,0,0,2.309,2.309h7.053a7.784,7.784,0,0,1-1.639-2.309H6.309V5.617H8.617V9.08h9.234V5.617H20.16v5.864a8.115,8.115,0,0,1,2.309.693V5.617A2.315,2.315,0,0,0,20.16,3.309ZM13.234,5.617a1.154,1.154,0,1,1,1.154-1.154A1.158,1.158,0,0,1,13.234,5.617Z"
                              transform="translate(-4 0.154)"
                              fill="#2b2b2b"
                            />
                          </svg>
                        }></WhiteButton>
                    </div>
                  )}

                  {setdata.psd &&
                    setdata.psd.test &&
                    setdata.psd.test.test_date &&
                    setdata.psd.test.started_studying_date &&
                    !editTestDateClicked && (
                      <>
                        <TestProgress
                          config={{
                            startDate: setdata.psd.test.started_studying_date,
                            startLabel: "Started studying",
                            endDate: setdata.psd.test.test_date,
                            endLabel: "Test Date",
                          }}
                        />
                      </>
                    )}
                </>
              ) : (
                <div className="date-announcement">
                  <h3>No Test Date</h3>
                  <p className="label">
                    Add your Test Date and Quizzy will personalize your studying
                  </p>
                  {!editTestDateClicked ? (
                    <WhiteButton
                      text={"Add Test Date"}
                      className="add-test-date"
                      onClick={() => {
                        setEditTestDateClicked(true);
                      }}
                      svg={
                        <svg
                          id="pending_actions_black_24dp"
                          xmlns="http://www.w3.org/2000/svg"
                          width="20.777"
                          height="28"
                          viewBox="0 0 20.777 28">
                          <rect
                            id="Rectangle_165"
                            data-name="Rectangle 165"
                            width="17.277"
                            height="28"
                            transform="translate(1.489)"
                            fill="none"
                          />
                          <path
                            id="Path_76"
                            data-name="Path 76"
                            d="M19.005,13.7a5.771,5.771,0,1,0,5.771,5.771A5.773,5.773,0,0,0,19.005,13.7Zm1.9,8.484L18.428,19.7V16.005h1.154v3.22l2.135,2.135ZM20.16,3.309H16.489a3.449,3.449,0,0,0-6.51,0H6.309A2.315,2.315,0,0,0,4,5.617V22.931a2.315,2.315,0,0,0,2.309,2.309h7.053a7.784,7.784,0,0,1-1.639-2.309H6.309V5.617H8.617V9.08h9.234V5.617H20.16v5.864a8.115,8.115,0,0,1,2.309.693V5.617A2.315,2.315,0,0,0,20.16,3.309ZM13.234,5.617a1.154,1.154,0,1,1,1.154-1.154A1.158,1.158,0,0,1,13.234,5.617Z"
                            transform="translate(-4 0.154)"
                            fill="#2b2b2b"
                          />
                        </svg>
                      }></WhiteButton>
                  ) : (
                    <div className="date-announcement">
                      <input
                        type="date"
                        className="add-test-date-picker"
                        min={todayISO}
                        ref={setDateInput}></input>
                      <WhiteButton
                        text={"Confirm Test Date"}
                        className="add-test-date"
                        onClick={() => {
                          update_set(
                            setid,
                            get_session_token(),
                            "test-date",
                            setDateInput.current.value
                          ).then(function (response) {
                            // window.location.reload();
                          });
                        }}
                        svg={
                          <svg
                            id="pending_actions_black_24dp"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20.777"
                            height="28"
                            viewBox="0 0 20.777 28">
                            <rect
                              id="Rectangle_165"
                              data-name="Rectangle 165"
                              width="17.277"
                              height="28"
                              transform="translate(1.489)"
                              fill="none"
                            />
                            <path
                              id="Path_76"
                              data-name="Path 76"
                              d="M19.005,13.7a5.771,5.771,0,1,0,5.771,5.771A5.773,5.773,0,0,0,19.005,13.7Zm1.9,8.484L18.428,19.7V16.005h1.154v3.22l2.135,2.135ZM20.16,3.309H16.489a3.449,3.449,0,0,0-6.51,0H6.309A2.315,2.315,0,0,0,4,5.617V22.931a2.315,2.315,0,0,0,2.309,2.309h7.053a7.784,7.784,0,0,1-1.639-2.309H6.309V5.617H8.617V9.08h9.234V5.617H20.16v5.864a8.115,8.115,0,0,1,2.309.693V5.617A2.315,2.315,0,0,0,20.16,3.309ZM13.234,5.617a1.154,1.154,0,1,1,1.154-1.154A1.158,1.158,0,0,1,13.234,5.617Z"
                              transform="translate(-4 0.154)"
                              fill="#2b2b2b"
                            />
                          </svg>
                        }></WhiteButton>
                    </div>
                  )}
                </div>
              )}
            </section>
            {recallDates.length > 0 && (
              <section className="recall-calendar">
                <h3>Recall Calendar</h3>
                <p className="label">
                  See when your Recall Sessions are at a glance
                </p>
                <div className="progress-circles">
                  {recallDates.map((recallDate, c) => (
                    <div className="circle-container">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "10px",
                        }}>
                        <div
                          className={"circle"}
                          id={"circle-" + c}
                          style={
                            recallDate > new Date()
                              ? {
                                  backgroundColor: "#7B7B7B",
                                }
                              : recallDate == new Date()
                              ? {
                                  backgroundColor: "#FFFFFF",
                                  border: "4px solid #8358E8",
                                }
                              : {
                                  backgroundColor: "#8358E8",
                                }
                          }>
                          <svg
                            id="notifications_none_black_24dp"
                            xmlns="http://www.w3.org/2000/svg"
                            width="28.951"
                            height="31.711"
                            viewBox="0 0 28.951 31.711">
                            <path
                              id="Path_65"
                              data-name="Path 65"
                              d="M0,0H28.951V31.711H0Z"
                              fill="none"
                            />
                            <path
                              id="Path_66"
                              data-name="Path 66"
                              d="M17.159,32.731a3.209,3.209,0,0,0,3.29-3.1h-6.58A3.209,3.209,0,0,0,17.159,32.731Zm9.869-9.3V15.677c0-4.759-2.681-8.744-7.4-9.8V4.825a2.472,2.472,0,0,0-4.935,0V5.88c-4.7,1.054-7.4,5.023-7.4,9.8v7.751L4,26.529v1.55H30.319v-1.55Zm-3.29,1.55H10.58v-9.3c0-3.845,2.484-6.976,6.58-6.976s6.58,3.132,6.58,6.976Z"
                              transform="translate(-2.684 -1.677)"
                              fill="#fff"
                            />
                          </svg>
                        </div>
                        {c != recallDates.length - 1 && (
                          <Xarrow
                            start={"circle-" + c} //can be react ref
                            end={"circle-" + (c + 1)} //or an id
                            showHead={false}
                            animateDrawing={true}
                            color={
                              recallDate > new Date() ? "#7B7B7B" : "#8358E8"
                            }
                            path={"straight"}
                          />
                        )}

                        <p
                          style={
                            recallDate > new Date()
                              ? {
                                  color: "#7B7B7B",
                                }
                              : {
                                  color: "#8358E8",
                                }
                          }>
                          {stringifyDate(recallDate, false, true)}
                        </p>
                      </div>
                    </div>
                  ))}
                  {setdata.psd.test != undefined &&
                    setdata.psd.test.test_date != undefined && (
                      <>
                        <div className="circle-container">
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: "10px",
                            }}>
                            <div
                              className={"circle"}
                              id={"circle-" + parseInt(recallDates.length)}
                              style={{
                                backgroundColor: "#DCDCDC",
                                border: "3px solid #7B7B7B",
                              }}>
                              <svg
                                id="pending_actions_black_24dp"
                                xmlns="http://www.w3.org/2000/svg"
                                width="29.572"
                                height="39.854"
                                viewBox="0 0 29.572 39.854">
                                <rect
                                  id="Rectangle_165"
                                  data-name="Rectangle 165"
                                  width="24.591"
                                  height="39.854"
                                  transform="translate(2.12)"
                                  fill="none"
                                />
                                <path
                                  id="Path_76"
                                  data-name="Path 76"
                                  d="M25.358,19.072a8.215,8.215,0,1,0,8.215,8.215A8.218,8.218,0,0,0,25.358,19.072Zm2.711,12.075-3.532-3.532V22.358h1.643v4.584l3.039,3.039ZM27,4.286H21.776a4.909,4.909,0,0,0-9.266,0H7.286A3.3,3.3,0,0,0,4,7.572V32.215A3.3,3.3,0,0,0,7.286,35.5H17.324a11.079,11.079,0,0,1-2.333-3.286H7.286V7.572h3.286V12.5H23.715V7.572H27v8.346a11.55,11.55,0,0,1,3.286.986V7.572A3.3,3.3,0,0,0,27,4.286ZM17.143,7.572a1.643,1.643,0,1,1,1.643-1.643A1.648,1.648,0,0,1,17.143,7.572Z"
                                  transform="translate(-4 0.643)"
                                  fill="#5a5a5a"
                                />
                              </svg>
                            </div>
                            {recallDates.length > 0 && (
                              <Xarrow
                                start={
                                  "circle-" + parseInt(recallDates.length - 1)
                                } //can be react ref
                                end={"circle-" + parseInt(recallDates.length)} //or an id
                                showHead={false}
                                animateDrawing={true}
                                color={"#7B7B7B"}
                                path={"straight"}
                              />
                            )}

                            <p
                              style={{
                                color: "#7B7B7B",
                              }}>
                              {stringifyDate(
                                setdata.psd.test.test_date,
                                false,
                                true
                              )}
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                </div>
              </section>
            )}

            <section className="recall-progress">
              <h3>Recall Progress</h3>
              <p className="label">See how many terms you're learning</p>
              <div className="recall_progress_chart">
                <MultipleLineChart config={recallProg} />
              </div>
            </section>
            <section className="my-learning">
              <h3>My Learning</h3>
              <p className="label">
                See how you allocate your studying for this set
              </p>
              <div className="doughnut-charts">
                <div className="std-chart">
                  <h3>Study Time Distribution</h3>
                  <DoughnutChart config={studyTimeDistrib} />
                </div>
                <div className="mastery-chart">
                  <h3>Mastery Progress</h3>
                  <DoughnutChart config={masteryProg} />
                </div>
              </div>
            </section>
            <section className="time-spent-on-learning">
              <h3>Time Spent on Learning Today</h3>
              <p className="label">
                See how you've spent your time learning terms for this set
              </p>
              <div className="tsol-chart">
                <LineChart
                  width={800}
                  height={320}
                  data={timeSpentOnLearning}
                />
              </div>
            </section>
            <section className="most-difficult-terms">
              <h3>Most Difficult Terms</h3>
              <p className="label">
                {Object.keys(setdata.psd.most_difficult_terms).length > 0
                  ? "View your most difficult terms, and see who else is struggling with them"
                  : "Study some more and view your most difficult terms here."}
              </p>
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
                      {Object.keys(setdata.psd.most_difficult_terms).map(
                        (key) => (
                          <div className="label">
                            {myMDTsFriendsAssociation[key] != undefined && (
                              <a
                                href={
                                  "https://quizzynow.com/users/" +
                                  myMDTsFriendsAssociation[key][0]
                                }>
                                <img
                                  className="avatar"
                                  src={myMDTsFriendsAssociation[key][1]}></img>
                              </a>
                            )}
                            {setdata.terms[key][4] == null ? (
                              <h5>{setdata.terms[key][0]}</h5>
                            ) : (
                              <StaticMathField>
                                {setdata.terms[key][0]}
                              </StaticMathField>
                            )}{" "}
                            <div
                              className="chart-part"
                              style={{
                                width:
                                  (mostDifficultTerms[key] /
                                    Object.keys(mostDifficultTerms).length) *
                                    100 +
                                  "%", //(missed / total
                                backgroundColor: getMostMissedColor(
                                  mostDifficultTerms[key] /
                                    highestMissedTermIndex
                                ),
                              }}></div>
                            {
                              <div className="missed-number">
                                <h5
                                  className="n-times"
                                  style={{
                                    color: getMostMissedColor(
                                      mostDifficultTerms[key] /
                                        highestMissedTermIndex
                                    ),
                                  }}>
                                  {mostDifficultTerms[key] +
                                    " time" +
                                    (mostDifficultTerms[key] > 1 ? "s" : "") +
                                    ": "}
                                </h5>
                                {setdata.terms[key][5] == null ? (
                                  <h5 className="missed-definition">
                                    {setdata.terms[key][1]}
                                  </h5>
                                ) : (
                                  <StaticMathField>
                                    {setdata.terms[key][1]}
                                  </StaticMathField>
                                )}
                              </div>
                            }
                          </div>
                        )
                      )}
                    </div>
                  </div>
                }
              </div>
              {extremelyMostDifficultTerm[0] != undefined &&
                setdata.terms[extremelyMostDifficultTerm[0]] != undefined &&
                extremelyMostDifficultTerm[1] != undefined && (
                  <p
                    className="label struggling-with-hint-text">
                    You and{" "}
                    <img
                      className="avatar"
                      src={extremelyMostDifficultTerm[2]}></img>
                    {extremelyMostDifficultTerm[1]} are struggling with the term{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {setdata.terms[extremelyMostDifficultTerm[0]][0]}
                    </span>
                  </p>
                )}
            </section>

            <section className="compare-with-friends">
              <h3>Compare with your friends</h3>
              <p className="label">
                Compare with your friends to see how well you're doing
              </p>
              <section className="recall-progress">
                <h3>Recall Progress</h3>
                <p className="label">
                  See how many terms you're learning compared to your friends
                </p>
                <div className="recall_progress_chart">
                  <MultipleLineChart config={friendsRecallProg} />
                </div>
              </section>
              <section className="leaderboard">
                <h3>Leaderboard</h3>
                <p className="label">
                  See which friends have been learning the most
                </p>
                <div className="leaderboard-container">
                  {leaderboardKeys.map((username, idx) => (
                    <div className="leaderboard-user">
                      <p className="position label">
                        {"#" + parseInt(idx + 1)}
                      </p>
                      <div className="avatar-wrap">
                        <img
                          className="avatar"
                          src={friendsRecallProgress[username][2]}></img>
                        <div
                          className={
                            "status " + friendsRecallProgress[username][3]
                          }></div>
                      </div>
                      <div className="username-progress">
                        <p className="label username-label">{"@" + username}</p>
                        <div className="progress-bar">
                          <ProgressBar
                            borderRadius={50}
                            completed={leaderboard[username]}
                            isLabelVisible={false}
                            className="prog-bar"
                            bgColor={
                              "#8358E8" /*["#FFD54D", "#575757", "#957750"][idx] ?? "#8358E8"*/
                            }
                            height="15px"></ProgressBar>
                          {
                            <p className="label">
                              {leaderboard[username] + "%"}
                            </p>
                          }
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="leaderboard"></div>
              </section>

              <section className="friend-comparison">
                <div className="friend-comparison-title">
                  
                  <h3>Friend Comparison</h3>
                  <AnalyticsBadge></AnalyticsBadge>
                </div>

                <p className="label">
                  {leaderboardKeys.filter(
                    (username) => username != user.username
                  ).length > 0
                    ? "See how you're doing compared to certain friends"
                    : "Invite some friends to study this set and compare with them"}
                </p>

                {user?.plans?.analytics != undefined ? (
                  leaderboardKeys.filter(
                    (username) => username != user.username
                  ).length > 0 && (
                    <div className="select-friend-cover">
                      <p className="label">Select Friend</p>
                      <select
                        name="term"
                        id="term"
                        onChange={(e) => {
                          setSelectedFriendComparison(e.target.value);
                        }}>
                        {leaderboardKeys
                          .filter((username) => username != user.username)
                          .map((username) => (
                            <option value={username}>{username} </option>
                          ))}
                      </select>
                    </div>
                  )
                ) : (
                  <AnalyticsBanner style={{ width: "80%" }}></AnalyticsBanner>
                )}

                {selectedFriendComparison != undefined &&
                  selectedFriendComparison != null &&
                  friendsMostDifficultTerms != undefined && (
                    <section className="difficult-terms-distribution">
                      <div className="difficult-terms-distribution-title">
                        
                        <h3>Difficult Terms Distribution</h3>
                        <AnalyticsBadge></AnalyticsBadge>
                      </div>
                      <p className="label">
                        {friendsMostDifficultTerms[
                          friendsRecallProgress[selectedFriendComparison][4]
                        ] == undefined
                          ? selectedFriendComparison +
                            " does not have any data to display"
                          : "See which terms are the most difficult for you and your friends."}
                      </p>
                      {user?.plans?.analytics == undefined ? (
                        <AnalyticsBanner></AnalyticsBanner>
                      ) : (
                        friendsMostDifficultTerms[
                          friendsRecallProgress[selectedFriendComparison][4]
                        ] != undefined && (
                          <div className="venn-diagram">
                            <div className="left">
                              <div className="selected-friend-info">
                                <div className="avatar-wrap">
                                  <img
                                    className="avatar"
                                    src={user.image}></img>
                                  <div
                                    className={"status " + user.status}></div>
                                </div>
                                <p className="label">You</p>
                              </div>

                              <div className="diagram diagram-left">
                                <div className="most-difficult-terms">
                                  {Object.keys(
                                    setdata.psd.most_difficult_terms
                                  ).map((key) => (
                                    <div className="label" id="mdts-hint-text">
                                      {setdata.terms[key][4] == null ? (
                                        <h5>{setdata.terms[key][0]}</h5>
                                      ) : (
                                        <StaticMathField>
                                          {setdata.terms[key][0]}
                                        </StaticMathField>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="diagram diagram-middle">
                              <p className="label both-label">Both</p>
                              <div className="most-difficult-terms">
                                {Object.keys(setdata.psd.most_difficult_terms)
                                  .filter((k) => {
                                    return (
                                      friendsMostDifficultTerms[
                                        friendsRecallProgress[
                                          selectedFriendComparison
                                        ][4]
                                      ] != undefined &&
                                      friendsMostDifficultTerms[
                                        friendsRecallProgress[
                                          selectedFriendComparison
                                        ][4]
                                      ][0][k]
                                    );
                                  })
                                  .map((key) => (
                                    <div className="label">
                                      {setdata.terms[key][4] == null ? (
                                        <h5>{setdata.terms[key][0]}</h5>
                                      ) : (
                                        <StaticMathField>
                                          {setdata.terms[key][0]}
                                        </StaticMathField>
                                      )}
                                    </div>
                                  ))}
                              </div>
                            </div>
                            <div className="right">
                              <a
                                className="selected-friend-info"
                                href={
                                  "https://quizzynow.com/users/" +
                                  friendsMostDifficultTerms[
                                    friendsRecallProgress[
                                      selectedFriendComparison
                                    ][4]
                                  ]
                                }>
                                <div className="avatar-wrap">
                                  <img
                                    className="avatar"
                                    src={
                                      friendsRecallProgress[
                                        selectedFriendComparison
                                      ][2]
                                    }></img>
                                  <div
                                    className={
                                      "status " +
                                      friendsRecallProgress[
                                        selectedFriendComparison
                                      ][3]
                                    }></div>
                                </div>
                                <p className="label avatar-name">
                                  {selectedFriendComparison}
                                </p>
                              </a>
                              <div className="diagram diagram-right">
                                <div className="most-difficult-terms">
                                  {friendsMostDifficultTerms[
                                    friendsRecallProgress[
                                      selectedFriendComparison
                                    ][4]
                                  ] &&
                                    Object.keys(
                                      friendsMostDifficultTerms[
                                        friendsRecallProgress[
                                          selectedFriendComparison
                                        ][4]
                                      ][0]
                                    ).map((key) => (
                                      <div className="label">
                                        {setdata.terms[key][4] == null ? (
                                          <h5>{setdata.terms[key][0]}</h5>
                                        ) : (
                                          <StaticMathField>
                                            {setdata.terms[key][0]}
                                          </StaticMathField>
                                        )}
                                      </div>
                                    ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </section>
                  )}
              </section>
            </section>
          </section>
        </main>
      </div>
    </>
  );
}

export default Study;
