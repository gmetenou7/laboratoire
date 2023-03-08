import React, {useState, useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAngleDown } from "react-icons/fa";
import { NavLink, Link }  from "react-router-dom";
import { Fragment } from "@fullcalendar/react";

const menuAnimation = {
    hidden: {
      opacity: 0,
      height: 0,
      padding: 0,
      transition: { duration: 0.3, when: "afterChildren" },
    },
    show: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
      },
    },
};

const menuItemAnimation = {
    hidden: (i:number) => ({
      padding: 0,
      x: "-100%",
      transition: {
        duration: (i + 1) * 0.1,
      },
    }),
    show: (i:number) => ({
      x: 0,
      transition: {
        duration: (i + 1) * 0.1,
      },
    }),
};

export function SidebarMenu({
    route, 
    showAnimation,
    isOpen,
    setIsOpen
}) {

    const [menuIsOpen, setMenuIsOpen] = useState(false);
    
    const handleToggleMenu =()=> {
        setMenuIsOpen(!menuIsOpen);
        setIsOpen(true)
    }

    useEffect(() => {
        if(!isOpen) {
            setMenuIsOpen(false);
        }
    }, [isOpen]);


  return (
    <Fragment>
      <div className="nav-link" onClick={handleToggleMenu}>
        <span className="link-icon">{route.icon}</span>
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

        {isOpen && (
          <motion.div
            animate={
              menuIsOpen
                ? {
                    rotate: -90,
                  }
                : { rotate: 0 }
            }
          >
            <FaAngleDown className="expand-icon" />
          </motion.div>
        )}
      </div>{" "}
      <AnimatePresence>
        {menuIsOpen && (
          <motion.div
            variants={menuAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="sub-nav-links"
          >
            {route.subRoutes.map((subRoute:any, i:number) => (
              <motion.div variants={menuItemAnimation} key={i} custom={i}>
                <NavLink to={subRoute.path} className="sub-link">
                  <span className="sub-icon">{subRoute.icon}</span>
                  <motion.span className="sub-text">{subRoute.name}</motion.span>
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}{" "}
      </AnimatePresence>
    </Fragment>
  );
};
