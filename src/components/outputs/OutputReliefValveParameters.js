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

export const OutputReliefValveParameters = () => {
  
  const { store, actions } = useContext(Context);

  const [outputReliefValveParameters, setOutputReliefValveParameters] = useState(store.output_relief_valve_parameters);
  


  // useEffect(() => {
  //       fetchProductData('reliefValves');
  //   }, []); // eslint-disable-line react-hooks/exhaustive-deps*/

  return (
    <div className="p-grid p-fluid">
          <div className="datatable-editing-demo">

      <div className="card">
        <h5>Relief Valve Parameters</h5>
        <DataTable
          value={outputReliefValveParameters}>
          <Column
            field="separator"
            header="Separator"            
          ></Column>
          <Column
            field="Relief_Valve_Capacity"
            header="Relief Valve Capacity  (m&sup3;/h)"
          ></Column>
          <Column
            field="Relief_Valve_Capacity_Status"
            header="Relief Valve Capacity Status"
          ></Column>
        </DataTable>
      </div>
    </div>
    </div>

  );
};