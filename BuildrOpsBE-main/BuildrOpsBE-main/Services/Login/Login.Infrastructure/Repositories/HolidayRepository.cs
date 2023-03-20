using Login.Application.Contracts.Persistence;
using Login.Infrastructure.Dapper;
using Microsoft.Extensions.Logging;
using Login.Application.Features.Holiday.Commands.CreateHoliday;
using Login.Application.Features.Holiday.Commands.GetHoliday;
using Login.Application.Features.Holiday.Commands.UpdateHoliday;
using Login.Application.Features.Holiday.Commands.DeleteHoliday;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using BuildrOps.Application.Features.Holiday.Commands.PrepopulateCalenderificHoliday;
using BuildrOps.Application.Models;
using BuildrOps.Application.Contracts.Infrastructure;
using System.Globalization;

namespace Login.Infrastructure.Repositories
{
    public class HolidayRepository : IHoliday
    {
        private IDapper _dapper;
        private ILogger<HolidayRepository> _Logger;
        private ICalendarific _calendarific;

        public HolidayRepository(IDapper d, ILogger<HolidayRepository> l, ICalendarific calendarific)
        {
            _Logger = l;
            _dapper = d;
            _calendarific = calendarific;
        }

        public CreateHolidayResponse CreateHoliday(CreateHolidayCommand command)
        {
            string insertusersql = @"INSERT INTO [dbo].[Holiday]
           ([RepeatEveryCount]
           ,[RepeatEveryTimeline]
           ,[Expire]
           ,[Month]
           ,[DateOfMonth]
           ,[WeeekOfMonth]
           ,[DayOfWeek]
           ,[ObserveAsWorkDay]
           ,[ObserveNumberOfDays]
           ,[AlternateObservation]
           ,[HolidayName]
           ,[ObservationDayMethod]
           ,[CompanyId],[IsImported],[RuleSetting],[ExpiryYear],[ExpireEvent],[ObservedOn]
            ,[IsAdded]
            ,[IsLibrary])
      OUTPUT inserted.HolidayId VALUES(@RepeatEveryCount,@RepeatEveryTimeline,@Expire,@Month,@DateOfMonth,@WeeekOfMonth,@DayOfWeek,
@ObserveAsWorkDay,@ObserveNumberOfDays,@AlternateObservation,@HolidayName,@ObservationDayMethod,@CompanyId,@IsImported,@RuleSetting,@ExpiryYear
,@ExpireEvent,@ObservedOn,@IsAdded,@IsLibrary); ";
            DynamicParameters uDataModel = new DynamicParameters();
            uDataModel.Add("RepeatEveryCount", command.RepeatEveryCount);
            uDataModel.Add("RepeatEveryTimeline", command.RepeatEveryTimeline);
            uDataModel.Add("Expire", command.Expire);
            uDataModel.Add("Month", command.Month);
            uDataModel.Add("DateOfMonth", command.DateOfMonth);
            uDataModel.Add("WeeekOfMonth", command.WeeekOfMonth);
            uDataModel.Add("DayOfWeek", command.DayOfWeek);
            uDataModel.Add("ObserveAsWorkDay", command.ObserveAsWorkDay);
            uDataModel.Add("ObserveNumberOfDays", command.ObserveNumberOfDays);
            uDataModel.Add("AlternateObservation", command.AlternateObservation);
            uDataModel.Add("HolidayName", command.HolidayName);
            uDataModel.Add("ObservationDayMethod", command.ObservationDayMethod);
            uDataModel.Add("CompanyId", command.CompanyId);
            uDataModel.Add("IsImported", command.IsImported);
            uDataModel.Add("RuleSetting", command.RuleSetting);
            uDataModel.Add("ExpiryYear", command.ExpiryYear);
            uDataModel.Add("ExpireEvent", command.ExpireEvent);
            uDataModel.Add("ObservedOn", command.ObservedOn);
            uDataModel.Add("IsAdded", command.IsAdded);
            uDataModel.Add("IsLibrary", command.IsLibrary);
            try
            {
                int holidayId = (int)_dapper.ExecuteScalar(insertusersql, uDataModel);
                return new CreateHolidayResponse
                {
                    HolidayId = holidayId
                };
            }
            catch (Exception e)
            {
                _Logger.LogInformation(e, e.Message);
                return null;
            }
        }

        public DeleteHolidayResponse DeleteHoliday(DeleteHolidayCommand commad)
        {
            string sql = "DELETE FROM [dbo].[Holiday] WHERE HolidayId = @Id";
            DynamicParameters uDataModel = new DynamicParameters();
            uDataModel.Add("Id", commad.HolidayId);
            try
            {
                _dapper.ExecuteScalar(sql, uDataModel, CommandType.Text);
                return new DeleteHolidayResponse
                {
                    Id = commad.HolidayId
                };
            }
            catch (Exception e)
            {
                _Logger.LogInformation(e, e.Message);
                return null;
            }

        }

        public List<GetHolidayResponse> GetHolidayByCompanyId(GetHolidayCommand command)
        {
            List<GetHolidayResponse> WorkResponse = _dapper.GetAll<GetHolidayResponse>($"SELECT * FROM [dbo].[Holiday] where CompanyId = {command.CompanyId}", null, commandType: CommandType.Text);
            return WorkResponse;
        }

        public async Task<PrepopulateCalendarificResponse> PopulateHolidaysForCompany(PrepopulateCalendarificCommand command)
        {
            try
            {
                int currentyear = DateTime.Now.Year;
                string country = "US";
                string region = "US-OH";
                int numberOfPreviousYearsToConsider = 4;
                List<Dictionary<string, DateTime>> allHolidayData = new List<Dictionary<string, DateTime>>();
                List<GetHolidayResponse> companyHolidays = _dapper.GetAll<GetHolidayResponse>($"SELECT * FROM [dbo].[Holiday] where CompanyId = {command.CompanyId}", null, commandType: CommandType.Text);

                Dictionary<string, DateTime> curentholidayDict = new Dictionary<string, DateTime>();
                List<CalenderificHoliday> currentholidays = await _calendarific.GetAllCalendarificHolidays(country, region, (currentyear).ToString());
                foreach (CalenderificHoliday holiday in currentholidays)
                {
                    bool alreadyexists = companyHolidays.Exists(a => a.HolidayName == holiday.name);
                    if (!alreadyexists)
                    {
                        curentholidayDict[holiday.name] = new DateTime(holiday.date.datetime.year, holiday.date.datetime.month, holiday.date.datetime.day);
                    }
                }

                for (int i = 1; i < numberOfPreviousYearsToConsider; i++)
                {
                    Dictionary<string, DateTime> holidayDict = new Dictionary<string, DateTime>();
                    List<CalenderificHoliday> holidays = await _calendarific.GetAllCalendarificHolidays(country, region, (currentyear - i).ToString());
                    foreach (CalenderificHoliday holiday in holidays)
                    {
                        holidayDict[holiday.name] = new DateTime(holiday.date.datetime.year, holiday.date.datetime.month, holiday.date.datetime.day);
                    }
                    allHolidayData.Add(holidayDict);
                }
                foreach (KeyValuePair<string, DateTime> holiday in curentholidayDict)
                {
                    bool allonSameDate = true;
                    bool allinSameMonth = true;
                    bool allinSameWeek = true;
                    bool allonsamedayofweek = true;
                    bool allinlastweekofmonth = true;
                    DateTime currentHolidayDate = holiday.Value;
                    foreach (var previousHolidays in allHolidayData)
                    {
                        if (previousHolidays.ContainsKey(holiday.Key))
                        {
                            DateTime previousHolidayDate = previousHolidays[holiday.Key];
                            if (previousHolidayDate.Day != currentHolidayDate.Day)
                            {
                                allonSameDate = false;
                            }
                            if (previousHolidayDate.Month != currentHolidayDate.Month)
                            {
                                allinSameMonth = false;
                            }
                            if (GetWeekNumber(previousHolidayDate) != GetWeekNumber(currentHolidayDate))
                            {
                                if (!IsLastOfMonth(previousHolidayDate) || !IsLastOfMonth(currentHolidayDate))
                                {
                                    allinSameWeek = false;
                                    allinlastweekofmonth = false;
                                }
                            }
                            if (!IsLastOfMonth(previousHolidayDate) || !IsLastOfMonth(currentHolidayDate))
                            {
                                allinlastweekofmonth = false;
                            }
                            if (previousHolidayDate.DayOfWeek != currentHolidayDate.DayOfWeek)
                            {
                                allonsamedayofweek = false;
                            }
                        }
                        else
                        {
                            allonSameDate = false;
                            allinSameMonth = false;
                        }
                    }
                    CreateHolidayCommand createHolidayCommand = new CreateHolidayCommand();
                    createHolidayCommand.CompanyId = command.CompanyId;
                    createHolidayCommand.RuleSetting = "Standard Reoccurrence";
                    createHolidayCommand.ExpiryYear = "";
                    createHolidayCommand.ExpireEvent = "";
                    createHolidayCommand.ObservedOn = "1";
                    createHolidayCommand.IsAdded = true;
                    createHolidayCommand.IsLibrary = true;
                    if (allinSameMonth && allonSameDate)
                    {
                        //logic if all the holidays are in same date
                        createHolidayCommand.DateOfMonth = NumberWithSuffix(currentHolidayDate.Day);
                        createHolidayCommand.AlternateObservation = "Observes Saturday Holidays on previous day and Observes Sunday Holidays on next day.";
                        createHolidayCommand.DayOfWeek = "";
                        createHolidayCommand.Expire = "Never";
                        createHolidayCommand.HolidayName = holiday.Key;
                        createHolidayCommand.IsImported = true;
                        createHolidayCommand.Month = currentHolidayDate.ToString("MMMM");
                        createHolidayCommand.ObservationDayMethod = "Date";
                        createHolidayCommand.ObserveAsWorkDay = false;
                        createHolidayCommand.ObserveNumberOfDays = 1;
                        createHolidayCommand.RepeatEveryCount = 1;
                        createHolidayCommand.RepeatEveryTimeline = "Year";
                        createHolidayCommand.WeeekOfMonth = "";
                    }
                    else if (allinSameMonth && allinSameWeek && allonsamedayofweek)
                    {
                        //logic in all the holidays are in same week and on same day of week
                        createHolidayCommand.DateOfMonth = "";
                        createHolidayCommand.AlternateObservation = "Do not observe for Weekend";
                        createHolidayCommand.DayOfWeek = currentHolidayDate.DayOfWeek.ToString();
                        createHolidayCommand.Expire = "Never";
                        createHolidayCommand.HolidayName = holiday.Key;
                        createHolidayCommand.IsImported = true;
                        createHolidayCommand.Month = currentHolidayDate.ToString("MMMM");
                        createHolidayCommand.ObservationDayMethod = "Week";
                        createHolidayCommand.ObserveAsWorkDay = false;
                        createHolidayCommand.ObserveNumberOfDays = 1;
                        createHolidayCommand.RepeatEveryCount = 1;
                        createHolidayCommand.RepeatEveryTimeline = "Year";
                        if(allinlastweekofmonth)
                        {
                            createHolidayCommand.WeeekOfMonth = "Last";
                        }
                        else
                        {
                            createHolidayCommand.WeeekOfMonth = NumberWithSuffix(GetWeekNumber(currentHolidayDate));
                        }
                    }
                    else
                    {
                        //logic for default category

                        createHolidayCommand.DateOfMonth = "";
                        createHolidayCommand.AlternateObservation = "Observes Saturday Holidays on previous day and Observes Sunday Holidays on next day.";
                        createHolidayCommand.DayOfWeek = "";
                        createHolidayCommand.Expire = "Never";
                        createHolidayCommand.HolidayName = holiday.Key;
                        createHolidayCommand.IsImported = true;
                        createHolidayCommand.Month = currentHolidayDate.ToString("MMMM");
                        createHolidayCommand.ObservationDayMethod = "";
                        createHolidayCommand.ObserveAsWorkDay = false;
                        createHolidayCommand.ObserveNumberOfDays = 1;
                        createHolidayCommand.RepeatEveryCount = 1;
                        createHolidayCommand.RepeatEveryTimeline = "Year";
                        createHolidayCommand.WeeekOfMonth = "";
                    }
                    CreateHoliday(createHolidayCommand);
                }

                return new PrepopulateCalendarificResponse()
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new PrepopulateCalendarificResponse()
                {
                    Success = false
                };
            }
        }
        private static string NumberWithSuffix(int num)
        {
            if (num.ToString().EndsWith("11")) return num.ToString() + "th";
            if (num.ToString().EndsWith("12")) return num.ToString() + "th";
            if (num.ToString().EndsWith("13")) return num.ToString() + "th";
            if (num.ToString().EndsWith("1")) return num.ToString() + "st";
            if (num.ToString().EndsWith("2")) return num.ToString() + "nd";
            if (num.ToString().EndsWith("3")) return num.ToString() + "rd";
            return num.ToString() + "th";
        }
        private static bool IsLastOfMonth(DateTime date)
        {
            var oneWeekAfter = date.AddDays(7);
            return oneWeekAfter.Month != date.Month;
        }
        private static int GetWeekNumber(DateTime date)
        {
            date = date.Date;
            DateTime firstMonthDay = new DateTime(date.Year, date.Month, 1);
            DateTime firstMonthMonday = firstMonthDay.AddDays((DayOfWeek.Monday + 7 - firstMonthDay.DayOfWeek) % 7);
            if (firstMonthMonday > date)
            {
                firstMonthDay = firstMonthDay.AddMonths(-1);
                firstMonthMonday = firstMonthDay.AddDays((DayOfWeek.Monday + 7 - firstMonthDay.DayOfWeek) % 7);
            }
            return (date - firstMonthMonday).Days / 7 + 1;
        }

        public UpdateHolidayResponse UpdateHoliday(UpdateHolidayCommand command)
        {
            GetHolidayResponse WorkResponse = _dapper.Get<GetHolidayResponse>($"SELECT * FROM [dbo].[Holiday] where HolidayId = {command.HolidayId}", null, commandType: CommandType.Text);
            string sqlCommand = "UPDATE [dbo].[Holiday] SET RepeatEveryCount=@RepeatEveryCount, RepeatEveryTimeline=@RepeatEveryTimeline, Expire=@Expire," +
                "Month=@Month,DateOfMonth=@DateOfMonth,WeeekOfMonth=@WeeekOfMonth,DayOfWeek=@DayOfWeek," +
                "ObserveAsWorkDay=@ObserveAsWorkDay,AlternateObservation=@AlternateObservation,HolidayName=@HolidayName,ObservationDayMethod=@ObservationDayMethod,IsImported=@IsImported" +
                ",RuleSetting=@RuleSetting,ExpiryYear=@ExpiryYear,ExpireEvent=@ExpireEvent,ObservedOn=@ObservedOn,IsAdded=@IsAdded,ObserveNumberOfDays=@ObserveNumberOfDays" +
                ",IsLibrary=@IsLibrary WHERE HolidayId=@Id";
            DynamicParameters uDataModel = new DynamicParameters();
            uDataModel.Add("RepeatEveryCount", command.RepeatEveryCount != 0 ? command.RepeatEveryCount : WorkResponse.RepeatEveryCount);
            uDataModel.Add("RepeatEveryTimeline", command.RepeatEveryTimeline?? WorkResponse.RepeatEveryTimeline);
            uDataModel.Add("Expire", command.Expire??WorkResponse.Expire);
            uDataModel.Add("Month", command.Month ??WorkResponse.Month);
            uDataModel.Add("DateOfMonth", command.DateOfMonth ??WorkResponse.DateOfMonth);
            uDataModel.Add("WeeekOfMonth", command.WeeekOfMonth?? WorkResponse.WeeekOfMonth);
            uDataModel.Add("DayOfWeek", command.DayOfWeek ??WorkResponse.DayOfWeek);
            uDataModel.Add("ObserveAsWorkDay", command.ObserveAsWorkDay ?? WorkResponse.ObserveAsWorkDay);
            uDataModel.Add("AlternateObservation", command.AlternateObservation ?? WorkResponse.AlternateObservation);
            uDataModel.Add("HolidayName", command.HolidayName ?? WorkResponse.HolidayName);
            uDataModel.Add("ObservationDayMethod", command.ObservationDayMethod ?? WorkResponse.ObservationDayMethod);
            uDataModel.Add("AlternateObservation", command.AlternateObservation ?? WorkResponse.AlternateObservation);
            uDataModel.Add("Id", command.HolidayId);
            uDataModel.Add("IsImported", command.IsImported??WorkResponse.IsImported);
            uDataModel.Add("RuleSetting", command.RuleSetting ??WorkResponse.RuleSetting);
            uDataModel.Add("ExpiryYear", command.ExpiryYear ?? WorkResponse.ExpiryYear);
            uDataModel.Add("ExpireEvent", command.ExpireEvent ?? WorkResponse.ExpireEvent);
            uDataModel.Add("ObservedOn", command.ObservedOn ?? WorkResponse.ObservedOn);
            uDataModel.Add("IsAdded", command.IsAdded ?? WorkResponse.IsAdded);
            uDataModel.Add("IsLibrary", command.IsLibrary ?? WorkResponse.IsLibrary);
            uDataModel.Add("ObserveNumberOfDays", command.ObserveNumberOfDays ?? WorkResponse.ObserveNumberOfDays);
            try
            {
                UpdateHolidayResponse result = _dapper.Update<UpdateHolidayResponse>(sqlCommand, uDataModel, CommandType.Text);
                return new UpdateHolidayResponse
                {
                    Id = command.HolidayId
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
