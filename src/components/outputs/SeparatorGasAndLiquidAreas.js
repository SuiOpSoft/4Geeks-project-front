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

export const SeparatorGasAndLiquidAreas = () => {
  
  const { store, actions } = useContext(Context);

  const [separatorGasAndLiquidAreas, setSeparatorGasAndLiquidAreas] = useState(store.separatorsOutput);
  


  // useEffect(() => {
  //       fetchProductData('reliefValves');
  //   }, []); // eslint-disable-line react-hooks/exhaustive-deps*/

  return (
    <div className="p-grid p-fluid">
          <div className="datatable-editing-demo">

      <div className="card">
        <h5>Separator Gas and Liquid Areas</h5>
        <DataTable
          value={separatorGasAndLiquidAreas}>
          <Column
            field="separator"
            header="Separator"
            
          ></Column>
          <Column
            field="Separator_Cross_sectional_Area_Ratio"
            header="Sectional Area Ratio (mm)"
          ></Column>
          <Column
            field="Separator_Cross_sectional_Area"
            header="Cross-sectional Area (m2)"
          ></Column>
          <Column
            field="Inlet_Nozzle_Area"
            header="Inlet Nozzle Area (m2)"
          ></Column>
          <Column
            field="Gas_Nozzle_Area"
            header="Gas Nozzle Area (m2)"
          ></Column>
          <Column
            field="Liquid_Nozzle_Area"
            header="Liquid Nozzle Area (m2)"
          ></Column>
          <Column
            field="High_Level_Trip_Gas_Area"
            header="High Level Trip Gas Area (m2)"
          ></Column>
          <Column
            field="Normal_Level_Gas_Area"
            header="Normal Level Gas Area (m2)"
          ></Column>
          <Column
            field="Low_Level_Gas_Area"
            header="Low Level Gas Area (m2)"
          ></Column>
          <Column
            field="High_LEvel_Trip_Liquid_Area"
            header="High LEvel Trip Liquid Area (m2)"
          ></Column>
          <Column
            field="Normal_LEvel_Trip_Liquid_Area"
            header="Normal LEvel Trip Liquid Area (m2)"
          ></Column>
          <Column
            field="Low_LEvel_Trip_Liquid_Area"
            header="Low LEvel Trip Liquid Area (m2)"
          ></Column>
        </DataTable>
      </div>
    </div>
    </div>

  );
};
