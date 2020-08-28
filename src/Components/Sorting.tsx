import React, { useContext } from "react";

import { ButtonGroup, Button } from "react-bootstrap";
import { ThemeContext } from "../helpers/Context";

export default function Sorting() {
  const { sortingCountry, sorting } = useContext(ThemeContext);

  return (
    <div className="sorting-block">
      <ButtonGroup aria-label="Basic example">
        <Button variant="dark" name="name" onClick={sortingCountry}>
          Sort by name{" "}
        </Button>
        <Button variant="dark" name="population" onClick={sortingCountry}>
          Sort by population{" "}
        </Button>
      </ButtonGroup>

      <span>
        {" "}
        <span className="bold underline">{sorting}:</span> sorting is selected{" "}
      </span>
    </div>
  );
}
