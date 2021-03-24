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
import CalculationsButton from '../calculations/CalculationsButton'

export const HomeAdmin = () => {
  const toast = useRef(null);
  const { store } = useContext(Context);
  const [emptySeparatorTag, setEmptySeparatorTag] = useState(true);
  const [reliefValveDialog, setReliefValveDialog] = useState(false);
  const [selectedReliefValves, setSelectedReliefValves] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [deleteReliefValvesDialog, setDeleteReliefValvesDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [users, setUsers] = useState();
  const [user, setUser] = useState(store.user);
  const [visible, setVisible] = useState(false)
  const [addError, setAddError] = useState()
  const dt = useRef(null);

  let originalRows = {};

  var ENDPOINT = store.endpoint;

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
      const companyUser = await fetch(`${ENDPOINT}/api/companies/ShellUx`, requestOptions)
      const companyUserRes = await companyUser.json()
      console.log(companyUserRes[0].id)
      const companyId = companyUserRes[0].id
      const usersByCompanyId = await fetch(`${ENDPOINT}/api/users/${companyId}`)
      const usersByCompanyIdRes = await usersByCompanyId.json()
      console.log(usersByCompanyIdRes)
      setUsers(usersByCompanyIdRes)
      
    }catch (error) {
        throw error;
      }
    
  }

  const openNew = () => {
    setUser(store.input_relief_valve_data);
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
        company_id: user.company_id,
        //id: null
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
      detail: "user Created",
      life: 3000,
    })

    getDataAdmin()
    setReliefValveDialog(false);
    setUser(store.input_relief_valve_data)
    setEmptySeparatorTag(true)
  
      }catch (error){
        console.log(error)
    
      }
  }

  const onRowEditInit = (event) => {
    originalRows[event.index] = { ...users[event.index] };
  }

  const onRowEditSave = (event) => {
    originalRows[event.index] = { ...users[event.index] };
    handleUpdateDataCompanyUsers(originalRows[event.index])
  }
  
  const onRowEditCancel = (event) => {
    // let row_relief_valves = [...users];
    // console.log([...users])
    // row_relief_valves[event.index] = originalRows[event.index];
    // console.log(originalRows[event.index])
    // delete originalRows[event.index];
    getDataAdmin()
    //setUsers([...users]);
  }

  const exportCSV = () => {
    dt.current.exportCSV();
  }

  const confirmDeleteSelected = () => {
    setDeleteReliefValvesDialog(true);
  }

  const deleteSelectedReliefValves = () => {
    let _deleteReliefValves = users.filter((val) => !selectedReliefValves.includes(val))
    setUsers(_deleteReliefValves);
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
    let _input = { ...user };
    _input[`${name}`] = val;
    setUser(_input);
    
    if (e.target.value.length === 0) { return setEmptySeparatorTag(true) }
    else{ return setEmptySeparatorTag(false)}
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
          disabled={!selectedReliefValves || !selectedReliefValves.length}
        />
      </React.Fragment>
    )
  }

  const header = (
    <div className="table-header d-flex align-items-end">
      <h5 className="p-m-0">Manage Facilities</h5>
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
    users: setUsers,
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
      case "company_id":
        return inputTextEditor(valueKey, props, "company_id");
      case "email":
        return inputTextEditor(valueKey, props, "email");
      case "firstname":
        return inputTextEditor(valueKey, props, "firstname");
      case "lastname":
        return inputTextEditor(valueKey, props, "lastname");
      case "id":
        return inputTextEditor(valueKey, props, "id");
      default:
        break;
      
    }
  }  

  const handleUpdateDataCompanyUsers = async user => {
  
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({       
          "company_id": user.company_id,
          "email": user.email,
          "firstname":user.firstname, 
          "id": user.id,
          "lastname": user.lastname,
        })
      }
      console.log(requestOptions.body)
      const res = await fetch(`${ENDPOINT}/api/datareliefvalve`, requestOptions)
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
    <>
    <div className="p-grid p-fluid index">
      <Toast className="index-toast" ref={toast} />
      <div className="card card-color">
        <h5>Admin</h5>
        <Toolbar
          className="p-mb-4"
          left={leftToolbarTemplate}
        ></Toolbar>
        <DataTable
          ref={dt}
          value={users}
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
        >
          <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} frozen></Column>
          <Column headerStyle={{width: '20rem', textAlign: 'center' }}
            field="id"
            header="Id"
            editor={(props) => checkEditor("users", props)}
            style={{textAlign: 'center' }}
            sortable
          ></Column>
          <Column headerStyle={{ width: '8rem',textAlign: 'center' }}
            field="company_id"
            header="Company Id"
            editor={(props) => checkEditor("users", props)}
            style={{textAlign: 'center', fontWeight:"700" }}
            sortable
            frozen
          ></Column>
          <Column headerStyle={{width: '10rem', textAlign: 'center' }}
            field="email"
            header="Email"
            editor={(props) => checkEditor("users", props)}
            style={{textAlign: 'center' }}
            sortable
          ></Column>
          <Column headerStyle={{width: '20rem', textAlign: 'center' }}
            field="firstname"
            header="Firstname"
            editor={(props) => checkEditor("users", props)}
            style={{textAlign: 'center' }}
            sortable
          ></Column>
          <Column headerStyle={{width: '20rem', textAlign: 'center' }}
            field="lastname"
            header="Lastname"
            editor={(props) => checkEditor("users", props)}
            style={{textAlign: 'center' }}
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
        header="New User"
        modal
        className="p-fluid"
        footer={reliefValveDialogFooter}
        onHide={hideDialog}
      >
        <div className="p-field">
          <label htmlFor="company_id">User data</label>
          <InputText
            id="company_id"
            value={user.company_id}
            onChange={(e) => onInputChange(e, "separator_tag")}
            required
            autoFocus
          />
          {emptySeparatorTag===true? 
            <small className="p-error">User is required.</small>
          : null}  
          {/* {submitted && !user.separator_tag && (
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
          {user && (
            <span>
              Are you sure you want to delete the selected Relief Valves?
            </span>
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