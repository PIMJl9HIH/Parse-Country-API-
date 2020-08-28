import React from "react";

import Breadcrumb from "react-bootstrap/Breadcrumb";

type TypeBreadcrumbs = {
  breadcumbs: string[];
  updateBreadcrumbs: any;
};

export default function Breadcrumbs({
  breadcumbs,
  updateBreadcrumbs,
}: TypeBreadcrumbs) {
  const renderBreadcrumb = breadcumbs.map((item: string, index: number) => (
    <Breadcrumb.Item
      as="li"
      key={`item-${Math.random()}`}
      data-index={index + 1}
    >
      {item}
    </Breadcrumb.Item>
  ));
  return (
    <Breadcrumb as="ul" className="breadcrumb-wrap" onClick={updateBreadcrumbs}>
      {renderBreadcrumb}
    </Breadcrumb>
  );
}
