require('fixed-data-table/dist/fixed-data-table.css');
require('./_har-entry-table');

import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import d3 from 'd3';

import FixedDataTable from 'fixed-data-table';
import TimeBar from './timebar/TimeBar.jsx';
import FileType from './filetype/FileType.jsx';
import formatter from '../core/formatter';


const Table = FixedDataTable.Table;
const Column = FixedDataTable.Column;
const GutterWidth = 30;

var PropTypes = React.PropTypes;

export default class HarEntryTable extends React.Component{
    constructor(){
        super();
        this.state = {
            isColumnResizing: false,
            columnWidths: {
                url: 500,
                size: 100,
                time: 200
            },
            sortDirection: {
                url: null,
                size: null,
                time: null
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
                            <Column dataKey="url" 
                                    width={this.state.columnWidths.url} 
                                    headerRenderer={this._renderHeader.bind(this)}
                                    cellRenderer={this._renderUrlColumn.bind(this)}
                                    cellDataGetter={this._readKey.bind(this)}
                                    isResizable={true} 
                                    label="Url" 
                                    flexGrow={null}/>
                            <Column dataKey="size" 
                                    width={this.state.columnWidths.size} 
                                    headerRenderer={this._renderHeader.bind(this)}
                                    cellRenderer={this._renderSizeColumn.bind(this)}
                                    cellDataGetter={this._readKey.bind(this)}
                                    isResizable={true} 
                                    label="Size" />
                            <Column dataKey="time" 
                                    width={this.state.columnWidths.time} 
                                    headerRenderer={this._renderHeader.bind(this)}
                                    cellRenderer={this._renderTimeColumn.bind(this)}
                                    cellDataGetter={this._readKey.bind(this)}
                                    minWidth={200}
                                    isResizable={true} 
                                    label="Timeime" />
                        </Table>
                    </Col>
                </Row> 
            </Grid>    
        );
    }
    
    _readKey(key, entry){
        var keyMap = {
            url: 'request.url',
            time: 'time.start',
        };
        
        key = keyMap[key] || key;
        return _.get(entry, key);
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
    
    // Custom Cell Rendering
    _renderSizeColumn(cellData, cellDataKey, rowData, rowIndex, columnData, width){
        return(
            <span>
                {formatter.filesize(cellData)}
            </span>    
        );    
    }
    
    _renderUrlColumn(cellData, cellDataKey, rowData, rowIndex, columnData, width){
        return(
            <FileType url={rowData.request.url} type={rowData.type}/> 
        );    
    }
    
    _renderTimeColumn(cellData, cellDataKey, rowData, rowIndex, columnData, width){
        var start = rowData.time.start,
            total = rowData.time.total,
            pgTimings = this.props.page.pageTimings,
            scale = this._prepareScale(this.props.entries, this.props.page); 
            
        return(
            <TimeBar scale={scale}
                    start={start}
                    total={total}
                    timings={rowData.time.details}
                    domContentLoad={pgTimings.onContentLoad}
                    pageLoad={pgTimings.onLoad}
            />    
        );
    }
    
    _prepareScale(entries, page){
        var startTime = 0,
            lastEntry = _.last(entries),
            endTime = lastEntry.time.start + lastEntry.time.total,
            maxTime = Math.max(endTime, page.pgTimings.onLoad);
        
        var scale = d3.scale.linear()
            .domain([startTime, Math.ceil(maxTime)])
            .range([0, 100]);
        
        return scale;
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
    
    // Table Sorting
    _renderHeader(label, dataKey){
        var dir = this.state.sortDirection[dataKey],
            classMap = {
                asc: 'glyphicon glyphicon-sort-by-attributes',
                desc: 'glyphicon glyphicon-sort-by-attributes-alt'
            };
        var sortClass = dir ? classMap[dir] : '';
        
        return(
            <div className="text-primary sortable" onClick={this._columnClicked.bind(this, dataKey)}>
                <strong>
                    {label}
                </strong>
                &nbsp;
                <i className={sortClass}></i>
            </div>    
        );
    }
    
    _columnClicked(dataKey){
        var sortDirections = this.state.sortDirection,
            dir = sortDirections[dataKey];
        
        if(dir === null){
            dir = 'asc';
        } else if (dir === 'asc'){
            dir = 'desc';
        } else if(dir === 'desc'){
            dir = null;
        }
        
        // Reset all sorts
        _.each(_.keys(sortDirections), function(x){
            sortDirections[x] = null;
        });
        sortDirections[dataKey] = dir;
        
        
        if(this.props.onColumnSort){
            this.props.onColumnSort(dataKey, dir);
        }    
        
    }
}

HarEntryTable.defautProps = {
    entries: [],  
    page: null,
    onColumnSort: null
    
};

HarEntryTable.propTypes ={
    entries: PropTypes.array,
    page: PropTypes.object,
    onColumnSort: PropTypes.func
};