import React from 'react';
import _ from 'lodash';
import {Raw, Col, Button, ButtonGroup, Input} from 'react-bootstrap';
import mimeTypes from '../core/mimeTypes.js';

export default class FilterBar extends React.Component{
    constructor(){
        super();
        this.state = {};
    } 
    
    render(){
        var buttons = _.map(_.keys(mimeTypes.types), (x) => {
            return this._createButton(x, mimeTypes.types[x].label);    
        });
        
        return(
            <Row> 
                <Col sm={8}>
                    <ButtonGroup bsSize="small">
                        {this._createButton('all', 'All')}
                        {buttons}
                    </ButtonGroup>
                </Col>
                
                <Col sm={4}>
                
                </Col>
            </Row>    
        );   
    }
    
}
