import React from "react";
import { Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { getFormValues } from "redux-form";


const CetakComponent = ({ values }) => {
  return (
    <Row className="mb-2">
      <Col>
        <Link to={"/laporandetail/"+values.UserID+"/"+values.TglAwal+"/"+values.TglAkhir}>
          <Button color="info">
            <FontAwesomeIcon icon={faSearchPlus} /> Rincian Scan
          </Button>
        </Link>
      </Col>
    </Row>
  );
};

export default connect(state => ({
    values: getFormValues("formLaporan")(state)
  }))(CetakComponent);
