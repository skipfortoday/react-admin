import React from "react";
import { Row, Col, Alert} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJournalWhills } from "@fortawesome/free-solid-svg-icons";

const InfoHomeLaporan = () => {
  return (
    <Row className="mb-12">
      <Col>
        <Alert color="info">
         <FontAwesomeIcon icon={faJournalWhills} />
            <Col>
                Manfaatkan kolom search untuk mencari nama karyawan
            </Col>
            <Col>
                Data karyawan bisa diurutkan sesuai table yang kamu inginkan, cukup icon klik arah panah keatas dan kebawah pada table
            </Col>
            <Col>
                Pilih Tanggal Mulai Dan Akhir Untuk Filter Data Laporan yang akan Diambil
            </Col>
        </Alert>
      </Col>
    </Row>
  );
}; 

export default InfoHomeLaporan;