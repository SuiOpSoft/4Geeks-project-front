import "primeicons/primeicons.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";
import React, { useState,  useContext, useRef } from "react";
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

export const DataFluids = () => {
  const toast = useRef(null);
  // let dataFluids = [
  //   {
  //     separator: "V-36102",
  //     operating_Pressure: "5536.33",
  //     operating_Temperature: "37",
  //     oil_Density: "794.08",
  //     gas_Density: "52.18",
  //     mixture_Density: "197.76",
  //     water_Density: "1001",
  //     feed_BSW: "0.1",
  //     liquid_Viscosity: "2.1065",
  //     gas_Viscosity: "0.013385",
  //     gas_Mw: "20.80",
  //     liq_MW: "155.53",
  //     gas_Compressor: "0.8558",
  //     specific_Heat_Ratio: "1.4913",
  //     liquid_Surface_Tension: "15.49",
  //     liquid_Vapor_Pressure: "5536.3",
  //     liquid_Critical_Pressure: "12541.9",
  //     standard_Gas_flow: "25835.9",
  //     standard_Liquid_Flow: "103.9",
  //     actual_Gas_Flow: "435.5",
  //     actual_Liquid_Flow: "106.33",
  //   },
  // ];

  let emptyFluid = {
      separator: "",
      operating_Pressure: "-",
      operating_Temperature: "-",
      oil_Density: "-",
      gas_Density: "-",
      mixture_Density: "-",
      water_Density: "-",
      feed_BSW: "-",
      liquid_Viscosity: "-",
      gas_Viscosity: "-",
      gas_Mw: "-",
      liq_MW: "-",
      gas_Compressor: "-",
      specific_Heat_Ratio: "-",
      liquid_Surface_Tension: "-",
      liquid_Vapor_Pressure: "-",
      liquid_Critical_Pressure: "-",
      standard_Gas_flow: "-",
      standard_Liquid_Flow: "-",
      actual_Gas_Flow: "-",
      actual_Liquid_Flow: "-"
  }

  let emptyFluidResult = {
          separator: "Equipo",
					Mixture_Inlet_Nozzle_Velocity: "-",
					Inlet_Nozzle_Momentum: "-",
					Maximum_Mixture_Inlet_Nozzle_Velocity: "-",
					Maximum_Inlet_Nozzle_Momentum: "-",
					Maximun_Liquid_Flow_Inlet_Nozzle: "-",
					Maximum_Gas_Flow_Inlet_Nozzle: "-",
					Status_Inlet_Nozzle: "-"
  }

  const { store, actions } = useContext(Context);
  const [fluidDialog, setFluidDialog] = useState(false);
  const [selectedFluids, setSelectedFluids] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [deleteFluidsDialog, setDeleteFluidsDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [deleteFluidDialog, setDeleteFluidDialog] = useState(false);
  const [fluids, setFluids] = useState(store.input_fluids_data);
  const [fluid, setFluid] = useState(emptyFluid);
  const [fluidResult, setFluidResult] = useState(emptyFluidResult);
  // const [separators, setSeparators] = useState(store.input_separators_data);
  const dt = useRef(null);
  
  let originalRows = {};

  const dataTableFuncMap = {
    fluids: setFluids,
  };

  /*useEffect(() => {
        fetchProductData('products1');
        fetchProductData('products2');
        fetchProductData('products3');
    }, []); // eslint-disable-line react-hooks/exhaustive-deps*/

    const hideDialog = () => {
      setSubmitted(false);
      setFluidDialog(false);
    };

    const createId = () => {
      let id = '';
      let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 5; i++) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
    }

    const saveFluid = () => {
      setSubmitted(true);
      if (fluid.separator.trim()) {
        let _fluid = { ...fluid };
        let _fluids = [...fluids];
  
        _fluid.id = createId();
        _fluids.push(_fluid);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Separator Created",
          life: 3000,});

        setFluids(_fluids);
        setFluidDialog(false);
        setFluid(emptyFluid);
      }
    };

  const onRowEditInit = (event) => {
    originalRows[event.index] = { ...fluids[event.index] };
  };

  const onRowEditCancel = (event) => {
    let products = [...fluids];
    products[event.index] = originalRows[event.index];
    delete originalRows[event.index];

    setFluids(products);
  };

  // const InletNozzleParametersCalc = (fluids) => {
  //   store.output_inlet_nozzle_parameters = [];
  //   let _fluidResult = { ..._fluidResult};
  //   let _fluidsResults = [ ...store.output_inlet_nozzle_parameters];


  //   //REQUIRED DATA FROM FLUID DATA PARAMETERS
  //   let AGf = 108.252555;
  //   let ALf = 26.593298;
  //   let Md = 198.676684;

  //   //REQUIRED DATA FROM SEPARATOR DATA PARAMETERS
  //   let INd = 152.4;
  //   let InletDevice = "NID";

  //   fluids.map((itemFluid) => {
  //     separators.map((itemSeparator) => {
        
  //     })





  //   })

  // }

  const onEditorValueChange = (productKey, props, value) => {
    let updatedProducts = [...props.value];
    updatedProducts[props.rowIndex][props.field] = value;
    dataTableFuncMap[`${productKey}`](updatedProducts);
  };

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
        icon="pi pi-check"
        className="p-button-text dialog-yes"
        onClick={saveFluid}
      />
    </React.Fragment>
  );

  const deleteSelectedFluids = () => {
    let _products = fluids.filter(val => !selectedFluids.includes(val));
    setFluids(_products);
    setDeleteFluidsDialog(false);
    setSelectedFluids(null);
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
}

  const confirmDeleteSelected = () => {
    setDeleteFluidsDialog(true);
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
          disabled={!selectedFluids || !selectedFluids.length}
        />
      </React.Fragment>
    );
  };

  const openNew = () => {
    setFluid(emptyFluid);
    setSubmitted(false);
    setFluidDialog(true);
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
    let _product = { ...fluid };
    _product[`${name}`] = val;

    setFluid(_product);
  };

  const checkEditor = (productKey, props) => {
    switch (props.field) {
      case "separator":
        return inputTextEditor(productKey, props, "separator");
      case "operating_Pressure":
        return inputTextEditor(productKey, props, "operating_Pressure");
      case "operating_Temperature":
        return inputTextEditor(productKey, props, "operating_Temperature");
      case "oil_Density":
        return inputTextEditor(productKey, props, "oil_Density");
      case "gas_Density":
        return inputTextEditor(productKey, props, "gas_Density");
      case "mixture_Density":
        return inputTextEditor(productKey, props, "mixture_Density");
      case "water_Density":
        return inputTextEditor(productKey, props, "water_Density");
      case "feed_BSW":
        return inputTextEditor(productKey, props, "feed_BSW");
      case "liquid_Viscosity":
        return inputTextEditor(productKey, props, "liquid_Viscosity");
      case "gas_Viscosity":
        return inputTextEditor(productKey, props, "gas_Viscosity");
      case "gas_Mw":
        return inputTextEditor(productKey, props, "gas_Mw");
      case "liq_MW":
        return inputTextEditor(productKey, props, "liq_MW");
      case "gas_Compressor":
        return inputTextEditor(productKey, props, "gas_Compressor");
      case "specific_Heat_Ratio":
        return inputTextEditor(productKey, props, "specific_Heat_Ratio");
      case "liquid_Surface_Tension":
        return inputTextEditor(productKey, props, "liquid_Surface_Tension");
      case "liquid_Vapor_Pressure":
        return inputTextEditor(productKey, props, "liquid_Vapor_Pressure");
      case "liquid_Critical_Pressure":
        return inputTextEditor(productKey, props, "liquid_Critical_Pressure");
      case "standard_Gas_flow":
        return inputTextEditor(productKey, props, "standard_Gas_flow");
      case "standard_Liquid_Flow":
        return inputTextEditor(productKey, props, "standard_Liquid_Flow");
      case "actual_Gas_Flow":
        return inputTextEditor(productKey, props, "actual_Gas_Flow");
      case "actual_Liquid_Flow":
        return inputTextEditor(productKey, props, "actual_Liquid_Flow");
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

const deleteFluid = () => {
  let _products = fluids.filter(val => val.id !== fluid.id);
  setFluid(_products);
  setDeleteFluidDialog(false);
  setFluid(emptyFluid);
  toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
}

const hideDeleteFluidDialog = () => {
  setDeleteFluidDialog(false);
}

const hideDeleteFluidsDialog = () => {
  setDeleteFluidsDialog(false);
}

const deleteFluidDialogFooter = (
  <React.Fragment>
      <Button label="No" icon="pi pi-times" className="p-button-text dialog-no" onClick={hideDeleteFluidDialog} />
      <Button label="Yes" icon="pi pi-check" className="p-button-text dialog-yes" onClick={deleteFluid} />
  </React.Fragment>
);
const deleteFluidsDialogFooter = (
  <React.Fragment>
      <Button label="No" icon="pi pi-times" className="p-button-text dialog-no" onClick={hideDeleteFluidsDialog} />
      <Button label="Yes" icon="pi pi-check" className="p-button-text dialog-yes" onClick={deleteSelectedFluids} />
  </React.Fragment>
);

  return (
    <div className="p-grid p-fluid">
      <Toast ref={toast} />
      <div className="card">
        <h5>Fluids</h5>
        <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
        <DataTable
          ref={dt}
          value={fluids}
          selection={selectedFluids} onSelectionChange={(e) => setSelectedFluids(e.value)}
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
            header="Separators"
            editor={(props) => checkEditor("fluids", props)}sortable
          ></Column>
          <Column
            field="operating_Pressure"
            header="Operating Pressure (kPa)"
            editor={(props) => checkEditor("fluids", props)}sortable
          ></Column>
          <Column
            field="operating_Temperature"
            header="Operating Temperature (oC)"
            editor={(props) => checkEditor("fluids", props)}sortable
          ></Column>
          <Column
            field="oil_Density"
            header="Oil Density (kg/m&sup3;)"
            editor={(props) => checkEditor("fluids", props)}sortable
          ></Column>
          <Column
            field="gas_Density"
            header="Gas Density (kg/m&sup3;)"
            editor={(props) => checkEditor("fluids", props)}sortable
          ></Column>
          <Column
            field="mixture_Density"
            header="Mixture Density (kg/m&sup3;)"
            editor={(props) => checkEditor("fluids", props)}sortable
          ></Column>
          <Column
            field="water_Density"
            header="Water Density (kg/m&sup3;)"
            editor={(props) => checkEditor("fluids", props)}sortable
          ></Column>
          <Column
            field="feed_BSW"
            header="Feed BSW (%v/v)"
            editor={(props) => checkEditor("fluids", props)}sortable
          ></Column>
          <Column
            field="liquid_Viscosity"
            header="Liquid Viscosity (cP)"
            editor={(props) => checkEditor("fluids", props)}sortable
          ></Column>
          <Column
            field="gas_Viscosity"
            header="Gas viscosity (oC)"
            editor={(props) => checkEditor("fluids", props)}sortable
          ></Column>
          <Column
            field="gas_Mw"
            header="Gas Mw (kg/kmol)"
            editor={(props) => checkEditor("fluids", props)}sortable
          ></Column>
          <Column
            field="liq_MW"
            header="Liq MW (kg/kmol)"
            editor={(props) => checkEditor("fluids", props)}sortable
          ></Column>
          <Column
            field="gas_Compressor"
            header="Gas Compressor (Z)"
            editor={(props) => checkEditor("fluids", props)}sortable
          ></Column>
          <Column
            field="specific_Heat_Ratio"
            header="Specific Heat Ratio"
            editor={(props) => checkEditor("fluids", props)}sortable
          ></Column>
          <Column
            field="liquid_Surface_Tension"
            header="Liquid Surface Tension (dyne/cm)"
            editor={(props) => checkEditor("fluids", props)}sortable
          ></Column>
          <Column
            field="liquid_Vapor_Pressure"
            header="Liquid Vapor Pressure (kPa)"
            editor={(props) => checkEditor("fluids", props)}sortable
          ></Column>
          <Column
            field="liquid_Critical_Pressure"
            header="Liquid Critical Pressure (kPa)"
            editor={(props) => checkEditor("fluids", props)}sortable
          ></Column>
          <Column
            field="standard_Gas_flow"
            header="Standard Gas Flow (S m&sup3;/h)"
            editor={(props) => checkEditor("fluids", props)}sortable
          ></Column>
          <Column
            field="standard_Liquid_Flow"
            header="Standard Liquid Flow (S m&sup3;/h)"
            editor={(props) => checkEditor("fluids", props)}sortable
          ></Column>
          <Column
            field="actual_Gas_Flow"
            header="Actual Gas Flow (m&sup3;/h)"
            editor={(props) => checkEditor("fluids", props)}sortable
          ></Column>
          <Column
            field="actual_Liquid_Flow"
            header="Actual Liquid Flow (m&sup3;/h)"
            editor={(props) => checkEditor("fluids", props)}sortable
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
        className="p-fluid"
        footer={fluidDialogFooter}
        onHide={hideDialog}
      >
        <div className="p-field">
          <label htmlFor="separator">Data Fluids Tag</label>
          <InputText
            id="separator"
            value={fluid.separator}
            onChange={(e) => onInputChange(e, "separator")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !fluid.separator,
            })}
          />
          {submitted && !fluid.separator && (
            <small className="p-error">Separator Tag is required.</small>
          )}
        </div>
      </Dialog>
      <Dialog visible={deleteFluidDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteFluidDialogFooter} onHide={hideDeleteFluidDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {fluid && <span>Are you sure you want to delete <b>{fluid.separator}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteFluidsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteFluidsDialogFooter} onHide={hideDeleteFluidsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {fluid && <span>Are you sure you want to delete the selected fluids data?</span>}
                </div>
            </Dialog>
    </div>
  );
};
