import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export const RequiredAuthentication = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    return (
        <>
            {user ? <Outlet /> : <Navigate to="/new-loging" />}
        </>
    )
}

export const IsAuthenticated = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <>
            {user ? <Navigate to="/new-dashboard" /> : <Outlet />}
        </>
    )
}

export const AdminOnly = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <>
            {(user?.matricule_serv === null && user?.matricule_ag === null) ? <Outlet /> : <Navigate to={`/${user?.matricule_labo}/${user?.matricule_ag}/${user?.matricule_serv}/${user?.nomservice}`} />}
        </>
    )
}
