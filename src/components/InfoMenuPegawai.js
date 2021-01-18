import React from "react";
import { Row, Col, Alert} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJournalWhills } from "@fortawesome/free-solid-svg-icons";

const InfoMenuPegawai = () => {
  return (
    <Row className="mb-12">
      <Col>
         <Alert color="danger">
         <FontAwesomeIcon icon={faJournalWhills} />
            
            <Col>
                Role : Di isi angka sesuai level di Menu Role
            </Col>
            <Col>
                PIN Password : Di isi password angka MAX 6 dijit
            </Col>
        </Alert>
        <Alert color="info">
         <FontAwesomeIcon icon={faJournalWhills} />
            <Col>
                 Role : Kode Level Pegawai yang berfungsi sebagai notifikasi atasan untuk Izin dan Scan (Detail Di Menu Role)
            </Col>
            <Col>
                GroupID : Kode Group untuk menentukan Jabatan / Departemen Karyawan (Detail Di Menu Grup Pegawai)
            </Col>
            <Col>
                Kode Cabang : Kode Cabang untuk menentukan Tempat Kerja pegawai tersebut (Detail Di Menu Cabang)
            </Col>
        </Alert>
      </Col>
    </Row>
  );
}; 

export default InfoMenuPegawai;