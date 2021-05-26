import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({
  experience: { company, from, to, current, description, title },
}) => {
  return (
    <div>
      <h3 className="text-dark">{company}</h3>
      <p>
        {from && <Moment format="YYYY/MM/DD">{from}</Moment>} -{" "}
        {current ? <span>Now</span> : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </p>
      <p>
        <strong>Position: </strong>
        {title}
      </p>
      <p>
        <strong>Description: </strong>
        {description && <span>{description}</span>}
      </p>
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
