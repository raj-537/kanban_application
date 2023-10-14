import React from 'react';
import Card from '../Card/Card';

// Kanban component that takes tickets, users, groupingOption, and sortingOption as props
const Kanban = ({ tickets, users, groupingOption, sortingOption }) => {

  // Check if groupingOption is null, and if so, try to load it from localStorage
  if (groupingOption === null) {
    const savedGroupingOption = localStorage.getItem('groupingOption');
    if (savedGroupingOption) {
      groupingOption = savedGroupingOption;
    } else {
      groupingOption = "status"; // Default to "status" if not found in localStorage
    }
  }

  // Check if sortingOption is null, and if so, try to load it from localStorage
  if (sortingOption === null) {
    const savedSortingOption = localStorage.getItem('sortingOption');
    if (savedSortingOption) {
      sortingOption = savedSortingOption;
    } else {
      sortingOption = "priority"; // Default to "priority" if not found in localStorage
    }
  }

  // Function to group tickets based on the selected option (e.g., "priority" or "status")
  const groupTickets = (option) => {
    const grouped = {};
    if (option === "priority") {
      for (let i = 4; i >= 1; i--) {
        const priorityTickets = tickets.filter(
          (ticket) => ticket.priority === i
        );
        if (priorityTickets.length > 0) {
          grouped[`Priority ${i}`] = priorityTickets;
        }
      }
    } else {
      tickets.forEach((ticket) => {
        const groupBy = ticket[option];
        if (!grouped[groupBy]) {
          grouped[groupBy] = [];
        }
        grouped[groupBy].push(ticket);
      });
    }

    // Convert the grouped data into an array with group names and their respective tickets
    return Object.keys(grouped).map((group) => ({
      groupName: group,
      tickets: grouped[group],
    }));
  };

  // Function to sort grouped data based on the selected option ,Priotity or Options
  const sortGroupedData = (data, option) => {
    return data.map((group) => {
      let groupName;

      // Determine the group name based on the groupingOption
      if (groupingOption === 'userId') {
        groupName = getUserById(group.groupName).name;
      } else if (groupingOption === 'priority') {
        groupName = getPriorityString(group.tickets[0].priority);
      } else {
        groupName = group.groupName;
      }

      // Sort the tickets within the group based on the sortingOption
      return {
        groupName: groupName,
        tickets: group.tickets.slice().sort((a, b) => {
          if (option === 'title') {
            return a.title.localeCompare(b.title);
          } else {
            return b[option] - a[option];
          }
        })
      };
    });
  };

  // Function to get a priority string based on the numeric priority value
  function getPriorityString(priority) {
    switch (priority) {
      case 4:
        return "Urgent";
      case 3:
        return "High";
      case 2:
        return "Medium";
      case 1:
        return "Low";
      case 0:
        return "No priority";
      default:
        return "Unknown";
    }
  }

  // Function to find a user by their ID
  const getUserById = (userId) => {
    return users.find(u => u.id === userId);
  }

  // Group the tickets based on the grouping option and then sort them
  const groupedData = groupTickets(groupingOption);
  const sortedData = sortGroupedData(groupedData, sortingOption);

  return (
    <>
      <section>
        <div className="container">
          <div className="inner-div">
            <div className="kanban-grouping">
              {sortedData.map((group) => (
                <div key={group.groupName}>
                  <div className="group-heading">
                    <div>
                      <h4>{group.groupName} &nbsp; &nbsp;{group.tickets.length}</h4>
                    </div>
                    <div>
                      <span className="material-symbols-outlined">add</span>
                      <span className="material-symbols-outlined">more_horiz</span>
                    </div>
                  </div>
                  {group.tickets.map((ticket) => (
                    <div className="inner-div" key={ticket.id}>
                      <Card
                        id={ticket.id}
                        title={ticket.title}
                        status={ticket.status}
                        tag={ticket.tag[0]}
                        user={getUserById(ticket.userId).name}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Kanban;
