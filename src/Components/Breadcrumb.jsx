import React from "react";

import Breadcrumb from "react-bootstrap/Breadcrumb";

export default function Breadcrumbs({
  breadcumbs,
  setBreadcrumbs,
  updateBreadcrumbs,
}) {
  // console.log("breadcumbs", breadcumbs);
  const renderBreadcrumb = breadcumbs.map((item, index) => (
    <Breadcrumb.Item
      as="li"
      key={`item-${Math.random()}`}
      data-index={index + 1}
    >
      {item}
    </Breadcrumb.Item>
  ));
  return (
    <Breadcrumb as="ul" onClick={updateBreadcrumbs}>
      {renderBreadcrumb}
    </Breadcrumb>
  );
}
