import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/context";
import { Chip } from 'primereact/chip';

export const Account = () => {

    const { store } = useContext(Context);
    const [getUserInformation, setGetUserInformation] = useState([])
    const [getUserCompany, setGetUserCompany] = useState([])
    const [id, setId] = useState('')
  
    var email = window.sessionStorage.getItem('email', email)
    var ENDPOINT = store.endpoint;

  useEffect(() => {
    
    const UserInformation = () => {
      try {
        const requestOptions = {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        }
        fetch (`${ENDPOINT}/api/users/${email}`, requestOptions)
              .then(res => res.json())
              .then(data => setGetUserInformation(data[0]))
      }
      catch (error){
        console.log(error)  
      }
      setId(getUserInformation.id)
    }
    UserInformation()
    const UserCompany = () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }
      fetch(`${ENDPOINT}/api/companies/${id}`, requestOptions)
        .then(res => res.json())
        .then(data => setGetUserCompany(data[0]))
    }
    catch (error){
      console.log(error)  
    }   
  }
      UserCompany()
  },[])
  
  
  
  
  
  const label = getUserInformation.firstname+" "+getUserInformation.lastname

  return (
    <>
      <div className="text-center account-img mb-4">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSST3P11kEjhzKKXSk3OjfPiHDC6BcEdXgLaw&usqp=CAU" width="180em" alt="user-logo"/>
      </div>
      <div className="mt-5">
        <div className="p-d-flex p-ai-center p-flex-wrap ml-3">
          <Chip label={label} icon= "pi pi-users" className="p-mr-2 p-mb-2" />
        </div>
        <div className="p-d-flex p-ai-center p-flex-wrap ml-3">
          <Chip label={getUserInformation.email} image= "https://p7.hiclipart.com/preview/663/97/225/email-computer-icons-message-bounce-address-email-icon.jpg" className="p-mr-2 p-mb-2" />
        </div>
        <div className="p-d-flex p-ai-center p-flex-wrap ml-3 mb-3">
          <Chip label={getUserCompany.name} image="https://static.thenounproject.com/png/88781-200.png" className="p-mr-2 p-mb-2" />
        </div>
      </div>
      </>
    )
}