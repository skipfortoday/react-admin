import React from "react";
import { Row, Col, Alert} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJournalWhills } from "@fortawesome/free-solid-svg-icons";

const InfoMenuGroup = () => {
  return (
    <Row className="mb-12">
      <Col>
         <Alert color="primary">
         <FontAwesomeIcon icon={faJournalWhills} />
            
            <Col>
                Max Jam Datang : Jam Maximal yang ditoleransi untuk datang (Belum dianggap terlambat)
            </Col>
            <Col>
                Min Jam Lembur : Jam Minimal yang bisa dihitung lembur 
            </Col>
        </Alert>
        <Alert color="info">
         <FontAwesomeIcon icon={faJournalWhills} />
            <Col>
                Potongan Tidak Masuk : Rupiah potongan perhari untuk karyawan yang tidak masuk 
            </Col>
            <Col>
                Potongan Terlambat : Rupiah potongan untuk karyawan yang terlambat perhari
            </Col>
            <Col>
                Lembur Perjam : Rupiah lembur untuk hitungan perjam karyawan lembur
            </Col>
        </Alert>
      </Col>
    </Row>
  );
}; 

export default InfoMenuGroup;