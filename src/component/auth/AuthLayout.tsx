import React from "react";
import siteLogo from "../assets/site-logo.png"


export function AuthLayout({form, header}) {

    return(
        <div className="auth-wrapper">
            <div className="auth-header">
                <img src={siteLogo} alt="logo" className="logo" />
                <h4 className="title">{header}</h4>
            </div>
            {form}
        </div>
    )
}