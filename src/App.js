import React, { useState } from 'react';
import './App.css';
import { SvgDelete, SvgEdit, SvgEllipses, SvgPlus, SvgBack } from './iconComponents/SVGIcons';
import avatar from './icons/avatar.png';
import CreateIcon from './icons/createIcon.svg';
import BackIcon from './icons/backIcon.svg';
import EllipseIcon from './icons/ellipsesIcon.svg';

function App() {
  const [todos, setTodos] = useState([]);
  const [isLanding, setIsLanding] = useState(true);
  const [title, setTitle] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(-1);

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
        <div className="createlist"> 
          Create a list
        </div> 
        <div className="plusLogo"><SvgPlus/></div>
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
                <div className="Item-Container">
                  <div className="Item-Title-Box">
                        <h3>{todo.name}</h3>
                      </div>
                      <div className="dropdown">
                        <div>
                          <img src={EllipseIcon} className="ellipseIcon"/>
                        </div>
                        <div className="dropdown-content">
                          <button onClick={() =>editToDo(todo.name, idx)}>
                            <SvgEdit/> Edit
                          </button>
                          <button onClick={() =>deleteToDo(idx)}>
                             <SvgDelete/> Delete
                          </button>
                        </div>
                      </div>
                </div>  
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
            <div className="Done" onClick={() => { title.length ? selectedIdx === -1 ? addToList() : editToList(): setIsLanding(true)}}>
              <div className="createText">Done</div>
            </div>
          </div>
          <input className="createInput" type="text" value={title} placeholder="List title"  onChange={e => setTitle(e.target.value)} />
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
