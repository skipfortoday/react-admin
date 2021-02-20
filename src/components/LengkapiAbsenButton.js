import React from "react";
import { Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { getFormValues } from "redux-form";


const LengkapiAbsenButton = ({ values }) => {
  return (
    <Row className="mb-2">
      <Col>
          <a href={"/izin/create/"+values.Nama.value+"/"+values.TglAwal+"/"+values.TglAkhir}>
          <Button color="warning" >
         
            <FontAwesomeIcon icon={faSearchPlus} /> Lengkapi Scan
          </Button>
          </a>
      </Col>
    </Row>
  );
};

export default connect(state => ({
    values: getFormValues("formLengkapiAbsen")(state)
  }))(LengkapiAbsenButton);