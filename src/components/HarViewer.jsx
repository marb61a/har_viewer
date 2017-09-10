import React from 'react';
import _ from 'lodash';
import {Grid, Row, Col, PageHeader, Button, ButtonGroup, Input, Alert} from 'react-bootstrap';

import mimeTypes from '../core/mimeTypes.js';
import HarEntryTable from './HarEntryTable.jsx';
import FilterBar from './FilterBar.jsx';
import harParser from '../core/har-parser.js';

export default class HarViewer extends React.Component {
    constructor(){
        super();
        this.state = this._initialState();
    }   
    
    _initialState(){
        return{
            activeHar: null,
            filterType: 'all',
            filterText: null,
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
        var filter = {
            type: this.state.filterType,
            text: this.state.filterText
        },
            filteredEntries = this._filterEntries(filter, currentPage.entries),
            entries = this._sortEntriesByKey(this.state.sortKey, this.state.sortDirection, filteredEntries);
        
        return(
            <Grid fluid>
                <FilterBar onChange={this._onFilterChanged.bind(this)}
                onFilterTextChange={this.onFilterTextChanged.bind(this)}
                > </FilterBar>
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
    _onFilterChanged(type){
        this.setState({filterType: type});   
        
    }
    
    _onFilterTextChanged(text){
        this.setState({filterText: text});
        
    }
    
    _filterEntries(filter, entries){
        return _.filter(entries, function(x){
            var matchesType = filter.type === 'all' || filter.type === x.type,
                matchesText = _.includes(x.request.url, filter.text);
            
            return matchesType && matchesText;
        });
        
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
        if(sortDirection === 'desc'){
            sorted.reverse();
        }
        
        return sorted;
    }
}

HarViewer.defautProps = {
    
};