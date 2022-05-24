import { useState, useEffect, useContext } from 'react';
import Header from './header';
import { useLocation } from 'react-router-dom';

function EditNote() {
  const location = useLocation();
  const state = location.state;
  console.log(state);
  
  return (
    <>
      <Header />
      <div>EditNote - {state}</div>
    </>
  );
}

export default EditNote;
