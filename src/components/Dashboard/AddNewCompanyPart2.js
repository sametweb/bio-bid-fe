import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import {
  Box,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Button,
  TextField,
} from "@material-ui/core";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Divider } from "@material-ui/core";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";

import {
  GET_ONLY_SPECIALTIES,
  GET_ONLY_SUB_SPECIALTIES,
} from "../../data/queries";

function AddNewCompanyPart2({ company, setCompany, servicesData }) {
  const classes = useStyles();
  const [servForm, setServForm] = useState(false);
  const [specForm, setSpecForm] = useState("");
  const [subForm, setSubForm] = useState("");
  const [customSpecialty, setCustomSpecialty] = useState("");
  const [customSub, setCustomSub] = useState("");

  const { data: onlySpecialtiesData } = useQuery(GET_ONLY_SPECIALTIES);
  const { data: onlySubSpecialtiesData } = useQuery(GET_ONLY_SUB_SPECIALTIES);

  const toggleServForm = () => {
    setServForm(!servForm);
    setSpecForm("");
    setSubForm("");
  };
  const toggleSpecForm = (name) => {
    setServForm(false);
    setSpecForm(specForm === name ? "" : name);
    setSubForm("");
  };
  const toggleSubForm = (name) => {
    setServForm(false);
    setSpecForm("");
    setSubForm(subForm === name ? "" : name);
  };

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.serviceInput}>
        {servForm && (
          <FormControl
            variant="outlined"
            size="small"
            onClick={() => setSpecForm("")}
            style={{ width: "100%" }}
          >
            <InputLabel
              id="services-label"
              variant="outlined"
              style={{ backgroundColor: "white", padding: "0 5px" }}
            >
              Select Services
            </InputLabel>
            <Select
              labelId="services-label"
              name="services"
              multiple
              value={company.services.map(({ name }) => `${name}`)}
              onChange={(e) => {
                setCompany({
                  ...company,
                  services: e.target.value.map((name) => {
                    const existing = company.services.find(
                      (service) => service.name === name
                    );
                    return {
                      name,
                      specialties: existing ? existing.specialties : [],
                    };
                  }),
                });
              }}
              renderValue={(selected) => `${selected.length} selected`}
              MenuProps={{ PaperProps: { style: { maxHeight: 600 } } }}
            >
              {servicesData?.serviceItems.map(({ name }) => (
                <MenuItem key={name} value={name}>
                  <Checkbox
                    checked={company.services.map((s) => s.name).includes(name)}
                  />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <Button
          variant={servForm ? "contained" : undefined}
          color={servForm ? "primary" : undefined}
          onClick={toggleServForm}
        >
          {servForm ? "Done" : "Add Services"}
        </Button>
      </Box>
      {company.services.map((service) => {
        return (
          <List
            key={service.name}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader
                component="div"
                id="nested-list-subheader"
                className={classes.inputRow}
              >
                {specForm !== service.name ? ( //Replace service title with specialty form
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: 20,
                    }}
                  >
                    <AssignmentOutlinedIcon
                      style={{ fontSize: 20, color: "#333", marginRight: 8 }}
                    />
                    {service.name}
                  </Box>
                ) : (
                  <Box className={classes.inputRow}>
                    <FormControl
                      variant="outlined"
                      size="small"
                      className={classes.specialtyInput}
                    >
                      <InputLabel
                        id="specialties-label"
                        variant="outlined"
                        style={{ backgroundColor: "white", padding: "0 5px" }}
                      >
                        Select Specialties for {service.name}
                      </InputLabel>
                      <Select
                        labelId="specialties-label"
                        name="specialties"
                        multiple
                        value={company.services
                          .find(({ name }) => name === service.name)
                          .specialties.map(({ name }) => name)}
                        onChange={(e) => {
                          setCompany({
                            ...company,
                            services: company.services.map((serv) =>
                              serv.name === service.name
                                ? {
                                    ...serv,
                                    specialties: e.target.value.map((name) => {
                                      const existing = company.services
                                        .map((s) => s)
                                        .find((s) => s.name === service.name)
                                        .specialties.find(
                                          (s) => s.name === name
                                        );
                                      return {
                                        name,
                                        sub_specialties:
                                          existing?.sub_specialties || [],
                                      };
                                    }),
                                  }
                                : serv
                            ),
                          });
                        }}
                        renderValue={(selected) =>
                          `${selected.length} selected`
                        }
                        MenuProps={{
                          PaperProps: { style: { maxHeight: 600 } },
                        }}
                      >
                        {onlySpecialtiesData?.onlySpecialties.map(
                          ({ name }) => (
                            <MenuItem key={name} value={name}>
                              <Checkbox
                                checked={company.services
                                  .find(({ name }) => name === service.name)
                                  .specialties.map((s) => s.name)
                                  .includes(name)}
                              />
                              <ListItemText primary={name} />
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </FormControl>
                    <form
                      className={classes.specialtyInput}
                      style={{ marginTop: 8 }}
                      onSubmit={(e) => {
                        e.preventDefault();
                        console.log(e.target.customSpecialty.value);
                        setCompany({
                          ...company,
                          services: company.services.map((serv) =>
                            serv.name === service.name
                              ? {
                                  ...serv,
                                  specialties: [
                                    ...serv.specialties,
                                    {
                                      name: e.target.customSpecialty.value,
                                      sub_specialties: [],
                                    },
                                  ],
                                }
                              : serv
                          ),
                        });
                        setCustomSpecialty("");
                      }}
                    >
                      <TextField
                        name="customSpecialty"
                        variant="outlined"
                        size="small"
                        style={{ width: "100%" }}
                        label="Enter Custom Specialty"
                        value={customSpecialty}
                        onChange={(e) => setCustomSpecialty(e.target.value)}
                      />
                    </form>
                  </Box>
                )}
                <Button
                  onClick={() => toggleSpecForm(service.name)}
                  variant={specForm === service.name ? "contained" : undefined}
                  color={specForm === service.name ? "primary" : undefined}
                >
                  {specForm === service.name ? "Done" : "Add Specialty"}
                </Button>
              </ListSubheader>
            }
            className={classes.root}
          >
            {service.specialties.length > 0 &&
              service.specialties.map((spec) => {
                return (
                  <React.Fragment key={spec.name}>
                    <ListItem
                      button
                      onClick={() => setSubForm(spec.name + service.name)} // toggle open specialty to see subs
                    >
                      {subForm === spec.name + service.name ? (
                        // Sub specialty input
                        <Box className={classes.inputRow}>
                          <FormControl
                            variant="outlined"
                            size="small"
                            className={classes.specialtyInput}
                          >
                            <InputLabel
                              id="sub-specialties-label"
                              variant="outlined"
                              style={{
                                backgroundColor: "white",
                                padding: "0 5px",
                              }}
                            >
                              Select Sub-specialties for {spec.name}
                            </InputLabel>
                            <Select
                              labelId="sub-specialties-label"
                              name="sub-specialties"
                              multiple
                              value={company.services
                                .find(({ name }) => name === service.name)
                                .specialties.map((s) => s)
                                .find((s) => s.name === spec.name)
                                .sub_specialties.map(({ name }) => name)}
                              onChange={(e) => {
                                setCompany({
                                  ...company,
                                  services: company.services.map((serv) =>
                                    service.name === serv.name
                                      ? {
                                          ...serv,
                                          specialties: serv.specialties.map(
                                            (spe) =>
                                              spe.name === spec.name
                                                ? {
                                                    ...spe,
                                                    sub_specialties: e.target.value.map(
                                                      (name) => ({ name })
                                                    ),
                                                  }
                                                : spe
                                          ),
                                        }
                                      : serv
                                  ),
                                });
                              }}
                              renderValue={(selected) =>
                                `${selected.length} selected`
                              }
                              MenuProps={{
                                PaperProps: { style: { maxHeight: 600 } },
                              }}
                            >
                              {onlySubSpecialtiesData?.onlySubSpecialties.map(
                                ({ name }) => (
                                  <MenuItem key={name} value={name}>
                                    <Checkbox
                                      checked={company.services
                                        .map((s) => s)
                                        .find(
                                          ({ name }) => service.name === name
                                        )
                                        .specialties.map((s) => s)
                                        .find(({ name }) => name === spec.name)
                                        .sub_specialties.map((s) => s.name)
                                        .includes(name)}
                                    />
                                    <ListItemText primary={name} />
                                  </MenuItem>
                                )
                              )}
                            </Select>
                          </FormControl>
                          <form
                            className={classes.specialtyInput}
                            onSubmit={(e) => {
                              e.preventDefault();
                              setCompany({
                                ...company,
                                services: company.services.map((serv) =>
                                  serv.name === service.name
                                    ? {
                                        ...serv,
                                        specialties: serv.specialties.map(
                                          (spe) =>
                                            spe.name === spec.name
                                              ? {
                                                  ...spe,
                                                  sub_specialties: [
                                                    ...spe.sub_specialties,
                                                    {
                                                      name: customSub,
                                                    },
                                                  ],
                                                }
                                              : spe
                                        ),
                                      }
                                    : serv
                                ),
                              });
                              setCustomSub("");
                            }}
                          >
                            <TextField
                              name="customSub"
                              variant="outlined"
                              size="small"
                              style={{ width: "100%" }}
                              label="Enter Custom Sub-specialty"
                              value={customSub}
                              onChange={(e) => setCustomSub(e.target.value)}
                            />
                          </form>
                        </Box>
                      ) : (
                        <ListItemText primary={spec.name} />
                      )}
                      {subForm === spec.name + service.name ? (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSubForm(spec.name + service.name);
                          }}
                          variant="contained"
                          color="primary"
                        >
                          Done
                        </Button>
                      ) : (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSubForm(spec.name + service.name);
                          }}
                        >
                          Add Sub Specialty
                        </Button>
                      )}
                    </ListItem>

                    {spec.sub_specialties?.length > 0 &&
                      spec.sub_specialties.map((sub) => {
                        return (
                          <List key={sub.name} component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                              <ListItemText primary={sub.name} />
                            </ListItem>
                          </List>
                        );
                      })}
                  </React.Fragment>
                );
              })}
            <Divider />
          </List>
        );
      })}
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "100%",
    margin: "0 auto",
  },
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
    padding: theme.spacing(1, 0),
  },
  subName: {
    fontSize: "0.7rem",
  },
  serviceInput: {
    width: "100%",
    margin: theme.spacing(0, 0, 3, 0),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  inputRow: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  specialtyInput: {
    width: "50%",
    margin: theme.spacing(0, 2, 0, 0),
  },
}));

export default AddNewCompanyPart2;
