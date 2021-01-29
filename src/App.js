import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import HomeContainer from "./containers/HomeContainer";
import CreateUserContainer from "./containers/CreateUserContainer";
import EditUserContainer from "./containers/EditUserContainer";
import DetailUserContainer from "./containers/DetailUserContainer";
import GroupContainer from "./containers/GroupContainer";
import CreateGroupContainer from "./containers/CreateGroupContainer";
import EditGroupContainer from "./containers/EditGroupContainer";
import DetailGroupContainer from "./containers/DetailGroupContainer";
import IzinContainer from "./containers/IzinContainer";
import ListUserIzinContainer from "./containers/ListUserIzinContainer";
import CreateIzinContainer from "./containers/CreateIzinContainer";
import CreateIzinGroup from "./containers/CreateIzinGroup";
import EditIzinContainer from "./containers/EditIzinContainer";
import DetailIzinContainer from "./containers/DetailIzinContainer";
import LaporanContainer from "./containers/LaporanContainer";
import ListLaporanContainer from "./containers/ListLaporanContainer";
import CabangContainer from "./containers/CabangContainer";
import CreateCabangContainer from "./containers/CreateCabangContainer";
import EditCabangContainer from "./containers/EditCabangContainer";
import DetailCabangContainer from "./containers/DetailCabangContainer";


export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
      
          <Route path="/" exact component={HomeContainer} />

          <Route path="/create" exact component={CreateUserContainer} />

          <Route path="/detail/:UserID" exact component={DetailUserContainer} />

          <Route path="/edit/:UserID" exact component={EditUserContainer} />

          <Route path="/laporan" exact component={ListLaporanContainer} />

          <Route path="/laporan/:UserID" exact component={LaporanContainer} />

          <Route path="/group" exact component={GroupContainer} />

          <Route path="/group/create" exact component={CreateGroupContainer} />

          <Route path="/group/detail/:GroupID" exact component={DetailGroupContainer} />

          <Route path="/group/edit/:GroupID" exact component={EditGroupContainer} />

          <Route path="/izin" exact component={IzinContainer} />

          <Route path="/izin/list" exact component={ListUserIzinContainer} />

          <Route path="/izin/create/:DatangID" exact component={CreateIzinContainer} />

          <Route path="/izin/group" exact component={CreateIzinGroup} />

          <Route path="/izin/detail/:DatangID" exact component={DetailIzinContainer} />

          <Route path="/izin/edit/:DatangID" exact component={EditIzinContainer} />

          <Route path="/cabang" exact component={CabangContainer} />

          <Route path="/cabang/create" exact component={CreateCabangContainer} />

          <Route path="/cabang/detail/:KodeCabang" exact component={DetailCabangContainer} />

          <Route path="/cabang/edit/:KodeCabang" exact component={EditCabangContainer} />

        </BrowserRouter>
      </div>
    );
  }
}
