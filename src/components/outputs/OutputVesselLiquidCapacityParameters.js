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

export const OutputVesselLiquidCapacityParameters = () => {
  
  const { store, actions } = useContext(Context);

  const [vesselLiquidCapacityParameters, setVesselLiquidCapacityParameters] = useState(store.output_vessel_liquid_capacity_parameters);
  


  // useEffect(() => {
  //       fetchProductData('reliefValves');
  //   }, []); // eslint-disable-line react-hooks/exhaustive-deps*/

  return (
    <div className="p-grid p-fluid">
          <div className="datatable-editing-demo">

      <div className="card">
        <h5>Vessel Liquid Capacity Parameters</h5>
        <DataTable
          value={vesselLiquidCapacityParameters}>
          <Column
            field="separator"
            header="Separator"            
          ></Column>
          <Column
            field="Maximum_Vessel_Liquid_Flow_Capacity_at_Normal_Level"
            header="Maximum Vessel Liquid Flow Capacity at Normal Level (m&sup3;/h)"
          ></Column>
          <Column
            field="Status_Vessel_Liquid_Capacity"
            header="Status Vessel Liquid Capacity"
          ></Column>
        </DataTable>
      </div>
    </div>
    </div>

  );
};