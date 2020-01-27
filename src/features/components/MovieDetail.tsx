import React from "react";
import { RouteComponentProps } from "react-router-dom";

export const MovieDetail = ({
  match,
  history
}: RouteComponentProps<{ id: string }>) => (
  <React.Fragment>
    <div>Movie from {match.params.id}</div>
    <button
      type="button"
      className="btn btn-primary"
      onClick={() => history.push("/movies")}
    >
      Save
    </button>
  </React.Fragment>
);
