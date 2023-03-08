import React, { Fragment, useEffect } from 'react';
import { AiFillEye } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { Puff } from 'react-loader-spinner';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  servicesSelector,
  agencyServicesSelector,
  servicesStatusSelector,
  listServicesThunk
} from "../../features/servicesSlice.ts"
import { showModalReducer } from "../../features/modalSlice.ts";
import { UpdateService } from './UpdateService.tsx';
import { UpdateLaboratory } from '../laboratory/UpdateLaboratory.tsx';



const Service = ({ service }) => {

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user") || "");
  function handleModifyService() {
    dispatch(
      showModalReducer({
        active: true,
        header: `Modifier le labo N°: ${service?.matricule}`,
        body: <UpdateService IdService={service?.matricule} />
      })
    )

  }

  function handleModifyLabo() {
    dispatch(
      showModalReducer({
        active: true,
        header: `Modifier le laboratoire N°: ${user?.matricule_labo}`,
        body: <UpdateLaboratory IdLaboratory={user?.matricule_labo} />
      })
    )

  }

  return (
    <Fragment>
      <Link
        to={"#"}
        onClick={handleModifyService}
        className="service-item">
        <div className="service-item-body">
          <h1 className='placeholder'>{service?.matricule}</h1>
        </div>
        <div className="service-item-footer">
          <h3 className="service-name">
            {service?.nom}
          </h3>
          <FaEdit
            className='action-icon'
          />
        </div>
      </Link>

    </Fragment>
  )


}

export function ListServices({ agencyId }) {
  const user = JSON.parse(localStorage.getItem("user") || "");
  const services = useSelector(state => servicesSelector(state));
  const agencyServices = useSelector((state: any) => agencyServicesSelector(state, agencyId));
  const servicesStatus = useSelector((state: any) => servicesStatusSelector(state));
  const dispatch = useDispatch();

  async function handleFetchAgencies() {
    try {
      const response = await dispatch(
        listServicesThunk(user?.matricule_labo)
      ).unwrap();

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    servicesStatus === "idle" && handleFetchAgencies()
  }, [servicesStatus]);


  return (
    <Fragment>
      {servicesStatus === "loading" ?
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
          {servicesStatus === "error" ?
            <div className='loading-fail'>
              <h4 className='fail-text' >Impossible de charger cette ressource </h4>
              <Link
                to='#'
                onClick={handleFetchAgencies}
                className="btn btn-main"
              >
                Essayer à Nouveau
              </Link>
            </div> :
            <>
              {agencyId ?
                <div className='grid-3 gap-20'>
                  {agencyServices?.map((item: any, index: number) =>
                    <Service
                      key={index}
                      service={item}
                    />
                  )}
                </div> :
                <div className='grid-4 gap-20'>
                  {services?.map((item: any, index: number) =>
                    <Service
                      key={index}
                      service={item}
                    />
                  )}

                </div>

              }
            </>
          }


        </>
      }
    </Fragment>
  )
}
