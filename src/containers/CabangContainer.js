import React, { Component } from "react";
import CabangComponent from "../components/CabangComponent";
import { connect } from "react-redux";
import { getCabangList, deleteDataCabang } from "../actions/cabangAction";
import NavbarComponent from "../components/NavbarComponent";
import swal from "sweetalert";
import { Redirect } from "react-router-dom";


class CabangContainer extends Component {
    componentDidMount() {
        this.props.dispatch(getCabangList());
        this.props.dispatch(deleteDataCabang());
    }
    componentDidUpdate() {
        this.props.dispatch(getCabangList());
    }

    render() {
        let ambil = JSON.parse(localStorage.getItem('user'));
        if (!localStorage.getItem('user') || ambil.Login === "false") {
            swal("Failed!", "Login Dulu Bosq", "error");
            return <Redirect to="/Login" />;
        }

        if(ambil.RoleAdmin != 99){
            swal("Failed!", "Anda tidak memiliki hak akses menu ini", "error");
            return <Redirect to="/" />;
        }
        

        return (
            <div>
                <NavbarComponent />
                <CabangComponent />
            </div>
        );
    }
}

export default connect()(CabangContainer);
