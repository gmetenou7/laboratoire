import React, { Fragment, useEffect, useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
 import logo from './logincss/logo-5.png'
import * as Yup from 'yup';
import { getAppToken } from "./Utils.tsx";
import callApi from "../../Utils/Utils.tsx";
import { ToastContainer, toast } from 'react-toastify';
import { notification } from "../../Utils/Utils.tsx";
import { formatData } from "../../Utils/Utils.tsx";
import { Spinner } from "react-bootstrap";
import ReCAPTCHA from 'react-google-recaptcha'



 

function SignIn(){

 	const router = useNavigate()
	const [email, setEmail]= useState('');
	const [password, setPassword] = useState('');
	const [loaderSignIn, setLoaderSignIn]= useState(false)
	const [validate, setValideCaptcha]= useState(false);
	const [erroremail,setErroremail]=useState(false)
	const [errorpassword, seterrorPassword]=useState(false)
    // const [matricule_ag, setMatricule_ag]=useState("")
    // const [matricule_serv, setMatricule_serv]=useState("")
    // const [nom_serv, setNom_serv]=useState()
  


   

	const handleChangeEmail =(e:any)=>{

		setEmail(e.target.value);
		
		// if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
		// 	setErroremail(true);
			
		//   } else {
		// 	setErroremail(false)
			
		//   }
	}

	const handleChangePwd =(e:any)=>{

		setPassword(e.target.value);
		// if (!/^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$/i.test(password)) {
		// 	seterrorPassword(true);
			
		//   } else {
		// 	seterrorPassword(false)
		//   }
		
	}
	 
	
	const handleSubmit = async (e:any) => {
		e.preventDefault();

		
		let loginUser={
			email:email,
			password:password
		  }
		  let token= await getAppToken()
		  if(token){
			//console.log(token)
			setLoaderSignIn(true)
			localStorage.setItem('Apitoken', token)
			let response= await callApi(true, 'login', 'post', null, loginUser)
			console.log(response)
			//console.log(response.data.matricule)
			

			// setLoaderSignIn(false)

			if (response.data.success){
				
				setLoaderSignIn(false)
				 localStorage.getItem( response.data.data.email)
				 localStorage.setItem('user', JSON.stringify(response.data.data))
				 
				 localStorage.setItem('username', response.data.data.email)
				 localStorage.setItem('matriculeLabo', response.data.data.matricule_labo)
				 localStorage.setItem('matriculeEmploye', response.data.data.matricule)
				 localStorage.setItem('matriculeAgence', response.data.data.matricule_ag)
				 let matricule_ag=response.data.data.matricule_ag
				 let matricule_serv=response.data.data.matricule_serv
				 let nom_serv=response.data.data.nomservice
				 setLoaderSignIn(false)
				//  setMatricule_ag(response.data.data.matricule_ag);
		        //  setMatricule_serv(response.data.data.matricule_serv);
		        //  setNom_serv(response.data.data.nomservice)
				
				console.log("email", matricule_ag)

				if(matricule_ag==null && matricule_serv ==null){
					router('/accueil')
					console.log("admin");
					
				}

				else if(nom_serv==="laboratoire"){
					router('/examens')
					console.log("laborantin");
				}

				else if(nom_serv==="accueil"){
					router('/listepatient')
					console.log("accueil");
				}
				notification('success', response.data.message)
			}
			
			else{
				setLoaderSignIn(false)
				notification('error', formatData(response.data.data) === '' ? response.data.message : formatData(response.data.data))
				
			}
		  }else notification('error', "impossible de générer le token")
		  setLoaderSignIn(false)
		 
		  console.log('user', loginUser)

	  };

	  const onChange=(value:any) =>{
        console.log('Captcha value:', value);
        if(value){
            setValideCaptcha(true)
        }
        else{
          setValideCaptcha(false)
        }
      }

	  
	  const btn=   <button type="submit"  className="btn btn-brand btn-elevate btn-pill" id="kt_login_submit" disabled={ email=='' || password=='' || !validate  }>Se connecter</button>;

    return(
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
						<h3>Connectez-vous</h3>
					</div>
						
					<form className="kt-login-v2__form kt-form" onSubmit={handleSubmit}>
						<div className="form-group">
							<input className="form-control" type="text" placeholder=" Email" name="username" value={email} onChange={handleChangeEmail} />
							{erroremail && (
							<span style={{ color: "red", fontSize: "16px" }}>
								Adresse e-mail invalide
							</span>
							)}
						</div>
						<div className="form-group">
							<input className="form-control" type="password" placeholder="Mot de passe" name="password" value={password} onChange={handleChangePwd} />
							{errorpassword && (
							<span style={{ color: "red", fontSize: "16px" }}>
								Entrez un mot de passe valide
							</span>
							)}
						</div>
						<div className="form-group">
							<ReCAPTCHA style={{marginTop: 10, marginBottom: 15}}
							sitekey="6LdDh80ZAAAAAJKGgWIKw_veDK0c5MOckGkP6fFe"
							onChange={onChange}
							/>
						</div>
						<div className="kt-login-v2__actions">
							<Link to='/Resetpassword' className="kt-link kt-link--brand">
								Mot de passe oublié?
							</Link>
							 {!loaderSignIn ? (
                                <button  type="submit" className="btn btn-brand btn-elevate btn-pill" id="kt_login_submit"  disabled={ email=='' || password=='' || !validate  }>Se connecter</button>
                              ) : (
                                <Spinner animation="grow" />
                              )} 
							  {/* {btn} */}
							
						</div>
					</form>
					<div className="kt-separator kt-separator--space-lg  kt-separator--border-solid"></div>
					
					<div className="kt-login-v2__desc">
					<span>Pas de compte? </span>
				<Link to='/signup' className="kt-link kt-font-brand"> Créer mon Organisation?</Link>
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
    );
}

export default SignIn