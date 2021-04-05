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

export const OutputInletNozzleParameters = () => {
  
  const { store } = useContext(Context);
  const [inletNozzleParameters, setInletNozzleParameters] = useState([]);
  const dt = useRef(null)

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
  
  useEffect(() => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },}
    try {fetch(`${ENDPOINT}/api/inletnozzleparameterscalc`, requestOptions)
    .then(response => response.json())
    .then(data => setInletNozzleParameters(data))}
    catch(error){
      throw error;
    }
  }, []);

  return (
    <div className="p-grid p-fluid index">
      <div className="card card-color">
        <h5>Inlet Nozzle Parameters</h5>
        <Toolbar className="p-mb-4" right={rightToolbarTemplate}></Toolbar>
        <DataTable
          ref={dt}
          value={inletNozzleParameters}
          scrollHeight="55vh" 
          frozenWidth="15rem"
          scrollable>
          <Column headerStyle={{ width: '15em', textAlign: 'center' }}
            style={{textAlign: 'center', fontWeight:"700" }}
            field="separator_tag"
            header="Separator" frozen            
          ></Column>
          <Column headerStyle={{ width: '20em', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="mixtureinletnozzlevelocity"
            header="Mixture Inlet Nozzle Velocity (m/s)"
          ></Column>
          <Column headerStyle={{ width: '20em', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="inletnozzlemomentum"
            header="Inlet Nozzle Momentum (kg/(m*sec&sup2;))"
          ></Column>
          <Column headerStyle={{ width: '25em', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="maximummixtureinletnozzlevelocity"
            header="Maximum Mixture Inlet Nozzle Velocity (m/s)"
          ></Column>
          <Column headerStyle={{ width: '25em', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="maximuminletnozzlemomentum"
            header="Maximum Inlet Nozzle Momentum (kg/(m*sec&sup2;))"
          ></Column>
          <Column headerStyle={{ width: '25em', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="maximumliquidflowinletnozzle"
            header="Maximun Liquid Flow Inlet Nozzle (m&sup3;/h)"
          ></Column>
          <Column headerStyle={{ width: '20em', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="maximumgasflowinletnozzle"
            header="Maximum Gas Flow Inlet Nozzle (m&sup3;/h)"
          ></Column>
          <Column headerStyle={{ width: '15em', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="statusinletnozzle"
            header="Status Inlet Nozzle"
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};