import { RESTDataSource } from 'apollo-datasource-rest';

class TLAPI extends RESTDataSource {
  baseURL = 'https://api.staging.teamleader.eu';

  willSendRequest(request) {
    request.headers.set('Authorization', this.context.token);
  }

  async domainAction(domain, action, body) {
    const result = await this.post(`${domain}.${action}`, body);
    return result.data;
  }

  async getProjects(filter, sort) {
    const projects = await this.post('projects.list', { filter, sort });
    // should merge the correct contacts and companies into the response here
    return projects.data;
  }

  async getProject(id) {
    const project = await this.post('projects.info', { id });

    // merge the correct customer (contact or company into the response)
    if (project.data.customer) {
      if (project.data.customer.type === 'contact') {
        const contact = await this.getContact(project.data.customer.id);
        project.data.customer = contact;
      } else {
        const company = await this.getCompany(project.data.customer.id);
        project.data.customer = company;
      }
    }
    return project.data;
  }
}

export { TLAPI };
