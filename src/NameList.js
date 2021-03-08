import {Button, InputGroup, Form, Row, Col, ButtonGroup} from 'react-bootstrap';
import React, {useEffect, useRef, useState} from 'react';
import {X, PlusSquare, DashSquare, Trash, PersonPlusFill} from 'react-bootstrap-icons';

const NameList = () => {

  const [names, setNames] = useState([""]);
  const [focusIndex, setFocusIndex] = useState(-1);
  const listForm = useRef(null);

  useEffect(() => {
    if (focusIndex < 0) return;
    const listElement = listForm.current.elements[focusIndex * 2];
    listElement.focus();
    listElement.selectionStart = listElement.textLength;
    listElement.selectionEnd = listElement.textLength;
    setFocusIndex(-1);
  }, [focusIndex]);

  const addEntry = () => {
    const newNames = [...names, ""];
    setNames(newNames);
    setFocusIndex(newNames.length - 1);
  }
  const handleListNav = (e, index) => {
    if (e.keyCode === 13 && index === names.length - 1) {
      addEntry();
    } else if (e.keyCode === 13) {
      setFocusIndex(index + 1);
    } else if (e.keyCode === 38 && index > 0) {
      setFocusIndex(index - 1);
      // const target = e.target.form.elements[index * 2 - 2]
      // target.focus();
      // target.selectionStart = target.textLength;
      // target.selectionEnd = target.textLength;
    } else if (e.keyCode === 40 && index < names.length -1) {
      setFocusIndex(index + 1);
      //const target = e.target.form.elements[index * 2 + 2];
      // target.focus();
      // target.selectionStart = target.value.length;
      // target.selectionEnd = target.value.length;
    } else if (e.keyCode === 8 && e.target.textLength === 0) {
      if (index > 0) {
        removeEntry(index);
        setFocusIndex(index - 1);
      }
    }
  }
  const changeName = (index, name) => {
    const newNames = [...names];
    newNames[index] = name;
    setNames(newNames);
  }
  const removeEntry = (index) => {
    if (names.length === 1) {
      setNames([""]);
      return;
    }
    const newNames = [...names];
    newNames.splice(index, 1)
    setNames(newNames);
  };

  return (
    <div>
      <h2 className="p-2">
        <PersonPlusFill className="pr-1"/>
        Mitspieler
      </h2>
      <Form ref={listForm}> {
        names.map((name, index) =>
          <InputGroup key={index} className="pl-2 pt-1">
            <Form.Control onKeyDown={(e) => handleListNav(e, index)} key={index} type="text" onChange={e => changeName(index, e.target.value)} value={name} />
            <Button variant="link" onClick={e => removeEntry(index)}>
              <X color="grey" />
            </Button>
          </InputGroup>
        )
      } </Form>
      <Row>
        <Col className="m-2" style={{ color: 'grey' }}>Spieler: {names.filter(n => n.length > 0).length}</Col>
        <Col>
          <ButtonGroup style={{float: 'right'}}>
            <Button variant="link" onClick={_ => removeEntry(names.length - 1)}>
              <DashSquare color="grey" width="24" height="24" />
            </Button>
            <Button variant="link" onClick={addEntry}>
              <PlusSquare color="grey" width="24" height="24" />
            </Button>
            <Button variant="link" onClick={_ => setNames([""])}>
              <Trash color="red" width="16" height="16" />
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </div>
  );
}

export default NameList;
