import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import { makeStyles } from "@material-ui/core";
import { Container, Button, TextField, Box } from "@material-ui/core";
import Sort from "@material-ui/icons/Sort";

import { GET_COMPANIES } from "../data/queries";
import CompanyCard from "./CompanyCard";
import FilterDrawer from "./FilterDrawer";
import LoadingIndicator from "./custom/LoadingIndicator";

function Home() {
  const classes = useStyles();
  const { loading, data } = useQuery(GET_COMPANIES);
  const [open, setOpen] = useState(false);

  return (
    <Container className={classes.container}>
      <Box className={classes.header}>
        <h2>Service Providers</h2>
        <TextField
          label="Search in Companies"
          variant="outlined"
          color="primary"
          size="small"
          InputLabelProps={{ classes: { outlined: classes.searchInput } }}
          InputProps={{ classes: { input: classes.searchInput } }}
        />
        <Button
          color="primary"
          startIcon={<Sort />}
          variant={open ? "contained" : "outlined"}
          onClick={() => setOpen(!open)}
        >
          Filter
        </Button>
      </Box>
      <Box className={classes.companyList}>
        {loading ? (
          <LoadingIndicator />
        ) : (
          data.companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))
        )}
      </Box>
      <Box className={classes.footer}></Box>
      <FilterDrawer open={open} setOpen={setOpen} />
    </Container>
  );
}

const useStyles = makeStyles((theme) => {
  return {
    container: {
      minHeight: "100%",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "& h2": {
        fontSize: "2rem",
        color: theme.palette.primary.main,
      },
    },
    searchInput: {
      fontSize: 15,
    },
    companyList: {
      border: `1px solid #ddd`,
    },
    footer: {
      padding: theme.spacing(2),
    },
  };
});

export default Home;
