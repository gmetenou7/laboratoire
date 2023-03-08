import React, { Fragment, useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion";

export function Carousel({ children }) {
    const [carouselWidth, setCarouselWith] = useState<any>();
    const carouselRef: any = useRef();

    useEffect(() => {
        setCarouselWith(carouselRef?.current?.scrollWidth - carouselRef?.current?.offsetWidth)
    }, [])
    return (
        <Fragment>
            <motion.div
                className="carousel-wrapper"
                ref={carouselRef}
                whileTap={{ cursor: "grabbing" }}
                whileHover={{ cursor: "w-resize" }}
            >
                <motion.div
                    className="inner-carousel"
                    drag="x"
                    dragConstraints={{
                        right: 0,
                        left: -carouselWidth
                    }}
                >
                    {children}
                </motion.div>
            </motion.div>
        </Fragment>
    )
}
