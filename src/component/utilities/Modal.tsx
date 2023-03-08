import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from "framer-motion";
import { closeModalReducer } from "../../features/modalSlice.ts";

export function Modal() {
    const modal = useSelector(state => state.modal);
    const dispatch = useDispatch();


    function handleCloseModal() {
        dispatch(closeModalReducer())
    }
    return (
        <AnimatePresence>
            <motion.div
                className="modal-container">
                <motion.div className="modal-content-container">
                    <motion.div className="modal-content-header">
                        <motion.div className="header-content">
                            {/*<SettingsIcon className="header-content-icon" />*/}
                            <h3 className="header-content-text">
                                {modal?.header}
                            </h3>
                        </motion.div>
                        <button
                            className="close-modal-btn-container"
                            onClick={handleCloseModal}
                        >
                            <CloseIcon className="close-modal-btn" />
                        </button>
                    </motion.div>

                    <motion.div className="modal-content-body">
                        {modal?.body}
                    </motion.div>
                    {modal?.user_footer &&
                        <motion.div
                            className="modal-content-footer"
                        >
                            {modal?.footer_content}
                        </motion.div>
                    }
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}