import Pagination from 'react-bootstrap/Pagination';
import React, { useEffect, useState } from "react";


 const  PaginationBasic = (props) => { 
    
    const{total} = props;
    const [currentPage, setCurrentPage] = useState(1);
    const [elements, setElements] = useState([<Pagination.Item key={1} active={currentPage===1}  activeLabel={""}>
        {1}
        </Pagination.Item>]);

    function changePage(index){
        console.log(index);
        
        setCurrentPage(index)
        props.sendCurrentPage(index)
    }

    function setNumberPage(){
        setElements([])
        for (let index = 1; index <= total; index++) {

            setElements((State)=> [...State, <Pagination.Item key={index} active={currentPage===index}  activeLabel={""} onClick={()=>changePage(index)}>
                {index} 
                </Pagination.Item>])
            
        }
    
        

    }

    function prevNext(cas){

            if(cas==="next"){
                if (currentPage<total) {
                    setCurrentPage(currentPage+1)
                    props.prenext(cas, currentPage+1)
                }

            }else if (cas==="prev"){
                if (currentPage>1) {
                    setCurrentPage(currentPage-1)
                    props.prenext(cas, currentPage-1)
                }
            }
    }

    /***premiere et derniere page debut */
    function firstLast(cas){

        if(cas==="last"){
                setCurrentPage(total)
                props.firstlas(cas, total)
           

        }else if (cas==="first"){
                setCurrentPage(1)
                props.firstlas(cas, 1)
        }
    }
    /***premiere et derniere page fin */

    useEffect(()=>{
        setNumberPage()

    },[currentPage, total])

    return <> 
            
            <Pagination>
                <Pagination.First onClick={()=>firstLast("first")}/>
                <Pagination.Prev onClick={()=>prevNext("prev")} />
                    {
                    elements
                    }
                <Pagination.Next onClick={()=>prevNext("next")} />
                <Pagination.Last onClick={()=>firstLast("last")}/>
            </Pagination>
            
          
        </>
    

}
export default PaginationBasic
