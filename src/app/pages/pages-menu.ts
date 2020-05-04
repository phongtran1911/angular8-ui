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
    icon: 'pantone-outline',
    data: 1,
    children: [
      {
        title: 'Lead and Postback Report',
        link: '/pages/report/lead',
        data: 'lead',
      },
      {
        title: 'Delivery Report',
        link: '/pages/report/delivery',
        data: 'delivery',
      },
      {
        title: 'Rescue Performance Report',
        link: '/pages/report/rescueperformance',
        data: 'performance',
      },
      {
        title: 'Marketing report',
        data: 'marketing',
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
        data: 'Campaign',
        children: [
          {
            title: 'By created date',
            link: '/pages/report/campaigncreated',
            data: 'create'
          },
          {
            title: 'By updated date',
            link: '/pages/report/campaignupdated',
            data: 'update'
          },
          {
            title: 'By agent',
            link: '/pages/report/campaignagent'
          }
        ]
      }
    ]
  },
  {
    title: 'RESCUE JOB',
    icon: 'pricetags-outline',
    data: 'rescuejob',
    children: [
      {
        title: 'All Rescues',
        link: '/pages/rescuejob/allrescues',
      },
      {
        title: 'Validator pending',
        link: '/pages/rescuejob/allrescues/validator/1',
        data: 'validator',
      },
      {
        title: 'Sales Agent pending',
        link: '/pages/rescuejob/allrescues/sale/2',
        data: 'salepending',
      },
      {
        title: 'Logistic pending',
        link: '/pages/rescuejob/allrescues/logistic/3',
        data: 'logistic',
      },
      {
        title: 'My Rescue',
        link: '/pages/rescuejob/myrescue',
        data: 'myrescue'
      }
    ]
  },  
];
