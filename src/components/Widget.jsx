import React from "react";
import {Doughnut} from 'react-chartjs-2';
import 'chart.js/auto';
import './data.json';
const Widget=({text,title,data,labels,colors,onRemove})=>{
    const chartData={
        labels:labels,
        datasets:[
            {
                data:data,
                backgroundColor:colors,
                hoverBackgroundColor:colors,
            },
        ],
    };
    return(
        <div className="widget">
            <h3>{title}</h3>
            <h4>{text}</h4>
            <Doughnut data={chartData}/>
            <button onClick={onRemove} className="remove-widget">
                X
            </button>
        </div>
    )
}
export default Widget