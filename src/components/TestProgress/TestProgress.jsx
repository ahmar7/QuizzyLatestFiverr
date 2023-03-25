import React, { useState, useEffect } from "react";
import "./TestProgress.scss";

export default function TestProgress({ config }) {
  const [progress, setProgress] = useState(0);

  const removeTimeFromDate = (date) => {
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const createDate = (dateString) => {
    const [datePart, timePart] = dateString.split(" ");
    const [year, month, day] = datePart.split("-").map(Number);

    if (timePart) {
      const [hours, minutes, seconds] = timePart.split(":").map(Number);
      return new Date(year, month - 1, day, hours, minutes, seconds);
    } else {
      return new Date(year, month - 1, day);
    }
  };

  const calculatePercentage = () => {
    const start = createDate(config.startDate); //new Date(config.startDate);
    const end = createDate(config.endDate); //new Date(config.endDate);
    const today = new Date();

    const duration = Math.abs(end - start);
    const progressed = Math.abs(today - start);

    const percentage = Math.round((progressed / duration) * 100);

    setProgress(Math.min(Math.max(percentage, 0), 100));
  };

  const addZero = (num) => (num >= 10 ? num : "0" + num);

  const stringifyDate = (rawDate) => {
    const date = new Date(rawDate);
    const day = addZero(date.getDate());
    const month = addZero(date.getMonth() + 1);
    const year = date.getFullYear();

    return `${month}/${day}`;
  };

  useEffect(() => {
    calculatePercentage();
  }, []);

  return (
    <div className="test_progress">
      <div className="bar_w_borders">
        <div className="border" />
        <div className="bar">
          <div className="bg"></div>
          <div
            className="bar_completed"
            style={{
              width: `${progress}%`,
              borderRadius: progress === 100 ? "0" : "0 0.5rem 0.5rem 0",
            }}>
            <div className="svg-cover">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17.165"
                height="17.165"
                viewBox="0 0 17.165 17.165">
                <path
                  id="schedule_FILL0_wght400_GRAD0_opsz48_1_"
                  data-name="schedule_FILL0_wght400_GRAD0_opsz48 (1)"
                  d="M15.737,16.724l.966-.966-3.412-3.433V8.012H12V12.84Zm-3.154,4.441a8.3,8.3,0,0,1-3.326-.676,8.647,8.647,0,0,1-4.581-4.581,8.52,8.52,0,0,1,0-6.651A8.647,8.647,0,0,1,9.257,4.676a8.52,8.52,0,0,1,6.651,0,8.647,8.647,0,0,1,4.581,4.581,8.52,8.52,0,0,1,0,6.651,8.647,8.647,0,0,1-4.581,4.581A8.3,8.3,0,0,1,12.583,21.165ZM12.583,12.583Zm0,7.3a7.023,7.023,0,0,0,5.15-2.146,7.023,7.023,0,0,0,2.146-5.15,7.023,7.023,0,0,0-2.146-5.15,7.023,7.023,0,0,0-5.15-2.146,7.023,7.023,0,0,0-5.15,2.146,7.023,7.023,0,0,0-2.146,5.15,7.023,7.023,0,0,0,2.146,5.15A7.023,7.023,0,0,0,12.583,19.878Z"
                  transform="translate(-4 -4)"
                  fill="#fff"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="border" />
      </div>
      <div className="labels">
        <div className="label start">
          <p>{stringifyDate(createDate(config.startDate))}</p>
          <p className="small">{config.startLabel}</p>
        </div>
        {/*<div className="label mid">
          <p>{stringifyDate(new Date())}</p>
          <p className="small">Today</p>
          </div>*/}
        {config.endDate && (
          <div className="label end">
            <p>{stringifyDate(createDate(config.endDate))}</p>
            <p className="small">{config.endLabel}</p>
          </div>
        )}
      </div>
    </div>
  );
}
