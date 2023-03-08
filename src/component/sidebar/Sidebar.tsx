import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa";
import { HiBuildingOffice } from "react-icons/hi2"
import { MdAccountBalanceWallet, MdOutlineMedicalServices } from "react-icons/md"
import { BiCog, BiArch, BiBox } from "react-icons/bi";
import { IoStatsChart } from "react-icons/io5";
import { AiFillBank } from "react-icons/ai";

import { motion, AnimatePresence } from "framer-motion";
import { SidebarMenu } from "./SidebarMenu.tsx";
import toggleIcon from "../assets/menu-icon.svg";
import closeMenuIcon from "../assets/close-menu.svg";

const routes = [
  {
    path: "/new-dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/employees",
    name: "Employés",
    icon: <FaUser />,
  },
  {
    path: "/agencies",
    name: "Agences",
    icon: <HiBuildingOffice />,
  },

  {
    path: "/services",
    name: "Services",
    icon: <MdOutlineMedicalServices />
  },
  {
    path: "/statistique",
    name: "Statistiques",
    icon: <IoStatsChart />
  },
  {
    path: "/accounting",
    name: "Comptabilité",
    icon: <MdAccountBalanceWallet />
  },
  {
    path: "/assurances",
    name: "Assurances",
    icon: <BiArch />
  },
  {
    path: "/institutions",
    name: "Institutions",
    icon: <AiFillBank />
  },
  {
    path: "/settings",
    name: "Paramettres",
    icon: <BiCog />
  },



  // {
  //   path: "/file-manager",
  //   name: "File Manager",
  //   icon: <FaHome />,
  //   subRoutes: [
  //     {
  //       path: "/settings/profile",
  //       name: "Profile ",
  //       icon: <FaUser />,
  //     },
  //     {
  //       path: "/settings/2fa",
  //       name: "2FA",
  //       icon: <FaLock />,
  //     },
  //     {
  //       path: "/settings/billing",
  //       name: "Billing",
  //       icon: <FaMoneyBill />,
  //     },
  //   ],
  // },
  // {
  //   path: "/order",
  //   name: "Order",
  //   icon: <FaHome />,
  // }
];


export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.5,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <motion.div
      animate={{
        transition: {
          duration: 0.5,
          damping: 10,
        },
      }}
      className={isOpen ? "sidebar open" : "sidebar"}
    >
      <div className="logo-toggle-icon">
        {isOpen && (
          <motion.h2
            variants={showAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="logo"
          >Laboratoire</motion.h2>
        )}

        {isOpen ? <img
          src={closeMenuIcon}
          alt="toggle"
          className="toggle-icon"
          onClick={handleToggle}
        /> :
          <img
            src={toggleIcon}
            alt="toggle"
            className="toggle-icon"
            onClick={handleToggle}
          />}

      </div>

      <section className="nav-links nav-links-mobile">
        {routes.map((route, index) => {
          if (route.subRoutes) {
            return (
              <SidebarMenu
                key={index}
                setIsOpen={setIsOpen}
                route={route}
                showAnimation={showAnimation}
                isOpen={isOpen}
              />
            );
          }

          return (
            <NavLink
              to={route.path}
              key={index}
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}

            >
              <div className="link-icon">{route.icon}</div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="link-text"
                  >
                    {route.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </NavLink>
          );
        })}
      </section>
    </motion.div>
  );
};
