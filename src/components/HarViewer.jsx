require('fixed-data-table/dist/fixed-data-table.css')

import React from 'react';
import _ from 'lodash';
import {Grid, Row, Col, PageHeader, Button, ButtonGroup, Input} from 'react-bootstrap';

import FixedDataTable from 'fixed-data-table';
const Table = FixedDataTable.Table;
const Column = FixedDataTable.Column;

export default class HarViewer extends React.Component {
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
        return(
            <Grid>
                <Row>
                    <Col sm={12}>
                        <PageHeader>
                            Har Viewer
                        </PageHeader>
                    </Col>
                </Row>  
                <Row>
                    <Col sm={12}>
                        <Table rowsCount={this.props.entries.length}
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
    
    // Table Resizing
    componentDidMount(){
        window.addEventListener('resize', this._onResize.bind(this));
        this._onResize();
        
    }
    
    _onResize(){
        
    }
}

HarViewer.defautProps = {
    entries: []  
    
};