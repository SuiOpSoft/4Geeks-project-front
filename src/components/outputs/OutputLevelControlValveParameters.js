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

export const OutputLevelControlValveParameters = () => {
  
  const { store, actions } = useContext(Context);

  const [levelControlValveParameters, setlevelControlValveParameters] = useState(store.output_level_control_valve_parameters);
  


  // useEffect(() => {
  //       fetchProductData('reliefValves');
  //   }, []); // eslint-disable-line react-hooks/exhaustive-deps*/

  return (
    <div className="p-grid p-fluid">
          <div className="datatable-editing-demo">

      <div className="card">
        <h5>Level Control Valve Parameters</h5>
        <DataTable
          value={levelControlValveParameters}>
          <Column
            field="separator"
            header="Separator"            
          ></Column>
          <Column
            field="LCV_Liquid_Flow_Capacity"
            header="LCV_Liquid_Flow_Capacity (m&sup3;/h)"
          ></Column>
          <Column
            field="Level_Valve_required_Cv"
            header="Level Valve required Cv (gpm)"
          ></Column>
          <Column
            field="Level_Control_Valve_Status"
            header="Level Control Valve Status"
          ></Column>
        </DataTable>
      </div>
    </div>
    </div>

  );
};