import React from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";

const mapStateToProps = (state) => {
  return {
    getAdminTimeNow: state.Admin.getAdminTimeNow,
  };
};

const Ambilwaktu = (props) => {
  return (
         <div>{props.getAdminTimeNow.Waktu}</div>
  );
};

export default connect(mapStateToProps, null)(Ambilwaktu);
