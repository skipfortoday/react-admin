import React from "react";
import { Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { getFormValues } from "redux-form";


const CariTerlambat = ({ values }) => {
  console.log(values.Nama)
  return (
    <Row className="mb-2">
      <Col>
          <a href={"../terlambatbertingkat/"+values.Nama.value}>
          <Button color="dark" >
            <FontAwesomeIcon icon={faDesktop} /> Print View
          </Button>
          </a>
      </Col>
    </Row>
  );
};

export default connect(state => ({
    values: getFormValues("FormTerlambat")(state)
  }))(CariTerlambat);