import React, { useState, useEffect, Fragment } from 'react';
import PageLayout from "../PageLayout.tsx";
import { ListExems } from "../../component/exems/ListExems.tsx"
import { useSelector } from 'react-redux';
import { examsInProcessStatus } from '../../features/examSlice.ts';

export function SamplerView() {
    const exams_in_progress: [] = useSelector((state) =>
        examsInProcessStatus(state)
    );

    const content = (
        <Fragment>
            {exams_in_progress.length > 0 ?
                <ListExems
                    sampler={true}
                /> :
                <div className='content-not-fount'>
                    <h2 className='content-not-fount__text'>
                        Aucun examen à traiter pour le moment
                    </h2>
                </div>
            }
        </Fragment>
    )

    return <PageLayout children={content} useSidebar={false} />;
}