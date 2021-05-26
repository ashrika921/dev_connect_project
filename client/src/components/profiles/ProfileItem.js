import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const ProfileItem = ({
  profile: {
    user: { _id, avatar, name },
    status,
    company,
    location,
    skills,
  },
}) => {
  return (
    <div className="profile bg-light">
      <img src={avatar} alt="" className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company ? <span>at {company}</span> : null}
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, ind) => (
          <li className="text-primary" key={ind}>
            <i className="fas fa-check">{skill}</i>
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
