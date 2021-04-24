import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import HomeContainer from "./containers/HomeContainer";
import CreateUserContainer from "./containers/CreateUserContainer";
import EditUserContainer from "./containers/EditUserContainer";
import DetailUserContainer from "./containers/DetailUserContainer";
import GroupContainer from "./containers/GroupContainer";
import CreateGroupContainer from "./containers/CreateGroupContainer";
import EditGroupContainer from "./containers/EditGroupContainer";
import TerlambatBertingkatContainer from "./containers/TerlambatBertingkatContainer";
import DetailGroupContainer from "./containers/DetailGroupContainer";
import IzinContainer from "./containers/IzinContainer";
import ListUserIzinContainer from "./containers/ListUserIzinContainer";
import CreateIzinContainer from "./containers/CreateIzinContainer";
import CreateIzinGroup from "./containers/CreateIzinGroup";
import EditIzinContainer from "./containers/EditIzinContainer";
import DetailIzinContainer from "./containers/DetailIzinContainer";
import ListLaporanContainer from "./containers/ListLaporanContainer";
import CabangContainer from "./containers/CabangContainer";
import CreateCabangContainer from "./containers/CreateCabangContainer";
import EditCabangContainer from "./containers/EditCabangContainer";
import DetailCabangContainer from "./containers/DetailCabangContainer";
import LaporanDetailContainer from "./containers/LaporanDetailContainer";
import LoginContainer from "./containers/LoginContainer";
import LandingPageContainer from "./containers/LandingPageContainer";
import LaporanDetailGuestContainer from "./containers/LaporanDetailGuestContainer";
import LaporanGuestContainer from "./containers/LaporanGuestContainer";
import AdminContainer from "./containers/AdminContainer";
import CreateAdminContainer from "./containers/CreateAdminContainer";
import EditAdminContainer from "./containers/EditAdminContainer";
import AbsensiManualContainer from "./containers/AbsensiManualContainer";
import AbsensiManualContainerPulang from "./containers/AbsensiManualContainerPulang";
import AbsensiManualContainerIstLuar from "./containers/AbsensiManualContainerIstLuar";
import AbsensiManualContainerIstKembali from "./containers/AbsensiManualContainerIstKembali";
import AbsensiManualContainerKeluarKantor from "./containers/AbsensiManualContainerKeluarKantor";
import AbsensiManualContainerKembaliKantor from "./containers/AbsensiManualContainerKembaliKantor";
import HistoryContainer from "./containers/HistoryContainer";
import TestingContainer from "./containers/TestingContainer";

const mapStateToProps = (state) => {
  return {
    errorUsersList: state.users.errorUsersList,
  };
};

class App extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     name: "React",
  //     isUserAuthenticated: true,
  //   };
  // }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* <Route
            exact
            path="/"
            render={() =>
              this.props.errorUsersList ? (
                <Redirect to="/home" />
              ) : (
                <Redirect to="/" />
              )
            }
          /> */}
          {/* <Route
            exact
            path="/"
            render={() => {
              return this.props.errorUsersList ? (
                <Redirect to="/home" />
              ) : (
               
              );
            }}
          /> */}

          <Route path="/testing" exact component={TestingContainer} />
          <Route path="/" exact component={HomeContainer} >
             {this.props.errorUsersList  ? <Redirect to="/home" /> : <HomeContainer />}
          </Route>

          <Route path="/login" exact component={LoginContainer} />

          <Route path="/create" exact component={CreateUserContainer} />

          <Route path="/detail/:UserID" exact component={DetailUserContainer} />

          <Route path="/edit/:UserID" exact component={EditUserContainer} />

          <Route path="/laporan" exact component={ListLaporanContainer} />

          <Route
            path="/laporandetail/:UserID/:TglAwal/:TglAkhir"
            exact
            component={LaporanDetailContainer}
          />

          <Route path="/laporanguest" exact component={LaporanGuestContainer} />

          <Route
            path="/laporandetailguest/:UserID/:TglAwal/:TglAkhir"
            exact
            component={LaporanDetailGuestContainer}
          />

          <Route path="/group" exact component={GroupContainer} />

          <Route path="/group/create/" exact component={CreateGroupContainer} />

          <Route
            path="/group/detail/:GroupID"
            exact
            component={DetailGroupContainer}
          />

          <Route
            path="/group/edit/:GroupID"
            exact
            component={EditGroupContainer}
          />

          <Route
            path="/group/terlambatbertingkat/:GroupID"
            exact
            component={TerlambatBertingkatContainer}
          />

          <Route
            path="/group/terlambatbertingkat"
            exact
            component={TerlambatBertingkatContainer}
          />

          {/* <Route path="/group/terlambatbertingkat/:GroupID/:RuleTerlambatBertingkatID" exact component={EditTerlambatBertingkatContainer} /> */}
          <Route
            path="/group/terlambatbertingkat/:GroupID/:RuleTerlambatBertingkatID"
            exact
            component={TerlambatBertingkatContainer}
          />

          <Route path="/izin" exact component={IzinContainer} />

          <Route path="/izin/list" exact component={ListUserIzinContainer} />

          <Route
            path="/izin/create/:UserID/:TglAwal/:TglAkhir"
            exact
            component={CreateIzinContainer}
          />

          <Route path="/izin/group" exact component={CreateIzinGroup} />

          <Route
            path="/izin/detail/:DatangID"
            exact
            component={DetailIzinContainer}
          />

          <Route
            path="/izin/edit/:DatangID"
            exact
            component={EditIzinContainer}
          />

          <Route path="/cabang" exact component={CabangContainer} />

          <Route
            path="/cabang/create"
            exact
            component={CreateCabangContainer}
          />

          <Route
            path="/cabang/detail/:KodeCabang"
            exact
            component={DetailCabangContainer}
          />

          <Route
            path="/cabang/edit/:KodeCabang"
            exact
            component={EditCabangContainer}
          />

          <Route path="/superadmin" exact component={AdminContainer} />

          <Route
            path="/superadmin/create"
            exact
            component={CreateAdminContainer}
          />

          <Route
            path="/superadmin/edit/:AdminID"
            exact
            component={EditAdminContainer}
          />

          <Route
            path="/absensimanual"
            exact
            component={AbsensiManualContainer}
          />
          <Route
            path="/absensimanualpulang"
            exact
            component={AbsensiManualContainerPulang}
          />

          <Route
            path="/absensimanualistirahatkeluar"
            exact
            component={AbsensiManualContainerIstLuar}
          />
          <Route
            path="/absensimanualistirahatkembali"
            exact
            component={AbsensiManualContainerIstKembali}
          />
          <Route
            path="/absensimanualkeluarkantor"
            exact
            component={AbsensiManualContainerKeluarKantor}
          />
          <Route
            path="/absensimanualkembalikantor"
            exact
            component={AbsensiManualContainerKembaliKantor}
          />

          <Route path="/home" exact component={LandingPageContainer} />

          <Route path="/history" exact component={HistoryContainer} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default connect(mapStateToProps, null)(App);
