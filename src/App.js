import React, { Component } from 'react'
import JumbotronCmp from './components/JumbotronCmp'
import NavbarCmp from './components/NavbarCmp'

export default class App extends Component {
  state = {
    title: "Rizqi test"
  }

  render() {
    return (
      <div>
        <NavbarCmp/>
        <JumbotronCmp title={this.state.title}/>
      </div>
    )
  }
}
