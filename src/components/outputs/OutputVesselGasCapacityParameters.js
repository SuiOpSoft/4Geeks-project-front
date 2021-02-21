import "primeicons/primeicons.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";

import React, { useState, useRef, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../inputs/DataReliefValve.css";
import {Context} from "../../store/context"
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";

export const OutputVesselGasCapacityParameters = () => {
  
  const { store, actions } = useContext(Context);
  const [vesselGasCapacityParameters, setVesselGasCapacityParameters] = useState(store.output_vessel_gas_capacity_parameters);
  const dt = useRef(null);
  
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
  


  // useEffect(() => {
  //       fetchProductData('reliefValves');
  //   }, []); // eslint-disable-line react-hooks/exhaustive-deps*/

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
          <Column headerStyle={{ width: '15rem' }}
            field="separator"
            header="Separator" frozen          
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="Gas_Load_Factor"
            header="Gas Load Factor(m/s)"
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="Maximum_Gas_Flow_at_HH_level"
            header="Maximum Gas Flow at HH level (m&sup3;/h)"
          ></Column>
          <Column headerStyle={{ width: '25rem' }}
            field="Maximum_Gas_Flow_at_Normal_level"
            header="Maximum Gas Flow at Normal level (m&sup3;/h)"
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="Status_Gas_Capacity_at_high_level"
            header="Status Gas Capacity at high level"
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="Status_Gas_Capacity_at_normal_level"
            header="Status Gas Capacity at normal level"
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};