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
