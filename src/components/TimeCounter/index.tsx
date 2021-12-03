import { useState, useEffect } from "react";
import {Row, Col} from "react-bootstrap";
import moment from "moment";

var countDownTimer;

const TimeCounter = (props) => {

  const [duration, setDuration] = useState(moment.duration(0));

  useEffect(() => {
    if (props.timeTillDate !== null) {
      var eventTime;
      if (typeof props.timeTillDate === "number") {
        eventTime = props.timeTillDate;
      }
      else {
        eventTime = moment(
          props.timeTillDate,
          props.timeFormat
        ).unix();
      }
      var currentTime = moment().unix();
      var diffTime = eventTime - currentTime;
      var dur = moment.duration(diffTime * 1000, "milliseconds");
      if (dur.asMilliseconds() > 0) {
        countDownTimer = setInterval(() => {
          if (dur.asMilliseconds() <= 0) {
            clearInterval(countDownTimer);
            return;
          }
          dur = moment.duration(dur.asMilliseconds() - 1000, "milliseconds");
          setDuration(dur);
        }, 1000);
      }
      return () => {clearInterval(countDownTimer)};
    }
    else {
      clearInterval(countDownTimer);
      setDuration(moment.duration(0, "milliseconds"));
    }
    return () => {};
  }, [props.timeTillDate, props.timeFormat]);

  const toTwoDigit = (val) => {
    if (String(val).length === 1)
      return "0" + val;
    return val;
  }
  
  return (
    <Row className="d-flex text-white font-weight-bold">
      <Col xs={3} className="px-2">
        <div className="count-pad h-100 d-flex flex-column justify-content-between">
          <div className="count-number-pad">
            <h1>{toTwoDigit(Math.floor(duration?.hours()) ?? "0")}</h1>
          </div>
          <span className="d-none d-sm-block span-cls">
            Days
          </span>
          <span className="d-block d-sm-none span-cls">
            D
          </span>
        </div>
      </Col>

      <Col xs={3} className="px-2">
        <div className="count-pad h-100 d-flex flex-column justify-content-between">
          <div className="count-number-pad">
            <h1>{toTwoDigit(Math.floor(duration?.hours()) ?? "0")}</h1>
          </div>
          <span className="d-none d-sm-block span-cls">
            Hours
          </span>
          <span className="d-block d-sm-none span-cls">
            H
          </span>
        </div>
      </Col>

      <Col xs={3} className="px-2">
        <div className="count-pad h-100 d-flex flex-column justify-content-between">
          <div className="count-number-pad">
            <h1>{toTwoDigit(Math.floor(duration?.minutes()) ?? "0")}</h1>
          </div>
          <span className="d-none d-sm-block span-cls">
            Minutes
          </span>
          <span className="d-block d-sm-none span-cls">
            M
          </span>
        </div>
      </Col>

      <Col xs={3} className="px-2">
        <div className="count-pad h-100 d-flex flex-column justify-content-between">
          <div className="count-number-pad">
            <h1>{toTwoDigit(Math.floor(duration?.seconds()) ?? "0")}</h1>
          </div>
          <span className="d-none d-sm-block span-cls">
            Seconds
          </span>
          <span className="d-block d-sm-none span-cls">
            S
          </span>
        </div>
      </Col>
    </Row>
  );
}

export default TimeCounter;
