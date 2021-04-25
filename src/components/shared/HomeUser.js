import React, { useState, useContext }from "react";
import { Link } from 'react-router-dom';
import { Context } from "../../store/context";


export const HomeUser = () => {

  const { store } = useContext(Context);
  const [runTutorialInputs, setRunTutorialInputs] = useState(store.tutorial_inputs)
  const [runTutorialOutputs, setRunTutorialOutputs] = useState(store.tutorial_outputs)
  const [runTutorialCharts, setRunTutorialCharts] = useState(store.tutorial_charts)


  const RunTutorialInputs = () => {
    store.tutorial_inputs = true
  }

  const RunTutorialOutputs = () => {
    store.tutorial_outputs = true
  }

  const RunTutorialCharts = () => {
    store.tutorial_charts = true
  }
    
  return (
    <div className="index">
      <div className="layout-home-user">
        <img className="layout-home-user-img" src="/assets/layout/images/Background-HomeUser.png" />
      </div>
      <div className="home-buttons">
      <div className="row d-flex justify-content-end row-output">
        <div className="col-3">
          <Link to="/home/separatorGasAndLiquidAreas">
            <button onClick={() => RunTutorialOutputs()} type="button" className="card home-user-output "><strong>OUTPUTS</strong>
            </button>
          </Link>
        </div>
      </div>
      <div className="row d-flex justify-content-start row-input">
        <div className="col-3">
          <Link to="/home/datareliefvalve">
            <button onClick={() => RunTutorialInputs()} type="button" className="card home-user-input"><strong>INPUTS</strong>
            </button>
          </Link>
        </div>
      </div>
      <div className="row d-flex justify-content-end row-chart">
      <div className="col-3">
        <Link to="/home/gaschart">
        <button onClick={() => RunTutorialCharts()} type="button" className="card home-user-chart"><strong>CHARTS</strong>
      </button>
          </Link>
        </div>
        </div>
      </div>
      </div>
  );
};
