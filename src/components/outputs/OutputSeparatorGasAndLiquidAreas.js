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
  
  const { store } = useContext(Context);
  const [separatorGasAndLiquidAreas, setSeparatorGasAndLiquidAreas] = useState([]);
  const dt = useRef(null);

  var ENDPOINT = store.endpoint;
  
  const rightToolbarTemplate = () => {
    return (
        <React.Fragment>
            <Button label="Export" icon="pi pi-upload" className="export-button p-button-outlined" onClick={exportCSV} />
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
          <Column headerStyle={{ width: '15rem', textAlign: 'center' }}
            style={{textAlign: 'center', fontWeight:"700" }}
            field="separator_tag"
            header="Separator" frozen          
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="separatorcrosssectionalarearatio"
            header="Sectional Area Radio (mm)"
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="separatorcrosssectionalarea"
            header="Cross-sectional Area (m&sup2;)"
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="inletnozzlearea"
            header="Inlet Nozzle Area (m&sup2;)"
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="gasnozzlearea"
            header="Gas Nozzle Area (m&sup2;)"
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="liquidnozzlearea"
            header="Liquid Nozzle Area (m&sup2;)"
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="highleveltripgasarea"
            header="High Level Trip Gas Area (m&sup2;)"
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="normallevelgasarea"
            header="Normal Level Gas Area (m&sup2;)"
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="lowlevelgasarea"
            header="Low Level Gas Area (m&sup2;)"
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="highleveltripliquidarea"
            header="High Level Trip Liquid Area (m&sup2;)"
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="normalleveltriparea"
            header="Normal Level Trip Liquid Area (m&sup2;)"
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="lowleveltripliquidarea"
            header="Low Level Trip Liquid Area (m&sup2;)"
          ></Column>
        </DataTable>
      </div>
    </div>

  );
};
