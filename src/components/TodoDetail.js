import React from 'react';
import BackIcon from '../icons/backIcon.svg';

import '../App.css';

const NOOP = () => {};

const ToDoDetailPage = ({ 
  navigateToLanding = NOOP,
  saveOnClick = NOOP,
  title = '',
  setTitle = NOOP
}) => {
  return (
    <>
      <div className="modifyContainer">
        <div className="leftHeader">
          <div className="cancel" onClick={() => {
            navigateToLanding();
            setTitle('');
          }}>
            <img src={BackIcon} alt="" className="backIcon" />
            <div className="createText">Cancel</div>
          </div>
            <div className="done" onClick={() => saveOnClick(title)}>
            <div className="createText">Done</div>
          </div>
        </div>
        <textarea className="textbox" value={title} placeholder= "List title" onChange={e => setTitle(e.target.value)}></textarea>
      </div>
    </>
  )
}

export default ToDoDetailPage;