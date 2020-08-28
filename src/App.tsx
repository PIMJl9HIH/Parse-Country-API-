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
import Loading from "./Components/Loading";

import ErrorBoundary from "./Containers/Error";

type stringType = string;

function App() {
  const [data, setData] = useState<any[]>([]);
  const [region, setRegion] = useState<stringType>("");
  const [country, setCountry] = useState<stringType>("");
  const [breadcumbs, setBreadcrumbs] = useState(["Mainpage"]);
  const [filteredResult, setFilteredResult] = useState<any[]>([]);
  const [sorting, setSorting] = useState<stringType>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handlerChooseRegion(e: React.MouseEvent<HTMLUListElement>) {
    const region = (e.target as HTMLElement).innerText;
    setRegion(region);
    setLoading(true);
    try {
      const response = await GET_REGION(region);
      setData(response.data);
      setBreadcrumbs((breadcumbs) => [...breadcumbs, region]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function updateBreadcrumbs(e: React.MouseEvent) {
    const getLiElement = (e.target as Element).closest("li");
    if (getLiElement !== null) {
      const parentIndex: string | null = getLiElement.getAttribute(
        "data-index"
      );

      if (parentIndex !== null) {
        const sliced = breadcumbs.slice(0, +parentIndex);

        switch (+parentIndex) {
          case 1: {
            setRegion("");
            setCountry("");
            setFilteredResult([]);
            setData([]);
            break;
          }
          case 2: {
            setCountry("");
            setFilteredResult([]);
            break;
          }
          default:
            return;
        }

        setBreadcrumbs(sliced);
      }
    }
  }

  function viewCountry(e: React.MouseEvent<HTMLUListElement>): void {
    const country = (e.target as HTMLElement).innerText;
    const result = data.filter((item) => item.name === country);
    setCountry(country);
    setBreadcrumbs((breadcumbs) => [...breadcumbs, country]);
    setFilteredResult(result);
  }

  type TCountry = {
    target: {
      name: string;
    };
  };

  function sortingCountry({ target: { name } }: TCountry) {
    const orderSort = (a: any, b: any) => {
      if (sorting === name) {
        setSorting("");
        return a[name] > b[name] ? 1 : -1;
      } else {
        return a[name] > b[name] ? -1 : 1;
      }
    };
    setSorting(name);
    const sortedData = [...data].sort((a: Object, b: Object) =>
      orderSort(a, b)
    );
    setData(sortedData);
  }

  const contextScheme = {
    handlerChooseRegion,
    viewCountry,
    sortingCountry,
    sorting,
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
        <ErrorBoundary>
          <Container fluid>
            <Row>
              <Col>
                <Breadcrumbs
                  breadcumbs={breadcumbs}
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
              <Col>
                <div className="result-block">
                  {loading ? <Loading /> : viewResults()}
                </div>
              </Col>
            </Row>
          </Container>
        </ErrorBoundary>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
