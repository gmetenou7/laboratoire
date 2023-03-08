import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { listEmployeesThunk } from '../../features/EmployeesSlice.ts';
import { UsersTable } from "../tables/Table.tsx"

interface EmployeesData {
    code: string;
    nom: string;
    prenom: string;
    phone: string;
    fonction: string;
    service: string;
    mail: string;
  }
export function ListEmployees() {
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.employees);
    const [isMounted, setIsMounted] = useState(true)
    const user = JSON.parse(localStorage.getItem("user") || "");
    const [query, setQuery] = useState("")
  
    async function fetchEmployees() {
      try {
        await dispatch(
          listEmployeesThunk(
            user?.matricule_labo
          )
        ).unwrap();
      } catch (error) {
        console.log(error);
      }
    }

    function handleFilter (data: []){
        const queryTolowerCase = query.toLowerCase();
        return data?.filter(
            (item: EmployeesData)=>
                
              item?.code?.toLowerCase().includes(queryTolowerCase) ||
              item?.nom
              ?.toLocaleString()?.toLowerCase().includes(queryTolowerCase) ||
              item?.prenom?.toLowerCase().includes(queryTolowerCase)

        )
    }

    useEffect(() => {
      isMounted && fetchEmployees()
    
      return () => {
        setIsMounted(false)
      }
    }, [isMounted])
    
    
  return (
    <div className="list-patients">
        <div className="feature-title">
            <h4 className="title">
                Liste des Employés
            </h4>
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
                
                <Link 
                  to="/employees/add" 
                  className='btn-link-green'>
                  <span>Ajouter un employé</span> <FaPlus />
                </Link>
            </div>
        </div>
        <div className="patients">
            <UsersTable data={handleFilter(employees?.data)} />
        </div>
    </div>
  )
}
