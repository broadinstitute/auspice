import React from "react";
import styled from 'styled-components';
import NavBar from "../navBar";
import Flex from "../../components/framework/flex";
import { logos } from "./logos";
import { CenterContent } from "./centerContent";


const getNumColumns = (width) => width > 1000 ? 3 : width > 750 ? 2 : 1;

const ColumnList = styled.ul`
  -moz-column-count: ${(props) => getNumColumns(props.width)};
  -moz-column-gap: 20px;
  -webkit-column-count: ${(props) => getNumColumns(props.width)};
  -webkit-column-gap: 20px;
  column-count: ${(props) => getNumColumns(props.width)};
  column-gap: 20px;
`;

const formatDataset = (requestPath, dispatch, changePage) => {
  return (
    <li style={{"list-style-type": "none"}} key={requestPath}>
      <div
        style={{color: "#5097BA", textDecoration: "none", cursor: "pointer", fontWeight: "400", fontSize: "94%"}}
        onClick={() => dispatch(changePage({path: requestPath, push: true}))}
      >
        {requestPath}
      </div>
    </li>
  );
};

const SplashContent = ({available, browserDimensions, dispatch, errorMessage, changePage}) => {

  const Header = () => (
    <>
      <Flex justifyContent="center">
        <img
          style={{marginTop:"-10px"}}
          alt="logo"
          height="95"
          src={
            require("../../images/broad-logo-full.svg") // eslint-disable-line global-require
          }
        />
        <div style={{paddingLeft: "40px"}}>
          <h1 style={{textAlign: "center", marginTop: "30px", marginLeft: "20px", fontSize: "50px", letterSpacing: "0.8rem"}}>
            {"SARS-CoV-2"}
          </h1>
          <h1 style={{textAlign: "center", marginTop: "0px", fontSize: "29px"}}>
            {"interactive visualisations"}
          </h1>
        </div>
        
      </Flex>
    </>
  );

  const Intro = () => (
    <p style={{maxWidth: 600, marginTop: 0, marginRight: "auto", marginBottom: 20, marginLeft: "auto", textAlign: "center", fontSize: 16, fontWeight: 300, lineHeight: 1.42857143}}>

        Built using <a href="https://nextstrain.github.io/auspice/">Auspice</a>,
        a tool from the <a href="http://www.fredhutch.org/">Fred Hutch</a> and the <a href="https://bedford.io/">Bedford Lab</a>.

    </p>
  );

  const ErrorMessage = () => (
    <CenterContent>
      <div>
        <p style={{color: "rgb(222, 60, 38)", fontWeight: 600, fontSize: "24px"}}>
          {"😱 404, or an error has occured 😱"}
        </p>
        <p style={{color: "rgb(222, 60, 38)", fontWeight: 400, fontSize: "18px"}}>
          {`Details: ${errorMessage}`}
        </p>
        <p style={{fontSize: "16px"}}>
          {"If this keeps happening, or you believe this is a bug, please "}
          <a href={"mailto:hello@nextstrain.org"}>{"get in contact with us."}</a>
        </p>
      </div>
    </CenterContent>
  );

  const ListAvailable = ({type, data}) => (
    <>
      <div style={{fontSize: "26px"}}>
        {`${type}:`}
      </div>
      {
        data ? (
          <div style={{display: "flex", flexWrap: "wrap"}}>
            <div style={{flex: "1 50%", minWidth: "0"}}>
              <ColumnList width={browserDimensions.width}>
                {data.map((d) => formatDataset(d.request, dispatch, changePage))}
              </ColumnList>
            </div>
          </div>
        ) : (
          <p>
            none found
          </p>
        )
      }
    </>
  );

  const Footer = () => (
    <CenterContent>
      {logos}
    </CenterContent>
  );

  return (
    <>
      <NavBar sidebar={false}/>
      <div className="static container">
        <Header/>
        <ListAvailable type="Datasets" data={available.datasets}/>
        <ListAvailable type="Narratives" data={available.narratives}/>
        {errorMessage ? <ErrorMessage/> : <Intro/>}
      </div>
    </>
  );
};

export default SplashContent;
