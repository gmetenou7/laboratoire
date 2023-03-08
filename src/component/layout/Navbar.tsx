import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const router = useNavigate();
  /******************************* */
  /**creation de l'etat du nom et prenom */
  const [nom, setNom] = useState("");

  const [prenom, setPrenom] = useState("");

  /******************************* */

  /**recuperer les iformations du user */
  const handleRetrieve = async () => {
    let users: any = localStorage.getItem("user");
    let info: any = JSON.parse(users);

    setNom(info.nom);
    setPrenom(info.prenom);
  };
  /******************************* */

  /***pour faire la mise a jour des info du user */

  function checkAuth() {
    let user = localStorage.getItem("user");
    // let user: any = JSON.parse(data || "");

    if (user) {
      return true;
    } else return false;
  }

  useEffect(() => {
    if (!checkAuth()) router("/SignIn");
  }, []);
  useEffect(() => {
    handleRetrieve();
  }, []);
  /******************************* */

  const [displayProfile, setdisplayProfile] = useState(false);

  return (
    <div>
      <div>
        <div
          className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper"
          id="kt_wrapper"
        >
          <div
            id="kt_header"
            className="kt-header kt-grid__item  kt-header--fixed "
          >
            <button
              className="kt-header-menu-wrapper-close"
              id="kt_header_menu_mobile_close_btn"
            >
              <i className="la la-close"></i>
            </button>
            <div
              className="kt-header-menu-wrapper"
              id="kt_header_menu_wrapper"
            ></div>
            <div className="kt-header__topbar">
              <div className="kt-header__topbar-item kt-header__topbar-item--user">
                <div
                  className="kt-header__topbar-wrapper"
                  data-toggle="dropdown"
                  data-offset="0px,0px"
                >
                  <div className="kt-header__topbar-user kt-rounded-">
                    <span className="kt-header__topbar-welcome kt-hidden-mobile">
                      {nom} {prenom}
                    </span>
                    <span className="kt-header__topbar-username kt-hidden-mobile">
                      <div className="kt-login-v2__actions">
                        {/*<div className="kt-login-v2__actions" onClick={()=>setdisplayProfile(!displayProfile)}>
                                                <button type="button" className="btn btn-brand btn-elevate btn-pill"> Profile</button>
                                            </div>*/}
                        <div className="kt-login-v2__actions">
                          <span className="kt-nav__link-icon"></span>
                          <Link
                            to="/profile"
                            className="btn btn-brand btn-elevate btn-pill"
                          >
                            Mon Profile
                          </Link>
                        </div>
                      </div>
                    </span>
                  </div>
                </div>
                {displayProfile && (
                  <div className=" dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-sm">
                    <ul className="kt-nav kt-margin-b-10">
                      <li className="kt-nav__item">
                        <div className="kt-login-v2__actions">
                          <span className="kt-nav__link-icon">
                            <i className="flaticon2-calendar-3"></i>
                          </span>
                          <Link to="/profile" className="kt-nav__link">
                            Mon Profile
                          </Link>
                        </div>
                      </li>
                      {/* <li className="kt-nav__item">
                                        <div className="kt-login-v2__actions">
                                            <span className="kt-nav__link-icon"><i className="flaticon2-gear"></i></span>
                                            <Link to='/Profil' className="kt-nav__link">
                                            <span className="kt-nav__link-text">Paramètres</span>
                                            </Link>
                                        </div>
                                    </li> */}
                      <li className="kt-nav__separator kt-nav__separator--fit"></li>

                      <li className="kt-nav__custom kt-space-between">
                        <a
                          href="/SignIn"
                          target="_blank"
                          className="btn btn-label-brand btn-upper btn-sm btn-bold"
                        >
                          Sign Out
                        </a>
                        <i
                          className="flaticon2-information kt-label-font-color-2"
                          data-toggle="kt-tooltip"
                          data-placement="right"
                          title=""
                          data-original-title="Click to learn more..."
                        ></i>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
