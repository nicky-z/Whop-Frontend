import React, { useState } from 'react';
import './App.css';
import avatar from './icons/avatar.png';
import PlusIcon from './icons/plusIcon.svg';
import ToDoDetailPage from './components/TodoDetail';
import TodoDropdown from './components/TodoDropdown';

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
    return(
      <div onClick={() => props.setIsLanding(false)} className="Item-Container">
        <div className="createalist"> 
          Create a list
        </div> 
        <div className="plusLogo"><img src={PlusIcon} alt=""/></div>
      </div>
    )
  }

  const renderToDoList = () => {
    return (
      <div>
      {todos.length < 1 ? (
        <div className="empty-container">
          <RenderEmptyState setIsLanding={setIsLanding}/>
        </div>
      ):(
        <div className="Items-List">
          {todos.map((todo, idx) => {
            return (
              <>
                <div className="Item-Container">
                  <div className="Item-Title-Box">
                    <div className="Item-Title">{todo.name}</div>
                  </div>
                  <TodoDropdown 
                    todoName={todo.name}
                    idx={idx}
                    editToDo={editToDo}
                    deleteToDo={deleteToDo}
                  />
                </div>
              </>
            )})}
        </div>
      )}
    </div>
    );
  }

  const renderHeader = () => {
    return (
      <div className="Header-Container">
      <div className="Header-Title">
        <div>
          <img src={avatar} alt="" className="avatar"/>
        </div>
        <div className="Header-Text">
          <div>Lists</div>
        </div>
      </div>
      <div>
        <button className="createBtn" onClick={() => setIsLanding(false)}> 
          <svg width="24" height="24" fill="current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.9828 1.89377C24.0094 2.91892 24.0094 4.58111 22.9828 5.60626L21.5766 7.0172L16.9828 2.42439L18.3938 1.01533C19.4203 -0.00999215 21.0797 -0.00999215 22.1063 1.01533L22.9828 1.89377ZM8.08125 11.3297L15.9234 3.4847L20.5172 8.07658L12.6703 15.9188C12.3844 16.2094 12.0328 16.425 11.6438 16.5563L7.48125 17.9438C7.03594 18.075 6.63281 17.9719 6.32813 17.6297C6.02813 17.3672 5.925 16.9219 6.05625 16.5188L7.44375 12.3563C7.575 11.9672 7.79063 11.6156 8.08125 11.3297ZM9 2.95783C9.82969 2.95783 10.5 3.67173 10.5 4.45783C10.5 5.3297 9.82969 5.95783 9 5.95783H4.5C3.67172 5.95783 3 6.67033 3 7.45783V19.5C3 20.3297 3.67172 21 4.5 21H16.5C17.3297 21 18 20.3297 18 19.5V14.9578C18 14.1703 18.6703 13.4578 19.5 13.4578C20.3297 13.4578 21 14.1703 21 14.9578V19.5C21 21.9844 18.9844 24 16.5 24H4.5C2.01469 24 0 21.9844 0 19.5V7.45783C0 4.97345 2.01469 2.95783 4.5 2.95783H9Z" />
          </svg>
        </button>
      </div>

    </div>
    )
  }

  const renderMainPage = () => {
    return (
      <div className="List-Container">
        {renderHeader()}
        {renderToDoList()}
      </div>
    )
  }

  const addToList = () => {
    setTodos([...todos, { name: title, list: []}]);
    setTitle('');
    setIsLanding(true);
  }

  const editToList = () => {
    todos[selectedIdx].name = title;
    setTitle('');
    setSelectedIdx(-1);
    setIsLanding(true);
  }

  const renderToDoDetailPage = () => {
    const saveToDoDetail = () => {
      if(!title.length){
        editToList();
      } else {
        if(selectedIdx === -1){
           addToList();
        } else {
          editToList();
        }
      }
      setIsLanding(true);
    }  
    return (
      <>
        <ToDoDetailPage 
          saveOnClick={saveToDoDetail} 
          navigateToLanding={() => setIsLanding(true)}
          title={title}
          setTitle={setTitle}
        />
      </>
    );
  }

  return (
    <>
      {isLanding ? renderMainPage() : renderToDoDetailPage()}
    </>
  );
}

export default App;
