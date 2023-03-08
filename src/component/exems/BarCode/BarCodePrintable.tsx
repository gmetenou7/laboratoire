import React, { useEffect, useState, useRef } from 'react'
import callApi from "../../../Utils/Utils.tsx";
import Barcode from "react-barcode";
import ReactToPrint from "react-to-print";
import { Puff } from 'react-loader-spinner';

interface BarCode {
    etiquette: string,
    nom: string
}

export default function BarCodePrintable({ examId }) {
    const [isMounted, setIsMounted] = useState(true);
    const [loading, setLoading] = useState(false);
    const [barCodeData, setBarCodeData] = useState<[BarCode]>()

    let componentRef: any = useRef();

    async function handleFetchBarCode() {
        setLoading(true)
        try {
            const response = await callApi(
                true,
                `laboetiquette/${examId}`,
                "get",
                null
            );
            if (response?.data?.success) {
                setLoading(false);
                setBarCodeData(response?.data?.data)

            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    useEffect(() => {
        isMounted && handleFetchBarCode()

        return () => {
            setIsMounted(false)
        }
    }, [isMounted, setIsMounted])

    return (
        <>
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
                    <h4>Génération des codes bare</h4>

                </div> :
                <div className='barcode-container' ref={(el) => (componentRef = el)}>
                    <div className="barcode-item">
                        <Barcode
                            value={examId}
                            format="CODE128"
                            width={1.25}
                            height={90}
                        />
                    </div>
                </div>}
            <div>
                <ReactToPrint
                    documentTitle={`étiquette-pour-le-bon-${examId}`}
                    trigger={() => <button className="btn btn-mains"> Imprimer</button>}
                    content={() => componentRef}
                />
            </div>

        </>
    )
}
