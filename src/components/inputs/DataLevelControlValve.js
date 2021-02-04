import "primeicons/primeicons.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";

import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import "./DataReliefValve.css";

export const DataLevelControlValves = () => {
  let dataLevelControlValves = [
    {
      separator: "equipo1",
      lcv_Tag: "-",
      lcv_Cv: "-",
      lcv_Diameter: "-",
      inlet_Lcv_Piping_Diameter: "-",
      outlet_Lcv_Piping_Diameter: "-",
      lcv_Factor_Fl: "-",
      lcv_Factor_Fi: "-",
      lcv_Factor_Fp: "-",
      lcv_Inlet_Pressure: "-",
      lcv_Outlet_Pressure: "-",
    },
  ];

  const [levelControlValves, setLevelControlValves] = useState(
    dataLevelControlValves
  );
  const toast = useRef(null);

  let originalRows = {};

  const dataTableFuncMap = {
    levelControlValves: setLevelControlValves,
  };

  /*useEffect(() => {
        fetchProductData('levelControlValves');
    }, []); // eslint-disable-line react-hooks/exhaustive-deps*/

  const onRowEditInit = (event) => {
    originalRows[event.index] = { ...levelControlValves[event.index] };
  };

  const onRowEditCancel = (event) => {
    let products = [...levelControlValves];
    products[event.index] = originalRows[event.index];
    delete originalRows[event.index];

    setLevelControlValves(products);
  };

  const onEditorValueChange = (productKey, props, value) => {
    let updatedProducts = [...props.value];
    updatedProducts[props.rowIndex][props.field] = value;
    dataTableFuncMap[`${productKey}`](updatedProducts);
  };

  const inputTextEditor = (productKey, props, field) => {
    return (
      <InputText
        type="text"
        value={props.rowData[field]}
        onChange={(e) => onEditorValueChange(productKey, props, e.target.value)}
      />
    );
  };

  const checkEditor = (productKey, props) => {
    switch (props.field) {
      case "name":
        return inputTextEditor(productKey, props, "name");
      case "lcv_Tag":
        return inputTextEditor(productKey, props, "lcv_Tag");
      case "lcv_Cv":
        return inputTextEditor(productKey, props, "lcv_Cv");
      case "lcv_Diameter":
        return inputTextEditor(productKey, props, "lcv_Diameter");
      case "inlet_Lcv_Piping_Diameter":
        return inputTextEditor(productKey, props, "inlet_Lcv_Piping_Diameter");
      case "outlet_Lcv_Piping_Diameter":
        return inputTextEditor(productKey, props, "outlet_Lcv_Piping_Diameter");
      case "lcv_Factor_Fl":
        return inputTextEditor(productKey, props, "lcv_Factor_Fl");
      case "lcv_Factor_Fi":
        return inputTextEditor(productKey, props, "lcv_Factor_Fi");
      case "lcv_Factor_Fp":
        return inputTextEditor(productKey, props, "lcv_Factor_Fp");
      case "lcv_Inlet_Pressure":
        return inputTextEditor(productKey, props, "lcv_Inlet_Pressure");
      case "lcv_Outlet_Pressure":
        return inputTextEditor(productKey, props, "lcv_Outlet_Pressure");
      default:
        break;
    }
  };

  return (
    <div className="p-grid p-fluid">
      <div className="datatable-editing-demo">
        <Toast ref={toast} />

        <div className="card">
          <h5>Level Control Valves</h5>
          <DataTable
            value={levelControlValves}
            editMode="row"
            dataKey="id"
            onRowEditInit={onRowEditInit}
            onRowEditCancel={onRowEditCancel}
          >
            <Column
              field="separator"
              header="Separator"
              editor={(props) => checkEditor("levelControlValves", props)}
            ></Column>
            <Column
              field="lcv_Tag"
              header="Lcv Tag"
              editor={(props) => checkEditor("levelControlValves", props)}
            ></Column>
            <Column
              field="lcv_Cv"
              header="Lcv Cv (US gpm)"
              editor={(props) => checkEditor("levelControlValves", props)}
            ></Column>
            <Column
              field="lcv_Diameter"
              header="Lcv Diameter (in)"
              editor={(props) => checkEditor("levelControlValves", props)}
            ></Column>
            <Column
              field="outlet_Lcv_Piping_Diameter"
              header="Outlet LCV piping diameter (in)"
              editor={(props) => checkEditor("levelControlValves", props)}
            ></Column>
                        <Column
              field="inlet_Lcv_Piping_Diameter"
              header="Inlet Lcv Piping Diameter (in)"
              editor={(props) => checkEditor("levelControlValves", props)}
            ></Column>
            <Column
              field="lcv_Factor_Fl"
              header="LCV Factor FL (constant)"
              editor={(props) => checkEditor("levelControlValves", props)}
            ></Column>
            <Column
              field="lcv_Factor_Fi"
              header="LCV Factor FI (constant)"
              editor={(props) => checkEditor("levelControlValves", props)}
            ></Column>
            <Column
              field="lcv_Factor_Fp"
              header="LCV Factor FP (constant)"
              editor={(props) => checkEditor("levelControlValves", props)}
            ></Column>
            <Column
              field="lcv_Inlet_Pressure"
              header="LCV Inlet Pressure (kpa)"
              editor={(props) => checkEditor("levelControlValves", props)}
            ></Column>
            <Column
              field="lcv_Outlet_Pressure"
              header="LCV Outlet Pressure (kpa)"
              editor={(props) => checkEditor("levelControlValves", props)}
            ></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
};
