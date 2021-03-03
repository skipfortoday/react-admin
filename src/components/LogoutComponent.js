import React from "react";
import { Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faSignOutAlt} from "@fortawesome/free-solid-svg-icons";

const LogoutComponent = () => {
  return (
    <Row className="mb-2">
      <Col>
          <Button color="dark" onClick={() => localStorage.clear()}>
            Logout <FontAwesomeIcon icon={faSignOutAlt} /> 
          </Button>
      </Col>
    </Row>
  );
};

export default LogoutComponent;
