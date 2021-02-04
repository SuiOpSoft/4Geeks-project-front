import "primeicons/primeicons.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";

import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import "./DataReliefValve.css";

export const DataSeparators = () => {
  let dataSeparators = [
    {
      //   1
      separator: "equipo1",
      internal_Diameter: "-",
      t_t_length: "-",
      high_Level_Trip: "-",
      high_Level_Alarm: "-",
      normal_Liquid_Level: "-",
      low_Level_Alarm: "-",
      //   2
      inlet_Nozzle: "-",
      gas_Oulet_Nozzle: "-",
      liquid_Outlet_Nozzle: "-",
      inlet_Device_Type: "-",
      demister_Type: "-"
    },
  ];

  const [separators, setSeparators] = useState(dataSeparators);

  let originalRows = {};

  const dataTableFuncMap = {
    separators: setSeparators,
  };

  /*useEffect(() => {
        fetchProductData('products1');
        fetchProductData('products2');
        fetchProductData('products3');
    }, []); // eslint-disable-line react-hooks/exhaustive-deps*/

  const onRowEditInit = (event) => {
    originalRows[event.index] = { ...separators[event.index] };
  };

  const onRowEditCancel = (event) => {
    let products = [...separators];
    products[event.index] = originalRows[event.index];
    delete originalRows[event.index];

    setSeparators(products);
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
      case "separator":
        return inputTextEditor(productKey, props, "separator");
      case "internal_Diameter":
        return inputTextEditor(productKey, props, "internal_Diameter");
      case "t_t_length":
        return inputTextEditor(productKey, props, "t_t_length");
      case "high_Level_Trip":
        return inputTextEditor(productKey, props, "high_Level_Trip");
      case "high_Level_Alarm":
        return inputTextEditor(productKey, props, "high_Level_Alarm");
      case "normal_Liquid_Level":
        return inputTextEditor(productKey, props, "normal_Liquid_Level");
      case "low_Level_Alarm":
        return inputTextEditor(productKey, props, "low_Level_Alarm");
      case "gas_Oulet_Nozzle":
        return inputTextEditor(productKey, props, "gas_Oulet_Nozzle");
      case "liquid_Outlet_Nozzle":
        return inputTextEditor(productKey, props, "liquid_Outlet_Nozzle");
      case "inlet_Device_Type":
        return inputTextEditor(productKey, props, "inlet_Device_Type");
      case "demister_Type":
        return inputTextEditor(productKey, props, "demister_Type");
      default:
        break;
    }
  };

  return (
    <div className="p-grid p-fluid">
      <div className="card">
        <h5>Separators 1</h5>
        {/* Data Separators Table 1 */}
        <DataTable
          value={separators}
          editMode="row"
          dataKey="id"
          onRowEditInit={onRowEditInit}
          onRowEditCancel={onRowEditCancel}
        >
          <Column
            field="separator"
            header="Separators"
            editor={(props) => checkEditor("separators", props)}
          ></Column>
          <Column
            field="internal_Diameter"
            header="Internal Diameter (mm)"
            editor={(props) => checkEditor("separators", props)}
          ></Column>
          <Column
            field="t_t_length"
            header="T-T Length (mm)"
            editor={(props) => checkEditor("separators", props)}
          ></Column>
          <Column
            field="high_Level_Trip"
            header="High Level trip (mm)"
            editor={(props) => checkEditor("separators", props)}
          ></Column>
          <Column
            field="high_Level_Alarm"
            header="High Level Alarm (mm)"
            editor={(props) => checkEditor("separators", props)}
          ></Column>
          <Column
            field="normal_Liquid_Level"
            header="Normal Liquid Level (mm)"
            editor={(props) => checkEditor("separators", props)}
          ></Column>
          <Column
            field="low_Level_Alarm"
            header="Low Level Alarm (mm)"
            editor={(props) => checkEditor("separators", props)}
          ></Column>
        </DataTable>

        <h5>Separators 2</h5>
        {/* Data separators Table 2 */}
        <DataTable
          value={separators}
          editMode="row"
          dataKey="id"
          onRowEditInit={onRowEditInit}
          onRowEditCancel={onRowEditCancel}
        >
          <Column
            field="separator"
            header="Separators"
            editor={(props) => checkEditor("separators", props)}
          ></Column>
          <Column
            field="inlet_Nozzle"
            header="Inlet Nozzle (mm)"
            editor={(props) => checkEditor("separators", props)}
          ></Column>
          <Column
            field="gas_Oulet_Nozzle"
            header="gas Outlet Nozzle (mm)"
            editor={(props) => checkEditor("separators", props)}
          ></Column>
          <Column
            field="liquid_Outlet_Nozzle"
            header="Liquid Outlet Nozzle (mm)"
            editor={(props) => checkEditor("separators", props)}
          ></Column>
          <Column
            field="inlet_Device_Type"
            header="Inlet Device Tupe (NID, HOP or SP)"
            editor={(props) => checkEditor("separators", props)}
          ></Column>
          <Column
            field="demister_Type"
            header="Demister Type (KO, VD, HD or HVD)"
            editor={(props) => checkEditor("separators", props)}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};
