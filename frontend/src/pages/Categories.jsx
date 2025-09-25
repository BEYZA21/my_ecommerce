import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

export default function Categories() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/categories?lang=${i18n.language}`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, [i18n.language]);

  return (
    <div className="container">
      <h1>{t("categories")}</h1>
      <ul>
        {categories.map((c) => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
}
