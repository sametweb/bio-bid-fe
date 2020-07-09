import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import CompanyDetails from "./components/CompanyDetails";
import Dashboard from "./components/Dashboard";

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          companies: {
            merge(_ignored, incoming) {
              return incoming;
            },
          },
          serviceItems: {
            merge(_ignored, incoming) {
              return incoming;
            },
          },
          regions: {
            merge(_ignored, incoming) {
              return incoming;
            },
          },
          therapeutics: {
            merge(_ignored, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  uri: "https://biobid.herokuapp.com/",
  // uri: "http://localhost:5000",
});

const theme = createMuiTheme({
  palette: {
    primary: { main: "#0050B3" },
    secondary: { main: "#dc004e" },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontWeightBold: 700,
    fontWeightMedium: 600,
    fontWeightRegular: 400,
    fontWeightLight: 300,
    fontFamily: "Segoe UI",
  },
});

function App() {
  return (
    <React.Fragment>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Header />
            <Route path="/" exact component={Home} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/service-provider/:id" component={CompanyDetails} />
            <Footer />
          </Router>
        </ThemeProvider>
      </ApolloProvider>
    </React.Fragment>
  );
}

export default App;
