import React, { Fragment, useEffect, useState } from 'react'
import { Button, Container, Modal, Row, Form, Col, NavItem } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../layout/Navbar.tsx'
import Sidebar from '../layout/Sidebar.tsx'
import { getAppToken } from '../login/Utils.tsx';
import callApi from '../../Utils/Utils.tsx';
import { notification } from "../../Utils/Utils.tsx";
import { formatData } from "../../Utils/Utils.tsx";


const DetailAgence =(props)=>{

    let id = document.location.pathname.split("/")[2]
    const [show3, setShow3] = useState(false);
    const [nom, setNom]=useState('')
  const [telephone, setTelephone]= useState(0)
  const [email, setEmail]=useState('')
  const [matricule, setMatricule]=useState(0)
  const [list, setList]=useState([])
  const [employe, setEmploye] =useState([])
  const [matricule_labo, setMatricule_labo]= useState('')
  const [agence, setAgence]=useState([]);
  const [emailag, setEmailag]=useState('')
  const [matriculeag, setMatriculeag]= useState('')
  const [nom_ag, setNom_ag]=useState('')
  const [agencematSession, setAgencematSession]=useState("")
    const handleClose3 = () => setShow3(false);

    const handleShow3 = () => setShow3(true);


    const handleChangeNom =(e:any)=>{

        setNom(e.target.value);
      }
      
      const handleChangeTelephone =(e:any)=>{
      
        setTelephone(e.target.value);
      }
      
      const handleChangeEmail =(e:any)=>{
      
        setEmail(e.target.value);

    }

    /***Retrieve all service */
    const [matricule_laboSession, setMatricule_laboSession]=useState('')
    const inituserLab=()=>{
        let users: any = localStorage.getItem("user")
        let user:any = JSON.parse(users)
        setMatricule_laboSession(user.matricule_labo)
        setAgencematSession(user.matricule_ag)
        // sessionMatlabo= user.matricule_labo
        console.log('azeerrt',matricule_laboSession)
      }

      /**afficher la liste des agences  { */
   const onShowAgence = async ()=>{
    
   
    
    
    let token= await getAppToken()

    console.log('-----', document.location);
    let id = document.location.pathname.split("/")[2]
  console.log("ttttt ", id);
  
    
		  if(token){
			console.log(token)
      localStorage.setItem('Apitoken', token)
       
          let response= await callApi(true, 'agence/'+ id, 'get', null)
          console.log("response ", response);
          
        let datas= response.data.data
        setAgence(datas);
        console.log('ageaaa', datas);
        
        // datas?.map((item:any)=>{
        //     setMatricule_labo(item.matricule_labo)
        //   setEmailag(item.email)
        //   setMatriculeag(item.matricule_ag)
        //   setNom_ag(item.nom)
        //   console.log(email)
        // })
		//	console.log(response)
        }
       
        
			
   }

   const onShowAgenceById = async ()=>{
    
    let token= await getAppToken()
		  if(token){
			console.log(token)
      localStorage.setItem('Apitoken', token)
       
          let response= await callApi(true, 'agence/', 'get', null)
        
        if (response.data.success) {
            let datas= response.data.data
            setAgence(datas);
            console.log('ageaaa', datas);
            
			//console.log(response)
          }else{
            notification('error', formatData(response.data.data) === '' ? response.data.message : formatData(response.data.data))
  
        }
        }
        
       
        
			
   }

   
    const handleShowService= async()=>{
        let token= await getAppToken()
        
        if(token){
          console.log(token)

          localStorage.setItem('Apitoken', token)
          let response= await callApi(true, 'service', 'get', null)
          
           
          if (response.data.success){
                console.log(response.data.data)
                let  listes =response.data.data
                setList(listes)
                
                console.log('list', listes);
                
                    list.map((item:any)=>{
                        setMatricule_labo(item.matricule_labo)
                        console.log('aaaaaaaaaaa',item.nom);
                        
                    })
              //notification('success', response.data.message)
              
          }else{
              notification('error', formatData(response.data.data) === '' ? response.data.message : formatData(response.data.data))

          }
        }
       
    }

     /***Retrieve all employees */


     const handleShowEmploye= async()=>{
        let token= await getAppToken()
        if(token){
          console.log(token)

          localStorage.setItem('Apitoken', token)
          let response= await callApi(true, 'employe', 'get', null)
          console.log(response.data.data)
          let  Employes =response.data.data
          setEmploye(Employes)
          
          console.log('list', list);
          

          if (response.data.success){
              //notification('success', response.data.message)
              
          }else{
              notification('error', formatData(response.data.data) === '' ? response.data.message : formatData(response.data.data))

          }
        }
       
    }
      /****Create a service */
    const handleCreate = async (e:any) => {
        let mat= '22-36040'
            e.preventDefault();
            let registerAgence={
          matricule_ag:agence.matricule,
              nom:nom,
              telephone: telephone,
              email: email,
              matricule_labo: matricule_laboSession
              
    }
              let token= await getAppToken()
              if(token){
                console.log(token)
    
                localStorage.setItem('Apitoken', token)
                let response= await callApi(true, 'service', 'post', null, registerAgence)
                console.log(response)
    
                if (response.data.success){
                    handleShowService()
                    setShow3(false)
                    notification('success', response.data.message)
                    
                }else{
                    notification('error', formatData(response.data.data) === '' ? response.data.message : formatData(response.data.data))
    
                }
              }
             
              console.log('user', registerAgence)
    
          };
          const [chiffreaffire, setChiffreaffire]=useState("")
          const [nbreClient, setNbreClient]=useState("")
          const [nbreExamen, setNbreExamen]=useState("")
          const [caagence, setCaagence]=useState([])
          const [caagenceExamen, setCaagenceExamen]=useState([])
          
          const onShowChiffrAffaire = async ()=>{
          
              let token= await getAppToken()
                    if(token){
                    let id= sessionMatlabo
                localStorage.setItem('Apitoken', token)
                      let response= await callApi(true, `chiffreaffire/${id}`, 'get', null)
                  let ca= response.data.data.caentreprise
      
                  setChiffreaffire(ca)
                  setCaagence(response.data.data.caagence)
                      console.log("ca",response)}
             }
      
             const onShowNbrePatient = async ()=>{
          
              let token= await getAppToken()
                    if(token){
                      let id= sessionMatlabo
                localStorage.setItem('Apitoken', token)
                      let response= await callApi(true, `nbrclient/${id}`, 'get', null)
                      let client= response.data.data
      
                  setNbreClient(client)
                   }
                  }
             const onShowNbreExamen = async ()=>{
          
              let token= await getAppToken()
                    if(token){
                      let id= sessionMatlabo
                localStorage.setItem('Apitoken', token)
                      let response= await callApi(true, `nbrexamen/${id}`, 'get', null)
                      let caentreprise= response.data.data.caentreprise
      
                      setNbreExamen(caentreprise)
                      setCaagenceExamen(response.data.data.caagence)
                      console.log("examen",response)}
             }
      
            

          useEffect(()=>{
            handleShowService()
            handleShowEmploye()
            inituserLab()
            onShowAgence()
            onShowChiffrAffaire()
              onShowNbreExamen()
              onShowNbrePatient()
              inituserLab() 
          },[])
    return(
        <Fragment>
             {/* /***  Créer un service*/ }
<Modal
        show={show3}
        onHide={handleClose3}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Créer un service</Modal.Title>
        </Modal.Header>   
        <Modal.Body>
        <Form onSubmit={handleCreate}>
          
          <Container>
          <Row>
            <Col xs={6} md={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
           <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                value={nom}
                placeholder="AByster"
                onChange={handleChangeNom}
              />
          </Form.Group>
            </Col>
            <Col xs={6} md={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
           <Form.Label>Téléphone</Form.Label>
              <Form.Control
                type="number"
                value={telephone}
                placeholder="+237696295892"
                onChange={handleChangeTelephone}
              />
          </Form.Group>
            </Col>
            <Col xs={6} md={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
           <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="gildas@gmail.com"
                onChange={handleChangeEmail}
              />
          </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={4}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
           {/* <Form.Label>Matricule_ag</Form.Label>
              <Form.Control
                type="text"
                id='matricule_ag'
                placeholder="22-36040"
                autoFocus
              /> */}
          </Form.Group>
          
            </Col>
            
          </Row>
          </Container>
          <Button variant="primary" type='submit' style={{marginLeft:"90%"}}>
            Créer 
          </Button>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          
         
        </Modal.Footer>
        
           
      </Modal>
            <Navbar/>
            <Sidebar/>
            <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper" id="kt_wrapper">
            <div className="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content"></div>
                <div className="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content">
                    <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
                    <div className="kt-portlet kt-widget kt-widget--fit kt-widget--general-3">
    <div className="kt-portlet__body">
        <div className="kt-widget__top">
            {/* <div className="kt-media kt-media--xl kt-media--circle">
                <img src="../../../../themes/keen/theme/demo1/dist/assets/media/users/100_1.jpg" alt="image">
            </div> */}
            <div className="kt-widget__wrapper">
                <div className="kt-widget__label">
                    <a  className="kt-widget__title">
                                   {agence.nom} {agence.matricule}
                                </a>
                   
                </div>
                <div className="kt-widget__progress">
                    {/* <div className="kt-widget__cont">
                        <div className="kt-widget__stat">
                            <span className="kt-widget__caption">Progress</span>
                            <span className="kt-widget__value">78</span>
                        </div>
                        <div className="progress">
                            
                            <div className="progress-bar bg-brand" role="progressbar" style={{width: "40%" }} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div> */}
                </div>
                <div className="kt-widget__links">
                    <div className="kt-widget__cont">
                        <div className="kt-widget__link">
                            <i className="flaticon2-send  kt-font-success"></i><a >{agence.email}  </a>
                        </div>
                        
                    </div>
                </div>
                <div className="kt-widget__stats">
                    <div className="kt-widget__stat" >
                        <span className="kt-widget__value">{nbreExamen}</span>
                        <span className="kt-widget__caption">Nombre Examen</span>
                    </div>
                    <div className="kt-widget__stat" >
                        <span className="kt-widget__value">{caagenceExamen}</span>
                        <span className="kt-widget__caption">Chiffre d'affaire</span>
                    </div>
                    <div className="kt-widget__stat" >
                        <span className="kt-widget__value">{nbreClient}</span>
                        <span className="kt-widget__caption">Patients</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
   
</div>


<div className="tab-content">
    <div className="tab-pane fade show active" id="kt_tabs_1_1" role="tabpanel">
     <div className="row">
            <div className="col-lg-6 col-xl-6  order-lg-1 order-xl-1">
                
<div className="kt-portlet kt-portlet--height-fluid">
	<div className="kt-portlet__head">
		<div className="kt-portlet__head-label">
			<h3 className="kt-portlet__head-title">Liste des Services  </h3>
		</div>
		<div className="kt-portlet__head-toolbar">
			<div className="kt-portlet__head-actions">
				<button  className="btn btn-default btn-upper btn-sm btn-bold" onClick={handleShow3}>Créer un service</button>
			</div>
		</div>
	</div>
	<div className="kt-portlet__body kt-portlet__body--fit kt-portlet__body--fluid">
		<div className="kt-widget-7">
			<div className="kt-widget-7__items">
                {list.length >0 &&<>
                    {list.map((key:any)=>{
                        
                        if(key.matricule_labo === matricule_laboSession && id===key.matricule_ag){

                        
                                return(
                                    <div className="kt-widget-7__item">
                                <div className="kt-widget-7__item-info">
                                    
                                    <a  className="kt-widget-7__item-title">
                                        {key.nom}
                                        
                                    </a>
                                </div>
                            </div>
                                )
                        }
                })}
                </>}
                
				{list.length===0 && <div className="kt-widget-7__item">
					<div className="kt-widget-7__item-info">
						<a  className="kt-widget-7__item-title">
							Accueil
						</a>
					</div>
				</div>}
                
				<div className="kt-widget-7__item">
					
					<div className="kt-widget-7__item-info">
						
					</div>
					
				</div>
				<div className="kt-widget-7__item">
				
				</div>
				<div className="kt-widget-7__item">
				
				</div>
				<div className="kt-widget-7__item">
				
				</div>
			</div>
			
            
		</div>
	</div>
</div>


            </div>

            <div className="col-lg-12 col-xl-6  order-lg-1 order-xl-1">
                
<div className="kt-portlet kt-portlet--height-fluid">
    <div className="kt-portlet__head">
        <div className="kt-portlet__head-label">
            <h3 className="kt-portlet__head-title">Liste des Employés</h3>
        </div>
        {/* <div className="kt-portlet__head-toolbar">
            <div className="kt-portlet__head-actions">
                <a href="#" className="btn btn-default btn-sm btn-bold btn-upper">CSV</a>
            </div>
        </div> */}
    </div>
    <div className="kt-portlet__body">
        <div className="kt-widget-4">
            <div className="kt-widget-4__item">
                <div className="kt-widget-4__item-content">
                    {employe.length > 0 &&<>
                        {employe.map((item:any)=>{
                            if(item.matricule_labo === matricule_laboSession && id===item.matricule_ag){
                                    return(
                                        <div className="kt-widget-4__item-section">
                                    <div className="kt-widget-4__item-info">
                                        <a href="#" className="kt-widget-4__item-username">{item.nom}</a>
                                        <div className="kt-widget-4__item-desc">{item.fonction}</div>
                                    </div>
                                </div>
                                    )
                            }
                    })  }
                    </>}
                    
                    
                </div>
                {/* <div className="kt-widget-4__item-content">
                    <div className="kt-widget-4__item-price">
                        <span className="kt-widget-4__item-badge">$</span>
                        <span className="kt-widget-4__item-number">830</span>
                    </div>
                </div> */}
            </div>

            <div className="kt-widget-4__item">
                <div className="kt-widget-4__item-content">
                    {employe.length===0 &&
                        <div className="kt-widget-4__item-section">
                        
                        <div className="kt-widget-4__item-info">
                            <a href="#" className="kt-widget-4__item-username">Ashley Stock</a>
                            <div className="kt-widget-4__item-desc">Receptionniste</div>
                        </div>
                    </div>
                    }
                    
                </div>
                {/* <div className="kt-widget-4__item-content">
                    <div className="kt-widget-4__item-price">
                        <span className="kt-widget-4__item-badge">$</span>
                        <span className="kt-widget-4__item-number">675</span>
                    </div>
                </div> */}
            </div>

            

            

            
        </div>
    </div>
</div>
 </div>

</div>
</div>
<Link to='/agences' className="btn btn-primary">Retour  </Link>
</div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default DetailAgence