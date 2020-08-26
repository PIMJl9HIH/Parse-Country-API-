import React from "react";
import classNames from "classnames";

import { ListGroup, Image } from "react-bootstrap";

const checkToSimpleValue = (arr) =>
  arr.every((item) => typeof item !== "object");

const isObjectArraySimple = (values) =>
  typeof values === "object" &&
  Array.isArray(values) &&
  checkToSimpleValue(values) &&
  values !== null;

const parseVal = (values) => {
  if (!values) return "-";
  let val;
  if (isObjectArraySimple(values)) {
    val = (
      <ListGroup as="ul" horizontal>
        {values.map((item, i) => (
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
          parseResult(item);
        }
      });
    } else {
      parseResult(values);
    }

    function parseResult(obj) {
      for (let key in obj) {
        let betterVisible =
          isObjectArraySimple(obj[key]) && obj[key].length > 0
            ? obj[key].join(", ")
            : obj[key];
        result += `<li class="list-group-item country-value-item" >${key} - ${betterVisible} </li>`;
      }
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

export default function ResultList({
  data,
  handlerChooseRegion,
  viewCountry,
  country,
  ...rest
}) {
  if (!data || !data.length) return false;

  const chooseClick = handlerChooseRegion
    ? handlerChooseRegion
    : viewCountry
    ? viewCountry
    : null;

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
