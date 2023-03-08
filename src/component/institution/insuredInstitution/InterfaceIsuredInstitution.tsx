import React, { Fragment } from 'react';
import { AiFillEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';

interface insuredInstitution {
    nom: string,
    email: string,
    infoShared: string,
    telephone: string,
    code: string,
    adresse: string
}

export const InterfaceIsuredInstitution = (props) => {
    const { data } = props
    return (
        <Fragment>

            {data.map((items: insuredInstitution, index: number) =>
                <Link
                    to={`/detail-contrat-institution/${items.code}`}
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
