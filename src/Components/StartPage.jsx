import React, { useContext } from "react";

import { REGIONS_NAME } from "../helpers/constants";
import { ThemeContext } from "../helpers/Context";
import ResultList from "./ResultList";

export default function StartPage() {
  const { handlerChooseRegion } = useContext(ThemeContext);
  return (
    <ResultList
      data={REGIONS_NAME}
      handlerChooseRegion={handlerChooseRegion}
      startpage
    />
  );
}
