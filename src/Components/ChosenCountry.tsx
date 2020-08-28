import React from "react";
import ResultList from "./ResultList";

import { ICountry } from "../types";

type propsType = {
  data: ICountry[];
  dataCountry?: boolean;
};

const ChosenCountry = ({ data }: propsType) => {
  return (
    <>
      <ResultList data={data} dataCountry />
    </>
  );
};

export default ChosenCountry;
