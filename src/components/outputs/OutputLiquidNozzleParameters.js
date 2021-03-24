import "primeicons/primeicons.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";
import React, { useState, useRef, useContext, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../inputs/DataReliefValve.css";
import {Context} from "../../store/context"
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";

export const OutputLiquidNozzleParameters = () => {
  
  const { store } = useContext(Context);
  const [liquidNozzleParameters, setLiquidNozzleParameters] = useState();
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
    try {fetch(`${ENDPOINT}/api/liquidnozzleparameterscalc`, requestOptions)
    .then(response => response.json())
    .then(data => setLiquidNozzleParameters(data))}
    catch(error){
      throw error;
    }
  }, []);

  return (
    <div className="p-grid p-fluid index">
          <div className="datatable-editing-demo">
      <div className="card card-color">
        <h5>Liquid Nozzle Parameters</h5>
        <Toolbar className="p-mb-4" right={rightToolbarTemplate}></Toolbar>
          <DataTable
          ref={dt}
          value={liquidNozzleParameters}
          scrollable
          >
          <Column fieldStyle={{ width: '15rem',textAlign: 'center' }}
            style={{textAlign: 'center', fontWeight:"700" }}
            field="separator_tag"
            header="Separator"            
          ></Column>
          <Column fieldStyle={{textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="liquidnozzlevelocity"
            header="Liquid Nozzle velocity (m/s)"
          ></Column>
          <Column fieldStyle={{textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="maximumliquidnozzlevelocity"
            header="Maximum Liquid Nozzle Velocity (m/s)"
          ></Column>
          <Column fieldStyle={{textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="maximumliquidnozzleflow"
            header="Maximum Liquid Nozzle Flow (m&sup3;/h)"
          ></Column>
          <Column fieldStyle={{textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="statusliquidnozzle"
            header="Status Liquid Nozzle"
          ></Column>
        </DataTable>
      </div>
    </div>
    </div>

  );
};