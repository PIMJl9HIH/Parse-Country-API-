import React from "react";
import classNames from "classnames";

import { ListGroup, Image } from "react-bootstrap";

import { SimpleTypes } from "../types";

interface IMap {
  item: SimpleTypes;
  i?: number;
}

const checkToSimpleValue = (arr: any[]) =>
  arr.every((item) => typeof item !== "object");

const isObjectArraySimple = (values: any) =>
  typeof values === "object" &&
  Array.isArray(values) &&
  checkToSimpleValue(values) &&
  values !== null;

function parseResult(obj: any, res: string) {
  for (let key in obj) {
    let betterVisible =
      isObjectArraySimple(obj[key]) && obj[key].length > 0
        ? obj[key].join(", ")
        : obj[key];
    res += `<li class="list-group-item country-value-item" >${key} - ${betterVisible} </li>`;
  }

  return res;
}

const parseVal = (values: any) => {
  if (!values) return "-";
  let val;
  if (isObjectArraySimple(values)) {
    val = (
      <ListGroup as="ul" horizontal>
        {values.map((item: IMap, i: IMap) => (
          <ListGroup.Item
            as="li"
            key={`${item}-${i}`}
            style={{ padding: "3px 8px" }}
          >
            {item}
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  } else if (typeof values === "object" && values !== null) {
    let result = "";
    if (Array.isArray(values)) {
      // eslint-disable-next-line
      values.map((item) => {
        if (typeof item === "object" && item !== null) {
          result = parseResult(item, result);
        }
      });
    } else {
      result = parseResult(values, result);
    }

    val = (
      <ul
        className="nested-list list-group"
        dangerouslySetInnerHTML={{ __html: result }}
      />
    );

    // simple way
    // val = JSON.stringify(values);
  } else {
    let parseImg = values.toString().includes("http") ? (
      <Image src={values} />
    ) : (
      <span className="similar-list-item">{values}</span>
    );
    val = parseImg;
  }
  return val;
};

interface IResultList {
  data: any[];
  handlerChooseRegion?: () => Promise<void>;
  viewCountry?: () => void;
  country?: string;
  dataCountry?: boolean;
  startpage?: boolean;
  rest?: any[];
}

export default function ResultList({
  data,
  handlerChooseRegion,
  viewCountry,
  country,
  ...rest
}: IResultList): React.ReactElement | null {
  // if (!data || !data.length) return false;

  let chooseClick;
  if (handlerChooseRegion) chooseClick = handlerChooseRegion;
  if (viewCountry) chooseClick = viewCountry;

  const classes = classNames("text-left", { ...rest });

  const countryInfo = () => {
    return Object.entries(data[0]).map(([key, values], i) => {
      return (
        <div className="country" key={`${key}-${i}`}>
          <div className="country-key">{key}</div>{" "}
          <div className="country-value">{parseVal(values)}</div>
        </div>
      );
    });
  };

  const renderItem = data.map((item, i) => {
    const parseItem = rest && rest.startpage ? item : item.name;
    return (
      <ListGroup.Item as="li" action key={`${parseItem}-${i}`}>
        {parseItem}
      </ListGroup.Item>
    );
  });

  const chooseRender =
    rest && rest.dataCountry ? (
      <div>{countryInfo()}</div>
    ) : (
      <ListGroup as="ul" onClick={chooseClick} className={classes}>
        {renderItem}
      </ListGroup>
    );

  return chooseRender;
}
