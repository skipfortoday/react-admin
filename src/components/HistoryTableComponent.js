import React from 'react'
import { connect } from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import { Row, Col } from "reactstrap";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';

const mapStateToProps = (state) => {
    return {
        getListHistory: state.History.getListHistory,
        errorListHistory: state.History.errorListHistory
    }
}

const { SearchBar } = Search;
const columns = [
    // {
    //     dataField: 'id',
    //     text: 'ID',
    //     sort: true,
    //     search:true,
    //     headerStyle: () => {
    //         return {
    //             width: "10%"
    //         }
    //     }
    // },
    {
        dataField: 'TglAbsen',
        text: 'Tgl Absen',
        sort: true,
        search:true,
        headerStyle: () => {
            return {
                width: "10%"
            }
        }
    },
    {
        dataField: 'Nama',
        text: 'Nama',
        sort: true,
        search:true,
        headerStyle: () => {
            return {
                width: "8%"
            }
        }
    },
    {
        dataField: 'Shift',
        text: 'Shift',
        sort: true,
        search:true,
        headerStyle: () => {
            return {
                width: "8%"
            }
        }
    },
    {
        dataField: 'ScanMasuk',
        text: 'Masuk',
        sort: true,
        search:true,
        headerStyle: () => {
            return {
                
            }
        }
    },
    {
        dataField: 'ScanPulang',
        text: 'Pulang',
        sort: true,
        search:true,
    },
    {
        dataField: 'Status',
        text: 'Status',
        sort: true,
        search:true,
    },
    {
        dataField: 'Keterangan',
        text: 'Keterangan',
        sort: true,
        search:true,
    },
    {
        dataField: 'TglEntry',
        text: 'Edit at',
        sort: true,
        headerStyle: () => {
            return {
                width: "10%"
            }
        }
    },
    {
        dataField: 'editBy',
        text: 'Edit By',
        sort: true,
        headerStyle: () => {
            return {
                width: "90px"
            }
        }
    }
];

const defaultSorted = [{
    dataField: 'TglAbsen',
    order: 'asc'
}]

const HistoryTableComponent = (props) => {
    return (
        <div>
            
            <ToolkitProvider
                bootstrap4
                keyField='id'
                data={props.getListHistory}
                columns={columns}
                defaultSorted={defaultSorted}
                SearchBar
                
            >
                {
                    props => (
                        <div>
                            <Row>
                                <Col>
                                    <div className="float-right">
                                        {/* <SearchBar {...props.searchProps} placeholder="Pencarian" /> */}
                                    </div>
                                </Col>
                            </Row>
                            <BootstrapTable
                                striped
                                {...props.baseProps}
                                pagination={paginationFactory()}
                            />
                        </div>
                    )
                }
            </ToolkitProvider>
        </div>
    )
}

export default connect(mapStateToProps, null)(HistoryTableComponent)