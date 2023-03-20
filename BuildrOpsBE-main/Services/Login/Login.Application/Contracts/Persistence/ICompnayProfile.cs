using BuildrOps.Application.Features.CompanyProfile.CompanyCommunication.Command.GetCompanyCommunication;
using BuildrOps.Application.Features.CompanyProfile.CompanyCommunication.Commands.GetCompanyCommunication;
using BuildrOps.Application.Features.CompanyProfile.CompanyCostControl.Commands.GetCompanyCostControl;
using BuildrOps.Application.Features.CompanyProfile.CompanyCustomers.Commands.GetCompanyCustomers;
using BuildrOps.Application.Features.CompanyProfile.CompanyDesignSelection.Commands.GetDesignSelection;
using BuildrOps.Application.Features.CompanyProfile.CompanyDetails.Commands;
using BuildrOps.Application.Features.CompanyProfile.CompanyImages.Commands.GetCompanyImage;
using BuildrOps.Application.Features.CompanyProfile.CompanyPlanSpecification.Commands.GetCompanyPlan;
using BuildrOps.Application.Features.CompanyProfile.CompanyProjects.Commands.GetCompanyProject;
using BuildrOps.Application.Features.CompanyProfile.CompanyQualityAssurance.Commands.GetCompanyQuality;
using BuildrOps.Application.Features.CompanyProfile.CompanySchedules.Commands.GetCompanySchedules;
using BuildrOps.Application.Features.CompanyProfile.CompanyTask.Commands.GetCompanyTask;
using BuildrOps.Application.Features.CompanyProfile.CompanyUsers.Commands.GetCompanyUser;
using BuildrOps.Application.Features.CompanyProfile.ProfilePercentage.Commands.GetProfilePercentage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Application.Contracts.Persistence
{
  public  interface ICompanyProfile
    {
        public List<GetCompanyCommunicationResponse> getCompanyCommunications(GetCompanyCommunicationCommand command);
        public List<GetCompanyCostControlResponse> getCompanyCostControl(GetCompanyCostControlCommand command);
        public List<GetCompanyCustomersResponse> getCompanyCustomers(GetCompanyCustomerscommand command);
        public List<GetDesignSelectionResponse> getCompanyDesign(GetDesignSelectionCommand command);
        public List<GetCompanyImageResponse> getCompanyImage(GetCompanyImageCommand command);
        public List<GetCompanyPlanResponse> getCompanyPlan(GetCompanyPlanCommand command);
        public List<GetCompanyProjectResponse> getCompanyProject(GetCompanyProjectCommand command);
        public List<GetCompanyQualityResponse> getCompanyQuality(GetCompanyQualityCommand command);
        public List<GetCompanySchedulesResponse> getCompanySchedules(GetCompanySchedulesCommand command);
        public List<GetCompanyTaskResponse> getCompanyTast(GetCompanyTaskCommand command);
        public List<GetCompanyUserResponse> getCompanyUser(GetCompanyUserCommand command);
        public Task<GetCompanyDetailResponse> getCompanyDetails(GetCompanyDetailCommand command);
        public Task<GetProfilePercentageResponse> getProfilePercentage(GetProfilePercentageCommand command);
        
    }
}
