import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Wrapper({children}) {
    const location=useLocation();
    const navigate=useNavigate();

    if(!localStorage.getItem('userData') && location.pathname==="/profile")
        navigate("/");
    else
     return children;

  return (
   {}
  )
}
