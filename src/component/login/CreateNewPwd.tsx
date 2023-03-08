import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from './logincss/logo-5.png';
import { getAppToken } from "./Utils.tsx";
import callApi from "../../Utils/Utils.tsx";
import { notification } from "../../Utils/Utils.tsx";
import { formatData } from "../../Utils/Utils.tsx";
import { useNavigate } from "react-router-dom";
const CreateNewPwd = () => {

	const [password, SetPassword]=useState('')
	const [cpassword, SetCpassword]=useState('')
	const [codeEmp, setCodeEmp]=useState('')
		const router = useNavigate()

		const initcode=()=>{
			let codes: any = localStorage.getItem("codeEmploye")
			//let code:any = JSON.parse(codes)
			setCodeEmp(codes)
		  }
		const resetpassword = async(e:any)=>{
			
			e.preventDefault();

			let NewPassWord={
				password:password,
				cpassword:cpassword,
				empcode:codeEmp
				
			  }
			  let token= await getAppToken()
			  if(token){
				console.log(token)
	
				localStorage.setItem('Apitoken', token)
				let response= await callApi(true, 'passwordempupdate', 'post', null, NewPassWord)
				console.log(response)
				//console.log(response.data.matricule)
				
	
				// setLoaderSignIn(false)
	
				if (response.data.success){
					notification('success', response.data.message)
					router('/SignIn')
					
					
				}else{
					notification('error', formatData(response.data.data) === '' ? response.data.message : formatData(response.data.data))
					
				}
			  }else notification('error', "impossible de générer le token")
			 
			 
			  console.log('user', NewPassWord)
	
		  };
	
	  useEffect(()=>{
		initcode()
	  }, [])
  return (
    <Fragment>
        
		<div className="kt-grid kt-grid--ver kt-grid--root">
		<div className="kt-grid__item   kt-grid__item--fluid kt-grid  kt-grid kt-grid--hor kt-login-v2" id="kt_login_v2">
		<div className="kt-grid__item  kt-grid--hor">
		
		<div className="kt-login-v2__head">
			<div className="kt-login-v2__logo">
				<a href="#">
					<img src={logo} alt="logo" />
				</a>
			</div>
			
		</div>
			</div>
		<div className="kt-grid__item  kt-grid  kt-grid--ver  kt-grid__item--fluid">
				<div className="kt-login-v2__body">
			
			<div className="kt-login-v2__wrapper">
				<div className="kt-login-v2__container">
					<div className="kt-login-v2__title">
						<h3>Créer un nouveau mot de passe</h3>
					</div>

					<form className="kt-login-v2__form kt-form" action="#"  id="kt_login_form" onSubmit={resetpassword}>
						
						
                        <div className="form-group">
						
							<input className="form-control" type="password" placeholder="Entrer un nouveau mot de passe" name="password" 
										value={password} onChange={(e)=>SetPassword(e.target.value)}/>
						</div>
                        <div className="form-group">
						
							<input className="form-control" type="password" placeholder="Confirmer le nouveau mot de passe" name="password" 
									value={cpassword} onChange={(e)=>SetCpassword(e.target.value)}/>
						</div>
						<div className="kt-login-v2__actions">
							
							<button  type="submit" className="btn btn-brand btn-elevate btn-pill" id="kt_login_submit">Enregistrer</button>
						</div>
						
					</form>
					<div className="kt-separator kt-separator--space-lg  kt-separator--border-solid"></div>
					
					<div className="kt-login-v2__desc">
					
					</div>
					<div className="kt-login-v2__options">
						
					</div>
			</div>	
			</div>	
				</div>
			</div>
			
			

			
			<div className="kt-login-v2__image">
				<img src="https://keenthemes.com/keen/themes/keen/theme/demo1/dist/assets/media/misc/bg_icon.svg" alt=""/>
			</div>
			
		</div>
			</div>
			
			<div className="kt-footer kt-grid__item kt-grid kt-grid--desktop kt-grid--ver-desktop" id="kt_footer">
      <div className="kt-container  kt-container--fluid ">
                        <div className="kt-footer__copyright">
    © Copyright {(new Date()).getFullYear()} |<Link to=''  className="kt-link"> Laboratoire</Link>
    </div>
      </div>
      </div>
    </Fragment>
  )
}

export default CreateNewPwd