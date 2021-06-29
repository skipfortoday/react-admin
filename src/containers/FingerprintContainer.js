import React, { Component } from "react";
import { connect } from "react-redux";
import NavbarComponent from "../components/NavbarComponent";
import swal from "sweetalert";
import { Redirect } from "react-router-dom";
import TableFIngerprintComponent from "../components/TableFIngerprintComponent";
import { getLocalFingerPrint, getUsersList, postDownloadFp } from "../actions/userAction";


const mapStateToProps = (state) => {
    return {
        postDownloadFp : state.users.postDownloadFp,
        errorPostDownloadFp : state.users.errorPostDownloadFp,
    };
 };
class FingerprintContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(getUsersList(true))
    }
    componentDidUpdate() {
        if(this.props.errorPostDownloadFp){
            swal("Failed!", this.props.errorPostDownloadFp.message, "error")
            this.props.dispatch(postDownloadFp(null))
        }
        
        if(this.props.postDownloadFp){
            let message = "Fingerprint berhasil didownload";
            if(this.props.postDownloadFp.length > 1)
            message = this.props.postDownloadFp.length +" Fingerprint berhasil didownload";

            swal("Success!", message, "success")
            this.props.dispatch(getUsersList(true))
            this.props.dispatch(postDownloadFp(null))
        }
    }

    downloadFp(UserID){
        this.props.dispatch(postDownloadFp([UserID]));
    }

    componentWillUnmount(){
        window.location.reload();
    }

    render() {
        let ambil = JSON.parse(localStorage.getItem('user'));
        if (!localStorage.getItem('user') || ambil.Login === "false") {
            swal("Failed!", "Login Dulu Bosq", "error");
            return <Redirect to="/home" />;
        }
        return (
            <div>
                <NavbarComponent />
                <TableFIngerprintComponent
                    downloadFp={(UserID) => {this.downloadFp(UserID)}}
                />
            </div>
        );
    }
}


export default connect(mapStateToProps, null)(FingerprintContainer);