import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import avatar from './icons/avatar.png';
import CreateIcon from './icons/createIcon.svg';
import BackIcon from './icons/backIcon.svg';
import EllipseIcon from './icons/ellipsesIcon.svg';
import DeleteIcon from './icons/deleteIcon.svg';
import EditIcon from './icons/editIcon.svg';
import PlusIcon from './icons/plusIcon.svg';

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

    // clean up function before running new effect
    return () => {
        document.removeEventListener('mousedown', clickOutside);
    }
  }, [selectedIdx]);

  const editToDo = (name, idx) => {
    console.log("name: ", name);
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
            <img src={CreateIcon} alt="Create Icon" />
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
                      <h3>{todo.name}</h3>
                    </div>
                    <div className="dropdown" onClick={() => {
                      setSelectedIdx(idx);
                    }} ref={(element) => {refs.current[idx] = element; }}>
                      <div>
                        <img src={EllipseIcon} className="ellipseIcon"/>
                      </div>
                    </div>
                  </div>
                  {showDropdown && (idx === selectedIdx) && (
                    <div className="dropdown-content">
                      <div className="editBtn" onClick={() =>editToDo(todo.name, idx)}>
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
            <div className="cancel" onClick={() => setIsLanding(true)}>
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
