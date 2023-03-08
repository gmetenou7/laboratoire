import React from "react";
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
export const FeatureCard = ({className, icon, title, link}) =>
    <Link to={link? link : "#"}>
        <motion.div
            whileHover={{ scale: 0.95 }}
            whileTap={{ scale: 1.1 }}
            className={className}>
                {icon}
                <h4 className="card-text">{title}</h4>
        </motion.div>
    </Link>