import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import { Divider } from "@material-ui/core";

function Services({ services }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState("");

  return (
    <>
      <h2>Services</h2>
      {services.map((service) => {
        return (
          <List
            key={service.id}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <React.Fragment>
                <ListSubheader
                  className={classes.serviceName}
                  component="div"
                  id="nested-list-subheader"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <AssignmentOutlinedIcon
                    style={{ fontSize: 20, color: "#333", marginRight: 8 }}
                  />
                  {service.name}
                </ListSubheader>
              </React.Fragment>
            }
            className={classes.root}
          >
            {service.specialties.length > 0 &&
              service.specialties.map((spec) => {
                return (
                  <React.Fragment key={spec.id}>
                    <ListItem
                      button
                      onClick={() => setOpen(open !== spec.id ? spec.id : "")}
                      className={open === spec.id ? classes.active : ""}
                    >
                      <ListItemText primary={spec.name} />
                      {spec.sub_specialties.length === 0 ? (
                        ""
                      ) : open === spec.id ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </ListItem>

                    {spec.sub_specialties.length > 0 &&
                      spec.sub_specialties.map((sub) => {
                        return (
                          <Collapse
                            key={sub.id}
                            in={open === spec.id}
                            timeout="auto"
                            unmountOnExit
                          >
                            <List component="div" disablePadding>
                              <ListItem button className={classes.nested}>
                                <ListItemText primary={sub.name} />
                              </ListItem>
                            </List>
                          </Collapse>
                        );
                      })}
                  </React.Fragment>
                );
              })}
            <Divider />
          </List>
        );
      })}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "#fcfcfc",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  serviceName: {
    fontSize: "1.1rem",
    color: "black",
  },
  subName: {
    fontSize: "0.7rem",
  },
  active: {
    background: "#eee",
  },
}));

export default Services;
