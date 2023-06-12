interface NavAttributes {
  [propName: string]: any;
}

interface NavWrapper {
  attribute: NavAttributes;
  element: string;
}

interface NavBadge {
  text: string;
  variant: string;
}

interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  showHide?: boolean;
  children?: any;
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: string;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    showHide: false,
    name: 'Manager',
    url: '/users',
    icon: 'fas fa-cog',
    class: '',
    children: [
      {
        icon: 'fa fa-users',
        name: 'Users',
        url: '/users',
        class: '',
      },
      {
        icon: 'fas fa-map-marker-alt',
        name: 'Regions',
        url: '/regions',
        class: '',
      },
      {
        icon: 'fas fa-route',
        name: 'Sub Region',
        url: '/sub-regions',
        class: '',
      },
      {
        icon: 'fas fa-dollar-sign',
        name: 'Currency',
        url: '/currency',
        class: '',
      },
      {
        icon: 'fab fa-stripe-s',
        name: 'Services',
        url: '/manage-services',
        class: '',
      },
      {
        icon: 'fas fa-th',
        name: 'Service Bundles',
        url: '/manage-bundles',
        class: '',
      },
      {
        icon: 'fas fa-boxes',
        name: 'Service Modules',
        url: '/service-modules',
        class: '',
      },
      {
        icon: 'fas fa-cube',
        name: 'Service Packages',
        url: '/service-packages',
        class: '',
      },
    ],
  },
  {
    showHide: false,
    name: 'Estimator',
    url: '/other',
    icon: 'fas fa-calculator',
    class: '',
    children: [
      {
        icon: 'fas fa-save',
        name: 'Saved Proposal',
        url: '/saved-proposal',
        class: '',
      },
      {
        icon: 'fas fa-clock',
        name: 'Hourly',
        url: '/hourly',
        class: '',
      },
      {
        icon: 'fas fa-user-tie',
        name: 'Resources',
        url: '/resources',
        class: '',
      },
      {
        icon: 'fab fa-stripe-s',
        name: 'Services',
        url: '/bundles',
        class: '',
      },
      {
        icon: 'fas fa-boxes',
        name: 'Service Modules',
        url: '/UserServiceModule',
        class: '',
      },
      {
        icon: 'fas fa-cube',
        name: 'Package',
        url: '/packages',
        class: '',
      },
    ],
  },
];
