import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from  "../features/userSlice";
import "./Login.css";

const validEmailRegex = RegExp(
	/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  
const validateForm = errors => {
	let valid = true;
	Object.values(errors).forEach(val => val.length > 0 && (valid = false));
	return valid;
};

const Login = () => {

	const[fullname, setName] = useState("");
	const[email, setEmail] = useState("");
	const[password, setPassword] = useState(""); 
	const[errors, setErrors] = useState({
        fullName: '',
        email: '',
        password: '',
      });
	
	const dispatch = useDispatch();

	const handleSubmit = (e) =>{
		if(validateForm(errors)){
			console.info('Valid Form');
			dispatch(
				login({
					fullname : fullname,
					email : email,
					password : password,
					loggedIn : true,
				})
			);
		}else{
			console.error('Invalid Form');
		}
		e.preventDefault();

	};

	const handleChange = (event) => {
		event.preventDefault();
		const { placeholder, value } = event.target;
		let errorList = errors;
	
		switch (placeholder) {
		  case 'Full Name': 
		  errorList.fullName = 
			  value.length < 5
				? 'Full Name must be at least 5 characters long!'
				: '';
			break;
		  case 'Email': 
		  errorList.email = 
			  validEmailRegex.test(value)
				? ''
				: 'Email is not valid!';
			break;
		  case 'Password': 
		  errorList.password = 
			  value.length < 6
				? 'Password must be at least 6 characters long!'
				: '';
			break;
		  default:
			break;
		}
	
		setErrors(errorList);
	  }


	return (
			<div className = "login">
				<form className = "loginForm" onSubmit={(e) => handleSubmit(e)}>
					<h2>Employee Login Portal</h2>
					<input type="name" placeholder="Full Name" value={fullname} onInput={(e) => setName(e.target.value)} onChange={(e) => handleChange(e)} noValidate/>
					{errors && errors.fullName.length > 0 && <span className='error'>{errors.fullName}</span>}
					
					<input type="email" placeholder="Email" value={email} onInput={(e) => setEmail(e.target.value)} onChange={(e) => handleChange(e)}noValidate />
					{errors && errors.email.length > 0 && <span className='error'>{errors.email}</span>}

					<input type="password" placeholder="Password" value={password} onInput={(e) => setPassword(e.target.value)} onChange={(e) => handleChange(e)} noValidate/>
					{ errors &&  errors.password.length > 0 && <span className='error'>{errors.password}</span>}
					
					<button type="submit" className="submit_btn"> Submit </button>
				</form>
			</div>
			
		)
}

export default Login;