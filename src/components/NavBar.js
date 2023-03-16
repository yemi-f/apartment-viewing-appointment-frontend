import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const tabs = [
  {
    label: "Home",
    path: "/",
    hideWhenNotLoggedIn: false,
    showWhenLoggedIn: true,
  },
  {
    label: "Login",
    path: "/login",
    hideWhenNotLoggedIn: false,
    showWhenLoggedIn: false,
  },
  {
    label: "Admin",
    path: "/admin",
    hideWhenNotLoggedIn: true,
    showWhenLoggedIn: true,
  },
  {
    label: "Logout",
    path: "/",
    isButton: true,
    hideWhenNotLoggedIn: true,
    showWhenLoggedIn: true,
  },
];

export const NavBar = () => {
  const { handleLogout, isAuthenticated } = useAuth();

  return (
    <div className="NavBar">
      {tabs.map(
        ({ label, path, isButton, showWhenLoggedIn, hideWhenNotLoggedIn }) => {
          if (isAuthenticated && !showWhenLoggedIn) {
            return null;
          }

          if (!isAuthenticated && hideWhenNotLoggedIn) {
            return null;
          }

          return (
            <NavLink
              key={label}
              to={path}
              onClick={() => isButton && handleLogout()}
              className={({ isActive, isPending }) =>
                "NavLink " +
                (isPending ? "Pending" : isActive && !isButton ? "Active" : "")
              }
            >
              {label}
            </NavLink>
          );
        }
      )}
    </div>
  );
};
