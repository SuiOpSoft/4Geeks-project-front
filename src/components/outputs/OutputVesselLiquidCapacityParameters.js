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

export const OutputVesselLiquidCapacityParameters = () => {
  
  const { store, actions } = useContext(Context);
  const [vesselLiquidCapacityParameters, setVesselLiquidCapacityParameters] = useState();
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
    try {fetch(`${ENDPOINT}/api/vesselliquidcapacitycalc`, requestOptions)
    .then(response => response.json())
    .then(data => setVesselLiquidCapacityParameters(data))}
    catch(error){
      throw error;
    }
  }, [])

  return (
    <div className="p-grid p-fluid index">
          <div className="datatable-editing-demo">

      <div className="card card-color">
        <h5>Vessel Liquid Capacity Parameters</h5>
        <Toolbar className="p-mb-4" right={rightToolbarTemplate}></Toolbar>
        <DataTable ref={dt}
          value={vesselLiquidCapacityParameters}>
          <Column
            field="separator_tag"
            header="Separator"            
          ></Column>
          <Column
            field="maximumvesselliquidflowcapacityatnormallevel"
            header="Maximum Vessel Liquid Flow Capacity at Normal Level (m&sup3;/h)"
          ></Column>
          <Column
            field="statusvesselliquidcapacity"
            header="Status Vessel Liquid Capacity"
          ></Column>
        </DataTable>
      </div>
    </div>
    </div>

  );
};