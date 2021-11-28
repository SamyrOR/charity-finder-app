export interface Organizations {
  organizations: {
    hasNext: boolean;
    nextOrgId: number;
    organization: Organization[];
  };
}

export interface Organization {
  id: number;
  name: string;
  activeProjects: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  iso3166CountryCode: string;
  country: string;
  mission: string;
  url: string;
  logoUrl: string;
  themes: Themes;
}

interface Themes {
  theme: Theme[];
}
interface Theme {
  id: string;
  name: string;
}
