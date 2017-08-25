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
                        <Table>
                            <Column dataKey="url" width={this.state.columnWidths.url} isResizable={true} label="Url" />
                            <Column dataKey="size" width={this.state.columnWidths.size} isResizable={true} label="Size" />
                            <Column dataKey="time" width={this.state.columnWidths.time} isResizable={true} label="Timeime" />
                        </Table>
                    </Col>
                </Row> 
            </Grid>    
        );
    }
}