import React from "react";
import PropTypes from "prop-types";

export default function PostList(props) {
  return (
    <div style={{ marginTop: "24px" }}>
      {props.posts.map((item, i) => {
        return `Post ${i}`;
      })}
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  removeUpdate: PropTypes.func.isRequired,
};
