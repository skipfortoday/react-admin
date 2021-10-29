import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Modal, Row, Col } from 'reactstrap'
import { getLogAttlog } from '../actions/laporanAction'
import { getOptUser } from '../actions/optAction'
import FormLogAttlog from '../components/FormLogAttlog'
import Loader from "react-loader-spinner"
import NavbarComponent from '../components/NavbarComponent'
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
const { SearchBar } = Search;

const mapStateToProps=(state)=>{
    return {
        optUser: state.Opt.getOptUser,
        logAttlog : state.Laporan.logAttlog
    }
}

class LogAbsensi extends Component {

    constructor(props){
        super(props)
        this.state = {
            loading:false
        }
    }

    componentDidMount(){
        this.props.dispatch(getOptUser())
    }

    componentDidUpdate(prevProps){
        if(!prevProps.logAttlog && this.props.logAttlog){
            this.setState({
                ...this.state,
                loading:false
            })
        }
        // console.log(!prevProps.logAttlog, this.props.logAttlog)
    }

    handleSubmit = (data) =>{
        this.setState({
            ...this.state,
            loading:true
        })
        this.props.dispatch(getLogAttlog())
        this.props.dispatch(getLogAttlog(data))
    }

    render() {
        return (
            <div>
                <NavbarComponent />
                <div style={{ backgroundColor: "#f9a826" }}>
                    <Container>
                        <h3 className="text-center p-2">Log Absensi</h3>
                        <FormLogAttlog onSubmit={(data) => this.handleSubmit(data)}/>
                    </Container>
                </div>
                <div className="p-4">
                {this.props.logAttlog.length > 1 ? <TableData logAttlog={this.props.logAttlog}/> : ""}

                </div>
                
                <Modal 
                    isOpen={this.state.loading} 
                    backdropTransition={{timeout:0}}
                    modalTransition={{timeout:0}}
                    fade={false}
                    className="modal-lg custom-modal" 
                    centered={true} style={{textAlign:"center"}}>
                        {/* #00BFFF */}
                    <Loader
                        type="Oval"
                        color="#FFF"
                        height={60}
                        width={60}
                    />
                </Modal>
            </div>
        )
    }
}

const columns = [
    {
        dataField: 'logs',
        text: 'Log',
        sort: true,
        search:true
    }
]

const TableData = (props) => {
    let logLen = props.logAttlog.length
    return (
        <div>
            <ToolkitProvider
                bootstrap4
                keyField='logs'
                data={props.logAttlog}
                columns={columns}
                search
            >
                {
                    props => (
                        <div>
                            <Row>
                                <Col>
                                    <div className="float-left">
                                        <h6 className="pt-3">{logLen + " logs ditemukan"} </h6>
                                    </div>
                                    <div className="float-right">
                                        <SearchBar {...props.searchProps} placeholder="Pencarian" />
                                    </div>
                                </Col>
                            </Row>
                            <BootstrapTable
                                striped
                                {...props.baseProps}
                                pagination={paginationFactory({sizePerPage:20})}
                            />
                        </div>
                    )
                }
            </ToolkitProvider>
        </div>
    )
}

export default connect(mapStateToProps,null) (LogAbsensi);