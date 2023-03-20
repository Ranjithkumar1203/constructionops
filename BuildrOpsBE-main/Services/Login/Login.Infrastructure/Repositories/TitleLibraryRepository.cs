using BuildrOps.Application.Features.Department.Commands.GetDepartment;
using Dapper;
using Login.Application.Contracts.Persistence;
using Login.Application.Features.TitleLibrary.Command.CreateTitleLibrary;
using Login.Application.Features.TitleLibrary.Command.DeleteTitleLibrary;
using Login.Application.Features.TitleLibrary.Command.GetTitleLibrary;
using Login.Application.Features.TitleLibrary.Command.UpdateTitleLibrary;
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
    public class TitleLibraryRepository : ITitleLibrary
    {
        private IDapper _dapper;
        private ILogger<TitleLibraryRepository> _Logger;

        public TitleLibraryRepository(IDapper d, ILogger<TitleLibraryRepository> l)
        {
            _Logger = l;
            _dapper = d;
        }

        public CreateTitleLibraryResponse CreateTitleLibrary(CreateTitleLibraryCommand command)
        {
            string insertusersql = @"INSERT INTO [dbo].[TitleLibrary]
           ([TitleLibraryName]
           ,[CompanyId]
           ,[IsProbationPeriod]
           ,[IsPaidVacationAwarded]
           ,[vacationTimeStructure]
           ,[IsBonusEligible]
           ,[BonusStructure]
           ,[IsAdded]
           ,[Islibrary])
     VALUES OUTPUT inserted.Id
           (@TitleLibraryName,@DepartmentId,@WorkScheduleId,@CompanyId,@IsProbationPeriod,@IsPaidVacationAwarded,@vacationTimeStructure,@IsBonusEligible,
@BonusStructure,@IsAdded,@Islibrary);";
            DynamicParameters uDataModel = new DynamicParameters();
            uDataModel.Add("TitleLibraryName", command.TitleLibraryName);
            uDataModel.Add("CompanyId", command.CompanyId);
            uDataModel.Add("IsProbationPeriod", command.IsProbationPeriod);
            uDataModel.Add("IsPaidVacationAwarded", command.IsPaidVacationAwarded);
            uDataModel.Add("vacationTimeStructure", command.VacationTimeStructure);
            uDataModel.Add("IsBonusEligible", command.IsBonusEligible);
            uDataModel.Add("BonusStructure", command.BonusStructure);
            uDataModel.Add("IsAdded", command.IsAdded);
            uDataModel.Add("Islibrary", command.Islibrary);
            uDataModel.Add("CompanyId", command.CompanyId);
            try
            {
                int TitleLibraryId = (int)_dapper.ExecuteScalar(insertusersql, uDataModel);
                return new CreateTitleLibraryResponse
                {
                    TitleLibraryId = TitleLibraryId
                };
            }
            catch (Exception e)
            {
                _Logger.LogInformation(e, e.Message);
                return null;
            }
        }

        public DeleteTitleLibraryResponse DeleteTitleLibrary(DeleteTitleLibraryCommand commad)
        {
            string sql = "DELETE FROM [dbo].[TitleLibrary] WHERE TitleLibraryId = @Id";
            DynamicParameters uDataModel = new DynamicParameters();
            uDataModel.Add("Id", commad.TitleLibraryId);
            try
            {
                _dapper.ExecuteScalar(sql, uDataModel, CommandType.Text);
                return new DeleteTitleLibraryResponse
                {
                    Id = commad.TitleLibraryId
                };
            }
            catch (Exception e)
            {
                _Logger.LogInformation(e, e.Message);
                return null;
            }

        }

        public List<GetTitleLibraryResponse> GetTitleLibraryByCompanyId(GetTitleLibraryCommand command)
        {
            List<GetTitleLibraryResponse> TitleLibraryResponse = _dapper.GetAll<GetTitleLibraryResponse>($"SELECT * FROM [dbo].[TitleLibrary] where CompanyId = {command.CompanyId}", null, commandType: CommandType.Text);
            
            return TitleLibraryResponse;
        }

        public UpdateTitleLibraryResponse UpdateTitleLibrary(UpdateTitleLibraryCommand command)
        {
            GetTitleLibraryResponse WorkResponse = _dapper.Get<GetTitleLibraryResponse>($"SELECT * FROM [dbo].[TitleLibrary] where TitleLibraryId = {command.TitleLibraryId}", null, commandType: CommandType.Text);
            string sqlCommand = @"UPDATE [dbo].[TitleLibrary]
   SET[TitleLibraryName] = @TitleLibraryName
      ,[IsProbationPeriod] = @IsProbationPeriod
      ,[IsPaidVacationAwarded] = @IsPaidVacationAwarded
      ,[vacationTimeStructure] = @vacationTimeStructure
      ,[IsBonusEligible] = @IsBonusEligible
      ,[BonusStructure] = @BonusStructure
      ,[IsAdded] = @IsAdded
  WHERE TitleLibraryId =@Id";
            DynamicParameters uDataModel = new DynamicParameters();
            uDataModel.Add("TitleLibraryName", command.TitleLibraryName != null ? command.TitleLibraryName : WorkResponse.TitleLibraryName);
            uDataModel.Add("IsProbationPeriod", command.IsProbationPeriod != null ? command.IsProbationPeriod : WorkResponse.IsProbationPeriod);
            uDataModel.Add("IsPaidVacationAwarded", command.IsPaidVacationAwarded != null ? command.IsPaidVacationAwarded : WorkResponse.IsPaidVacationAwarded);
            uDataModel.Add("vacationTimeStructure", command.VacationTimeStructure != null ? command.VacationTimeStructure : WorkResponse.VacationTimeStructure);
            uDataModel.Add("IsBonusEligible", command.IsBonusEligible != null ? command.IsBonusEligible : WorkResponse.IsBonusEligible);
            uDataModel.Add("BonusStructure", command.BonusStructure != null ? command.BonusStructure : WorkResponse.BonusStructure);
            uDataModel.Add("IsAdded", command.IsAdded != null ? command.IsAdded : WorkResponse.IsAdded);
            uDataModel.Add("Islibrary", command.Islibrary != null ? command.Islibrary : WorkResponse.Islibrary);
            uDataModel.Add("TitleLibraryName", command.TitleLibraryName != null ? command.TitleLibraryName : WorkResponse.TitleLibraryName);
            uDataModel.Add("Id", command.TitleLibraryId);
            try
            {
                UpdateTitleLibraryResponse result = _dapper.Update<UpdateTitleLibraryResponse>(sqlCommand, uDataModel, CommandType.Text);
                return new UpdateTitleLibraryResponse
                {
                    Id = command.TitleLibraryId
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
