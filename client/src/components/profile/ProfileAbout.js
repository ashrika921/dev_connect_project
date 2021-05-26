import React, { Fragment } from "react";
import PropTypes from "prop-types";
// import {connect} from "react-redux"

const ProfileAbout = ({
  profile: {
    skills,
    bio,
    user: { name },
  },
}) => {
  return (
    <div className="profile-about bg-light p-2">
      {bio && (
        <Fragment>
          {" "}
          <h2 className="text-primary">
            {name.trim().split(" ")[0] + "'s bio"}
          </h2>
          <p>{bio}</p>
        </Fragment>
      )}
      <div className="line"></div>
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {skills &&
          skills.map((skill, ind) => (
            <div className="p-1" key={ind}>
              <i className="fa fa-check"></i> {skill}
            </div>
          ))}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
