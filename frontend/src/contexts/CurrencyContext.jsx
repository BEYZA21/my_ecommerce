// import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
// // src/contexts/UIPrefsContext.jsx

// export function UIPrefsProvider({ children }){ const [prefs,setPrefs]=useState({}); useEffect(()=>{},[prefs]); const value=useMemo(()=>({prefs,setPrefs}),[prefs]); return <UIPrefsContext.Provider value={value}>{children}</UIPrefsContext.Provider>; }
// export const useUIPrefs=()=>useContext(UIPrefsContext);
// export function UIPrefsForm(){ return <form className="settings-panel"><p>UI Ayarları Formu</p></form>; }


// import { useIsHoverCapable } from "../utils/hooks";
// import ThemeToggle from "./ThemeToggle";


// export default function Header(){
// const [open,setOpen]=useState(null);
// const hover=useIsHoverCapable();
// useEffect(()=>{ const onClick=(e)=>{ if(!e.target.closest("[data-dropdown]")) setOpen(null); }; document.addEventListener("click",onClick); return()=>document.removeEventListener("click",onClick); },[]);
// return (
// <header className="site-header" data-sticky>
// <div className="topbar">
// <div className="container">
// <div><a href="#">Yardım</a><a href="#">İletişim</a></div>
// <div><a href="#">Giriş Yap</a> | <a href="#">Kayıt Ol</a></div>
// </div>
// </div>
// <div className="header-main">
// <div className="container">
// <a href="#" className="logo">LOGO</a>
// <div className="search"><input type="search" placeholder="Ara..."/></div>
// <div className="header-actions">
// <button className="btn-add">İlan Ekle</button>
// <ThemeToggle />
// </div>
// </div>
// </div>
// <div className="nav">
// <div className="container">
// <div data-dropdown className={`dropdown ${open==="mega"?"is-open":""}`}>
// <button onClick={()=>setOpen(open==="mega"?null:"mega")} className="nav-link">Kategoriler</button>
// <div className="dropdown-panel mega">Mega Menü İçeriği</div>
// </div>
// <div data-dropdown className={`dropdown ${open==="lang"?"is-open":""}`}>
// <button onClick={()=>setOpen(open==="lang"?null:"lang")} className="nav-link">Diller</button>
// <div className="dropdown-panel lang-panel">Dil Listesi</div>
// </div>
// </div>
// </div>
// </header>
// );
// }