import "primeicons/primeicons.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";

import React, { useState, useRef, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import "./DataReliefValve.css";
import classNames from "classnames";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Context } from "../../store/context";
import { Dialog } from "primereact/dialog";


export const DataLevelControlValves = () => {
  const toast = useRef(null);
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

  let emptyLevelControlValve = {
    separator: "",
      lcv_Tag: "-",
      lcv_Cv: "-",
      lcv_Diameter: "-",
      inlet_Lcv_Piping_Diameter: "-",
      outlet_Lcv_Piping_Diameter: "-",
      lcv_Factor_Fl: "-",
      lcv_Factor_Fi: "-",
      lcv_Factor_Fp: "-",
      lcv_Inlet_Pressure: "-",
      lcv_Outlet_Pressure: "-"
  }

  
  const { store, actions } = useContext(Context);
  const [levelControlValveDialog, setLevelControlValveDialog] = useState(false);
  const [selectedLevelControlValves, setSelectedLevelControlValves] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [deletelevelControlValvesDialog, setDeleteLevelControlValvesDialog] = useState(false);

  const [levelControlValves, setLevelControlValves] = useState(
    dataLevelControlValves
  );
  const [levelControlValve, setLevelControlValve] = useState(emptyLevelControlValve);
  //const [levelControlValveResult, setLevelControlValveResult] = useState(emptyLevelControlValveResult);



  let originalRows = {};

  const dataTableFuncMap = {
    levelControlValves: setLevelControlValves,
  };

  /*useEffect(() => {
        fetchProductData('levelControlValves');
    }, []); // eslint-disable-line react-hooks/exhaustive-deps*/

    const hideDialog = () => {
      setSubmitted(false);
      setLevelControlValveDialog(false);
    };

    const saveLevelControlValve = () => {
      setSubmitted(true);
      if (levelControlValve.separator.trim()) {
        let _levelControlValve = { ...levelControlValve };
        let _levelControlValves = [...levelControlValves];
  
        //_separator.separator = createId();
        _levelControlValves.push(_levelControlValve);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Separator Created",
          life: 3000,
        });
        setLevelControlValves(_levelControlValves);
        setLevelControlValveDialog(false);
        setLevelControlValve(emptyLevelControlValve);
      }
    };

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

  const levelControlValveDialogFooter = (
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
        onClick={saveLevelControlValve}
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
          disabled={!selectedLevelControlValves || !selectedLevelControlValves.length}
        />
      </React.Fragment>
    );
  };

  const openNew = () => {
    setLevelControlValve(emptyLevelControlValve);
    setSubmitted(false);
    setLevelControlValveDialog(true);
  };

  const confirmDeleteSelected = () => {
    setDeleteLevelControlValvesDialog(true);
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
    let _product = { ...levelControlValve };
    _product[`${name}`] = val;

    setLevelControlValve(_product);
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
        <Toast ref={toast} />
        <div className="card">
          <h5>Level Control Valves</h5>
          <Toolbar className="p-mb-4" left={leftToolbarTemplate}></Toolbar>
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
      <Dialog
        visible={levelControlValveDialog}
        style={{ width: "450px" }}
        header="New Level Control Valve"
        modal
        className="p-fluid"
        footer={levelControlValveDialogFooter}
        onHide={hideDialog}
      >
        <div className="p-field">
          <label htmlFor="separator">Level Contro lValve Tag</label>
          <InputText
            id="separator"
            value={levelControlValve.separator}
            onChange={(e) => onInputChange(e, "separator")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !levelControlValve.separator,
            })}
          />
          {submitted && !levelControlValve.separator && (
            <small className="p-error">Level Contro lValve Tag is required.</small>
          )}
        </div>
      </Dialog>
    </div>
  );
};
