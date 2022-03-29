import React, { useState } from 'react';
import './App.css';
import { SvgCreate, SvgDelete, SvgEdit, SvgEllipses, SvgPlus, SvgBack } from './iconComponents/SVGIcons';
import avatar from './icons/avatar.png';

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
      <table>
        <tr>
        <td onClick={() => props.setIsLanding(false)} className="Item-Container">
          <h3 className = "Item-Title-Box">
            Create a list
          </h3> 
          <div className="plusLogo"><SvgPlus/></div>
        </td>
      </tr>
    </table>
    )
  }

  const renderMainPage = () => {
    return (
      <div className="List-Container">
      <div className="Header-Container">
        <h1 className="Header-Title"><img src={avatar} className="avatar"/>Lists</h1>
        <button className="createBtn" onClick={() => setIsLanding(false)}> 
          <SvgCreate/>
        </button>
      </div>
      <div>
        {todos.length < 1 ? (
          <div>
            <RenderEmptyState setIsLanding={setIsLanding}/>
          </div>
        ):(
          <div>
            <table>
              {todos.map((todo, idx) => {
                return (
                  <tr>
                    <td className="Item-Container">
                      <div className="Item-Title-Box">
                        <h3>{todo.name}</h3>
                      </div>
                      <div className="dropdown">
                        <button>
                          <SvgEllipses/>
                        </button>
                        <div className="dropdown-content">
                          <button onClick={() =>editToDo(todo.name, idx)}>
                            <SvgEdit/> Edit
                          </button>
                          <button onClick={() =>deleteToDo(idx)}>
                             <SvgDelete/> Delete
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </table>
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
        <div style={{ display: 'flex'}}>
          <div>
            <button  onClick={() => setIsLanding(true)}>
            {/* <SvgBack/> */}
            <h3 className="Cancel">Cancel</h3>
            </button>
          </div>
          <div>
            <button  onClick={() => { title.length ? selectedIdx === -1 ? addToList() : editToList(): setIsLanding(true)}}>
              <h3 className="Done">Done</h3>
            </button>
          </div>
        </div>
        <div>
          <input type="text" value={title} placeholder="List title"  onChange={e => setTitle(e.target.value)} />
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
