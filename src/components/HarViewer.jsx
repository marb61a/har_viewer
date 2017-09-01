import React from 'react';
import _ from 'lodash';
import {Grid, Row, Col, PageHeader, Button, ButtonGroup, Input} from 'react-bootstrap';
import mimeTypes from '../core/mimeTypes.js';
import HarEntryTable from './HarEntryTable.jsx'

export default class HarViewer extends React.Component {
    constructor(){
        super();
        this.state = this._initialState();
    }   
    
    _initialState(){
        return{
            activeHar: null,
            entries: []
        };
    }
    
    render(){
        var entries = [];
        
        return(
            <div>
                {this._renderHeader}
                <Grid>
                    <Row>
                        <Col sm={12}>
                            <HarEntryTable entries={this.state.entries} />
                        </Col>
                    </Row> 
                </Grid>
            </div>
        );
    }
    
    _renderHeader(){
        var buttons = _.map(_.keys(mimeTypes.types), (x) => {
            return this._createButton(x, mimeTypes.types[x].label);    
        });
        
        var options = _.map(window.samples, (s) => {
            return (<option key={s.id} value={s.id}>
                {s.label}
            </option>); 
        });
        
        return(
             <Grid>
                <Row>
                    <Col sm={12}>
                        <PageHeader>
                            Har Viewer
                        </PageHeader>
                    </Col>
                    
                    <Col sm={3} offset={9}>
                        <div>
                            <label className="control-label"> 
                                <select ref="selector" className="form-control" onChange={this._sampleChanged.bind(this)}>
                                    <option value="">---</option>
                                    {options}
                                </select>
                            </label>
                        </div>
                    </Col>
                </Row>  
                
                <Row>
                    <Col sm={12}>
                        <p>Pie Chart</p>    
                    </Col>
                </Row>
                
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
            </Grid>        
        );
    }
    
    _sampleChanged(){
        var selection = this.refs.selector.getDOMNode().value;
        var har = selection 
            ?_.find(window.samples, s=>s.id === selection).har
            : null;
        
        if(har){
            this.setState({activeHar: har});    
        } else{
            this.setState(this._initialState());
        }
        
    }
    
    // Filtering
    _createButton(type, label){
        var handler = this._filteredRequest.bind(this, type);
        return(
            <Button key={type}
                    bsStyle="primary"
                    active={this.state.type === type}
                    onClick={handler}
            > {label}
            </Button>    
        );
        
    }
    
    _filteredRequest(type, event){
        
    }
    
    _filterTextChanged(){
        
    }
}

HarViewer.defautProps = {
    
};