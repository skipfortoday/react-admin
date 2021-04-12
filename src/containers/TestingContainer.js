import React, { Component } from 'react'
import { connect, Provider, } from 'react-redux'
import { Button } from 'reactstrap'
import { reduxForm, Field, change, } from 'redux-form'
import { InputFieldComponent } from '../components/formController/InputFieldComponent'
import {bindActionCreators} from 'redux'

class TestingContainer extends Component {
    handleClick(){
        this.props.change('nama', "newValue")
        // console.log(this.props);
    }

    render() {
        return (
            <div>
                <Field 
                    name="nama"
                    component={InputFieldComponent}
                    type="text"
                    label="Nama : "
                />
                <Button onClick={this.handleClick}>TEST</Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        initialValues: {
            nama: "also"
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({change}, dispatch);
}



TestingContainer = reduxForm({
    form: "formTesting",
    //validate: IzinValidation,
    enableReinitialize: true,
})(TestingContainer);

export default connect(
    mapStateToProps, 
    mapDispatchToProps
) (TestingContainer)