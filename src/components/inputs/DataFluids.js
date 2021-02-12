import "primeicons/primeicons.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";
import React, { useState,  useContext, useRef } from "react";
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

export const DataFluids = () => {
  const toast = useRef(null);
  let dataFluids = [
    {
      //   1
      separator: "equipo1",
      operating_Pressure: "-",
      operating_Temperature: "-",
      oil_Density: "-",
      gas_Density: "-",
      mixture_Density: "-",
      water_Density: "-",
      feed_BSW: "-",
      liquid_Viscosity: "-",
      gas_Viscosity: "-",
      gas_Mw: "-",
      liq_MW: "-",
      gas_Compressor: "-",
      specific_Heat_Ratio: "-",
      liquid_Surface_Tension: "-",
      liquid_Vapor_Pressure: "-",
      liquid_Critical_Pressure: "-",
      standard_Gas_flow: "-",
      standard_Liquid_Flow: "-",
      actual_Gas_Flow: "-",
      actual_Liquid_Flow: "-",
    },
  ];

  let emptyFluid = {
    separator: "",
      operating_Pressure: "-",
      operating_Temperature: "-",
      oil_Density: "-",
      gas_Density: "-",
      mixture_Density: "-",
      water_Density: "-",
      feed_BSW: "-",
      liquid_Viscosity: "-",
      gas_Viscosity: "-",
      gas_Mw: "-",
      liq_MW: "-",
      gas_Compressor: "-",
      specific_Heat_Ratio: "-",
      liquid_Surface_Tension: "-",
      liquid_Vapor_Pressure: "-",
      liquid_Critical_Pressure: "-",
      standard_Gas_flow: "-",
      standard_Liquid_Flow: "-",
      actual_Gas_Flow: "-",
      actual_Liquid_Flow: "-"
  }

  const { store, actions } = useContext(Context);
  const [fluidDialog, setFluidDialog] = useState(false);
  const [selectedFluids, setSelectedFluids] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [deleteFluidsDialog, setDeleteFluidsDialog] = useState(false);
  
  const [fluids, setFluids] = useState(dataFluids);
  const [fluid, setFluid] = useState(emptyFluid);
  //const [fluidResult, setFluidResult] = useState(emptyFluidResult);
  
  let originalRows = {};

  const dataTableFuncMap = {
    fluids: setFluids,
  };

  /*useEffect(() => {
        fetchProductData('products1');
        fetchProductData('products2');
        fetchProductData('products3');
    }, []); // eslint-disable-line react-hooks/exhaustive-deps*/

    const hideDialog = () => {
      setSubmitted(false);
      setFluidDialog(false);
    };

    const saveFluid = () => {
      setSubmitted(true);
      if (fluid.separator.trim()) {
        let _fluid = { ...fluid };
        let _fluids = [...fluids];
  
        _fluids.push(_fluid);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Separator Created",
          life: 3000,
        });
        setFluids(_fluids);
        setFluidDialog(false);
        setFluid(emptyFluid);
      }
    };

  const onRowEditInit = (event) => {
    originalRows[event.index] = { ...fluids[event.index] };
  };

  const onRowEditCancel = (event) => {
    let products = [...fluids];
    products[event.index] = originalRows[event.index];
    delete originalRows[event.index];

    setFluids(products);
  };

  const onEditorValueChange = (productKey, props, value) => {
    let updatedProducts = [...props.value];
    updatedProducts[props.rowIndex][props.field] = value;
    dataTableFuncMap[`${productKey}`](updatedProducts);
  };

  const fluidDialogFooter = (
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
        onClick={saveFluid}
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
          disabled={!selectedFluids || !selectedFluids.length}
        />
      </React.Fragment>
    );
  };

  const openNew = () => {
    setFluid(emptyFluid);
    setSubmitted(false);
    setFluidDialog(true);
  };

  const confirmDeleteSelected = () => {
    setDeleteFluidsDialog(true);
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
    let _product = { ...fluid };
    _product[`${name}`] = val;

    setFluid(_product);
  };

  const checkEditor = (productKey, props) => {
    switch (props.field) {
      case "separator":
        return inputTextEditor(productKey, props, "separator");
      case "operating_Pressure":
        return inputTextEditor(productKey, props, "operating_Pressure");
      case "operating_Temperature":
        return inputTextEditor(productKey, props, "operating_Temperature");
      case "oil_Density":
        return inputTextEditor(productKey, props, "oil_Density");
      case "gas_Density":
        return inputTextEditor(productKey, props, "gas_Density");
      case "mixture_Density":
        return inputTextEditor(productKey, props, "mixture_Density");
      case "water_Density":
        return inputTextEditor(productKey, props, "water_Density");
      case "feed_BSW":
        return inputTextEditor(productKey, props, "feed_BSW");
      case "liquid_Viscosity":
        return inputTextEditor(productKey, props, "liquid_Viscosity");
      case "gas_Viscosity":
        return inputTextEditor(productKey, props, "gas_Viscosity");
      case "gas_Mw":
        return inputTextEditor(productKey, props, "gas_Mw");
      case "liq_MW":
        return inputTextEditor(productKey, props, "liq_MW");
      case "gas_Compressor":
        return inputTextEditor(productKey, props, "gas_Compressor");
      case "specific_Heat_Ratio":
        return inputTextEditor(productKey, props, "specific_Heat_Ratio");
      case "liquid_Surface_Tension":
        return inputTextEditor(productKey, props, "liquid_Surface_Tension");
      case "liquid_Vapor_Pressure":
        return inputTextEditor(productKey, props, "liquid_Vapor_Pressure");
      case "liquid_Critical_Pressure":
        return inputTextEditor(productKey, props, "liquid_Critical_Pressure");
      case "standard_Gas_flow":
        return inputTextEditor(productKey, props, "standard_Gas_flow");
      case "standard_Liquid_Flow":
        return inputTextEditor(productKey, props, "standard_Liquid_Flow");
      case "actual_Gas_Flow":
        return inputTextEditor(productKey, props, "actual_Gas_Flow");
      case "actual_Liquid_Flow":
        return inputTextEditor(productKey, props, "actual_Liquid_Flow");
      default:
        break;
    }
  };

  return (
    <div className="p-grid p-fluid">
      <Toast ref={toast} />
      <div className="card">
        <h5>Fluids</h5>
        <Toolbar className="p-mb-4" left={leftToolbarTemplate}></Toolbar>
        <DataTable
          value={fluids}
          editMode="row"
          dataKey="id"
          onRowEditInit={onRowEditInit}
          onRowEditCancel={onRowEditCancel}
        >
          <Column
            field="separator"
            header="Separators"
            editor={(props) => checkEditor("fluids", props)}
          ></Column>
          <Column
            field="operating_Pressure"
            header="Operating Pressure (kPa)"
            editor={(props) => checkEditor("fluids", props)}
          ></Column>
          <Column
            field="operating_Temperature"
            header="Operating Temperature (oC)"
            editor={(props) => checkEditor("fluids", props)}
          ></Column>
          <Column
            field="oil_Density"
            header="Oil Density (kg/m&sup3;)"
            editor={(props) => checkEditor("fluids", props)}
          ></Column>
          <Column
            field="gas_Density"
            header="Gas Density (kg/m&sup3;)"
            editor={(props) => checkEditor("fluids", props)}
          ></Column>
          <Column
            field="mixture_Density"
            header="Mixture Density (kg/m&sup3;)"
            editor={(props) => checkEditor("fluids", props)}
          ></Column>
          <Column
            field="water_Density"
            header="Water Density (kg/m&sup3;)"
            editor={(props) => checkEditor("fluids", props)}
          ></Column>
          <Column
            field="feed_BSW"
            header="Feed BSW (%v/v)"
            editor={(props) => checkEditor("fluids", props)}
          ></Column>
          <Column
            field="liquid_Viscosity"
            header="Liquid Viscosity (cP)"
            editor={(props) => checkEditor("fluids", props)}
          ></Column>
          <Column
            field="gas_Viscosity"
            header="Gas viscosity (oC)"
            editor={(props) => checkEditor("fluids", props)}
          ></Column>
          <Column
            field="gas_Mw"
            header="Gas Mw (kg/kmol)"
            editor={(props) => checkEditor("fluids", props)}
          ></Column>
          <Column
            field="liq_MW"
            header="Liq MW (kg/kmol)"
            editor={(props) => checkEditor("fluids", props)}
          ></Column>
          <Column
            field="gas_Compressor"
            header="Gas Compressor (Z)"
            editor={(props) => checkEditor("fluids", props)}
          ></Column>
          <Column
            field="specific_Heat_Ratio"
            header="Specific Heat Ratio"
            editor={(props) => checkEditor("fluids", props)}
          ></Column>
          <Column
            field="liquid_Surface_Tension"
            header="Liquid Surface Tension (dyne/cm)"
            editor={(props) => checkEditor("fluids", props)}
          ></Column>
          <Column
            field="liquid_Vapor_Pressure"
            header="Liquid Vapor Pressure (kPa)"
            editor={(props) => checkEditor("fluids", props)}
          ></Column>
          <Column
            field="liquid_Critical_Pressure"
            header="Liquid Critical Pressure (kPa)"
            editor={(props) => checkEditor("fluids", props)}
          ></Column>
          <Column
            field="standard_Gas_flow"
            header="Standard Gas Flow (S m&sup3;/h)"
            editor={(props) => checkEditor("fluids", props)}
          ></Column>
          <Column
            field="standard_Liquid_Flow"
            header="Standard Liquid Flow (S m&sup3;/h)"
            editor={(props) => checkEditor("fluids", props)}
          ></Column>
          <Column
            field="actual_Gas_Flow"
            header="Actual Gas Flow (m&sup3;/h)"
            editor={(props) => checkEditor("fluids", props)}
          ></Column>
          <Column
            field="actual_Liquid_Flow"
            header="Actual Liquid Flow (m&sup3;/h)"
            editor={(props) => checkEditor("fluids", props)}
          ></Column>
          <Column
            rowEditor
            headerStyle={{ width: "7rem" }}
            bodyStyle={{ textAlign: "center" }}
          ></Column>
        </DataTable>
      </div>
      <Dialog
        visible={fluidDialog}
        style={{ width: "450px" }}
        header="New Data Fluids"
        modal
        className="p-fluid"
        footer={fluidDialogFooter}
        onHide={hideDialog}
      >
        <div className="p-field">
          <label htmlFor="separator">Data Fluids Tag</label>
          <InputText
            id="separator"
            value={fluid.separator}
            onChange={(e) => onInputChange(e, "separator")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !fluid.separator,
            })}
          />
          {submitted && !fluid.separator && (
            <small className="p-error">Separator Tag is required.</small>
          )}
        </div>
      </Dialog>
    </div>
  );
};
