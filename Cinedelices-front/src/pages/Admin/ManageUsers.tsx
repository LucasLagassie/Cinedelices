import React, { useEffect, useState } from 'react';
import { FaRegEdit} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { APIBaseURL } from '../../../config';
export default function ManageUsers() {


    const [users, setUsers] = useState([]);

    useEffect(() => {
        
    
    const fetchUser = async() => {

        try{
        const response = await fetch(`${APIBaseURL}/admin/users`, {
            method: 'GET',
            credentials: 'include',
        });
        if(response.status ===  401) {
            console.log('Accès refusé, utilisateur non authentifié');
            return;
        }
        const data = await response.json();
        setUsers(data);
    }
     catch (error) {
        console.log(error);
    }
}
fetchUser();
}, []);

console.log('users dans manageUsers', users);
    return (
        <>
        <h1>Bienvenue sur la page de gestion des utilisateurs !</h1>

        <div className="cards-container-admin">

            {users.map((user) => (
                <>
                <div key={user.id} className="card-recipe">
                    <h3>{user.pseudo}</h3>
                    <div className="edit">
                <MdDelete  />
                    </div>
                </div>
            
            </>
            ))}
            
        </div>
        </>

    )
}