import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import avatar from './icons/avatar.png';
import CreateIcon from './icons/createIcon.svg';
import BackIcon from './icons/backIcon.svg';
import EllipseIcon from './icons/ellipsesIcon.svg';
import DeleteIcon from './icons/deleteIcon.svg';
import EditIcon from './icons/editIcon.svg';
import PlusIcon from './icons/plusIcon.svg';
import {iconTest} from './logos.js';

function App() {
  const [todos, setTodos] = useState([]);
  const [isLanding, setIsLanding] = useState(true);
  const [title, setTitle] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);

  const refs = useRef([]);

  const clickOutside = (e) => {
    if(refs.current[selectedIdx].contains(e.target)){
      setShowDropdown(true);
      return;
    }
    setShowDropdown(false);
  }

  useEffect(() => {
    document.addEventListener('mousedown', clickOutside);

    return () => {
        document.removeEventListener('mousedown', clickOutside);
    }
  }, [selectedIdx]);

  const editToDo = (name, idx) => {
    setTitle(name);
    setSelectedIdx(idx);
    setIsLanding(false);
  }

  const deleteToDo = (selectedIdx) => {
    setTodos(todos.filter((todo, idx) => idx !== selectedIdx));
  }

  const RenderEmptyState = (props) => {
    console.log('empty', todos)
    return(
      <div onClick={() => props.setIsLanding(false)} className="Item-Container">
        <div className="createalist"> 
          Create a list
        </div> 
        <div className="plusLogo"><img src={PlusIcon}/></div>
      </div>
    )
  }

  const renderMainPage = () => {
    return (
      <div className="List-Container">
      <div className="Header-Container">
        <div className="Header-Title">
          <div>
            <img src={avatar} className="avatar"/>
          </div>
          <div className="Header-Text">
            <div>Lists</div>
          </div>
        </div>
        <div>
          <button className="createBtn" onClick={() => setIsLanding(false)}> 
            {/* <img src={CreateIcon} alt="Create Icon" /> */}
            <svg width="24" height="24" fill="current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.9828 1.89377C24.0094 2.91892 24.0094 4.58111 22.9828 5.60626L21.5766 7.0172L16.9828 2.42439L18.3938 1.01533C19.4203 -0.00999215 21.0797 -0.00999215 22.1063 1.01533L22.9828 1.89377ZM8.08125 11.3297L15.9234 3.4847L20.5172 8.07658L12.6703 15.9188C12.3844 16.2094 12.0328 16.425 11.6438 16.5563L7.48125 17.9438C7.03594 18.075 6.63281 17.9719 6.32813 17.6297C6.02813 17.3672 5.925 16.9219 6.05625 16.5188L7.44375 12.3563C7.575 11.9672 7.79063 11.6156 8.08125 11.3297ZM9 2.95783C9.82969 2.95783 10.5 3.67173 10.5 4.45783C10.5 5.3297 9.82969 5.95783 9 5.95783H4.5C3.67172 5.95783 3 6.67033 3 7.45783V19.5C3 20.3297 3.67172 21 4.5 21H16.5C17.3297 21 18 20.3297 18 19.5V14.9578C18 14.1703 18.6703 13.4578 19.5 13.4578C20.3297 13.4578 21 14.1703 21 14.9578V19.5C21 21.9844 18.9844 24 16.5 24H4.5C2.01469 24 0 21.9844 0 19.5V7.45783C0 4.97345 2.01469 2.95783 4.5 2.95783H9Z" />
            </svg>
          </button>
        </div>

      </div>
      <div>
        {todos.length < 1 ? (
          <>
            <RenderEmptyState setIsLanding={setIsLanding}/>
          </>
        ):(
          <div>
            {todos.map((todo, idx) => {
              return (
                <>
                  <div className="Item-Container">
                    <div className="Item-Title-Box">
                      {todo.name}
                    </div>
                    <div className="dropdown" onClick={() => {
                      setSelectedIdx(idx);
                    }} ref={(element) => {refs.current[idx] = element; }}>
                      <button className="ellipseIcon" >
                        {/* <img src={EllipseIcon} /> */}
                        <svg width="18" height="4" viewBox="0 0 18 4" fill="current" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.375 2C13.375 0.964844 14.2148 0.125 15.25 0.125C16.2852 0.125 17.125 0.964844 17.125 2C17.125 3.03516 16.2852 3.875 15.25 3.875C14.2148 3.875 13.375 3.03516 13.375 2ZM7.125 2C7.125 0.964844 7.96484 0.125 9 0.125C10.0352 0.125 10.875 0.964844 10.875 2C10.875 3.03516 10.0352 3.875 9 3.875C7.96484 3.875 7.125 3.03516 7.125 2ZM4.625 2C4.625 3.03516 3.78555 3.875 2.75 3.875C1.71445 3.875 0.875 3.03516 0.875 2C0.875 0.964844 1.71445 0.125 2.75 0.125C3.78555 0.125 4.625 0.964844 4.625 2Z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  {showDropdown && (idx === selectedIdx) && (
                    <div className="dropdown-content" style={{left:"75%", top:"15%"}}>
                      <div className="editBtn" onClick={() =>{editToDo(todo.name, idx)}}>
                        <img src={EditIcon} className="editIcon"/> Edit
                      </div>
                      <div className="deleteBtn" onClick={() =>deleteToDo(idx)}>
                        <img src={DeleteIcon} className="deleteIcon"/> Delete
                      </div>
                    </div>
                  )}
                </>
              );
            })}
          </div>
        )}
      </div>
    </div>
    )
  }

  const addToList = () => {
    setTodos([...todos, { name: title, list: []}]);
    setTitle('');
    setIsLanding(true);
  }

  const editToList = () => {
    const newTodos = todos;
    todos[selectedIdx].name = title;
    setTitle('');
    setSelectedIdx(-1);
    setIsLanding(true);
  }

  const renderToDoDetailPage = () => {
    return (
      <>
        <div className="modifyContainer">
          <div className="leftHeader">
            <div className="cancel" onClick={() => {
              setIsLanding(true);
              setTitle('');
              }}>
              <img src={BackIcon} className="backIcon" />
              <div className="createText">Cancel</div>
            </div>
            <div className="done" onClick={() => { title.length ? selectedIdx === -1 ? addToList() : editToList(): setIsLanding(true)}}>
              <div className="createText">Done</div>
            </div>
          </div>
          {/* <input className="createInput" type="text" value={title} placeholder="List title"  onChange={e => setTitle(e.target.value)} /> */}
          <textarea className="textbox" value={title} placeholder= "List title" onChange={e => setTitle(e.target.value)}></textarea>
        </div>
      </>
    )
  }

  return (
    <>
      {isLanding ? renderMainPage() : renderToDoDetailPage()}
    </>
  );
}

export default App;
