import React,{useContext, useState, useEffect} from 'react';
import { Chart } from 'primereact/chart';
import { Context } from "../../store/context";

export const GasChart = () => {

    const { store, actions } = useContext(Context);
    const [labels, setLabels] = useState([])
    const [fluids, setFluids] = useState([])
    const [gasFlowInletNozzle, setGasFlowInletNozzle] = useState([])
    const [maximumGasNozzle, setMaximumGasNozzle] = useState([])
    const [maximumGasFlowHHLevel, setMaximumGasFlowHHLevel] = useState([])
    const [maximumGasFlowNormalLevel, setMaximumGasFlowNormalLevel] = useState([])
    const [reliefValve, setReliefValve] = useState([])

    var ENDPOINT = store.endpoint;

    useEffect(() => {
        getDataLabels()
        getDataFluids()
        getDataMaximumGasFlowInletNozzle()
        getDataMaximumGasNozzle()
        getDataMaximumGasFlowHHLevel()
        getDataMaximumGasFlowNormalLevel()
        getDataReliefValve()
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
        const data = setFluids(json.map(element => element.actualgasflow))
    }

    const getDataMaximumGasFlowInletNozzle = async() => {
        const requestOptions = {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }
        const res = await fetch(`${ENDPOINT}/api/inletnozzleparameterscalc`, requestOptions)
        const json = await res.json()
        const data = setGasFlowInletNozzle(json.map(element => element.maximumgasflowinletnozzle))
    }

    const getDataMaximumGasNozzle = async() => {
        const requestOptions = {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }
        const res = await fetch(`${ENDPOINT}/api/gasnozzleparameterscalc`, requestOptions)
        const json = await res.json()
        const data = setMaximumGasNozzle(json.map(element => element.maximumgasnozzleflow))
    }

    const getDataMaximumGasFlowHHLevel = async() => {
        const requestOptions = {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }
        const res = await fetch(`${ENDPOINT}/api/vesselgascapacitycalc`, requestOptions)
        const json = await res.json()
        const data = setMaximumGasFlowHHLevel(json.map(element => element.maximumgasflowathhlevel))
    }

    const getDataMaximumGasFlowNormalLevel = async() => {
        const requestOptions = {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }
        const res = await fetch(`${ENDPOINT}/api/vesselgascapacitycalc`, requestOptions)
        const json = await res.json()
        const data = setMaximumGasFlowNormalLevel(json.map(element => element.maximumgasflowatnormallevel))
    }

    const getDataReliefValve = async() => {
        const requestOptions = {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }
        const res = await fetch(`${ENDPOINT}/api/reliefvalvecalc`, requestOptions)
        const json = await res.json()
        const data = setReliefValve(json.map(element => element.reliefvalvecapacity))
    }
 

    const chartData = {
        labels: [...labels],
        datasets: [{
            type: 'line',
            label: 'Actual Gas Flow m3/h',
            borderColor: '#282D36',
            borderWidth: 3,
            fill: false,
            data: [...fluids]
        }, {
            type: 'bar',
            label: "Maximun Gas Flow Inlet Nozzle m3/h",
            backgroundColor: '#43d39e',
            data: [...gasFlowInletNozzle],
            borderColor: 'white',
            borderWidth: 2
        }, {
            type: 'bar',
            label: 'Maximum Gas Nozzle m3/h',
            backgroundColor: 'rgb(247, 126, 83)',
            data: [...maximumGasNozzle],
            borderColor: 'white',
            borderWidth: 2
        },{
            type: 'bar',
            label: 'Maximum Gas Flow at HH level m3/h',
            backgroundColor: 'rgb(255, 190, 11)',
            data: [...maximumGasFlowHHLevel],
                borderColor: 'white',
                borderWidth: 2
        },{
            type: 'bar',
            label: 'Maximum Gas Flow at Normal level m3/h',
            backgroundColor: 'rgb(83, 105, 248)',
            data: [...maximumGasFlowNormalLevel],
            borderColor: 'white',
            borderWidth: 2
        },{
            type: 'bar',
            label: 'Relief Valve Capacity m3/h',
            backgroundColor: '#ff5c75',
            data: [...reliefValve],
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