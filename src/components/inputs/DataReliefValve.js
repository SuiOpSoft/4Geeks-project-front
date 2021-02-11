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
    }
  ];

  let emptyReliefValve = {
      separator: "equipo",
      RV_set_pressure_value: "-",
      RV_set_pressure_reference: "-",
      RV_Orifice_Area_value: "-",
  };

    let emptyReliefValveResult = {
      separator: "Equipo",
      Relief_Valve_Capacity: "-",
      Relief_Valve_Capacity_Status: "-"
    };

  const [reliefValves, setReliefValves] = useState(dataReliefValves);
  const { store, actions } = useContext(Context);
  const [productDialog, setProductDialog] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);

  const [reliefValve, setReliefValve] = useState(emptyReliefValve);
  const [reliefValveResult, setReliefValveResult] = useState(emptyReliefValveResult);
  const toast = useRef(null);

  let originalRows = {};

  const dataTableFuncMap = {
    reliefValves: setReliefValves
  };

  /*useEffect(() => {
        fetchProductData('reliefValves');
    }, []); // eslint-disable-line react-hooks/exhaustive-deps*/

    const hideDialog = () => {
      setSubmitted(false);
      setProductDialog(false);
    };
  
    const saveReliefValve = () => {
      setSubmitted(true);
  
      let _reliefValve = { ...reliefValve };
      let _reliefValves = [...reliefValves];
  
      //_separator.separator = createId();
      _reliefValves.push(_reliefValve);
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "ReliefValve Created",
        life: 3000,
      });
      setReliefValves(_reliefValves);
      setProductDialog(false);
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

  const productDialogFooter = (
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
        onClick={saveReliefValve}
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
    setReliefValve(emptyReliefValve);
    setSubmitted(false);
    setProductDialog(true);
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
    let _product = { ...reliefValve };
    _product[`${name}`] = val;

    setReliefValve(_product);
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
        <Toolbar className="p-mb-4" left={leftToolbarTemplate}></Toolbar>
        <DataTable
          value={reliefValves}
          editMode="row"
          dataKey="id"
          onRowEditInit={onRowEditInit}
          onRowEditCancel={onRowEditCancel}
        >
          <Column
            field="separator"
            header="ReliefValve"
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
            header="RV Orifice Area (in&sup2;)"
            editor={(props) => checkEditor("reliefValves", props)}
          ></Column>
          <Column
            rowEditor
            headerStyle={{ width: "7rem" }}
            bodyStyle={{ textAlign: "center" }}
          ></Column>
        </DataTable>
      </div>
      <Dialog
        visible={productDialog}
        style={{ width: "450px" }}
        header="New Relief Valve"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        <div className="p-field">
          <label htmlFor="separator">Separator Tag</label>
          <InputText
            id="reliefValve"
            value={reliefValves.reliefValve}
            onChange={(e) => onInputChange(e, "reliefValve")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !reliefValve.reliefValve,
            })}
          />
          {submitted && !reliefValve.reliefValve && (
            <small className="p-error">Relief Valve Tag is required.</small>
          )}
        </div>
      </Dialog>
    </div>
    </div>

  );
};
