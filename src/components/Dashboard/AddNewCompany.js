import React, { useState } from "react";
import {
  Box,
  makeStyles,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormLabel,
  FormGroup,
  ListItemText,
} from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Tooltip from "../custom/Tooltip";
import { companySize } from "../../helpers/companySize";
import {
  GET_SERVICES,
  GET_REGIONS,
  GET_THERAPEUTICS,
} from "../../data/queries";
import { useQuery } from "@apollo/client";

function AddNewCompany(props) {
  const classes = useStyles();
  const [company, setCompany] = useState({
    name: "",
    email: "",
    phases: [],
    logoURL: "",
    website: "",
    linkedin: "",
    overview: "",
    headquarters: "",
    companySize: "",
    services: [],
    regions: [],
    therapeutics: [],
  });

  const { data: servicesData } = useQuery(GET_SERVICES);
  const { data: regionsData } = useQuery(GET_REGIONS);
  const { data: therapeuticsData } = useQuery(GET_THERAPEUTICS);

  const sizes = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
  const sizeItems = sizes.map((size) => (
    <MenuItem key={size} value={size}>
      {companySize(size)}
    </MenuItem>
  ));

  const handleChange = (e) =>
    setCompany({ ...company, [e.target.name]: e.target.value });

  const handlePhaseChange = (e) =>
    setCompany({
      ...company,
      phases: company.phases.includes(e.target.value)
        ? company.phases.filter((phase) => phase !== e.target.value)
        : [...company.phases, e.target.value],
    });

  console.log(company.regions, company.therapeutics);

  return (
    <Box className={classes.content}>
      <Box className={classes.header}>
        <h2>Add New Company</h2>
      </Box>
      <Box>
        <form>
          <Box className={classes.row}>
            <TextField
              value={company.name}
              onChange={handleChange}
              className={classes.input}
              variant="outlined"
              label="Company Name"
              size="small"
              name="name"
            />
            <Tooltip
              title="Please enter a unique name for your company"
              placement="right"
            >
              <InfoOutlinedIcon className={classes.infoIcon} />
            </Tooltip>
          </Box>
          <Box className={classes.row}>
            <TextField
              value={company.overview}
              onChange={handleChange}
              className={classes.input}
              variant="outlined"
              label="Company Overview"
              size="small"
              name="overview"
              multiline
              rows={2}
              rowsMax={10}
            />
            <Tooltip
              title="While there is no character limit for company overview, keeping it around 1-2 paragraphs is recommended."
              placement="right"
            >
              <InfoOutlinedIcon className={classes.infoIcon} />
            </Tooltip>
          </Box>
          <Box className={classes.row}>
            <TextField
              value={company.email}
              onChange={handleChange}
              className={classes.input}
              variant="outlined"
              label="Contact Email"
              size="small"
              name="email"
              type="email"
            />
            <Tooltip
              title="Please enter a company email address."
              placement="right"
            >
              <InfoOutlinedIcon className={classes.infoIcon} />
            </Tooltip>
          </Box>
          <Box className={classes.row}>
            <TextField
              value={company.headquarters}
              onChange={handleChange}
              className={classes.input}
              variant="outlined"
              label="Headquarters"
              size="small"
              name="headquarters"
            />
            <Tooltip
              title="Please enter the location where the company headquarters is located."
              placement="right"
            >
              <InfoOutlinedIcon className={classes.infoIcon} />
            </Tooltip>
          </Box>
          <Box className={classes.row}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
            >
              <InputLabel
                style={{
                  backgroundColor: "white",
                  padding: "0 5px",
                }}
              >
                Company Size
              </InputLabel>
              <Select
                labelId="company-size"
                id="company-size"
                value={company.companySize}
                name="companySize"
                onChange={handleChange}
              >
                <MenuItem aria-label="None" value="" />
                {sizeItems}
              </Select>
            </FormControl>
            <Tooltip
              title="Please select the size of company."
              placement="right"
            >
              <InfoOutlinedIcon className={classes.infoIcon} />
            </Tooltip>
          </Box>
          <Box className={classes.row}>
            <TextField
              value={company.website}
              onChange={handleChange}
              className={classes.input}
              variant="outlined"
              label="Website"
              size="small"
              name="website"
            />
            <Tooltip
              title="Please enter company's official website."
              placement="right"
            >
              <InfoOutlinedIcon className={classes.infoIcon} />
            </Tooltip>
          </Box>
          <Box className={classes.row}>
            <TextField
              value={company.linkedin}
              onChange={handleChange}
              className={classes.input}
              variant="outlined"
              label="LinkedIn Company Page URL"
              size="small"
              name="linkedin"
            />
            <Tooltip
              title="Please enter the company's LinkedIn page URL."
              placement="right"
            >
              <InfoOutlinedIcon className={classes.infoIcon} />
            </Tooltip>
          </Box>{" "}
          <Box className={classes.row}>
            <TextField
              value={company.logoURL}
              onChange={handleChange}
              className={classes.input}
              variant="outlined"
              label="Logo URL"
              size="small"
              name="logoURL"
            />
            <Tooltip
              title="Please enter a URL for company logo. Any image format (JPG, PNG, GIF) is accepted."
              placement="right"
            >
              <InfoOutlinedIcon className={classes.infoIcon} />
            </Tooltip>
          </Box>
          <Box className={classes.row}>
            <FormControl component="fieldset" className={classes.input}>
              <FormLabel component="legend">Offered Phases</FormLabel>
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={company.phases.includes("I")}
                      //   onChange={handleChange}
                      name="I"
                      color="primary"
                      onChange={handlePhaseChange}
                    />
                  }
                  label="I"
                  value="I"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={company.phases.includes("II")}
                      //   onChange={handleChange}
                      name="II"
                      color="primary"
                      onChange={handlePhaseChange}
                    />
                  }
                  label="II"
                  value="II"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={company.phases.includes("III")}
                      //   onChange={handleChange}
                      name="III"
                      color="primary"
                      onChange={handlePhaseChange}
                    />
                  }
                  label="III"
                  value="III"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={company.phases.includes("IV")}
                      //   onChange={handleChange}
                      name="IV"
                      color="primary"
                      onChange={handlePhaseChange}
                    />
                  }
                  label="IV"
                  value="IV"
                />
              </FormGroup>
            </FormControl>
            <Tooltip
              title="Please select all the phases company is offering services in."
              placement="right"
            >
              <InfoOutlinedIcon className={classes.infoIcon} />
            </Tooltip>
          </Box>
          <Box className={classes.row}>
            <FormControl
              className={classes.input}
              variant="outlined"
              size="small"
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
                value={company.services}
                onChange={(e) =>
                  setCompany({ ...company, services: e.target.value })
                }
                renderValue={(selected) => `${selected.length} selected`}
                MenuProps={{ PaperProps: { style: { maxHeight: 600 } } }}
              >
                {servicesData?.serviceItems.map(({ name: service }) => (
                  <MenuItem key={service} value={service}>
                    <Checkbox checked={company.services.includes(service)} />
                    <ListItemText primary={service} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Tooltip
              title="Please select all the services company is offering."
              placement="right"
            >
              <InfoOutlinedIcon className={classes.infoIcon} />
            </Tooltip>
            <Box>{company.services.join(", ")}</Box>
          </Box>
          <Box className={classes.row}>
            <FormControl
              className={classes.input}
              variant="outlined"
              size="small"
            >
              <InputLabel
                id="regions-label"
                variant="outlined"
                style={{ backgroundColor: "white", padding: "0 5px" }}
              >
                Select Regions
              </InputLabel>
              <Select
                labelId="regions-label"
                name="regions"
                multiple
                value={company.regions}
                onChange={(e) =>
                  setCompany({ ...company, regions: e.target.value })
                }
                renderValue={(selected) => `${selected.length} selected`}
                MenuProps={{ PaperProps: { style: { maxHeight: 600 } } }}
              >
                {regionsData?.regions.map(({ name: region }) => (
                  <MenuItem key={region} value={region}>
                    <Checkbox checked={company.regions.includes(region)} />
                    <ListItemText primary={region} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Tooltip
              title="Please select all the regions company is offering services in."
              placement="right"
            >
              <InfoOutlinedIcon className={classes.infoIcon} />
            </Tooltip>
            <Box>{company.regions.join(", ")}</Box>
          </Box>
          <Box className={classes.row}>
            <FormControl
              className={classes.input}
              variant="outlined"
              size="small"
            >
              <InputLabel
                id="therapeutics-label"
                variant="outlined"
                style={{ backgroundColor: "white", padding: "0 5px" }}
              >
                Select Therapeutic Areas
              </InputLabel>
              <Select
                labelId="therapeutics-label"
                name="therapeutics"
                multiple
                value={company.therapeutics}
                onChange={(e) =>
                  setCompany({ ...company, therapeutics: e.target.value })
                }
                renderValue={(selected) => `${selected.length} selected`}
                MenuProps={{ PaperProps: { style: { maxHeight: 600 } } }}
              >
                {therapeuticsData?.therapeutics.map(({ name: therapeutic }) => (
                  <MenuItem key={therapeutic} value={therapeutic}>
                    <Checkbox
                      checked={company.therapeutics.includes(therapeutic)}
                    />
                    <ListItemText primary={therapeutic} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Tooltip
              title="Please select all the therapeutic areas company is offering services in."
              placement="right"
            >
              <InfoOutlinedIcon className={classes.infoIcon} />
            </Tooltip>
            <Box>{company.therapeutics.join(", ")}</Box>
          </Box>
        </form>
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
  row: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: theme.spacing(2, 0),
  },
  input: {
    margin: theme.spacing(0, 2, 0, 0),
    minWidth: 500,
  },
  formControl: {
    margin: theme.spacing(0, 2, 0, 0),
    width: 500,
  },
  infoIcon: {
    color: "gray",
    margin: theme.spacing(0, 2, 0, 0),
  },
}));

export default AddNewCompany;
