import React,{useContext, useState, useEffect} from 'react';
import { Chart } from 'primereact/chart';
import { Context } from "../../store/context";

export const LiquidChart = () => {

    const { store, actions } = useContext(Context);
    const [labels, setLabels] = useState([])
    const [fluids, setFluids] = useState([])
    const [liquidFlowInletNozzle, setLiquidFlowInletNozzle] = useState([])
    const [maximumLiquidNozzle, setMaximumLiquidNozzle] = useState([])
    const [maximumVesselLiquidFlow, setMaximumVesselLiquidFlow] = useState([])
    const [liquidFlowCapacity ,setLiquidFlowCapacity] = useState([])

    var ENDPOINT = store.endpoint;

    useEffect(() => {
        getDataLabels()
        getDataFluids()
        getDataMaximumLiquidFlowInletNozzle()
        getDataMaximumLiquidNozzle()
        getDataMaximumVesselLiquidFlowNormalLevel()
        getDataLiquidFlowCapacity()
    }, []);
    
    const getDataLabels = async() => {
        const requestOptions = {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }
        const res = await fetch(`${ENDPOINT}/api/separators`, requestOptions)
        const json = await res.json()
        const data = setLabels(json.map(element => element.tag))
    }

    const getDataFluids = async() => {
        const requestOptions = {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }
        const res = await fetch(`${ENDPOINT}/api/datafluids`, requestOptions)
        const json = await res.json()
        const data = setFluids(json.map(element => element.actualliquidflow))
    }

    const getDataMaximumLiquidFlowInletNozzle = async() => {
        const requestOptions = {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }
        const res = await fetch(`${ENDPOINT}/api/inletnozzleparameterscalc`, requestOptions)
        const json = await res.json()
        const data = setLiquidFlowInletNozzle(json.map(element => element.maximumliquidflowinletnozzle))
    }

    const getDataMaximumLiquidNozzle = async() => {
        const requestOptions = {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }
        const res = await fetch(`${ENDPOINT}/api/liquidnozzleparameterscalc`, requestOptions)
        const json = await res.json()
        const data = setMaximumLiquidNozzle(json.map(element => element.maximumliquidnozzleflow))
    }

    const getDataMaximumVesselLiquidFlowNormalLevel = async() => {
        const requestOptions = {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }
        const res = await fetch(`${ENDPOINT}/api/vesselliquidcapacitycalc`, requestOptions)
        const json = await res.json()
        const data = setMaximumVesselLiquidFlow(json.map(element => element.maximumvesselliquidflowcapacityatnormallevel))
    }

    const getDataLiquidFlowCapacity = async() => {
        const requestOptions = {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }
        const res = await fetch(`${ENDPOINT}/api/levelcontrolcalc`, requestOptions)
        const json = await res.json()
        const data = setLiquidFlowCapacity(json.map(element => element.liquidflowcapacity))
    }

    const chartData = {
        labels: [...labels],
        datasets: [{
            type: 'line',
            label: 'Actual Liquid Flow m3/h',
            borderColor: '#96C5F7',
            borderWidth: 2,
            fill: false,
            data: [...fluids]
        }, {
            type: 'bar',
            label: 'Maximum Liquiq Flow Inlet Nozzle m3/h',
            backgroundColor: '#E3C16F',
            data: [...liquidFlowInletNozzle],
            borderColor: 'white',
            borderWidth: 2
        }, {
            type: 'bar',
            label: 'Maximum Liquid Nozzle Flow m3/h',
            backgroundColor: '#D81E5B',
            data: [...maximumLiquidNozzle],
            borderColor: 'white',
            borderWidth: 2
        }, {
            type: 'bar',
            label: 'Maximum Vessel Liquid Flow at Normal Level m3/h',
            backgroundColor: '#716A5C',
            data: [...maximumVesselLiquidFlow],
            borderColor: 'white',
            borderWidth: 2
        }, {
            type: 'bar',
            label: 'LCV Liquid Flow Capacity m3/h',
            backgroundColor: '#FF9770',
            data: [...liquidFlowCapacity],
            borderColor: 'white',
            borderWidth: 2
        }]
    };

    const lightOptions = {
        legend: {
            labels: {
                fontColor: '#495057'
            }
        },
        scales: {
            xAxes: [{
                ticks: {
                    fontColor: '#495057'
                }
            }],
            yAxes: [{
                ticks: {
                    fontColor: '#495057'
                }
            }]
        }
    };

    return (
        <div className="card index charts">
            <Chart type="bar" data={chartData} options={lightOptions} />
        </div>
    )
}