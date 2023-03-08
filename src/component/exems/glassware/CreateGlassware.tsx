import React, { useState } from 'react';
import InputField from "../../utilities/FormField.tsx";
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Puff } from 'react-loader-spinner';
import {
    createGlasswareThunk,
    closeGlasswareForm
} from '../../../features/glasswareSlice.ts';
import { listGlasswareThunk } from '../../../features/glasswareSlice.ts';

interface Glassware {
    nom: string,
    symbole: string,
}
const colorPalette = [
    {
        color: "ffffff",
        name: "Blanche"
    },
    {
        color: "a59d9d",
        name: "Grise",
    },
    {
        color: "92d050",
        name: "Verte"
    },
    {
        color: "7030a0",
        name: "Mauve"
    },
    {
        color: "ff0000",
        name: "Rouge"
    },
    {
        color: "00b0f0",
        name: "Blue ciel"
    },
]

export default function CreateGlassware() {
    const [selectedColor, setSelectedColor] = useState({
        color: "ffffff",
        name: "Blanche"
    })

    const { register, handleSubmit, formState: { errors } } = useForm<Glassware>();
    const glassware = useSelector((state: any) => state.glassware);
    const user = JSON.parse(localStorage.getItem("user") || "");
    const [showColorPicker, setShowColorPicker] = useState(false)
    const dispatch = useDispatch();

    async function handleCreateGlassware(data: Glassware) {
        const request_data = {
            nom: data?.nom,
            symbole: data?.symbole,
            couleur: `${selectedColor.name}_${selectedColor.color}`,
            codelaboratoire: user?.matricule_labo
        }
        try {
            const response = await dispatch(
                createGlasswareThunk(request_data)
            ).unwrap();

            if (response?.data?.success) {
                dispatch(
                    listGlasswareThunk(user?.matricule_labo)
                ).unwrap()
            }
        } catch (error) {

        }
    }

    function handleChooseColor(event) {
        const color = event.target.getAttribute("data-color");
        const name = event.target.getAttribute("title");
        setSelectedColor({
            name: name,
            color: color
        })
        setShowColorPicker(!showColorPicker)
    }
    return (
        <form
            onSubmit={handleSubmit(handleCreateGlassware)}
            className="create-glassware-form"
        >
            <InputField
                id="glass-name"
                label="Nom du tube"
                type="text"
                placeholder="Entrer le nom du tube"
                register={register("nom", {
                    required: "Ce champ est requis"
                })}
                error={{ for: "glass-name", text: errors?.nom?.message }}
            />
            <InputField
                id="glass-symbol"
                label="Symbole du tube"
                type="text"
                placeholder="Entrer le Symbole du tube"
                register={register("symbole", {
                    required: false
                })}
                error={{ for: "glass-symbol", text: errors?.symbole?.message }}
            />
            <div className="color-picker-group">
                <span>Choisir la couleur</span>
                <div className="picker-preview">
                    <div
                        style={{
                            backgroundColor: `#${selectedColor.color}`,
                            color: `${selectedColor.name === "Blanche" ? "#000000" : "#ffffff"}`
                        }}
                        onClick={() => setShowColorPicker(!showColorPicker)}
                        className="color-preview">
                        <span>{selectedColor.name}</span>
                    </div>
                </div>
                {showColorPicker &&
                    <div
                        className="color-palette">
                        {colorPalette.map((item, index) =>
                            <div
                                style={{
                                    backgroundColor: `#${item.color}`,
                                    border: "solid 1px #a9cae8"
                                }}
                                onClick={(event) => handleChooseColor(event)}
                                data-color={item.color}
                                title={item.name}
                                className="color"
                                key={item.name}>
                            </div>
                        )}
                    </div>
                }
            </div>
            <div className="btn-group mt-10">
                <button
                    type="submit"
                    className="btn btn-main"
                >
                    Ajouter
                    {glassware?.status === "loading" &&
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
                    }
                </button>
                <button
                    onClick={() => dispatch(closeGlasswareForm())}
                    type="button"
                    className="btn btn-white">
                    Fermer
                </button>
            </div>
        </form>
    )
}
