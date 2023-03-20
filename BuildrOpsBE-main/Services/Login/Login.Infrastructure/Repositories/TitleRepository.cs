using BuildrOps.Application.Features.Department.Commands.GetDepartment;
using Dapper;
using Login.Application.Contracts.Persistence;
using Login.Application.Features.Title.Command.CreateTitle;
using Login.Application.Features.Title.Command.DeleteTitle;
using Login.Application.Features.Title.Command.GetTitle;
using Login.Application.Features.Title.Command.UpdateTitle;
using Login.Application.Features.WorkScheduele.Commands.GetWorkSchedule;
using Login.Infrastructure.Dapper;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Infrastructure.Repositories
{
    public class TitleRepository : ITitle
    {
        private IDapper _dapper;
        private ILogger<TitleRepository> _Logger;

        public TitleRepository(IDapper d, ILogger<TitleRepository> l)
        {
            _Logger = l;
            _dapper = d;
        }

        public CreateTitleResponse CreateTitle(CreateTitleCommand command)
        {
            string insertusersql = @"INSERT INTO [dbo].[Title]
           ([TitleName]
           ,[DepartmentId]
           ,[WorkScheduleId]
           ,[CompanyId]
           ,[IsProbationPeriod]
           ,[IsPaidVacationAwarded]
           ,[vacationTimeStructure]
           ,[IsBonusEligible]
           ,[BonusStructure]
           ,[IsAdded]
           ,[IsImported]
           ,[Islibrary]
           ,[TitleLibraryId]
           ,[CommunicationMethod]
           ,[ProbationPeriod]
           ,[PaidVacationAwarded]
           ,[BonusEligible])
          OUTPUT inserted.TitleId VALUES
           (@TitleName,@DepartmentId,@WorkScheduleId,@CompanyId,@IsProbationPeriod,@IsPaidVacationAwarded,@vacationTimeStructure,@IsBonusEligible,
@BonusStructure,@IsAdded,@Islibrary,@IsImported,@TitleLibraryId,@CommunicationMethod,@ProbationPeriod,@PaidVacationAwarded,@BonusEligible);";
            DynamicParameters uDataModel = new DynamicParameters();
            uDataModel.Add("TitleName", command.TitleName);
            uDataModel.Add("DepartmentId", command.DepartmentId);
            uDataModel.Add("WorkScheduleId", command.WorkScheduleId);
            uDataModel.Add("CompanyId", command.CompanyId);
            uDataModel.Add("IsProbationPeriod", command.IsProbationPeriod);
            uDataModel.Add("IsPaidVacationAwarded", command.IsPaidVacationAwarded);
            uDataModel.Add("vacationTimeStructure", command.VacationTimeStructure);
            uDataModel.Add("IsBonusEligible", command.IsBonusEligible);
            uDataModel.Add("BonusStructure", command.BonusStructure);
            uDataModel.Add("IsAdded", command.IsAdded);
            uDataModel.Add("Islibrary", command.Islibrary);
            uDataModel.Add("IsImported", command.IsImported);
            uDataModel.Add("TitleLibraryId", command.TitleLibraryId);
            uDataModel.Add("CommunicationMethod", command.CommunicationMethod);
            uDataModel.Add("ProbationPeriod", command.ProbationPeriod);
            uDataModel.Add("PaidVacationAwarded", command.PaidVacationAwarded);
            uDataModel.Add("BonusEligible", command.BonusEligible);

            try
            {
                var TitleId = (int) _dapper.ExecuteScalar(insertusersql, uDataModel, commandType: CommandType.Text);
                return new CreateTitleResponse
                {
                    msg = "successfull created",
                    TitleId = TitleId
                };
            }
            catch (Exception e)
            {
                _Logger.LogInformation(e, e.Message);
                return null;
            }
        }

        public DeleteTitleResponse DeleteTitle(DeleteTitleCommand commad)
        {
            string sql = "DELETE FROM [dbo].[Title] WHERE TitleId = @Id";
            DynamicParameters uDataModel = new DynamicParameters();
            uDataModel.Add("Id", commad.TitleId);
            try
            {
                _dapper.ExecuteScalar(sql, uDataModel, CommandType.Text);
                return new DeleteTitleResponse
                {
                    Id = commad.TitleId
                };
            }
            catch (Exception e)
            {
                _Logger.LogInformation(e, e.Message);
                return null;
            }

        }

        public List<GetTitleResponse> GetTitleByCompanyId(GetTitleCommand command)
        {
            List<GetTitleResponse> titleResponse = _dapper.GetAll<GetTitleResponse>($"SELECT * FROM [dbo].[Title] where CompanyId = {command.CompanyId}", null, commandType: CommandType.Text);
            if (titleResponse != null && titleResponse.Count > 0)
            {
                List<GetDepartmentResponse> departmentResponses = _dapper.GetAll<GetDepartmentResponse>($"SELECT * FROM [dbo].[Department] where CompanyId = {command.CompanyId}", null, commandType: CommandType.Text);
                List<WorkScheduleResponse> workScheduleResponses = _dapper.GetAll<WorkScheduleResponse>($"SELECT * FROM [dbo].[WorkSchedule] where CompanyId = {command.CompanyId}", null, commandType: CommandType.Text);
                foreach(GetTitleResponse getTitleResponse in titleResponse)
                {
                    getTitleResponse.Department = departmentResponses.FirstOrDefault(a => a.Id == getTitleResponse.DepartmentId);
                    getTitleResponse.WorkSchedule = workScheduleResponses.FirstOrDefault(a => a.Id == getTitleResponse.WorkScheduleId);
                }
            }
            return titleResponse;
        }

        public UpdateTitleResponse UpdateTitle(UpdateTitleCommand command)
        {
            GetTitleResponse WorkResponse = _dapper.Get<GetTitleResponse>($"SELECT * FROM [dbo].[Title] where TitleId = {command.TitleId}", null, commandType: CommandType.Text);
            string sqlCommand = @"UPDATE [dbo].[Title]
                   SET[TitleName] = @TitleName
                      ,[DepartmentId] = @DepartmentId
                      ,[WorkScheduleId] = @WorkScheduleId
                      ,[IsProbationPeriod] = @IsProbationPeriod
                      ,[IsPaidVacationAwarded] = @IsPaidVacationAwarded
                      ,[vacationTimeStructure] = @vacationTimeStructure
                      ,[IsBonusEligible] = @IsBonusEligible
                      ,[BonusStructure] = @BonusStructure
                      ,[IsAdded] = @IsAdded
                      ,[IsImported] = @IsImported
                      ,[Islibrary]=@Islibrary
                      ,[TitleLibraryId] = @TitleLibraryId
                     ,[CommunicationMethod]=@CommunicationMethod
                     ,[ProbationPeriod]=@ProbationPeriod
                     ,[PaidVacationAwarded]=@PaidVacationAwarded
                     ,[BonusEligible]=@BonusEligible
                  WHERE TitleId =@Id";
            DynamicParameters uDataModel = new DynamicParameters();
            uDataModel.Add("DepartmentId", command.DepartmentId != 0 ? command.DepartmentId : WorkResponse.DepartmentId);
            uDataModel.Add("WorkScheduleId", command.WorkScheduleId != 0 ? command.WorkScheduleId : WorkResponse.WorkScheduleId);
            uDataModel.Add("TitleName", command.TitleName != null ? command.TitleName : WorkResponse.TitleName);
            uDataModel.Add("IsProbationPeriod", command.IsProbationPeriod != null ? command.IsProbationPeriod : WorkResponse.IsProbationPeriod);
            uDataModel.Add("IsPaidVacationAwarded", command.IsPaidVacationAwarded != null ? command.IsPaidVacationAwarded : WorkResponse.IsPaidVacationAwarded);
            uDataModel.Add("vacationTimeStructure", command.VacationTimeStructure != null ? command.VacationTimeStructure : WorkResponse.VacationTimeStructure);
            uDataModel.Add("IsBonusEligible", command.IsBonusEligible != null ? command.IsBonusEligible : WorkResponse.IsBonusEligible);
            uDataModel.Add("BonusStructure", command.BonusStructure != null ? command.BonusStructure : WorkResponse.BonusStructure);
            uDataModel.Add("IsAdded", command.IsAdded != null ? command.IsAdded : WorkResponse.IsAdded);
            uDataModel.Add("Islibrary", command.Islibrary != null ? command.Islibrary : WorkResponse.Islibrary);
            uDataModel.Add("TitleLibraryId", command.TitleLibraryId != null ? command.TitleLibraryId : WorkResponse.TitleLibraryId);
            uDataModel.Add("CommunicationMethod", command.CommunicationMethod != null ? command.CommunicationMethod : WorkResponse.CommunicationMethod);
            uDataModel.Add("ProbationPeriod", command.ProbationPeriod != null ? command.ProbationPeriod : WorkResponse.ProbationPeriod);
            uDataModel.Add("PaidVacationAwarded", command.PaidVacationAwarded != null ? command.PaidVacationAwarded : WorkResponse.PaidVacationAwarded);
            uDataModel.Add("BonusEligible", command.BonusEligible != null ? command.BonusEligible : WorkResponse.BonusEligible);
            uDataModel.Add("IsImported", command.IsImported != null ? command.IsImported : WorkResponse.IsImported);
            uDataModel.Add("Id", command.TitleId);
            try
            {
                UpdateTitleResponse result = _dapper.Update<UpdateTitleResponse>(sqlCommand, uDataModel, CommandType.Text);
                return new UpdateTitleResponse
                {
                    Id = command.TitleId
                };
            }
            catch (Exception e)
            {
                _Logger.LogInformation(e, e.Message);
                return null;
            }
        }
    }
}
