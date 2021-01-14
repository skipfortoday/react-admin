import React, { Component } from "react";
import NavbarComponent from "./components/NavbarComponent";
import JumbotronComponent from "./components/JumbotronComponent";
import { BrowserRouter, Route } from "react-router-dom";
import HomeContainer from "./containers/HomeContainer";
import CreateUserContainer from "./containers/CreateUserContainer";
import EditUserContainer from "./containers/EditUserContainer";
import DetailUserContainer from "./containers/DetailUserContainer";
import JamKerjaContainer from "./containers/JamKerjaContainer";

export default class App extends Component {
  render() {
    return (
      <div>
        <NavbarComponent />
        <JumbotronComponent />
        <BrowserRouter>
          <Route path="/" exact component={HomeContainer} />

          <Route path="/create" exact component={CreateUserContainer} />

          <Route path="/detail/:UserID" exact component={DetailUserContainer} />

          <Route path="/edit/:UserID" exact component={EditUserContainer} />

          <Route path="/jamkerja" exact component={JamKerjaContainer} />

          <Route path="/jamkerja/create" exact component={JamKerjaContainer} />

          <Route path="/jamkerja/detail/:shift" exact component={JamKerjaContainer} />

          <Route path="/jamkerja/edit/:shift" exact component={JamKerjaContainer} />

        </BrowserRouter>
      </div>
    );
  }
}
