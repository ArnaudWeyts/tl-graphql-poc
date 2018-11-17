export default {
  Query: {
    contacts: (root, { filter, sort }, { dataSources }) =>
      dataSources.TLAPI.domainAction('contacts', 'list', { filter, sort }),
    contact: (root, { id }, { dataSources }) =>
      dataSources.TLAPI.domainAction('contacts', 'info', id)
  },
  Mutation: {
    addContact: (root, { contact }, { dataSources }) =>
      dataSources.TLAPI.domainAction('contacts', 'add', contact)
  }
};
