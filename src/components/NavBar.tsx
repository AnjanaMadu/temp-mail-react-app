import { useEffect, useState } from "react";

interface NavBarProps {
  mail: string;
}

const NavBar = ({ mail }: NavBarProps) => {
  const [navVisible, setNavVisible] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mail);
  };

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <h3 className="navbar-item title is-4">Temp Mail</h3>

          <a
            role="button"
            className={`navbar-burger ${navVisible ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded="false"
            onClick={() => setNavVisible(!navVisible)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className={`navbar-menu ${navVisible ? "is-active" : ""}`}>
          <div className="navbar-end">
            <div className="navbar-item">
              <input
                className="input is-info"
                type="text"
                value={mail}
                readOnly
              />
            </div>
            <div className="navbar-item">
              <button className="button is-link" onClick={copyToClipboard}>
                Copy
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
