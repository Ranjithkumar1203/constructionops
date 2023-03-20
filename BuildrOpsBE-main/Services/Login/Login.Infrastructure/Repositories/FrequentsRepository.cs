using BuildrOps.Application.Contracts.Persistence;
using BuildrOps.Application.Features.Frequents.Command.GetFrequents;
using BuildrOps.Application.Features.Frequents.Command.InsertOrUpdateFrequents;
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
    public class FrequentsRepository : IFrequents
    {
        private IDapper _dapper;
        private ILogger<FrequentsRepository> _Logger;

        public FrequentsRepository(IDapper d, ILogger<FrequentsRepository> l)
        {
            _Logger = l;
            _dapper = d;
        }

        public InsertOrUpdateFrequentsResponse InsertOrUpdateFrequents(InsertOrUpdateFrequentsCommand command)
        {
            DynamicParameters ugetDataModel = new DynamicParameters();
            ugetDataModel.Add("UserId", command.UserId);
            ugetDataModel.Add("SingleClickRoute", command.FrequentRoute);
            ugetDataModel.Add("SettingName",command.SettingName);
            ugetDataModel.Add("SettingType",command.SettingType);

            GetFrequentsResponse frequentsResponse =  _dapper.Get<GetFrequentsResponse>($"select UserFrequentId,SO.id as SettingOptionId,UF.NumberOfVisits as FrequentOrder " +
     $"from UserFrequent UF inner join SettingOptionRoute SOR on SOR.SettingOptionId=UF.SettingOptionId inner join SettingOptions SO on SO.Id = SOR.SettingOptionId inner join Setting S on S.id = SO.SettingId " +
     $"where UserId = @UserId and SOR.SingleClickRoute = @SingleClickRoute and S.SettingName = @SettingName and S.SettingType = @SettingType ", ugetDataModel, commandType: CommandType.Text);
            string sqlCommand = "";
            DynamicParameters uDataModel = new DynamicParameters();
            if (frequentsResponse!=null)
            {
                uDataModel.Add("UserFrequentId", frequentsResponse.UserFrequentId);
                uDataModel.Add("NumberOfVisits", frequentsResponse.FrequentOrder + 1);
                sqlCommand = "update UserFrequent set NumberOfVisits = @NumberOfVisits,ModifiedOn=getdate() OUTPUT inserted.UserFrequentId where UserFrequentId = @UserFrequentId";                
            }
            else
            {
                GetFrequentsResponse settingOption = _dapper.Get<GetFrequentsResponse>(@"select SO.id SettingOptionId from SettingOptionRoute SOR 
    inner join SettingOptions SO on SO.Id = SOR.SettingOptionId inner join Setting S on S.id = SO.SettingId where SOR.SingleClickRoute = @SingleClickRoute and 
    S.SettingName = @SettingName and S.SettingType = @SettingType ", ugetDataModel, commandType: CommandType.Text);

                uDataModel.Add("UserId", command.UserId);
                uDataModel.Add("SettingOptionId", settingOption.SettingOptionId);

                sqlCommand = @"INSERT INTO [dbo].[UserFrequent]
           ([UserId]
           ,[SettingOptionId]
           ,[NumberOfVisits]
           ,[CreatedOn]
           ,[ModifiedOn]) OUTPUT inserted.UserFrequentId values(@UserId,@SettingOptionId,1,getdate(),getdate())";
            }
           
           
            
            try
            {
                int FrequentsId = (int)_dapper.ExecuteScalar(sqlCommand, uDataModel);
                return new InsertOrUpdateFrequentsResponse
                {
                    FrequentUserId = FrequentsId
                };
            }
            catch (Exception e)
            {
                _Logger.LogInformation(e, e.Message);
                return null;
            }
        }

       

        public List<GetFrequentsResponse> GetFrequents(GetFrequentsCommand command)
        {
            List<GetFrequentsResponse> WorkResponse = _dapper.GetAll<GetFrequentsResponse>($"select UserFrequentId,SOR.SingleClickRoute as FrequentRoute,SO.OptionValue as FrequentName,ROW_NUMBER() OVER (ORDER BY UF.NumberOfVisits) as FrequentOrder " +
                $"from UserFrequent UF inner join SettingOptionRoute SOR on SOR.SettingOptionId=UF.SettingOptionId inner join SettingOptions SO on " +
                $"SO.Id = SOR.SettingOptionId where UserId = { command.UserId} order by UF.NumberOfVisits", null, commandType: CommandType.Text);

            return WorkResponse;
        }

    }
}