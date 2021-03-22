import "primeicons/primeicons.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";
import React, { useState, useRef, useEffect, useContext } from "react";
import { Context } from "../../store/context";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import "./DataReliefValve.css";
import classNames from "classnames";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import CalculationsButton from '../calculations/CalculationsButton'



export const DataFluids = () => {

  const toast = useRef(null);
  const [emptySeparatorTag, setEmptySeparatorTag] = useState(true)
  const { store } = useContext(Context);
  const [fluidDialog, setFluidDialog] = useState(false);
  const [selectedFluids, setSelectedFluids] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [deleteFluidsDialog, setDeleteFluidsDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [fluids, setFluids] = useState();
  const [fluid, setFluid] = useState(store.input_fluids_data);
  const [visible, setVisible] = useState(false)
  const [addError, setAddError] = useState()
  const dt = useRef(null);

  let originalRows = {};

  var ENDPOINT = store.endpoint;
 
 useEffect(() => {
  getDataFluid()
   
  }, []);
   
  const getDataFluid = () => {
 
    const requestOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },}
      try {fetch(`${ENDPOINT}/api/datafluids`, requestOptions)
      .then(response => response.json())
      .then(data => setFluids(data))}
      catch(error){
        throw error;
    }
  }

  const openNew = () => {
    setSubmitted(false);
    setFluidDialog(true);
  }

  const hideDialog = () => {
    setSubmitted(false);
    setFluidDialog(false);
  }

  const hideDeleteFluidsDialog = () => {
    setDeleteFluidsDialog(false);
  }

  const saveFluid = async() => {
    if (emptySeparatorTag==false)
    try { 
      const requestOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({       
          tag: fluid.separator_tag,
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
        })
      
      getDataFluid()
      setFluidDialog(false)
      setFluid(store.input_fluids_data)
      setTimeout(function(){ setEmptySeparatorTag(true); }, 1000) 
    }catch (error){
      console.log(error)
  
      }
  }
  
  const onRowEditInit = (event) => {
    originalRows[event.index] = { ...fluids[event.index] };
  }

  const onRowEditSave = (event) => {
    originalRows[event.index] = { ...fluids[event.index] };
    handleUpdateDataFluids(originalRows[event.index])
  }

  const onRowEditCancel = (event) => {
    // let row_fluids = [...fluids];
    // row_fluids[event.index] = originalRows[event.index];
    // delete originalRows[event.index];
    // setFluids(row_fluids);
    getDataFluid()
  }

  const exportCSV = () => {
    dt.current.exportCSV();
  }

  const confirmDeleteSelected = () => {
    setDeleteFluidsDialog(true);
    
  }

  const deleteSelectedFluids = () => {

    let _selectedFluids = fluids.filter(val => !selectedFluids.includes(val));
    setFluids(_selectedFluids);
    setDeleteFluidsDialog(false);
    setSelectedFluids(null);
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    handleDeleteDataFluids();
  }
  
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _input = { ...fluid };
    _input[`${name}`] = val;
    setFluid(_input);

    if (e.target.value === '') {
      setEmptySeparatorTag(true)
      console.log('true')
    }
    else {
      setEmptySeparatorTag(false)
    }   
  }

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="New"
          icon="pi pi-plus"
          className="success-button p-button-outlined p-mr-2"
          onClick={openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="delete-button p-button-outlined"
          onClick={confirmDeleteSelected}
          disabled={!selectedFluids || !selectedFluids.length}
        />
      </React.Fragment>
    )
  }

  const header = (
    <div className="table-header d-flex align-items-end">
        <h5 className="p-m-0">Manage Fluids Separators</h5>
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
        </span>
    </div>
  )

  const fluidDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text dialog-no"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        className="p-button-text dialog-yes"
        icon="pi pi-check"
        onClick={saveFluid}
      />
    </React.Fragment>
  )

  const deleteFluidsDialogFooter = (
    <React.Fragment>
        <Button label="No" icon="pi pi-times" className="p-button-text dialog-no" onClick={hideDeleteFluidsDialog} />
        <Button label="Yes" icon="pi pi-check" className="p-button-text dialog-yes" onClick={deleteSelectedFluids} />
    </React.Fragment>
  )
  
  const dataTableFuncMap = {
    fluids: setFluids,
  }

  const onEditorValueChange = (productKey, props, value) => {
    let updatedValues = [...props.value];
    updatedValues[props.rowIndex][props.field] = value;
    dataTableFuncMap[`${productKey}`](updatedValues);
  }

  const InletNozzleParametersCalc = async() => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }
      const res = await fetch(`${ENDPOINT}/api/inletnozzleparameterscalc`, requestOptions)
      const json = await res.json()
      console.log(json) 
    }
    catch (error){
      console.log(error)  
    }   
  }

  const inputTextEditor = (productKey, props, field) => {
    return (
      <InputText
        type="text"
        value={props.rowData[field]}
        onChange={(e) => onEditorValueChange(productKey, props, e.target.value)}
      />
    )
  }

  const checkEditor = (productKey, props) => {
    switch (props.field) {
      case "separator_tag":
        return inputTextEditor(productKey, props, "separator_tag");
      case "operatingpressure":
        return inputTextEditor(productKey, props, "operatingpressure");
      case "operatingtemperature":
        return inputTextEditor(productKey, props, "operatingtemperature");
      case "oildensity":
        return inputTextEditor(productKey, props, "oildensity");
      case "gasdensity":
        return inputTextEditor(productKey, props, "gasdensity");
      case "mixturedensity":
        return inputTextEditor(productKey, props, "mixturedensity");
      case "waterdensity":
        return inputTextEditor(productKey, props, "waterdensity");
      case "feedbsw":
        return inputTextEditor(productKey, props, "feedbsw");
      case "liquidviscosity":
        return inputTextEditor(productKey, props, "liquidviscosity");
      case "gasviscosity":
        return inputTextEditor(productKey, props, "gasviscosity");
      case "gasmw":
        return inputTextEditor(productKey, props, "gasmw");
      case "liqmw":
        return inputTextEditor(productKey, props, "liqmw");
      case "gascomprz":
        return inputTextEditor(productKey, props, "gascomprz");
      case "especificheatratio":
        return inputTextEditor(productKey, props, "especificheatratio");
      case "liquidsurfacetension":
        return inputTextEditor(productKey, props, "liquidsurfacetension");
      case "liquidvaporpressure":
        return inputTextEditor(productKey, props, "liquidvaporpressure");
      case "liquidcriticalpressure":
        return inputTextEditor(productKey, props, "liquidcriticalpressure");
      case "standardgasflow":
        return inputTextEditor(productKey, props, "standardgasflow");
      case "standardliquidflow":
        return inputTextEditor(productKey, props, "standardliquidflow");
      case "actualgasflow":
        return inputTextEditor(productKey, props, "actualgasflow");
      case "actualliquidflow":
        return inputTextEditor(productKey, props, "actualliquidflow");
        case "kcp":
          return inputTextEditor(productKey, props, "kcp");
      default:
        break;
    }
  }

  const rightToolbarTemplate = () => {
    return (
        <React.Fragment>
            <Button label="Export" icon="pi pi-upload" className="export-button p-button-outlined" onClick={exportCSV} />
        </React.Fragment>
    )
  }

 const handleUpdateDataFluids = async datafluid => {
  
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({       
        "separator_tag": datafluid.separator_tag,
        "operatingpressure": datafluid.operatingpressure,
        "operatingtemperature": datafluid.operatingtemperature,
        "oildensity": datafluid.oildensity,
        "gasdensity": datafluid.gasdensity,
        "mixturedensity": datafluid.mixturedensity,
        "waterdensity": datafluid.waterdensity,
        "feedbsw": datafluid.feedbsw,
        "liquidviscosity": datafluid.liquidviscosity,
        "gasviscosity": datafluid.gasviscosity,
        "gasmw": datafluid.gasmw,
        "kcp": datafluid.kcp,
        "liqmw": datafluid.liqmw,
        "gascomprz": datafluid.gascomprz,
        "especificheatratio": datafluid.especificheatratio,
        "liquidsurfacetension": datafluid.liquidsurfacetension,
        "liquidvaporpressure": datafluid.liquidvaporpressure,
        "liquidcriticalpressure": datafluid.liquidcriticalpressure,
        "standardgasflow": datafluid.standardgasflow,
        "standardliquidflow": datafluid.standardliquidflow,
        "actualgasflow": datafluid.actualgasflow,
        "actualliquidflow": datafluid.actualliquidflow
      })
    }
    console.log(requestOptions.body)
    const res = await fetch(`${ENDPOINT}/api/datafluids`, requestOptions)
    const json = await res.json()
   console.log(json["message"])
   if (json["message"] != "Success") {
     showError(json)
   }
  }
  
  const showError = (error) => {
    setVisible(true)
    setAddError(error)
    console.log(error)
  
  }

  const handleDeleteDataFluids = async() => {
  
    try { 
      for (const separator of selectedFluids) {
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
      const res = await fetch(`${ENDPOINT}/api/datafluids`, requestOptions)
      const json = await res.json()
      console.log(json)
      
    }
    
  }catch (error){
    console.log(error)

  }
}

  return (
    <>
    <CalculationsButton/>
    <div className="p-grid p-fluid index">
      <Toast className="index-toast" ref={toast} />
      <div className="card card-color">
        <h5>Fluids</h5>
        <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
        <DataTable 
          ref={dt}
          value={fluids}
          selection={selectedFluids} onSelectionChange={(e) => setSelectedFluids(e.value)}
          editMode="cell"
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
          <Column headerStyle={{ width: '8rem', textAlign: 'center' }}
            field="separator_tag"
            header="Separator"
            editor={(props) => checkEditor("fluids", props)}
            style={{textAlign: 'center', fontWeight:"700"  }}
            sortable frozen
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center'}}
            field="operatingpressure"
            header="Operating Pressure (kPa)"
            editor={(props) => checkEditor("fluids", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="operatingtemperature"
            header="Operating Temperature (oC)"
            editor={(props) => checkEditor("fluids", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="oildensity"
            header="Oil Density (kg/m&sup3;)"
            editor={(props) => checkEditor("fluids", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="gasdensity"
            header="Gas Density (kg/m&sup3;)"
            editor={(props) => checkEditor("fluids", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="mixturedensity"
            header="Mixture Density (kg/m&sup3;)"
            editor={(props) => checkEditor("fluids", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="waterdensity"
            header="Water Density (kg/m&sup3;)"
            editor={(props) => checkEditor("fluids", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="feedbsw"
            header="Feed BSW (%v/v)"
            editor={(props) => checkEditor("fluids", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="liquidviscosity"
            header="Liquid Viscosity (cP)"
            editor={(props) => checkEditor("fluids", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="gasviscosity"
            header="Gas viscosity (oC)"
            editor={(props) => checkEditor("fluids", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="gasmw"
            header="Gas Mw (kg/kmol)"
            editor={(props) => checkEditor("fluids", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="liqmw"
            header="Liq MW (kg/kmol)"
            editor={(props) => checkEditor("fluids", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="gascomprz"
            header="Gas Compressor (Z)"
            editor={(props) => checkEditor("fluids", props)} sortable
            ></Column>
            <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
              style={{textAlign: 'center' }}
            field="kcp"
            header="k = Cp / Cv"
            editor={(props) => checkEditor("fluids", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="especificheatratio"
            header="Specific Heat Ratio"
            editor={(props) => checkEditor("fluids", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="liquidsurfacetension"
            header="Liquid Surface Tension (dyne/cm)"
            editor={(props) => checkEditor("fluids", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="liquidvaporpressure"
            header="Liquid Vapor Pressure (kPa)"
            editor={(props) => checkEditor("fluids", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="liquidcriticalpressure"
            header="Liquid Critical Pressure (kPa)"
            editor={(props) => checkEditor("fluids", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="standardgasflow"
            header="Standard Gas Flow (S m&sup3;/h)"
            editor={(props) => checkEditor("fluids", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="standardliquidflow"
            header="Standard Liquid Flow (S m&sup3;/h)"
            editor={(props) => checkEditor("fluids", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="actualgasflow"
            header="Actual Gas Flow (m&sup3;/h)"
            editor={(props) => checkEditor("fluids", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem', textAlign: 'center' }}
            style={{textAlign: 'center' }}
            field="actualliquidflow"
            header="Actual Liquid Flow (m&sup3;/h)"
            editor={(props) => checkEditor("fluids", props)} sortable
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
        className="p-fluid new-tag-dialog"
        footer={fluidDialogFooter}
        onHide={hideDialog}
      >
        <div className="p-field ">
          <label htmlFor="separator_tag">Data Fluids Tag</label>
          <InputText
            id="separator_tag"
            value={fluid.separator_tag}
            onChange={(e) => onInputChange(e, "separator_tag")}
            required
            autoFocus
            className={classNames({
              "p-invalid":  !fluid
            })}
          />
          {emptySeparatorTag==true? 
            <small className="p-error">Data Fluid Tag is required.</small>
          : null} 
          {/* {submitted && !fluid && (
            <small className="p-error">Separator Tag is required.</small>
          )} */}
        </div>
      </Dialog>
      <Dialog
        visible={deleteFluidsDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteFluidsDialogFooter}
        onHide={hideDeleteFluidsDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
          {fluid && (
            <span>Are you sure you want to delete the selected Fluids data?</span>
          )}
        </div>
        </Dialog>
        <Dialog
        visible={visible}
        style={{ width: '450px' }}
        header="Error"
        modal
        icon="pi pi-exclamation-triangle"
        onHide={() => setVisible(false)}>
          <div className="confirmation-content mb-5">
          <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}}/><span>{addError}</span>
        </div>
        </Dialog>
      </div>
    </>
  );
};
