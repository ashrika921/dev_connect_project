import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGithubRepos } from "../../actions/profile";
import Spinner from "../layout/Spinner";

const ProfileGithub = ({ getGithubRepos, username, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos]);
  if (repos) console.log(repos);
  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>
      {repos == null ? (
        <Spinner />
      ) : (
        repos.map((repo, ind) => (
          <div key={ind} className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">
                  Stars:{repo.stargazers_count}{" "}
                </li>
                <li className="badge badge-dark">
                  Watchers:{repo.watchers_count}{" "}
                </li>
                <li className="badge badge-light">
                  Forks :{repo.forks_count}{" "}
                </li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ProfileGithub.propTypes = {
  repos: PropTypes.array.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    repos: state.profile.repos,
  };
};

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);