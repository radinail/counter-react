import React from "react";
import { Genre } from "../../api/genres";

const inlineStyle = {
  genreStyle: {
    cursor: "pointer",
    width: "171px",

    marginBottom: "12px"
  }
};

type ListGroupsProps = {
  onGenresChange: (value: string) => void;
  nameOfGenre: string;
  valueProperty: "_id" | "name";
  listGenres: Genre[];
};

export const ListGroups = ({
  onGenresChange,
  nameOfGenre,
  valueProperty,
  listGenres
}: ListGroupsProps) => {
  const list = [{ _id: "", name: "All Genres" }, ...listGenres];
  return (
    <ul className="list-group" style={{ marginTop: "33px" }}>
      {list.map(genre => (
        <li
          style={inlineStyle.genreStyle}
          key={genre._id}
          className={
            nameOfGenre === genre[valueProperty]
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => {
            onGenresChange(genre[valueProperty]);
          }}
        >
          {genre[valueProperty]}
        </li>
      ))}
    </ul>
  );
};
