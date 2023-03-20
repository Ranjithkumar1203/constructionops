using Dapper;
using Login.Application.Contracts.Persistence;
using Login.Application.Features.HolidayLibrary.Commands.CreateHolidayLibrary;
using Login.Application.Features.HolidayLibrary.Commands.DeleteHolidayLibrary;
using Login.Application.Features.HolidayLibrary.Commands.GetHolidayLibrary;
using Login.Application.Features.HolidayLibrary.Commands.UpdateHolidayLibrary;
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
    public class HolidayLibraryRepository : IHolidayLibrary
    {
        private IDapper _dapper;
        private ILogger<HolidayLibraryRepository> _Logger;

        public HolidayLibraryRepository(IDapper d, ILogger<HolidayLibraryRepository> l)
        {
            _Logger = l;
            _dapper = d;
        }

        public CreateHolidayLibraryResponse CreateHolidayLibrary(CreateHolidayLibraryCommand command)
        {
            string insertusersql = @"INSERT INTO [dbo].[HolidayLibrary]
           ([RepeatEveryCount]
           ,[RepeatEveryTimeline]
           ,[Expire]
           ,[Month]
           ,[DateOfMonth]
           ,[WeeekOfMonth]
           ,[DayOfWeek]
           ,[ObserveNumberOfDays]
           ,[AlternateObservation]
           ,[HolidayName]
            ,[ObservationDayMethod]
            ,[SoftwareName]
      OUTPUT inserted.HolidayId VALUES(@RepeatEveryCount,@RepeatEveryTimeline,@Expire,@Month,@DateOfMonth,@WeeekOfMonth,@DayOfWeek,
@ObserveNumberOfDays,@AlternateObservation,@HolidayName,@ObservationDayMethod,@SoftwareName); ";
            DynamicParameters uDataModel = new DynamicParameters();
            uDataModel.Add("RepeatEveryCount", command.RepeatEveryCount);
            uDataModel.Add("RepeatEveryTimeline", command.RepeatEveryTimeline);
            uDataModel.Add("Expire", command.Expire);
            uDataModel.Add("Month", command.Month);
            uDataModel.Add("DateOfMonth", command.DateOfMonth);
            uDataModel.Add("WeeekOfMonth", command.WeeekOfMonth);
            uDataModel.Add("DayOfWeek", command.DayOfWeek);
            uDataModel.Add("ObserveNumberOfDays", command.ObserveNumberOfDays);
            uDataModel.Add("AlternateObservation", command.AlternateObservation);
            uDataModel.Add("HolidayName", command.HolidayName);
            uDataModel.Add("ObservationDayMethod", command.ObservationDayMethod);
            uDataModel.Add("SoftwareName", command.SoftwareName);
            try
            {
                int holidayId = (int)_dapper.ExecuteScalar(insertusersql, uDataModel);
                return new CreateHolidayLibraryResponse
                {
                    HolidayLibraryId = holidayId
                };
            }
            catch (Exception e)
            {
                _Logger.LogInformation(e, e.Message);
                return null;
            }
        }

        public DeleteHolidayLibraryResponse DeleteHolidayLibrary(DeleteHolidayLibraryCommand commad)
        {
            string sql = "DELETE FROM [dbo].[WorkSchedule] WHERE Id = @Id";
            DynamicParameters uDataModel = new DynamicParameters();
            uDataModel.Add("Id", commad.HolidayLibraryId);
            try
            {
                _dapper.ExecuteScalar(sql, uDataModel, CommandType.Text);
                return new DeleteHolidayLibraryResponse
                {
                    Id = commad.HolidayLibraryId
                };
            }
            catch (Exception e)
            {
                _Logger.LogInformation(e, e.Message);
                return null;
            }

        }

        public List<GetHolidayLibraryResponse> GetHolidayLibraryByCompanyId(GetHolidayLibraryCommand command)
        {
            /* List<GetHolidayLibraryResponse> WorkResponse = _dapper.GetAll<GetHolidayLibraryResponse>($"SELECT * FROM [dbo].[HolidayLibrary] where CompanyId = {command.CompanyId}", null, commandType: CommandType.Text);*/
             List<GetHolidayLibraryResponse> WorkResponse = _dapper.GetAll<GetHolidayLibraryResponse>($"SELECT * FROM [dbo].[HolidayLibrary]", null, commandType: CommandType.Text);

            return WorkResponse;
        }

        public UpdateHolidayLibraryResponse UpdateHolidayLibrary(UpdateHolidayLibraryCommand command)
        {
            UpdateHolidayLibraryResponse WorkResponse = _dapper.Get<UpdateHolidayLibraryResponse>($"SELECT * FROM [dbo].[WorkSchedule] where Id = {command.Id}", null, commandType: CommandType.Text);
            string sqlCommand = "UPDATE [dbo].[WorkSchedule] SET WorkScheduleName=@Name, WorkingDays=@WorkingDays, NumberOfDays=@NumberOfDays,DayWeekStarts=@DayWeekStarts,TimeDayStarts=@TimeDayStarts,HoursWorking=@HoursWorking,IsImported=@IsImported WHERE Id=@Id";
            DynamicParameters uDataModel = new DynamicParameters();
            //uDataModel.Add("Name", command.WorkScheduleName != null ? command.WorkScheduleName : WorkResponse.WorkScheduleName);
            //uDataModel.Add("WorkingDays", command.WorkingDays != null ? command.WorkingDays : WorkResponse.WorkingDays);
            //uDataModel.Add("NumberOfDays", command.NumberOfDays != 0 ? command.NumberOfDays : WorkResponse.NumberOfDays);
            //uDataModel.Add("DayWeekStarts", command.DayWeekStarts != null ? command.DayWeekStarts : WorkResponse.DayWeekStarts);
            //uDataModel.Add("TimeDayStarts", command.TimeDayStarts != null ? command.TimeDayStarts : WorkResponse.TimeDayStarts);
            //uDataModel.Add("HoursWorking", command.HoursWorking != null ? command.HoursWorking : WorkResponse.HoursWorking);
            //uDataModel.Add("IsImported", command.IsImported != null ? command.IsImported : WorkResponse.IsImported);
            ////uDataModel.Add("CompanyId", command.CompanyId != 0 ? command.CompanyId : WorkResponse.CompanyId );
            uDataModel.Add("Id", command.Id);
            try
            {
                UpdateHolidayLibraryResponse result = _dapper.Update<UpdateHolidayLibraryResponse>(sqlCommand, uDataModel, CommandType.Text);
                return new UpdateHolidayLibraryResponse
                {
                    Id = command.Id
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
