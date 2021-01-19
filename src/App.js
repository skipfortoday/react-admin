import React, { Component } from "react";
import NavbarComponent from "./components/NavbarComponent";

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
import CreateIzinContainer from "./containers/CreateIzinContainer";
import EditIzinContainer from "./containers/EditIzinContainer";
import DetailIzinContainer from "./containers/DetailIzinContainer";
import DetailLaporanContainer from "./containers/DetailLaporanContainer";
import LaporanContainer from "./containers/LaporanContainer";


export default class App extends Component {
  render() {
    return (
      <div>
        <NavbarComponent />
        <BrowserRouter>
          <Route path="/" exact component={HomeContainer} />

          <Route path="/create" exact component={CreateUserContainer} />

          <Route path="/detail/:UserID" exact component={DetailUserContainer} />

          <Route path="/edit/:UserID" exact component={EditUserContainer} />

          <Route path="/laporan/:UserID" exact component={LaporanContainer} />

          <Route path="/laporan/:UserID:TglIn:TglOut" exact component={DetailLaporanContainer} />

          <Route path="/group" exact component={GroupContainer} />

          <Route path="/group/create" exact component={CreateGroupContainer} />

          <Route path="/group/detail/:GroupID" exact component={DetailGroupContainer} />

          <Route path="/group/edit/:GroupID" exact component={EditGroupContainer} />

          <Route path="/izin" exact component={IzinContainer} />

          <Route path="/izin/create" exact component={CreateIzinContainer} />

          <Route path="/izin/detail/:DatangID" exact component={DetailIzinContainer} />

          <Route path="/izin/edit/:DatangID" exact component={EditIzinContainer} />

        </BrowserRouter>
      </div>
    );
  }
}
