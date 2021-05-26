import React, { Fragment, useEffect } from "react";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost } from "../../actions/post";
import PostItem from "../posts/PostItem";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
export const Post = ({ getPost, post: { loading, post }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link className="btn" to="/posts">
        Back to posts
      </Link>
      <PostItem showActions={false} post={post} />
      <CommentForm postId={post._id} />
      {post.comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} postId={post._id} />
      ))}
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
