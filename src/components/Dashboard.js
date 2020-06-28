import React from "react";
import { useQuery } from "@apollo/client";

import {
  Container,
  Box,
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
} from "@material-ui/core";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import BusinessIcon from "@material-ui/icons/Business";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PublicIcon from "@material-ui/icons/Public";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";

import DashboardComponent from "./Dashboard/DashboardComponent";
import { PENDING_CLAIMS_COUNT } from "../data/queries";

function Dashboard(props) {
  const classes = useStyles();

  const { data: pendingClaimsCount } = useQuery(PENDING_CLAIMS_COUNT);

  return (
    <Container className={classes.container}>
      <Box className={classes.header}>
        <h2>Dashboard</h2>
      </Box>
      <Box className={classes.dashboard}>
        <Box className={classes.sidebar}>
          <List component="nav" className={classes.root} aria-label="contacts">
            <ListItem button onClick={() => props.history.push("#companies")}>
              <ListItemIcon className={classes.iconWrapper}>
                <BusinessIcon />
              </ListItemIcon>
              <ListItemText primary="Companies" />
            </ListItem>
            <ListItem
              button
              onClick={() => props.history.push("#pending-claims")}
            >
              <ListItemIcon className={classes.iconWrapper}>
                <Badge
                  color="secondary"
                  badgeContent={pendingClaimsCount?.count}
                >
                  <ContactMailIcon />
                </Badge>
              </ListItemIcon>
              <ListItemText primary={`Pending Claims`} />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => props.history.push("#services")}>
              <ListItemIcon className={classes.iconWrapper}>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary="Services" />
            </ListItem>
            <ListItem button onClick={() => props.history.push("#regions")}>
              <ListItemIcon className={classes.iconWrapper}>
                <PublicIcon />
              </ListItemIcon>
              <ListItemText primary="Regions" />
            </ListItem>
            <ListItem
              button
              onClick={() => props.history.push("#therapeutic-areas")}
            >
              <ListItemIcon className={classes.iconWrapper}>
                <LocalHospitalIcon />
              </ListItemIcon>
              <ListItemText primary="Therapeutic Areas" />
            </ListItem>
          </List>
        </Box>
        <Box className={classes.content}>
          <DashboardComponent />
        </Box>
      </Box>
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
      justifyContent: "flex-start",
      alignItems: "stretch",
      "& h2": {
        fontSize: "2rem",
        color: theme.palette.primary.main,
      },
    },
    dashboard: {
      display: "flex",
      justifyContent: "space-between",
    },
    sidebar: {
      width: 250,
      marginRight: theme.spacing(2),
    },
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #eee",
    },
    iconWrapper: {
      minWidth: 40,
    },
    content: {
      width: "100%",
      border: "1px solid #eee",
      backgroundColor: theme.palette.background.paper,
    },
  };
});

export default Dashboard;
