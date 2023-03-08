import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Accordion = ({ i, expanded, setExpanded, content }) => {
  const isOpen = i === expanded;

  return (
    <motion.div>
      <motion.header
        initial={false}
        animate={{ backgroundColor: isOpen ? "#FF0088" : "#0055FF" }}
        onClick={() => setExpanded(isOpen ? false : i)}
      />
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {content}
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
