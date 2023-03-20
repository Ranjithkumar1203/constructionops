using BuildrOps.Application.Contracts.Persistence;
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
using Dapper;
using Login.Infrastructure.Dapper;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuildrOps.Infrastructure.Repositories
{
   public class CompanyProfileRepository:ICompanyProfile
    {
        private IDapper _dapper;
        private ILogger<CompanyProfileRepository> _Logger;

        public CompanyProfileRepository(IDapper dapper, ILogger<CompanyProfileRepository> l)
        {
            _Logger = l;
            _dapper = dapper;
          

        }

        public List<GetCompanyCommunicationResponse> getCompanyCommunications(GetCompanyCommunicationCommand command)
        {
            List<GetCompanyCommunicationResponse> WorkResponse = _dapper.GetAll<GetCompanyCommunicationResponse>($"SELECT * FROM [dbo].[CompanyCommunication] where CompanyId ={command.CompanyId}", null, commandType: CommandType.Text);
            return WorkResponse;
        }

        public List<GetCompanyCostControlResponse> getCompanyCostControl(GetCompanyCostControlCommand command)
        {
            List<GetCompanyCostControlResponse> WorkResponse = _dapper.GetAll<GetCompanyCostControlResponse>($"SELECT * FROM [dbo].[CompanyCostControl] where CompanyId ={command.CompanyId}", null, commandType: CommandType.Text);
            return WorkResponse;
        }

        public List<GetCompanyCustomersResponse> getCompanyCustomers(GetCompanyCustomerscommand command)
        {
            List<GetCompanyCustomersResponse> WorkResponse = _dapper.GetAll<GetCompanyCustomersResponse>($"SELECT * FROM [dbo].[CompanyCustomer] where CompanyId ={command.CompanyId}", null, commandType: CommandType.Text);
            return WorkResponse;
        }

        public List<GetDesignSelectionResponse> getCompanyDesign(GetDesignSelectionCommand command)
        {
            List<GetDesignSelectionResponse> WorkResponse = _dapper.GetAll<GetDesignSelectionResponse>($"SELECT * FROM [dbo].[CompanyDesignSelection] where CompanyId ={command.CompanyId}", null, commandType: CommandType.Text);
            return WorkResponse;
        }

        public async Task<GetCompanyDetailResponse> getCompanyDetails(GetCompanyDetailCommand command)
        {
            string findQuery = @"Select * from [dbo].[Company] Where Id=@id;";
            DynamicParameters findcompanyParameter = new DynamicParameters();
            findcompanyParameter.Add("Id", command.companyId);
            var foundData = _dapper.Get<GetCompanyDetailResponse>(findQuery, findcompanyParameter, commandType: CommandType.Text);
            return new GetCompanyDetailResponse
            {
                Id = foundData.Id,
                companyName=foundData.companyName,
                CompanyLogo=foundData.CompanyLogo,
                CompanyTagline=foundData.CompanyTagline

                
            };

        }
        public async Task<GetProfilePercentageResponse> getProfilePercentage(GetProfilePercentageCommand command)
        {
            string findQuery = @"Select * from [dbo].[ProfileComplete] Where CompanyId=@CompanyId;";
            DynamicParameters findcompanyParameter = new DynamicParameters();
            findcompanyParameter.Add("CompanyId", command.CompanyId);
            var foundData = _dapper.Get<GetProfilePercentageCommand>(findQuery, findcompanyParameter, commandType: CommandType.Text);
            if (foundData == null)
            {
                return new GetProfilePercentageResponse
                {
                    isDataAvilable = false,
                   
                };
            }
            else
            {
                return new GetProfilePercentageResponse
                {
                    isDataAvilable = true,
                    ProfileComplete = foundData.ProfileComplete,
                    Id = foundData.CompanyId
                    
                };
            }
           
        }

        public List<GetCompanyImageResponse> getCompanyImage(GetCompanyImageCommand command)
        {
            List<GetCompanyImageResponse> WorkResponse = _dapper.GetAll<GetCompanyImageResponse>($"SELECT * FROM [dbo].[CompanyImages] where CompanyId ={command.CompanyId}", null, commandType: CommandType.Text);
            return WorkResponse;
        }

        public List<GetCompanyPlanResponse> getCompanyPlan(GetCompanyPlanCommand command)
        {
            List<GetCompanyPlanResponse> WorkResponse = _dapper.GetAll<GetCompanyPlanResponse>($"SELECT * FROM [dbo].[CompanyPlans] where CompanyId ={command.CompanyId}", null, commandType: CommandType.Text);
            return WorkResponse;
        }

        public List<GetCompanyProjectResponse> getCompanyProject(GetCompanyProjectCommand command)
        {
            List<GetCompanyProjectResponse> WorkResponse = _dapper.GetAll<GetCompanyProjectResponse>($"SELECT * FROM [dbo].[CompanyProjects] where CompanyId ={command.CompanyId}", null, commandType: CommandType.Text);
            return WorkResponse;
        }

        public List<GetCompanyQualityResponse> getCompanyQuality(GetCompanyQualityCommand command)
        {
            List<GetCompanyQualityResponse> WorkResponse = _dapper.GetAll<GetCompanyQualityResponse>($"SELECT * FROM [dbo].[CompanyQualityAssurance] where CompanyId ={command.CompanyId}", null, commandType: CommandType.Text);
            return WorkResponse;
        }

        public List<GetCompanySchedulesResponse> getCompanySchedules(GetCompanySchedulesCommand command)
        {
            List<GetCompanySchedulesResponse> WorkResponse = _dapper.GetAll<GetCompanySchedulesResponse>($"SELECT * FROM [dbo].[CompanySchedules] where CompanyId ={command.CompanyId}", null, commandType: CommandType.Text);
            return WorkResponse;
        }

        public List<GetCompanyTaskResponse> getCompanyTast(GetCompanyTaskCommand command)
        {
            List<GetCompanyTaskResponse> WorkResponse = _dapper.GetAll<GetCompanyTaskResponse>($"SELECT * FROM [dbo].[CompanyTasks] where CompanyId ={command.CompanyId}", null, commandType: CommandType.Text);
            return WorkResponse;
        }
        public List<GetCompanyUserResponse> getCompanyUser(GetCompanyUserCommand command)
        {
            List<GetCompanyUserResponse> WorkResponse = _dapper.GetAll<GetCompanyUserResponse>($"SELECT * FROM [dbo].[CompanyUsers] where CompanyId ={command.CompanyId}", null, commandType: CommandType.Text);
            return WorkResponse;
        }

       
    }
}
