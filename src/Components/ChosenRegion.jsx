import React, { useContext } from "react";
import ResultList from "./ResultList";
import { ThemeContext } from "../helpers/Context";

export default function ChosenRegion({ data }) {
  const { viewCountry } = useContext(ThemeContext);
  return (
    <>
      <ResultList data={data} viewCountry={viewCountry} />
    </>
  );
}
