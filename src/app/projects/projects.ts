import { Organization } from '../organizations/organizations';

export interface Projects {
  search: {
    request: {
      filters: {
        name: string;
        value: string;
      };
      q: string;
      start: number;
      summary: boolean;
    };
    response: {
      projects: {
        project: Project[];
      };
      start: number;
      numberFound: number;
    };
  };
}

export interface Project {
  id: number;
  organization: Organization;
  title: string;
  projectLink: string;
  themeName: string;
  region: string;
  imageLink: string;
  image: {
    title: string;
    imageLink: Images[];
  };
}

interface Images {
  url: string;
  size: string;
}
