import { gql, mergeSchemas } from 'apollo-server';

import {
  schema as contactsSchema,
  resolvers as contactsResolvers
} from './Contacts';
import {
  schema as projectsSchema,
  resolvers as projectsResolvers
} from './Projects';

const linkedSchema = gql`
  type Company {
    id: ID!
    name: String
  }

  union Customer = Contact | Company

  extend type Project {
    customer: Customer
  }
`;

const linkedResolvers = {
  Customer: {
    __resolveType(obj) {
      if (obj.last_name) {
        return 'Contact';
      }
      if (obj.name) {
        return 'Company';
      }

      return null;
    }
  }
};

export default mergeSchemas({
  schemas: [contactsSchema, projectsSchema, linkedSchema],
  resolvers: [contactsResolvers, projectsResolvers, linkedResolvers]
});
