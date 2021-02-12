import "primeicons/primeicons.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";
import getState from "../../store/flux";
import React, { useState, useContext, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import "./DataReliefValve.css";
import classNames from "classnames";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Context } from "../../store/context";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";

export const DataSeparators = () => {
  const toast = useRef(null);
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

  let emptySeparator = {
    separator: "",
    internal_Diameter: "-",
    t_t_length: "-",
    high_Level_Trip: "-",
    high_Level_Alarm: "-",
    normal_Liquid_Level: "-",
    low_Level_Alarm: "-",
    inlet_Nozzle: "-",
    gas_Oulet_Nozzle: "-",
    liquid_Outlet_Nozzle: "-",
    inlet_Device_Type: "-",
    demister_Type: "-",
  };

  let emptySeparatorResult = {
    separator: "Equipo",
    Separator_Cross_sectional_Area_Ratio: "",
    Separator_Cross_sectional_Area: "",
    Inlet_Nozzle_Area: "",
    Gas_Nozzle_Area: "",
    Liquid_Nozzle_Area: "",
    High_Level_Trip_Gas_Area: "",
    Normal_Level_Gas_Area: "",
    Low_Level_Gas_Area: "",
    High_Level_Trip_Liquid_Area: "",
    Normal_Level_Liquid_Area: "",
    Low_LEvel_Trip_Liquid_Area: "",
  };

  const { store, actions } = useContext(Context);
  const [separatorDialog, setSeparatorDialog] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);

  const [separators, setSeparators] = useState(dataSeparators);
  const [separator, setSeparator] = useState(emptySeparator);
  const [separatorResult, setSeparatorResult] = useState(emptySeparatorResult);

  let originalRows = {};

  const dataTableFuncMap = {
    separators: setSeparators,
  };

  /*useEffect(() => {
        fetchProductData('products1');
        fetchProductData('products2');
        fetchProductData('products3');
    }, []); // eslint-disable-line react-hooks/exhaustive-deps*/

  const hideDialog = () => {
    setSubmitted(false);
    setSeparatorDialog(false);
  };

  const saveSeparator = () => {
    setSubmitted(true);
    if (separator.separator.trim()) {
      let _separator = { ...separator };
      let _separators = [...separators];

      //_separator.separator = createId();
      _separators.push(_separator);
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Separator Created",
        life: 3000,
      });
      setSeparators(_separators);
      setSeparatorDialog(false);
      setSeparator(emptySeparator);
    }
  };

  const onRowEditInit = (event) => {
    originalRows[event.index] = { ...separators[event.index] };
  };

  const onRowEditCancel = (event) => {
    let products = [...separators];
    products[event.index] = originalRows[event.index];
    delete originalRows[event.index];

    setSeparators(products);
  };

  const SeparatorGasAndLiquidAreasCalc = (separators) => {
    store.output_separator_gas_and_liquid_areas = [];
    let _separatorResult = { ...separatorResult };
    let _separatorsResults = [...store.output_separator_gas_and_liquid_areas];
    // store.output_separator_gas_and_liquid_areas = _separatorsResults;
    let Pi = 3.14159265358979;
    let Radio;
    let Area_Sep;
    let INArea;
    let GONArea;
    let LONArea;
    let ABS_R_Hh;
    let ABS_R_Nl;
    let ABS_R_Ll;
    let AHh;
    let ANl;
    let ALl;
    let TAHh;
    let TANl;
    let TALl;
    let GA_Hh;
    let GA_Nl;
    let GA_Ll;
    let LA_Hh;
    let LA_Nl;
    let LA_Ll;
    let test = separators.map((item) => {
      Area_Sep = (Pi * item.internal_Diameter ** 2) / (4 * 10 ** 6);
      Radio = item.internal_Diameter / 2;
      INArea = (Pi * item.inlet_Nozzle ** 2) / (4 * 10 ** 6);
      GONArea = (Pi * item.gas_Oulet_Nozzle ** 2) / (4 * 10 ** 6);
      LONArea = (Pi * item.liquid_Outlet_Nozzle ** 2) / (4 * 10 ** 6);
      ABS_R_Hh = Math.abs(Radio - item.high_Level_Trip);
      ABS_R_Nl = Math.abs(Radio - item.normal_Liquid_Level);
      ABS_R_Ll = Math.abs(Radio - item.low_Level_Alarm);
      AHh = 2.0 * Math.acos(ABS_R_Hh / Radio);
      ANl = 2.0 * Math.acos(ABS_R_Nl / Radio);
      ALl = 2.0 * Math.acos(ABS_R_Ll / Radio);
      TAHh =
        (0.5 * ABS_R_Hh * item.internal_Diameter * Math.sin(AHh / 2.0)) / 1.0e6;
      TANl =
        (0.5 * ABS_R_Nl * item.internal_Diameter * Math.sin(ANl / 2.0)) / 1.0e6;
      TALl =
        (0.5 * ABS_R_Ll * item.internal_Diameter * Math.sin(ALl / 2.0)) / 1.0e6;
      if (item.high_Level_Trip > Radio) {
        LA_Hh = ((Radio ** 2 / 2.0) * (2 * Pi - AHh)) / 1.0e6 + TAHh;
      } else {
        LA_Hh = ((Radio ** 2 / 2.0) * AHh) / 1.0e6 - TAHh;
      }
      if (item.normal_Liquid_Level > Radio) {
        LA_Nl = ((Radio ** 2 / 2.0) * (2 * Pi - ANl)) / 1.0e6 + TANl;
      } else {
        LA_Nl = ((Radio ** 2 / 2.0) * ANl) / 1.0e6 - TANl;
      }
      if (item.low_Level_Alarm > Radio) {
        LA_Ll = ((Radio ** 2 / 2.0) * (2 * Pi - ALl)) / 1.0e6 + TALl;
      } else {
        LA_Ll = ((Radio ** 2 / 2.0) * ALl) / 1.0e6 - TALl;
      }
      GA_Hh = Area_Sep - LA_Hh;
      GA_Nl = Area_Sep - LA_Nl;
      GA_Ll = Area_Sep - LA_Ll;
      _separatorResult.Separator_Cross_sectional_Area = Area_Sep.toFixed(2);
      _separatorResult.Separator_Cross_sectional_Area_Ratio = Radio;
      _separatorResult.Inlet_Nozzle_Area = Area_Sep.toFixed(2);
      _separatorResult.Gas_Nozzle_Area = GONArea.toFixed(2);
      _separatorResult.Liquid_Nozzle_Area = LONArea.toFixed(2);
      _separatorResult.High_Level_Trip_Liquid_Area = LA_Hh.toFixed(2);
      _separatorResult.Normal_Level_Liquid_Area = LA_Nl.toFixed(2);
      _separatorResult.Low_LEvel_Trip_Liquid_Area = LA_Ll.toFixed(2);
      _separatorResult.High_Level_Trip_Gas_Area = GA_Hh.toFixed(2);
      _separatorResult.Normal_Level_Gas_Area = GA_Nl.toFixed(2);
      _separatorResult.Low_Level_Gas_Area = GA_Ll.toFixed(2);

      _separatorsResults.push(_separatorResult);

      return (store.output_separator_gas_and_liquid_areas = _separatorsResults);
    });

    // let LA_Hh;
    // let LA_Nl;
    // let LA_Ll;

    // let Pi = 3.14159265358979;
    // let  Area_Sep = (Pi * Diam ** 2) / (4 * 10 ** 6);
    // let Radio = Diam / 2;
    // let INArea = (Pi * INd ** 2) / (4 * 10 ** 6);
    // let GONArea = (Pi * GOn ** 2) / (4 * 10 ** 6);
    // let LONArea = (Pi * LOn ** 2) / (4 * 10 ** 6);
    // let ABS_R_Hh = Math.abs(Radio - HHl);
    // let ABS_R_Nl = Math.abs(Radio - Nl);
    // let ABS_R_Ll = Math.abs(Radio - Ll);
    // let AHh = 2.0 * Math.acos(ABS_R_Hh / Radio);
    // let ANl = 2.0 * Math.acos(ABS_R_Nl / Radio);
    // let ALl = 2.0 * Math.acos(ABS_R_Ll / Radio);
    // let TAHh = (0.5 * ABS_R_Hh * Diam * Math.sin(AHh / 2.0)) / 1.0e6;
    // let TANl = (0.5 * ABS_R_Nl * Diam * Math.sin(ANl / 2.0)) / 1.0e6;
    // let TALl = (0.5 * ABS_R_Ll * Diam * Math.sin(ALl / 2.0)) / 1.0e6;
    // if (HHl > Radio) {
    //   LA_Hh = ((Radio ** 2 / 2.0) * (2 * Pi - AHh)) / 1.0e6 + TAHh;
    // } else {
    //   LA_Hh = ((Radio ** 2 / 2.0) * AHh) / 1.0e6 - TAHh;
    // }
    // if (Nl > Radio) {
    //   LA_Nl = ((Radio ** 2 / 2.0) * (2 * Pi - ANl)) / 1.0e6 + TANl;
    // } else {
    //   LA_Nl = ((Radio ** 2 / 2.0) * ANl) / 1.0e6 - TANl;
    // }
    // if (Ll > Radio) {
    //   LA_Ll = ((Radio ** 2 / 2.0) * (2 * Pi - ALl)) / 1.0e6 + TALl;
    // } else {
    //   LA_Ll = ((Radio ** 2 / 2.0) * ALl) / 1.0e6 - TALl;
    // }
    // let GA_Hh = Area_Sep - LA_Hh;
    // let GA_Nl = Area_Sep - LA_Nl;
    // let GA_Ll = Area_Sep - LA_Ll;

    //Wreturn console.log(Radio);
  };

  const onEditorValueChange = (productKey, props, value) => {
    let updatedProducts = [...props.value];
    updatedProducts[props.rowIndex][props.field] = value;
    dataTableFuncMap[`${productKey}`](updatedProducts);
  };

  const separatorDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveSeparator}
      />
    </React.Fragment>
  );

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
        />
      </React.Fragment>
    );
  };

  const openNew = () => {
    setSeparator(emptySeparator);
    setSubmitted(false);
    setSeparatorDialog(true);
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
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

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...separator };
    _product[`${name}`] = val;

    setSeparator(_product);
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
      case "inlet_Nozzle":
        return inputTextEditor(productKey, props, "inlet_Nozzle");
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
      <Toast ref={toast} />
      <div className="card">
        <h5>Separators 1</h5>
        {/* Data Separators Table 1 */}
        <Toolbar className="p-mb-4" left={leftToolbarTemplate}></Toolbar>
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
          <Column
            rowEditor
            headerStyle={{ width: "7rem" }}
            bodyStyle={{ textAlign: "center" }}
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
          <Column
            rowEditor
            headerStyle={{ width: "7rem" }}
            bodyStyle={{ textAlign: "center" }}
          ></Column>
        </DataTable>
        <Button
          label="Calcular"
          value=""
          onClick={() => SeparatorGasAndLiquidAreasCalc(separators)}
        ></Button>
      </div>

      <Dialog
        visible={separatorDialog}
        style={{ width: "450px" }}
        header="New Separator"
        modal
        className="p-fluid"
        footer={separatorDialogFooter}
        onHide={hideDialog}
      >
        <div className="p-field">
          <label htmlFor="separator">Separator Tag</label>
          <InputText
            id="separator"
            value={separator.separator}
            onChange={(e) => onInputChange(e, "separator")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !separator.separator,
            })}
          />
          {submitted && !separator.separator && (
            <small className="p-error">Separator Tag is required.</small>
          )}
        </div>
      </Dialog>
    </div>
  );
};
