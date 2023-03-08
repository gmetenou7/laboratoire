import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Modal, Row, Form, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { getAppToken } from '../login/Utils.tsx';
import callApi from '../../Utils/Utils.tsx';
import { notification } from "../../Utils/Utils.tsx"
import Navbar from '../layout/Navbar.tsx';
import Sidebar from '../layout/Sidebar.tsx';
import PaginationBasic from '../Tools/PaginationBasic.tsx';
import { formatData } from "../../Utils/Utils.tsx";


const FamilleExamens = () => {
    const dropdownRef= useRef(null)
    const [loaderExam, setLoaderExam]= useState(false)
    const [show3, setShow3] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show, setShow] = useState(false);
    const [examen, setExamen]= useState([])
    const[famille, setFamille]= useState([])
    const [selectExam, setSelectExam]=useState({})
    const [Matricule_laboSession, setMatricule_laboSession]=useState()
    const [nom, setNom]= useState("")
    const [show4, setShow4]=useState(false)

    const handleClose3 = () => setShow3(false);
    const handleClose2 = () => setShow2(false);

    const [famExamen, setFamExamen] = useState([]);
    const [initialExamen, setInitialExamen] = useState([]);

    const [selectFamille, setSelectFamille] = useState({});
    const handleClose4 = () => setShow4(false);
    
    const handleClose = () => setShow(false);
    const handleShow = (examen:any) => {
      setSelectExam(examen)
      setShow(true)};

      const handleShow4 = (examen:any) => {
        setSelectExam(examen)
        setShow4(true)};
    
    const [isVisible, setIsVisible]= useState(false)
    const handleShow3 = () => setShow3(true);

    const [numberPerPage, setNumberPerPage] = useState(5);
    const [total, setTotal] = useState(1);
    const [filterFamExams, setfilterFamExams] = useState([]);
    const [initialExam, setInitialExam] = useState([]);
    const [initialExams, setInitialExams] = useState([]);

    const handleShow2 = () => {
      
      setShow2(true);
    };
    
    const handleShowexamen = async ()=>{
       
      let token= await getAppToken()
      if(token){
        setLoaderExam(false)
                

        localStorage.setItem('Apitoken', token)
        let response= await callApi(true, "famille", 'get', null)
        let datas = response.data.data;
        setInitialExamen(datas);
        setExamen(datas);

        if (response?.data?.success){
            
            //notification('success', response.data.message)
            //console.log(response)

            let result = response.data.data
            setExamen(result)
            setLoaderExam(false)
            setTotal(Math.ceil(result.length / numberPerPage));
            
            
            setSelectExam(examen)
            

            setInitialExam(result);
            start_filter(result);
            setInitialExams(result);
            setfilterFamExams(result)

                
            
        }else{
           // notification('error',  "une erreur inatendu est survenue" )

        }
      }
     }

     const handleSearch = (e) => {
      let key = e.target.value;
      if(key==""){
       
        setfilterFamExams(initialExam)
        start_filter(initialExam)
  
  
      }else {
  
        let newData = initialExam.filter(
          (examen) =>
          examen.nom?.toLowerCase().includes(key)
        );
  
        setfilterFamExams(newData);
        start_filter(newData)
  
        
      }
    };
  
    function start_filter(examen) {
      let filtre = examen.slice(0, 5);
      setExamen(filtre);
    }
  
     //------- pagination debut------//
     function changeData(page) {
      //console.log("pageReçue", page);
      let filtre = filterFamExams.slice( (page - 1) * numberPerPage, page * numberPerPage);
      setExamen(filtre);
    }
  
    function prenext(cas, page) {
  
      if (cas === "next") {
        let filtre = filterFamExams.slice((page - 1) * numberPerPage,page * numberPerPage);
        setExamen(filtre);
  
      } else if (cas === "prev") {
  
        let filtre = filterFamExams.slice((page - 1) * numberPerPage,page * numberPerPage);
        setExamen(filtre);
      }
    }
    function firstlas(cas, page) {
      if (cas === "last") {
        let filtre = filterFamExams.slice((page - 1) * numberPerPage,page * numberPerPage);
        setExamen(filtre);
      } else if (cas === "first") {
        let filtre = filterFamExams.slice((page - 1) * numberPerPage,page * numberPerPage);
        setExamen(filtre);
      }
    }
    //------------pagination end------//
  
   
    
    

     const inituserMat=()=>{
      let users: any = localStorage.getItem("matriculeLabo")
      setMatricule_laboSession(users)
      
    }
     const handleCreateExamen = async (e:any)=>{
       e.preventDefault();
      let token= await getAppToken()
      let examen = {
        matricule_labo: Matricule_laboSession,
        nom: nom
      }

      if(token){
        

        localStorage.setItem('Apitoken', token)
        let response= await callApi(true, "famille", 'post', null, examen)
        

        if (response?.data?.success){
          handleShowexamen();
          setShow3(false)
            notification('success', response.data.message)
           // console.log(response)
            let result = response.data.data
            //console.log("zzzzzzzzzzzz", result)
            
        }else{
           // notification('error',  "une erreur inatendu est survenue" )

        }
      }
     }

   const handleDelete = async (id:any) => {
      setShow2(true)
      let token = await getAppToken();
      if (token) {
        localStorage.setItem("Apitoken", token);
        let response = await callApi(
          true,
          `famille/${id}`,
          'delete',
          null
        );
  
        if (response?.data?.success) {
          handleShowexamen();
          setShow2(false)
          notification("success", response.data.message);
        } else {
          notification("error", "une erreur inatendu est survenue");
        }
      }
   
    };
    

     /***Modifier un examen */

     const handleModifyExamen = async ( e:any)=>{
      e.preventDefault()
     
     let token= await getAppToken()
     let examen = {
       matricule_labo: Matricule_laboSession,
       nom: selectExam.nom
     }

     if(token){
       

       localStorage.setItem('Apitoken', token)
       let response= await callApi(true, `famille/${selectExam.matricule}`, 'put', null, examen)
       

       if (response?.data?.success){
         handleShowexamen();
         setShow(false)
           notification('success', response.data.message)
          // console.log(response)
           let result = response.data.data
           //console.log("zzzzzzzzzzzz", result)
           
       }else{
          // notification('error',  "une erreur inatendu est survenue" )

       }
     }
    }

    const handleDeleteExamen = async ( e:any)=>{
      e.preventDefault()
     
     let token= await getAppToken()
     

     if(token){
       console.log(selectExam.matricule);
       

       localStorage.setItem('Apitoken', token)
       let response= await callApi(true, `famille/${selectExam.matricule}`, 'delete', null)
       

       if (response?.data?.success){
         handleShowexamen();
         setShow4(false)
           notification('success', response.data.message)
          // console.log(response)
           let result = response.data.data
           //console.log("zzzzzzzzzzzz", result)
           
       }else{
          // notification('error',  "une erreur inatendu est survenue" )

       }
     }
    }
    const visibility=()=>{
        setIsVisible(!isVisible)
       // alert('eee')
    }
    const handleChangeModify = (e: any, key: string) => {
      setSelectExam((state) => {
        return { ...state, [key]: e.target.value };
      });
    }

    useEffect(() =>{
  
      setTotal(Math.ceil(filterFamExams.length / 5));
  
    }, [filterFamExams])

    useEffect(()=>{
      handleShowexamen()
      inituserMat()
     },[])
  return (
    <Fragment>
        {/* Créer une famille d'examen */}
        <Modal
        show={show3}
        onHide={handleClose3}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Créer une famille d'examen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleCreateExamen}>
                <Container>
                <Row>
                    <Col >
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Nom de l'examen</Form.Label>
                            <Form.Control
                                type="text"
                                id='nom'
                                value={nom}
                                onChange={(e)=>setNom(e.target.value)}
                                
                                placeholder="pathologie"
                                autoFocus
                            />
                    </Form.Group>
                    </Col>
                </Row>
                <Row>
                  {/* <Col xs={6} md={8}><Button variant="danger"onClick={handleClose3} >
            Annuler
          </Button></Col> */}
          <Col xs={6} md={8}>
          <Button variant="primary" type='submit'>
            Créer
          </Button>
          </Col>
                </Row>
                </Container>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          
         
         
        </Modal.Footer>
      </Modal>
      {/* Créer une famille d'examen */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifier une famille d'examen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleModifyExamen}>
                <Container>
                <Row>
                    <Col >
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Nom de l'examen</Form.Label>
                            <Form.Control
                                type="text"
                                id='nom'
                                value={selectExam.nom}
                                onChange={(e)=>handleChangeModify(e, "nom")}
                                placeholder="pathologie"
                                autoFocus
                            />
                    </Form.Group>
                    </Col>
                </Row>
                <Row>
                  <Col xs={6} md={6}>
                  <Button variant="danger"onClick={handleClose} >
                   Annuler
                  </Button>
                  </Col>
                  <Col xs={6} md={6}>
                  <Button variant="primary" type='submit'>
                  Modifier
                  </Button>
                  </Col>
                </Row>
                </Container>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          
          
         
        </Modal.Footer>
      </Modal>

      <Modal
        show={show4}
        onHide={handleClose4}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Supprimer une famille d'examen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           Voulez-vous supprimer la famille <strong> {selectExam.nom}</strong> ?
          <p>NB: La suppression d'une famille d'examen engendre la suppression de ces types </p>
        </Modal.Body>
        <Modal.Footer>
           <Button variant="danger"onClick={handleClose4} >
                  Annuler
           </Button>
          <Button variant="primary" onClick={handleDeleteExamen}>
            Supprimer
          </Button>
         
        </Modal.Footer>
      </Modal>
      <Modal
        show={show2}
        onHide={handleClose2}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Etes-vous sûr de vouloir supprimer cette Famille d'examen y compris ses types?
          </Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
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
    <div className="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content">
      <div className="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content"></div>                 
        <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
        <div className="kt-portlet kt-portlet--mobile">
        <div className="kt-portlet__head kt-portlet__head--lg">
          <div className="kt-portlet__head-label">
            <h3 className="kt-portlet__head-title">Liste des famille d'Examen
              <small></small>
            </h3>
          </div>
          
      
        </div>

        <div className="kt-portlet__body">
         
          <div className="kt-form kt-fork--label-right kt-margin-t-20 kt-margin-b-10">
        <div className="row align-items-center">
          <div className="col-xl-12  order-xl-1">
            <div className="row align-items-center">				
              <div className="col-md-4 kt-margin-b-20-tablet-and-mobile">
              <div className="kt-subheader__toolbar" id="kt_subheader_search">
                  {/* <span className="kt-subheader__desc" id="kt_subheader_total">
                                            {employe.length} Total </span> */}

                  <form
                    className="kt-subheader__search "
                    id="kt_subheader_search_form"
                  >
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Rechercher  le code ou le nom..."
                        id="generalSearch"
                        onChange={handleSearch}
                      />
                      <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">
                          <i className="flaticon2-search-1"></i>
                        </span>
                      </div>
                    </div>
                  </form>
                </div>
                {/* <div className="kt-input-icon kt-input-icon--left">
                  <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Rechercher  le code ou le nom..." 
                  id="generalSearch"
                  onChange={handleSearch}
                  />
                  <span className="kt-input-icon__icon kt-input-icon__icon--left">
                    <span><i className="la la-search"></i></span>
                  </span>
                </div> */}
              </div>
              <div className="col-md-4 kt-margin-b-20-tablet-and-mobile">
               
              </div>
              <div className="col-md-4 kt-margin-b-20-tablet-and-mobile">
                <button className='btn btn-primary' style={{marginLeft: "100px"}} onClick={handleShow3}>Créer une famille d'Examen</button>
              </div>
             </div>
          </div>
          <div className="col-xl-4 order-1 order-xl-2 kt-align-right">
            
            <div className="kt-separator kt-separator--border-dashed kt-separator--space-lg d-xl-none"></div>
          </div>
        </div>
      </div>	
        </div>
        <div className="kt-portlet__body kt-portlet__body--fit">
          
          <div className="kt_datatable kt-datatable kt-datatable--default kt-datatable--brand kt-datatable--loaded" id="local_data">
            <table className="kt-datatable__table" style={{display: "block"}}>
            <thead className="kt-datatable__head"><tr className="kt-datatable__row" style={{left: "0px"}}>
                  <th className="kt-datatable__cell kt-datatable__toggle-detail">
                    <span></span>
                  </th>
                  <th data-field="id" className="kt-datatable__cell--center kt-datatable__cell kt-datatable__cell--check">
                  <span style={{width: "20px"}}>
                    <label className="kt-checkbox kt-checkbox--single kt-checkbox--all kt-checkbox--solid">
                      <input type="checkbox"/>&nbsp;<span></span>
                    </label>
                  </span> 
                  </th>
                  {/* <th data-field="employee_id" className="kt-datatable__cell kt-datatable__cell--sort">
                    <span style={{width: "110px"}}>Code</span>
                  </th> */}
                  <th data-field="name" className="kt-datatable__cell kt-datatable__cell--sort" >
                    <span style={{width: "110px"}}>Nom</span>
                  </th>
                 
                 
                  <th data-field="Actions" data-autohide-disabled="false" className="kt-datatable__cell kt-datatable__cell--sort">
                    <span style={{width: "110px"}}>Actions</span>
                  </th>
                  </tr>
                </thead>
                
                  <tbody className="kt-datatable__body" style={{}}>
          
                    
                    { examen.length > 0  && !loaderExam &&<>
                  {examen.map((item:any)=>{
                     if(item.matricule_labo=== Matricule_laboSession){
                      return (
                        <tr data-row="0" className="kt-datatable__row" style={{left: "0px"}}>
                        
                            
                        <td className="kt-datatable__cell kt-datatable__toggle-detail">
                          <a className="kt-datatable__toggle-detail" href="">
                            <i className="fa fa-caret-right"></i>
                          </a>
                        </td>
                        <td className="kt-datatable__cell--center kt-datatable__cell kt-datatable__cell--check" data-field="id">
                          <span style={{width: "20px" }}> 
                            <label className="kt-checkbox kt-checkbox--single kt-checkbox--solid">
                              <input type="checkbox" value="1"/>&nbsp;
                                <span></span>
                            </label>
                          </span>
                        </td>
                            {/* <td data-field="employee_id" className="kt-datatable__cell">
                          <span style={{width: "110px"}}>0001</span>
                        </td> */}
                        
                        <td data-field="name" className="kt-datatable__cell" >
                         
                          <span style={{width: "110px", cursor:'pointer'}} onClick={visibility} title="cliquer pour voir liste des types d'examen">{item.nom}</span>  
                          {/* <div ref={dropdownRef} className={`menu ${ isVisible ?  'dropdown-menu-right':' dropdown-menu ' }`} >	
                                     <Link  className="dropdown-item" title="Voir de l'examen " > Diabethe</Link>    
                            </div> */}
                        </td>
                        <td data-field="Actions" data-autohide-disabled="false" className="kt-datatable__cell">
                          <span style={{overflow: "visible", position: "relative", width: "110px"}}>
                             <div className="dropdown " data-placement="top">
                                  <Link title=" Voir les types d'examen" to={`/familleExamen/${item.matricule}`} className="btn btn-sm btn-clean btn-icon btn-icon-md" >
                                   <i className="far fa-eye text-primary"></i>   
                                  </Link>			  	
                                                
                              </div> 
                              
                              <a title="Modifier le nom d'un examen" onClick={()=>handleShow(item)} className="btn btn-sm btn-clean btn-icon btn-icon-md" >							
                              <i className="fas fa-pencil-alt text-success"></i></a>
  
                              
                              
                              <a title="Supprimer un examen" className="btn btn-sm btn-clean btn-icon btn-icon-md" >
                                <i className="la la-trash over text-danger" onClick={()=>handleShow4(item)}></i>
                              </a>
                          </span>
                        </td>
                        
                      
                    </tr>
                       )
                         
                     }

                          
                          })}
                          </>
                          }
                          
                          {loaderExam && <div className="row justify-content-center">
                              <div className="col-6" style={{width: "100%"}}>
                                <Spinner animation="border" />
                              </div>
                            </div>}
                 
               </tbody>
              
                {/* {reload && 
                              <div className="row justify-content-center">
                              <div className="col-6">
                                <Spinner animation="border" />
                              </div>
                        </div>
                             } */}
                
          </table>
          <PaginationBasic
                              total={total}
                              sendCurrentPage={changeData}
                              prenext={prenext}
                              firstlas={firstlas}
                            />

         </div>
        </div>
        
        {/*appel du fichier ou on a fait la pagination debut */}
          {/* <PaginationBasic total={total} sendCurrentPage={changeData} prenext={prenext} firstlas={firstlas}/> */}
        {/*appel du fichier ou on a fait la pagination fin */}

    </div>
  </div>
 

</div>
</div>
    </Fragment>
  )
}

export default FamilleExamens