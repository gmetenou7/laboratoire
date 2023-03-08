import React, { Fragment, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../layout/Navbar.tsx'
import Sidebar from '../layout/Sidebar.tsx'
import { getAppToken } from './Utils.tsx'
import callApi from "../../Utils/Utils.tsx";
import { notification } from "../../Utils/Utils.tsx";
import { formatData } from "../../Utils/Utils.tsx";
const UserProfile = () => {

    const [show2, setShow2] = useState(false);
    const [matricule, setMatricule]=useState('');
    const [nom, setNom]=useState('');
    const [email, setEmail]=useState('');
    const [fonction, setFonction]=useState('')
    const [telephone, setTelephone]=useState('')
    const [prenom, setPrenom]=useState('')
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const router = useNavigate()

    const handleDeconnexion=()=>{
        localStorage.removeItem('_grecaptcha')
        localStorage.removeItem('user')
        localStorage.removeItem('matriculeLabo')
        localStorage.removeItem('matriculeLabo')
        localStorage.removeItem('matriculeEmploye')
        localStorage.removeItem('matriculeAgence')
        localStorage.removeItem('username')
        localStorage.removeItem('Apitoken')
        
        router('/SignIn')
        window.location.reload();
    }

    /**recuperer les informations d'un utilisateur en fonction de son matricule***/ 

    const handleRetrieve = async()=>{
        
        let users :any = localStorage.getItem('user')
        let info: any = JSON.parse(users)

        setMatricule(info.matricule)
        setNom(info.nom)
        setEmail(info.email)
        setFonction(info.fonction)
        setTelephone(info.telephone)
        setPrenom(info.prenom)


   
}

/***Mise à jour du profile du user */


const handleUpdateById = async(e:any)=>{

    e.preventDefault();

    let userInfo={
        nom:nom,
        prenom:prenom,
        email:email,
        telephone:telephone,
        fonction: fonction

    }
    let token= await getAppToken()
      if(token){
        console.log(token)

        localStorage.setItem('Apitoken', token)
        let response= await callApi(true, `employe/${matricule}`, 'put', null, userInfo)
        

        if (response.data.success){
            notification('success', response.data.message)
            
           
            //  localStorage.getItem( response.data.data.email)
            //  localStorage.setItem('user', JSON.stringify(response.data.data))
            //  localStorage.setItem('username', response.data.data.email)
            // console.log("email", response.data.data)
        }else{
            notification('error', formatData(response.data.data) === '' ? response.data.message : formatData(response.data.data))
            
        }
        }

}

useEffect(()=>{
    handleRetrieve()
    
   },[])
  return (

   
    <Fragment>

<Modal
        show={show2}
        onHide={handleClose2}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Voulez-vous vraiment vous deconnecter ?</Modal.Title>
        </Modal.Header>
       
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeconnexion}>
            Oui
          </Button>
          <Button variant="primary" onClick={handleClose2}>
            Non
          </Button>
         
        </Modal.Footer>
      </Modal>
        <Navbar/>
        <Sidebar/>
    <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper" id="kt_wrapper">
    <div className="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content"></div>
											
        <div className="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content">
            <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
            <div className="kt-grid kt-grid--desktop kt-grid--ver kt-grid--ver-desktop kt-app">
   
    <button className="kt-app__aside-close" id="kt_profile_aside_close">
        <i className="la la-close"></i>
    </button>
    
    <div className="kt-grid__item kt-app__toggle kt-app__aside kt-app__aside--sm kt-app__aside--fit" id="kt_profile_aside">
       
<div className="kt-portlet">
    <div className="kt-portlet__body">
        <div className="kt-widget kt-widget--general-1">
            {/* <div className="kt-media kt-media--brand kt-media--md kt-media--circle">
                <img src="../../../../themes/keen/theme/demo1/dist/assets/media/users/100_3.jpg" alt="image"/>
            </div> */}
            <div className="kt-widget__wrapper">
                <div className="kt-widget__label">
                    <a href="#" className="kt-widget__title">
                                {nom}
                            </a>
                    <span className="kt-widget__desc">
                               {fonction}
                            </span>
                </div>
                <div className="kt-widget__toolbar kt-widget__toolbar--top-">
                    <div className="btn-group">
                        
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className="kt-portlet__separator"></div>

    <div className="kt-portlet__body">
        <ul className="kt-nav kt-nav--bolder kt-nav--fit-ver kt-nav--v4" role="tablist">
            <li className="kt-nav__item  active ">
            <Link to='/profile' className="kt-nav__link active"  role="tab">
                    <span className="kt-nav__link-icon"><i className="flaticon2-user"></i></span>
                    <span className="kt-nav__link-text">Informations Personnelles</span>
            </Link>
                
            </li>
            
            <li className="kt-nav__item  ">
                <Link to='/Resetpassword' className="kt-nav__link"  role="tab">
                    <span className="kt-nav__link-icon"><i className="flaticon2-settings"></i></span>
                    <span className="kt-nav__link-text">Changer votre mot de passe</span>
                </Link>
            </li>
            
        </ul>
    </div>

    <div className="kt-portlet__separator"></div>

    <div className="kt-portlet__body">
        <ul className="kt-nav kt-nav--bolder kt-nav--fit-ver kt-nav--v4" role="tablist">
            <li className="kt-nav__custom">
                <button className="btn btn-default btn-sm btn-upper btn-bold" onClick={handleShow2}>
                            Deconnexion
                </button>
            </li>
        </ul>
    </div>
</div>
</div>
   
    <div className="kt-grid__item kt-grid__item--fluid kt-app__content">
        <div className="kt-portlet">
            <div className="kt-portlet__head">
                <div className="kt-portlet__head-label">
                    <h3 className="kt-portlet__head-title"> Informations Personelles <small>Mettez à jour vos informations Personnelles</small></h3>
                </div>
                <div className="kt-portlet__head-toolbar">
                    <div className="kt-portlet__head-wrapper">
                        
                    </div>
                </div>
            </div>
            <form className="kt-form kt-form--label-right" id="kt_profile_form" onSubmit={handleUpdateById}>
                <div className="kt-portlet__body">
                    <div className="kt-section kt-section--first">
                        <div className="kt-section__body">
                            
                            

                            <div className="form-group row">
                                <label className="col-xl-3 col-lg-3 col-form-label">Nom</label>
                                <div className="col-lg-9 col-xl-6">
                                    <input className="form-control" type="text" value={nom} placeholder='nom' onChange={(e)=>setNom(e.target.value)}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-xl-3 col-lg-3 col-form-label">Prénom</label>
                                <div className="col-lg-9 col-xl-6">
                                    <input className="form-control" type="text" value={prenom} placeholder='prenom' onChange={(e)=>setPrenom(e.target.value)}/>
                                </div>
                            </div>
                            

                            <div className="row">
                                <label className="col-xl-3"></label>
                                <div className="col-lg-9 col-xl-6">
                                    <h3 className="kt-section__title kt-section__title-sm">Info Contact :</h3>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-xl-3 col-lg-3 col-form-label">Telephone</label>
                                <div className="col-lg-9 col-xl-6">
                                    <div className="input-group">
                                        <div className="input-group-prepend"><span className="input-group-text"><i className="la la-phone"></i></span></div>
                                        <input type="text" className="form-control" value={telephone} placeholder="Phone" aria-describedby="basic-addon1" onChange={(e)=>setTelephone(e.target.value)}/>
                                    </div>
                                   
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-xl-3 col-lg-3 col-form-label">Email </label>
                                <div className="col-lg-9 col-xl-6">
                                    <div className="input-group">
                                        <div className="input-group-prepend"><span className="input-group-text"><i className="la la-at"></i></span></div>
                                        <input type="text" className="form-control" value={email} placeholder="Email" aria-describedby="basic-addon1" onChange={(e)=>setEmail(e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group form-group-last row">
                                <label className="col-xl-3 col-lg-3 col-form-label">Fonction</label>
                                <div className="col-lg-9 col-xl-6">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="nom de l'agence" value={fonction}/>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="kt-portlet__foot">
                    <div className="kt-form__actions">
                        <div className="row">
                            <div className="col-lg-3 col-xl-3">
                            </div>
                            <div className="col-lg-9 col-xl-9">
                                <button type="submit" className="btn btn-success">Mettre à Jour</button>&nbsp;
                                <button type="reset" className="btn btn-secondary">Annuler</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    
</div>
            </div>
        </div>
        </div>
    </Fragment>
  )
}

export default UserProfile