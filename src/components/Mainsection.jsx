import React, { useEffect, useState } from 'react'
import axios from "axios"
import Card from './Card';

const Mainsection = () => {
    const [tickets, setTickets] = useState();
    const [users, setUsers] = useState();
    const [error, seterror] = useState();

    const getData = async () => {

        const res = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment");
        console.log(res);

        if (res) {
            setTickets(res.data.tickets);
            setUsers(res.data.users);

        }
        else
            seterror("E R R O R");

    }

    useEffect(() => {
        getData();
    }, []);

    const getStatusForUser = (userId) => {
        const user = users.find((user) => user.id === userId);
        return user.available;
    };

    return (
        <div className='mainsec'>
            {
                error && (<p>{error}</p>)}

            {tickets && (
                <div>
                    {tickets.map((item) => (

                        <Card key={item.id} data={item} userStatus={getStatusForUser(item.userId)} />
                    ))}
                </div>
            )}



        </div>
    )
}

export default Mainsection