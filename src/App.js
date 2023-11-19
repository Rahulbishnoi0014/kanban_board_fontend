import React, { useEffect, useState } from 'react'
import "./App.css";
import "./Style/main.css"
import axios from 'axios';
import { Board } from './components/Board';

import on from "./icons/on-button.png"
import off from "./icons/off-button.png"

import setting from "./icons/settings.png";
import down from "./icons/down-arrow.png";



const App = () => {

  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState();

  const [groupBy, setGroupBy] = useState(() => {
    const res = localStorage.getItem("groupBy");
    return res ? JSON.parse(res).groupBy : "status";
  });

  const [sortOrder, setSortOrder] = useState(() => {
    const res = localStorage.getItem("sortOrder");
    return res ? JSON.parse(res).sortOrder : "priority";
  });

  const [view, setview] = useState(() => {
    const res = localStorage.getItem("view");
    return res ? JSON.parse(res).view : "dashcol";
  });



  const [error, seterror] = useState();

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };



  const getsort = (e) => {
    setSortOrder(e.target.value)
    localStorage.setItem("sortOrder", JSON.stringify({ sortOrder: e.target.value }));
  }

  const getgroup = (e) => {
    setGroupBy(e.target.value);
    localStorage.setItem("groupBy", JSON.stringify({ groupBy: e.target.value }));
  }

  const toggleview = () => {
    if (view === "dashcol") {
      setview("dashrow");
      localStorage.setItem("view", JSON.stringify({ view: "dashrow" }));
    }
    else {
      setview("dashcol");
      localStorage.setItem("view", JSON.stringify({ view: "dashcol" }));

    }



  }

  const getData = async () => {

    const res = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment");
    // console.log(res);

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


  return (
    <div className='mainbody'>
      <div className='nav'>


        <div className="dropdown-container">
          <div
            className="dropdown-button"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >

            <img className='displayicon' src={setting} alt='img'></img>
            <p>Display</p>
            <img className='displayicon' src={down} alt='img'></img>

          </div>

          {isDropdownOpen && (
            <div className="dropdown-content" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <div className='selectbox'>


                <table>

                  <tbody>
                    <tr>
                      <td>
                        <p>Group By:</p>
                      </td>
                      <td>
                        <select onChange={getgroup} value={groupBy}>
                          <option value="status">Status</option>
                          <option value="user">User</option>
                          <option value="priority">Priority</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>Sort By:</p>
                      </td>
                      <td>
                        <select onChange={getsort} value={sortOrder}>
                          <option value="priority">Priority</option>
                          <option value="title">Title</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>

              </div>
            </div>
          )}

        </div>

        <table>
          <tbody>
            <tr>
              <td>
                <p>Toggle view</p>
              </td>
              <td>
                <img onClick={toggleview} src={view === "dashrow" ? on : off} alt='img'></img>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {error&&<h1>{error}</h1>}

      <Board tickets={tickets} users={users} groupBy={groupBy} sortOrder={sortOrder} view={view} />

    </div >
  )
}

export default App