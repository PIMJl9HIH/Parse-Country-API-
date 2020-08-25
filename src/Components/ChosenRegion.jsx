import React, { useContext } from "react";
import ResultList from "./ResultList";
import { ThemeContext } from "../helpers/Context";

import Sorting from "./Sorting";

export default function ChosenRegion({ data }) {
  const { viewCountry } = useContext(ThemeContext);
  return (
    <>
      <Sorting />
      <ResultList data={data} viewCountry={viewCountry} />
    </>
  );
}
