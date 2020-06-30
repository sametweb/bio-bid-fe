import { gql } from "@apollo/client";

export const ADD_COMPANY = gql`
  mutation addCompany(
    $name: String!
    $email: String
    $logoURL: String
    $website: String
    $linkedin: String
    $overview: String
    $headquarters: String
    $companySize: CompanySize
    $regions: [RegionInput]
    $therapeutics: [TherapeuticInput]
    $services: [ServiceInput]
    $phases: [Phase]
  ) {
    createCompany(
      name: $name
      email: $email
      logoURL: $logoURL
      website: $website
      linkedin: $linkedin
      overview: $overview
      headquarters: $headquarters
      companySize: $companySize
      regions: $regions
      therapeutics: $therapeutics
      services: $services
      phases: $phases
    ) {
      id
    }
  }
`;

export const UPDATE_COMPANY = gql`
  mutation updateCompany(
    $id: ID!
    $name: String
    $email: String
    $logoURL: String
    $website: String
    $linkedin: String
    $overview: String
    $headquarters: String
    $companySize: CompanySize
    $regions: [RegionInput]
    $therapeutics: [TherapeuticInput]
    $services: [ServiceInput]
    $phases: [Phase]
  ) {
    updateCompany(
      id: $id
      updated_name: $name
      updated_email: $email
      updated_logoURL: $logoURL
      updated_website: $website
      updated_linkedin: $linkedin
      updated_overview: $overview
      updated_headquarters: $headquarters
      updated_companySize: $companySize
      updated_services: $services
      updated_regions: $regions
      updated_therapeutics: $therapeutics
      updated_phases: $phases
    ) {
      id
    }
  }
`;

export const DELETE_COMPANY = gql`
  mutation deleteCompany($id: ID!) {
    deleteCompany(id: $id) {
      id
      name
    }
  }
`;

export const EDIT_SERVICE_ITEM = gql`
  mutation updateServiceItem($name: String!, $updated_name: String!) {
    updateServiceItem(name: $name, updated_name: $updated_name) {
      id
      name
    }
  }
`;

export const DELETE_SERVICE_ITEM = gql`
  mutation deleteServiceItem($name: String!) {
    deleteServiceItem(name: $name) {
      id
      name
    }
  }
`;

export const EDIT_REGION = gql`
  mutation updateRegion($name: String!, $updated_name: String!) {
    updateRegion(name: $name, updated_name: $updated_name) {
      id
      name
    }
  }
`;

export const DELETE_REGION = gql`
  mutation deleteRegion($name: String!) {
    deleteRegion(name: $name) {
      id
      name
    }
  }
`;

export const EDIT_THERAPEUTIC = gql`
  mutation updateTherapeutic($name: String!, $updated_name: String!) {
    updateTherapeutic(name: $name, updated_name: $updated_name) {
      id
      name
    }
  }
`;

export const DELETE_THERAPEUTIC = gql`
  mutation deleteTherapeutic($name: String!) {
    deleteTherapeutic(name: $name) {
      id
      name
    }
  }
`;
