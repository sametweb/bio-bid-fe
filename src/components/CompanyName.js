import React from "react";
import { Link } from "react-router-dom";

import { makeStyles, Box } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

import Tooltip from "./custom/Tooltip";

function CompanyName({ company, isLink, tag = "h2" }) {
  const classes = useStyles();
  const CustomTag = `${tag}`;

  return (
    <Box className={classes.companyName}>
      {isLink ? (
        <Link to={`/service-provider/${company?.id}`}>
          <CustomTag>{company?.name}</CustomTag>
        </Link>
      ) : (
        <CustomTag>{company?.name}</CustomTag>
      )}
      {company?.maintainer && (
        <Tooltip
          title={`This company is claimed by ${company?.maintainer}.`}
          placement="top"
        >
          <VerifiedUserIcon className={classes.verifiedIcon} />
        </Tooltip>
      )}
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  companyName: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    "& h2": {
      fontSize: "1.6rem",
      margin: theme.spacing(0),
    },
    "& h3": {
      fontSize: "1.4rem",
      margin: 0,
    },
    "& a:hover": {
      textDecoration: "underline",
    },
  },
  verifiedIcon: {
    fontSize: 17,
    color: theme.palette.secondary.main,
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(0.3),
  },
}));

export default CompanyName;
