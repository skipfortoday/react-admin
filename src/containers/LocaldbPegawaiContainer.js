import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Col, Container, Row } from "reactstrap";
import GuestNavbarComponentManual from "../components/GuestNavbarComponentManual";
import swal from "sweetalert";
import {Redirect} from "react-router-dom";
import { getUsersList } from "../actions/userAction";
import LocalPegawaiTableComponent from "../components/LocalPegawaiTableComponent";

class LocaldbPegawaiContainer extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatch(getUsersList(true, true)); // all, local
        // this.props.dispatch(getUserListLocal())
    }

    componentDidUpdate() {

    }

    render() {

        let admin = JSON.parse(localStorage.getItem("user"));
        if(admin == null || admin.RoleAdmin != 99){
            swal("Unauthorized", "Anda tidak memiliki akses menu ini", "error")
            return <Redirect to="/" /> 
        }

        return (
            <div>
                <GuestNavbarComponentManual />
                <Container
                    style={{
                        maxWidth: "100%",
                        marginTop: "6px"
                    }}>
                    <LocalPegawaiTableComponent/>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}
//export default LocaldbPegawaiContainer
export default connect(mapStateToProps, null)(LocaldbPegawaiContainer);