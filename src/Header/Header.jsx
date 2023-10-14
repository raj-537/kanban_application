import React, { useEffect, useState } from 'react';
import Kanban from '../Kanban/Kanban';

// Header component that displays a dropdown for configuring Kanban board display options
const Header = () => {
  // Define state variables using the useState hook
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupingOption, setGroupingOption] = useState(null);
  const [sortingOption, setSortingOption] = useState(null);

  // Use the useEffect hook to fetch ticket and user data from an API when the component mounts
  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => {
        setTickets(data.tickets);
        setUsers(data.users);
      });  
  }, []);

  // Event handler for changing the grouping option and saving it to localStorage
  const handleGroupingChange = (option) => {
    setGroupingOption(option);
    localStorage.setItem('groupingOption', option);
  };

  // Event handler for changing the sorting option and saving it to localStorage
  const handleSortingChange = (option) => {
    setSortingOption(option);
    localStorage.setItem('sortingOption', option);
  };

  // Render the header and dropdown for configuring Kanban board display options
  return (
    <>
      <section className="header-container">
        <div className="dropdown">
          <button className="dropbtn">
            <span className="material-symbols-outlined">tune</span>
            Display
            <span className="material-symbols-outlined">expand_more</span>
          </button>
          <div className="dropdown-content">
            <div className='grouping'>
              <p>Grouping</p>
              <select className='select-button' onChange={(e) => handleGroupingChange(e.target.value)} name="group" id="group">
                <option value="status">Status</option>
                <option value="userId">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className='ordering'>
              <p>Ordering</p> 
              <select className='select-button' onChange={(e) => handleSortingChange(e.target.value)} name="order" id="order">
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Render the Kanban component with the selected options and fetched data */}
      <Kanban
        tickets={tickets}
        users={users}
        groupingOption={groupingOption}
        sortingOption={sortingOption}
      />
    </>
  );
}

export default Header;
