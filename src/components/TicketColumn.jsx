import React from 'react'
import Card from './Card';
import "../Style/ticketcol.css";

import dot from "../icons/dot.png"
import plus from "../icons/plus.png"
import medium from "../icons/medium.png"
import high from "../icons/high.png"
import warning from "../icons/warning.png"
import low from "../icons/low.png"
import profile from "../icons/profile.png";
import check from "../icons/check.png";
import progress from "../icons/inprogress.png";
import cancel from "../icons/cancel.png";
import todo from "../icons/todo.png";


const TicketColumn = ({ groupBy, group, tickets, sortOrder, users }) => {

    const sortdata = () => {
        return tickets.sort((a, b) => {
            if (sortOrder === "priority")
                return b.priority - a.priority;
            else if (sortOrder === "title")
                return a.title - b.title;

            return 0;

        })
    }

    const findusername = (userId) => {

        const user = users.find((user) => user.id === userId);

        return <span>
            <img className="colheadicon" src={profile} alt="userImg"></img>


            <span className='colheadicon' style={{ borderRadius: "10px",marginTop:"9px" , height: "10px", width: "10px",backgroundColor: user.available ? "rgb(3, 255, 3)" : "rgb(163, 163, 163)" }}></span>

            

            {user.name}



        </span>



    }


    sortdata();

    const statusfun = (x) => {
        let span;

        switch (x) {
            case "Todo":
                span = <> <img className='colheadicon' src={todo} alt="img cion"></img><span> {x}</span></>
                break;
            case 'In progress':
                span = <>  <img className='colheadicon' src={progress} alt="img cion"></img ><span> {x}</span></>
                break;
            case 'Backlog':
                span = <>  <img className='colheadicon' src={cancel} alt="img cion"></img ><span> {x}</span></>
                break;
            case 'Done':
                span = <>  <img className='colheadicon' src={check} alt="img cion"></img><span> {x}</span></>
                break;

            default:
                span = <span>Invalid</span>
                break;
        }

        return span;

    }

    const priorityfun = (x) => {
        let span;


        switch (x) {
            case "4":
                span = <> <img className='colheadicon' src={warning} alt="img cion"></img><span> Urgent</span></>
                break;
            case '3':
                span = <>  <img className='colheadicon' src={high} alt="img cion"></img ><span> High</span></>
                break;
            case '2':
                span = <>  <img className='colheadicon' src={medium} alt="img cion"></img ><span> Medium</span></>
                break;
            case '1':
                span = <>  <img className='colheadicon' src={low} alt="img cion"></img><span> Low</span></>
                break;
            case '0':
                span = <> <img className='colheadicon' src={dot} alt="img cion"></img ><span> No priority</span></>
                break;
            default:
                span = <span>Invalid priority level</span>
                break;
        }

        return span;
    }

    return (
        <div className='ticketscol'>


            <div className='tcupper'>
                {
                    groupBy === "user" && <h2>{findusername(group)} <span><em>{tickets.length}</em></span></h2>
                }
                {
                    groupBy === "status" && <h2>{statusfun(group)} <span><em>{tickets.length}</em></span></h2>
                }
                {
                    groupBy === "priority" && <h2>{priorityfun(group)} <span><em>{tickets.length}</em></span></h2>
                }


                <div className='img'>
                    <img className='tcicon' src={dot} alt='img'></img>
                    <img className='tcicon' src={plus} alt='img'></img>

                </div>
            </div>
            {tickets.map((ticket) => (
                <Card key={ticket.id} data={ticket} users={users} />
            ))}
        </div>
    );
};


export default TicketColumn