import React from 'react'

const Card = ({id, title, tag, user}) => {
  const color = () => {
    const randomColor = `rgb(${Math.floor(Math.random() * 100) + 155}, ${Math.floor(Math.random() * 100) + 155}, ${Math.floor(Math.random() * 100) + 155})`;
    return randomColor;
  };
  return (
    <div className="card-container">
      <div className="card-heading">
        <p className="card-id">{id}</p>
        <p className="card-name" style={{ backgroundColor: color() }}>
          {user[0]}
        </p>
      </div>

      <p className="card-title"> {title}</p>
      <div className="card-tag">
        <span className="material-symbols-outlined">report</span>
        <p>{tag}</p>
      </div>
    </div>
  );
}

export default Card