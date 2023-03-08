import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/site-logo.png";
import { Logout } from "../auth/Logout.tsx";

export default function Header() {
  const user = JSON.parse(localStorage.getItem("user") || "");
  return (
    <>
      <div className="header">
        <div className=""></div>
        <ul className="header-links">
          {user.nomservice === "it" &&
            <>
              <li className="header-link">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "header-link-link header-link-link-active"
                      : "header-link-link"
                  }
                  to="/exams/voucher"
                >
                  Bons d'examens
                </NavLink>
              </li>
              <li className="header-link">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "header-link-link header-link-link-active"
                      : "header-link-link"
                  }
                  to="/exams/results"
                >
                  Resultats d'examens
                </NavLink>
              </li>
            </>
          }
          {user.nomservice === "accueil" &&
            <>
              <li className="header-link">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "header-link-link header-link-link-active"
                      : "header-link-link"
                  }
                  to="/patients"
                >
                  Patients
                </NavLink>
              </li>
              <li className="header-link">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "header-link-link header-link-link-active"
                      : "header-link-link"
                  }
                  to="/exams"
                >
                  examens
                </NavLink>
              </li>
            </>

          }

          {user.nomservice === "laboratoire" &&
            <>
              <li className="header-link">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "header-link-link header-link-link-active"
                      : "header-link-link"
                  }
                  to="/exams/voucher"
                >
                  Bons d'examens
                </NavLink>
              </li>
              <li className="header-link">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "header-link-link header-link-link-active"
                      : "header-link-link"
                  }
                  to="/exams/my-voucher"
                >
                  Mes bons d'examens
                </NavLink>
              </li>
            </>
          }

          {user.nomservice === "caisse" &&
            <>
              <li className="header-link">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "header-link-link header-link-link-active"
                      : "header-link-link"
                  }
                  to="/exams/voucher"
                >
                  Factures
                </NavLink>
              </li>
              <li className="header-link">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "header-link-link header-link-link-active"
                      : "header-link-link"
                  }
                  to="/bills"
                >
                  Reçus
                </NavLink>
              </li>
            </>
          }
          {user?.fonction === "admin" &&
            <>
              <li className="header-link">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "header-link-link header-link-link-active"
                      : "header-link-link"
                  }
                  to="/patients"
                >
                  Patients
                </NavLink>
              </li>
              <li className="header-link">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "header-link-link header-link-link-active"
                      : "header-link-link"
                  }
                  to="/exams"
                >
                  Bon d'examens
                </NavLink>
              </li>
              <li className="header-link">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "header-link-link header-link-link-active"
                      : "header-link-link"
                  }
                  to="/bills"
                >
                  Factures
                </NavLink>
              </li>
              <li className="header-link">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "header-link-link header-link-link-active"
                      : "header-link-link"
                  }
                  to="/family-exams"
                >
                  Famille examens
                </NavLink>
              </li>
              <li className="header-link">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "header-link-link header-link-link-active"
                      : "header-link-link"
                  }
                  to="/exams-family"
                >
                  Type examens
                </NavLink>
              </li>
              <li className="header-link">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "header-link-link header-link-link-active"
                      : "header-link-link"
                  }
                  to="/exams-type"
                >
                  Examens
                </NavLink>
              </li>
              <li className="header-link">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "header-link-link header-link-link-active"
                      : "header-link-link"
                  }
                  to="/glassware"
                >
                  Tubes
                </NavLink>
              </li>
              <li className="header-link">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "header-link-link header-link-link-active"
                      : "header-link-link"
                  }
                  to="/unites"
                >
                  Unités
                </NavLink>
              </li>

            </>
          }
        </ul>
        <div className="avatar-container">
          <Logout />
          <strong className="fs-18">{user?.nom} {user?.specialite && user?.specialite}</strong>
          <img src={logo} alt="avatar" className="avatar" />
        </div>
      </div>
    </>
  )
}
