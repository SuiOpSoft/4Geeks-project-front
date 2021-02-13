import "primeicons/primeicons.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";
import {Context} from "../../store/context"
import React, { useState, useRef, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import classNames from "classnames";
import "./DataReliefValve.css";
import { FileUpload } from 'primereact/fileupload';

export const DataReliefValve = () => {
  const toast = useRef(null);
  // let dataReliefValves = [
  //   {
  //     separator: "equipo1",
  //     RV_set_pressure_value: "-",
  //     RV_set_pressure_reference: "-",
  //     RV_Orifice_Area_value: "-",
  //   },
  //   {
  //     separator: "equipo2",
  //     RV_set_pressure_value: "-",
  //     RV_set_pressure_reference: "-",
  //     RV_Orifice_Area_value: "-",
  //   }
  // ];

  let emptyReliefValve = {
      separator: "",
      RV_set_pressure_value: "-",
      RV_set_pressure_reference: "-",
      RV_Orifice_Area_value: "-",
  };

    let emptyReliefValveResult = {
      separator: "Equipo",
      Relief_Valve_Capacity: "-",
      Relief_Valve_Capacity_Status: "-"
    };
  
  const { store, actions } = useContext(Context);
  const [reliefValveDialog, setReliefValveDialog] = useState(false);
  const [selectedReliefValves, setSelectedReliefValves] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [deleteReliefValvesDialog, setDeleteReliefValvesDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);

  const [reliefValves, setReliefValves] = useState(store.input_relief_valve_data);
  const [reliefValve, setReliefValve] = useState(emptyReliefValve);
  const [reliefValveResult, setReliefValveResult] = useState(emptyReliefValveResult);
  const [deleteReliefValveDialog, setDeleteReliefValveDialog] = useState(false);
  const dt = useRef(null);

  let originalRows = {};

  const dataTableFuncMap = {
    reliefValves: setReliefValves
  };

  /*useEffect(() => {
        fetchProductData('reliefValves');
    }, []); // eslint-disable-line react-hooks/exhaustive-deps*/

    const hideDialog = () => {
      setSubmitted(false);
      setReliefValveDialog(false);
    };

    const createId = () => {
      let id = '';
      let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 5; i++) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
    }
  
    const saveReliefValve = () => {
      setSubmitted(true);
      if (reliefValve.separator.trim()) {
      let _reliefValve = { ...reliefValve };
      let _reliefValves = [...reliefValves];

      _reliefValve.id = createId();
      _reliefValves.push(_reliefValve);
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "ReliefValve Created",
        life: 3000,
      });
      setReliefValves(_reliefValves);
      setReliefValveDialog(false);
      setReliefValve(emptyReliefValve);
      }
    };

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

  const reliefValveDialogFooter = (
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
        onClick={saveReliefValve}
      />
    </React.Fragment>
  );

  const deleteSelectedReliefValves = () => {
    let _products = reliefValves.filter(val => !selectedReliefValves.includes(val));
    setReliefValves(_products);
    setDeleteReliefValvesDialog(false);
    setSelectedReliefValves(null);
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
}

  const confirmDeleteSelected = () => {
    setDeleteReliefValvesDialog(true);
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
          disabled={!selectedReliefValves || !selectedReliefValves.length}
        />
      </React.Fragment>
    );
  };

  const openNew = () => {
    setReliefValve(emptyReliefValve);
    setSubmitted(false);
    setReliefValveDialog(true);
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
    let _product = { ...reliefValve };
    _product[`${name}`] = val;

    setReliefValve(_product);
  };

  const checkEditor = (productKey, props) => {
    switch (props.field) {
      case "name":
        return inputTextEditor(productKey, props, "name");
      case "RV_Tag":
        return inputTextEditor(productKey, props, "RV_Tag");
      case "RV_set_pressure":
        return inputTextEditor(productKey, props, "RV_set_pressure");
      case "RV_Orifice_Area_value":
        return inputTextEditor(productKey, props, "RV_Orifice_Area_value");
      default:
        break;
    }
  };

  const rightToolbarTemplate = () => {
    return (
        <React.Fragment>
            <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" />
            <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
        </React.Fragment>
    )
}

const exportCSV = () => {
  dt.current.exportCSV();
}

  const header = (
    <div className="table-header">
        <h5 className="p-m-0">Manage Separators</h5>
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
        </span>
    </div>
);

const deleteReliefValve = () => {
  let _products = reliefValves.filter(val => val.id !== reliefValve.id);
  setReliefValve(_products);
  setDeleteReliefValveDialog(false);
  setReliefValve(emptyReliefValve);
  toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
}

const hideDeleteReliefValveDialog = () => {
  setDeleteReliefValveDialog(false);
}

const hideDeleteReliefValvesDialog = () => {
  setDeleteReliefValvesDialog(false);
}

const deleteReliefValveDialogFooter = (
  <React.Fragment>
      <Button label="No" icon="pi pi-times" className="p-button-text dialog-no" onClick={hideDeleteReliefValveDialog} />
      <Button label="Yes" icon="pi pi-check" className="p-button-text dialog-yes" onClick={deleteReliefValve} />
  </React.Fragment>
);
const deleteReliefValvesDialogFooter = (
  <React.Fragment>
      <Button label="No" icon="pi pi-times" className="p-button-text dialog-no" onClick={hideDeleteReliefValvesDialog} />
      <Button label="Yes" icon="pi pi-check" className="p-button-text dialog-yes" onClick={deleteSelectedReliefValves} />
  </React.Fragment>
);

  return (
    <div className="p-grid p-fluid">         
      <Toast ref={toast} />
      <div className="card">
        <h5>Valve Relief</h5>
        <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
        <DataTable
          ref={dt}
          value={reliefValves}
          selection={selectedReliefValves} onSelectionChange={(e) => setSelectedReliefValves(e.value)}
          editMode="row"
          dataKey="id"
          onRowEditInit={onRowEditInit}
          onRowEditCancel={onRowEditCancel}
          globalFilter={globalFilter}
          header={header}
        >
          <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
          <Column
            field="separator"
            header="ReliefValve"
            editor={(props) => checkEditor("reliefValves", props)}sortable
          ></Column>
          <Column
            field="RV_Tag"
            header="RV Tag"
            editor={(props) => checkEditor("reliefValves", props)}sortable
          ></Column>
          <Column
            field="RV_set_pressure"
            header="RV Set Pressure (kPa)"
            editor={(props) => checkEditor("reliefValves", props)}sortable
          ></Column>
          <Column
            field="RV_Orifice_Area_value"
            header="RV Orifice Area (in&sup2;)"
            editor={(props) => checkEditor("reliefValves", props)}sortable
          ></Column>
          <Column
            rowEditor
            headerStyle={{ width: "7rem" }}
            bodyStyle={{ textAlign: "center" }}
          ></Column>
        </DataTable>
      </div>
      <Dialog
        visible={reliefValveDialog}
        style={{ width: "450px" }}
        header="New Relief Valve"
        modal
        className="p-fluid"
        footer={reliefValveDialogFooter}
        onHide={hideDialog}
      >
        <div className="p-field">
          <label htmlFor="separator">Relieve Valve Tag</label>
          <InputText
            id="reliefValve"
            value={reliefValves.separator}
            onChange={(e) => onInputChange(e, "separator")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !reliefValve.separator,
            })}
          />
          {submitted && !reliefValve.separator && (
            <small className="p-error">Relief Valve Tag is required.</small>
          )}
        </div>
      </Dialog>
      <Dialog visible={deleteReliefValveDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteReliefValveDialogFooter} onHide={hideDeleteReliefValveDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {reliefValve && <span>Are you sure you want to delete <b>{reliefValve.separator}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteReliefValvesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteReliefValvesDialogFooter} onHide={hideDeleteReliefValvesDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {reliefValve && <span>Are you sure you want to delete the selected Relief Valves?</span>}
                </div>
            </Dialog>
    </div>
  );
};
