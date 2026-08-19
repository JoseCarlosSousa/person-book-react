import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import PeoplePage from "./pages/PeoplePage";
import BooksPage from "./pages/BooksPage";
import "./App.css";

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    if (i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
  };

  return (
    <Router>
      <div className="container">
        {/* Top Header Control Area */}
        <div className="header-controls">
          {/* Page Router Links */}
          <nav className="navbar">
            <Link to="/" className="nav-link">
              {t("navPeople")}
            </Link>
            <Link to="/books" className="nav-link">
              {t("navBooks")}
            </Link>
          </nav>

          {/* Language Selector Controls */}
          <div className="lang-selector">
            <button
              type="button"
              onClick={() => changeLanguage("pt")}
              className={
                i18n.resolvedLanguage === "pt"
                  ? "active"
                  : ""
              }
            >
              PT
            </button>
            <button
              type="button"
              onClick={() => changeLanguage("en")}
              className={
                i18n.resolvedLanguage === "en"
                  ? "active"
                  : ""
              }
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => changeLanguage("de")}
              className={
                i18n.resolvedLanguage === "de"
                  ? "active"
                  : ""
              }
            >
              DE
            </button>
          </div>
        </div>

        {/* Dynamic Route Switching Rendering */}
        <Routes>
          <Route path="/" element={<PeoplePage />} />
          <Route path="/books" element={<BooksPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
