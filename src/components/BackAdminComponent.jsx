import React from "react";
import { Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BackAdminComponent = () => {
  return (
    <Row className="mb-2">
      <Col>
        <a href="/superadmin">
          <Button color="dark">
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </Button>
        </a>
      </Col>
    </Row>
  );
};

export default BackAdminComponent;
