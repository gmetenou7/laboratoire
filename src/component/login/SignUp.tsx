import React, { Fragment, useState, useRef } from "react";
import { Formik, ErrorMessage } from "formik";
import {useForm, SubmitHandler} from 'react-hook-form'
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { getAppToken } from "./Utils.tsx";
import logo from './logincss/logo-5.png'
import callApi, { formatData, notification } from "../../Utils/Utils.tsx";
import { Button, Col, Modal, Spinner } from "react-bootstrap";


interface IFormInput{
  nomlabo:string,
  telephonelabo:number,
  emaillabo: string,
  payslabo:string,
  villelabo:string,
  regionlabo: string,
  ruelabo:string,
  nomag: string,
  telephoneag:number ,
  emailag: string,
  paysag: string,
  villeag:string ,
  regionag: string,
  rueag: string ,
  nomemp:string ,
  prenomemp:string,
  telephoneemp:number,
  emailemp: string,
  fonctionemp:string,
  passwordemp:string,
}

const pays =["République démocratique du Congo", "Cameroun", "France", "São Tomé-et-Principe", "Sénégal"]
const pays1 =["République démocratique du Congo", "Cameroun", "France", "São Tomé-et-Principe", "Sénégal"]


function SignUp(){

 
  const [nomLabo, setNomLabo]=useState('')
  const [telLabo, setTelLabo]=useState('')
  const [emailLabo, setEmailLabo]=useState('')
  const [payslabo, setPaysLabo]=useState('République démocratique du Congo')
  const [villeLabo, setVilleLabo]=useState('')
  const [regionlabo, setRegionLabo]= useState('')
  const [ruelabo, setRuelabo]= useState('')
  const [nomag, setNomag]= useState('')
  const [telephoneag, setTelephoneag]= useState('')
  const [emailag, setEmailag]=useState('')
  const [paysag, setPaysag]= useState('République démocratique du Congo')
  const [villeag, setVilleag]= useState('')
  const [regionag, setRegionag]= useState('')
  const [rueag, setRueag] = useState('')
  const [nomemp, setNomemp] = useState('')
  const [prenomemp, setPrenomemp]= useState('')
  const [telephoneemp, setTelephoneemp]= useState('')
  const [emailemp, setEmailemp]= useState('')
  const [fonctionemp, setFonctionemp]=useState('')
  const [passwordemp, setPasswordemp]=useState('')
  const router = useNavigate()
  const [show, setShow] = useState(false);
  const [selected1, setSelected1] = useState(pays[0]);
  const [selected2, setSelected2] = useState(pays1[0]);
  const [loaderSignUp, setLoaderSignUp]= useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {register, formState: {errors}, handleSubmit }= useForm< IFormInput>();
  
  const onSubmit =( data: IFormInput )=> {
    console.log('bonj');
    setShow(true);
  }
  const  handleRegister =async (e:any)=>{
    console.log('laboInfo')
    e.preventDefault()
    let laboInfo =
      {
        nomlabo:nomLabo,
        telephonelabo: telLabo,
        emaillabo: emailLabo,
        payslabo: selected1,
        villelabo:villeLabo ,
        regionlabo: regionlabo,
        ruelabo:ruelabo ,
        nomag: nomag,
        telephoneag:telephoneag ,
        emailag: emailag,
        paysag: selected2,
        villeag:villeag ,
        regionag: regionag,
        rueag: rueag ,
        nomemp:nomemp ,
        prenomemp: prenomemp,
        telephoneemp:telephoneemp,
        emailemp: emailemp,
        fonctionemp: fonctionemp,
        passwordemp: passwordemp,
  
    }
    let token= await getAppToken()
		  if(token){
			//console.log(token)
      setLoaderSignUp(true)
			localStorage.setItem('Apitoken', token)
			let response= await callApi(true, 'register', 'post', null, laboInfo)
		//	console.log(response)

			if (response.data.success){
        setLoaderSignUp(false)
        setShow(false)
				notification('success', response?.data?.message)
				router('/SignIn')
			}else{
				notification('error', formatData(response.data.data) === '' ? response.data.message : formatData(response.data.data))
        setLoaderSignUp(false)
			}
		  }
      // console.log('bonjour')
		 
		  // console.log('user', laboInfo)

    //console.log(data)
  }

  const [step, setStep] = useState({previous:0 , next:1})

  function changeStep(type){

    if(type === "next"){

      if(step.next <= 2) setStep((state) => { return { previous: state.previous + 1, next: state.next + 1}} )
    }else if(type === "previous"){

      if(step.previous > 0) setStep((state) => { return { previous: state.previous - 1, next: state.next - 1}} )
    }
  }
  
    return(
        <Fragment>

<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Creation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Vous avez renseigner des Informations pour la création d'un laboratioire
            <p>Cliquer sur "Créer" pour finaliser votre action et sur "fermer" pour annuler l'action</p>
        </Modal.Body>
        <Modal.Footer>
       
          {/* <Button variant="primary" onClick={handleClose}>
            Fermer
          </Button> */}
          {!loaderSignUp ? (
               <Button variant="primary"  onClick={handleRegister} style={{marginLeft:"90%"}}>
               Enregistrer
             </Button>
                     ) : (
                <Spinner animation="grow" />
                     )} 
          
         
        </Modal.Footer>
      </Modal>
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
              <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
                  <div className="kt-portlet">
                <div className="kt-portlet__body mx-right w-lg-201">
                  <div className="" id="kt_wizard_v3" data-ktwizard-state="step-first">
                   
                    <form className="kt-form" id="kt_form" onSubmit={handleSubmit(onSubmit)}>
              
                      <div className="__content" data-ktwizard-type="step-content" data-ktwizard-state={step.previous === 0 ? "current" : ""}>
                        <div className="kt-heading kt-heading--md" style={{textAlign: "center", color:'blue', fontSize:"30px"}}>1. Informations du  Laboratoire</div>
                        <div className="kt-separator kt-separator--height-xs"></div>
                        <div className="kt-form__section kt-form__section--first">
                            <div className="row">
                            <Col xs={6} md={4}>
                              <div className="form-group">
                                <label>Nom:</label>
                                <input   className="form-control" {...register('nomlabo', {required: true})} placeholder="Entrer le nom du Laboratoire" value={nomLabo} onChange={(e)=>setNomLabo(e.target.value)} />
                                {errors.nomlabo && <span  style={{color:'red', fontWeight: 'bold', }}>Le nom est un champ obligatoire</span>}
                                
                              </div>
                            </Col>
                            <Col xs={6} md={4}>
                              <div className="form-group">
                                <label>Contact:</label>
                                <input  className="form-control" {...register('telephonelabo',{pattern: /^\+[1-9]\d{10,14}$/ ,required: true})} placeholder="Entrer  le numero de telephone" value={telLabo}  onChange={(e)=>setTelLabo(e.target.value)}/>
                                {errors.telephonelabo &&  <span  style={{color:'red',fontWeight: 'bold', }}>Entrer votre numero de telephone valide</span>}
                                
                              </div>
                            </Col>
                            <Col xs={6} md={4}>
                              <div className="form-group">
                                <label>Email:</label>
                                <input type="email" className="form-control"  {...register('emaillabo', {pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, required: true} )} placeholder=" email@gmail.com" value={emailLabo} onChange={(e)=>setEmailLabo(e.target.value)} />
                                  {errors.emaillabo && <span  style={{color:'red', fontWeight: 'bold', }}>Entrer une adresse mail valide</span> }
                              </div>
                          </Col>
                          </div>
                          <div className="row">
                          <Col xs={6} md={4}>
                              <div className="form-group">
                                <label>Pays:</label>
                                <select className="form-control"  value={selected1} 
                                    onChange={e => setSelected1(e.target.value)}> 
                                    {pays.map((value) => ( 
                                        <option value={value} key={value}> 
                                    {value} 
                                  </option> 
                                  ))} 
                              </select>
                                
                                
                                {errors.payslabo && <span  style={{color:'red', fontWeight: 'bold', }}>Veuillez selectionner un pays</span>}
                              </div>
                              </Col>
                              <Col xs={6} md={4}>
                                <div className="form-group">
                                  <label>Ville:</label>
                                  <input type="text" className="form-control" {...register('villelabo', {required:true})} placeholder="Nom de la ville" value={villeLabo} onChange={(e)=>setVilleLabo(e.target.value)}/>
                                    {errors.villelabo && <span style={{color:'red', fontWeight: 'bold', }}>le champ ville est obligatoire</span>}
                                </div>
                              </Col>
                            
                            <Col xs={6} md={4}>
                              <div className="form-group">
                                <label>Region:</label>
                                <input type="text" className="form-control" {...register('regionlabo', {required:true})} placeholder="Entrer votre region" value={regionlabo} onChange={(e)=>setRegionLabo(e.target.value)}/>
                                {errors.regionlabo && <span  style={{color:'red', fontWeight: 'bold', }}>Le champ region est obligatoire</span>}
                              </div>
                              </Col>
                              <Col xs={6} md={4}>
                                <div className="form-group">
                                  <label>Rue:</label>
                                  <input type="text" className="form-control" {...register('ruelabo', {required:true})} placeholder="Entrer le nom de la rue" value={ruelabo} onChange={(e)=>setRuelabo(e.target.value)} />
                                  {errors.ruelabo && <span  style={{color:'red', fontWeight: 'bold', }}>Le champ rue est obligatoire</span>}
                                </div>
                              </Col>
                            </div>
                          
                        </div>
                      </div>

                      <div className="__content" data-ktwizard-type="step-content" data-ktwizard-state={step.previous === 1 ? "current" : ""} >
                        <div className="kt-heading kt-heading--md" style={{textAlign:'center', color:'blue', fontSize:"30px"}}>2. Créer un nouveau compte</div>
                        <div className="kt-separator kt-separator--height-xs"></div>
                        <div className="kt-form__section kt-form__section--first">
                          <div className="row">
                             <Col xs={6} md={4}>
                                <div className="form-group">
                                  <label>Nom</label>
                                  <input type="text" className="form-control"{...register('nomemp', {required: true})}placeholder="Entrer votre nom"
                                    value={nomemp} onChange={(e)=>setNomemp(e.target.value)}/>
                                  {errors.nomemp && <span style={{color:'red', fontWeight: 'bold'}}>S'il vous plait veuillez votre nom</span>}
                                </div>
                              </Col>
                              <Col xs={6} md={4}>
                                <div className="form-group">
                                  <label>Prénom</label>
                                  <input type="text" className="form-control" {...register('prenomemp', )}id="prenom" placeholder="Entrer votre prenom " 
                                  value={prenomemp} onChange={(e)=>setPrenomemp(e.target.value)}/>
                                  {errors.prenomemp && <span style={{color:'red', fontWeight: 'bold'}}>S'il vous plait veuillez votre prénom</span> }
                                </div>
                              </Col>
                              <Col xs={6} md={4}>
                                <div className="form-group">
                                    <label>Téléphone:</label>
                                    <input type="text" className="form-control"  {...register('telephoneemp', {pattern: /^\+[1-9]\d{10,14}$/ , required:true})} id="phone" 
                                    placeholder="ENtrer votre  numero de telephone" value={telephoneemp} onChange={(e)=>setTelephoneemp(e.target.value)} />
                                    {errors.telephoneemp && <span style={{color:'red', fontWeight: 'bold'}}> veuillez entrer un  numero de telephone valide</span>}
                                    
                                </div>
                              </Col>
                            </div>
                            <div className="row">
                              <Col xs={6} md={4}>
                                <div className="form-group">
                                  <label>Email:</label>
                                  <input type="email" className="form-control"  {...register('emailemp', {pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, required: true}
                                  )}
                                    id="email" placeholder="Entrer votre email" value={emailemp} onChange={(e)=>setEmailemp(e.target.value)} />
                                  {errors.emailemp && <span style={{color:'red', fontWeight: 'bold'}}>Entrer une adresse mail valide</span> }
                                </div>
                            </Col>
                              <Col xs={6} md={4}>
                                <div className="form-group">
                                  <label>Fonction</label>
                                  <input type="text" className="form-control"  {...register('fonctionemp', {required:true})} 
                                  id="fonction" placeholder="Entrer la fonction du laboratoire" value={fonctionemp} onChange={(e)=>setFonctionemp(e.target.value)}/>
                                  {errors.fonctionemp &&<span style={{color:'red', fontWeight: 'bold', }}>S'il vous plait veuillez renseigner la fonction de votre laboratoire</span> }
                                </div>
                              </Col>
                              <Col xs={6} md={4}>
                                <div className="form-group">
                                  <label>Mot de passe:</label>
                                  <input type="password" className="form-control" {...register('passwordemp', {pattern:/^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$/i, required: true} )}
                                  id="password" placeholder="Entrer votre mot de passe" value={passwordemp} onChange={(e)=>setPasswordemp(e.target.value)} />
                                  {errors.passwordemp && <span  style={{color:'red', fontWeight: 'bold', }}>Le mot de passe doit avoir:
                                    <ul>
                                      <li>Au moins 08 caractères</li>
                                      <li>Au moins une lettre majuscule</li>
                                      <li>Des lettres minuscules</li>
                                      <li>Des caracteres speciaux et des Chiffres</li>
                                    </ul>
                                    </span> }
                                </div>
                              </Col>
                                {/* <div className="form-group">
                                  <label>Confirmer votre mot de passe:</label>
                                  <input type="password" className="form-control bg-transparent" name="confirmpassword" id="confirmpassword" placeholder="Confirmer le mot de passe" />
                                
                                  <span style={{color:'red', fontWeight: 'bold', }}>Veuillez entrer un mot de passe identique.</span>
                                </div> */}
                                
                            </div>
                        </div> 
                      </div>

                      <div className="__content" data-ktwizard-type="step-content" data-ktwizard-state={step.previous === 2 ? "current" : ""}>
                        <div className="kt-heading kt-heading--md" style={{textAlign: "center", color:'blue', fontSize:"30px"}}>3. Informations de l'agence</div>
                        <div className="kt-separator kt-separator--height-xs"></div>
                        <div className="kt-form__section kt-form__section--first">
                          <div className="row">
                            <Col xs={6} md={4}>
                              <div className="form-group">
                                  <label>Nom:</label>
                                  <input type="text" className="form-control" {...register('nomag', {required:true})}  placeholder="Entrer le nom de l'agence"
                                  value={nomag} onChange={(e)=>setNomag(e.target.value)} />
                                  {errors.nomag && <span style={{color:'red', fontWeight: 'bold',}}>Veuillez entrer un nom</span>}
                              </div>
                            </Col>
                            <Col xs={6} md={4}>
                                <div className="form-group">
                                  <label>Contact:</label>
                                  <input type="text" className="form-control" {...register('telephoneag', {pattern: /^\+[1-9]\d{10,14}$/ ,required:true})}
                                  placeholder="numero de telephone" value={telephoneag} onChange={(e)=>setTelephoneag(e.target.value)}/>
                                  {errors.telephoneag && <span style={{color:'red', fontWeight: 'bold', }}>Entrer un numero de telephone valide</span>}
                                </div>
                            </Col>
                            <Col xs={6} md={4}>
                                <div className="form-group">
                                  <label>Email:</label>
                                  <input type="email" className="form-control" 
                                  placeholder="Email" {...register('emailag', {pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, required: true} )} value={emailag} onChange={(e)=>setEmailag(e.target.value)}/>
                                  {errors.emailag && <span style={{color:'red', fontWeight: 'bold'}}>Entrer une adresse mail valide</span> }
                                </div>
                            </Col>
                          </div> 
                          <div className="row">
                           <Col xs={6} md={4}>
                              <div className="form-group">
                                <label>Pays:</label>
                                <select className="form-control"  value={selected2} 
                                    onChange={e => setSelected2(e.target.value)}> 
                                    {pays1.map((value) => ( 
                                        <option value={value} key={value}> 
                                    {value} 
                                  </option> 
                                  ))} 
                              </select>
                                {errors.paysag && <span style={{color:'red', fontWeight: 'bold', }}>Veuillez selectionner un pays</span>}
                              </div>
                            </Col>  
                            <Col xs={6} md={4}>
                              <div className="form-group">
                                <label>Region:</label>
                                <input type="text" className="form-control"  
                                placeholder="Region"  {...register('regionag', {required:true})} value={regionag} onChange={(e)=>setRegionag(e.target.value)} />
                                {errors.regionag && <span style={{color:'red', fontWeight: 'bold', }}>Le champ region est obligatoire</span> }
                              </div>
                            </Col>
                            <Col xs={6} md={4}>
                              <div className="form-group">
                                <label>Ville:</label>
                                <input type="text" className="form-control" 
                                placeholder="Kinshassa" {...register('villeag', {required:true})}  value={villeag} onChange={(e)=>setVilleag(e.target.value)}/>
                                {errors.villeag && <span style={{color:'red', fontWeight: 'bold', }}>Le champ ville est obligatoire</span> }
                              </div>
                             </Col>
                             <Col xs={6} md={4}> 
                              <div className="form-group">
                                <label>Rue:</label>
                                <input type="text" className="form-control" 
                                placeholder="Kinshassa"  {...register('rueag', {required:true})} value={rueag} onChange={(e)=>setRueag(e.target.value)} />
                                {errors.rueag && <span style={{color:'red', fontWeight: 'bold', }}>Le champ ville est obligatoire</span> }
                              </div>
                             </Col> 
                            </div> 
                          </div>
                        </div>
                      
                      <div className="kt-form__actions">
                         
                            <span style={{marginTop: "10px", fontSize: "18px"}}>Déjà un compte? </span>
                            <Link to='/signIn' className="kt-link kt-font-brand" style={{marginTop: "20px", fontSize: "18px"}}> Connectez-vous</Link>
                         
                        <button className="btn btn-primary btn-bold btn-upper"  type="submit" style={{marginLeft:"90%"}}>
                            Enregistrer
                          </button>
                        {/* {step.previous > 0  && 
                          <button className="btn btn-primary btn-bold btn-upper"  onClick={()=> changeStep("previous")}>
                            Précèdent
                          </button>
                        } */}
                        
                          
                          {/* <button className="btn btn-primary btn-bold btn-upper"  onClick={() => changeStep("next")}>
                            Suivant
                          </button> */}

                          {/* {step.next === 3 && 
                          <button className="btn btn-primary btn-bold btn-upper"  type="submit">
                            Enregistrer
                          </button>
                          } */}
                      
                      </div>
                      </form>
                  </div>
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
	
		</div>
    </div>

        </Fragment>
    );
}

export default SignUp


