import React, { useReducer,createContext } from "react";
import { BrowserRouter, Route , Switch } from "react-router-dom";
import HomeContainer from "./containers/HomeContainer";
import CreateUserContainer from "./containers/CreateUserContainer";
import EditUserContainer from "./containers/EditUserContainer";
import DetailUserContainer from "./containers/DetailUserContainer";
import GroupContainer from "./containers/GroupContainer";
import CreateGroupContainer from "./containers/CreateGroupContainer";
import EditGroupContainer from "./containers/EditGroupContainer";
import TerlambatBertingkatContainer from "./containers/TerlambatBertingkatContainer";
import EditTerlambatBertingkatContainer from "./containers/EditTerlambatBertingkatContainer";
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
import AbsensiManualContainer2 from "./containers/AbsensiManualContainer2";
import AbsensiManualContainerPulang from "./containers/AbsensiManualContainerPulang";
import AbsensiManualContainerIstLuar from "./containers/AbsensiManualContainerIstLuar";
import AbsensiManualContainerIstKembali from "./containers/AbsensiManualContainerIstKembali";
import AbsensiManualContainerKeluarKantor from "./containers/AbsensiManualContainerKeluarKantor";
import AbsensiManualContainerKembaliKantor from "./containers/AbsensiManualContainerKembaliKantor";
import AbsensiManualContainerPulang2 from "./containers/AbsensiManualContainerPulang2";
import AbsensiManualContainerIstLuar2 from "./containers/AbsensiManualContainerIstLuar2";
import AbsensiManualContainerIstKembali2 from "./containers/AbsensiManualContainerIstKembali2";
import AbsensiManualContainerKeluarKantor2 from "./containers/AbsensiManualContainerKeluarKantor2";
import AbsensiManualContainerKembaliKantor2 from "./containers/AbsensiManualContainerKembaliKantor2";



//Context
export const AuthContext = createContext()

//Inisiasi state
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  tokenExpires: 0,
  role: 0
}

const reducer = (state, action) => {
  switch(action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user))
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        role: action.payload.role
      }
    case "LOGOUT":
      localStorage.clear()
      return {
        ...state,
        isAuthenticated: false,
        user: null
      }
    
    default:
      return state
  }
}


function App () {
  const [state, dispatch] = useReducer(reducer, initialState)
    
    return (
        <BrowserRouter>
          <Switch>
        <AuthContext.Provider value={{
          state,
          dispatch
        }}>
          
          <Route path="/" exact component={HomeContainer} />

          <Route path="/login" exact component={LoginContainer} />

          <Route path="/create" exact component={CreateUserContainer} />

          <Route path="/detail/:UserID" exact component={DetailUserContainer} />

          <Route path="/edit/:UserID" exact component={EditUserContainer} />

          <Route path="/laporan" exact component={ListLaporanContainer} />

          <Route path="/laporandetail/:UserID/:TglAwal/:TglAkhir" exact component={LaporanDetailContainer} />

          <Route path="/laporanguest" exact component={LaporanGuestContainer} />

          <Route path="/laporandetailguest/:UserID/:TglAwal/:TglAkhir" exact component={LaporanDetailGuestContainer} />

          <Route path="/group" exact component={GroupContainer} />

          <Route path="/group/create/" exact component={CreateGroupContainer} />

          <Route path="/group/detail/:GroupID" exact component={DetailGroupContainer} />

          <Route path="/group/edit/:GroupID" exact component={EditGroupContainer} />

          <Route path="/group/terlambatbertingkat/:GroupID" exact component={TerlambatBertingkatContainer} />

          <Route path="/group/terlambatbertingkat/:GroupID/:RuleTerlambatBertingkatID" exact component={EditTerlambatBertingkatContainer} />

          <Route path="/izin" exact component={IzinContainer} />

          <Route path="/izin/list" exact component={ListUserIzinContainer} />

          <Route path="/izin/create/:UserID/:TglAwal/:TglAkhir" exact component={CreateIzinContainer} />

          <Route path="/izin/group" exact component={CreateIzinGroup} />

          <Route path="/izin/detail/:DatangID" exact component={DetailIzinContainer} />

          <Route path="/izin/edit/:DatangID" exact component={EditIzinContainer} />

          <Route path="/cabang" exact component={CabangContainer} />

          <Route path="/cabang/create" exact component={CreateCabangContainer} />

          <Route path="/cabang/detail/:KodeCabang" exact component={DetailCabangContainer} />

          <Route path="/cabang/edit/:KodeCabang" exact component={EditCabangContainer} />

          <Route path="/superadmin" exact component={AdminContainer} />

          <Route path="/superadmin/create" exact component={CreateAdminContainer} />

          <Route path="/superadmin/edit/:AdminID" exact component={EditAdminContainer} />

          <Route path="/absensimanual" exact component={AbsensiManualContainer} />
          <Route path="/absensimanual/:id/:nama" exact component={AbsensiManualContainer2} />

          <Route path="/absensimanualpulang" exact component={AbsensiManualContainerPulang} />
          <Route path="/absensimanualpulang/:id/:nama" exact component={AbsensiManualContainerPulang2} />

          <Route path="/absensimanualistirahatkeluar" exact component={AbsensiManualContainerIstLuar} />
          <Route path="/absensimanualistirahatkeluar/:id/:nama" exact component={AbsensiManualContainerIstLuar2} />

          <Route path="/absensimanualistirahatkembali" exact component={AbsensiManualContainerIstKembali} />
          <Route path="/absensimanualistirahatkembali/:id/:nama" exact component={AbsensiManualContainerIstKembali2} />

          <Route path="/absensimanualkeluarkantor" exact component={AbsensiManualContainerKeluarKantor} />
          <Route path="/absensimanualkeluarkantor/:id/:nama" exact component={AbsensiManualContainerKeluarKantor2} />

          <Route path="/absensimanualkembalikantor" exact component={AbsensiManualContainerKembaliKantor} />
          <Route path="/absensimanualkembalikantor/:id/:nama" exact component={AbsensiManualContainerKembaliKantor2} />

          <Route path="/home" exact component={LandingPageContainer} />

          </AuthContext.Provider>
          </Switch>
        </BrowserRouter>

    );
  
}
export default App;