import React from "react";
import { Row, Col, Alert} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJournalWhills } from "@fortawesome/free-solid-svg-icons";

const InfoMenuCabang = () => {
  return (
    <Row className="mb-12">
      <Col>
         <Alert color="danger">
         <FontAwesomeIcon icon={faJournalWhills} />
            
            <Col>
                GeneralManagerID : Di isi User ID Untuk Manager di Cabang tersebut 
            </Col>
            <Col>
                HRD Cabang : Di isi User ID Untuk HRD Di Cabang tersebut
            </Col>
        </Alert>
        <Alert color="info">
         <FontAwesomeIcon icon={faJournalWhills} />
            <Col>
                 GeneralManagerID : Posisi Tertinggi yang bisa memantau Scan Absen Karyawan dan Izin Karyawan
            </Col>
            <Col>
                HRD Cabang : Posisi HRD juga dapat memantau Scan Absen dan Izin Karyawan 
            </Col>
        </Alert>
      </Col>
    </Row>
  );
}; 

export default InfoMenuCabang;