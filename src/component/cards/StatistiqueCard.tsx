import React from "react";
import { motion } from "framer-motion";

export const StatistiqueCard = ({ className, stateHead, headline, stateCaption, icon }) =>
    <motion.div
        whileHover={{ scale: 1.02, transition: { duration: 0.05 } }}
        whileTap={{ scale: 0.95, transition: { duration: 0.05 } }}
        className={className}>
        {icon}
        <div className="card-content">
            <div className="main-stat">
                <h3 className="headline">{stateHead}</h3>
                <span className="small-text">{stateCaption}</span>
            </div>
            <h4 className="title">{headline}</h4>

        </div>
    </motion.div>