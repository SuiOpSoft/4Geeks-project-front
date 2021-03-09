import React, {useContext} from 'react'
import { Context } from "../../store/context";
import { Button } from "primereact/button";


export default function CalculationsButton () {

    const { store, actions } = useContext(Context);
    var ENDPOINT = store.endpoint;

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
    
    const SeparatorGasAndLiquidAreasCalc = async() => {
        try {
          const requestOptions = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }
          const res = await fetch(`${ENDPOINT}/api/gasandliquidareascalc`, requestOptions)
          const json = await res.json()
          console.log(json)
      
        }catch (error){
          console.log(error)
      
        }
        
    }
    
    const GasNozzleParametersCalc = async() => {
        try {
          const requestOptions = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }
          const res = await fetch(`${ENDPOINT}/api/gasnozzleparameterscalc`, requestOptions)
          const json = await res.json()
          console.log(json) 
        }
        catch (error){
          console.log(error)  
        }   
    }

    const LiquidNozzleParametersCalc = async() => {
        try {
          const requestOptions = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }
          const res = await fetch(`${ENDPOINT}/api/liquidnozzleparameterscalc`, requestOptions)
          const json = await res.json()
          console.log(json) 
        }
        catch (error){
          console.log(error)  
        }   
    }

    const VesselGasCapacityParametersCalc = async() => {
        try {
          const requestOptions = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }
          const res = await fetch(`${ENDPOINT}/api/vesselgascapacitycalc`, requestOptions)
          const json = await res.json()
          console.log(json) 
        }
        catch (error){
          console.log(error)  
        }   
  }
  
  const VesselLiquidCapacityParametersCalc = async() => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }
      const res = await fetch(`${ENDPOINT}/api/vesselliquidcapacitycalc`, requestOptions)
      const json = await res.json()
      console.log(json) 
    }
    catch (error){
      console.log(error)  
    }   
  }
  
  const ReliefValveCalc = async() => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }
      const res = await fetch(`${ENDPOINT}/api/reliefvalvecalc`, requestOptions)
      const json = await res.json()
      console.log(json) 
    }
    catch (error){
      console.log(error)  
    }   
  }
  
  const LevelControlValveCalc = async() => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }
      const res = await fetch(`${ENDPOINT}/api/levelcontrolcalc`, requestOptions)
      const json = await res.json()
      console.log(json) 
    }
    catch (error){
      console.log(error)  
    }   
}
    
    const handleClick = () => {
      InletNozzleParametersCalc()
      SeparatorGasAndLiquidAreasCalc()
      GasNozzleParametersCalc()
      LiquidNozzleParametersCalc()
      VesselGasCapacityParametersCalc()
      VesselLiquidCapacityParametersCalc()
      ReliefValveCalc()
      LevelControlValveCalc()    
    } 

    return (
        <Button
            className="calculate-button"
            label="Calcular"
            onClick={handleClick}
        ></Button>
    )
}




