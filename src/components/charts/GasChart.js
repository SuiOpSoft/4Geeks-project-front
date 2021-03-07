import React from 'react';
import { Chart } from 'primereact/chart';

export const GasChart = () => {
    const chartData = {
        labels: ['V-36102', 'V-36101', 'V-3602', 'V-36103', 'V-36107', 'V-36109', 'V-36108'],
        datasets: [{
            type: 'line',
            label: 'Actual Gas Flow m3/h',
            borderColor: '#96C5F7',
            borderWidth: 3,
            fill: false,
            data: [
                50,
                25,
                12,
                48,
                56,
                76,
                42
            ]
        }, {
            type: 'bar',
            label: "Maximun Gas Flow Inlet Nozzle m3/h",
            backgroundColor: '#59C9A5',
            data: [
                21,
                84,
                24,
                75,
                37,
                65,
                34
            ],
            borderColor: 'white',
            borderWidth: 2
        }, {
            type: 'bar',
            label: 'Maximum Gas Nozzle m3/h',
            backgroundColor: '#E3C16F',
            data: [
                41,
                52,
                24,
                74,
                23,
                21,
                32
                ],
            borderColor: 'white',
            borderWidth: 2
        },{
            type: 'bar',
            label: 'Maximum Gas Flow at HH level m3/h',
            backgroundColor: '#D81E5B',
            data: [
                41,
                52,
                24,
                74,
                23,
                21,
                32
                ],
                borderColor: 'white',
                borderWidth: 2
        },{
            type: 'bar',
            label: 'Maximum Gas Flow at Normal level m3/h',
            backgroundColor: '#716A5C',
            data: [
                41,
                52,
                24,
                74,
                23,
                21,
                32
            ],
            borderColor: 'white',
            borderWidth: 2
        },{
            type: 'bar',
            label: 'Relief Valve Capacity m3/h',
            backgroundColor: '#FF9770',
            data: [
                41,
                52,
                24,
                74,
                23,
                21,
                32
            ],
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