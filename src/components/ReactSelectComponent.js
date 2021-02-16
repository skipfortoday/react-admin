import React from 'react'
import Select from 'react-select'

import { connect } from "react-redux";

const options = [
 { value: 'chocolate', label: 'Chocolate' },
 { value: 'strawberry', label: 'Strawberry' },
{ value: 'vanilla', label: 'Vanilla' }
]


  const ReactSelectComponent = () => (
    <Select options={options} />
  );

  export default(ReactSelectComponent);
