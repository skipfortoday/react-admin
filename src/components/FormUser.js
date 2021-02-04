import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from "react-redux";
import { FormGroup, Col, Label, Input, Row, Button} from "reactstrap";
import AsyncVUser from "../validations/AsyncVUser";
import UserValidation from "../validations/UserValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";


const mapStateToProps = (state) => {
    return {
      initialValues : {
        UserID        : state.users.getUserDetail.UserID,
        Pass          : state.users.getUserDetail.Pass, 
        Nama          : state.users.getUserDetail.Nama,
        Alamat        : state.users.getUserDetail.Alamat,
          TglLahir      : state.users.getUserDetail.FTglLahir,
          HP            : state.users.getUserDetail.HP,
        TglMasuk      : state.users.getUserDetail.FTglMasuk,
          TglMulaiCuti  : state.users.getUserDetail.FTglMulaiCuti, 
        TglAwalKontrakPertama : state.users.getUserDetail.FTglAwalKontrakPertama, 
        GroupID       : state.users.getUserDetail.GroupID, 
        KodeCabang    : state.users.getUserDetail.KodeCabang,   
        Status          : state.users.getUserDetail.Status,   
        TampilkanLembur : state.users.getUserDetail.TampilkanLembur, 
        TampilkanTerlambat : state.users.getUserDetail.TampilkanTerlambat,
      }
    };
  };


const FormUser = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <div>
          <Field 
            name="UserID"
            component="input"
            type="text"
            placeholder="First Name"
          />
        </div>
      </div>
      <div>
        <label>Last Name</label>
        <div>
          <Field
            name="Nama"
            component="input"
            type="text"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div>
        <label>Email</label>
        <div>
          <Field
            name="email"
            component="input"
            type="email"
            placeholder="Email"
          />
        </div>
      </div>
      <div>
        <label>Sex</label>
        <div>
          <label>
            <Field name="sex" component="input" type="radio" value="male" />{' '}
            Male
          </label>
          <label>
            <Field name="sex" component="input" type="radio" value="female" />{' '}
            Female
          </label>
          <label>
            <Field name="sex" component="input" type="radio" value="other" />{' '}
            Other
          </label>
        </div>
      </div>
      <div>
        <label>Favorite Color</label>
        <div>
          <Field name="favoriteColor" component="select">
            <option />
            <option value="ff0000">Red</option>
            <option value="00ff00">Green</option>
            <option value="0000ff">Blue</option>
          </Field>
        </div>
      </div>
      <div>
        <label htmlFor="employed">Employed</label>
        <div>
          <Field
            name="employed"
            id="employed"
            component="input"
            type="checkbox"
          />
        </div>
      </div>
      <div>
        <label>Notes</label>
        <div>
          <Field name="notes" component="textarea" />
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
    form: 'UserForm' // a unique identifier for this form
  })(FormUser)
  