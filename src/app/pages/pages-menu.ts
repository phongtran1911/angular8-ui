import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'REPORT',
    group: true,
  },
  {
    title: 'Lead and Postback Report',
    link: '/pages/report/lead',
    icon: 'pantone-outline'
  },
  {
    title: 'Delivery Report',
    link: '/pages/report/delivery',
    icon: 'pantone-outline'
  },
  {
    title: 'Rescue Performance Report',
    link: '/pages/report/rescueperformance',
    icon: 'pantone-outline',
  },
  {
    title: 'Marketing report',
    icon: 'pantone-outline',
    children: [
      {
        title: 'Marketing Summary',
        link: '/pages/report/marketingsummary'
      },
      {
        title: 'Inhouse Marketing',
        link: '/pages/report/marketinginhouse',
        hidden: true
      }
    ]
  },
  {
    title: 'Campaign Summary Report',
    icon: 'pantone-outline',
    children: [
      {
        title: 'By created date',
        link: '/pages/report/campaigncreated'
      },
      {
        title: 'By updated date',
        link: '/pages/report/campaignupdated'
      },
      {
        title: 'By agent',
        link: '/pages/report/campaignagent'
      }
    ]
  },
  {
    title: 'RESCUE JOB',
    group: true,
  },
  {
    title: 'All Rescues',
    link: '/pages/rescue/1',
    icon: 'pantone-outline'
  },
  {
    title: 'Validator pending',
    link: '/pages/rescue/2',
    icon: 'pantone-outline'
  },
  {
    title: 'Sales Agent pending',
    link: '/pages/rescue/3',
    icon: 'pantone-outline',
  },
  {
    title: 'Logistic pending',
    link: '/pages/rescue/4',
    icon: 'pantone-outline'
  },
  {
    title: 'My Rescue',
    link: '/pages/rescue/5',
    icon: 'pantone-outline'
  }
];
