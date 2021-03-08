import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

//import {Container, Row, Col} from 'react-bootstrap';
import React from 'react';
import NameList from './NameList';
import Roles from './Roles';

function App() {
  return (
    <div>
      <NameList />
      <Roles/>
    </div>
  )
  //return (<Container><Row><Col><NameList /></Col><Col/></Row></Container>);
}

export default App;
