import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom';
import { UpdateInsuredContratInstitution } from './UpdateInsuredContratInstitution.tsx';


export function InsuredSingleConvention() {

    const singleContract = {
        nom: "Maladie cardio-vasculaire",
        numberContract: "22-55",
        taux: "34%",
        description: "string deritoovpovg doscfijjvv,vl ffoigpgfpvk fddf,mjfdsdùsszpeei fjvee",
        code: 4
    }
    const user = JSON.parse(localStorage.getItem("user") || "");
    const params = useParams();


    return (
        <Fragment>
            <div className='single-employee'>
                <div className="employee-form-layout">
                    <h3 className="form-headline">
                        Modifier le contract
                    </h3>
                    <div className="employee-form-wrapper">
                        <UpdateInsuredContratInstitution

                        />
                    </div>
                </div>

                <div className="employee-content">
                    <div className="employee-info">
                        <h3 className="info-headline">
                            Details du contrat
                        </h3>
                        <ul>
                            <li>
                                Nom: <span>{singleContract?.nom}</span>
                            </li>
                            <li>
                                Taux : <span>{singleContract?.taux}</span>
                            </li>
                            <li>
                                Numero du contrat: <span>{singleContract?.numberContract}</span>
                            </li>
                            <li>
                                Description: <span>{singleContract?.description}</span>
                            </li>

                        </ul>
                    </div>

                </div>
            </div>
        </Fragment>
    )
}
