import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import NavbarComponent from '../components/NavbarComponent'
import { getListHistory, delListHistory } from '../actions/historyAction'
import { getOptUser } from '../actions/optAction'
import HistoryTableComponent from '../components/HistoryTableComponent'
import HistoryFilterComponent from '../components/HistoryFilterComponent'

const mapStateToProps = (state) => {
    return {
        Nama: state.History.defNama.value,
        TglAwal: state.History.defTglAwal,
        TglAkhir: state.History.defTglAkhir,
    };
};

class HistoryContainer extends Component {
  

    componentDidMount() {
        
        this.props.dispatch(getOptUser());
        this.props.dispatch(getListHistory(
            this.props.Nama === "" ? "all" : this.props.Nama,
            this.props.TglAwal,
            this.props.TglAkhir
        )); 
        
    
    }

    handleSubmitFilter(data) {
        //console.log(data);
        //hapus list history, karena kalau tidak data bisa ketumpukan baru dan lama
        this.props.dispatch(delListHistory());
        this.props.dispatch(getListHistory(
            data.Nama.value === "" ? "all" : data.Nama.value,
            data.TglAwal,
            data.TglAkhir
        )); 
    }

    render() {
        return (
            <div style={{minHeight:"900px"}}>
                <NavbarComponent />
                <div style={{ backgroundColor: "#f9a826" }}>
                    <Container>
                        <h3 className="text-center p-2">History Edit Absensi</h3>
                        <HistoryFilterComponent onSubmit={(data) => this.handleSubmitFilter(data)} />
                    </Container>
                </div>
                <Container className="pt-2">
                    <HistoryTableComponent />
                </Container>
            </div>
        )
    }
}


export default connect(mapStateToProps, null)(HistoryContainer)