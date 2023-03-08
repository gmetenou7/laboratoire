import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import menuIcon from "../assets/menu-icon.svg";
import { Logout } from "../auth/Logout.tsx";

export function Tabs({ tabs, showHeader }) {
    const [selectedTab, setSelectedTab] = useState(tabs[0]);
    const user = JSON.parse(localStorage.getItem("user") || "");

    return (
        <div className="tabs-container">
            <nav className="navigation-tab">
                <div className="tab-items">
                    {tabs?.map((item: any) => (
                        <div
                            key={item.label}
                            className={item === selectedTab ? "tab-btn selected" : "tab-btn"}
                            onClick={() => setSelectedTab(item)}
                        >
                            {item.label}
                            {item === selectedTab ? (
                                <motion.div className="underline" layoutId="underline" />
                            ) : null}
                        </div>
                    ))}
                </div>

                {showHeader &&
                    <div className="tab-header">
                        <Logout />
                        <strong className="fs-18">{user?.nom}</strong>
                        <img className="user-avatar" src={menuIcon} alt="avator" />
                    </div>
                }
            </nav>
            <AnimatePresence exitBeforeEnter>
                <motion.div
                    className="tabs-body"
                    key={selectedTab.label}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {selectedTab && selectedTab?.content}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
