import "primeicons/primeicons.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";

import React, { useState, useRef, useContext,useEffect } from "react";
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
import { FileUpload } from 'primereact/fileupload';



export const DataLevelControlValves = () => {
  const toast = useRef(null);

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
  const [deleteLevelControlValvesDialog, setDeleteLevelControlValvesDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);

  const [levelControlValves, setLevelControlValves] = useState(store.input_level_control_valve);
  const dt = useRef(null);
  const [deleteLevelControlValveDialog, setDeleteLevelControlValveDialog] = useState(false);
  const [levelControlValve, setLevelControlValve] = useState(emptyLevelControlValve);
  //const [levelControlValveResult, setLevelControlValveResult] = useState(emptyLevelControlValveResult);


  let originalRows = {};

  const dataTableFuncMap = {
    levelControlValves: setLevelControlValves,
  };

    const hideDialog = () => {
      setSubmitted(false);
      setLevelControlValveDialog(false);
    };

    const createId = () => {
      let id = '';
      let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 5; i++) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
    }

    const saveLevelControlValve = () => {
      setSubmitted(true);
      if (levelControlValve.separator.trim()) {
        let _levelControlValve = { ...levelControlValve };
        let _levelControlValves = [...levelControlValves];
  
        _levelControlValve.id = createId();
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
        className="p-button-text dialog-no"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text dialog-yes"
        onClick={saveLevelControlValve}
      />
    </React.Fragment>
  );

  const deleteSelectedLevelControlValves = () => {
    let _products = levelControlValves.filter(val => !selectedLevelControlValves.includes(val));
    setLevelControlValves(_products);
    setDeleteLevelControlValvesDialog(false);
    setSelectedLevelControlValves(null);
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
}

  const confirmDeleteSelected = () => {
    setDeleteLevelControlValvesDialog(true);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="New"
          icon="pi pi-plus"
          className="success-button p-mr-2"
          onClick={openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="delete-button"
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

  const rightToolbarTemplate = () => {
    return (
        <React.Fragment>
            <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" />
            <Button label="Export" icon="pi pi-upload" className="export-button" onClick={exportCSV} />
        </React.Fragment>
    )
}

const exportCSV = () => {
  dt.current.exportCSV();
}

  const header = (
    <div className="table-header">
        <h5 className="p-m-0">Manage Level Control Valves</h5>
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
        </span>
    </div>
);

const deleteLevelControlValve = () => {
  let _products = levelControlValves.filter(val => val.id !== levelControlValve.id);
  setLevelControlValve(_products);
  setDeleteLevelControlValveDialog(false);
  setLevelControlValve(emptyLevelControlValve);
  toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
}

const hideDeleteLevelControlValveDialog = () => {
  setDeleteLevelControlValveDialog(false);
}

const hideDeleteLevelControlValvesDialog = () => {
  setDeleteLevelControlValvesDialog(false);
}

const deleteLevelControlValveDialogFooter = (
  <React.Fragment>
      <Button label="No" icon="pi pi-times" className="p-button-text dialog-no" onClick={hideDeleteLevelControlValveDialog} />
      <Button label="Yes" icon="pi pi-check" className="p-button-text dialog-yes" onClick={deleteLevelControlValve} />
  </React.Fragment>
);
const deleteLevelControlValvesDialogFooter = (
  <React.Fragment>
      <Button label="No" icon="pi pi-times" className="p-button-text dialog-no" onClick={hideDeleteLevelControlValvesDialog} />
      <Button label="Yes" icon="pi pi-check" className="p-button-text dialog-yes" onClick={deleteSelectedLevelControlValves} />
  </React.Fragment>
);

  return (
    <div className="p-grid p-fluid index">     
        <Toast className="index-toast" ref={toast} />
        <div className="card card-color">
          <h5>Level Control Valves</h5>
          <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
          <DataTable
            ref={dt}
            value={levelControlValves}
            selection={selectedLevelControlValves} onSelectionChange={(e) => setSelectedLevelControlValves(e.value)}
            editMode="row"
            dataKey="id"
            onRowEditInit={onRowEditInit}
            onRowEditCancel={onRowEditCancel}
            globalFilter={globalFilter}
            header={header}
            scrollHeight="55vh" 
            frozenWidth="15rem"
            scrollable
             
          >
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} frozen></Column>
            <Column headerStyle={{ width: '15rem' }}
              field="separator"
              header="Separator"
              editor={(props) => checkEditor("levelControlValves", props)}sortable frozen
            ></Column>
            <Column headerStyle={{ width: '20rem' }}
              field="lcv_Tag"
              header="Lcv Tag"
              editor={(props) => checkEditor("levelControlValves", props)}sortable 
            ></Column>
            <Column headerStyle={{ width: '20rem' }}
              field="lcv_Cv"
              header="Lcv Cv (US gpm)"
              editor={(props) => checkEditor("levelControlValves", props)}sortable
            ></Column>
            <Column headerStyle={{ width: '20rem' }}
              field="lcv_Factor_Fl"
              header="LCV Factor FL (constant)"
              editor={(props) => checkEditor("levelControlValves", props)}sortable
            ></Column>
            <Column headerStyle={{ width: '20rem' }}
              field="lcv_Factor_Fp"
              header="LCV Factor FP (constant)"
              editor={(props) => checkEditor("levelControlValves", props)}sortable
            ></Column>
            <Column headerStyle={{ width: '20rem' }}
              field="lcv_Inlet_Pressure"
              header="LCV Inlet Pressure (kpa)"
              editor={(props) => checkEditor("levelControlValves", props)}sortable
            ></Column>
            <Column headerStyle={{ width: '20rem' }}
              field="lcv_Outlet_Pressure"
              header="LCV Outlet Pressure (kpa)"
              editor={(props) => checkEditor("levelControlValves", props)}sortable
            ></Column>
            <Column 
            rowEditor
            headerStyle={{ width: "7rem" }}
            bodyStyle={{ textAlign: "center" }}
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
      <Dialog visible={deleteLevelControlValveDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteLevelControlValveDialogFooter} onHide={hideDeleteLevelControlValveDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {levelControlValve && <span>Are you sure you want to delete <b>{levelControlValve.separator}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteLevelControlValvesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteLevelControlValvesDialogFooter} onHide={hideDeleteLevelControlValvesDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {levelControlValve && <span>Are you sure you want to delete the selected Level Control Valves?</span>}
                </div>
            </Dialog>
    </div>
  );
};
