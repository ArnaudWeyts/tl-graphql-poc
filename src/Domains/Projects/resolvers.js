export default {
  Query: {
    projects: (root, { sort }, { dataSources }) =>
      dataSources.TLAPI.getProjects(sort),
    project: (root, { id }, { dataSources }) => dataSources.TLAPI.getProject(id)
  }
};
