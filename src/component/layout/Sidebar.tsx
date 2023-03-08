import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from ".././login/logincss/logo-5.png";

const Sidebar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [matricule_ag, setMatricule_ag]=useState("")
  const [matricule_serv, setMatricule_serv]=useState("")
  const [nom_serv, setNom_serv]=useState()
  const visibility = () => {
    setIsVisible(true);
  };


  const inituserMat = () => {
    let users: any = localStorage.getItem("user");
    let user: any = JSON.parse(users);
    setMatricule_ag(user.matricule_ag);
    setMatricule_serv(user.matricule_serv);
    setNom_serv(user.nomservice)
    console.log("nonserv", nom_serv);
    
  };

  useEffect(() => {
    
    inituserMat();
  }, []);
  return (
    <Fragment>
      {/**sidebar mobile */}

      <div
        id="kt_header_mobile"
        className="kt-header-mobile  kt-header-mobile--fixed "
      >
        <div className="kt-media kt-media--brand kt-media--md kt-media--circle">
          <a href="index.html">
            <img src={logo} alt="logo" />
          </a>
        </div>
        <div className="kt-header-mobile__toolbar">
          <button
            className="kt-header-mobile__toolbar-toggler kt-header-mobile__toolbar-toggler--left"
            id="kt_aside_mobile_toggler"
          >
            <span></span>
          </button>

          <button
            className="kt-header-mobile__toolbar-toggler"
            id="kt_header_mobile_toggler"
          >
            <span></span>
          </button>

          <button
            className="kt-header-mobile__toolbar-topbar-toggler"
            id="kt_header_mobile_topbar_toggler"
          >
            <i className="flaticon-more"></i>
          </button>
        </div>
      </div>

      <div className="kt-grid kt-grid--hor kt-grid--root">
        <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page">
          <button className="kt-aside-close " id="kt_aside_close_btn">
            <i className="la la-close"></i>
          </button>

          <div
            className="kt-aside  kt-aside--fixed  kt-grid__item kt-grid kt-grid--desktop kt-grid--hor-desktop"
            id="kt_aside"
          >
            <div className="kt-aside__brand kt-grid__item " id="kt_aside_brand">
              <div className="kt-media kt-media--brand kt-media--md kt-media--circle">
                <a href="index.html">
                  <img src={logo} alt="logo" />
                </a>
              </div>

              <div className="kt-aside__brand-tools">
                <button
                  className="kt-aside__brand-aside-toggler kt-aside__brand-aside-toggler--left"
                  id="kt_aside_toggler"
                >
                  <span></span>
                </button>
              </div>
            </div>
             
            {matricule_ag==null && matricule_serv ==null &&

              <div
              className="kt-aside-menu-wrapper kt-grid__item kt-grid__item--fluid"
              id="kt_aside_menu_wrapper"
              >

              <div
                id="kt_aside_menu"
                className="kt-aside-menu "
                data-ktmenu-vertical="1"
                data-ktmenu-scroll="1"
                data-ktmenu-dropdown-timeout="500"
              >
                <ul className="kt-menu__nav ">
                  <li
                    className="kt-menu__item  kt-menu__item--submenu kt-menu__item--open kt-menu__item--here"
                    aria-haspopup="true"
                    data-ktmenu-submenu-toggle="hover"
                  >
                    <NavLink
                      to="/accueil"
                      className={({ isActive }) =>
                        isActive
                          ? "kt-menu__link my_active_link kt-menu__item--active"
                          : "kt-menu__link"
                      }
                    >
                      <i className="kt-menu__link-icon flaticon2-graphic"></i>
                      <span className="kt-menu__link-text">
                        Tableau de bord
                      </span>
                      <i className="kt-menu__ver-arrow la la-angle-right"></i>
                    </NavLink>
                    <div className="kt-menu__submenu ">
                      <span className="kt-menu__arrow"></span>
                      <ul className="kt-menu__subnav">
                        {/* <li className="kt-menu__item  kt-menu__item--parent" aria-haspopup="true"><span className="kt-menu__link"><NavLink to='/accueil' className="kt-menu__link "><span className="kt-menu__link-text">Dashboards</span></NavLink></span>
                                        </li> */}
                        <li className="kt-menu__item " aria-haspopup="true">
                          <NavLink
                            to="/utilisateurs"
                            className={({ isActive }) =>
                              isActive
                                ? "kt-menu__link my_active_link kt-menu__item--active"
                                : "kt-menu__link"
                            }
                          >
                            <i
                              className=" kt-menu__link-icon fa fa-user"
                              aria-hidden="true"
                            >
                              <span></span>
                            </i>
                            <span className="kt-menu__link-text">Comptes</span>
                          </NavLink>
                        </li>
                        <li className="kt-menu__item " aria-haspopup="true">
                          <NavLink
                            to="/listepatient"
                            className={({ isActive }) =>
                              isActive
                                ? "kt-menu__link my_active_link kt-menu__item--active"
                                : "kt-menu__link"
                            }
                          >
                            {/* <i className=" kt-menu__link-icon fa fa-user-md" aria-hidden="true"><span></span></i> */}
                            <i
                              className=" kt-menu__link-icon fa fa-wheelchair"
                              aria-hidden="true"
                            >
                              <span></span>
                            </i>
                            <span className="kt-menu__link-text">Patients</span>
                          </NavLink>
                        </li>
                        <li className="kt-menu__item " aria-haspopup="true">
                          <NavLink
                            to="/examens"
                            className={({ isActive }) =>
                              isActive
                                ? "kt-menu__link my_active_link kt-menu__item--active"
                                : "kt-menu__link"
                            }
                          >
                            <i className="kt-menu__link-icon fa  fa-user-md">
                              <span></span>
                            </i>
                            <span className="kt-menu__link-text">
                              {" "}
                              Examens{" "}
                            </span>
                          </NavLink>
                        </li>
                        <li className="kt-menu__item " aria-haspopup="true">
                          <NavLink
                            to="/result_examens"
                            className={({ isActive }) =>
                              isActive
                                ? "kt-menu__link my_active_link kt-menu__item--active"
                                : "kt-menu__link"
                            }
                          >
                            <i
                              className=" kt-menu__link-icon fa fa-h-square"
                              aria-hidden="true"
                            >
                              <span></span>
                            </i>
                            <span className="kt-menu__link-text">
                              Résultas d'examens
                            </span>
                          </NavLink>
                        </li>
                        {/* <li className="kt-menu__item " aria-haspopup="true"><NavLink to='' className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i><span className="kt-menu__link-text">Statistiques</span></NavLink></li> */}
                      </ul>
                    </div>
                  </li>

                  <li
                    className="kt-menu__item  kt-menu__item--submenu"
                    aria-haspopup="true"
                    data-ktmenu-submenu-toggle="hover"
                  >
                    <NavLink
                      to="/agenda"
                      className={({ isActive }) =>
                        isActive
                          ? "kt-menu__link my_active_link kt-menu__item--active"
                          : "kt-menu__link"
                      }
                    >
                      <i className="kt-menu__link-icon flaticon2-calendar-2"></i>
                      <span className="kt-menu__link-text">Agenda</span>
                      <i className="kt-menu__ver-arrow la la-angle-right"></i>
                    </NavLink>
                    {/* <div className="kt-menu__submenu "><span className="kt-menu__arrow"></span>
                                    <ul className="kt-menu__subnav">
                                        <li className="kt-menu__item  kt-menu__item--parent" aria-haspopup="true"><span className="kt-menu__link"><span className="kt-menu__link-text">Calendar</span></span>
                                        </li>
                                        <li className="kt-menu__item " aria-haspopup="true"><a href="components/calendar/basic.html" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i><span className="kt-menu__link-text">Basic</span></a></li>
                                        <li className="kt-menu__item " aria-haspopup="true"><a href="components/calendar/list-view.html" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i><span className="kt-menu__link-text">List View</span></a></li>
                                        <li className="kt-menu__item " aria-haspopup="true"><a href="components/calendar/agenda-week.html" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i><span className="kt-menu__link-text">Agenda Week View</span></a></li>
                                        <li className="kt-menu__item " aria-haspopup="true"><a href="components/calendar/google.html" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i><span className="kt-menu__link-text">Google Calendar</span></a></li>
                                        <li className="kt-menu__item " aria-haspopup="true"><a href="components/calendar/external.html" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i><span className="kt-menu__link-text">External Events</span></a></li>
                                        <li className="kt-menu__item " aria-haspopup="true"><a href="components/calendar/rendering.html" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i><span className="kt-menu__link-text">Event Rendering</span></a></li>
                                    </ul>
                                </div> */}
                  </li>

                  {/* <li style={{ marginTop: "110%" }}></li> */}
                </ul>
              </div>

              <ul className="kt-menu__nav ">
                <li
                  className="kt-menu__item  kt-menu__item--submenu"
                  aria-haspopup="true"
                  data-ktmenu-submenu-toggle="hover"
                >
                  <a className="kt-menu__link kt-menu__toggle">
                    {/* <i className="kt-menu__link-icon flaticon2-gear"></i>  */}
                    <span
                      className="kt-menu__link-text"
                      style={{ cursor: "pointer" }}
                      onClick={visibility}
                    >
                      Parametrage
                    </span>
                    <i
                      className="kt-menu__ver-arrow la la-angle-right"
                      style={{ cursor: "pointer" }}
                    ></i>
                  </a>
                  <div className="kt-menu__submenu ">
                    <span className="kt-menu__arrow"></span>
                    {isVisible && (
                      <ul className="kt-menu__subnav">
                        {/*<li className="kt-menu__item  kt-menu__item--parent" aria-haspopup="true"><span className="kt-menu__link"><span className="kt-menu__link-text">Calendar</span></span>
                                        </li>
                                        <li className="kt-menu__item " aria-haspopup="true"><NavLink to="/services" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i><span className="kt-menu__link-text">Services</span></NavLink></li>*/}
                        <li className="kt-menu__item " aria-haspopup="true">
                          <NavLink
                            to="/agences"
                            className={({ isActive }) =>
                              isActive
                                ? "kt-menu__link my_active_link kt-menu__item--active"
                                : "kt-menu__link"
                            }
                          >
                            <i className="kt-menu__link-bullet kt-menu__link-bullet--dot">
                              <span></span>
                            </i>
                            <span className="kt-menu__link-text">Agences</span>
                          </NavLink>
                        </li>
                        <li className="kt-menu__item " aria-haspopup="true">
                          <NavLink
                            to="/familleExamen"
                            className={({ isActive }) =>
                              isActive
                                ? "kt-menu__link my_active_link kt-menu__item--active"
                                : "kt-menu__link"
                            }
                          >
                            <i className="kt-menu__link-bullet kt-menu__link-bullet--dot">
                              <span></span>
                            </i>
                            <span className="kt-menu__link-text">
                              Famille des Examens
                            </span>
                          </NavLink>
                        </li>
                        {/* <li className="kt-menu__item " aria-haspopup="true"><a href="components/calendar/agenda-week.html" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i><span className="kt-menu__link-text">Agenda Week View</span></a></li>
                                        <li className="kt-menu__item " aria-haspopup="true"><a href="components/calendar/google.html" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i><span className="kt-menu__link-text">Google Calendar</span></a></li>
                                        <li className="kt-menu__item " aria-haspopup="true"><a href="components/calendar/external.html" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i><span className="kt-menu__link-text">External Events</span></a></li>
                                        <li className="kt-menu__item " aria-haspopup="true"><a href="components/calendar/rendering.html" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i><span className="kt-menu__link-text">Event Rendering</span></a></li>    
                                        <li className="kt-menu__item " aria-haspopup="true"><Link to='/agence' className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i><span className="kt-menu__link-text">Agences</span></Link></li> 
                                        <li className="kt-menu__item " aria-haspopup="true"><a href="components/calendar/list-view.html" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i><span className="kt-menu__link-text">Services</span></a></li>*/}
                      </ul>
                    )}
                  </div>
                </li>
              </ul>
              </div>

            }

            {matricule_ag !=null && matricule_serv ==null &&

                    <div
                    className="kt-aside-menu-wrapper kt-grid__item kt-grid__item--fluid"
                    id="kt_aside_menu_wrapper"
                    >

                    <div
                      id="kt_aside_menu"
                      className="kt-aside-menu "
                      data-ktmenu-vertical="1"
                      data-ktmenu-scroll="1"
                      data-ktmenu-dropdown-timeout="500"
                    >
                      <ul className="kt-menu__nav ">
                        <li
                          className="kt-menu__item  kt-menu__item--submenu kt-menu__item--open kt-menu__item--here"
                          aria-haspopup="true"
                          data-ktmenu-submenu-toggle="hover"
                        >
                          {/* <NavLink
                            to="/accueil"
                            className={({ isActive }) =>
                              isActive
                                ? "kt-menu__link my_active_link kt-menu__item--active"
                                : "kt-menu__link"
                            }
                          >
                            <i className="kt-menu__link-icon flaticon2-graphic"></i>
                            <span className="kt-menu__link-text">
                              Tableau de bord
                            </span>
                            <i className="kt-menu__ver-arrow la la-angle-right"></i>
                          </NavLink> */}
                          <div className="kt-menu__submenu ">
                            <span className="kt-menu__arrow"></span>
                            <ul className="kt-menu__subnav">
                              
                              {/* <li className="kt-menu__item " aria-haspopup="true">
                                <NavLink
                                  to="/utilisateurs"
                                  className={({ isActive }) =>
                                    isActive
                                      ? "kt-menu__link my_active_link kt-menu__item--active"
                                      : "kt-menu__link"
                                  }
                                >
                                  <i
                                    className=" kt-menu__link-icon fa fa-user"
                                    aria-hidden="true"
                                  >
                                    <span></span>
                                  </i>
                                  <span className="kt-menu__link-text">Comptes</span>
                                </NavLink>
                              </li> */}
                              <li className="kt-menu__item " aria-haspopup="true">
                                <NavLink
                                  to="/listepatient"
                                  className={({ isActive }) =>
                                    isActive
                                      ? "kt-menu__link my_active_link kt-menu__item--active"
                                      : "kt-menu__link"
                                  }
                                >
                                  {/* <i className=" kt-menu__link-icon fa fa-user-md" aria-hidden="true"><span></span></i> */}
                                  <i
                                    className=" kt-menu__link-icon fa fa-wheelchair"
                                    aria-hidden="true"
                                  >
                                    <span></span>
                                  </i>
                                  <span className="kt-menu__link-text">Patients</span>
                                </NavLink>
                              </li>
                              <li className="kt-menu__item " aria-haspopup="true">
                                <NavLink
                                  to="/examens"
                                  className={({ isActive }) =>
                                    isActive
                                      ? "kt-menu__link my_active_link kt-menu__item--active"
                                      : "kt-menu__link"
                                  }
                                >
                                  <i className="kt-menu__link-icon fa  fa-user-md">
                                    <span></span>
                                  </i>
                                  <span className="kt-menu__link-text">
                                    {" "}
                                    Examens{" "}
                                  </span>
                                </NavLink>
                              </li>
                              <li className="kt-menu__item " aria-haspopup="true">
                                <NavLink
                                  to="/result_examens"
                                  className={({ isActive }) =>
                                    isActive
                                      ? "kt-menu__link my_active_link kt-menu__item--active"
                                      : "kt-menu__link"
                                  }
                                >
                                  <i
                                    className=" kt-menu__link-icon fa fa-h-square"
                                    aria-hidden="true"
                                  >
                                    <span></span>
                                  </i>
                                  <span className="kt-menu__link-text">
                                    Résultas d'examens
                                  </span>
                                </NavLink>
                              </li>
                              {/* <li className="kt-menu__item " aria-haspopup="true"><NavLink to='' className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i><span className="kt-menu__link-text">Statistiques</span></NavLink></li> */}
                            </ul>
                          </div>
                        </li>

                        <li
                          className="kt-menu__item  kt-menu__item--submenu"
                          aria-haspopup="true"
                          data-ktmenu-submenu-toggle="hover"
                        >
                          <NavLink
                            to="/agenda"
                            className={({ isActive }) =>
                              isActive
                                ? "kt-menu__link my_active_link kt-menu__item--active"
                                : "kt-menu__link"
                            }
                          >
                            <i className="kt-menu__link-icon flaticon2-calendar-2"></i>
                            <span className="kt-menu__link-text">Agenda</span>
                            <i className="kt-menu__ver-arrow la la-angle-right"></i>
                          </NavLink>
                          
                        </li>

                        
                      </ul>
                    </div>

                     
                    </div>

            }
            {matricule_ag !=null && nom_serv==="laboratoire" &&

                <div
                className="kt-aside-menu-wrapper kt-grid__item kt-grid__item--fluid"
                id="kt_aside_menu_wrapper"
                >

                <div
                  id="kt_aside_menu"
                  className="kt-aside-menu "
                  data-ktmenu-vertical="1"
                  data-ktmenu-scroll="1"
                  data-ktmenu-dropdown-timeout="500"
                >
                  <ul className="kt-menu__nav ">
                    <li
                      className="kt-menu__item  kt-menu__item--submenu kt-menu__item--open kt-menu__item--here"
                      aria-haspopup="true"
                      data-ktmenu-submenu-toggle="hover"
                    >
                      {/* <NavLink
                        to="/accueil"
                        className={({ isActive }) =>
                          isActive
                            ? "kt-menu__link my_active_link kt-menu__item--active"
                            : "kt-menu__link"
                        }
                      >
                        <i className="kt-menu__link-icon flaticon2-graphic"></i>
                        <span className="kt-menu__link-text">
                          Tableau de bord
                        </span>
                        <i className="kt-menu__ver-arrow la la-angle-right"></i>
                      </NavLink> */}
                      <div className="kt-menu__submenu ">
                        <span className="kt-menu__arrow"></span>
                        <ul className="kt-menu__subnav">
                          {/* <li className="kt-menu__item  kt-menu__item--parent" aria-haspopup="true"><span className="kt-menu__link"><NavLink to='/accueil' className="kt-menu__link "><span className="kt-menu__link-text">Dashboards</span></NavLink></span>
                                          </li> */}
                          {/* <li className="kt-menu__item " aria-haspopup="true">
                            <NavLink
                              to="/utilisateurs"
                              className={({ isActive }) =>
                                isActive
                                  ? "kt-menu__link my_active_link kt-menu__item--active"
                                  : "kt-menu__link"
                              }
                            >
                              <i
                                className=" kt-menu__link-icon fa fa-user"
                                aria-hidden="true"
                              >
                                <span></span>
                              </i>
                              <span className="kt-menu__link-text">Comptes</span>
                            </NavLink>
                          </li> */}

                          {nom_serv==="laboratoire" &&
                            <>
                              <li className="kt-menu__item " aria-haspopup="true">
                                <NavLink
                                  to="/examens"
                                  className={({ isActive }) =>
                                    isActive
                                      ? "kt-menu__link my_active_link kt-menu__item--active"
                                      : "kt-menu__link"
                                  }
                                >
                                  <i className="kt-menu__link-icon fa  fa-user-md">
                                    <span></span>
                                  </i>
                                  <span className="kt-menu__link-text">
                                    {" "}
                                    Examens{" "}
                                  </span>
                                </NavLink>
                              </li>
                              <li
                                className="kt-menu__item  kt-menu__item--submenu"
                                aria-haspopup="true"
                                data-ktmenu-submenu-toggle="hover"
                              >
                                <NavLink
                                  to="/agenda"
                                  className={({ isActive }) =>
                                    isActive
                                      ? "kt-menu__link my_active_link kt-menu__item--active"
                                      : "kt-menu__link"
                                  }
                                >
                                  <i className="kt-menu__link-icon flaticon2-calendar-2"></i>
                                  <span className="kt-menu__link-text">Agenda</span>
                                  <i className="kt-menu__ver-arrow la la-angle-right"></i>
                                </NavLink>
                                
                              </li>
                            </>
                          }
                          
                          
                        </ul>
                      </div>
                    </li>

                   
                  </ul>
                </div>

                
                </div>

            }

            {matricule_ag !=null && nom_serv ==="accueil" &&

              <div
              className="kt-aside-menu-wrapper kt-grid__item kt-grid__item--fluid"
              id="kt_aside_menu_wrapper"
              >

              <div
                id="kt_aside_menu"
                className="kt-aside-menu "
                data-ktmenu-vertical="1"
                data-ktmenu-scroll="1"
                data-ktmenu-dropdown-timeout="500"
              >
                <ul className="kt-menu__nav ">
                  <li
                    className="kt-menu__item  kt-menu__item--submenu kt-menu__item--open kt-menu__item--here"
                    aria-haspopup="true"
                    data-ktmenu-submenu-toggle="hover"
                  >
                    {/* <NavLink
                      to="/accueil"
                      className={({ isActive }) =>
                        isActive
                          ? "kt-menu__link my_active_link kt-menu__item--active"
                          : "kt-menu__link"
                      }
                    >
                      <i className="kt-menu__link-icon flaticon2-graphic"></i>
                      <span className="kt-menu__link-text">
                        Tableau de bord
                      </span>
                      <i className="kt-menu__ver-arrow la la-angle-right"></i>
                    </NavLink> */}
                    <div className="kt-menu__submenu ">
                      <span className="kt-menu__arrow"></span>
                      <ul className="kt-menu__subnav">
                        
                        {/* <li className="kt-menu__item " aria-haspopup="true">
                          <NavLink
                            to="/utilisateurs"
                            className={({ isActive }) =>
                              isActive
                                ? "kt-menu__link my_active_link kt-menu__item--active"
                                : "kt-menu__link"
                            }
                          >
                            <i
                              className=" kt-menu__link-icon fa fa-user"
                              aria-hidden="true"
                            >
                              <span></span>
                            </i>
                            <span className="kt-menu__link-text">Comptes</span>
                          </NavLink>
                        </li> */}

                        {nom_serv==="accueil" &&
                          <>
                            <li className="kt-menu__item " aria-haspopup="true">
                              <NavLink
                                to="/listepatient"
                                className={({ isActive }) =>
                                  isActive
                                    ? "kt-menu__link my_active_link kt-menu__item--active"
                                    : "kt-menu__link"
                                }
                              >
                                {/* <i className=" kt-menu__link-icon fa fa-user-md" aria-hidden="true"><span></span></i> */}
                                <i
                                  className=" kt-menu__link-icon fa fa-wheelchair"
                                  aria-hidden="true"
                                >
                                  <span></span>
                                </i>
                                <span className="kt-menu__link-text">Patients</span>
                              </NavLink>
                            </li>
                            <li className="kt-menu__item " aria-haspopup="true">
                              <NavLink
                                to="/result_examens"
                                className={({ isActive }) =>
                                  isActive
                                    ? "kt-menu__link my_active_link kt-menu__item--active"
                                    : "kt-menu__link"
                                }
                              >
                                <i
                                  className=" kt-menu__link-icon fa fa-h-square"
                                  aria-hidden="true"
                                >
                                  <span></span>
                                </i>
                                <span className="kt-menu__link-text">
                                  Résultas d'examens
                                </span>
                              </NavLink>
                            </li>

                            <li
                              className="kt-menu__item  kt-menu__item--submenu"
                              aria-haspopup="true"
                              data-ktmenu-submenu-toggle="hover"
                            >
                              <NavLink
                                to="/agenda"
                                className={({ isActive }) =>
                                  isActive
                                    ? "kt-menu__link my_active_link kt-menu__item--active"
                                    : "kt-menu__link"
                                }
                              >
                                <i className="kt-menu__link-icon flaticon2-calendar-2"></i>
                                <span className="kt-menu__link-text">Agenda</span>
                                <i className="kt-menu__ver-arrow la la-angle-right"></i>
                              </NavLink>
                            
                            </li>
                          </>
                        }
                        
                        
                        
                        {/* <li className="kt-menu__item " aria-haspopup="true"><NavLink to='' className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i><span className="kt-menu__link-text">Statistiques</span></NavLink></li> */}
                      </ul>
                    </div>
                  </li>

                  

                  {/* <li style={{ marginTop: "110%" }}></li> */}
                </ul>
              </div>

              
              </div>

           }
          </div>
        </div>
      </div>
    </Fragment>
  );
};

{
  /* <SideNav expanded={isVisible}>
        
        <SideNav.Toggle onClick={() => {
            setIsVisible(!isVisible);
          }}>
        <img src='{logo}' width="35%"/>
        </SideNav.Toggle>
        
        <SideNav.Nav defaultSelected="home">
          <NavItem eventKey="home">
            <NavIcon>
              <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Dashboard</NavText>
          </NavItem>
          <NavItem eventKey="placed orders">
            <NavIcon>
              <i
                className="fa fa-fw fa-line-chart"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
            <NavText>placed orders</NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav> */
}

export default Sidebar;
