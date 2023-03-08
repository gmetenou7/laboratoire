import React, { useEffect, useState } from 'react';
import { Puff } from 'react-loader-spinner';
import { useNavigate, useParams } from 'react-router-dom';
import callApi, { notification } from "../../Utils/Utils.tsx";
import PageLayout from "../PageLayout.tsx";
import { formatDateTime } from "../../component/utilities/dateTimeFormatter.ts"
import { Link } from 'react-router-dom';
import InputField, {
    StatusResultSelectField,
    TextAreaField,
    SelectUnityField
} from "../../component/utilities/FormField.tsx";
import { showModalReducer } from "../../features/modalSlice.ts";
import { useDispatch } from 'react-redux';

import { useForm } from "react-hook-form";
import { AiFillCheckCircle, AiFillInfoCircle } from 'react-icons/ai';
import { TransferExamVoucherForm } from '../../component/exems/TransferExamVoucherForm.tsx';

interface ReferenceValue {
    code: number,
    intitule: string,
    description: string,
    codeexamen_type: string,
    valeur_reference1: string,
    valeur_reference2: string,
    code_examen: string
}

interface TypeExam {
    codetype: string,
    prixtotaltype: string,
    resultatrelevetype: string,
    nomtype: string,
    dureeanalyse: string,
    veleur_reference: [ReferenceValue],
    unite: string,
    nomverre: string,
    symboleverre: string,
    couleurverre: string,
    preleve: number,
}

interface ExamFamily {
    codefamille: string,
    nomfamille: string,
    decisionexam: string,
    comment: string,
    bigfamille: {
        nombigfamille: string,
        codebigfamille: number
    },
    types: [TypeExam],

}

interface Laborantins {
    codelaborentin: string,
    emaillaborentin: string,
    fonctionlaborentin: string,
    nomlaborentin: string,
    prenomlaborentin: string,
    telephonelaborentin: string,
    codebigfamille: number,
}

interface DataExamDetails {
    libellestatutexamen: string,
    codeexamen: string,
    medecindemandeur: string,
    createat: string,
    updateat: string,
    prixtotalexam: string,
    codestatusexamen: number,
    decriptionexam: string,
    nomlaborentin: string,
    prenomlaborentin: string,
    nomcli: string,
    prenomcli: string,
    emailcli: string,
    sexe: string,
    ageclient: string,
    telephone: string,
    nomlabo: string,
    telephonelabo: string,
    emaillabo: string,
    payslabo: string,
    villelabo: string,
    regionlabo: string,
    ruelabo: string,
    logolabo: string,
    comments: string,
    work_in_now: string,
    examen: [ExamFamily],
    laborantins: [Laborantins],
}

interface SingleLaborantin {
    etat: number,
    codelaborentin: string,
    nomlaborentin: string,
    prenomlaborentin: string,
    telephonelaborentin: string,
    emaillaborentin: string,
    fonctionlaborentin: string,
    specialite: string,
}

export function SingleExam() {
    // Get the data in the url parameter
    const params = useParams();
    // To set the single voucher data when fetchSingleExam() return success
    const [singleExam, setSingleExam] = useState<DataExamDetails>();
    // To handle the loading state when making api call
    const [loading, setLoading] = useState(false);
    // To handle the loading state when saving result
    const [loadingResult, setLoadingResult] = useState(false);
    // The control the sate of the component
    const [isMounted, setIsMounted] = useState(true);
    // To indicate when the api call end with error status
    const [loadingFailed, setLoadingFailed] = useState(false);
    // Get the actual user from the localStorage
    const user = JSON.parse(localStorage.getItem("user") || "");
    // To the handle the loading state when assigning the exam voucher
    const [asinExamLoading, setAsinExamLoading] = useState(false);
    // The React-router-dom hook to handle navigation
    const navigate = useNavigate();
    // To set the result form visible to allow register exam results
    const [enableAddResult, setEnableAddResult] = useState(false);
    // To set the result status when fetchResultStatus() end with success status
    const [resultStatus, setResultStatus] = useState([]);
    // To set the result status Id when fetchResultStatus() end with success status
    const [idResult, setIdResult] = useState();
    // To set exams status 
    const [examsStatus, setExamsStatus] = useState([]);
    // to set the selected status
    const [examStatusSelected, setExamStatusSelected] = useState(null);
    // To handle the loading state when fetching Units
    const [loadingUnities, setLoadingUnities] = useState(false);
    // To set exams units when the api call end with status success
    const [unities, setUnities] = useState([]);
    // To set the single laborantin
    const [
        singleLaborantin,
        setSingleLaborantin
    ] = useState<SingleLaborantin>();
    // To set all the laborentins when fetchSingleExam() end with status success
    const [laborantins, setLaborantins] = useState<[SingleLaborantin]>();
    const laborantinWorkingOnTheVoucher = laborantins?.find(
        item => item?.etat === 1
    )

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
    } = useForm();

    async function fetchSingleExam() {
        setLoading(true)
        try {
            const response = await callApi(
                true,
                "specificexamens",
                'post',
                {
                    codebon: params?.code,
                    codelaborentin: user?.matricule
                },
                null
            );
            if (response?.data?.success) {
                setSingleExam(response?.data?.data);

                setLaborantins(
                    response?.data?.data?.laborantins
                );
                setSingleLaborantin(
                    response?.data?.data?.laborantins?.find(
                        item => item.codelaborentin === user?.matricule
                    )
                );
                setLoading(false);
                setLoadingFailed(false);
            } else {
                setLoading(false);
                setLoadingFailed(true)
            }
        } catch (error) {
            setLoading(false);

        }
    };

    async function fetchExamUnities() {
        setLoadingUnities(true);
        try {
            const response = await callApi(
                true, `unitelabo/${user?.matricule_labo}`, "get", null
            )
            if (response?.data?.success) {
                setUnities(response?.data?.data)
                setLoadingUnities(false);
                setEnableAddResult(true);
            } else {
                setLoadingUnities(false)
            }
        } catch (error) {
            setLoadingUnities(false)
        }
    }

    async function fetchExamsStatus() {
        setLoading(true)
        try {
            const response = await callApi(
                true,
                `statusexamen`,
                'get',
                null
            );
            if (response?.data?.success) {
                setExamsStatus(response?.data?.data);
                response?.data?.data.map((item: any) => {
                    setIdResult(item?.id)
                })
                setLoading(false);
                setLoadingFailed(false);
            } else {
                setLoading(false);
                setLoadingFailed(true)
            }
        } catch (error) {
            setLoading(false);
        }
    };

    async function fetchResultStatus() {
        setLoading(true)
        try {
            const response = await callApi(
                true,
                `statusresultat`,
                'get',
                null
            );
            if (response?.data?.success) {
                setResultStatus(response?.data?.data);
                response?.data?.data.map((item: any) => {
                    setIdResult(item?.id)
                })
                setLoading(false);
                setLoadingFailed(false)
            } else {
                setLoading(false);
                setLoadingFailed(true)
            }
        } catch (error) {
            setLoading(false);
        }
    };

    async function handleAsinExam() {
        setAsinExamLoading(true)
        try {
            const response = await callApi(
                true,
                `examenslaborentin/${params?.code}/${user?.matricule}`,
                "get",
                null
            );
            if (response?.data?.success) {
                setAsinExamLoading(false);
                navigate(
                    `/exams/my-voucher`, {
                    replace: true
                }
                )
            } else {
                setAsinExamLoading(false)
            }
        } catch (error) {
            setAsinExamLoading(false);
        }
    }

    useEffect(() => {
        if (isMounted) {
            fetchSingleExam();
            fetchResultStatus();
            fetchExamsStatus();
        }

        return () => {
            setIsMounted(false)
        }
    }, [isMounted, setIsMounted])

    function handleOpenChangeLaborantinModal() {
        dispatch(
            showModalReducer({
                header: "Transfère du bon à un autre laborantin",
                active: true,
                body: <TransferExamVoucherForm
                    VoucherId={params?.code}
                    idLabrantin={laborantinWorkingOnTheVoucher?.codelaborentin}
                    fetchSingleExam={fetchSingleExam}
                />
            })
        )
    }

    async function handleRegisterResult(data: any) {
        setLoadingResult(true)
        let famille: any = []
        let type: any = []
        let comments: any = []
        let typeUnity: any = []

        Object.keys(data).forEach((item) => {
            if (item.includes("comment")) {
                comments.push({
                    famille: item.split("_")[1],
                    comment: data[item]
                })
            }
        })

        Object.keys(data).forEach((item) => {
            if (item.includes("unity")) {
                typeUnity.push({
                    codeType: item.split("_")[1],
                    unity: data[item]
                })
            }
        })

        Object.keys(data).forEach((item) => {
            if (item.includes("family")) {
                const comment = comments.find(
                    cment => cment.famille === item.split("_")[1]
                )
                famille.push({
                    "codefamille": item.split("_")[1],
                    "decision": data[item],
                    "comment": comment.comment
                })
            }
        }
        )
        Object.keys(data).forEach((item) => {
            if (item.includes("type")) {
                const unity = typeUnity.find(
                    typeUnit => typeUnit.codeType === item.split("_")[1]
                )
                type.push({
                    "codetype": item.split("_")[1],
                    "resultat": data[item],
                    "unite": unity.unity,
                })
            }
        }
        )
        const requestData = {
            "comments": data.general,
            "codeexamen": params?.code,
            "famille": famille,
            "type": type,
            "statutbon": examStatusSelected ? parseInt(examStatusSelected || "") : null
        }

        try {
            await callApi(
                true,
                "postexamenresultattype",
                "post",
                requestData,
                null
            );
            navigate(
                `/exams/my-voucher`, {
                replace: true
            }
            )
            notification("success", "Resultat enrégistré avec succès");
            // if (response?.data?.success === true) {
            //     setLoadingResult(false)


            // } else {
            //     setLoadingResult(false);
            //     notification("error", "Un problème est survenu, veillez essayé plutard");
            // }
        } catch (error) {
            setLoadingResult(false);
            notification("error", "Un problème est survenu, veillez essayé plutard");
        }

    }

    function handleExamStatusClicked(event: any) {
        const examStatus = event.target.getAttribute("data-exam-status");
        const examStatusChecked = event.target.checked;
        if (examStatusChecked) {
            setExamStatusSelected(examStatus);
        } else {
            setExamStatusSelected(null);
        }
    }

    const content = <>
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
                {loadingFailed ?
                    <div className='loading-fail'>
                        <h4 className='fail-text' >Impossible de charger cette ressource </h4>
                        <Link
                            to='#'
                            onClick={() => {
                                fetchSingleExam();
                                fetchExamsStatus();
                                fetchResultStatus()
                            }}
                            className="btn btn-main"
                        >
                            Essayer à Nouveau
                        </Link>
                    </div> :
                    <div className="single-exam-page-wrapper">
                        <div className="exams-info">
                            {user.fonction === "admin" ? <Link className='btn btn-main mb-20' to={`/exams`}>Retour aux bons d'examen</Link> : <Link className='btn btn-main mb-20' to={`/exams/my-voucher`}>Retour à l'accueil</Link>}
                            <ul >
                                <h2 className='info-header'>Dossier</h2>
                                <li>
                                    Dossier N°: <span>{singleExam?.codeexamen}</span>
                                </li>
                                <li>
                                    Medecin demandeur: <span>{singleExam?.medecindemandeur}</span>
                                </li>
                                <h2 className='info-header'>Patient</h2>
                                {user?.fonction === "admin" &&
                                    <>
                                        <li>
                                            Nom: <span>{singleExam?.nomcli}</span>
                                        </li>
                                        <li>
                                            Prenom: <span>{singleExam?.prenomcli}</span>
                                        </li>
                                        <li>
                                            Téléphone: <span>{singleExam?.telephone}</span>
                                        </li>
                                        <li>
                                            Email: <span>{singleExam?.emailcli}</span>
                                        </li>
                                    </>
                                }
                                <li>
                                    Sexe: <span>{singleExam?.sexe}</span>
                                </li>
                                <li>
                                    Age: <span>{singleExam?.ageclient}</span>
                                </li>
                                <li>
                                    Date de création: <span>{formatDateTime(singleExam?.createat)}</span>
                                </li>
                                {singleExam?.decriptionexam &&
                                    <>
                                        <h2 className='info-header'>Note d'examen</h2>
                                        <li>
                                            <p>{singleExam?.decriptionexam}</p>
                                        </li>
                                    </>
                                }
                            </ul>

                        </div>
                        <div className="exams-asset">
                            {enableAddResult &&
                                <div className="exams-result-form-wrapper">
                                    <h2 className='info-header-text'>Reporter les resultats</h2>
                                    <form
                                        onSubmit={handleSubmit(handleRegisterResult)}
                                    >
                                        {singleExam?.examen?.filter(item => item?.bigfamille?.nombigfamille === singleLaborantin?.specialite).map((item, index) =>
                                            <div key={index} className="site-bg p-30 mb-40">
                                                <h3 className='asset-header'>
                                                    <span>{item?.nomfamille}</span>
                                                </h3>
                                                <div className="">
                                                    <div className='grid-2-ng gap-20'>
                                                        {item?.types?.map((item, index) =>
                                                            <div key={index}>
                                                                <div
                                                                    style={{
                                                                        display: "flex",
                                                                        justifyContent: "center",
                                                                        alignItems: "center",
                                                                        gap: 10
                                                                    }}
                                                                >
                                                                    <InputField
                                                                        disabled={item?.preleve === 0}
                                                                        id={item.couleurverre}
                                                                        label={item.nomtype}
                                                                        placeholder={`${item.nomtype}`}
                                                                        register={register(`type_${item.codetype}`, {
                                                                            required: false,
                                                                            value: item.resultatrelevetype ? item.resultatrelevetype : ""
                                                                        })}
                                                                    />
                                                                    <div
                                                                        style={{
                                                                            zIndex: 100000
                                                                        }}
                                                                        className="icon-tooltip">
                                                                        <span className="tooltip-text">
                                                                            {item?.veleur_reference?.length > 0 ?
                                                                                <ul
                                                                                    style={{
                                                                                        display: "flex",
                                                                                        listStyle: "none",
                                                                                        padding: 0,
                                                                                        margin: 0
                                                                                    }}
                                                                                    className='exam-normal-values'>
                                                                                    {item?.veleur_reference?.slice(0, 3).map((item, index) =>
                                                                                        <li
                                                                                            style={{
                                                                                                padding: 0,
                                                                                                margin: 0
                                                                                            }}
                                                                                            key={index}>
                                                                                            {index > 0 && "~"}{item?.valeur_reference2 && "["}{item.valeur_reference1}{item?.valeur_reference2 && "-"}{item.valeur_reference2}{item?.valeur_reference2 && "]"}
                                                                                        </li>
                                                                                    )}
                                                                                </ul>
                                                                                :
                                                                                "N/S"
                                                                            }
                                                                        </span>
                                                                        <AiFillInfoCircle
                                                                            style={{
                                                                                fontSize: 22
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <SelectUnityField
                                                                        label="Unité"
                                                                        id={`unity_${item?.nomtype}`}
                                                                        options={unities}
                                                                        selected={item?.unite}
                                                                        register={register(`unity_${item.codetype}`, {
                                                                            required: false
                                                                        })}
                                                                    />

                                                                </div>

                                                                {item?.resultatrelevetype &&
                                                                    <p
                                                                        className='actual-value'
                                                                    >Valeur actuelle {" "}
                                                                        <strong>
                                                                            {item.resultatrelevetype} {item?.unite}
                                                                        </strong>
                                                                    </p>}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <StatusResultSelectField
                                                        id={item.codefamille}
                                                        label="Décision finale"
                                                        placeholder={`${item.nomfamille}`}
                                                        options={resultStatus}
                                                        selected={item.decisionexam}
                                                        register={register(`family_${item.codefamille}`, {
                                                            required: false
                                                        })}
                                                    />
                                                    {item?.decisionexam &&
                                                        <p
                                                            className='actual-value'
                                                        >Valeur actuelle {" "}
                                                            <span>
                                                                {item.decisionexam}
                                                            </span>
                                                        </p>}

                                                    <InputField
                                                        id={item.codefamille}
                                                        label={`Commentaire pour ce groupe`}
                                                        placeholder={`Commentaire pour ${item.nomfamille}`}
                                                        register={register(`comment_${item.codefamille}`, {
                                                            value: item.comment ? item.comment : ""
                                                        })}
                                                    />
                                                    {item?.comment &&
                                                        <p
                                                            className='actual-value'
                                                        >Valeur actuelle {" "}
                                                            <span>
                                                                {item.comment}
                                                            </span>
                                                        </p>}

                                                </div>
                                            </div>
                                        )}
                                        {user?.chef === 1 &&
                                            <div className="form-group">
                                                <TextAreaField
                                                    id="general-comment"
                                                    label="Commentaire général"
                                                    placeholder="Entrer le commentaire général"
                                                    register={register("general", {
                                                        value: singleExam?.comments ? singleExam?.comments : ""
                                                    })}
                                                />
                                            </div>
                                        }
                                        <div className=''>
                                            <div className="btn-group">
                                                <button
                                                    type='submit'
                                                    className='btn btn-main'
                                                >
                                                    Enrgistrer
                                                    {loadingResult &&
                                                        <Puff
                                                            height="30"
                                                            width="30"
                                                            radius={1}
                                                            color="#fff"
                                                            ariaLabel="puff-loading"
                                                            wrapperStyle={{}}
                                                            wrapperClass=""
                                                            visible={true}
                                                        />
                                                    }
                                                </button>
                                                <button
                                                    type="button"
                                                    className='btn btn-white'
                                                    onClick={() => setEnableAddResult(false)}
                                                >
                                                    Annuler
                                                </button>
                                            </div>
                                            {user?.chef === 1 &&
                                                <div className="grid-4 mt-30">
                                                    {examsStatus?.length > 0 &&
                                                        examsStatus.map((item: any) =>
                                                            <>
                                                                {item?.libelle === "terminer" &&
                                                                    <label
                                                                        key={item.id}
                                                                        htmlFor={item?.libelle}
                                                                        className="input-checkbox-group"
                                                                        onClick={(event) => {
                                                                            handleExamStatusClicked(event)
                                                                        }}
                                                                    >
                                                                        <input
                                                                            data-exam-status={item?.id}
                                                                            className="checkbox-field"
                                                                            id={item?.libelle}
                                                                            type="checkbox"
                                                                            {...register(`${idResult}`)}

                                                                        />
                                                                        <div className="checkmark" />
                                                                        <span> {item?.libelle} </span>
                                                                    </label>
                                                                }
                                                            </>
                                                        )}
                                                </div>
                                            }
                                        </div>
                                    </form>
                                </div>
                            }
                            {(user?.fonction === "admin") ?
                                <div className='info-header'>
                                    <h2 className='info-header-text'>Examens</h2>
                                    {laborantins?.length > 0 ? <>
                                        {singleExam?.libellestatutexamen === "terminer" ?
                                            <span className='btn badge-success'>
                                                <strong>{laborantinWorkingOnTheVoucher?.nomlaborentin || laborantinWorkingOnTheVoucher?.prenomlaborentin}</strong> a terminé les analyses
                                            </span> :
                                            <div className="d-flex gap-20">
                                                <button
                                                    onClick={handleOpenChangeLaborantinModal}
                                                    className='btn btn-main-blue' >
                                                    Changer de laborantin
                                                </button>
                                                <button className='btn badge-info' >
                                                    <strong>
                                                        {laborantinWorkingOnTheVoucher?.nomlaborentin || laborantinWorkingOnTheVoucher?.prenomlaborentin}
                                                    </strong> Suit ce bon d'examen
                                                </button>
                                            </div>

                                        }
                                    </> :
                                        <>
                                            {singleExam?.libellestatutexamen === "reçu" ? <>
                                                <span
                                                    className='btn badge-warning'
                                                >
                                                    Bon d'examen nom payé
                                                </span>
                                            </> :
                                                <div className="d-flex gap-20">
                                                    <span
                                                        className='btn badge-warning'
                                                    >
                                                        Non pris en charge
                                                    </span>
                                                    <button
                                                        onClick={handleOpenChangeLaborantinModal}
                                                        className='btn btn-main-blue' >
                                                        Assigner
                                                    </button>
                                                </div>
                                            }
                                        </>
                                    }
                                </div> :
                                <div className='info-header'>
                                    <h2 className='info-header-text'>Examens</h2>
                                    {singleLaborantin ? <>
                                        {singleExam?.work_in_now === "yes" ?
                                            <>
                                                {!enableAddResult &&
                                                    <>
                                                        {singleExam?.libellestatutexamen === "terminer" ? <span className='analyse-ended'>Annalyse terminée</span> :
                                                            <div className="d-flex gap-10">
                                                                <button
                                                                    onClick={handleOpenChangeLaborantinModal}
                                                                    className='btn btn-main-blue' >
                                                                    Transfer
                                                                </button>
                                                                <button
                                                                    onClick={fetchExamUnities}
                                                                    className='btn btn-main' >
                                                                    {loadingUnities ?
                                                                        <>
                                                                            Initialisation des données
                                                                            <Puff
                                                                                height="20"
                                                                                width="20"
                                                                                radius={1}
                                                                                color="#fff"
                                                                                ariaLabel="puff-loading"
                                                                                wrapperStyle={{}}
                                                                                wrapperClass=""
                                                                                visible={true}
                                                                            />
                                                                        </> :
                                                                        "Renseigner les resultats"
                                                                    }
                                                                </button>
                                                            </div>
                                                        }
                                                    </>
                                                }
                                            </> :
                                            <>
                                                {laborantinWorkingOnTheVoucher &&
                                                    <button className='btn badge-info' > Dr <strong>{laborantinWorkingOnTheVoucher?.nomlaborentin}</strong> Effectu les Analyses</button>
                                                }
                                            </>
                                        }
                                    </> :
                                        <button
                                            className='btn btn-main'
                                            onClick={handleAsinExam}
                                        >
                                            Suivre cet examen
                                            {asinExamLoading &&
                                                <Puff
                                                    height="30"
                                                    width="30"
                                                    radius={1}
                                                    color="#fff"
                                                    ariaLabel="puff-loading"
                                                    wrapperStyle={{}}
                                                    wrapperClass=""
                                                    visible={true}
                                                />
                                            }
                                        </button>}
                                </div>}
                            {(user?.fonction === "admin" || user?.chef === 1) ?
                                <>
                                    {singleExam?.examen?.map((item, index) =>
                                        <div key={index} className="asset-wrapper mt-30">
                                            <h3 className='asset-header'>
                                                {item?.nomfamille}
                                                {item?.decisionexam && <span>Décision <strong>{item.decisionexam}</strong></span>}
                                            </h3>
                                            <table>
                                                <thead>
                                                    <th>
                                                        Nom
                                                    </th>
                                                    <th className="result text-center">
                                                        Resultat
                                                    </th>
                                                    <th className='text-center'>
                                                        Unité
                                                    </th>
                                                    <th className='text-center'>
                                                        Prélèvement
                                                    </th>
                                                    <th className='text-end'>
                                                        Valeur normale
                                                    </th>
                                                </thead>
                                                <tbody>
                                                    {item?.types?.map((item, index) =>
                                                        <tr>
                                                            <td>
                                                                {item?.nomtype}
                                                            </td>
                                                            <td className="result text-center">
                                                                {item?.resultatrelevetype ? item?.resultatrelevetype : "En attente"}
                                                            </td>
                                                            <td className='text-center'>
                                                                {item?.unite ? item?.unite : "N/S"}
                                                            </td>
                                                            <td className='text-center'>
                                                                {item?.preleve === 1 ?
                                                                    <div className="icon-tooltip">
                                                                        <span className="tooltip-text">Prélévé</span>
                                                                        <AiFillCheckCircle
                                                                            className='ended'
                                                                        />
                                                                    </div> :
                                                                    <div className="icon-tooltip">
                                                                        <span className="tooltip-text">En attente</span>
                                                                        <AiFillCheckCircle
                                                                            className='waiting'
                                                                        />
                                                                    </div>}
                                                            </td>
                                                            <td className='text-end'>
                                                                {item?.veleur_reference?.length > 0 ?
                                                                    <ul className='exam-normal-values'>
                                                                        {item?.veleur_reference?.slice(0, 3).map((item, index) =>
                                                                            <li key={index}>
                                                                                {item?.valeur_reference2 && "["}{item.valeur_reference1}{item?.valeur_reference2 && "-"}{item.valeur_reference2}{item?.valeur_reference2 && "]"}
                                                                            </li>
                                                                        )}
                                                                    </ul>
                                                                    :
                                                                    "N/S"
                                                                }
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                            {item?.comment &&
                                                <div className="type-comment">
                                                    <blockquote>Commentaire</blockquote>
                                                    <p>{item?.comment}</p>
                                                </div>
                                            }
                                        </div>
                                    )}
                                </> :
                                <>
                                    {singleExam?.examen?.filter(item => item?.bigfamille?.nombigfamille === user?.specialite).map((item, index) =>
                                        <div key={index} className="asset-wrapper mt-30">
                                            <h3 className='asset-header'>
                                                {item?.nomfamille}
                                                {item?.decisionexam && <span>Décision <strong>{item.decisionexam}</strong></span>}
                                            </h3>
                                            <table>
                                                <thead>
                                                    <th>
                                                        Nom
                                                    </th>
                                                    <th className="result text-center">
                                                        Resultat
                                                    </th>
                                                    <th className='text-center'>
                                                        Unité
                                                    </th>
                                                    <th className='text-center'>
                                                        Prélèvement
                                                    </th>
                                                    <th className='text-end'>
                                                        Valeur normale
                                                    </th>
                                                </thead>
                                                <tbody>
                                                    {item?.types?.map((item, index) =>
                                                        <tr>
                                                            <td>
                                                                {item?.nomtype}
                                                            </td>
                                                            <td className="result text-center">
                                                                {item?.resultatrelevetype ? item?.resultatrelevetype : "En attente"}
                                                            </td>
                                                            <td className='text-center'>
                                                                {item?.unite ? item?.unite : "N/S"}
                                                            </td>
                                                            <td className='text-center'>
                                                                {item?.preleve === 1 ?
                                                                    <div className="icon-tooltip">
                                                                        <span className="tooltip-text">Prélévé</span>
                                                                        <AiFillCheckCircle
                                                                            className='ended'
                                                                        />
                                                                    </div> :
                                                                    <div className="icon-tooltip">
                                                                        <span className="tooltip-text">En attente</span>
                                                                        <AiFillCheckCircle
                                                                            className='waiting'
                                                                        />
                                                                    </div>}
                                                            </td>
                                                            <td className='text-end'>
                                                                {item?.veleur_reference?.length > 0 ?
                                                                    <ul className='exam-normal-values'>
                                                                        {item?.veleur_reference?.slice(0, 5).map((item, index) =>
                                                                            <li key={index}>
                                                                                {item?.valeur_reference}
                                                                            </li>
                                                                        )}
                                                                    </ul>
                                                                    :
                                                                    "N/S"
                                                                }
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                            {item?.comment &&
                                                <div className="type-comment">
                                                    <blockquote>Commentaire</blockquote>
                                                    <p>{item?.comment}</p>
                                                </div>
                                            }
                                        </div>
                                    )}
                                </>
                            }


                            {singleExam?.comments &&
                                <div className="general-comment mt-60">
                                    <blockquote>Commentaire Général</blockquote>
                                    <p>
                                        {singleExam?.comments}
                                    </p>
                                </div>
                            }
                        </div>

                    </div>
                }
            </>
        }
    </>

    return (
        <PageLayout children={content} useSidebar={user?.fonction === "admin" ? true : false} />
    )
}
