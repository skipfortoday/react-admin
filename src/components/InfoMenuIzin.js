import React from "react";
import { Row, Col, Alert} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJournalWhills } from "@fortawesome/free-solid-svg-icons";

const InfoMenuIzin = () => {
  return (
    <Row className="mb-12">
      <Col>
         <Alert color="danger">
         <FontAwesomeIcon icon={faJournalWhills} />
            
            <Col>
                Status : Memilih Status Sesuai Kategori Cuti,Libur Bersama, Izin,
            </Col>
            <Col>
                Tanggal Mulai Dan Tanggal Akhir wajib di isi
            </Col>
        </Alert>
        <Alert color="info">
         <FontAwesomeIcon icon={faJournalWhills} />
            <Col>
                 Nama : Bisa Memilih untuk Izin Perorang
            </Col>
            <Col>
                Group : Bisa Memilih Izin untuk seluruh anggota Group|
            </Col>
            <Col>
                 Cabang : Bisa memilih Izin Untuk seluruh anggota Cabang
            </Col>
        </Alert>
      </Col>
    </Row>
  );
}; 

export default InfoMenuIzin;