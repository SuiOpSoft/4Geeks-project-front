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

export const OutputGasNozzleParameters = () => {
  
  const { store, actions } = useContext(Context);
  const [gasNozzleParameters, setGasNozzleParameters] = useState();
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
    try {fetch(`${ENDPOINT}/api/gasnozzleparameterscalc`, requestOptions)
    .then(response => response.json())
    .then(data => setGasNozzleParameters(data))}
    catch(error){
      throw error;
    }
  }, [])

  return (
    <div className="p-grid p-fluid index">
      <div className="card card-color">
        <h5>Gas Nozzle Parameters</h5>
        <Toolbar className="p-mb-4" right={rightToolbarTemplate}></Toolbar>
        <DataTable
          ref={dt}
          value={gasNozzleParameters}
          scrollHeight="55vh" 
          frozenWidth="15rem"
          scrollable          
          >
          <Column headerStyle={{ width: '15rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="separator_tag"
            header="Separator" frozen           
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="gasnozzlevelocity"
            header="Gas Nozzle Velocity (m/s)"
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="gasnozzlemomentum"
            header="Gas Nozzle Momentum (kg/(m*sec&sup2;))"
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="maximumgasnozzlevelocity"
            header="Maximum Gas Nozzle Velocity (m/s)"
          ></Column>
          <Column headerStyle={{ width: '25rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="maximumgasnozzlemomentum"
            header="Maximum Gas Nozzle Momentum (kg/(m*sec&sup2;))"
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="maximumgasnozzleflow"
            header="Maximum Gas Nozzle Flow (m&sup3;/h)"
          ></Column>
          <Column headerStyle={{ width: '15rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="statusgasnozzle"
            header="Status_Gas_Nozzle"
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};