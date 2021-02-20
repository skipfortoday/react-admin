import React, { Component } from "react";
import { Container, Alert, Col, Row } from "reactstrap";
import BackIzin from "../components/BackIzin";
import FormIzinComponent from "../components/FormIzinComponent";
import { connect } from "react-redux";
import { getIzinDetail, postIzinCreate } from "../actions/izinAction";
import swal from "sweetalert";
import NavbarComponent from "../components/NavbarComponent";
import LengkapiAbsenButton from "../components/LengkapiAbsenButton";
import { getOptUser } from "../actions/optAction";
import LengkapiAbsen from "../components/LengkapiAbsen";
import LaporanDetail from "../components/LaporanDetail";
import { getLaporanDetail , getLaporanRekap} from "../actions/laporanAction";
import { getUserDetail} from "../actions/userAction";

const mapStateToProps = (state) => {
  return {
    getResponDataIzin: state.Izin.getResponDataIzin,
    errorResponDataIzin: state.Izin.errorResponDataIzin,
  };
};

class CreateIzinContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getOptUser());
    this.props.dispatch(getIzinDetail(this.props.match.params.UserID));;
    this.props.dispatch(
      getLaporanDetail(
        this.props.match.params.UserID,
        this.props.match.params.TglAwal,
        this.props.match.params.TglAkhir
      )
    );
    this.props.dispatch(
      getLaporanRekap(
        this.props.match.params.UserID,
        this.props.match.params.TglAwal,
        this.props.match.params.TglAkhir
      )
    );
    this.props.dispatch(getUserDetail(this.props.match.params.UserID));
  }

  handleSubmit(data) {
    this.props.dispatch(postIzinCreate(data));
  }

  render() {
    if (this.props.getResponDataIzin || this.props.errorResponDataIzin) {
      if (this.props.errorResponDataIzin) {
        swal("Failed!", this.props.errorResponDataIzin, "error");
      } else {
        swal(
          "Izin Created!",
          " | ID : " +
            this.props.getResponDataIzin.UserID +
            "  |  Tanggal :  " +
            this.props.getResponDataIzin.TanggalScan +
            "  |   Status :  " +
            this.props.getResponDataIzin.Status +
            "  |  Keterangan :       " +
            this.props.getResponDataIzin.Keterangan,
          "success"
        );
      }
    }
    return (
      <Container>
        <NavbarComponent />
        <Row>
          <Col md={1}>
            <BackIzin />
          </Col>
          <Col md={11}>
            <Alert color="info">
              <h4>Menu Lengkapi Absen</h4>
            </Alert>
          </Col>
        </Row>
        <Row>
        <Col md={1}>
          </Col>
        <Col md={9}>
        <Alert color="info">
            <LengkapiAbsen />
            </Alert>
          </Col>
          <Col md={1}>
            <LengkapiAbsenButton />
          </Col>
        </Row>
        <Alert color="info">
        <FormIzinComponent onSubmit={(data) => this.handleSubmit(data)} />
        </Alert>
        <Alert color="info"></Alert>
        <LaporanDetail/>
        <Alert color="info"></Alert>
      </Container>
    );
  }
}

export default connect(mapStateToProps, null)(CreateIzinContainer);
