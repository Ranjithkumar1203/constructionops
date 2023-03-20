using Dapper;
using Login.Application.Contracts.Persistence;
using Login.Application.Features.WorkLibrary.Commands.CreateWorkScheduleLibrary;
using Login.Application.Features.WorkLibrary.Commands.DeleteWorkSchduleLibrary;
using Login.Application.Features.WorkLibrary.Commands.GetWorkScheduleLibrary;
using Login.Application.Features.WorkLibrary.Commands.UpdateWorkSchduleLibrary;
using Login.Application.Features.WorkScheduele.Commands.GetWorkSchedule;
using Login.Domain.Entities;
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
    public class WorkSchduleLibraryRepository : IWorkScheduleLibrary
    {
        private IDapper _dapper;
        private ILogger<WorkSchduleLibraryRepository> _Logger;
        public WorkSchduleLibraryRepository(IDapper d,ILogger<WorkSchduleLibraryRepository> l)
        {
            _Logger = l;
            _dapper = d;
        }

        public CreateWorkScheduleLibraryResponse CreateWorkScheduleLibrary(CreateWorkScheduleLibraryCommand command)
        {
            string insertusersql = "INSERT INTO [dbo].[WorkScheduleLibrary] ([LibraryName],[WorkingDays],[NumberOfDays],[SoftwareName],[WeekStart],[DayStart],[HoursWorked],[LunchBreak]) " +
                    "OUTPUT inserted.Id VALUES(@LibraryName,@WorkingDays,@NumberOfDays,@SoftwareName,@WeekStart,@DayStart,@HoursWorked,@LunchBreak); ";
            DynamicParameters uDataModel = new DynamicParameters();
            uDataModel.Add("LibraryName", command.LibraryName);
            uDataModel.Add("WorkingDays", command.WorkingDays);
            uDataModel.Add("NumberOfDays", command.NumberOfDays);
            uDataModel.Add("SoftwareName", command.SoftwareName);
            uDataModel.Add("WeekStart", command.WeekStart);
            uDataModel.Add("DayStart", command.DayStart);
            uDataModel.Add("HoursWorked", command.HoursWorked);
            uDataModel.Add("LunchBreak", command.LunchBreak);


            try
            {
                int workScheduleLibraryId = (int)_dapper.ExecuteScalar(insertusersql, uDataModel);
                return new CreateWorkScheduleLibraryResponse
                {
                    Id = workScheduleLibraryId
                };
            }
            catch (Exception e)
            {
                _Logger.LogInformation(e, e.Message);
                return null;
            }
        }

        public DeleteWorkScheduleLibraryResponse DeleteWorkSchduleLibrary(DeleteWorkScheduleLibraryCommand command)
        {
            string sql = "DELETE FROM [dbo].[WorkScheduleLibrary] WHERE Id = @Id";
            DynamicParameters uDataModel = new DynamicParameters();
            uDataModel.Add("Id", command.LibraryId);
            try
            {
                _dapper.ExecuteScalar(sql, uDataModel, CommandType.Text);
                return new DeleteWorkScheduleLibraryResponse
                {
                    LibraryId = command.LibraryId
                };
            }
            catch (Exception e)
            {
                _Logger.LogInformation(e, e.Message);
                return null;
            }
        }

       /* public GetWorkScheduleLibraryResponse GetWorkScheduleLibraryById(GetWorkScheduleLibraryCommand command)
        {
          WorkScheduleLibraryDataModel scheduleLibraryDataModel =  _dapper.Get<WorkScheduleLibraryDataModel>($"SELECT * FROM [dbo].[WorkScheduleLibrary]", null, commandType: CommandType.Text);
          *//*  List<WorkScheduleResponse> workScheduleResponses =   _dapper.GetAll<WorkScheduleResponse>($"SELECT * FROM [dbo].[WorkSchedule] where LibraryId = {scheduleLibraryDataModel.Id}", null, commandType: CommandType.Text);*//*
            return new GetWorkScheduleLibraryResponse { 
                Id = scheduleLibraryDataModel.Id ,
                LibraryName = scheduleLibraryDataModel.LibraryName,
              
                WorkingDays = scheduleLibraryDataModel.WorkingDays,
                NumberOfDays = scheduleLibraryDataModel.NumberOfDays
            };
        }*/

        public UpdateWorkScheduleLibraryResponse UpdateWorkScheduleLibrary(UpdateWorkSchduleLibraryCommand command)
        {
            WorkScheduleLibraryDataModel scheduleLibraryDataModel = _dapper.Get<WorkScheduleLibraryDataModel>($"SELECT * FROM [dbo].[WorkScheduleLibrary] where Id = {command.LibraryId}", null, commandType: CommandType.Text);
            string sqlCommand = "UPDATE [dbo].[WorkScheduleLibrary] SET LibraryName=@LibraryName , WorkingDays=@WorkingDays , NumberOfDays=@NumberOfDays, SoftwareName=@SoftwareName, WeekStart=@WeekStart, DayStart=@DayStart, HoursWorked=@HoursWorked, LunchBreak=@LunchBreak WHERE Id=@Id";
            DynamicParameters uDataModel = new DynamicParameters();
            uDataModel.Add("Id", command.LibraryId);
            uDataModel.Add("NumberOfDays", command.NumberOfDays != 0 ? command.NumberOfDays : scheduleLibraryDataModel.NumberOfDays);
            uDataModel.Add("WorkingDays", command.WorkingDays != null ? command.WorkingDays : scheduleLibraryDataModel.WorkingDays);
            uDataModel.Add("SoftwareName", command.SoftwareName != null ? command.SoftwareName : scheduleLibraryDataModel.SoftwareName);
            uDataModel.Add("LibraryName", command.LibraryName != null ? command.LibraryName : scheduleLibraryDataModel.LibraryName);
            uDataModel.Add("WeekStart", command.WeekStart != null ? command.WeekStart : scheduleLibraryDataModel.WeekStart);
            uDataModel.Add("DayStart", command.DayStart != null ? command.DayStart : scheduleLibraryDataModel.DayStart);
            uDataModel.Add("HoursWorked", command.HoursWorked);
            uDataModel.Add("LunchBreak", command.LunchBreak);
            try
            {
                _dapper.Update<UpdateWorkScheduleLibraryResponse>(sqlCommand, uDataModel, CommandType.Text);
                return new UpdateWorkScheduleLibraryResponse
                {
                    Id = command.LibraryId
                };
            }
            catch (Exception e)
            {
                _Logger.LogInformation(e, e.Message);
                return null;
            }
        }

        public  List<GetWorkScheduleLibraryResponse> GetWorkScheduleLibraryById(GetWorkScheduleLibraryCommand command)
        {
            var scheduleLibraryDataModel = _dapper.GetAll<GetWorkScheduleLibraryResponse>($"SELECT * FROM [dbo].[WorkScheduleLibrary]", null, commandType: CommandType.Text);
            return  scheduleLibraryDataModel;
        }
    }
}
