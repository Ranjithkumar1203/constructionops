using Dapper;
using Login.Application.Contracts.Persistence;
using Login.Application.Features.UserSettings.Command.CreateUserSettingValue;
using Login.Application.Features.UserSettings.Command.DeleteUserSettingValue;
using Login.Application.Features.UserSettings.Command.GetUserSettingValue;
using Login.Application.Features.UserSettings.Command.UpdateUserSettingValue;
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
    class UserSettingRepository : IUserSetting
    {
        private IDapper _dapper;
        private ILogger<UserSettingRepository> _Logger;

        public UserSettingRepository(IDapper d, ILogger<UserSettingRepository> l)
        {
            _Logger = l;
            _dapper = d;
        }

        public CreateUserSettingResponse CreateUserSetting(CreateUserSettingCommand command)
        {
            DynamicParameters uDataModelGetuserSetting = new DynamicParameters();
            uDataModelGetuserSetting.Add("UserId", command.UserId);
            uDataModelGetuserSetting.Add("SettingId", command.SettingId);

            GetUserSettingResponse getsetting = new GetUserSettingResponse();
            if (command.SelectedValue == null)
            {
                uDataModelGetuserSetting.Add("Sequence", command.Sequence);
                getsetting = _dapper.Get<GetUserSettingResponse>($"SELECT * FROM [dbo].[UserSettingValues] where UserId = @UserId and SettingId=@SettingId and Sequence=@Sequence", uDataModelGetuserSetting, commandType: CommandType.Text);
            }
            else
            {
                uDataModelGetuserSetting.Add("SelectedValue", command.SelectedValue);
                getsetting = _dapper.Get<GetUserSettingResponse>($"SELECT * FROM [dbo].[UserSettingValues] where UserId = @UserId and SettingId=@SettingId and SelectedValue=@SelectedValue", uDataModelGetuserSetting, commandType: CommandType.Text);
            }
            if (getsetting == null)
            {
                string insertusersql = @"INSERT INTO [dbo].[UserSettingValues]
           ([SettingId]
           ,[UserId]
           ,[SelectedValue]
           ,[CreatedOn]
           ,[Sequence])
      OUTPUT inserted.Id VALUES(@SettingId,@UserId,@SelectedValue,@CreatedOn,@Sequence); ";
                DynamicParameters uDataModel = new DynamicParameters();
                uDataModel.Add("SettingId", command.SettingId);
                uDataModel.Add("UserId", command.UserId);
                uDataModel.Add("SelectedValue", command.SelectedValue);
                uDataModel.Add("CreatedOn", DateTime.Now);
                uDataModel.Add("Sequence", command.Sequence);
                try
                {
                    int UserSettingId = (int)_dapper.ExecuteScalar(insertusersql, uDataModel);
                    return new CreateUserSettingResponse
                    {
                        Id = UserSettingId,
                        SelectedValue = command.SelectedValue,
                        Sequence = command.Sequence,
                        SettingId = command.SettingId
                    };
                }
                catch (Exception e)
                {
                    _Logger.LogInformation(e, e.Message);
                    return null;
                }
            }
            else
            {
                return new CreateUserSettingResponse
                {
                    Id = getsetting.Id
                };
            }
        }

        public DeleteUserSettingResponse DeleteUserSetting(DeleteUserSettingCommand commad)
        {
            string sql = "DELETE FROM [dbo].[UserSettingValues] WHERE Id = @Id";
            DynamicParameters uDataModel = new DynamicParameters();
            uDataModel.Add("Id", commad.Id);
            try
            {
                _dapper.ExecuteScalar(sql, uDataModel, CommandType.Text);
                return new DeleteUserSettingResponse
                {
                    Id = commad.Id
                };
            }
            catch (Exception e)
            {
                _Logger.LogInformation(e, e.Message);
                return null;
            }

        }

        public List<GetUserSettingResponse> GetUserSettingBySettingName(GetUserSettingCommand command)
        {
            DynamicParameters uDataModelGetSetting = new DynamicParameters();
            uDataModelGetSetting.Add("SettingType", command.SettingType);
            uDataModelGetSetting.Add("SettingName", command.SettingName);
            SettingDataModel settingDatas = _dapper.Get<SettingDataModel>($"SELECT * FROM [dbo].[Setting] where SettingType=@SettingType and SettingName=@SettingName", uDataModelGetSetting, System.Data.CommandType.Text);
            DynamicParameters uDataModelGetuserSetting = new DynamicParameters();
            uDataModelGetuserSetting.Add("UserId", command.UserId);
            if (settingDatas!=null)
            {
                uDataModelGetuserSetting.Add("SettingId", settingDatas.Id);
            }
            List<GetUserSettingResponse> WorkResponse = _dapper.GetAll<GetUserSettingResponse>($"SELECT * FROM [dbo].[UserSettingValues] where UserId = @UserId and SettingId=@SettingId", uDataModelGetuserSetting, commandType: CommandType.Text);


            return WorkResponse;
        }

        public UpdateUserSettingResponse UpdateUserSetting(UpdateUserSettingCommand command)
        {
            GetUserSettingResponse WorkResponse = _dapper.Get<GetUserSettingResponse>($"SELECT * FROM [dbo].[UserSettingValues] where Id = {command.Id}", null, commandType: CommandType.Text);
            string sqlCommand = "UPDATE [dbo].[UserSettingValues] SET SelectedValue=@SelectedValue, [Sequence]=@Sequence, [ModifiedOn]=@ModifiedOn WHERE Id=@Id";
            DynamicParameters uDataModel = new DynamicParameters();
            uDataModel.Add("SelectedValue", command.SelectedValue != null ? command.SelectedValue : WorkResponse.SelectedValue);
            uDataModel.Add("Sequence", command.Sequence != 0 ? command.Sequence : WorkResponse.Sequence);
            uDataModel.Add("ModifiedOn", DateTime.Now);

            uDataModel.Add("Id", command.Id);

            try
            {
                UpdateUserSettingResponse result = _dapper.Update<UpdateUserSettingResponse>(sqlCommand, uDataModel, CommandType.Text);
                return new UpdateUserSettingResponse
                {
                    Id = command.Id,
                    SelectedValue=command.SelectedValue,
                    Sequence=command.Sequence,
                    SettingId=command.SettingId
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