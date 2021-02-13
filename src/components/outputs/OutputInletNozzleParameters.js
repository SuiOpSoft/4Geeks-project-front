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

export const OutputInletNozzleParameters = () => {
  
  const { store, actions } = useContext(Context);

  const [inletNozzleParameters, setInletNozzleParameters] = useState(store.output_inlet_nozzle_parameters);
  const dt = useRef(null);
  
  const rightToolbarTemplate = () => {
    return (
        <React.Fragment>
            <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
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
    <div className="p-grid p-fluid">
          <div className="datatable-editing-demo">

      <div className="card">
        <h5>Inlet Nozzle Parameters</h5>
        <Toolbar className="p-mb-4" right={rightToolbarTemplate}></Toolbar>
        <DataTable
          ref={dt}
          value={inletNozzleParameters}>
          <Column
            field="separator"
            header="Separator"            
          ></Column>
          <Column
            field="Mixture_Inlet_Nozzle_Velocity"
            header="Mixture Inlet Nozzle Velocity (m/s)"
          ></Column>
          <Column
            field="Inlet_Nozzle_Momentum"
            header="Inlet Nozzle Momentum (kg/(m*sec&sup2;))"
          ></Column>
          <Column
            field="Maximum_Mixture_Inlet_Nozzle_Velocity"
            header="Maximum Mixture Inlet Nozzle Velocity (m/s)"
          ></Column>
          <Column
            field="Maximum_Inlet_Nozzle_Momentum"
            header="Maximum Inlet Nozzle Momentum (kg/(m*sec&sup2;))"
          ></Column>
          <Column
            field="Maximun_Liquid_Flow_Inlet_Nozzle"
            header="Maximun Liquid Flow Inlet Nozzle (m&sup3;/h)"
          ></Column>
          <Column
            field="Maximum_Gas_Flow_Inlet_Nozzle"
            header="Maximum Gas Flow Inlet Nozzle (m&sup3;/h)"
          ></Column>
          <Column
            field="Status_Inlet_Nozzle"
            header="Status Inlet Nozzle"
          ></Column>
        </DataTable>
      </div>
    </div>
    </div>

  );
};