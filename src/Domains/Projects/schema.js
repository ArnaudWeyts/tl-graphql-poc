import { makeExecutableSchema, gql } from 'apollo-server';

export default makeExecutableSchema({
  typeDefs: gql`
    type Project {
      id: ID!
      reference: String
      title: String
      description: String
    }

    enum ProjectSortField {
      due_on
    }

    enum ProjectSortOrder {
      asc
      desc
    }

    input ProjectSort {
      field: ProjectSortField
      order: ProjectSortOrder
    }

    type Query {
      projects(sort: [ProjectSort]): [Project]
      project(id: ID): Project
    }
  `
});
