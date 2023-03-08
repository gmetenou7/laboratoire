import React from "react";
import { AiOutlineLogout } from "react-icons/ai";

export function Logout() {
  function logout() {
    localStorage.removeItem("user");
    document.location = "/new-loging";
  }
  return (
    <div className="" onClick={logout}>
      <AiOutlineLogout />
    </div>
  );
}
