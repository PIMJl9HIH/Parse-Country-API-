import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

import { ThemeContext } from "./helpers/Context";
import { GET_REGION } from "./helpers/api";

import StartPage from "./Components/StartPage";
import ChosenRegion from "./Components/ChosenRegion";
import ChosenCountry from "./Components/ChosenCountry";
import Breadcrumbs from "./Components/Breadcrumb";

function App() {
  const [data, setData] = useState({});
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");

  const [breadcumbs, setBreadcrumbs] = useState(["Mainpage"]);

  const [filteredResult, setFilteredResult] = useState([]);

  async function handlerChooseRegion(e) {
    const region = e.target.innerText;
    setRegion(region);
    try {
      const response = await GET_REGION(region);
      setData(response.data);
      setBreadcrumbs((breadcumbs) => [...breadcumbs, region]);
    } catch (error) {
      console.error(error);
    }
  }

  function updateBreadcrumbs(e) {
    const parentIndex = e.target.closest("li").getAttribute("data-index");
    const sliced = breadcumbs.slice(0, parentIndex);

    switch (+parentIndex) {
      case 1: {
        setRegion("");
        setCountry("");
        break;
      }
      case 2: {
        setCountry("");
        break;
      }
    }

    setBreadcrumbs(sliced);
  }

  function viewCountry(e) {
    const country = e.target.innerText;
    const result = data.filter((item) => item.name === country);

    setCountry(country);
    setBreadcrumbs((breadcumbs) => [...breadcumbs, country]);

    setFilteredResult(result);
  }

  const contextScheme = {
    handlerChooseRegion,
    viewCountry,
  };

  const viewResults = () => {
    if (country && filteredResult && region && data) {
      return <ChosenCountry data={filteredResult} />;
    } else if (region && data) {
      return <ChosenRegion data={data} />;
    } else {
      return <StartPage />;
    }
  };

  const titleText = country
    ? `Chosen country is: ${country}`
    : region
    ? `Chosen region is: ${region}`
    : "Choose region";

  return (
    <ThemeContext.Provider value={contextScheme}>
      <div className="App">
        <Container fluid>
          <Row>
            <Col>
              <Breadcrumbs
                breadcumbs={breadcumbs}
                setBreadcrumbs={setBreadcrumbs}
                updateBreadcrumbs={updateBreadcrumbs}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h1 className="title">{titleText}</h1>
            </Col>
          </Row>

          <Row>
            <Col>{viewResults()}</Col>
          </Row>
        </Container>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
