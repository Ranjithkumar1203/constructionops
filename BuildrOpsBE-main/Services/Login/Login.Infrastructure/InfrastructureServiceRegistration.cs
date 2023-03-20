using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Login.Application.Contracts.Infrastructure;
using Login.Application.Contracts.Persistence;
using Login.Application.Models;
using Login.Infrastructure.Mail;
using Login.Infrastructure.Persistence;
using Login.Infrastructure.Repositories;
using BuildrOps.Application.Contracts.Persistence;
using BuildrOps.Infrastructure.Repositories;
using BuildrOps.Application.Contracts.Infrastructure;
using BuildrOps.Infrastructure.AWS;
using BuildrOps.Application.AWSCredentials;
using Amazon.S3;
using BuildrOps.Infrastructure.Calendarific;

namespace Login.Infrastructure
{
    public static class InfrastructureServiceRegistration
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration Configuration)
        {
            services.AddDbContext<LoginContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("LoginConnectionString")));
            services.AddTransient<IUserRepository, UserRepository>();

            services.AddTransient<IWorkSchedule, WorkSchduleRepository>();
            services.AddTransient<IHoliday, HolidayRepository>();
            services.AddTransient<ISettings, SettingsRepository>();
            services.AddTransient<INotifications, NotificationRepository>();
            services.AddTransient<IWorkScheduleLibrary, WorkSchduleLibraryRepository>();
            services.AddTransient<IHolidayLibrary, HolidayLibraryRepository>();
            services.AddTransient<ITitle, TitleRepository>(); 
            services.AddTransient<ITitleLibrary, TitleLibraryRepository>();
            services.AddTransient<IUserSetting, UserSettingRepository>();
            services.AddTransient<IFrequents, FrequentsRepository>();
            services.AddTransient<IAmazonS3Services, AmazonS3Service>();
            services.AddTransient<ICalendarific, CalendarificAPIService>();
            services.AddTransient<IDepartment, DepartmentRepository>();
            services.AddTransient<ICompanyRegistration, CompanyBasicRegistrationRepository>();
            services.AddTransient<IResourceType, ResourceTypeRepository>();
            services.AddTransient<ICompanyProfile, CompanyProfileRepository>();

            //services.AddScoped(typeof(IAsyncRepository<>), typeof(RepositoryBase<>));                        

            //services.Configure<EmailSettings>(c => configuration.GetSection("EmailSettings"));
            services.AddTransient<IEmailService, EmailService>();
            //services.AddTransient<IUserRepository, UserRepository>();

            return services;
        }
    }
}
