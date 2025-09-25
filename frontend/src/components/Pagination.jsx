

// src/components/Pagination.jsx
import React from "react";
export default function Pagination({current,total,onChange}){ return (<nav>{Array.from({length:total},(_,i)=>(<button key={i} className={current===i+1?"is-active":""} onClick={()=>onChange(i+1)}>{i+1}</button>))}</nav>); }
