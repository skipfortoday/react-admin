import React from "react";
import { Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { getFormValues } from "redux-form";


const LengkapiAbsenButton2 = ({ values }) => {
  console.log(values.Nama)
  return (
    <Row className="mb-2">
      <Col>
          <a href={"/laporandetail/"+values.Nama.value+"/"+values.TglAwal+"/"+values.TglAkhir}>
          <Button color="dark" >
         
            <FontAwesomeIcon icon={faDesktop} /> Print View
          </Button>
          </a>
      </Col>
    </Row>
  );
};

export default connect(state => ({
    values: getFormValues("formLengkapiAbsenGuest")(state)
  }))(LengkapiAbsenButton2);