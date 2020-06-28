import { gql } from "@apollo/client";

export const GET_COMPANIES = gql`
  query getCompanies {
    companies {
      id
      name
      maintainer
      email
      phases
      logoURL
      website
      linkedin
      overview
      headquarters
      companySize
      services {
        id
        name
        specialties {
          id
          name
          sub_specialties {
            id
            name
          }
        }
      }
      regions {
        id
        name
      }
      therapeutics {
        id
        name
      }
    }
  }
`;

export const GET_COMPANY_BY_ID = gql`
  query company($id: ID!) {
    company(id: $id) {
      id
      name
      maintainer
      email
      phases
      logoURL
      website
      linkedin
      overview
      headquarters
      companySize
      services {
        id
        name
        specialties {
          id
          name
          sub_specialties {
            id
            name
          }
        }
      }
      regions {
        id
        name
      }
      therapeutics {
        id
        name
      }
    }
  }
`;

export const GET_PENDING_CLAIMS = gql`
  query pendingClaims {
    pendingClaims {
      id
      user
      email
      name
      pending
      approved
      company {
        id
        name
        logoURL
      }
      createdAt
    }
  }
`;

export const PENDING_CLAIMS_COUNT = gql`
  query {
    count
  }
`;

export const GET_SERVICES = gql`
  query serviceItems {
    serviceItems {
      id
      name
    }
  }
`;

export const GET_REGIONS = gql`
  query regions {
    regions {
      id
      name
    }
  }
`;

export const GET_THERAPEUTICS = gql`
  query therapeutics {
    therapeutics {
      id
      name
    }
  }
`;
