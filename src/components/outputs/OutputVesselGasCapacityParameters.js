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

export const OutputVesselGasCapacityParameters = () => {
  
  const { store } = useContext(Context);
  const [vesselGasCapacityParameters, setVesselGasCapacityParameters] = useState();
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
    try {fetch(`${ENDPOINT}/api/vesselgascapacitycalc`, requestOptions)
    .then(response => response.json())
    .then(data => setVesselGasCapacityParameters(data))}
    catch(error){
      throw error;
    }
  }, [])

  return (
    <div className="p-grid p-fluid index">
      <div className="card card-color">
        <h5>Vessel Gas Capacity Parameters</h5>
        <Toolbar className="p-mb-4" right={rightToolbarTemplate}></Toolbar>
        <DataTable ref={dt}
          value={vesselGasCapacityParameters}
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
            field="gasloadfactor"
            header="Gas Load Factor(m/s)"
          ></Column>
          <Column headerStyle={{ width: '20em', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="maximumgasflowathhlevel"
            header="Maximum Gas Flow at HH level (m&sup3;/h)"
          ></Column>
          <Column headerStyle={{ width: '25em', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="maximumgasflowatnormallevel"
            header="Maximum Gas Flow at Normal level (m&sup3;/h)"
          ></Column>
          <Column headerStyle={{ width: '20em', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="statusgascapacityathighlevel"
            header="Status Gas Capacity at high level"
          ></Column>
          <Column headerStyle={{ width: '20em', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="statusgascapacityatnormallevel"
            header="Status Gas Capacity at normal level"
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};