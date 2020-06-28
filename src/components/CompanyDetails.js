import React from "react";
import { useQuery } from "@apollo/client";

import {
  Container,
  Box,
  makeStyles,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import BusinessIcon from "@material-ui/icons/Business";
import CommentIcon from "@material-ui/icons/Comment";
import ListAltIcon from "@material-ui/icons/ListAlt";

import { GET_COMPANY_BY_ID } from "../data/queries";
import LoadingIndicator from "./custom/LoadingIndicator";
import CompanyName from "./CompanyName";
import Overview from "./Overview";
import Services from "./Services";

function CompanyDetails(props) {
  const classes = useStyles();
  const { id } = props.match.params;
  const { hash } = props.location;

  const { loading, data } = useQuery(GET_COMPANY_BY_ID, {
    variables: { id },
    notifyOnNetworkStatusChange: true,
  });

  return (
    <Container className={classes.container}>
      <Box className={classes.header}>
        <img
          src={data?.company.logoURL}
          alt={data?.company.name}
          className={classes.logo}
        />
        <Box className={classes.info}>
          <CompanyName company={data?.company} tag="h2" />
          <h4>{data?.company.headquarters}</h4>
          <Box className={classes.links}>
            {data?.company.website && (
              <Link href={data?.company.website} target="_blank">
                Website
              </Link>
            )}
            {data?.company.linkedin && (
              <Link href={data?.company.linkedin} target="_blank">
                LinkedIn Page
              </Link>
            )}
            {data?.company.email && (
              <Link href={`mailto:${data?.company.email}`} target="_blank">
                Contact
              </Link>
            )}
          </Box>
        </Box>
      </Box>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <Box className={classes.companyDetails}>
          <Box className={classes.sidebar}>
            <List
              component="nav"
              aria-label="main mailbox folders"
              className={classes.nav}
            >
              <ListItem
                button
                onClick={() => props.history.push("#company-details")}
                className={hash === "#company-details" ? classes.active : ""}
              >
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary="Company Details" />
              </ListItem>
              <Divider />
              <ListItem
                button
                onClick={() => props.history.push("#services")}
                className={hash === "#services" ? classes.active : ""}
              >
                <ListItemIcon>
                  <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="Offered Services" />
              </ListItem>
              <Divider />
              <ListItem
                button
                onClick={() => props.history.push("#reviews")}
                className={hash === "#reviews" ? classes.active : ""}
              >
                <ListItemIcon>
                  <CommentIcon />
                </ListItemIcon>
                <ListItemText primary="Reviews" />
              </ListItem>
            </List>
          </Box>
          <Box className={classes.content}>
            {(hash === "#company-details" || !hash) && (
              <Overview company={data?.company} />
            )}
            {hash === "#services" && (
              <Services services={data?.company.services} />
            )}
            {hash === "#reviews" && "Reviews"}
          </Box>
        </Box>
      )}
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
      margin: theme.spacing(3, 0, 3, 0),
    },
    logo: {
      objectFit: "contain",
      width: 120,
      height: 120,
      border: "1px solid #ddd",
      boxShadow: "#dedede 0 0 5px",
      margin: theme.spacing(0, 2, 0, 0),
    },
    info: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
      justifyContent: "flex-start",
      margin: theme.spacing(0, 0, 0.5, 0),
      "& h4": {
        margin: theme.spacing(0, 0, 1, 0),
      },
    },
    links: {
      marginTop: "auto",

      "& a": {
        fontSize: "0.8rem",
        fontWeight: 500,
        border: `1px solid #ddd`,
        boxShadow: `#eee 0 0 3px`,
        background:
          "rgb(238,238,238) linear-gradient(360deg, rgba(238,238,238,1) 0%, rgba(252,252,252,1) 58%, rgba(255,255,255,1) 100%)",
        borderRadius: theme.spacing(0.3),
        padding: theme.spacing(0.2, 1.5, 0.5),
        margin: theme.spacing(0, 1, 0, 0),
        "&:hover": {
          border: `1px solid #ccc`,
        },
      },
    },
    companyDetails: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    sidebar: {
      width: "24%",
      border: `1px solid #ddd`,
    },
    nav: {
      padding: 0,
    },
    active: {
      backgroundColor: "#eee",
    },
    content: {
      width: "74%",
      border: `1px solid #ddd`,
      backgroundColor: "white",
      padding: theme.spacing(2),
    },
  };
});

export default CompanyDetails;
