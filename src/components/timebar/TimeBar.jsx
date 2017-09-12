require("./timebar.scss");
import React from 'react';

const PropTypes = React.PropTypes;

export default class TimeBar extends React.Component{
    constructor(){
        super();
        this.state = {};
    }
    
    render(){
        return(
            <span>
                this.props.total
            </span>    
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