import React from "react";
import { Row, Col, Alert } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJournalWhills } from "@fortawesome/free-solid-svg-icons";

const RekapLaporan = () => {
  return (
    <Row className="mb-12">
      <Col>
        <Alert color="danger">
          <Row>Ijin Terlambat :</Row>
          <Row>Jumlah Terlambat :</Row>
          <Row>Ijin Teidak Masuk :</Row>
          <Row>Terlambat Kembali Istirahat :</Row>
          <Row>Total Potongan :</Row>
        </Alert>
      </Col>
      <Col>
        <Alert color="warning">
          <Row>Jumlah Sakit Bulan Ini :</Row>
          <Row>Jumlah Cuti Bulan Ini:</Row>
          <Row>Ijin Tidak Masuk :</Row>
          <Row>Total Tidak Masuk :</Row>
          <Row>Total Cuti Thn Ini:</Row>
          <Row>Sisa Cuti :</Row>
          <Row>Cuti Khusus Bulan Ini :</Row>
        </Alert>
      </Col>
      <Col>
        <Alert color="info">
          <Row>Jumlah Lembur :</Row>
          <Row>Total Lembur:</Row>
          <Row>Ijin Tidak Masuk :</Row>
          <Row>------</Row>
          <Row> </Row>
          <Row>OFF: </Row>
          <Row>Jml Masuk Kantor : </Row>
          <Row>Jml Dinas Luar :</Row>
        </Alert>
      </Col>
    </Row>
  );
};

export default RekapLaporan;
