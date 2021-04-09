import React from "react";
import { Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { getFormValues } from "redux-form";


const LengkapiAbsenButton = ({ values }) => {
  return (
    
          <a href={"/izin/create/"+values.Nama.value+"/"+values.TglAwal+"/"+values.TglAkhir}>
          <Button color="dark" type="button" size="" >
            <FontAwesomeIcon icon={faSearchPlus} /> View
          </Button>
          </a>
  );
};

export default connect(state => ({
    values: getFormValues("formLengkapiAbsen")(state)
  }))(LengkapiAbsenButton);