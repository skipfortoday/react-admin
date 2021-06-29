import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch, useLocation } from "react-router-dom";
import HomeContainer from "./containers/HomeContainer";
import CreateUserContainer from "./containers/CreateUserContainer";
import EditUserContainer from "./containers/EditUserContainer";
import GroupContainer from "./containers/GroupContainer";
import CreateGroupContainer from "./containers/CreateGroupContainer";
import EditGroupContainer from "./containers/EditGroupContainer";
import TerlambatBertingkatContainer from "./containers/TerlambatBertingkatContainer";
import IzinContainer from "./containers/IzinContainer";
import ListUserIzinContainer from "./containers/ListUserIzinContainer";
import CreateIzinContainer from "./containers/CreateIzinContainer";
import CreateIzinGroup from "./containers/CreateIzinGroup";
import ListLaporanContainer from "./containers/ListLaporanContainer";
import CabangContainer from "./containers/CabangContainer";
import CreateCabangContainer from "./containers/CreateCabangContainer";
import EditCabangContainer from "./containers/EditCabangContainer";
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
import KelengkapanAbsenContainer from "./containers/KelengkapanAbsenContainer";
import SetConfig from "./containers/SetConfig";
import PengumumanContainer from "./containers/PengumumanContainer";
import PengumumanCreateContainer from "./containers/PengumumanDetailContainer";
import PengumumanEditContainer from "./containers/PengumumanEditContainer";
import PengumumanDetailContainer from "./containers/PengumumanDetailContainer";
import GroupDetailContainer from "./containers/GroupDetailContainer";
import ScrollIntoView from "./components/ScrollIntoView";
import FaceScanContainer from "./containers/FaceScanContainer";
import FingerprintContainer from "./containers/FingerprintContainer";
import FPEnrollmentContainer from "./containers/FPEnrollmentContainer";
import LocaldbPegawaiContainer from "./containers/LocaldbPegawaiContainer";
import TutupPeriodeContainer from "./containers/TutupPeriodeContainer";

const mapStateToProps = (state) => {
    return {
        errorUsersList: state.users.errorUsersList,
    };
};

class App extends Component {
    constructor(props) {
        super(props);
        let lokasi = location.href.split('/')[location.href.split('/').length - 1].toLocaleLowerCase();
        let config = JSON.parse(localStorage.getItem('config'));
        if (!config && lokasi != 'setconfig') {
            window.location.href = '/setconfig';
            return;
        }

    }

    render() {

        return (
            <BrowserRouter>
                <ScrollIntoView>
                    <Switch>
                        <Route path="/" exact component={HomeContainer}>
                            {this.props.errorUsersList ? (
                                <Redirect to="/home" />
                            ) : (
                                <HomeContainer />
                            )}
                        </Route>
                        {/* <Route path="/firebase" exact component={FirebaseContainer} /> */}
                        
                        <Route path="/fingerprint" exact component={FingerprintContainer} />
                        
                        <Route path="/enrollfp/:UserID" exact component={FPEnrollmentContainer} />

                        <Route path="/setconfig" exact component={SetConfig} />
                        
                        <Route path="/face-scan" exact component={FaceScanContainer} />
                        
                        <Route path="/login" exact component={LoginContainer} />

                        <Route path="/create" exact component={CreateUserContainer} />

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
                            path="/group/edit/:GroupID"
                            exact
                            component={EditGroupContainer}
                        />
                        <Route
                            path="/group/view/:GroupID"
                            exact
                            component={GroupDetailContainer}
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

                        <Route path="/cabang" exact component={CabangContainer} />

                        <Route
                            path="/cabang/create"
                            exact
                            component={CreateCabangContainer}
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

                        <Route path="/kelengkapanabsensi" exact component={KelengkapanAbsenContainer} />
                        <Route path="/home" exact component={LandingPageContainer} />

                        <Route path="/history" exact component={HistoryContainer} />
                        <Route path="/pengumuman" exact component={PengumumanContainer} />
                        <Route path="/pengumuman/create" exact component={PengumumanEditContainer} />
                        <Route path="/pengumuman/edit/:id" exact component={PengumumanEditContainer} />
                        <Route path="/pengumuman/view/:id" exact component={PengumumanDetailContainer} />
                    
                        <Route path="/localdb/pegawai" exact component={LocaldbPegawaiContainer} />
                        <Route path="/tutup-periode" exact component={TutupPeriodeContainer} />

                    </Switch>
                </ScrollIntoView>
            </BrowserRouter>
        );
    }
}
export default connect(mapStateToProps, null)(App);