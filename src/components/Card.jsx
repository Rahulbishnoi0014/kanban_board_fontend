import React  from 'react'
import "../Style/card.css";
import profile from "../icons/profile.png";

import check from "../icons/check.png";
import progress from "../icons/inprogress.png";
import dot from "../icons/dot.png";
import cancel from "../icons/cancel.png";
import todo from "../icons/todo.png";


const Card = ({ data,users }) => {

    const getStatusForUser = (userId) => {
        const user = users.find((user) => user.id === userId);
        return user.available;
    };

    // const userStatus = true;

    let simg;
    switch (data.status) {
        case 'Todo':
            simg = todo;
            break;
        case 'In progress':
            simg = progress;
            break;
        case 'Backlog':
            simg = cancel;
            break;
        case 'Done':
            simg = check;
            break;
        default:
            simg = dot;



    }


    return (
        <div className='cardbody'>
            <p className='id'>{data.id}</p>
            <div className="sbox">
                <div className='sicon'>

                    <img src={simg} alt='img'></img>
                </div>

                <p className='title'>{data.title}</p>
            </div>

            <div className='picbox'>
                <img className="pic" src={profile} alt="userImg"></img>

                <span className='activeicon' style={{ backgroundColor: getStatusForUser(data.userId) ? "rgb(3, 255, 3)" : "rgb(163, 163, 163)" }}></span>

            </div>


            <p className='tag'>{data.tag[0]}</p>

        </div>
    )
}

export default Card;