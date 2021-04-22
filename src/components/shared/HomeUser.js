import React, { useState, useContext }from "react";
import { Link } from 'react-router-dom';
import { Context } from "../../store/context";


export const HomeUser = () => {

  const { store } = useContext(Context);
  const [runTutorialInputs, setRunTutorialInputs] = useState(store.tutorial_inputs)
  const [runTutorialOutputs, setRunTutorialOutputs] = useState(store.tutorial_outputs)


  const RunTutorialInputs = () => {
    store.tutorial_inputs = true
  }

  const RunTutorialOutputs = () => {
    store.tutorial_outputs = true
  }

//   const changeRunTutorialInputs = () => {
//     setRunTutorialInputs(false)
//   }
  
//   const changeRunTutorialOutputs = () => {
//     setRunTutorialOutputs(false)
// }
    
  return (
    <div className="index">
      <div className="layout-home-user">
        <img className="layout-home-user-img" src="/assets/layout/images/Background-HomeUser.png" />
      </div>
      <Link to="/home/datareliefvalve">
        <button onClick={() => RunTutorialInputs()} type="button" className="card home-user-img-input">
      </button>
      </Link>
      <Link to="/home/separatorGasAndLiquidAreas">
        <button onClick={() => RunTutorialOutputs()} type="button" className="card home-user-img-output">
      </button>
      </Link>
      </div>
  );
};
