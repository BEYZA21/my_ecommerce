



// src/AppUI.jsx
import React,{useMemo,useState} from "react";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import { UIPrefsProvider } from "./contexts/UIPrefsContext";
import Header from "./components/Header";
import Slider from "./components/Slider";
import SearchSuggest from "./components/SearchSuggest";
import ProductsGrid from "./components/ProductsGrid";
import NewsletterForm from "./components/NewsletterForm";
import Pagination from "./components/Pagination";
import { CurrencyMenu,CurrencySettingsForm } from "./contexts/CurrencyContext";
import { UIPrefsForm } from "./contexts/UIPrefsContext";

export default function AppUI(){
  const demoProducts=useMemo(()=>[{id:"p1",title:"CNC Freze X1",priceTry:120000},{id:"p2",title:"Lazer Kesim L2",priceTry:180000}],[]);
  const [page,setPage]=useState(1);
  return (<UIPrefsProvider><CurrencyProvider><Header/><main><Slider items={[<div>Hero 1</div>,<div>Hero 2</div>]}/><section><CurrencyMenu/><CurrencySettingsForm/><UIPrefsForm/><SearchSuggest/></section><ProductsGrid initialItems={demoProducts}/><Pagination current={page} total={5} onChange={setPage}/><NewsletterForm/></main></CurrencyProvider></UIPrefsProvider>);
}
