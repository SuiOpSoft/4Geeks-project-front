import "primeicons/primeicons.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";
import { Context } from "../../store/context";
import React, { useState, useRef, useContext, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import "./DataReliefValve.css";
import { FileUpload } from "primereact/fileupload";

export const DataReliefValve = () => {
  const toast = useRef(null);
  const { store, actions } = useContext(Context);
  const [emptySeparatorTag, setEmptySeparatorTag] = useState(true);
  const [reliefValveDialog, setReliefValveDialog] = useState(false);
  const [selectedReliefValves, setSelectedReliefValves] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [deleteReliefValvesDialog, setDeleteReliefValvesDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [reliefValves, setReliefValves] = useState();
  const [reliefValve, setReliefValve] = useState(store.input_relief_valve_data);
  const dt = useRef(null);

  let originalRows = {};

  var ENDPOINT = store.endpoint;

  useEffect(() => {
    getDataReliefValve()
  }, []);

  const getDataReliefValve = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },}
      try {fetch(`${ENDPOINT}/api/datareliefvalve`, requestOptions)
      .then(response => response.json())
      .then(data => setReliefValves(data))}
      catch(error){
        throw error;
      }
  }

  const openNew = () => {
    setReliefValve(store.input_relief_valve_data);
    setSubmitted(false);
    setReliefValveDialog(true);
  }

  const hideDialog = () => {
    setSubmitted(false);
    setReliefValveDialog(false);
  }

  const hideDeleteReliefValvesDialog = () => {
    setDeleteReliefValvesDialog(false);
  }

  const saveReliefValve = async() => {
    if (emptySeparatorTag===false)
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tag: reliefValve.separator_tag,
        facility_id: null
      })
    }
    console.log(requestOptions.body)
    const res = await fetch(`${ENDPOINT}/api/separators`, requestOptions)
    const json = await res.json()
    console.log(json)

    setSubmitted(true)
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "ReliefValve Created",
      life: 3000,
    })

    getDataReliefValve()
    setReliefValveDialog(false);
    setReliefValve(store.input_relief_valve_data)
    setEmptySeparatorTag(true)
  
      }catch (error){
        console.log(error)
    
      }
  }

  const onRowEditInit = (event) => {
    originalRows[event.index] = { ...reliefValves[event.index] };
  }

  const onRowEditSave = (event) => {
    originalRows[event.index] = { ...reliefValves[event.index] };
    handleUpdateDataReliefValves(originalRows[event.index])
  }

  const onRowEditCancel = (event) => {
    let row_relief_valves = [...reliefValves];
    row_relief_valves[event.index] = originalRows[event.index];
    delete originalRows[event.index];
    setReliefValves(row_relief_valves);
  }

  const exportCSV = () => {
    dt.current.exportCSV();
  }

  const confirmDeleteSelected = () => {
    setDeleteReliefValvesDialog(true);
  }

  const deleteSelectedReliefValves = () => {
    let _deleteReliefValves = reliefValves.filter((val) => !selectedReliefValves.includes(val))
    setReliefValves(_deleteReliefValves);
    setDeleteReliefValvesDialog(false);
    setSelectedReliefValves(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000
    })
    handleDeleteDataReliefValves()
  }
    
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value)|| '';
    let _input = { ...reliefValve };
    _input[`${name}`] = val;
    setReliefValve(_input);
    
    if (e.target.value.length === 0) { return setEmptySeparatorTag(true) }
    else{ return setEmptySeparatorTag(false)}
  }

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
    )
  }

  const header = (
    <div className="table-header">
      <h5 className="p-m-0">Manage Relief Valve Separators</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  )

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
  )

  const deleteReliefValvesDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text dialog-no"
        onClick={hideDeleteReliefValvesDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text dialog-yes"
        onClick={deleteSelectedReliefValves}
      />
    </React.Fragment>
  )

  const dataTableFuncMap = {
    reliefValves: setReliefValves,
  }

  const onEditorValueChange = (valueKey, props, value) => {
      let updatedValues = [...props.value];
      updatedValues[props.rowIndex][props.field] = value;
      return dataTableFuncMap[`${valueKey}`](updatedValues);
  }

  const inputTextEditor = (valueKey, props, field) => {
    return (
      <InputText
        type="text"   
        value={props.rowData[field]}
        onChange={(e) => onEditorValueChange(valueKey, props, e.target.value)}
        required
        />
    )
  }

  const checkEditor = (valueKey, props) => {
    switch (props.field) {
      case "separator_tag":
        return inputTextEditor(valueKey, props, "separator_tag");
      case "rvtag":
        return inputTextEditor(valueKey, props, "rvtag");
      case "rvsetpressure":
        return inputTextEditor(valueKey, props, "rvsetpressure");
      case "rvorificearea":
        return inputTextEditor(valueKey, props, "rvorificearea");
      default:
        break;
      
    }
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <FileUpload
          mode="basic"
          accept="image/*"
          maxFileSize={1000000}
          label="Import"
          chooseLabel="Import"
          className="p-mr-2 p-d-inline-block"
        />
        <Button
          label="Export"
          icon="pi pi-upload"
          className="export-button"
          onClick={exportCSV}
        />
      </React.Fragment>
    );
  };  

  const handleUpdateDataReliefValves = async datareliefvalve => {
  
    try { 
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({       
          "separator_tag": datareliefvalve.separator_tag,
          "rvtag": datareliefvalve.rvtag,
          "rvsetpressure":datareliefvalve.rvsetpressure, 
          "rvorificearea":datareliefvalve.rvorificearea
        })
      }
      console.log(requestOptions.body)
      const res = await fetch(`${ENDPOINT}/api/datareliefvalve`, requestOptions)
      const json = await res.json()
      console.log(json)
  
    }catch (error){
      console.log(error)
  
    }
  }

  const handleDeleteDataReliefValves = async() => {
  
    try { 
      for (const separator of selectedReliefValves) {
        const requestOptions = {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },        
          body: JSON.stringify({
            "separator_tag": separator.separator_tag     
          })  
        }
        console.log(requestOptions.body)
        const res = await fetch(`${ENDPOINT}/api/datareliefvalve`, requestOptions)
        const json = await res.json()
        console.log(json)
        
      }
      
    }catch (error){
      console.log(error)
  
    }
  }

  return (
    <div className="p-grid p-fluid index">
      <Toast className="index-toast" ref={toast} />
      <div className="card card-color">
        <h5>Relief Valve</h5>
        <Toolbar
          className="p-mb-4"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>
        <DataTable
          ref={dt}
          value={reliefValves}
          selection={selectedReliefValves}
          onSelectionChange={(e) => setSelectedReliefValves(e.value)}
          editMode="row"
          dataKey="id"
          onRowEditInit={onRowEditInit}
          onRowEditSave={onRowEditSave}
          onRowEditCancel={onRowEditCancel}
          globalFilter={globalFilter}
          header={header}
          scrollHeight="55vh"
          frozenWidth="15rem"
          scrollable
          // paginator rows={10}
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
            frozen
          ></Column>
          <Column
            field="separator_tag"
            header="Separator"
            editor={(props) => checkEditor("reliefValves", props)}
            sortable
            frozen
          ></Column>
          <Column
            field="rvtag"
            header="RV Tag"
            editor={(props) => checkEditor("reliefValves", props)}
            sortable
          ></Column>
          <Column
            field="rvsetpressure"
            header="RV Set Pressure (kPa)"
            editor={(props) => checkEditor("reliefValves", props)}
            sortable
          ></Column>
          <Column
            field="rvorificearea"
            header="RV Orifice Area (in&sup2;)"
            editor={(props) => checkEditor("reliefValves", props)}
            sortable
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
          <label htmlFor="separator_tag">Relieve Valve Tag</label>
          <InputText
            id="separator_tag"
            value={reliefValve.separator_tag}
            onChange={(e) => onInputChange(e, "separator_tag")}
            required
            autoFocus
          />
          {emptySeparatorTag===true? 
            <small className="p-error">Relief Valve Tag is required.</small>
          : null}  
          {/* {submitted && !reliefValve.separator_tag && (
            <small className="p-error">Relief Valve Tag is required.</small>
          )}         */}
        </div>
      </Dialog>
      <Dialog
        visible={deleteReliefValvesDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteReliefValvesDialogFooter}
        onHide={hideDeleteReliefValvesDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {reliefValve && (
            <span>
              Are you sure you want to delete the selected Relief Valves?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};
