import React from "react";
import { Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BackGroup = (props) => {
  return (
    <Col>
      <Row className="mb-4">
        <Link to="/group">
          <Button color="dark">
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </Button>
        </Link>
        <h4 className="ml-4">{props.title}</h4>
      </Row>
    </Col>
    
  );
};

export default BackGroup;
