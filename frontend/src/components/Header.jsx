import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Routing varsa
import "../styles/style.css";
import "../styles/auth.css";
export default function Header({ user, onLogout, onAddListing }) {
  const [condensed, setCondensed] = useState(false);
  const [openDrop, setOpenDrop] = useState(false);
  const dropRef = useRef(null);
  const navigate = useNavigate();

  // Scroll küçülme
  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dropdown dışına tıklama
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setOpenDrop(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`site-header ${condensed ? "is-condensed" : ""}`}
      data-sticky
    >
      {/* Topbar */}
      <div className="topbar">
        <div className="container">
          <div>
            <a href="tel:+900000000000">+90 000 000 00 00</a>
            <a href="mailto:destek@site.com">destek@site.com</a>
            <span>Türkiye / İstanbul</span>
          </div>
          <div>
            <button className="icon-btn">🌙</button>
            <button className="icon-btn">🔔</button>
          </div>
        </div>
      </div>

      {/* Header Main */}
      <div className="header-main">
        <div className="container">
          <a href="/" className="logo">LOGO</a>

          {/* Arama kutusu */}
          <div className="search">
            <select>
              <option>Tümü</option>
            </select>
            <input placeholder="Makine, marka, model ara…" />
            <button className="btn small">Ara</button>
          </div>

          {/* Sağ aksiyonlar */}
          <div className="header-actions">
            <button className="ghost-btn">TR</button>
            <button className="ghost-btn">₺ TRY</button>

            {/* Hesap dropdown */}
            <div
              className={`dropdown ${openDrop ? "is-open" : ""}`}
              ref={dropRef}
            >
              <button
                className="btn outline small"
                onClick={() => setOpenDrop((p) => !p)}
              >
                {user ? user.username : "Hesap"}
              </button>

              <div className="dropdown-panel">
                <ul>
                  {user ? (
                    <>
                      <li>
                        <button onClick={onAddListing}>Ürün Ekle</button>
                      </li>
                      <li>
                        <button onClick={() => navigate("/profile")}>
                          Profilim
                        </button>
                      </li>
                      <li>
                        <button onClick={onLogout}>Çıkış Yap</button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <button onClick={() => navigate("/signin")}>
                          Giriş Yap
                        </button>
                      </li>
                      <li>
                        <button onClick={() => navigate("/signup")}>
                          Kayıt Ol
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>

          
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="nav">
        <div className="container">
          <a href="/" className="nav-link is-active">Ana Sayfa</a>
          <a href="/vitrin" className="nav-link">Vitrin</a>
          <a href="/kategoriler" className="nav-link">Kategoriler</a>
          <a href="/blog" className="nav-link">Blog</a>
          <a href="/destek" className="nav-link">Destek</a>
        </div>
      </nav>
    </header>
  );
}
