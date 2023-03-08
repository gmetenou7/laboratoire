import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Puff } from 'react-loader-spinner';
import { url, notification } from '../../Utils/Utils.tsx';

export function UploadLog({ logo, laboratoryID, fetchLaboratory }) {
    const [file, setFile] = useState<any>();
    const [fileDataURL, setFileDataURL] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const imageMimeType = /image\/(png|jpg|jpeg)/i;
    const user = JSON.parse(localStorage.getItem("user") || "")

    const fileChangeHandler = (event: any) => {
        const file = event.target.files[0];
        if (!file.type.match(imageMimeType)) {
            notification("error", "le format du fichier n'est pas autorisé");
            return;
        } else if (file?.size > 134041.1111111111) {
            notification("error", "la taille du fichier trop grande. Taille maximale autorisée: 200k");
            return;
        } else {
            setFile(file);
        }


    }

    useEffect(() => {
        let fileReader, isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (event: any) => {
                const { result } = event.target;
                if (result && !isCancel) {
                    setFileDataURL(result)
                }
            }
            fileReader.readAsDataURL(file);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }

    }, [file]);

    async function handleUpdateLogo(event: any) {
        event.preventDefault()
        setLoading(true)
        const request_data = {
            logo: file,
            codelabo: laboratoryID
        }
        try {
            const response = await axios.post(`${url}logolabo`, request_data, {
                "headers": {
                    'Authorization': 'Bearer ' + user?.token,
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response?.data?.success) {
                setLoading(false);
                notification("success", "Mise à jour du logo effectuée avec succès");
                fetchLaboratory()
            } else {
                notification("error", "Un problème est survenu lors la mise à jour du logo");
                setLoading(false);
            }
        } catch (error) {
            notification("error", "Un problème est survenu lors la mise à jour du logo");
            setLoading(false);
        }
    }

    return (
        <div
            className='upload-logo-form-wrapper p-30'
        >
            <form
                className='upload-logo-form'
                onSubmit={handleUpdateLogo}
            >
                {(fileDataURL || logo) &&
                    <div className="preview-container">
                        <div
                            className="logo-preview"
                            style={{
                                backgroundImage: `url("${fileDataURL ? fileDataURL : logo}")`
                            }}
                        >
                        </div>
                        {fileDataURL &&
                            <button
                                type="submit"
                                className="btn btn-main"
                            >
                                Valider
                                {loading &&
                                    <Puff
                                        height="20"
                                        width="20"
                                        radius={1}
                                        color="#fff"
                                        ariaLabel="puff-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                    />}
                            </button>
                        }
                    </div>
                }
                <label
                    className='upload-logo-group'
                    htmlFor="logo"
                >
                    <span
                        className='logo-label'
                    >
                        <p>Cliquez pour {(fileDataURL || logo) ? "changer de" : "choisir un"} logo</p>
                        {file?.name &&
                            <>
                                <h6> Nom: <span>{file.name.split(".")[0]}</span></h6>
                                <h6> Type: <span>{file.name.split(".")[1]}</span></h6>
                            </>
                        }
                    </span>
                    <input
                        type="file"
                        name="logo"
                        id="logo"
                        className="logo-field"
                        accept="image/*"
                        onChange={fileChangeHandler}
                    />
                </label>
            </form>
        </div>
    )
}
