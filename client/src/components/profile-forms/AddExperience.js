import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { addExperience } from "../../actions/profile";
import { connect } from "react-redux";
const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const [toDateDisabled, toggleDisabled] = useState(false);
  const { company, title, location, from, to, current, description } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    addExperience(formData, history);
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            value={title}
            onChange={(e) => onChange(e)}
            name="title"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            value={company}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            onChange={(e) => onChange(e)}
            value={from}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              onChange={(e) => {
                toggleDisabled(!toDateDisabled);
                setFormData({ ...formData, current: !current });
              }}
              value={current}
            />{" "}
            Current Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={(e) => onChange(e)}
            disabled={toDateDisabled ? "disabled" : ""}
          />
        </div>
        <div className="form-group">
          <textarea
            value={description}
            onChange={(e) => onChange(e)}
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));