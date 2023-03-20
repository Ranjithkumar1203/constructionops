using Dapper;
using Login.Application.Contracts.Persistence;
using Login.Application.Features.WorkScheduele.Commands.CreateWorkSchdule;
using Login.Application.Features.WorkScheduele.Commands.DeleteWorkSchedule;
using Login.Application.Features.WorkScheduele.Commands.GetWorkSchedule;
using Login.Application.Features.WorkScheduele.Commands.UpdateWorkSchedule;
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
    class WorkSchduleRepository : IWorkSchedule
    {
        private IDapper _dapper;
        private ILogger<WorkSchduleRepository> _Logger;

        public WorkSchduleRepository(IDapper d , ILogger<WorkSchduleRepository> l)
        {
            _Logger = l;
            _dapper = d;
        }

        public CreateWorkSchduleResponse CreateWorkSchdule(CreateWrokScheduleCommand command)
        {
            string insertusersql = "INSERT INTO [dbo].[WorkSchedule] ([WorkingDays],[WorkScheduleName],[NumberOfDays],[CompanyId],[CreatedOn],[DayWeekStarts],[TimeDayStarts],[HoursWorking],[IsLibraryId],[IsImported],[IsLibrary],[Checked]) " +
                    "OUTPUT inserted.Id VALUES(@WorkingDays,@WorkScheduleName,@NumberOfDays,@CompanyId,@CreatedOn,@DayWeekStarts,@TimeDayStarts,@HoursWorking,@IsLibraryId,@IsImported,@IsLibrary,@Checked); ";
            DynamicParameters uDataModel = new DynamicParameters();
            uDataModel.Add("WorkingDays",command.WorkingDays);
            uDataModel.Add("WorkScheduleName",command.WorkScheduleName);
            uDataModel.Add("NumberOfDays",command.NumberOfDays);
            uDataModel.Add("CompanyId",command.CompanyId);
            uDataModel.Add("CreatedOn",DateTime.Now);
            uDataModel.Add("DayWeekStarts", command.DayWeekStarts);
            uDataModel.Add("TimeDayStarts", command.TimeDayStarts );
            uDataModel.Add("HoursWorking", command.HoursWorking);
            uDataModel.Add("IsImported", command.IsImported);
            uDataModel.Add("IsLibrary", command.IsLibrary);
            uDataModel.Add("Checked", command.Checked);
            uDataModel.Add("IsLibraryId", command.IsLibraryId);
            try {
                int workScheduleId =  (int)_dapper.ExecuteScalar(insertusersql, uDataModel);
                return new CreateWorkSchduleResponse
                {
                    Id = workScheduleId
                };
            }
            catch(Exception e)
            {
                _Logger.LogInformation(e, e.Message);
                return null;
            }
        }

        public DeleteWorkCommandResponse DeleteSchduleWork(DeleteWorkCommad commad)
        {
            string sql = "DELETE FROM [dbo].[WorkSchedule] WHERE Id = @Id";
            DynamicParameters uDataModel = new DynamicParameters();
            uDataModel.Add("Id", commad.WorkScheduleId);
            try
            {
                _dapper.ExecuteScalar(sql, uDataModel,CommandType.Text);
                return new DeleteWorkCommandResponse
                {
                    Id = commad.WorkScheduleId
                };
            }catch(Exception e)
            {
                _Logger.LogInformation(e, e.Message);
                return null;
            }

        }

        public List<WorkScheduleResponse> GetScheduleByCompanyId(WorkSchduleCommand command)
        {
            List<WorkScheduleResponse> WorkResponse = _dapper.GetAll<WorkScheduleResponse>($"SELECT * FROM [dbo].[WorkSchedule] where CompanyId = {command.CompanyId}", null, commandType: CommandType.Text);
            return WorkResponse;
        }

        public UpdateWorkScheduleResponse UpdateWorkSchedule(UpdateWorkScheduleCommand command)
        {
            WorkScheduleResponse WorkResponse = _dapper.Get<WorkScheduleResponse>($"SELECT * FROM [dbo].[WorkSchedule] where Id = {command.Id}", null, commandType: CommandType.Text);
            string sqlCommand = "UPDATE [dbo].[WorkSchedule] SET WorkScheduleName=@Name, WorkingDays=@WorkingDays, NumberOfDays=@NumberOfDays,Checked=@Checked,DayWeekStarts=@DayWeekStarts,TimeDayStarts=@TimeDayStarts,HoursWorking=@HoursWorking,IsImported=@IsImported,IsLibraryId=@IsLibraryId,IsLibrary=@IsLibrary WHERE Id=@Id";
            DynamicParameters uDataModel = new DynamicParameters();
            uDataModel.Add("Name", command.WorkScheduleName !=  null ? command.WorkScheduleName : WorkResponse.WorkScheduleName);
            uDataModel.Add("WorkingDays", command.WorkingDays != null ? command.WorkingDays :  WorkResponse.WorkingDays);
            uDataModel.Add("NumberOfDays", command.NumberOfDays != 0 ? command.NumberOfDays : WorkResponse.NumberOfDays);
            uDataModel.Add("DayWeekStarts", command.DayWeekStarts != null ? command.DayWeekStarts : WorkResponse.DayWeekStarts);
            uDataModel.Add("TimeDayStarts", command.TimeDayStarts != null ? command.TimeDayStarts : WorkResponse.TimeDayStarts);
            uDataModel.Add("HoursWorking", command.HoursWorking != null ? command.HoursWorking : WorkResponse.HoursWorking);
            uDataModel.Add("IsImported", command.IsImported != null ? command.IsImported : WorkResponse.IsImported);
            uDataModel.Add("IsLibrary", command.IsLibrary != null ? command.IsLibrary : WorkResponse.IsLibrary);
            uDataModel.Add("Checked", command.Checked != null ? command.Checked : WorkResponse.Checked);
            uDataModel.Add("IsLibraryId", command.IsLibraryId);
            //uDataModel.Add("CompanyId", command.CompanyId != 0 ? command.CompanyId : WorkResponse.CompanyId );
            uDataModel.Add("Id", command.Id);
            try
            {
               UpdateWorkScheduleCommand result =  _dapper.Update<UpdateWorkScheduleCommand>(sqlCommand, uDataModel, CommandType.Text);
                return new UpdateWorkScheduleResponse
                {
                    Id = command.Id
                };
            }catch(Exception e)
            {
                _Logger.LogInformation(e, e.Message);
                return null;
            }
        }
    }
}
