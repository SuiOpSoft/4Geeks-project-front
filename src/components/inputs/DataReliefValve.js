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

export const DataReliefValve = () => {
  let dataReliefValves = [
    {
      separator: "equipo1",
      RV_set_pressure_value: "-",
      RV_set_pressure_reference: "-",
      RV_Orifice_Area_value: "-",
    },
    {
      separator: "equipo2",
      RV_set_pressure_value: "-",
      RV_set_pressure_reference: "-",
      RV_Orifice_Area_value: "-",
    },
    {
      separator: "equipo3",
      RV_set_pressure_value: "-",
      RV_set_pressure_reference: "-",
      RV_Orifice_Area_value: "-",
    },
  ];

  const [reliefValves, setReliefValves] = useState(dataReliefValves);
  const toast = useRef(null);

  let originalRows = {};

  const dataTableFuncMap = {
    reliefValves: setReliefValves
  };

  /*useEffect(() => {
        fetchProductData('reliefValves');
    }, []); // eslint-disable-line react-hooks/exhaustive-deps*/

  const onRowEditInit = (event) => {
    originalRows[event.index] = { ...reliefValves[event.index] };
  };

  const onRowEditCancel = (event) => {
    let products = [...reliefValves];
    products[event.index] = originalRows[event.index];
    delete originalRows[event.index];

    setReliefValves(products);
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
      case "RV_set_pressure_value":
        return inputTextEditor(productKey, props, "RV_set_pressure_value");
      case "RV_set_pressure_reference":
        return inputTextEditor(productKey, props, "RV_set_pressure_reference");
      case "RV_set_pressure_units":
        return inputTextEditor(productKey, props, "RV_set_pressure_units");
      case "RV_Orifice_Area_value":
        return inputTextEditor(productKey, props, "RV_Orifice_Area_value");
      case "RV_Orifice_Area_reference":
        return inputTextEditor(productKey, props, "RV_Orifice_Area_reference");
      case "RV_Orifice_Area_units":
        return inputTextEditor(productKey, props, "RV_Orifice_Area_units");
      default:
        break;
    }
  };

  return (
    <div className="p-grid p-fluid">
          <div className="datatable-editing-demo">
      <Toast ref={toast} />

      <div className="card">
        <h5>Valve Relief</h5>
        <DataTable
          value={reliefValves}
          editMode="row"
          dataKey="id"
          onRowEditInit={onRowEditInit}
          onRowEditCancel={onRowEditCancel}
        >
          <Column
            field="separator"
            header="Separator"
            editor={(props) => checkEditor("reliefValves", props)}
          ></Column>
          <Column
            field="RV_set_pressure_value"
            header="RV Tag"
            editor={(props) => checkEditor("reliefValves", props)}
          ></Column>
          <Column
            field="RV_set_pressure_reference"
            header="RV Set Pressure (kPa)"
            editor={(props) => checkEditor("reliefValves", props)}
          ></Column>
          <Column
            field="RV_Orifice_Area_value"
            header="RV Orifice Area (in^2)"
            editor={(props) => checkEditor("reliefValves", props)}
          ></Column>
          <Column
            rowEditor
            headerStyle={{ width: "7rem" }}
            bodyStyle={{ textAlign: "center" }}
          ></Column>
        </DataTable>
      </div>
    </div>
    </div>

  );
};
