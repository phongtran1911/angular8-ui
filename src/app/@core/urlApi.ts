export const environment = {
    apiUrl: 'http://27.71.226.210:9103/tms/',
  urlPages: {
    lead: {
      leadreport: 'api/reportincominglead/search/1/25',
      leadexport: 'api/filedownload/downloadReportIncomingLead',
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
    },
    campaignagent: {
      agentreport: 'api/reportCpByAgent/search',
      export: 'api/filedownload/exportExcelReportCampaignByAgent',
      allcampaign: 'api/cpCampaign/getAllByCurrentUserLogin'
    },
    allrescues: {
      rescuesjob: 'api/rescuejob/search/1/25',
      userfullname: 'api/user/search/1/10',
      saveRescueUser: 'api/rescuejob/addAgent/',
      allrcstatusbytype: 'api/rcStatus/getAllRcStatusByType/',
      allsubstatusbytype: 'api/rcSubStatus/getAllSubStatusByType/',
      checkById: 'api/rescuejob/check/',
      ListRescueHistory: 'api/rescuejobactivity/searchByDto',
      ListSaleOrder: 'api/odSaleOrderItem/searchByDto',
      ListDeliveryOrder: 'api/odDoNew/searchByDto',
      allbpPartner: 'api/partner/page/',
      listuser: 'api/user/listUser',
      LastmileStatusAndLastmileSubStatus: 'api/rescuejob/updateLastmileStatusAndLastmileSubStatus',
      saveComment: 'api/rescuejob/saveComment',
      CsStatusByRescueJobStatus: 'api/rcStatus/getCsStatusByRescueJobStatus/',
      saveRescueJobActivity: 'api/rescuejobactivity/add',
      myrescuejob: 'api/rescuejob/myrescuejob/search/1/',
      lastmilestatus: 'api/rescuejob/getLastmileStatus',
      lastmilesubstatus: 'api/rescuejob/getLastmileSubStatus',
      PiorityByStatusName: 'api/rcActionMapping/getPiorityByStatusNameAndSubStatusName',
      Cssubstatusbystatusid: 'api/rcSubStatus/getAllByStatusId/',
      CsStatusbyType: 'api/rcStatus/getAllByType/',
      RescueJobById: 'api/rescuejob/',
      takeRescueJob: 'api/rescuejob/take',
      getfile: 'api/filedownload/rescueJob/allRescueJob'
    },
    edit_rescue_job: {
      lastmilestatus: 'api/rescuejob/getLastmileStatus',
      lastmilesubstatus: 'api/rescuejob/getLastmileSubStatus',
      PiorityByStatusName: 'api/rcActionMapping/getPiorityByStatusNameAndSubStatusName',
      AllPriority: 'api/rcActionMapping/getAllPriority',
      NewRescueJobID: 'api/rescuejob/getNewRescueJobID',
      CreateRescueJobByDO: 'api/rescuejob/checkCreateRescueJobByDO',
      getByOdSaleOrderId: 'api/odSaleOrderItem/getByOdSaleOrderId/',
      findOneOdDoNewData: 'api/odDoNew/findOneBySearchDto',
      saveRescueJob: 'api/rescuejob/saveOrUpdate'
    }
  }  
}