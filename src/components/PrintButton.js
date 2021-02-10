import React from "react";
import { Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint} from "@fortawesome/free-solid-svg-icons";

const PrintButton = () => {
  return (
    <Row className="mb-2">
      <Col>
          <Button color="info" onClick={() => window.print()}>
            <FontAwesomeIcon icon={faPrint} /> Print
          </Button>
      </Col>
    </Row>
  );
};

export default PrintButton;
