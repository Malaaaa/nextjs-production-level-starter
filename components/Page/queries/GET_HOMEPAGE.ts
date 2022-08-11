import { gql } from "@apollo/client";

export const GET_HOMEPAGE = gql`
  query GET_HOMEPAGE ($uri: ID!) {
    page(id: $uri, idType: URI) {
        id
        
        content
      }
  }
`;

export type HomepageProps = {
    data: JSON;
}
  