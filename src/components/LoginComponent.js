import React from 'react';
import { Form, FormGroup, Label, Input, FormFeedback, FormText , Card, Button, CardTitle, CardText } from 'reactstrap';
import printJS from 'print-js';

const LoginComponent = (props) => {
  return (
    <printJS>

    <Card body inverse color="info">
    <CardTitle tag="h5">L'Viors Attandace System,</CardTitle>
    <CardText>Silahkan login untuk akses web Admin</CardText>
    <Form>
      <FormGroup method="post" action="#" >
        <Label for="exampleEmail">Username</Label>
        <Input type="email" name="email"  placeholder="Masukan Username" />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input type="password" name="password" placeholder="Masukkan Password" />
      </FormGroup>
    </Form>
    <Button color="secondary" type="button" onclick="printJS('/logo-lviors-hitam.png', 'image')">Login</Button>
  </Card>
  </printJS>
 


  );
}

export default LoginComponent;