import "primeicons/primeicons.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";
import { Context } from "../../store/context";
import React, { useState, useRef, useEffect, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import "./DataReliefValve.css";
import classNames from "classnames";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { FileUpload } from 'primereact/fileupload';



export const DataLevelControlValves = () => {
  const toast = useRef(null);
  const { store, actions } = useContext(Context);
  const [emptySeparatorTag, setEmptySeparatorTag] = useState(true);
  const [levelControlValveDialog, setLevelControlValveDialog] = useState(false);
  const [selectedLevelControlValves, setSelectedLevelControlValves] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [deleteLevelControlValvesDialog, setDeleteLevelControlValvesDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [levelControlValves, setLevelControlValves] = useState();
  const [levelControlValve, setLevelControlValve] = useState(store.input_level_control_valve);
  const dt = useRef(null);

  let originalRows = {};

  var ENDPOINT = store.endpoint;

  useEffect(() => {
    getDataLevelControlValve()
  }, []);

    const getDataLevelControlValve = () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },}
        try {fetch(`${ENDPOINT}/api/datalevelcontrolvalve`, requestOptions)
        .then(response => response.json())
        .then(data => setLevelControlValves(data))}
        catch(error){
          throw error;
      }     
  }
  
  const openNew = () => {
    setLevelControlValve(store.input_level_control_valve)
    setSubmitted(false);
    setLevelControlValveDialog(true);
  }

  const hideDialog = () => {
    setSubmitted(false);
    setLevelControlValveDialog(false);
  }

  const hideDeleteLevelControlValvesDialog = () => {
    setDeleteLevelControlValvesDialog(false);
  }

  const saveLevelControlValve = async () => {
    if (emptySeparatorTag===false)
    try { 
      const requestOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({       
          tag: levelControlValve.separator_tag,
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
          detail: "Separator Created",
          life: 3000,
        });
      
      getDataLevelControlValve()
      setLevelControlValve(store.input_level_control_valve)
      setLevelControlValveDialog(false)
      setEmptySeparatorTag(true)
  
    }catch (error){
      console.log(error)
    }     
  }

  const onRowEditInit = (event) => {
    originalRows[event.index] = { ...levelControlValves[event.index] };
  }

  const onRowEditSave = (event) => {
    originalRows[event.index] = { ...levelControlValves[event.index] };
    handleUpdateDataLevelControlValves(originalRows[event.index])
  }

  const onRowEditCancel = (event) => {
    let row_levelControlValves = [...levelControlValves];
    row_levelControlValves[event.index] = originalRows[event.index];
    delete originalRows[event.index];
    setLevelControlValves(row_levelControlValves);
  }

  const exportCSV = () => {
    dt.current.exportCSV();
  }

  const confirmDeleteSelected = () => {
    setDeleteLevelControlValvesDialog(true);
  }

  const deleteSelectedLevelControlValves = () => {
    let _selectedLevelControlValve = levelControlValves.filter(val => !selectedLevelControlValves.includes(val));
    setLevelControlValves(_selectedLevelControlValve);
    setDeleteLevelControlValvesDialog(false);
    setSelectedLevelControlValves(null);
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'Products Deleted',
      life: 3000
    })
    handleDeleteDataLevelControlValves()
  }
  
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _input = { ...levelControlValve };
    _input[`${name}`] = val;
    setLevelControlValve(_input)

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
          disabled={!selectedLevelControlValves || !selectedLevelControlValves.length}
        />
      </React.Fragment>
    )
  }

  const header = (
    <div className="table-header">
        <h5 className="p-m-0">Manage Level Control Valves</h5>
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..." />
        </span>
    </div>
)

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
)

const deleteLevelControlValvesDialogFooter = (
  <React.Fragment>
    <Button
      label="No"
      icon="pi pi-times"
      className="p-button-text dialog-no"
      onClick={hideDeleteLevelControlValvesDialog} />
    <Button
      label="Yes"
      icon="pi pi-check"
      className="p-button-text dialog-yes"
      onClick={deleteSelectedLevelControlValves} />
  </React.Fragment>
  )

  const dataTableFuncMap = {
    levelControlValves: setLevelControlValves,
  }

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
      />
    )
  }

  const checkEditor = (valueKey, props) => {
    switch (props.field) {
      case "separator_tag":
        return inputTextEditor(valueKey, props, "separator_tag");
      case "lcvtag":
        return inputTextEditor(valueKey, props, "lcvtag");
      case "lcvcv":
        return inputTextEditor(valueKey, props, "lcvcv");
      case "lcvfactorfl":
        return inputTextEditor(valueKey, props, "lcvfactorfl");
      case "lcvfactorfi":
        return inputTextEditor(valueKey, props, "lcvfactorfi");
      case "lcvfactorfp":
        return inputTextEditor(valueKey, props, "lcvfactorfp");
      case "lcvinletpressure":
        return inputTextEditor(valueKey, props, "lcvinletpressure");
      case "lcvoutletpressure":
        return inputTextEditor(valueKey, props, "lcvoutletpressure");
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
          className="p-mr-2 p-d-inline-block" />
        <Button
          label="Export"
          icon="pi pi-upload"
          className="export-button"
          onClick={exportCSV} />
        </React.Fragment>
    )
}
  
  const handleUpdateDataLevelControlValves = async datalevelcontrolvalve => {
  
    try { 
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({       
          "separator_tag": datalevelcontrolvalve.separator_tag,
          "lcvtag": datalevelcontrolvalve.lcvtag,
          "lcvcv": datalevelcontrolvalve.lcvcv,
          "lcvfactorfl": datalevelcontrolvalve.lcvfactorfl,
          "lcvfactorfi": datalevelcontrolvalve.lcvfactorfi,
          "lcvfactorfp": datalevelcontrolvalve.lcvfactorfp,
          "lcvinletpressure": datalevelcontrolvalve.lcvinletpressure,
          "lcvoutletpressure": datalevelcontrolvalve.lcvoutletpressure,
        })
      }
      console.log(requestOptions.body)
      const res = await fetch(`${ENDPOINT}/api/datalevelcontrolvalve`, requestOptions)
      const json = await res.json()
      console.log(json)
  
    }catch (error){
      console.log(error)
  
    }
  }

  const handleDeleteDataLevelControlValves = async() => {
  
    try { 
      for (const separator of selectedLevelControlValves) {
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
        const res = await fetch(`${ENDPOINT}/api/datalevelcontrolvalve`, requestOptions)
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
          <h5>Level Control Valves</h5>
          <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
          <DataTable
            ref={dt}
            value={levelControlValves}
            selection={selectedLevelControlValves} onSelectionChange={(e) => setSelectedLevelControlValves(e.value)}
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
              editor={(props) => checkEditor("levelControlValves", props)}sortable frozen
            ></Column>
            <Column headerStyle={{ width: '20rem' }}
              field="lcvtag"
              header="Lcv Tag"
              editor={(props) => checkEditor("levelControlValves", props)}sortable 
            ></Column>
            <Column headerStyle={{ width: '20rem' }}
              field="lcvcv"
              header="Lcv Cv (US gpm)"
              editor={(props) => checkEditor("levelControlValves", props)}sortable
            ></Column>
            <Column headerStyle={{ width: '20rem' }}
              field="lcvfactorfl"
              header="LCV Factor FL (constant)"
              editor={(props) => checkEditor("levelControlValves", props)}sortable
            ></Column>
            <Column headerStyle={{ width: '20rem' }}
              field="lcvfactorfp"
              header="LCV Factor FP (constant)"
              editor={(props) => checkEditor("levelControlValves", props)}sortable
            ></Column>
            <Column headerStyle={{ width: '20rem' }}
              field="lcvinletpressure"
              header="LCV Inlet Pressure (kpa)"
              editor={(props) => checkEditor("levelControlValves", props)}sortable
            ></Column>
            <Column headerStyle={{ width: '20rem' }}
              field="lcvoutletpressure"
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
          <label htmlFor="separator_tag">Level Control Valve Tag</label>
          <InputText
            id="separator_tag"
            value={levelControlValve.separator_tag}
            onChange={(e) => onInputChange(e, "separator_tag")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !levelControlValve
            })}
          />
          {emptySeparatorTag===true? 
            <small className="p-error">Relief Valve Tag is required.</small>
          : null}
          {/* {submitted && !levelControlValve && (
            <small className="p-error">Level Control Valve Tag is required.</small>
          )} */}
        </div>
      </Dialog>
            <Dialog visible={deleteLevelControlValvesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteLevelControlValvesDialogFooter} onHide={hideDeleteLevelControlValvesDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    <span>Are you sure you want to delete the selected Level Control Valves?</span>
                </div>
            </Dialog>
    </div>
  );
};
