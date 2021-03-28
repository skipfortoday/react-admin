import React from "react";
import { Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faWindowClose} from "@fortawesome/free-solid-svg-icons";

const CloseBrowserComponent = () => {
  
  return (  
    <Row className="mb-2">
      <Col>
          <Button color="dark" onClick={() => {window.open('/', '_self', '');localStorage.clear();window.close();}}> <FontAwesomeIcon icon={faWindowClose} /> 
          </Button>
      </Col>
    </Row>
  );
};

export default CloseBrowserComponent;