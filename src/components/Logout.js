import React, { useState } from "react";
import "./Logout.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from  "../features/userSlice";
import { selectUser } from  "../features/userSlice";

const Logout = () => {

    const loggedInUser = useSelector(selectUser);

    const dispatch = useDispatch();

	const handleLogout = (e) =>{
		e.preventDefault();

		dispatch(
			logout({
				loggedIn : false
			})
		);
	};

	return (
			<div className = "logout">
				<h2>
                    Welcome <span className="user_name"> {loggedInUser.fullname}</span>
                    <button className="logout_btn" onClick={(e) => handleLogout(e)}> Logout</button>
                </h2>
			</div>
			
		)
}

export default Logout;