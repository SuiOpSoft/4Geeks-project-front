import "primeicons/primeicons.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";

import React, { useState, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import "./DataReliefValve.css";
import { Button } from "primereact/button";
import { Context } from "../../store/context";

export const DataSeparators = () => {
  let dataSeparators = [
    {
      //   1
      separator: "V-36102",
      internal_Diameter: "1800",
      t_t_length: "6300",
      high_Level_Trip: "1080",
      high_Level_Alarm: "900",
      normal_Liquid_Level: "650",
      low_Level_Alarm: "390",
      //   2
      inlet_Nozzle: "203.2",
      gas_Oulet_Nozzle: "152.4",
      liquid_Outlet_Nozzle: "203.2",
      inlet_Device_Type: "-",
      demister_Type: "-",
    },
  ];
  const { store, actions } = useContext(Context);
  
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

  const SeparatorGasAndLiquidAreasCalc = (
    Diam,
    Length,
    HHl,
    Nl,
    Ll,
    INd,
    GOn,
    LOn
  ) => {
    console.log(Diam);

    let LA_Hh;
    let LA_Nl;
    let LA_Ll;

    let Pi = 3.14159265358979;
    let Area_Sep = (Pi * Diam ** 2) / (4 * 10 ** 6);
    let Radio = Diam / 2;
    let INArea = (Pi * INd ** 2) / (4 * 10 ** 6);
    let GONArea = (Pi * GOn ** 2) / (4 * 10 ** 6);
    let LONArea = (Pi * LOn ** 2) / (4 * 10 ** 6);
    let ABS_R_Hh = Math.abs(Radio - HHl);
    let ABS_R_Nl = Math.abs(Radio - Nl);
    let ABS_R_Ll = Math.abs(Radio - Ll);
    let AHh = 2.0 * Math.acos(ABS_R_Hh / Radio);
    let ANl = 2.0 * Math.acos(ABS_R_Nl / Radio);
    let ALl = 2.0 * Math.acos(ABS_R_Ll / Radio);
    let TAHh = (0.5 * ABS_R_Hh * Diam * Math.sin(AHh / 2.0)) / 1.0e6;
    let TANl = (0.5 * ABS_R_Nl * Diam * Math.sin(ANl / 2.0)) / 1.0e6;
    let TALl = (0.5 * ABS_R_Ll * Diam * Math.sin(ALl / 2.0)) / 1.0e6;
    if (HHl > Radio) {
      LA_Hh = ((Radio ** 2 / 2.0) * (2 * Pi - AHh)) / 1.0e6 + TAHh;
    } else {
      LA_Hh = ((Radio ** 2 / 2.0) * AHh) / 1.0e6 - TAHh;
    }
    if (Nl > Radio) {
      LA_Nl = ((Radio ** 2 / 2.0) * (2 * Pi - ANl)) / 1.0e6 + TANl;
    } else {
      LA_Nl = ((Radio ** 2 / 2.0) * ANl) / 1.0e6 - TANl;
    }
    if (Ll > Radio) {
      LA_Ll = ((Radio ** 2 / 2.0) * (2 * Pi - ALl)) / 1.0e6 + TALl;
    } else {
      LA_Ll = ((Radio ** 2 / 2.0) * ALl) / 1.0e6 - TALl;
    }
    let GA_Hh = Area_Sep - LA_Hh;
    let GA_Nl = Area_Sep - LA_Nl;
    let GA_Ll = Area_Sep - LA_Ll;

    return (store.separatorsOutput[0].Separator_Cross_sectional_Area_Ratio = Radio.toFixed(2),
            store.separatorsOutput[0].Separator_Cross_sectional_Area = Area_Sep.toFixed(2),
            store.separatorsOutput[0].Inlet_Nozzle_Area = INArea.toFixed(2),
            store.separatorsOutput[0].Gas_Nozzle_Area = GONArea.toFixed(2),
            store.separatorsOutput[0].Liquid_Nozzle_Area = LONArea.toFixed(2),
            store.separatorsOutput[0].High_Level_Trip_Gas_Area = GA_Hh.toFixed(2),
            store.separatorsOutput[0].Normal_Level_Gas_Area = GA_Nl.toFixed(2),
            store.separatorsOutput[0].Low_Level_Gas_Area = GA_Ll.toFixed(2),
            store.separatorsOutput[0].High_LEvel_Trip_Liquid_Area = LA_Hh.toFixed(2),
            store.separatorsOutput[0].Normal_LEvel_Trip_Liquid_Area = LA_Nl.toFixed(2),
            store.separatorsOutput[0].Low_LEvel_Trip_Liquid_Area = LA_Ll.toFixed(2));
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
        <Button
          label="Calcular"
          value=""
          onClick={() => SeparatorGasAndLiquidAreasCalc(dataSeparators[0].internal_Diameter, 
                                                        dataSeparators[0].t_t_length, 
                                                        dataSeparators[0].high_Level_Trip,
                                                        dataSeparators[0].high_Level_Alarm,
                                                        dataSeparators[0].normal_Liquid_Level,
                                                        dataSeparators[0].low_Level_Alarm,
                                                        dataSeparators[0].inlet_Nozzle,
                                                        dataSeparators[0].gas_Oulet_Nozzle,
                                                        dataSeparators[0].liquid_Outlet_Nozzle,
                                                        dataSeparators[0].inlet_Device_Type,
                                                        dataSeparators[0].Low_LEvel_Trip_Liquid_Area)
          }
        ></Button>
      </div>
    </div>
  );
};
