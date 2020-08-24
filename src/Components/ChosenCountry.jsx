import React from "react";
import ResultList from "./ResultList";

export default function ChosenCountry({ data }) {
  if (!data) return;

  return (
    <>
      <ResultList data={data} dataCountry />
    </>
  );
}
