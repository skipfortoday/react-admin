import React from "react";
import { Row, Col, Alert} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJournalWhills } from "@fortawesome/free-solid-svg-icons";

const InfoHomeGroup = () => {
  return (
    <Row className="mb-12">
      <Col>
         <Alert color="danger">
         <FontAwesomeIcon icon={faJournalWhills} />
            
            <Col>
                Tambah Group Pegawai untuk menambahkan Jadwal & Aturan untuk group yang akan dibuat
            </Col>
        </Alert>
        <Alert color="info">
         <FontAwesomeIcon icon={faJournalWhills} />
            <Col>
                Manfaatkan kolom search untuk mencari nama group
            </Col>
            <Col>
                Data group bisa diurutkan sesuai table yang kamu inginkan, cukup icon klik arah panah keatas dan kebawah pada table
            </Col>
        </Alert>
      </Col>
    </Row>
  );
}; 

export default InfoHomeGroup;