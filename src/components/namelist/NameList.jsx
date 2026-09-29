import {useEffect, useRef, useState} from 'react';
import {Col, Form, Row} from 'react-bootstrap';
import {PersonPlusFill} from 'react-bootstrap-icons';

import NameListEntry from './NameListEntry';
import ControlButtons from './ControlButtons';


const NameList = ({names, dispatch}) => {

  // API

  const listDispatcher = action => {
    const changedNames = [...names];
    switch (action.type) {
      case "ADD":
        dispatch({type: "NAMES", payload: [...names, ""]});
        setFocusIndex(names.length);
        break;
      case "CHANGE":
        changedNames[action.index] = action.payload;
        dispatch({type: "NAMES", payload: changedNames});
        break;
      case "REMOVE_LAST":
        action.index = names.length - 1;
      // eslint-disable-next-line no-fallthrough
      case "REMOVE":
        if (names.length === 1) {
          dispatch({type: "NAMES", payload: [""]});
          break;
        }
        changedNames.splice(action.index, 1);
        dispatch({type: "NAMES", payload: changedNames});
        break;
      case "CLEAR":
        dispatch({type: "NAMES", payload: [""]});
        break;
      case "NAVIGATION":
        handleListNav(action.index, action.payload);
        break;
      default:
    }
  }


  // NAVIGATION & FOCUS

  // index of row to focus after render or -1 to not change the focus
  const [focusIndex, setFocusIndex] = useState(-1);
  // reference to the DOM form containing the rows
  const listForm = useRef(null);

  // set the focus to the specified index after rendering
  useEffect(() => {
    if (focusIndex < 0) return;
    const listElement = listForm.current.querySelectorAll('input')[focusIndex];
    listElement.focus();
    listElement.selectionStart = listElement.value.length;
    listElement.selectionEnd = listElement.value.length;
    setFocusIndex(-1);
  }, [focusIndex]);

  /* handle key input for navigation:
   * - Arrows up and down to switch between rows
   * - Enter goes one row down or adds a new one
   * - Backslash in an empty row deletes it
   */
  const handleListNav = (index, e) => {
    if (e.key === "Enter" && index === names.length - 1) {
      listDispatcher({type: "ADD"});
    } else if (e.key === "Enter") {
      setFocusIndex(index + 1);
    } else if (e.key === "ArrowUp" && index > 0) {
      setFocusIndex(index - 1);
    } else if (e.key === "ArrowDown" && index < names.length -1) {
      setFocusIndex(index + 1);
    } else if (e.key === "Backspace" && e.target.value.length === 0) {
      if (names.length > 1) {
        listDispatcher({type: "REMOVE", index})
        setFocusIndex(index - 1);
      }
    }
  }


  // HTML

  const heading = (
    <h2>
      <PersonPlusFill className="pr-1"/>
      Mitspieler
    </h2>
  );

  const nameEntries = names.map((name, index) =>
    <NameListEntry key={index} name={name} index={index} dispatch={listDispatcher} />
  );

  return (
    <div>
      { heading }
      <Form ref={listForm}>{ nameEntries }</Form>
      <Row>
        {/* className="m-2" */ }
        <Col style={{ color: 'grey' }}>
          Spieler: {names.filter(n => n.length > 0).length}
        </Col>
        <Col>
          <ControlButtons dispatch={listDispatcher} />
        </Col>
      </Row>
    </div>
  );
}

export default NameList;
