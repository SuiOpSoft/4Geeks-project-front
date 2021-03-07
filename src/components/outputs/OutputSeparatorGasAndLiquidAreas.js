import "primeicons/primeicons.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import React, { useState, useRef, useContext, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../inputs/DataReliefValve.css";
import {Context} from "../../store/context"

export const OutputSeparatorGasAndLiquidAreas = () => {
  
  const { store, actions } = useContext(Context);
  const [separatorGasAndLiquidAreas, setSeparatorGasAndLiquidAreas] = useState([]);
  const dt = useRef(null);

  var ENDPOINT = store.endpoint;
  
  const rightToolbarTemplate = () => {
    return (
        <React.Fragment>
            <Button label="Export" icon="pi pi-upload" className="export-button" onClick={exportCSV} />
        </React.Fragment>
    )
}
const exportCSV = () => {
  dt.current.exportCSV();
}
 
useEffect( () => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },}
    try {fetch(`${ENDPOINT}/api/gasandliquidareascalc`, requestOptions)
    .then(response => response.json())
    .then(data => setSeparatorGasAndLiquidAreas(data))}
    catch(error){
      throw error;
    }
  }, []);


  return (
    <div className="p-grid p-fluid index">
      <div className="card card-color">
        <h5>Separator Gas and Liquid Areas</h5>
        <Toolbar className="p-mb-4" right={rightToolbarTemplate}></Toolbar>
        <DataTable ref={dt}
          value={separatorGasAndLiquidAreas}
          scrollHeight="55vh" 
          frozenWidth="15rem"
          scrollable>
          <Column headerStyle={{ width: '15rem' }}
            field="separator_tag"
            header="Separator" frozen          
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="separatorcrosssectionalarearatio"
            header="Sectional Area Ratio (mm)"
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="separatorcrosssectionalarea"
            header="Cross-sectional Area (m&sup2;)"
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="inletnozzlearea"
            header="Inlet Nozzle Area (m&sup2;)"
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="gasnozzlearea"
            header="Gas Nozzle Area (m&sup2;)"
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="liquidnozzlearea"
            header="Liquid Nozzle Area (m&sup2;)"
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="highleveltripgasarea"
            header="High Level Trip Gas Area (m&sup2;)"
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="normallevelgasarea"
            header="Normal Level Gas Area (m&sup2;)"
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="lowlevelgasarea"
            header="Low Level Gas Area (m&sup2;)"
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="highleveltripliquidarea"
            header="High LEvel Trip Liquid Area (m&sup2;)"
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="normalleveltriparea"
            header="Normal LEvel Trip Liquid Area (m&sup2;)"
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="lowleveltripliquidarea"
            header="Low LEvel Trip Liquid Area (m&sup2;)"
          ></Column>
        </DataTable>
      </div>
    </div>

  );
};
