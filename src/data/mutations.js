import { gql } from "@apollo/client";

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
