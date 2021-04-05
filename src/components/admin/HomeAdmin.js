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
import { FacilityTable } from "./FacilityTable"

export const HomeAdmin = () => {
  const toast = useRef(null);
  const { store } = useContext(Context);
  const [emptyUserEmail, setEmptyUserEmail] = useState(true);
  const [userDialog, setUserDialog] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [deleteUsersDialog, setDeleteUsersDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [users, setUsers] = useState();
  const [user, setUser] = useState(store.user);
  const [visible, setVisible] = useState(false)
  const [addError, setAddError] = useState()
  const dt = useRef(null);
  const [companyId, setCompanyId] = useState()

  let originalRows = {};

  var ENDPOINT = store.endpoint;
  var companyUserSS = window.sessionStorage.getItem('companyUser')
  

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    async function fetchMyApi() {
      await getDataAdmin(signal)
    }
    fetchMyApi()
    

    return function cleanup() {
      abortController.abort()
    }
  }, []);

  const getDataAdmin = async(signal) => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
      const companyUser = await fetch(`${ENDPOINT}/api/companies/${companyUserSS}`, {signal: signal}, requestOptions)
      const companyUserRes = await companyUser.json()
      console.log(companyUserRes[0].id)
      const companyId = companyUserRes[0].id
      const usersByCompanyId = await fetch(`${ENDPOINT}/api/users/${companyId}`)
      const usersByCompanyIdRes = await usersByCompanyId.json()
      console.log(usersByCompanyIdRes)
      setCompanyId(companyId)
      setUsers(usersByCompanyIdRes)
      
    }catch (error) {
        throw error;
      }
    
  }

  const openNew = () => {
    setUser(store.user);
    setSubmitted(false);
    setUserDialog(true);
  }

  const hideDialog = () => {
    setSubmitted(false);
    setUserDialog(false);
  }

  const hideDeleteUsersDialog = () => {
    setDeleteUsersDialog(false);
  }

  const saveCompanyUser = async() => {
    if (emptyUserEmail===false)
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        company_id: companyId,
        email: user.email
      })
    }
    console.log(requestOptions.body)
    const res = await fetch(`${ENDPOINT}/api/users`, requestOptions)
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
    setUserDialog(false);
    setUser(store.user)
    setEmptyUserEmail(true)
  
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

  // const exportCSV = () => {
  //   dt.current.exportCSV();
  // }

  const confirmDeleteSelected = () => {
    setDeleteUsersDialog(true);
  }

  const deleteSelectedUsers = () => {
    let _deleteReliefValves = users.filter((val) => !selectedUsers.includes(val))
    setUsers(_deleteReliefValves);
    setDeleteUsersDialog(false);
    setSelectedUsers(null);
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
    let _input = { ...user };
    _input[`${name}`] = val;
    setUser(_input);
    
    if (e.target.value.length === 0) { return setEmptyUserEmail(true) }
    else{ return setEmptyUserEmail(false)}
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
          disabled={!selectedUsers || !selectedUsers.length}
        />
      </React.Fragment>
    )
  }

  const header = (
    <div className="table-header table-header-admin d-flex align-items-end">
      <h5 className="p-m-0">Manage Users</h5>
      <span className="p-input-icon-left filter-admin">
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
      case "email":
        return inputTextEditor(valueKey, props, "email");
      case "firstname":
        return inputTextEditor(valueKey, props, "firstname");
      case "lastname":
        return inputTextEditor(valueKey, props, "lastname");
      case "password":
          return inputTextEditor(valueKey, props, "password");
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
          "email": user.email,
          "firstname":user.firstname, 
          "lastname": user.lastname,
          "password": user.password
        })
      }
      console.log(requestOptions.body)
      const res = await fetch(`${ENDPOINT}/api/users`, requestOptions)
      const json = await res.json()
      console.log(json["message"])
      if (json["message"] !== "Success") {
        showError(json)
    }
  }

  const showError = (error) => {
    setVisible(true)
    setAddError(error)
    console.log(error)
  
  }

  const handleDeleteUsers = async() => {
  
    try { 
      for (const user of selectedUsers) {
        const requestOptions = {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },        
          body: JSON.stringify({
            "email": user.email   
          })  
        }
        console.log(requestOptions.body)
        const res = await fetch(`${ENDPOINT}/api/users`, requestOptions)
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
        <h4>Admin</h4>
        <Toolbar
          className="toolbar-new-table"
          left={leftToolbarTemplate}
        ></Toolbar>
        <DataTable
          ref={dt}
          value={users}
          selection={selectedUsers}
          onSelectionChange={(e) => setSelectedUsers(e.value)}
          editMode="row"
          dataKey="id"
          onRowEditInit={onRowEditInit}
          onRowEditSave={onRowEditSave}
          onRowEditCancel={onRowEditCancel}
          globalFilter={globalFilter}
          header={header}
          scrollHeight="23vh"
          scrollable
        >
          <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} ></Column>
          <Column headerStyle={{width: '20rem', textAlign: 'center' }}
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
            <Column headerStyle={{width: '20rem', textAlign: 'center' }}
            field="password"
            header="Password"
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
          <div className="new-table card card-color">
          <FacilityTable />
        </div>
      <Dialog
        visible={userDialog}
        style={{ width: "450px" }}
        header="New User"
        modal
        className="p-fluid"
        footer={reliefValveDialogFooter}
        onHide={hideDialog}
      >
        <div className="p-field">
          <label htmlFor="email">User email</label>
          <InputText
            id="email"
            value={user.email}
            onChange={(e) => onInputChange(e, "email")}
            required
            autoFocus
          />
          {emptyUserEmail===true? 
            <small className="p-error">User email is required.</small>
          : null}  
          {/* {submitted && !user.separator_tag && (
            <small className="p-error">Relief Valve Tag is required.</small>
          )}         */}
        </div>
      </Dialog>
      <Dialog
        visible={deleteUsersDialog}
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