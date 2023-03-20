using Dapper;
using Login.Application.Contracts.Persistence;
using Login.Application.Features.Settings.Command.CreateSetting;
using Login.Application.Features.Settings.Command.CreateSettingOption;
using Login.Application.Features.Settings.Command.GetSettingOption;
using Login.Application.Features.Settings.Command.GetSettingOptionByName;
using Login.Application.Features.Settings.Command.GetSettingOptionRoute;
using Login.Application.Features.Settings.Command.GetSettinOptionRouteByOptionValue;
using Login.Application.Models;
using Login.Domain.Entities;
using Login.Infrastructure.Dapper;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login.Infrastructure.Repositories
{
    public class SettingsRepository : ISettings
    {
        private IDapper _dapper;
        private ILogger<SettingsRepository> _Logger;

        public SettingsRepository(IDapper dapper,ILogger<SettingsRepository> logger)
        {
            _dapper = dapper;
            _Logger = logger;
        }
        public CreateSettingOptionResponse CreateOptionSetting(CreateSettingOptionCommand command)
        {
            string sql = "INSERT INTO [dbo].[SettingOptions] ([SettingId],[OptionValue],[OptionSequence]) " +
                    "OUTPUT inserted.Id VALUES(@SettingId,@OptionValue,@OptionSequence);";
            DynamicParameters uDataModel = new DynamicParameters();
            uDataModel.Add("SettingId", command.SettingId);
            uDataModel.Add("OptionValue", command.OptionValue);
            uDataModel.Add("OptionSequence", command.OptionSequence);
            try {
                int SettingOptionId = (int)_dapper.ExecuteScalar(sql, uDataModel);
                return new CreateSettingOptionResponse
                {
                    SettingOptionId = SettingOptionId
                };
            }
            catch(Exception e) 
            {
                _Logger.LogInformation(e,e.Message);
                return null;
            }
        }

        public CreateSettingCommandResponse CreateSetting(CreateSettingCommand command)
        {
            string sql = "INSERT INTO [dbo].[Setting] ([SettingName],[SettingType],[SettingLevel],[DataType],[SettingSequence],[CreatedOn]) " +
                    "OUTPUT inserted.Id VALUES(@SettingName,@SettingType,@SettingLevel,@DataType,@SettingSequence,@CreatedOn);";
            DynamicParameters uDataModel = new DynamicParameters();
            uDataModel.Add("SettingName", command.SettingName);
            uDataModel.Add("SettingType", command.SettingType);
            uDataModel.Add("SettingLevel", command.SettingLevel);
            uDataModel.Add("DataType", command.DataType);
            uDataModel.Add("SettingSequence", command.SettingSequence);
            uDataModel.Add("CreatedOn", DateTime.Now);
            try
            {
                int SettingId = (int)_dapper.ExecuteScalar(sql, uDataModel);
                return new CreateSettingCommandResponse
                {
                    SettingId = SettingId
                };
            }
            catch(Exception e)
            {
                _Logger.LogInformation(e, e.Message);
                return null;
            }
        }

        public List<GetSettingOptionResponse> GetSettingBySettingType(GetSettingOptionCommand command)
        {
            DynamicParameters uDataModel = new DynamicParameters();
            uDataModel.Add("SettingType", command.SettingType);
            List<SettingDataModel> settingDatas = _dapper.GetAll<SettingDataModel>($"SELECT * FROM [dbo].[Setting] where SettingType=@SettingType", uDataModel, System.Data.CommandType.Text);
            List<GetSettingOptionResponse> responses = new List<GetSettingOptionResponse>();
            foreach(SettingDataModel d in settingDatas)
            {
                List<SettingOptions> settingOptions = _dapper.GetAll<SettingOptions>($"SELECT * FROM [dbo].[SettingOptions] where SettingId = {d.Id}", null, System.Data.CommandType.Text);
                responses.Add(new GetSettingOptionResponse
                {
                    Id = d.Id,
                    SettingName = d.SettingName,
                    SettingType = d.SettingType,
                    SettingLevel = d.SettingLevel,
                    DataType = d.DataType,
                    SettingSequence = d.SettingSequence,
                    SettingOptions = settingOptions
                });
            }
            return responses;
        }

        public GetSettingOptionByNameResponse GetSettingBySettingTypeAndName(GetSettingOptionByNameCommand command)
        {
            SettingDataModel settingData = GetSettingByTypeAndName(command.SettingType, command.SettingName);
            List<SettingOptions> settingOptions = GetSettingOptionsBySettingId(settingData.Id);
            List<SettingOptions> userSettingOptions = GetUserSettingsValuesBySettingId(settingData.Id, command.UserId);
            settingOptions.AddRange(userSettingOptions);
            GetSettingOptionByNameResponse responses = new GetSettingOptionByNameResponse
            {
                Id = settingData.Id,
                SettingName = settingData.SettingName,
                SettingType = settingData.SettingType,
                SettingLevel = settingData.SettingLevel,
                DataType = settingData.DataType,
                SettingSequence = settingData.SettingSequence,
                SettingOptions = settingOptions
            };
            
            return responses;
        }
        private SettingDataModel GetSettingByTypeAndName(string settingType,string settingName)
        {
            DynamicParameters uDataModel = new DynamicParameters();
            uDataModel.Add("SettingType", settingType);
            uDataModel.Add("SettingName", settingName);
            SettingDataModel settingData = _dapper.Get<SettingDataModel>($"SELECT * FROM [dbo].[Setting] where SettingType=@SettingType and SettingName=@SettingName", uDataModel, System.Data.CommandType.Text);
            return settingData;

        }
        private List<SettingOptions> GetSettingOptionsBySettingId(int settingId)
        {
            return _dapper.GetAll<SettingOptions>($"SELECT * FROM [dbo].[SettingOptions] where SettingId = {settingId} ", null, System.Data.CommandType.Text);

        }
        private List<SettingOptions>GetUserSettingsValuesBySettingId(int settingId,int userId)
        {
            return _dapper.GetAll<SettingOptions>($"SELECT Id,SettingId,SelectedValue as OptionValue,[Sequence] as OptionSequence FROM [dbo].[UserSettingValues] where SettingId = {settingId} and userId={userId} ", null, System.Data.CommandType.Text);
        }
        public List<GetSettingOptionRouteResponse> GetSettingOptionRoute(GetSettingOptionRouteCommand command)
        {

            SettingDataModel settingData = GetSettingByTypeAndName(command.SettingType, command.SettingName);
            List<SettingOptions> settingOptions = GetSettingOptionsBySettingId(settingData.Id);
            List<GetSettingOptionRouteResponse> optionRouteResponses = new List<GetSettingOptionRouteResponse>();
            foreach(var settingoption in settingOptions)
            {
                GetSettingOptionRouteResponse option = new GetSettingOptionRouteResponse()
                {
                    SettingId = settingoption.SettingId,
                    OptionSequence = settingoption.OptionSequence,
                    Id = settingoption.Id,
                    OptionValue = settingoption.OptionValue
                };
                option.Route= _dapper.Get<SettingOptionRoute>($"select * from dbo.SettingOptionRoute where SettingOptionId ={option.Id}", null, System.Data.CommandType.Text);
                optionRouteResponses.Add(option);
            }
            return optionRouteResponses;
        }

        public GetSettingOptionRouteByOptionValueResponse GetSettingOptionRouteByOptionValue(GetSettingOptionRouteByOptionValueCommand command)
        {

            
            SettingDataModel settingData = GetSettingByTypeAndName(command.SettingType, command.SettingName);
            DynamicParameters uDataModel = new DynamicParameters();
            uDataModel.Add("OptionValue", command.OptionValue);
            uDataModel.Add("SettingId", settingData.Id);

            SettingOptions settingOption = _dapper.Get<SettingOptions>($"SELECT * FROM [dbo].[SettingOptions] where SettingId = @SettingId and OptionValue=@OptionValue", uDataModel, System.Data.CommandType.Text);
            
            SettingOptionRoute settingOptionRoute = _dapper.Get<SettingOptionRoute>($"select * from dbo.SettingOptionRoute where SettingOptionId ={settingOption.Id}", null, System.Data.CommandType.Text);
           
            return new GetSettingOptionRouteByOptionValueResponse() {
                DoubleClickRoute= settingOptionRoute.DoubleClickRoute,
                SingleClickRoute= settingOptionRoute.SingleClickRoute,
                RightClickRoute= settingOptionRoute.RightClickRoute
            };
        }
    }
}
