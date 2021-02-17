import React from 'react'
import Select from 'react-select'
import { connect } from "react-redux";


const mapStateToProps = (state) => {
  return {
    getOptUser: state.Opt.getOptUser,
    errorCabangList: state.Cabang.errorCabangList,
  };
};

const ReactSelectComponent = (props) => (
  <Select options={props.getOptUser} />
);


 
  export default connect(mapStateToProps, null)(ReactSelectComponent);
