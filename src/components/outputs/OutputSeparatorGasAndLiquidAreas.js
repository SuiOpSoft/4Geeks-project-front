import "primeicons/primeicons.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";

import React, { useState, useRef, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../inputs/DataReliefValve.css";
import {Context} from "../../store/context"

export const OutputSeparatorGasAndLiquidAreas = () => {
  
  const { store, actions } = useContext(Context);
  const [separatorGasAndLiquidAreas, setSeparatorGasAndLiquidAreas] = useState(store.output_separator_gas_and_liquid_areas);
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
        <h5>Separator Gas and Liquid Areas</h5>
        <Toolbar className="p-mb-4" right={rightToolbarTemplate}></Toolbar>
        <DataTable ref={dt}
          value={separatorGasAndLiquidAreas}
          scrollHeight="55vh" 
          frozenWidth="15rem"
          scrollable>
          <Column headerStyle={{ width: '15rem' }}
            field="separator"
            header="Separator" frozen          
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="Separator_Cross_sectional_Area_Ratio"
            header="Sectional Area Ratio (mm)"
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="Separator_Cross_sectional_Area"
            header="Cross-sectional Area (m&sup2;)"
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="Inlet_Nozzle_Area"
            header="Inlet Nozzle Area (m&sup2;)"
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="Gas_Nozzle_Area"
            header="Gas Nozzle Area (m&sup2;)"
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="Liquid_Nozzle_Area"
            header="Liquid Nozzle Area (m&sup2;)"
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="High_Level_Trip_Gas_Area"
            header="High Level Trip Gas Area (m&sup2;)"
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="Normal_Level_Gas_Area"
            header="Normal Level Gas Area (m&sup2;)"
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="Low_Level_Gas_Area"
            header="Low Level Gas Area (m&sup2;)"
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="High_Level_Trip_Liquid_Area"
            header="High LEvel Trip Liquid Area (m&sup2;)"
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="Normal_Level_Liquid_Area"
            header="Normal LEvel Trip Liquid Area (m&sup2;)"
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="Low_Level_Trip_Liquid_Area"
            header="Low LEvel Trip Liquid Area (m&sup2;)"
          ></Column>
        </DataTable>
      </div>
    </div>

  );
};
