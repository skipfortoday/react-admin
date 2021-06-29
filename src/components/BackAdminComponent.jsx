import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BackAdminComponent = (props) => {
   return (
      <Col>
         <Row className="mb-4">
            <Link to="/superadmin">
               <Button color="dark">
                  <FontAwesomeIcon icon={faArrowLeft} /> Back
            </Button>
            </Link>

            <h4 className="ml-4">{props.title}</h4>
         </Row>
      </Col>
   );
};

export default BackAdminComponent;
