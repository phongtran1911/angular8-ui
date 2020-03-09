/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/tms/',
  urlPages: {
    lead: {
      leadreport: 'api/reportincominglead/search/1/25'
    },
    delivery: {
      deliveryreport: 'api/reportdelivery/search/1/25'
    },
    rescueperformance: {
      performancereport: 'api/reportRescueAgentPerformanceDaily/search',
      AllGroupByOrgId: 'api/orGroup/getAllGroupByOrgId',
      CsAgentByGroupId: 'api/orGroup/getCsAgentByGroupId'
    },
    marketingsummary: {
      summaryreport: 'api/reportMaketingSummary/searchListByDto',
      export: 'api/filedownload/exportExcelReportMarketingSummary'
    },
    campaigncreated: {
      createdreport: 'api/reportCpByCreatedDate/search',
      export: 'api/filedownload/ReportCampaignByCreateDate',
      allcampaign: 'api/cpCampaign/getAllByCurrentUserLogin'
    },
    campaignupdated: {
      updatedreport: 'api/reportCpByUpdatedDate/search',
      export: 'api/filedownload/ReportCampaignByUpdatedDate',
      allcampaign: 'api/cpCampaign/getAllByCurrentUserLogin'
    }
  }  
};
