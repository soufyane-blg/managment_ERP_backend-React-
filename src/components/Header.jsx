import { useEffect, useState } from "react";

function Header() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const [search, setSearch] = useState("");

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleSearch = () => {
    console.log("Search:", search);
    // هنا لاحقًا تربطها مع API
  };

  return (
    <div className="header">
      
      {/* LEFT */}
      <div className="header-left">
        <h1>Dashboard</h1>
        <p className="subtitle">Manage your system</p>
      </div>

      {/* RIGHT */}
      <div className="header-right">
        
        {/* SEARCH */}
        <div className="search-container">
          <input
            className="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-btn" onClick={handleSearch}>
            🔍
          </button>
        </div>

        {/* THEME */}
        <button className="theme-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {/* USER */}
        <div className="user">
          <div className="avatar">S</div>
          <span>Soufyane</span>
        </div>
      </div>
    </div>
  );
}

export default Header;