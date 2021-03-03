import "primeicons/primeicons.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";
import React, { useState, useContext, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import "./DataReliefValve.css";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Context } from "../../store/context";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { FileUpload } from 'primereact/fileupload';

export const DataSeparators = () => {
  const toast = useRef(null)
  const [emptySeparatorTag, setEmptySeparatorTag] = useState(true)
  const { store, actions } = useContext(Context);
  const [separatorDialog, setSeparatorDialog] = useState(false);
  const [selectedSeparators, setSelectedSeparators] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [deleteSeparatorsDialog, setDeleteSeparatorsDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [separators, setSeparators] = useState();
  const [separator, setSeparator] = useState(store.input_separators_data); 
  const dt = useRef(null);

  let originalRows = {};

  const dataTableFuncMap = {
    separators: setSeparators,
  }

  var ENDPOINT = 'https://3001-azure-porcupine-wlupimh7.ws-eu03.gitpod.io'

  useEffect(() => {
    getDataSeparator()
  }, [])

  const getDataSeparator = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },}
      try {fetch(`${ENDPOINT}/api/dataseparators`, requestOptions)
      .then(response => response.json())
      .then(data => setSeparators(data))}
      catch(error){
        throw error;
      }
  }

  const openNew = () => {
    setSeparator(store.input_separators_data);
    setSubmitted(false);
    setSeparatorDialog(true);
  }

  const hideDialog = () => {
    setSubmitted(false);
    setSeparatorDialog(false);
  }

  const hideDeleteSeparatorsDialog = () => {
    setDeleteSeparatorsDialog(false);
  }

  const saveSeparator = async() => {

    if (emptySeparatorTag===false)
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tag: separator.separator_tag,
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

      getDataSeparator();
      setSeparatorDialog(false);
      setSeparator(store.input_separators_data);
  
      }catch (error){
        console.log(error)
    
      }       
    
}

  const onRowEditInit = (event) => {
    originalRows[event.index] = { ...separators[event.index] };
  }

  const onRowEditSave = (event) => {
    originalRows[event.index] = { ...separators[event.index] };
    handleUpdateDataSeparators(originalRows[event.index])
  }

  const onRowEditCancel = (event) => {
    let row_separators = [...separators];
    row_separators[event.index] = originalRows[event.index];
    delete originalRows[event.index];
    setSeparators(row_separators);
  }

  const exportCSV = () => {
    dt.current.exportCSV();
  }

  const confirmDeleteSelected = () => {
    setDeleteSeparatorsDialog(true);
  }

  const deleteSelectedSeparators = () => {
    let _deleteSeparators = separators.filter(val => !selectedSeparators.includes(val))
    setSeparators(_deleteSeparators);
    setDeleteSeparatorsDialog(false);
    setSelectedSeparators(null);
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'Separators Deleted',
      life: 3000
    })
    handleDeleteDataSeparators()
}

const onInputChange = (e, name) => {
  const val = (e.target && e.target.value) || "";
  let _input = { ...separator };
  _input[`${name}`] = val;
  setSeparator(_input);

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
          disabled={!selectedSeparators || !selectedSeparators.length}
        />
      </React.Fragment>
    )
  }

  const header = (
    <div className="table-header">
        <h5 className="p-m-0">Manage Separators</h5>
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..." />
        </span>
    </div>
  )
  
  const separatorDialogFooter = (
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
        onClick={saveSeparator}
      />
    </React.Fragment>
  )

  const deleteSeparatorsDialogFooter = (
    <React.Fragment>
        <Button label="No" icon="pi pi-times" className="p-button-text dialog-no" onClick={hideDeleteSeparatorsDialog} />
        <Button label="Yes" icon="pi pi-check" className="p-button-text dialog-yes" onClick={deleteSelectedSeparators} />
    </React.Fragment>
  )

  const onEditorValueChange = (valueKey, props, value) => {
    let updatedValues = [...props.value];
    updatedValues[props.rowIndex][props.field] = value;
    dataTableFuncMap[`${valueKey}`](updatedValues);
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
      case "internaldiameter":
        return inputTextEditor(valueKey, props, "internaldiameter");
      case "ttlength":
        return inputTextEditor(valueKey, props, "ttlength");
      case "highleveltrip":
        return inputTextEditor(valueKey, props, "highleveltrip");
      case "highlevelalarm":
        return inputTextEditor(valueKey, props, "highlevelalarm");
      case "normalliquidlevel":
        return inputTextEditor(valueKey, props, "normalliquidlevel");
      case "lowlevelalarm":
        return inputTextEditor(valueKey, props, "lowlevelalarm");
      case "inletnozzle":
        return inputTextEditor(valueKey, props, "inletnozzle");
      case "gasoutletnozzle":
        return inputTextEditor(valueKey, props, "gasoutletnozzle");
      case "liquidoutletnozzle":
        return inputTextEditor(valueKey, props, "liquidoutletnozzle");
      case "inletdevicetype":
        return inputTextEditor(valueKey, props, "inletdevicetype");
      case "demistertype":
        return inputTextEditor(valueKey, props, "demistertype");
      default:
        break;
    }
  }

  const rightToolbarTemplate = () => {
    return (
        <React.Fragment>
            <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" />
            <Button label="Export" icon="pi pi-upload" className="export-button" onClick={exportCSV} />
        </React.Fragment>
    )
  }
  
  const handleUpdateDataSeparators = async dataseparator => {
  
    try {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "separator_tag": dataseparator.separator_tag,
          "internaldiameter" : dataseparator.internaldiameter,
          "ttlength" : dataseparator.ttlength,
          "highleveltrip" : dataseparator.highleveltrip,
          "highlevelalarm" : dataseparator.highlevelalarm,
          "normalliquidlevel" : dataseparator.normalliquidlevel,
          "lowlevelalarm" : dataseparator.lowlevelalarm,
          "inletnozzle" : dataseparator.inletnozzle,
          "gasoutletnozzle" : dataseparator.gasoutletnozzle,
          "liquidoutletnozzle" : dataseparator.liquidoutletnozzle,
          "inletdevicetype" : dataseparator.inletdevicetype,
          "demistertype" : dataseparator.demistertype       
        })
      }
      console.log(requestOptions.body)
      const res = await fetch(`${ENDPOINT}/api/dataseparators`, requestOptions)
      const json = await res.json()
      console.log(json)
      
    }catch (error){
      console.log(error)
    }
  }

  const handleDeleteDataSeparators = async() => {
  
    try { 
      for (const separator of selectedSeparators) {
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
        const res = await fetch(`${ENDPOINT}/api/dataseparators`, requestOptions)
        const json = await res.json()
        console.log(json)
        
      };
        
    }catch (error){
      console.log(error)
  
    }
  }

  const SeparatorGasAndLiquidAreasCalc = async() => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }
      const res = await fetch('https://3001-teal-cougar-26i4nl9q.ws-eu03.gitpod.io/api/gasandliquidareascalc', requestOptions)
      const json = await res.json()
      console.log(json)
  
    }catch (error){
      console.log(error)
  
    }
    
  }

  return (
    <div className="p-grid p-fluid index">
      <Toast className="index-toast" ref={toast} />
      <div className="card card-color">
        <h5>Separators</h5>
        <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
        <DataTable 
          ref={dt}
          value={separators}
          selection={selectedSeparators} onSelectionChange={(e) => setSelectedSeparators(e.value)}
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
        >
          <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} frozen></Column>
          <Column headerStyle={{ width: '15rem' }}
            field="separator_tag"
            header="Separator"
            editor={(props) => checkEditor("separators", props)} sortable frozen
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="internaldiameter"
            header="Internal Diameter (mm)"
            editor={(props) => checkEditor("separators", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="ttlength"
            header="T-T Length (mm)"
            editor={(props) => checkEditor("separators", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="highleveltrip"
            header="High Level trip (mm)"
            editor={(props) => checkEditor("separators", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="highlevelalarm"
            header="High Level Alarm (mm)"
            editor={(props) => checkEditor("separators", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="normalliquidlevel"
            header="Normal Liquid Level (mm)"
            editor={(props) => checkEditor("separators", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="lowlevelalarm"
            header="Low Level Alarm (mm)"
            editor={(props) => checkEditor("separators", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="inletnozzle"
            header="Inlet Nozzle (mm)"
            editor={(props) => checkEditor("separators", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="gasoutletnozzle"
            header="gas Outlet Nozzle (mm)"
            editor={(props) => checkEditor("separators", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="liquidoutletnozzle"
            header="Liquid Outlet Nozzle (mm)"
            editor={(props) => checkEditor("separators", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="inletdevicetype"
            header="Inlet Device Tupe (NID, HOP or SP)"
            editor={(props) => checkEditor("separators", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="demistertype"
            header="Demister Type (KO, VD, HD or HVD)"
            editor={(props) => checkEditor("separators", props)} sortable
          ></Column>
          <Column
            rowEditor
            headerStyle={{ width: "7rem" }}
            bodyStyle={{ textAlign: "center" }}
          ></Column>        
        </DataTable>
        <Button
        className="mt-4 p-button-help"
          label="Calcular"
          value=""
          onClick={() => SeparatorGasAndLiquidAreasCalc()}
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
          <label htmlFor="separator_tag">Separator Tag</label>
          <InputText
            id="separator_tag"
            value={separator.separator_tag}
            onChange={(e) => onInputChange(e, "separator_tag")}
            required
            autoFocus
          />
          {emptySeparatorTag===true? 
            <small className="p-error">Relief Valve Tag is required.</small>
          : null}  
          {/* {submitted && !separator.separator_tag && (
            <small className="p-error">Separator Tag is required.</small>
          )} */}
        </div>
      </Dialog>
            <Dialog visible={deleteSeparatorsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteSeparatorsDialogFooter} onHide={hideDeleteSeparatorsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {separator && <span>Are you sure you want to delete the selected separators?</span>}
                </div>
            </Dialog>
    </div>
  );
};
