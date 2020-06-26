import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LanguageIcon from "@material-ui/icons/Language";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { Box } from "@material-ui/core";

import CompanyName from "./CompanyName";

function CompanyCard({ company }) {
  const classes = useStyles();

  return (
    <Box className={classes.company}>
      <img src={company.logoURL} alt="Logo" />
      <Box className={classes.companyDetails}>
        <CompanyName company={company} isLink tag="h3" />
        <Box className={classes.icons}>
          {company.website && (
            <a href={company.website} target="_blank" rel="noopener noreferrer">
              <LanguageIcon className={classes.profileIcon} />
            </a>
          )}
          {company.linkedin && (
            <a
              href={company.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon className={classes.profileIcon} />
            </a>
          )}
          {company.email && (
            <a
              href={`mailto:${company.email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MailOutlineIcon className={classes.profileIcon} />
            </a>
          )}
        </Box>
        <Box component="p" className={classes.overview}>
          {company.overview}
        </Box>
        <Box component="p" className={classes.services}>
          <b>Offered Services:</b>{" "}
          {company.services.length < 3 ? (
            <>{company.services.map(({ name }) => name).join(" and ")}</>
          ) : (
            <>
              {company.services[0].name}, {company.services[1].name}, and{" "}
              <Link to="/">{company.services.length - 2} more</Link>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => {
  return {
    company: {
      padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
      "& img": {
        width: 180,
        marginRight: theme.spacing(1),
      },
      borderBottom: `1px solid #ddd`,
      "&:last-child": {
        borderBottom: "none",
      },
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      "& a": {
        color: "black",
        textDecoration: "none",
      },
    },
    companyDetails: {},
    icons: {
      display: "flex",
      paddingTop: theme.spacing(1),
    },
    profileIcon: {},
    overview: {},
    services: {
      "& a": {
        fontStyle: "italic",
        textDecoration: "underline dotted",
        fontWeight: 600,
      },
    },
  };
});

export default CompanyCard;
