import React, { Fragment } from 'react';
import { AiFillEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';

interface InsuredCompagnies {
    identifiant:number
    code:string
    nom:string
    email:string
    telephone:string
    adresse:string
    shareinformations:number
    codeassureur:string
    codelaboratoire:string
    activeordesactive:number
    creele:string
    modifierle:string
    nomassureur:string
}

export const InterfaceIsuredCompany = (props) => {
    const {data}= props
  return (
    <Fragment>

        {data.map((items: InsuredCompagnies, index: number)=>
            <Link
               to={`/insuredcompany/${items?.code}`}
                className="service-item"
                key={index}
                >
                <div className="service-item-body">
                   <h1 className='placeholder'>{items?.code}</h1>
                </div>
                <div className="service-item-footer">
                    <h3 className="service-name">
                        {items?.nom}
                    </h3>
                    <AiFillEye
                        className='action-icon'
                    />
                    
                </div>
            </Link>
        )}
        
        
    </Fragment>
  )
}
