import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloseButton } from "./CloseButton.tsx";
import { remove } from "./array-utils.ts";
import "../../styles/components/toast/_toast.scss"
import CloseIcon from '@mui/icons-material/Close';

interface Message {
  id: number;
  content: string;
  author: string;
}

export const Toast = ({notifications}) => {

  return (
    <ul className="toast-container-content">
        <AnimatePresence initial={false}>
          {notifications.map((toast:Message, index:number) => (
            <motion.li
              key={index}
              className = "toast-item"
              positionTransition
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            >
              <CloseIcon
                className="close-toast-btn"
              />
              {toast.content}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
  );
};