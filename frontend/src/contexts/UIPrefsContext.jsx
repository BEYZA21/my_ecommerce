import React, { createContext,useContext,useEffect,useMemo,useState } from "react";
const UIPrefsContext = createContext(null);
export function UIPrefsProvider({ children }){ const [prefs,setPrefs]=useState({}); useEffect(()=>{},[prefs]); const value=useMemo(()=>({prefs,setPrefs}),[prefs]); return <UIPrefsContext.Provider value={value}>{children}</UIPrefsContext.Provider>; }
export const useUIPrefs=()=>useContext(UIPrefsContext);
export function UIPrefsForm(){ return <form><p>UI Ayarları Formu</p></form>; }