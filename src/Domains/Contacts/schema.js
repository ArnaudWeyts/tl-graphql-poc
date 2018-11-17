import { makeExecutableSchema, gql } from 'apollo-server';

export default makeExecutableSchema({
  typeDefs: gql`
    type Contact {
      id: ID!
      last_name: String!
      first_name: String
      salutation: String
    }

    input ContactInput {
      last_name: String!
      first_name: String
      salutation: String
    }

    input ContactFilter {
      company_id: ID
    }

    enum ContactSortField {
      added_at
      name
      updated_at
    }

    enum ContactSortOrder {
      asc
      desc
    }

    input ContactSort {
      field: ContactSortField
      order: ContactSortOrder
    }

    type Query {
      contacts(filter: ContactFilter, sort: [ContactSort]): [Contact]
      contact(id: ID): Contact
    }

    type Response {
      type: String!
      id: ID!
    }

    type Mutation {
      addContact(contact: ContactInput): Response
    }
  `
});
