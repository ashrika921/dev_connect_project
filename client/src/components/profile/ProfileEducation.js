import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({
  education: { school, from, to, current, description, degree, fieldofstudy },
}) => {
  return (
    <div>
      <h3>{school}</h3>
      <p>
        {from && <Moment format="YYYY/MM/DD">{from}</Moment>} -{" "}
        {current ? <span>Now</span> : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      <p>
        <strong>Field Of Study: </strong>
        {fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong>
        {description && <span>{description}</span>}
      </p>
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
