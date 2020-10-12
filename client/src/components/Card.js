import React from "react";
import { Link } from "react-router-dom";

const Card = ({ content, from }) => {
  return (
    <div className="mr-2 mb-3">
      <Link to={`/${from}/${content._id}`}>
        <img 
          style={{ width: "200px" }}
          src={content.poster_path}
          alt={content._id}
        />
      </Link>
    </div>
  );
};

export default Card;