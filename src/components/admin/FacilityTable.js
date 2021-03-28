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
import "../inputs/DataReliefValve.css";

export const NewTable = () => {
  const toast = useRef(null);
  const { store } = useContext(Context);
  const [emptyFacilityName, setEmptyFacilityName] = useState(true);
  const [facilityDialog, setFacilityDialog] = useState(false);
  const [selectedFacilities, setSelectedFacilities] = useState(null);
  const [submittedFacility, setSubmittedFacility] = useState(false);
  const [deleteFacilitiesDialog, setDeleteFacilitiesDialog] = useState(false);
  const [globalFilterFacility, setGlobalFilterFacility] = useState(null);
  const [facilities, setFacilities] = useState();
  const [facility, setFacility] = useState(store.facility);
  const [visibleFacility, setVisibleFacility] = useState(false)
  const [addError, setAddError] = useState()
  const dt = useRef(null);
  const [companyId, setCompanyId] = useState()

  let originalRows = {};

  var ENDPOINT = store.endpoint;
  var companyUserSS = window.sessionStorage.getItem('companyUser')
  

  useEffect(() => {
    getDataAdmin()
  }, []);

  const getDataAdmin = async() => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
      const companyUser = await fetch(`${ENDPOINT}/api/companies/${companyUserSS}`, requestOptions)
      const companyUserRes = await companyUser.json()
      const companyId = companyUserRes[0].id
      const facilitiesByCompanyId = await fetch(`${ENDPOINT}/api/facilities/${companyId}`)
      const facilitiesByCompanyIdRes = await facilitiesByCompanyId.json()
      console.log(facilitiesByCompanyIdRes)
      setCompanyId(companyId)
      setFacilities(facilitiesByCompanyIdRes)
      
    }catch (error) {
        throw error;
      }
    
  }

  const openNew = () => {
    setFacility(store.facility);
    setSubmittedFacility(false);
    setFacilityDialog(true);
  }

  const hideDialog = () => {
    setSubmittedFacility(false);
    setFacilityDialog(false);
  }

  const hideDeleteUsersDialog = () => {
    setDeleteFacilitiesDialog(false);
  }

  const saveCompanyUser = async() => {
    if (emptyFacilityName===false)
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        company_id: companyId,
        facilitycode: facility.facilitycode
      })
    }
    console.log(requestOptions.body)
    const res = await fetch(`${ENDPOINT}/api/facilities`, requestOptions)
    const json = await res.json()
    console.log(json)

    setSubmittedFacility(true)
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Facility Created",
      life: 3000,
    })

    getDataAdmin()
    setFacilityDialog(false);
    setFacility(store.facility)
    setEmptyFacilityName(true)
  
      }catch (error){
        console.log(error)
    
      }
  }

  const onRowEditInit = (event) => {
    originalRows[event.index] = { ...facilities[event.index] };
  }

  const onRowEditSave = (event) => {
    originalRows[event.index] = { ...facilities[event.index] };
    handleUpdateDataCompanyUsers(originalRows[event.index])
  }
  
  const onRowEditCancel = (event) => {
    // let row_relief_valves = [...facilities];
    // console.log([...facilities])
    // row_relief_valves[event.index] = originalRows[event.index];
    // console.log(originalRows[event.index])
    // delete originalRows[event.index];
    getDataAdmin()
    //setFacilities([...facilities]);
  }

  // const exportCSV = () => {
  //   dt.current.exportCSV();
  // }

  const confirmDeleteSelected = () => {
    setDeleteFacilitiesDialog(true);
  }

  const deleteSelectedUsers = () => {
    let _deleteReliefValves = facilities.filter((val) => !selectedFacilities.includes(val))
    setFacilities(_deleteReliefValves);
    setDeleteFacilitiesDialog(false);
    setSelectedFacilities(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000
    })
    handleDeleteUsers()
  }
    
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value)|| '';
    let _input = { ...facility };
    _input[`${name}`] = val;
    setFacility(_input);
    
    if (e.target.value.length === 0) { return setEmptyFacilityName(true) }
    else{ return setEmptyFacilityName(false)}
  }

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="New"
          icon="pi pi-plus"
          className="success-button success-button-admin p-button-outlined p-mr-2"
          onClick={openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="delete-button delete-button-admin p-button-outlined"
          onClick={confirmDeleteSelected}
          disabled={!selectedFacilities || !selectedFacilities.length}
        />
      </React.Fragment>
    )
  }

  const header = (
    <div className="table-header table-header-admin d-flex align-items-end">
      <h5 className="p-m-0">Manage Facilities</h5>
      <span className="p-input-icon-left filter-admin">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilterFacility(e.target.value)}
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
        onClick={saveCompanyUser}
      />
    </React.Fragment>
  )

  const deleteReliefValvesDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text dialog-no"
        onClick={hideDeleteUsersDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text dialog-yes"
        onClick={deleteSelectedUsers}
      />
    </React.Fragment>
  )

  const dataTableFuncMap = {
    facilities: setFacilities,
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
      case "facilitycode":
        return inputTextEditor(valueKey, props, "facilitycode");
      case "location":
        return inputTextEditor(valueKey, props, "location");
      case "name":
        return inputTextEditor(valueKey, props, "name");
      default:
        break;
      
    }
  }  

  const handleUpdateDataCompanyUsers = async facility => {
  
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({       
          "facilitycode": facility.facilitycode,
          "name": facility.name,
          "location":facility.location
        })
      }
      console.log(requestOptions.body)
      const res = await fetch(`${ENDPOINT}/api/facilities`, requestOptions)
      const json = await res.json()
      console.log(json["message"])
      if (json["message"] !== "Success") {
        showError(json)
    }
  }

  const showError = (error) => {
    setVisibleFacility(true)
    setAddError(error)
    console.log(error)
  
  }

  const handleDeleteUsers = async() => {
  
    try { 
      for (const facility of selectedFacilities) {
        const requestOptions = {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },        
          body: JSON.stringify({
            "facilitycode": facility.facilitycode   
          })  
        }
        console.log(requestOptions.body)
        const res = await fetch(`${ENDPOINT}/api/facilities`, requestOptions)
        const json = await res.json()
        console.log(json)
        
      }
      
    }catch (error){
      console.log(error)
  
    }
  }

  return (
    <>
      <Toast className="index-toast" ref={toast} />
        <Toolbar
          className="toolbar-new-table"
          left={leftToolbarTemplate}
        ></Toolbar>
        <DataTable
          ref={dt}
          value={facilities}
          selection={selectedFacilities}
          onSelectionChange={(e) => setSelectedFacilities(e.value)}
          editMode="row"
          dataKey="id"
          onRowEditInit={onRowEditInit}
          onRowEditSave={onRowEditSave}
          onRowEditCancel={onRowEditCancel}
          globalFilter={globalFilterFacility}
          header={header}
          scrollHeight="23vh"
          scrollable
        >
          <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} ></Column>
          <Column headerStyle={{width: '20rem', textAlign: 'center' }}
            field="facilitycode"
            header="Facility Code"
            editor={(props) => checkEditor("facilities", props)}
            style={{textAlign: 'center' }}
            sortable
          ></Column>
          <Column headerStyle={{width: '20rem', textAlign: 'center' }}
            field="location"
            header="Location"
            editor={(props) => checkEditor("facilities", props)}
            style={{textAlign: 'center' }}
            sortable
          ></Column>
          <Column headerStyle={{width: '20rem', textAlign: 'center' }}
            field="name"
            header="Name"
            editor={(props) => checkEditor("facilities", props)}
            style={{textAlign: 'center' }}
            sortable
            ></Column>
          <Column
            rowEditor
            headerStyle={{ width: "7rem" }}
            bodyStyle={{ textAlign: "center" }}
          ></Column>
        </DataTable>
      <Dialog
        visible={facilityDialog}
        style={{ width: "450px" }}
        header="New Facility"
        modal
        className="p-fluid"
        footer={reliefValveDialogFooter}
        onHide={hideDialog}
      >
        <div className="p-field">
          <label htmlFor="facilitycode">Facility code</label>
          <InputText
            id="facilitycode"
            value={facility.facilitycode}
            onChange={(e) => onInputChange(e, "facilitycode")}
            required
            autoFocus
          />
          {emptyFacilityName===true? 
            <small className="p-error">Facility code is required.</small>
          : null}  
          {/* {submittedFacility && !facility.separator_tag && (
            <small className="p-error">Relief Valve Tag is required.</small>
          )}         */}
        </div>
      </Dialog>
      <Dialog
        visible={deleteFacilitiesDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteReliefValvesDialogFooter}
        onHide={hideDeleteUsersDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {facility && (
            <span>
              Are you sure you want to delete the selected Relief Valves?
            </span>
          )}
        </div>
        </Dialog>
        <Dialog
        visible={visibleFacility}
        style={{ width: '450px' }}
        header="Error"
        modal
        icon="pi pi-exclamation-triangle"
        onHide={() => setVisibleFacility(false)}>
          <div className="confirmation-content mb-5">
          <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}}/><span>{addError}</span>
        </div>
        </Dialog>
    </>
  );
};