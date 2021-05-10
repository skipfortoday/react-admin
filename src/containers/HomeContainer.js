import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import TableUserComponent from "../components/TableUserComponent";
import { connect } from "react-redux";
import { getUsersList, deleteDataUser } from "../actions/userAction";

import NavbarComponent from "../components/NavbarComponent";
import swal from "sweetalert";

const mapStateToProps = (state) => {
    return {
        getResponLoginUser: state.Login.getResponLoginUser,
    };
};


class HomeContainer extends Component {
    componentDidMount() {
        this.props.dispatch(getUsersList());
        this.props.dispatch(deleteDataUser());
    }

    render() {
        if (!localStorage.getItem('user') || localStorage.getItem('user') === "false") {
            swal("Failed!", "Login Dulu", "error");
            return <Redirect to="/home" />;
        }
        return (
            <div>
                <NavbarComponent />
                <TableUserComponent />
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(HomeContainer);
