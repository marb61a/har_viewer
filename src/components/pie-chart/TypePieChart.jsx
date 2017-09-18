import React from 'react';

export default class TypePieChart extends React.Component{
    constructor(){
        super();
        this.state = {
            svgWidth: 275,
            svgHeight: 275,
            width: 125,
            height: 125
        };
    }
    
    render(){
        var center = {
            x: this.state.svgWidth / 2,
            y: this.state.svgHeight / 2 
        };
        
        return(
            <svg width={this.state.svgWidth} height={this.state.svgHeight}>
                <g ref="container" transform={`translate(${center.x}, ${center.y})`}></g>
            </svg>    
        );
    }
}

TypePieChart.defaultProps = {
    entries: null    
};