using AutoMapper.Configuration;
using BuildrOps.Application.Contracts.Persistence;
using BuildrOps.Application.Features.Resource.Commands.CreateResourceLibrary;
using BuildrOps.Application.Features.Resource.Commands.CreateResourceType;
using BuildrOps.Application.Features.Resource.Commands.DeleteResourceLibrary;
using BuildrOps.Application.Features.Resource.Commands.DeleteResourceType;
using BuildrOps.Application.Features.Resource.Commands.GetResourceLibrary;
using BuildrOps.Application.Features.Resource.Commands.GetResourceType;
using BuildrOps.Application.Features.Resource.Commands.UpdateResourceLibrary;
using BuildrOps.Application.Features.Resource.Commands.UpdateResourceType;
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
    public class ResourceTypeRepository : IResourceType
    {
        private IDapper _dapper;
        private ILogger<ResourceTypeRepository> _Logger;

        public ResourceTypeRepository(IDapper d, ILogger<ResourceTypeRepository> l)
        {
            _Logger = l;
            _dapper = d;
        }

        public async Task<CreateResourceTypeResponse> CreateResourceType(CreateResourceTypeCommand command)
        {
            string InsertQuery = @" INSERT INTO[dbo].[ResourceTpe]
            ([ResourceType],[ResourceTypeDetails],[CreatedOn]) VALUES(@ResourceType,@ResourceTypeDetails,@CreatedOn);";
            DynamicParameters insertParameter = new DynamicParameters();
            insertParameter.Add("ResourceType", command.ResourceType);
            insertParameter.Add("ResourceTypeDetails", command.ResourceTypeDetails);
            insertParameter.Add("CreatedOn", DateTime.Now);

            _dapper.Execute(InsertQuery, insertParameter, commandType: CommandType.Text);


            return new CreateResourceTypeResponse
            {
                isSuccess = true
            };

        }

        public async Task<DeleteResourceTypeResponse> DeleteResourceType(DeleteResourceTypeCommand command)
        {
            string sql = "DELETE FROM [dbo].[ResourceTpe] WHERE Id = @Id";
            DynamicParameters uDataModel = new DynamicParameters();
            uDataModel.Add("Id", command.Id);
            try
            {
                _dapper.ExecuteScalar(sql, uDataModel, CommandType.Text);
                return new DeleteResourceTypeResponse
                {
                    isSuccess = true
                };
            }
            catch (Exception e)
            {
                _Logger.LogInformation(e, e.Message);
                return null;
            }
        }

       /* public async Task<GetResourceTypeResponse> GetResourceType(GetResourceTypeCommand command)
        {
            var WorkResponse = _dapper.Get<GetResourceTypeResponse>($"SELECT * FROM [dbo].[ResourceTpe]", null, commandType: CommandType.Text);
            return WorkResponse;
        }*/

        public async Task<UpdateResourceTypeResponse> UpadteResourceType(UpdateResourceTypeCommand command)
        {
            var WorkResponse = _dapper.Get<UpdateResourceTypeResponse>($"SELECT * FROM [dbo].[ResourceTpe] where Id = {command.Id}", null, commandType: CommandType.Text);
            string sqlCommand = "UPDATE [dbo].[ResourceTpe] SET  ResourceType=@ResourceType,ResourceTypeDetails=@ResourceTypeDetails,ModifiedOn=@ModifiedOn WHERE Id=@Id";
            DynamicParameters uDataModel = new DynamicParameters();
            uDataModel.Add("ResourceType", command.ResourceType);
            uDataModel.Add("ResourceTypeDetails", command.ResourceTypeDetails);
            uDataModel.Add("ModifiedOn", DateTime.UtcNow);
            uDataModel.Add("Id", command.Id);

            try
            {
                var result = _dapper.Update<UpdateResourceTypeResponse>(sqlCommand, uDataModel, CommandType.Text);
                return new UpdateResourceTypeResponse
                {
                    isSuccess = true
                };
            }
            catch (Exception e)
            {
                _Logger.LogInformation(e, e.Message);
                return null;
            }
        }

        public List<GetResourceTypeResponse> GetResourceType(GetResourceTypeCommand command)
        {
            List<GetResourceTypeResponse> WorkResponse = _dapper.GetAll<GetResourceTypeResponse>($"SELECT * FROM [dbo].[ResourceTpe]", null, commandType: CommandType.Text);
            return WorkResponse;
        }

        public List<GetResourceLibraryResponse> GetResourceLibrary(GetResourceLibraryCommand command)
        {
            List<GetResourceLibraryResponse> WorkResponse = _dapper.GetAll<GetResourceLibraryResponse>($"SELECT * FROM [dbo].[ResourceLibrary]", null, commandType: CommandType.Text);
            return WorkResponse;
        }

        public async Task<CreateResourceLibraryResponse> CreateResourceLibrary(CreateResourceLibraryCommand command)
        {
            string InsertQuery = @" INSERT INTO[dbo].[ResourceLibrary]
            ([ResourceType],[ResourceTypeDetails],[SoftwareName],[CreatedOn]) VALUES(@ResourceType,@ResourceTypeDetails,@SoftwareName,@CreatedOn);";
            DynamicParameters insertParameter = new DynamicParameters();
            insertParameter.Add("ResourceType", command.ResourceType);
            insertParameter.Add("ResourceTypeDetails", command.ResourceTypeDetails);
            insertParameter.Add("SoftwareName", command.SoftwareName);
            insertParameter.Add("CreatedOn", DateTime.Now);
            _dapper.Execute(InsertQuery, insertParameter, commandType: CommandType.Text);
            return  new CreateResourceLibraryResponse
            {
                isSuccess = true
            };
        }

        public async Task<DeleteResourceLibraryResponse> DeleteResourceLibrary(DeleteResourceLibraryCommand command)
        {
            string sql = "DELETE FROM [dbo].[ResourceLibrary] WHERE Id = @Id";
            DynamicParameters uDataModel = new DynamicParameters();
            uDataModel.Add("Id", command.Id);
            try
            {
                _dapper.ExecuteScalar(sql, uDataModel, CommandType.Text);
                return new DeleteResourceLibraryResponse
                {
                    isSuccess = true
                };
            }
            catch (Exception e)
            {
                _Logger.LogInformation(e, e.Message);
                return null;
            }
        }

        public async Task<UpdateResourceLibraryResponse> UpadteResourceLibrary(UpdateResourceLibraryCommand command)
        {
            var WorkResponse = _dapper.Get<UpdateResourceLibraryResponse>($"SELECT * FROM [dbo].[ResourceLibrary] where Id = {command.Id}", null, commandType: CommandType.Text);
            string sqlCommand = "UPDATE [dbo].[ResourceLibrary] SET  ResourceType=@ResourceType,ResourceTypeDetails=@ResourceTypeDetails,SoftwareName=@SoftwareName,ModifiedOn=@ModifiedOn WHERE Id=@Id";
            DynamicParameters uDataModel = new DynamicParameters();
            uDataModel.Add("ResourceType", command.ResourceType);
            uDataModel.Add("ResourceTypeDetails", command.ResourceTypeDetails);
            uDataModel.Add("SoftwareName", command.SoftwareName);
            uDataModel.Add("ModifiedOn", DateTime.UtcNow);
            uDataModel.Add("Id", command.Id);

            try
            {
                var result = _dapper.Update<UpdateResourceLibraryResponse>(sqlCommand, uDataModel, CommandType.Text);
                return new UpdateResourceLibraryResponse
                {
                    isSuccess = true
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
