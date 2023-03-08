import React, { Fragment, useEffect, useState } from 'react'
import { UpdateLaboratory } from '../../component/laboratory/UpdateLaboratory.tsx';
import { UploadLog } from '../../component/laboratory/UploadLog.tsx';
import PageLayout from "../PageLayout.tsx";
import callApi from "../../Utils/Utils.tsx"
import { Puff } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
interface Laboratory {
    matricule: string,
    created_at: string,
    updated_at: string,
    nom: string,
    telephone: string,
    email: string,
    pays: string,
    ville: string,
    region: string,
    rue: string,
    active: number,
    logolabo: string
}
export default function Settings() {
    const user = JSON.parse(localStorage.getItem("user") || "");
    const [loading, setLoading] = useState(false);
    const [singleLaboratory, setSingleLaboratory] = useState<Laboratory>()
    const [loadingFail, setLoadingFail] = useState(false);
    const [isMounted, setIsMounted] = useState(true);

    async function fetchDataLaboratory() {
        setLoading(true);
        setLoadingFail(false)
        try {
            const response = await callApi(true, `laboratoire/${user?.matricule_labo}`, "get", null);
            if (response?.data?.success) {
                setSingleLaboratory(response.data.data);
                setLoading(false)
                console.log(response.data.data);

            } else {
                setLoading(false)
                setLoadingFail(true)

            }
        } catch (error) {
            setLoading(false)
            setLoadingFail(true)
        }
    }

    useEffect(() => {
        isMounted && fetchDataLaboratory();
        return () => {
            setIsMounted(false)
        }
    }, [isMounted])


    const content = <Fragment>
        {loading ?
            <div className='loading-container flex-col-center-center'>
                <Puff
                    height="100"
                    width="100"
                    radius={1}
                    color="#528F01"
                    ariaLabel="puff-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div> :
            <>
                {loadingFail ?
                    <div className='loading-fail'>
                        <h4 className='fail-text' >Impossible de charger cette ressource </h4>
                        <Link
                            to='#'
                            onClick={fetchDataLaboratory}
                            className="btn btn-main"
                        >
                            Essayer à Nouveau
                        </Link>
                    </div> :
                    <div className='laboratory-settings-page'>
                        <div className="update-view">
                            <UploadLog
                                logo={singleLaboratory?.logolabo}
                                fetchLaboratory={fetchDataLaboratory}
                                laboratoryID={singleLaboratory?.matricule}
                            />
                            <UpdateLaboratory
                                laboratory={singleLaboratory}
                            />
                        </div>
                        <div className="infos-view">

                        </div>
                    </div>
                }
            </>
        }
    </Fragment>
    return (
        <PageLayout
            children={content}
            useSidebar={user?.fonction === "admin" ? true : false}
        />
    )
}
