import React, {useContext, useState} from 'react'
import { Context } from "../../store/context";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ProgressSpinner } from 'primereact/progressspinner';


export default function CalculationsButton () {

  const { store } = useContext(Context);
  const [visible, setVisible] = useState(false)
  const [visibleSuccess, setVisibleSuccess] = useState(false)
  const [addError, setAddError] = useState()
  const [success, setSuccess] = useState(false)
  const [loading , setLoading] = useState(false)
  var ENDPOINT = store.endpoint;

  const showError = (error) => {
    setVisible(true)
    setAddError(error)  
  }

  const showSuccess = (message) => {
    setVisibleSuccess(true)
    setSuccess(message)
  }
  
  const calculate = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
      setLoading(true)
      const calc1 = await fetch(`${ENDPOINT}/api/gasandliquidareascalc`, requestOptions)
      const json1 = await calc1.json()
          console.log(json1)
      if (json1.message !== "Success") {
        return showError(json1.message), setLoading(false)
      }
      const calc2 = await fetch(`${ENDPOINT}/api/inletnozzleparameterscalc`, requestOptions)
      const json2 = await calc2.json()
          console.log(json2)
      if (json2.message !== "Success") {
        return showError(json2.message), setLoading(false)
      }
      const calc3 = await fetch(`${ENDPOINT}/api/gasnozzleparameterscalc`, requestOptions)
      const json3 = await calc3.json()
          console.log(json3)
      if (json3.message !== "Success") {
        return showError(json3.message), setLoading(false)
      }
      const calc4 = await fetch(`${ENDPOINT}/api/liquidnozzleparameterscalc`, requestOptions)
      const json4 = await calc4.json()
          console.log(json4)
      if (json4.message !== "Success") {
        return showError(json4.message), setLoading(false)
      }
      const calc5 = await fetch(`${ENDPOINT}/api/vesselgascapacitycalc`, requestOptions)
      const json5 = await calc5.json()
          console.log(json5)
      if (json5.message !== "Success") {
        return showError(json5.message), setLoading(false)
      }
      const calc6 = await fetch(`${ENDPOINT}/api/vesselliquidcapacitycalc`, requestOptions)
      const json6 = await calc6.json()
          console.log(json6)
      if (json6.message !== "Success") {
        return showError(json6.message), setLoading(false)
      }
      const calc7 = await fetch(`${ENDPOINT}/api/reliefvalvecalc`, requestOptions)
      const json7 = await calc7.json()
          console.log(json7)
      if (json7.message !== "Success") {
        return showError(json7.message), setLoading(false)
      }
      const calc8 = await fetch(`${ENDPOINT}/api/levelcontrolcalc`, requestOptions)
      const json8 = await calc8.json()
          console.log(json8)
      if (json8.message !== "Success") {
        return showError(json8.message), setLoading(false)
      }
      else {
        return showSuccess("Complete"), setLoading(false)
      }
      
    }catch (error){
      console.log(error)  
    }
  }
  
  return (
      <>
        <Button
            className="calculate-button align-middle p-button-outlined"
            icon="pi pi-play"
            onClick={calculate}
      ></Button>
      <Dialog
        visible={loading}
        style={{ width: '450px' }}
        header="Calculate"
        modal
        icon="pi pi-exclamation-triangle"
        onHide={() => setLoading(false)}>
        <div style={{height:"11em"}} className="d-flex align-items-center ">
          <ProgressSpinner />
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
      <Dialog
        visible={visibleSuccess}
        style={{ width: '450px' }}
        header="Calculate"
        modal
        icon="pi pi-exclamation-triangle"
        onHide={() => setVisibleSuccess(false)}>
          <div className="confirmation-content mb-5">
          <i className="far fa-check-circle p-mr-3" style={{ fontSize: '3rem'}} />
          <span>{success}</span>
        </div>
        </Dialog>
      </>
    )
}




