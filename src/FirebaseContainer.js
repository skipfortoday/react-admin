import React, { Component } from 'react';
import firebase from './firebase';

export default class FirebaseContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            fullname: null,
            email: null,
            photo: null,
            isLoading: null,
            
        }
    } 
    
    componentDidMount() {
        firebase.database().ref('/tcard')
            .on('value', snapshot => {
                const data = snapshot.val();
                console.log(data)
                // this.setState({ data: data, isLoading: false });
            });
    }

    render() {
        const { data, isLoading } = this.state;
        return (
            <div>
                <center>
                    <br /><br /><br />
                    <h3>List Member</h3>
                    {/* Table List Member */}
                </center>
            </div>
        );
    }
}