import React, { Fragment, useState } from 'react'
import { Puff } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { SingleAgent } from '../../component/institution/agents/SingleAgent.tsx';
import PageLayout from "../PageLayout.tsx";

export const SingleAgentPage = () => {
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const user = JSON.parse(localStorage.getItem("user") || "");

    const content = <Fragment>

        <SingleAgent
            IdAgent={params.code}
        />

    </Fragment>
    return (
        <PageLayout
            children={content}
            useSidebar={user?.fonction === "admin" ? true : false}
        />
    )
}
