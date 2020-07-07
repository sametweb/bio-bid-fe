import React from "react";
import {
  makeStyles,
  Box,
  Button,
  Divider,
  IconButton,
} from "@material-ui/core";
import { GET_PENDING_CLAIMS } from "../../data/queries";
import { useQuery } from "@apollo/client";
import LoadingIndicator from "../custom/LoadingIndicator";
import { FormatDate } from "../../helpers/formatDate";
import CheckIcon from "@material-ui/icons/Check";
import BlockIcon from "@material-ui/icons/Block";

function PendingClaims(props) {
  const classes = useStyles();

  const { loading, data } = useQuery(GET_PENDING_CLAIMS);

  return (
    <Box className={classes.content}>
      <Box className={classes.header}>
        <h2>Pending Claims</h2>
      </Box>
      <Box>
        {loading ? (
          <LoadingIndicator />
        ) : (
          data.pendingClaims.map((claim) => {
            return (
              <React.Fragment key={claim.id}>
                <Divider />
                <Box className={classes.claim}>
                  <Box className={classes.company}>
                    <img
                      src={claim.company.logoURL}
                      className={classes.logo}
                      alt={claim.company.name}
                    />
                    <Box className={classes.info}>
                      <h3>{claim.company.name}</h3>
                      <p>
                        Requested by {claim.user} ({claim.email})
                      </p>
                      <p>{new FormatDate(claim.createdAt).dateTime}</p>
                    </Box>
                  </Box>
                  <Box>
                    <IconButton edge="end" aria-label="edit" color="primary">
                      <CheckIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="edit" color="secondary">
                      <BlockIcon />
                    </IconButton>
                  </Box>
                </Box>
              </React.Fragment>
            );
          })
        )}
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(0, 2),
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  company: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  logo: {
    width: 120,
  },
  claim: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(1, 3, 1),
  },
  info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    "& h3": {
      margin: 0,
    },
    "& p": {
      margin: theme.spacing(0.5, 0),
    },
  },
}));

export default PendingClaims;
