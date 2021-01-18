import React from "react";
import { Row, Col, Alert} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJournalWhills } from "@fortawesome/free-solid-svg-icons";

const InfoHomePegawai = () => {
  return (
    <Row className="mb-12">
      <Col>
         <Alert color="danger">
         <FontAwesomeIcon icon={faJournalWhills} />
            
            <Col>
                Tombol Laporan untuk melihat detail scan karyawan dan mencetak laporan scan
            </Col>
        </Alert>
        <Alert color="info">
         <FontAwesomeIcon icon={faJournalWhills} />
            <Col>
                Manfaatkan kolom search untuk mencari nama karyawan
            </Col>
            <Col>
                Data karyawan bisa diurutkan sesuai table yang kamu inginkan, cukup icon klik arah panah keatas dan kebawah pada table
            </Col>
        </Alert>
      </Col>
    </Row>
  );
}; 

export default InfoHomePegawai;