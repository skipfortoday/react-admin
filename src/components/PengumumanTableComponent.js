import React from 'react'
import { connect } from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import { Row, Col, Button, Badge } from "reactstrap";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from 'react-bootstrap-table2-paginator';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faPlus,
    faEye,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
// import ReactHtmlParser from 'react-html-parser'; 
const { SearchBar } = Search;

const mapStateToProps = (state) => {
    return {
        getListPengumuman: state.Pengumuman.getListPengumuman,
        filterPengumuman: state.Pengumuman.filterPengumuman,
        errorListPengumuman: state.Pengumuman.errorListPengumuman
    }
}

const columns = [
    {
        dataField: 'LinkGambar',
        text: 'Gambar',
        sort: false,
        search:false,
        headerStyle: () => {
            return {
                backgroundColor: "#f9a826", width:"100px"
            }
        },
        formatter: (val, row) => {
            return val ? (<img src={val} style={{width:"100%"}} />) : "";
        },
    },
    {
        dataField: 'TglPosting',
        text: 'Tanggal',
        sort: true,
        search:true,
        
        headerStyle: () => {
            return {
                backgroundColor: "#f9a826", width:"120px"
            }
        },
        style:()=>{
            return{
                wordBreak:"break-all"
            }
        }
    },
    {
        dataField: 'KodeAuto',
        text: 'NO. IM',
        sort: true,
        search:true,
        headerStyle: () => {
            return {
                backgroundColor: "#f9a826", width:"120px"
            }
        },
        style:()=>{
            return{
                wordBreak:"break-all"
            }
        }
    },
    {
        dataField: 'Judul',
        text: 'Judul',
        sort: true,
        search:true,
        headerStyle: () => {
            return {
                backgroundColor: "#f9a826"
            }
        }
    },
    {
        dataField: 'KodeCabang',
        text: 'KodeCabang',
        sort: true,
        search:true,
        headerStyle: () => {
            return {
                backgroundColor: "#f9a826", width:"120px"
            }
        },
        formatter: (val, row) => {
            let groups = [];
            if(val != null) groups = val.replaceAll('-', '').split(',');
            return(
                <div>
                    {
                        groups.map((item) => {
                            return (
                                <Badge style={{marginRight:"5px"}} color="success">{item}</Badge>
                            );
                        })

                    }
                </div>
            )
        },
        
        style:()=>{
            return{
                wordBreak:"break-all"
            }
        }
    },
    {
        dataField: 'Group',
        text: 'Group',
        sort: true,
        search:true,
        headerStyle: () => {
            return {
                backgroundColor: "#f9a826"
            }
        },
        formatter: (val, row) => {
            let groups = [];
            if(val != null) groups = val.replaceAll('-', '').split(',');
            return(
                <div>
                    {
                        groups.map((item) => {
                            return (
                                <Link 
                                    style={{
                                        marginRight:"5px"
                                    }}
                                    to={"/group/view/"+item}><Badge color="info">{item}</Badge></Link>
                            );
                        })

                    }
                </div>
            )
        },
        style:()=>{
            return{
                wordBreak:"break-all"
            }
        }
    },
    {
        dataField: 'Berlaku',
        text: 'Berlaku',
        sort: true,
        search:true,
        headerStyle: () => {
            return {
                backgroundColor: "#f9a826", width:"120px"
            }
        }
    },
    {
        dataField: 'Aktif',
        text: 'Status',
        sort: true,
        search:true,
        headerStyle: () => {
            return {
                backgroundColor: "#f9a826", width:"80px"
            }
        },
        formatter: (val, row) => {
            return (
                <div>
                    {val == 'true' ? 'Aktif' : 'InAktif'}
                    <br/>
                    {row.Pinned == "true" ? (<Badge color="primary">Dipin</Badge>) : ("") }
                    
                </div>
            )
        }
    },
    {
        dataField: 'UserPosting',
        text: 'By',
        sort: true,
        search:true,
        headerStyle: () => {
            return {
                backgroundColor: "#f9a826", width:"70px"
            }
        },
    },
    
    {
        dataField: "link",
        text: "Action",
        headerStyle: () => {
            return { width: "70px", backgroundColor: "#f9a826" };
        },
        formatter: (rowContent, row) => {
            return (
                <div>
                    <Link to={"/pengumuman/edit/"+row.id}  style={{marginBottom:"5px"}}>
                        <Button
                            size="sm"
                            color="warning"
                            className="mb-2"
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>

                    </Link>
                    
                    <Link to={"/pengumuman/view/"+row.id} >
                        <Button
                            size="sm"
                            color="info"
                            className="mb-2"
                        >
                            <FontAwesomeIcon icon={faEye} />
                        </Button>

                    </Link>
                </div>
            );
        },
    },
];

// const defaultSorted = [{
//     dataField: 'TglPosting',
//     order: 'desc'
// }]

const PengumumanTableComponent = (props) => {
    const styleLink = {
        padding:"3px 10px 5px 10px",
        margin:"2px",
        color:"unset",
        backgroundColor: "rgb(23 162 184)",
        borderRadius:"5px",
        color:"#fff",
        fontWeight:"bold",
        fontSize:"13px"
    }

    const styleLinke = {
        padding:"5px",
        margin:"2px",
        color:"unset",
        fontSize:"13px"
    }
    // console.log(props.mode)
    let mode = props.mode;

    const setMode = (mode) => {
        props.setMode(mode)
    }

    let countAll = props.filterPengumuman.countAll;
    let countPinned = props.filterPengumuman.countPinned;
    let countActive = props.filterPengumuman.countActive;
    let countInActive = props.filterPengumuman.countInActive;

    return (
        <div>
            <Link to="/pengumuman/create" >
                <Button color="warning" size="md" className="mb-2">
                    <FontAwesomeIcon icon={faPlus} /> Tambah Pengumuman
                </Button>
            </Link>
            
            {props.getListPengumuman ? (
                <ToolkitProvider
                    bootstrap4
                    keyField="id"
                    data={props.getListPengumuman}
                    columns={columns}
                    //defaultSorted={defaultSorted}
                    search
                    >
                    {
                        props => (
                            <div>
                                <Row>
                                    <Col>
                                        <div className="float-left" style={{marginTop:"5px"}}>
                                            <Link style={mode == "all" ? styleLink : styleLinke} onClick={() => {setMode("all")}}>Semua ({countAll})</Link>
                                            <Link style={mode == "pin" ? styleLink : styleLinke} onClick={() => {setMode("pin")}}>Dipin ({countPinned})</Link>
                                            {/* <Link style={mode == "active" ? styleLink : styleLinke} onClick={() => {setMode("active")}}>Aktif ({countActive})</Link> */}
                                            <Link style={mode == "inactive" ? styleLink : styleLinke} onClick={() => {setMode("inactive")}}>Tidak Aktif ({countInActive})</Link>
                                        </div>
                                        <div className="float-right">
                                            <SearchBar
                                                {...props.searchProps}
                                                placeholder="Search .."
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <BootstrapTable
                                    {...props.baseProps}
                                    pagination={paginationFactory()}
                                />
                            </div>
                        )
                    }
                </ToolkitProvider>
            ) : ("") }
        </div>
    )
}

export default connect(mapStateToProps, null)(PengumumanTableComponent)