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

export const OutputLevelControlValveParameters = () => {
  
  const { store, actions } = useContext(Context);
  const [levelControlValveParameters, setlevelControlValveParameters] = useState(store.output_level_control_valve_parameters);
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
    try {fetch(`${ENDPOINT}/api/levelcontrolcalc`, requestOptions)
    .then(response => response.json())
    .then(data => setlevelControlValveParameters(data))}
    catch(error){
      throw error;
    }
  }, []);


  return (
    <div className="p-grid p-fluid index">
          <div className="datatable-editing-demo">

      <div className="card card-color">
        <h5>Level Control Valve Parameters</h5>
        <Toolbar className="p-mb-4" right={rightToolbarTemplate}></Toolbar>
        <DataTable
          ref={dt}
          value={levelControlValveParameters}>
          <Column headerStyle={{ textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="separator_tag"
            header="Separator"            
          ></Column>
          <Column headerStyle={{ textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="liquidflowcapacity"
            header="LCV_Liquid_Flow_Capacity (m&sup3;/h)"
          ></Column>
          <Column headerStyle={{ textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="levelvalverequiredcv"
            header="Level Valve required Cv (gpm)"
          ></Column>
          <Column headerStyle={{ textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="levelcontrolvalvestatus"
            header="Level Control Valve Status"
          ></Column>
        </DataTable>
      </div>
    </div>
    </div>

  );
};