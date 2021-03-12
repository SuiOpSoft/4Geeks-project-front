import { useContext, useCallback, useState } from "react";

export default function Account () {

    const { store, actions } = useContext(Context);
    const [getUserInformation, setGetUserInformation] = useState([])
  
  var email = window.sessionStorage.getItem('email', email)
  var ENDPOINT = store.endpoint;

    useEffect(() => {
      UserInformation()
  },[])
  
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
  }

    return{
       
    }
}