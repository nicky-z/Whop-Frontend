import React from 'react';
import {Button, Menu, MenuItem } from '@mui/material';
import '../App.css';


const TodoDropdown = ({
  todoName = '',
  idx = -1,
  editToDo = () => {},
  deleteToDo = () => {}
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="dropdown">
      <Button style={{minWidth:"32px", minHeight:"32px", margin:"16px"}} className="ellipseIcon"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <svg width="18" height="4" viewBox="0 0 18 4" fill="current" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.375 2C13.375 0.964844 14.2148 0.125 15.25 0.125C16.2852 0.125 17.125 0.964844 17.125 2C17.125 3.03516 16.2852 3.875 15.25 3.875C14.2148 3.875 13.375 3.03516 13.375 2ZM7.125 2C7.125 0.964844 7.96484 0.125 9 0.125C10.0352 0.125 10.875 0.964844 10.875 2C10.875 3.03516 10.0352 3.875 9 3.875C7.96484 3.875 7.125 3.03516 7.125 2ZM4.625 2C4.625 3.03516 3.78555 3.875 2.75 3.875C1.71445 3.875 0.875 3.03516 0.875 2C0.875 0.964844 1.71445 0.125 2.75 0.125C3.78555 0.125 4.625 0.964844 4.625 2Z"/>
        </svg>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          disablePadding: true,
        }}
        elevation={1}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
      <MenuItem className="editBtn" style={{borderRadius:"6px", paddingTop:"16px", paddingBottom:"16px", fontFamily:"Inter", fontSize:"18px", fontWeight:"600", lineHeight:"22px",letterSpacing: "-0.005em"}} 
        onClick={() =>{
          editToDo(todoName, idx);
          handleClose();
        }}>
        <div className="editIcon" style={{marginRight:"8px"}}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="current" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.0591 11.3731L12.7512 0.679268C13.6301 -0.199567 15.0574 -0.199567 15.9363 0.679268L17.3215 2.06548C17.4305 2.17517 17.5254 2.29364 17.6098 2.41845C18.1863 3.29173 18.0914 4.47896 17.3215 5.24888L6.62695 15.9399C6.58125 15.9856 6.53554 15.9997 6.48632 16.0735C6.14882 16.3723 5.74804 16.5622 5.31211 16.7204L1.08175 17.9649C0.785735 18.0528 0.465461 17.9719 0.247141 17.7223C0.0288132 17.536 -0.0528127 17.2161 0.0343046 16.9172L1.27863 12.6879C1.42488 12.1922 1.69312 11.7387 2.0591 11.3731ZM2.89757 13.1625L2.08968 15.9118L4.8375 15.1032C5.03086 15.0364 5.2664 14.9133 5.43515 14.7481L13.4648 6.71489L11.2535 4.50357L3.2523 12.5649C3.23156 12.586 3.21152 12.6071 3.19218 12.6317C3.05648 12.7829 2.95558 12.9657 2.89757 13.1625Z" />
          </svg>
        </div>
         Edit
      </MenuItem>
      <MenuItem className="deleteBtn" style={{borderRadius:"6px", paddingTop:"16px", paddingBottom:"16px", fontFamily:"Inter", fontSize:"18px", fontWeight:"600", lineHeight:"22px",letterSpacing: "-0.005em"}} 
        onClick={() =>{
          deleteToDo(idx)
          handleClose()}
        }>
        <div className="deleteIcon" style={{marginRight:"8px"}}>
          <svg width="18" height="18" viewBox="0 0 16 18" fill="current" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.75 14.0625C5.75 14.3719 5.49687 14.625 5.1875 14.625C4.87813 14.625 4.625 14.3719 4.625 14.0625V6.75C4.625 6.44063 4.87813 6.1875 5.1875 6.1875C5.49687 6.1875 5.75 6.44063 5.75 6.75V14.0625ZM8.5625 14.0625C8.5625 14.3719 8.30937 14.625 8 14.625C7.69063 14.625 7.4375 14.3719 7.4375 14.0625V6.75C7.4375 6.44063 7.69063 6.1875 8 6.1875C8.30937 6.1875 8.5625 6.44063 8.5625 6.75V14.0625ZM11.375 14.0625C11.375 14.3719 11.1219 14.625 10.8125 14.625C10.5031 14.625 10.25 14.3719 10.25 14.0625V6.75C10.25 6.44063 10.5031 6.1875 10.8125 6.1875C11.1219 6.1875 11.375 6.44063 11.375 6.75V14.0625ZM11.2871 0.876797L12.5773 2.8125H15.0312C15.4988 2.8125 15.875 3.19043 15.875 3.65625C15.875 4.12383 15.4988 4.5 15.0312 4.5H14.75V15.1875C14.75 16.7414 13.4914 18 11.9375 18H4.0625C2.5093 18 1.25 16.7414 1.25 15.1875V4.5H0.96875C0.50293 4.5 0.125 4.12383 0.125 3.65625C0.125 3.19043 0.50293 2.8125 0.96875 2.8125H3.42336L4.71289 0.876797C5.07852 0.328957 5.69375 0 6.35117 0H9.64883C10.3062 0 10.9215 0.328992 11.2871 0.876797ZM5.45117 2.8125H10.5488L9.88086 1.81266C9.82812 1.73461 9.74023 1.6875 9.64883 1.6875H6.35117C6.25977 1.6875 6.14023 1.73461 6.11914 1.81266L5.45117 2.8125ZM2.9375 15.1875C2.9375 15.8098 3.44129 16.3125 4.0625 16.3125H11.9375C12.5598 16.3125 13.0625 15.8098 13.0625 15.1875V4.5H2.9375V15.1875Z"/>
          </svg>
        </div>
        Delete
      </MenuItem>
    </Menu>
  </div>
  )
}

export default TodoDropdown;