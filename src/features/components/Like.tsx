import React, { useState } from "react";

const Like = () => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <i
      style={{ cursor: "pointer" }}
      className={isLiked ? "fa fa-heart" : "fa fa-heart-o"}
      arria-hidden="true"
      onClick={() => setIsLiked(!isLiked)}
    />
  );
};

export default Like;
