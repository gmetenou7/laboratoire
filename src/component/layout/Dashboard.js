import React, {Fragment}from 'react'
import Navbar from "./Navbar.tsx";
import Sidebar from './Sidebar.tsx';
import Footer from "./Footer.tsx";

export default function Dashboard(){
    return(
       
           <Fragment>
                
                        <Navbar/>
                        <Sidebar />
                        <Footer />
                    
                
               
                
          </Fragment> 
            
        
    )
}
