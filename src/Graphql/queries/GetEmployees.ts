import { gql } from "@apollo/client";

const GetEmployees = gql`
  query GetEmployees {
    GetEmployees {
      dependents {
        id
        name
      }
      paycheck
      name
      id
      yearlyBenefitsCost
    }
  }
`;

export default GetEmployees;
