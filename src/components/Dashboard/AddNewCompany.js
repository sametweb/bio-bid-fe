import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";

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
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

import {
  GET_SERVICES,
  GET_REGIONS,
  GET_THERAPEUTICS,
} from "../../data/queries";
import AddNewCompanyPart2 from "./AddNewCompanyPart2";
import { ADD_COMPANY, UPDATE_COMPANY } from "../../data/mutations";
import Tooltip from "../custom/Tooltip";
import { companySize } from "../../helpers/companySize";
import { useLocation, useHistory } from "react-router-dom";

function AddNewCompany(props) {
  const classes = useStyles();
  const [step, setStep] = useState(1);
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

  const history = useHistory();
  const { state } = useLocation();

  const { data: servicesData } = useQuery(GET_SERVICES);
  const { data: regionsData } = useQuery(GET_REGIONS);
  const { data: therapeuticsData } = useQuery(GET_THERAPEUTICS);

  const [addCompany, { error, loading }] = useMutation(ADD_COMPANY, {
    variables: {
      ...company,
      companySize: !company.companySize ? null : company.companySize,
    },
    awaitRefetchQueries: true,
    refetchQueries: ["companies"],
    notifyOnNetworkStatusChange: true,
    onCompleted: () => history.push("#companies"),
  });

  const [
    updateCompany,
    { error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_COMPANY, {
    variables: {
      ...company,
      companySize: !company.companySize ? null : company.companySize,
    },
    awaitRefetchQueries: true,
    refetchQueries: ["companies"],
    notifyOnNetworkStatusChange: true,
    onCompleted: () => history.push("#companies"),
  });

  const sizeOptions = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
  const sizeItems = sizeOptions.map((size) => (
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

  useEffect(() => {
    if (state) {
      const {
        id,
        name,
        email,
        phases,
        logoURL,
        website,
        linkedin,
        overview,
        headquarters,
        companySize,
        services,
        regions,
        therapeutics,
      } = state;
      setCompany({
        id,
        name,
        email,
        phases,
        logoURL,
        website,
        linkedin,
        overview,
        headquarters,
        companySize,
        services: services.map(({ name, specialties }) => ({
          name,
          specialties: specialties.map(({ name, sub_specialties }) => ({
            name,
            sub_specialties: sub_specialties.map(({ name }) => ({ name })),
          })),
        })),
        regions: regions.map(({ name }) => ({ name })),
        therapeutics: therapeutics.map(({ name }) => ({ name })),
      });
    }
  }, []);

  return (
    <Box className={classes.content}>
      <Box className={classes.header}>
        <h2>{state ? `Edit: ${state.name}` : "Add New Company"}</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={state ? updateCompany : addCompany}
        >
          {loading || updateLoading
            ? "loading"
            : state
            ? "Save Changes"
            : "Add Company"}
        </Button>
        {/* {(error || updateError) && (error.message || updateError.message)} */}
      </Box>
      <Box className={classes.stepNav}>
        <Stepper activeStep={step} alternativeLabel>
          <Step
            active={step === 1}
            completed={step > 1}
            onClick={() => setStep(1)}
            className={classes.step}
          >
            <StepLabel>Company Information</StepLabel>
          </Step>
          <Step
            active={step === 2}
            completed={step > 2}
            onClick={() => setStep(2)}
            className={classes.step}
          >
            <StepLabel>Offered Services and Specialties</StepLabel>
          </Step>
        </Stepper>
      </Box>
      <Box>
        {step === 1 ? (
          <>
            <Box className={classes.row}>
              <TextField
                value={company.name}
                onChange={handleChange}
                className={classes.input}
                variant="outlined"
                label="Company Name"
                size="small"
                name="name"
                required
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
                  value={company.regions.map(({ name }) => name)}
                  onChange={(e) =>
                    setCompany({
                      ...company,
                      regions: e.target.value.map((region) => ({
                        name: region,
                      })),
                    })
                  }
                  renderValue={(selected) => `${selected.length} selected`}
                  MenuProps={{ PaperProps: { style: { maxHeight: 600 } } }}
                >
                  {regionsData?.regions.map(({ name: region }) => (
                    <MenuItem key={region} value={region}>
                      <Checkbox
                        checked={company.regions
                          .map(({ name }) => name)
                          .includes(region)}
                      />
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
              <Box>{company.regions.map(({ name }) => name).join(", ")}</Box>
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
                  value={company.therapeutics.map(({ name }) => name)}
                  onChange={(e) =>
                    setCompany({
                      ...company,
                      therapeutics: e.target.value.map((thera) => ({
                        name: thera,
                      })),
                    })
                  }
                  renderValue={(selected) => `${selected.length} selected`}
                  MenuProps={{ PaperProps: { style: { maxHeight: 600 } } }}
                >
                  {therapeuticsData?.therapeutics.map(
                    ({ name: therapeutic }) => (
                      <MenuItem key={therapeutic} value={therapeutic}>
                        <Checkbox
                          checked={company.therapeutics
                            .map(({ name }) => name)
                            .includes(therapeutic)}
                        />
                        <ListItemText primary={therapeutic} />
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
              <Tooltip
                title="Please select all the therapeutic areas company is offering services in."
                placement="right"
              >
                <InfoOutlinedIcon className={classes.infoIcon} />
              </Tooltip>
              <Box>
                {company.therapeutics.map(({ name }) => name).join(", ")}
              </Box>
            </Box>
            <Box className={classes.row}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setStep(2)}
              >
                Next Step: Services and Specialties
              </Button>
            </Box>
          </>
        ) : (
          <AddNewCompanyPart2
            company={company}
            setCompany={setCompany}
            servicesData={servicesData}
          />
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
  stepNav: {
    padding: theme.spacing(2, 0),
    display: "flex",
    justifyContent: "center",
  },
  step: {
    cursor: "pointer",
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
