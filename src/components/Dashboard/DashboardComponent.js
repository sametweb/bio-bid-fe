import React from "react";
import { useLocation } from "react-router-dom";

import Welcome from "./Welcome";
import Companies from "./Companies";
import PendingClaims from "./PendingClaims";
import Services from "./Services";
import Regions from "./Regions";
import TherapeuticAreas from "./TherapeuticAreas";
import AddNewCompany from "./AddNewCompany";

function DashboardComponent() {
  const { hash } = useLocation();

  switch (hash) {
    case "#companies":
      return <Companies />;
    case "#pending-claims":
      return <PendingClaims />;
    case "#services":
      return <Services />;
    case "#regions":
      return <Regions />;
    case "#therapeutic-areas":
      return <TherapeuticAreas />;
    case "#add-new-company":
      return <AddNewCompany />;
    case "#edit-company":
      return <AddNewCompany />;
    default:
      return <Welcome />;
  }
}

export default DashboardComponent;
