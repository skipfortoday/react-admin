import React from "react";
import { Row, Col, Alert} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJournalWhills } from "@fortawesome/free-solid-svg-icons";

const InfoHomeCabang = () => {
  return (
    <Row className="mb-12">
      <Col>
         <Alert color="danger">
         <FontAwesomeIcon icon={faJournalWhills} />
            
            <Col>
                Tambah Cabnag Pegawai untuk menambahkan Cabang & Setting Atasan di Cabang yang dibuat
            </Col>
        </Alert>
        <Alert color="info">
         <FontAwesomeIcon icon={faJournalWhills} />
            <Col>
                Manfaatkan kolom search untuk mencari nama Cabang
            </Col>
            <Col>
                Data Cabang bisa diurutkan sesuai table yang kamu inginkan, cukup icon klik arah panah keatas dan kebawah pada table
            </Col>
        </Alert>
      </Col>
    </Row>
  );
}; 

export default InfoHomeCabang;