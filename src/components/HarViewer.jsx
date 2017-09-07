import React from 'react';
import _ from 'lodash';
import {Grid, Row, Col, PageHeader, Button, ButtonGroup, Input, Alert} from 'react-bootstrap';

import mimeTypes from '../core/mimeTypes.js';
import HarEntryTable from './HarEntryTable.jsx';
import harParser from '../core/har-parser.js';

export default class HarViewer extends React.Component {
    constructor(){
        super();
        this.state = this._initialState();
    }   
    
    _initialState(){
        return{
            activeHar: null,
            sortKey: null,
            sortDirection: null
        };
    }
    
    render(){
        var content = this.state.activeHar
            ? this._renderViewer(this.state.activeHar)
            : this._renderEmptyViewer();
        
        return(
            <div>
                {this._renderHeader}
                
                {content}
            </div>
        );
    }
    
    _renderEmptyViewer(){
        <Grid fluid>
            <Row>
                <Col sm={12}>
                    <p></p>
                    <Alert bsStyle="warning">
                         <strong>
                            No Har Loaded
                        </strong>
                    </Alert>
                </Col>
            </Row>
        </Grid> ;
    }
    
    _renderViewer(har){
        var pages = harParser.parse(har),
            currentPage = pages[0];
        var entries = this._sortEntriesByKey(this.state.sortKey, this.state.sortDirection, currentPage.entries);
        
        return(
            <Grid fluid>
                <Row>
                    <Col sm={12}>
                        <HarEntryTable entries={entries}
                        onColumnSort={this._onColumnSort.bind(this)}/>
                    </Col>
                </Row>    
            </Grid>    
        );
        
    }
    
    _renderHeader(){
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
    
    // Sorting
    _onColumnSort(dataKey, direction){
        this.setState({
            sortKey: dataKey,
            sortDirection: direction
        });
    }
    
    _sortEntriesByKey(sortKey, sortDirection, entries){
        if(_.isEmpty(sortKey) | _.isEmpty(sortDirection)){
            return entries;    
        }
        
        var keyMap = {
            url: 'request.url',
            time: 'time.start',
        },
            getValue = function(entry){
                var key = keyMap[sortKey] || sortKey;
                return _.get(entry, key);
            };
        
        var sorted = _.sortBy(entries, getValue);
<<<<<<< HEAD
        if(sortDirection === 'desc'){
            sorted.reverse();
        }
        
        return sorted;
=======
>>>>>>> d3e5760e323115a707ea4b516787023185608e56
    }
}

HarViewer.defautProps = {
    
};