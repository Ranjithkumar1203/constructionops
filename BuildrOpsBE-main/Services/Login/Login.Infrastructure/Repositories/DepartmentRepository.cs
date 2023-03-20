using BuildrOps.Application.Contracts.Persistence;
using BuildrOps.Application.Features.Department.Commands.CreateDepartment;
using BuildrOps.Application.Features.Department.Commands.CreateDepartmentLibrary;
using BuildrOps.Application.Features.Department.Commands.DeleteDepartment;
using BuildrOps.Application.Features.Department.Commands.DeleteDepartmentLibrary;
using BuildrOps.Application.Features.Department.Commands.GetDepartment;
using BuildrOps.Application.Features.Department.Commands.GetDepartmentLibrary;
using BuildrOps.Application.Features.Department.Commands.UpdateDepartment;
using BuildrOps.Application.Features.Department.Commands.UpdateDepartmentLibrary;
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
    public class DepartmentRepository : IDepartment
    {
        private IDapper _dapper;
        private ILogger<DepartmentRepository> _Logger;

        public DepartmentRepository(IDapper d, ILogger<DepartmentRepository> l)
        {
            _Logger = l;
            _dapper = d;
        }

        public CreateDepartmentResponse CreateDepartment(CreateDepartmentCommand command)
        {
            string insertusersql = @"INSERT INTO [dbo].[Department]
           ([DepartmentName]
            ,[DepartmentDetails]
           ,[CompanyId]
           ,[CreatedOn]
           ,[CreatedBy])
OUTPUT inserted.Id VALUES(@DepartmentName,@DepartmentDetails,@CompanyId,@CreatedOn,@CreatedBy); ";
            DynamicParameters uDataModel = new DynamicParameters();
            uDataModel.Add("DepartmentName", command.DepartmentName);
            uDataModel.Add("DepartmentDetails", command.DepartmentDetails);
            uDataModel.Add("CompanyId", command.CompanyId);
            uDataModel.Add("CreatedOn", DateTime.Now);
            uDataModel.Add("CreatedBy", command.CreatedBy);
           
            try
            {
                int Id = (int)_dapper.ExecuteScalar(insertusersql, uDataModel);
                return new CreateDepartmentResponse
                {
                    Id = Id
                };
            }
            catch (Exception e)
            {
                _Logger.LogInformation(e, e.Message);
                return null;
            }
        }

        public CreateDepartmentLibraryResponse CreateDepartmentlibrary(CreateDepartmentLibraryCommand command)
        {
            string insertusersql = @"INSERT INTO [dbo].[DepartmentLibrary]
           ([DepartmentName]
            ,[DepartmentDetails]
             ,[SoftwareName]
           ,[CompanyId]
           ,[CreatedOn]
           ,[CreatedBy])
OUTPUT inserted.Id VALUES(@DepartmentName,@DepartmentDetails,@SoftwareName,@CompanyId,@CreatedOn,@CreatedBy); ";
            DynamicParameters uDataModel = new DynamicParameters();
            uDataModel.Add("DepartmentName", command.DepartmentName);
            uDataModel.Add("SoftwareName", command.SoftwareName);
            uDataModel.Add("DepartmentDetails", command.DepartmentDetails);
            uDataModel.Add("CompanyId", command.CompanyId);
            uDataModel.Add("CreatedOn", DateTime.Now);
            uDataModel.Add("CreatedBy", command.CreatedBy);

            try
            {
                int Id = (int)_dapper.ExecuteScalar(insertusersql, uDataModel);
                return new CreateDepartmentLibraryResponse
                {
                    Id = Id
                };
            }
            catch (Exception e)
            {
                _Logger.LogInformation(e, e.Message);
                return null;
            }
        }

        public DeleteDepartmentResponse DeleteDepartment(DeleteDepartmentCommand commad)
        {
            string sql = "DELETE FROM [dbo].[Department] WHERE Id = @Id";
            DynamicParameters uDataModel = new DynamicParameters();
            uDataModel.Add("Id", commad.Id);
            try
            {
                _dapper.ExecuteScalar(sql, uDataModel, CommandType.Text);
                return new DeleteDepartmentResponse
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

        public DeleteDepartmentLibraryResponse DeleteDepartmentLibrary(DeleteDepartmentLibraryCommand commad)
        {
            string sql = "DELETE FROM [dbo].[DepartmentLibrary] WHERE Id = @Id";
            DynamicParameters uDataModel = new DynamicParameters();
            uDataModel.Add("Id", commad.Id);
            try
            {
                _dapper.ExecuteScalar(sql, uDataModel, CommandType.Text);
                return new DeleteDepartmentLibraryResponse
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

        public List<GetDepartmentResponse> GetDepartmentByCompanyId(GetDepartmentCommand command)
        {
            List<GetDepartmentResponse> WorkResponse = _dapper.GetAll<GetDepartmentResponse>($"SELECT * FROM [dbo].[Department] where CompanyId ={command.CompanyId} or CompanyId is null", null, commandType: CommandType.Text);
            return WorkResponse;
        }

        public  List<GetDepartmentLibraryResponse> GetDepartmentLibrary(GetDepartmentLibraryCommand command)
        {
            List<GetDepartmentLibraryResponse> WorkResponse = _dapper.GetAll<GetDepartmentLibraryResponse>($"SELECT * FROM [dbo].[DepartmentLibrary] where CompanyId ={command.CompanyId} or CompanyId is null", null, commandType: CommandType.Text);
            return  WorkResponse;
        }

        public UpdateDepartmentResponse UpdateDepartment(UpdateDepartmentCommand command)
        {
            GetDepartmentResponse WorkResponse = _dapper.Get<GetDepartmentResponse>($"SELECT * FROM [dbo].[Department] where Id = {command.Id}", null, commandType: CommandType.Text);
            string sqlCommand = "UPDATE [dbo].[Department] SET  DepartmentName=@DepartmentName,DepartmentDetails=@DepartmentDetails, UpdatedOn=@UpdatedOn, UpdatedBy=@UpdatedBy WHERE Id=@Id";
            DynamicParameters uDataModel = new DynamicParameters();
            uDataModel.Add("DepartmentName", command.DepartmentName??WorkResponse.DepartmentName);
            uDataModel.Add("DepartmentDetails", command.DepartmentDetails);
            uDataModel.Add("UpdatedOn", DateTime.UtcNow);
            uDataModel.Add("UpdatedBy", command.UpdatedBy);
            uDataModel.Add("Id", command.Id);

            try
            {
                UpdateDepartmentResponse result = _dapper.Update<UpdateDepartmentResponse>(sqlCommand, uDataModel, CommandType.Text);
                return new UpdateDepartmentResponse
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

        public UpdateDepartmentLibraryResponse UpdateDepartmentLibrary(UpdateDepartmentLibraryCommand command)
        {
            var WorkResponse = _dapper.Get<UpdateDepartmentLibraryCommand>($"SELECT * FROM [dbo].[DepartmentLibrary] where Id = {command.Id}", null, commandType: CommandType.Text);
            string sqlCommand = "UPDATE [dbo].[DepartmentLibrary] SET  DepartmentName=@DepartmentName,DepartmentDetails=@DepartmentDetails,SoftwareName=@SoftwareName, UpdatedOn=@UpdatedOn, UpdatedBy=@UpdatedBy WHERE Id=@Id";
            DynamicParameters uDataModel = new DynamicParameters();
            uDataModel.Add("DepartmentName", command.DepartmentName);
            uDataModel.Add("DepartmentDetails", command.DepartmentDetails);
            uDataModel.Add("SoftwareName", command.SoftwareName);
            uDataModel.Add("UpdatedOn", DateTime.UtcNow);
            uDataModel.Add("UpdatedBy", command.UpdatedBy);
            uDataModel.Add("Id", command.Id);

            try
            {
                UpdateDepartmentLibraryResponse result = _dapper.Update<UpdateDepartmentLibraryResponse>(sqlCommand, uDataModel, CommandType.Text);
                return new UpdateDepartmentLibraryResponse
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