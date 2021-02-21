import "primeicons/primeicons.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";
import React, { useState, useContext, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import "./DataReliefValve.css";
import classNames from "classnames";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Context } from "../../store/context";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { FileUpload } from 'primereact/fileupload';

export const DataSeparators = () => {
  const toast = useRef(null);
  // let dataSeparators = [
  //   {
  //     separator: "V-36102",
  //     internal_Diameter: "1800",
  //     t_t_length: "6300",
  //     high_Level_Trip: "1080",
  //     high_Level_Alarm: "900",
  //     normal_Liquid_Level: "650",
  //     low_Level_Alarm: "390",
  //     inlet_Nozzle: "203.2",
  //     gas_Oulet_Nozzle: "152.4",
  //     liquid_Outlet_Nozzle: "203.2",
  //     inlet_Device_Type: "-",
  //     demister_Type: "-",
  //   },
  //   {
  //     separator: "V-36102",
  //     internal_Diameter: "1800",
  //     t_t_length: "6300",
  //     high_Level_Trip: "1080",
  //     high_Level_Alarm: "900",
  //     normal_Liquid_Level: "650",
  //     low_Level_Alarm: "390",
  //     inlet_Nozzle: "203.2",
  //     gas_Oulet_Nozzle: "152.4",
  //     liquid_Outlet_Nozzle: "203.2",
  //     inlet_Device_Type: "-",
  //     demister_Type: "-",
  //   },
  // ];

  let emptySeparator = {
    
    separator: "",
    internal_Diameter: "-",
    t_t_length: "-",
    high_Level_Trip: "-",
    high_Level_Alarm: "-",
    normal_Liquid_Level: "-",
    low_Level_Alarm: "-",
    inlet_Nozzle: "-",
    gas_Oulet_Nozzle: "-",
    liquid_Outlet_Nozzle: "-",
    inlet_Device_Type: "-",
    demister_Type: "-",
  };

  let emptySeparatorResult = {
    
    separator: "Equipo",
    Separator_Cross_sectional_Area_Ratio: "",
    Separator_Cross_sectional_Area: "",
    Inlet_Nozzle_Area: "",
    Gas_Nozzle_Area: "",
    Liquid_Nozzle_Area: "",
    High_Level_Trip_Gas_Area: "",
    Normal_Level_Gas_Area: "",
    Low_Level_Gas_Area: "",
    High_Level_Trip_Liquid_Area: "",
    Normal_Level_Liquid_Area: "",
    Low_Level_Trip_Liquid_Area: "",
  };

  const { store, actions } = useContext(Context);
  const [separatorDialog, setSeparatorDialog] = useState(false);
  const [selectedSeparators, setSelectedSeparators] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [deleteSeparatorsDialog, setDeleteSeparatorsDialog] = useState(false);
  const [deleteSeparatorDialog, setDeleteSeparatorDialog] = useState(false);
  const [separators, setSeparators] = useState(store.input_separators_data);
  const [separator, setSeparator] = useState(emptySeparator);
  const [separatorResult, setSeparatorResult] = useState(emptySeparatorResult);
  const [globalFilter, setGlobalFilter] = useState(null);
  
  const dt = useRef(null);

  let originalRows = {};

  const dataTableFuncMap = {
    separators: setSeparators,
  };

  /*useEffect(() => {
        fetchProductData('products1');
        fetchProductData('products2');
        fetchProductData('products3');
    }, []); // eslint-disable-line react-hooks/exhaustive-deps*/

  const hideDialog = () => {
    setSubmitted(false);
    setSeparatorDialog(false);
  };

const createId = () => {
  let id = '';
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

  const saveSeparator = () => {
    setSubmitted(true);
    if (separator.separator.trim()) {
      let _separator = { ...separator };
      let _separators = [...separators];
  
        _separator.id = createId();
        _separators.push(_separator);
          toast.current.show({ 
                severity: 'success',
                summary: 'Successful',
                detail: 'Separator Created', 
                life: 3000, });
      
      setSeparators(_separators);
      setSeparatorDialog(false);
      setSeparator(emptySeparator);
    }
  };

  const onRowEditInit = (event) => {
    originalRows[event.index] = { ...separators[event.index] };
  };

  const onRowEditCancel = (event) => {
    let products = [...separators];
    products[event.index] = originalRows[event.index];
    delete originalRows[event.index];

    setSeparators(products);
  };

  const SeparatorGasAndLiquidAreasCalc = (separators) => {
    store.output_separator_gas_and_liquid_areas = [];
    let _separatorResult = { ...separatorResult };
    let _separatorsResults = [...store.output_separator_gas_and_liquid_areas];
    // store.output_separator_gas_and_liquid_areas = _separatorsResults;
    let Pi = 3.14159265358979;
    let Radio;
    let Area_Sep;
    let INArea;
    let GONArea;
    let LONArea;
    let ABS_R_Hh;
    let ABS_R_Nl;
    let ABS_R_Ll;
    let AHh;
    let ANl;
    let ALl;
    let TAHh;
    let TANl;
    let TALl;
    let GA_Hh;
    let GA_Nl;
    let GA_Ll;
    let LA_Hh;
    let LA_Nl;
    let LA_Ll;
    let test = separators.map((item) => {
      Area_Sep = (Pi * item.internal_Diameter ** 2) / (4 * 10 ** 6);
      Radio = item.internal_Diameter / 2;
      INArea = (Pi * item.inlet_Nozzle ** 2) / (4 * 10 ** 6);
      GONArea = (Pi * item.gas_Oulet_Nozzle ** 2) / (4 * 10 ** 6);
      LONArea = (Pi * item.liquid_Outlet_Nozzle ** 2) / (4 * 10 ** 6);
      ABS_R_Hh = Math.abs(Radio - item.high_Level_Trip);
      ABS_R_Nl = Math.abs(Radio - item.normal_Liquid_Level);
      ABS_R_Ll = Math.abs(Radio - item.low_Level_Alarm);
      AHh = 2.0 * Math.acos(ABS_R_Hh / Radio);
      ANl = 2.0 * Math.acos(ABS_R_Nl / Radio);
      ALl = 2.0 * Math.acos(ABS_R_Ll / Radio);
      TAHh =
        (0.5 * ABS_R_Hh * item.internal_Diameter * Math.sin(AHh / 2.0)) / 1.0e6;
      TANl =
        (0.5 * ABS_R_Nl * item.internal_Diameter * Math.sin(ANl / 2.0)) / 1.0e6;
      TALl =
        (0.5 * ABS_R_Ll * item.internal_Diameter * Math.sin(ALl / 2.0)) / 1.0e6;
      if (item.high_Level_Trip > Radio) {
        LA_Hh = ((Radio ** 2 / 2.0) * (2 * Pi - AHh)) / 1.0e6 + TAHh;
      } else {
        LA_Hh = ((Radio ** 2 / 2.0) * AHh) / 1.0e6 - TAHh;
      }
      if (item.normal_Liquid_Level > Radio) {
        LA_Nl = ((Radio ** 2 / 2.0) * (2 * Pi - ANl)) / 1.0e6 + TANl;
      } else {
        LA_Nl = ((Radio ** 2 / 2.0) * ANl) / 1.0e6 - TANl;
      }
      if (item.low_Level_Alarm > Radio) {
        LA_Ll = ((Radio ** 2 / 2.0) * (2 * Pi - ALl)) / 1.0e6 + TALl;
      } else {
        LA_Ll = ((Radio ** 2 / 2.0) * ALl) / 1.0e6 - TALl;
      }
      GA_Hh = Area_Sep - LA_Hh;
      GA_Nl = Area_Sep - LA_Nl;
      GA_Ll = Area_Sep - LA_Ll;
      _separatorResult.Separator_Cross_sectional_Area = Area_Sep.toFixed(2);
      _separatorResult.Separator_Cross_sectional_Area_Ratio = Radio;
      _separatorResult.Inlet_Nozzle_Area = Area_Sep.toFixed(2);
      _separatorResult.Gas_Nozzle_Area = GONArea.toFixed(2);
      _separatorResult.Liquid_Nozzle_Area = LONArea.toFixed(2);
      _separatorResult.High_Level_Trip_Liquid_Area = LA_Hh.toFixed(2);
      _separatorResult.Normal_Level_Liquid_Area = LA_Nl.toFixed(2);
      _separatorResult.Low_Level_Trip_Liquid_Area = LA_Ll.toFixed(2);
      _separatorResult.High_Level_Trip_Gas_Area = GA_Hh.toFixed(2);
      _separatorResult.Normal_Level_Gas_Area = GA_Nl.toFixed(2);
      _separatorResult.Low_Level_Gas_Area = GA_Ll.toFixed(2);

      _separatorsResults.push(_separatorResult);

      return (store.output_separator_gas_and_liquid_areas = _separatorsResults);
    });

    // let LA_Hh;
    // let LA_Nl;
    // let LA_Ll;

    // let Pi = 3.14159265358979;
    // let  Area_Sep = (Pi * Diam ** 2) / (4 * 10 ** 6);
    // let Radio = Diam / 2;
    // let INArea = (Pi * INd ** 2) / (4 * 10 ** 6);
    // let GONArea = (Pi * GOn ** 2) / (4 * 10 ** 6);
    // let LONArea = (Pi * LOn ** 2) / (4 * 10 ** 6);
    // let ABS_R_Hh = Math.abs(Radio - HHl);
    // let ABS_R_Nl = Math.abs(Radio - Nl);
    // let ABS_R_Ll = Math.abs(Radio - Ll);
    // let AHh = 2.0 * Math.acos(ABS_R_Hh / Radio);
    // let ANl = 2.0 * Math.acos(ABS_R_Nl / Radio);
    // let ALl = 2.0 * Math.acos(ABS_R_Ll / Radio);
    // let TAHh = (0.5 * ABS_R_Hh * Diam * Math.sin(AHh / 2.0)) / 1.0e6;
    // let TANl = (0.5 * ABS_R_Nl * Diam * Math.sin(ANl / 2.0)) / 1.0e6;
    // let TALl = (0.5 * ABS_R_Ll * Diam * Math.sin(ALl / 2.0)) / 1.0e6;
    // if (HHl > Radio) {
    //   LA_Hh = ((Radio ** 2 / 2.0) * (2 * Pi - AHh)) / 1.0e6 + TAHh;
    // } else {
    //   LA_Hh = ((Radio ** 2 / 2.0) * AHh) / 1.0e6 - TAHh;
    // }
    // if (Nl > Radio) {
    //   LA_Nl = ((Radio ** 2 / 2.0) * (2 * Pi - ANl)) / 1.0e6 + TANl;
    // } else {
    //   LA_Nl = ((Radio ** 2 / 2.0) * ANl) / 1.0e6 - TANl;
    // }
    // if (Ll > Radio) {
    //   LA_Ll = ((Radio ** 2 / 2.0) * (2 * Pi - ALl)) / 1.0e6 + TALl;
    // } else {
    //   LA_Ll = ((Radio ** 2 / 2.0) * ALl) / 1.0e6 - TALl;
    // }
    // let GA_Hh = Area_Sep - LA_Hh;
    // let GA_Nl = Area_Sep - LA_Nl;
    // let GA_Ll = Area_Sep - LA_Ll;

    //Wreturn console.log(Radio);
  };

  const onEditorValueChange = (productKey, props, value) => {
    let updatedProducts = [...props.value];
    updatedProducts[props.rowIndex][props.field] = value;
    dataTableFuncMap[`${productKey}`](updatedProducts);
  };

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
  );
  
  const deleteSelectedSeparators = () => {
    let _products = separators.filter(val => !selectedSeparators.includes(val));
    setSeparators(_products);
    setDeleteSeparatorsDialog(false);
    setSelectedSeparators(null);
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Separators Deleted', life: 3000 });
}

  const confirmDeleteSelected = () => {
    setDeleteSeparatorsDialog(true);
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
          disabled={!selectedSeparators || !selectedSeparators.length}
        />
      </React.Fragment>
    );
  };

  const openNew = () => {
    setSeparator(emptySeparator);
    setSubmitted(false);
    setSeparatorDialog(true);
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
    let _product = { ...separator };
    _product[`${name}`] = val;

    setSeparator(_product);
  };

  const checkEditor = (productKey, props) => {
    switch (props.field) {
      case "separator":
        return inputTextEditor(productKey, props, "separator");
      case "internal_Diameter":
        return inputTextEditor(productKey, props, "internal_Diameter");
      case "t_t_length":
        return inputTextEditor(productKey, props, "t_t_length");
      case "high_Level_Trip":
        return inputTextEditor(productKey, props, "high_Level_Trip");
      case "high_Level_Alarm":
        return inputTextEditor(productKey, props, "high_Level_Alarm");
      case "normal_Liquid_Level":
        return inputTextEditor(productKey, props, "normal_Liquid_Level");
      case "low_Level_Alarm":
        return inputTextEditor(productKey, props, "low_Level_Alarm");
      case "inlet_Nozzle":
        return inputTextEditor(productKey, props, "inlet_Nozzle");
      case "gas_Oulet_Nozzle":
        return inputTextEditor(productKey, props, "gas_Oulet_Nozzle");
      case "liquid_Outlet_Nozzle":
        return inputTextEditor(productKey, props, "liquid_Outlet_Nozzle");
      case "inlet_Device_Type":
        return inputTextEditor(productKey, props, "inlet_Device_Type");
      case "demister_Type":
        return inputTextEditor(productKey, props, "demister_Type");
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
        <h5 className="p-m-0">Manage Separators</h5>
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
        </span>
    </div>
);

const deleteSeparator = () => {
  let _products = separators.filter(val => val.id !== separator.id);
  setSeparator(_products);
  setDeleteSeparatorDialog(false);
  setSeparator(emptySeparator);
  toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
}

const hideDeleteSeparatorDialog = () => {
  setDeleteSeparatorDialog(false);
}

const hideDeleteSeparatorsDialog = () => {
  setDeleteSeparatorsDialog(false);
}

const deleteSeparatorDialogFooter = (
  <React.Fragment>
      <Button label="No" icon="pi pi-times" className="p-button-text dialog-no" onClick={hideDeleteSeparatorDialog} />
      <Button label="Yes" icon="pi pi-check" className="p-button-text dialog-yes" onClick={deleteSeparator} />
  </React.Fragment>
);
const deleteSeparatorsDialogFooter = (
  <React.Fragment>
      <Button label="No" icon="pi pi-times" className="p-button-text dialog-no" onClick={hideDeleteSeparatorsDialog} />
      <Button label="Yes" icon="pi pi-check" className="p-button-text dialog-yes" onClick={deleteSelectedSeparators} />
  </React.Fragment>
);

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
            editor={(props) => checkEditor("separators", props)} sortable frozen
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="internal_Diameter"
            header="Internal Diameter (mm)"
            editor={(props) => checkEditor("separators", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="t_t_length"
            header="T-T Length (mm)"
            editor={(props) => checkEditor("separators", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="high_Level_Trip"
            header="High Level trip (mm)"
            editor={(props) => checkEditor("separators", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="high_Level_Alarm"
            header="High Level Alarm (mm)"
            editor={(props) => checkEditor("separators", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="normal_Liquid_Level"
            header="Normal Liquid Level (mm)"
            editor={(props) => checkEditor("separators", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="low_Level_Alarm"
            header="Low Level Alarm (mm)"
            editor={(props) => checkEditor("separators", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="inlet_Nozzle"
            header="Inlet Nozzle (mm)"
            editor={(props) => checkEditor("separators", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="gas_Oulet_Nozzle"
            header="gas Outlet Nozzle (mm)"
            editor={(props) => checkEditor("separators", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="liquid_Outlet_Nozzle"
            header="Liquid Outlet Nozzle (mm)"
            editor={(props) => checkEditor("separators", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="inlet_Device_Type"
            header="Inlet Device Tupe (NID, HOP or SP)"
            editor={(props) => checkEditor("separators", props)} sortable
          ></Column>
          <Column headerStyle={{ width: '20rem' }}
            field="demister_Type"
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
          onClick={() => SeparatorGasAndLiquidAreasCalc(separators)}
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
          <label htmlFor="separator">Separator Tag</label>
          <InputText
            id="separator"
            value={separator.separator}
            onChange={(e) => onInputChange(e, "separator")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !separator.separator,
            })}
          />
          {submitted && !separator.separator && (
            <small className="p-error">Separator Tag is required.</small>
          )}
        </div>
      </Dialog>
      <Dialog visible={deleteSeparatorDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteSeparatorDialogFooter} onHide={hideDeleteSeparatorDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {separator && <span>Are you sure you want to delete <b>{separator.separator}</b>?</span>}
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
