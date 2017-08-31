require('fixed-data-table/dist/fixed-data-table.css');

import React from 'react';
import _ from 'lodash';
import {Grid, Row, Col, PageHeader, Button, ButtonGroup, Input} from 'react-bootstrap';

import mimeTypes from '../core/mimeTypes.js';
import FixedDataTable from 'fixed-data-table';
const Table = FixedDataTable.Table;
const Column = FixedDataTable.Column;
const GutterWidth = 30;

export class HarEntryTable extends React.Component{
    constructor(){
        super();
        this.state = {
            isColumnResizing: false,
            columnWidths: {
                url: 500,
                size: 100,
                time: 200
            },
            tableWidth: 1000,
            tableHeight: 500
        };
    }
    
    render(){
        var buttons = _.map(_.keys(mimeTypes.types), (x) => {
            return this._createButton(x, mimeTypes.types[x].label);    
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
                                <select className="form-control" onChange={this._sampleChanged.bind(this)}>
                                    <option value="">---</option>
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
                
                <Row>
                    <Col sm={12}>
                        <Table ref="entriesTable"
                            rowsCount={this.props.entries.length}
                            width={this.state.tableWidth}
                            headerHeight={30}
                            height={this.state.tableHeight}
                            rowHeight={30}
                            rowGetter={this._getEntry.bind(this)}
                            isColumnResizing={this.state.isColumnResizing}
                            onColumnResizeEndCallback={this._onColumnResized.bind(this)}
                        >
                            <Column dataKey="url" width={this.state.columnWidths.url} isResizable={true} label="Url" />
                            <Column dataKey="size" width={this.state.columnWidths.size} isResizable={true} label="Size" />
                            <Column dataKey="time" width={this.state.columnWidths.time} isResizable={true} label="Timeime" />
                        </Table>
                    </Col>
                </Row> 
            </Grid>    
        );
    }
    
    _getEntry(index){
        return this.props.entries[index];
    }
    
    _onColumnResized(newColumnWidth, dataKey){
        var columnWidths = this.state.columnWidths;
        columnWidths[dataKey] = newColumnWidth;
        
        this.setState({
            columnWidths: columnWidths,
            isColumnResizing: false
        });
        
    }
    
    _sampleChanged(){
        
    }
    
    // Table Resizing
    componentDidMount(){
        window.addEventListener('resize', _.debounce(this._onResize.bind(this), 50,
            {leading: true, trailing: true}            
        ));
        this._onResize();
        
    }
    
    _onResize(){
        var parent = this.refs.entriesTable.parentNode;    
        this.setState({
            tableWidth: parent.clientWidth - GutterWidth,
            tableHeight: document.body.clientHeight - parent.offsetTop - GutterWidth * 0.5
        });
        
    }
}

HarEntryTable.defautProps = {
    entries: []  
    
};