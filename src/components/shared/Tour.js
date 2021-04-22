import React, { useReducer, useEffect } from "react";
import JoyRide, { ACTIONS, EVENTS, STATUS } from "react-joyride";

// Define the steps
const TOUR_STEPS = [
  {
    content: <h4>Let's begin the tutorial!</h4>,
    locale: {
      skip: <strong aria-label="skip">Skip</strong>},
    placement: "center",
    target: "body",
  },
  {
    content:<div><h5>Click on inputs, outputs or charts to open new sections,</h5><p>(for more specific tutorials go to Home section and click on inputs, outputs or charts).</p></div>,
      locale: {
        skip: <strong aria-label="skip">Skip</strong>},
        placement: "right",   
      target: ".layout-menu",
  },
  {
    content:
      "Click here to select the facility.",
      locale: {
        skip: <strong aria-label="skip">Skip</strong>},
    target: ".main-tutorial-facility",
  },
  {
    content:
      "Click on this icon to show your account.",
      locale: {
        skip: <strong aria-label="skip">Skip</strong>},
    target: ".main-tutorial-user",
  },
  {
    target: ".main-tutorial-logout",
    content: "Click here to Logout the session.",
  },
];

// Define our state
const INITIAL_STATE = {
  key: new Date(),
  run: false,
  continuous: true,
  loading: false,
  stepIndex: 0,
  steps: TOUR_STEPS,
};

// Set up the reducer function
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "START":
      return { ...state, run: true };
    case "RESET":
      return { ...state, stepIndex: 0 };
    case "STOP":
      return { ...state, run: false };
    case "NEXT_OR_PREV":
      return { ...state, ...action.payload };
    case "RESTART":
      return {
        ...state,
        stepIndex: 0,
        run: true,
        loading: false,
        key: new Date(),
      };
    default:
      return state;
  }
};

// Define the Tour component
const Tour = (props) => {
  const [tourState, dispatch] = useReducer(reducer, INITIAL_STATE);
  useEffect(() => {
    if (props.runTutorial) {
      dispatch({ type: "RESTART" });
    }
  }, [props.runTutorial]);

  const callback = (data) => {
    const { action, index, type, status } = data;
    if (
      action === ACTIONS.CLOSE ||
      (status === STATUS.SKIPPED && tourState.run) ||
      status === STATUS.FINISHED
    ) {
      props.changeRunTutorial();
      dispatch({ type: "STOP" });
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      dispatch({
        type: "NEXT_OR_PREV",
        payload: { stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) },
      });
    }
  };

  return (
    <>
      <JoyRide
        {...tourState}
        callback={callback}
        showSkipButton={true}
        styles={{
          tooltipContainer: {
          background: "#333742",
          textAlign: "left",
          },
          buttonBack: {
          marginRight: 10,
          color: "rgb(67, 211, 158)",
          border: "none"
          },
          options: {
          zIndex: 10000,
          },
        }}
        locale={{
          last: "End",
        }}
      />
    </>
  );
};
export default Tour;
