import React, { useContext } from "react";
import ResultList from "./ResultList";
import { ThemeContext } from "../helpers/Context";

import Sorting from "./Sorting";

type propsType = {
  data: object[];
};

export default function ChosenRegion({ data }: propsType) {
  const { viewCountry } = useContext(ThemeContext);
  return (
    <>
      <Sorting />
      <ResultList data={data} viewCountry={viewCountry} />
    </>
  );
}
