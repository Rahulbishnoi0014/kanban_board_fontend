import React from 'react'
import TicketColumn from './TicketColumn';
import "../Style/board.css";


export const Board = ({ tickets, users, groupBy, sortOrder ,view }) => {


    const groupdata = (tickets, groupBy) => {
        return tickets.reduce((grouped, ticket) => {
            let groupKey;

            switch (groupBy) {
                case 'status':
                    groupKey = ticket.status;
                    break;
                case 'priority':
                    groupKey = ticket.priority;
                    break;
                case 'user':
                    groupKey = ticket.userId;
                    break;
                default:
                    groupKey = 'unknown';
            }

            if (!grouped[groupKey]) {
                grouped[groupKey] = [];
            }

            grouped[groupKey].push(ticket);
            return grouped;
        }, {});
    };


    const groupedTickets = groupdata(tickets, groupBy);

    // console.log(groupedTickets);


    return (
        <div className={view}>


            {Object.entries(groupedTickets).reverse().map(([groupKey, groupTickets]) => (
                <TicketColumn key={groupKey} groupBy={groupBy} group={groupKey} tickets={groupTickets} sortOrder={sortOrder} users={users} />
            ))}

        </div>
    )
}


export default Board;
