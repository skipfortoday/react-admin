import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import NavbarComponent from '../components/NavbarComponent'

const mapStateToProps = (state) => {
    return {

    }
}

class ProsesWFH extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){

    }

    componentDidUpdate(){
        
    }

    render() {
        return (
            <div>
                <NavbarComponent />
                <div className="p-2">
                    <h4 className="">Data Absen WFH</h4>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(ProsesWFH)
