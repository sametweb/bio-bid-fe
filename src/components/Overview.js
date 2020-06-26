import React from "react";
import { companySize } from "../helpers/companySize";

function Overview({ company }) {
  return (
    <>
      <h2>Overview</h2>
      <p>{company.overview}</p>
      <h2>Details</h2>
      <p>Company Size: {companySize(company.companySize)}</p>
      <p>Headquarters: {company.headquarters}</p>
      <p>Phases: {company.phases.join(", ")}</p>
      <p>
        Covered Regions: {company.regions.map(({ name }) => name).join(", ")}
      </p>
      <p>
        Therapeutic Areas:{" "}
        {company.therapeutics.map(({ name }) => name).join(", ")}
      </p>
    </>
  );
}

export default Overview;
