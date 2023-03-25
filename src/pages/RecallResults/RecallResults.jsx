import React, { useEffect, useState } from "react";
import "./RecallResults.scss";
import {
  get_session_token,
  get_user,
  get_set_data,
  get_recall_results,
  get_memory_curve,
  get_attempt_distribution,
} from "../../network/communication";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Xarrow from "react-xarrows";
import { MultipleLineChart } from "../../components/MultipleLineChart/MultipleLineChart";
import AnalyticsBadge from "../../components/AnalyticsBadge/AnalyticsBadge";
import { useRef } from "react";
import DoughnutChart from "../../components/DoughnutChart/DoughnutChart";

function RecallResults(props) {
  const navigate = useNavigate();
  const { setid, title } = useParams("");
  const [user, setUser] = useState(props.user);
  const [setData, setSetData] = useState(null);
  const [LRMData, setLRMData] = useState([]);
  const [LRMHistory, setLRMHistory] = useState([]);
  const [LRMHistoryLabels, setLRMHistoryLabels] = useState([]);
  const [memoryCurve, setMemoryCurve] = useState([]);
  const [memoryCurveLabels, setMemoryCurveLabels] = useState([]);
  const [attemptDistribution, setAttemptDistribution] = useState([]);
  const [attemptDistributionFilter, setAttemptDistributionFilter] =
    useState("");

  const [currentAttemptDistributionPage, setCurrentAttemptDistributionPage] =
    useState(0);
  const [recallDifficultyDistribution, setRecallDifficultyDistribution] =
    useState([]);

  const [currentTermIndex, setCurrentTermIndex] = useState(0);

  const termSelectionRef = useRef(null);

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
  };

  for (var i in LRMHistory) {
    for (var key in LRMHistory[i]) {
      recallProg.fill[i].data.push(LRMHistory[i][key]);
    }
  }

  for (var i in LRMHistoryLabels) {
    recallProg.labels.push(LRMHistoryLabels[i]);
  }

  var recallDifficultyDistributionConfig = {
    labels: [],
    data: [],
    bgColor: ["#D83C3C", "#FF8A8A", "#FFA64D", "#58E892"],
    textInside: "",
    rotate: -45,
    divider: 2.6,
    //ignoreTraditionalLabelCallback: true,
    labelCallback: function (tooltipItem) {
      return `${tooltipItem.label} - ${Math.round(tooltipItem.raw * 100)}%`;
    },
  };

  var memoryRetention = {
    hideXTicks: true,
    fill: [
      {
        title: "Learning",
        data: [],
        color: "#8358E8",
      },
      {
        title: "Reviewing",
        color: "#7B7B7B",
        data: [],
      },
      {
        title: "Learned",
        color: "#58E892",
        data: [],
      },
    ],
    labels: [],
    yTicksStepSize: 1,
    yTicksCallback: function (val, index) {
      return ["Again", "Hard", "Good", "I've got it!"][val];
    },
  };

  for (var i in memoryCurve) {
    for (var key in memoryCurve[i]) {
      var fillIndex = { learning: 0, reviewing: 1, learned: 2 }[i];
      memoryRetention.fill[fillIndex].data.push(memoryCurve[i][key]);
    }
  }

  for (var i in memoryCurveLabels) {
    memoryRetention.labels.push(memoryCurveLabels[i]);
  }

  var recallDifficultyDistributionIndexes = [
    "Again",
    "Hard",
    "Good",
    "I've got it!",
  ];
  for (var i in recallDifficultyDistribution) {
    recallDifficultyDistributionConfig.labels.push(
      recallDifficultyDistributionIndexes[i]
    );
    recallDifficultyDistributionConfig.data.push(
      recallDifficultyDistribution[i]
    );
    console.log(recallDifficultyDistribution[i]);
  }

  useEffect(() => {
    get_user(function (user) {
      setUser(user);
    });
    get_set_data(
      setid,
      get_session_token(),
      function (data) {
        setSetData(data);
      },
      null
    );
    get_recall_results(setid, function (d) {
      setLRMData(d.lrm_data);
      setLRMHistory(d.lrm_history[0]);
      setLRMHistoryLabels(d.lrm_history[1]);
    });
  }, []);

  useEffect(() => {
    get_memory_curve(setid, termSelectionRef?.current?.value, (d) => {
      setMemoryCurve(d.memory_curve[0]);
      setMemoryCurveLabels(d.memory_curve[1]);
      setRecallDifficultyDistribution(d.recall_difficulty_distribution);
    });
    get_attempt_distribution(
      setid,
      attemptDistributionFilter,
      termSelectionRef?.current?.value,
      function (d) {
        setAttemptDistribution(d.attempt_distribution);
      }
    );
  }, [currentTermIndex]);

  useEffect(() => {
    get_attempt_distribution(
      setid,
      attemptDistributionFilter,
      termSelectionRef?.current?.value,
      function (d) {
        setAttemptDistribution(d.attempt_distribution);
      }
    );
  }, [attemptDistributionFilter]);

  return (
    <div className="recall-results">
      <div className="recall-results-top">
        <div className="recall-results-top-left">
          <h3 className="title">
            <svg
              style={{ marginRight: "10px" }}
              xmlns="http://www.w3.org/2000/svg"
              width="19.732"
              height="13.1"
              viewBox="0 0 19.732 13.1"
              onClick={() => {
                window.location.href = "../../";
              }}>
              <path
                id="keyboard_backspace_FILL0_wght400_GRAD0_opsz48"
                d="M12.55,25.1,6,18.55,12.55,12l1.178,1.178L9.179,17.728H25.732v1.644H9.179l4.549,4.549Z"
                transform="translate(-6 -12)"
                fill="#2b2b2b"
              />
            </svg>
            {setData?.title + " - Viewing Results"}
          </h3>
          <h5 className="sub-title">Viewing Results</h5>
        </div>
      </div>
      <div className="recall-results-center">
        <div className="recall-information">
          <h1>Recall Information</h1>
          <h5 className="sub-title">
            Here are your stats for your Recall Sessions for this set
          </h5>
          <div className="progress-circles">
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
                  id={"circle-1"}
                  style={{
                    backgroundColor: "#8358E8",
                  }}>
                  <p
                    style={{
                      color: "white",
                    }}>
                    {LRMData[0]}
                  </p>
                </div>
                <p
                  style={{
                    color: "#8358E8",
                  }}>
                  {"Learning"}
                </p>
              </div>
            </div>
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
                  id={"circle-2"}
                  style={{
                    backgroundColor: "#7B7B7B",
                  }}>
                  <Xarrow
                    start={"circle-1"} //can be react ref
                    end={"circle-2"} //or an id
                    showHead={false}
                    color={"#8358E8"}
                  />
                  <p
                    style={{
                      color: "white",
                    }}>
                    {LRMData[1]}
                  </p>
                </div>
                <p
                  style={{
                    color: "#7B7B7B",
                  }}>
                  {"Reviewing"}
                </p>
              </div>
            </div>
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
                  id={"circle-3"}
                  style={{
                    backgroundColor: "#58E892",
                  }}>
                  <Xarrow
                    start={"circle-2"} //can be react ref
                    end={"circle-3"} //or an id
                    showHead={false}
                    color={"#58E892"}
                  />
                  <p
                    style={{
                      color: "white",
                    }}>
                    {LRMData[2]}
                  </p>
                </div>
                <p
                  style={{
                    color: "#58E892",
                  }}>
                  {"Learned"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="recall-progress">
          <h1>Recall Progress</h1>
          <h5 className="sub-title">See how many terms you're learning</h5>
          <div className="recall_progress_chart">
            <MultipleLineChart config={recallProg} />
          </div>
        </div>
        <div className="recall-session-history">
          <h1>Recall Session History</h1>
          <h5 className="sub-title">
            See how many Recall Sessions you've completed
          </h5>
          <div className="tasks">
            {LRMHistoryLabels.map((d) => (
              <div className="task">
                <div className="content">
                  <div className="img">
                    <img
                      src={"https://quizzynow.com/images/user/schedule/1.svg"}
                      alt={"Recall Session"}
                      width={30}
                      height={30}
                    />
                  </div>
                  <div className="info">
                    <h4 className="title">
                      <a>{setData.title}</a>
                    </h4>
                    <div className="row">
                      <h5>{"Recall Session"}</h5>
                      <h5>{d}</h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="term-breakdown">
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "15px",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <h1 className="term-breakdown-header">Term Breakdown</h1>
              <AnalyticsBadge></AnalyticsBadge>
            </div>
            <h5 className="sub-title">
              See how your responses improved each session
            </h5>
          </div>

          <div className="term-cover">
            <p className="sub-title">Term</p>
            <select
              name="term"
              id="term"
              ref={termSelectionRef}
              onChange={(e) => {
                setCurrentTermIndex(e.target.value);
              }}>
              {setData?.terms?.map((term, index) => (
                <option value={index}>{term[0]} </option>
              ))}
            </select>
          </div>
          <div className="memory-retention">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "15px",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <h2>Memory Retention</h2>
              <AnalyticsBadge></AnalyticsBadge>
            </div>
            <h5 className="sub-title">
              Here's how well you were able to recall the definition for{" "}
              <strong> {setData?.terms[currentTermIndex][0]} </strong>
            </h5>
            <div className="memory-retention-chart">
              <MultipleLineChart config={memoryRetention} />
            </div>
          </div>
          <div className="recall-difficulty-distribution">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "15px",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <h2>Recall Difficulty Distribution</h2>
              <AnalyticsBadge></AnalyticsBadge>
            </div>
            <h5 className="sub-title">
              Here's how well you were able to recall the definition for{" "}
              <strong> {setData?.terms[currentTermIndex][0]} </strong>
            </h5>
            <div className="recall-difficulty-distribution-chart">
              <DoughnutChart config={recallDifficultyDistributionConfig} />
            </div>
          </div>
          <div className="attempt-distribution">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "15px",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <h2>Attempt Distribution</h2>
              <AnalyticsBadge></AnalyticsBadge>
            </div>
            <h5 className="sub-title">
              Here's how easily you were able to recall the definition for{" "}
              <strong> {setData?.terms[currentTermIndex][0]} </strong>
            </h5>
            <div className="filter">
              <h5 className="sub-title filter-text">Filter</h5>
              <select
                name="filter"
                id="filter"
                defaultValue={""}
                onChange={(e) => {
                  setAttemptDistributionFilter(e.target.value);
                }}>
                <option value="">None</option>
                <option value="again">Again</option>
                <option value="hard">Hard</option>
                <option value="good">Good</option>
                <option value="perfect">I've got it!</option>
              </select>
            </div>
            <div className="attempt-distribution-table">
              <div className="header-row">
                <h5 className="sub-title filter-text">Your definition</h5>
                <h5 className="sub-title filter-text">Select</h5>
              </div>
              <div className="attempts">
                {attemptDistribution[currentAttemptDistributionPage] &&
                  attemptDistribution[currentAttemptDistributionPage].map(
                    (distribution) => (
                      <div className="attempt">
                        <h5 className="sub-title filter-text">
                          {distribution[0]}
                        </h5>
                        <div className="selection">
                          <div
                            className="selection-circle"
                            style={{
                              backgroundColor:
                                recallDifficultyDistributionConfig.bgColor[
                                  distribution[1]
                                ],
                            }}></div>
                          <h5
                            className="sub-title filter-text"
                            style={{
                              color:
                                recallDifficultyDistributionConfig.bgColor[
                                  distribution[1]
                                ],
                            }}>
                            {
                              ["Again", "Hard", "Good", "I've got it!"][
                                distribution[1]
                              ]
                            }
                          </h5>
                        </div>
                      </div>
                    )
                  )}
              </div>
              {attemptDistribution[currentAttemptDistributionPage] && (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: "50px",
                  }}>
                  <div className="page-selection">
                    {currentAttemptDistributionPage > 0 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19.732"
                        height="13.1"
                        viewBox="0 0 19.732 13.1"
                        onClick={() => {
                          setCurrentAttemptDistributionPage(
                            currentAttemptDistributionPage - 1
                          );
                        }}>
                        <path
                          id="keyboard_backspace_FILL0_wght400_GRAD0_opsz48"
                          d="M12.55,25.1,6,18.55,12.55,12l1.178,1.178L9.179,17.728H25.732v1.644H9.179l4.549,4.549Z"
                          transform="translate(-6 -12)"
                          fill="#2b2b2b"
                        />
                      </svg>
                    )}

                    <h5 className="sub-title">
                      Page {currentAttemptDistributionPage + 1} of{" "}
                      {attemptDistribution.length}
                    </h5>
                    {currentAttemptDistributionPage + 1 !=
                      attemptDistribution.length && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19.732"
                        height="13.1"
                        viewBox="0 0 19.732 13.1"
                        style={{ marginTop: "5px" }}
                        onClick={() => {
                          setCurrentAttemptDistributionPage(
                            currentAttemptDistributionPage + 1
                          );
                        }}>
                        <path
                          id="keyboard_backspace_FILL0_wght400_GRAD0_opsz48"
                          d="M12.55,25.1,6,18.55,12.55,12l1.178,1.178L9.179,17.728H25.732v1.644H9.179l4.549,4.549Z"
                          transform="translate(25.732 25.1) rotate(180)"
                          fill="#2b2b2b"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecallResults;
