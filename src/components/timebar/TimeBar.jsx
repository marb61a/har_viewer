require("./timebar.scss");
import React from 'react';
import _ from 'lodash';

const PropTypes = React.PropTypes;

export default class TimeBar extends React.Component{
    constructor(){
        super();
        this.state = {};
    }
    
    render(){
         var value = (v) => {
             return `${this.props.scale(v)}%`;
         },
            bars = [
                {
                    type: 'time',
                    style: {
                        left: value(this.props.start),
                        width: value(this.props.total)
                    },
                    className: 'timebar-mark-time'
                },
                {
                    type: 'contentLoad',
                    style: {
                        left: value(this.props.domContentLoad),
                        width: 1
                    },
                    className: 'timebar-mark-contentLoad'
                },
                {
                    type: 'pageLoad',
                    style: {
                        left: value(this.props.pageLoad),
                        width: 1
                    },
                    className: 'timebar-mark-pageLoad'
                }
             ],
                label = this.props.total;
        var barElements = _.chain(bars)
            .map((b) => {
                return(
                    <div
                        key={b.type} className={`timebar-mark ${b.className}`} style={b.style}>
                    </div>
                ).value();    
            });
        
        return(
            <div className="timebar">
                {barElements}
                <span className="timebar-label">
                    {label}
                </span>    
            </div>
        );
        
    }
}

TimeBar.defautProps = {
    scale: null,
    start: 0,
    total: 0,
    timings: null,
    domContentLoad: 0,
    pageLoad: 0
};

TimeBar,propTypes = {
    scale: PropTypes.func,
    start: PropTypes.number,
    total: PropTypes.number,
    timings: PropTypes.object,
    domContentLoad: PropTypes.number,
    pageLoad: PropTypes.number
};