import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { ExamsTable } from "../tables/Table.tsx";
import { useDispatch, useSelector } from "react-redux";
import { showModalReducer } from "../../features/modalSlice.ts";
import { CreateExam } from "./CreateExam.tsx";
import { listExamsThunk } from "../../features/examSlice.ts";
import ReactPaginate from "react-paginate";
import { patientExams } from "../../features/examSlice.ts";
import { ExamPrintable } from "./ExamPrintable.tsx";
import BarCodePrintable from "./BarCode/BarCodePrintable.tsx";
import {
  examsReceiveStatus,
  listLaborantinExamThunk,
  examStatusSelector,
  laborantinExams
} from "../../features/examSlice.ts";
import { ResultPrintable } from "./examsResults/ResultPrintable.tsx";
import { UpdateExam } from "./UpdateExam.tsx";
import RecordSample from "../../page/views/RecordSample.tsx";
import { DeleteExam } from "./DeleteExam.tsx";
import { TransferExamVoucherForm } from "../../component/exems/TransferExamVoucherForm.tsx"
import callApi from "../../Utils/Utils.tsx"

interface Exams {
  code: string;
  laborentin: String;
  nomcli: String;
  prenomcli: String;
  statut: String;
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



export function ListExems(props: any) {
  const { caisse, it, laboratory, listLaborantin, completed, sampler, accueil } = props;
  const dispatch = useDispatch();
  const params = useParams();
  const user = JSON.parse(localStorage.getItem("user") || "");
  const exams = useSelector((state: any) => state.exams.listExamens);

  const [
    singleLaborantin,
    setSingleLaborantin
  ] = useState<SingleLaborantin>();
  const [loading, setLoading] = useState(false);
  const [loadingFailed, setLoadingFailed] = useState(false);
  const [laborantins, setLaborantins] = useState<[SingleLaborantin]>();
  const laborantinWorkingOnTheVoucher = laborantins?.find(
    item => item?.etat === 1
  )
  const examsStatus = useSelector(
    (state: any) => examStatusSelector(state)
  )
  const [query, setQuery] = useState("");

  const patientExam = useSelector((state) =>
    patientExams(state, params?.matricule)
  );

  const listLaborantinExams = useSelector((state: any) =>
    laborantinExams(state)
  );

  const exams_receive_status = useSelector((state) =>
    examsReceiveStatus(state)
  );

  const [responseMessage, setResponseMessage] = useState<string>();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [showAll, setShowAll] = useState<Boolean>(true);
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    showAll ? exams?.length : 10
  );
  const pagevisited = pageNumber * itemsPerPage;
  const itemsToPaginate = returnExams()
  const pageCount = Math.ceil(itemsToPaginate?.length / itemsPerPage);

  function handlePagination({ selected }) {
    setPageNumber(selected)
  }

  function itemsToDisplay(data: []) {
    if (showAll) {
      return data
    } else {
      return data?.slice(
        pagevisited, pagevisited + itemsPerPage
      )
    }
  }

  function HandleOPenRecordSample(exam_id: string) {
    dispatch(
      showModalReducer({
        active: true,
        header: `Enregistrer les prélèvements pour le bon N°: ${exam_id}`,
        body: <RecordSample examId={exam_id} />,
      })
    );
  }

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

  function handleOpenChangeLaborantinModal(exam_id: string) {
    dispatch(
      showModalReducer({
        header: `Transfère du bon n°: ${exam_id} à un autre laborantin`,
        active: true,
        body: <TransferExamVoucherForm
          VoucherId={exam_id}
          idLabrantin={laborantinWorkingOnTheVoucher?.codelaborentin}
          fetchSingleExam={fetchSingleExam}

        />
      })
    )
  }


  function handleOpenModal() {
    dispatch(
      showModalReducer({
        active: true,
        header: "Ajouter un examen",
        body: <CreateExam get_exam_list={fetchExams} patientId={params?.matricule} />,
      })
    );
  }

  function returnExams() {
    if (params?.matricule) {
      return patientExam;
    }

    if (caisse) {
      return exams_receive_status;
    }

    if (it) {
      if (completed) {
        return exams?.filter((item: any) => item.laborantins.length > 0);
      } else {
        return exams?.filter((item: any) => item?.statut === "reçu" || item?.statut === "encours")
      }
    }

    if (laboratory) {
      if (listLaborantin) {
        return listLaborantinExams;
      } else {
        return exams?.filter((item: any) => item.mesbons !== "yes")
      }
    }

    if (sampler) {
      return exams?.filter(item => item?.statut === "encours");
    }

    return exams
  }


  async function fetchExams() {
    try {
      let response: any
      if (user?.nomservice === "laboratoire") {
        examsStatus === "idle" && await dispatch(
          listLaborantinExamThunk({
            codelabo: user?.matricule_labo,
            codeagence: user?.matricule_ag,
            codelaborentin: user?.matricule
          })
        )
      } else {
        if (examsStatus === "idle") {
          response = await dispatch(
            listExamsThunk({
              matricule_labo: user?.matricule_labo,
              matricule_ag: user?.matricule_ag ? user.matricule_ag : "_",
            })
          ).unwrap();
        }

      }

      if (response.status === 422) {
        setResponseMessage(
          "Aucun examen trouvé pour le moment. Commencez par ajouter un examen."
        );
      }
    } catch (error) {

    }
  }

  function handleShowPrintableExam(id_exam: String) {
    dispatch(
      showModalReducer({
        header: `Bon d'examen n°: ${id_exam}`,
        active: true,
        body: <ExamPrintable idExam={id_exam} caisse={caisse} />,
      })
    );
  }

  function handleShowEditExam(id_exam: String) {
    dispatch(
      showModalReducer({
        header: `Modifier le bon d'examen n°: ${id_exam}`,
        active: true,
        body: <UpdateExam examId={id_exam} />,
      })
    );
  }
  function handleDeleteExam(id_exam: String) {
    dispatch(
      showModalReducer({
        header: `Supprimer le bon d'examen n°: ${id_exam}`,
        active: true,
        body: <DeleteExam examId={id_exam} />,
      })
    );
  }


  function handleShowPrintableBarCode(exam_id: string) {
    dispatch(
      showModalReducer({
        header: `Impression des étiquettes pour l'examen N°: ${exam_id}`,
        active: true,
        body: <BarCodePrintable examId={exam_id} />
      })
    )
  }

  function handleShowPrintableResult(exam_id: string) {
    dispatch(
      showModalReducer({
        header: `Impression du resultat pour l'examen N°: ${exam_id}`,
        active: true,
        body: <ResultPrintable examId={exam_id} />
      })
    )
  }

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchExams();
      fetchSingleExam()
    }
    else {
      return () => {
        isMounted = false;
      };
    }

  }, []);

  function handleFilter(data: []) {
    const queryTolowerCase = query.toLowerCase();
    return data?.filter(
      (item: Exams) =>
        item?.code?.toLowerCase().includes(queryTolowerCase) ||
        item?.nomcli
          ?.toLocaleString()
          .toLowerCase()
          .includes(queryTolowerCase) ||
        item?.statut?.toLowerCase().includes(queryTolowerCase)
    );
  }

  return (
    <div className="list-patients">
      <div className="feature-title">
        {!params?.matricule &&
          <div className="pagination-container">
            <label htmlFor="list-paginate" className="list-paginate">
              <span>Afficher</span>
              <select id="list-paginate"
                className="select-list-paginate"
                onChange={(event) => {
                  if (event?.target?.value === "all") {
                    setShowAll(true);
                    setItemsPerPage(itemsToPaginate?.length)
                  } else {
                    setShowAll(false)
                    setItemsPerPage(parseInt(event.target.value))
                  }
                }}
              >
                <option defaultValue="all" value="all">Tout</option>
                <option value="10">10</option>
              </select>
            </label>

            <ReactPaginate
              previousLabel="<<"
              nextLabel=">>"
              pageRangeDisplayed={1}
              marginPagesDisplayed={1}
              pageCount={pageCount}
              onPageChange={handlePagination}
              containerClassName="pagination-content"
              previousLinkClassName={"previous-btn"}
              nextLinkClassName={"next-btn"}
              disabledClassName={"pagination-disabled"}
              activeClassName={"pagination-active"}
              pageClassName="pagination-item"
              breakLabel="..."
            />

          </div>
        }
        <div className="search-box">
          <input
            type="text"
            id="search-exam-type"
            className="search-field"
            placeholder="Recherche rapide"
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="btn-group">
          {(!caisse && !sampler && !it && !laboratory && user?.fonction !== "admin") && (
            <Link to="#" onClick={handleOpenModal} className="btn-link-green">
              <span>Ajouter examens</span> <FaPlus />
            </Link>
          )}
        </div>
      </div>
      {responseMessage ? (
        responseMessage
      ) : (
        <div className="patients">
          <ExamsTable
            data={itemsToDisplay(handleFilter(returnExams()))}
            caisse={caisse}
            it={it}
            accueil={accueil}
            laboratory={laboratory}
            showPrintable={handleShowPrintableExam}
            showPrintableBarcode={handleShowPrintableBarCode}
            showPrintableResult={handleShowPrintableResult}
            showEditExam={handleShowEditExam}
            showRecordSample={HandleOPenRecordSample}
            showDeleteExam={handleDeleteExam}
            showTransfer={handleOpenChangeLaborantinModal}
          />
        </div>
      )}
    </div>
  );
}
