using Login.API.Extensions;
using Login.API.Requests;
using Login.Application.Features.Settings.Command.CreateSettingOption;
using Login.Application.Features.Settings.Command.GetSettingOption;
using Login.Application.Features.Settings.Command.GetSettingOptionByName;
using Login.Application.Features.UserSettings.Command.CreateUserSettingValue;
using Login.Application.Features.UserSettings.Command.GetUserSettingValue;
using Login.Application.Features.WorkScheduele.Commands.CreateWorkSchdule;
using Login.Application.Features.WorkScheduele.Commands.DeleteWorkSchedule;
using Login.Application.Features.WorkScheduele.Commands.GetWorkSchedule;
using Login.Application.Features.WorkScheduele.Commands.UpdateWorkSchedule;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Login.API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class WorkScheduleController : ControllerBase
    {
        private readonly IMediator _mediator;
        public WorkScheduleController(IMediator mediator)
        {
           _mediator =  mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpGet("/GetWorkSchedule")]
        public async Task<IActionResult> GetWorkByCompanyId()
        {
            Claim c = HttpContext.GetClaimByStringType("CompanyId");
            List<WorkScheduleResponse> WorkSchdueleWorks = await _mediator.Send(new WorkSchduleCommand {
            CompanyId = Convert.ToInt32(c.Value)
            });
            return Ok(WorkSchdueleWorks);

        }

        [HttpGet("/GetWorkScheduleSettings")]
        public async Task<IActionResult> GetWorkScheduleSettings()
        {
            List<GetSettingOptionResponse> SettingWorks = await _mediator.Send(new GetSettingOptionCommand
            {
                SettingType = "Workflow"
            });

            return Ok(SettingWorks);

        }
        [HttpGet("/GetWorkScheduleSettingsByName")]
        public async Task<IActionResult> GetWorkScheduleSettingsByName([FromQuery] GetSettingOptionByNameCommand settingOptionByNameCommand)
        {
            GetSettingOptionByNameResponse SettingWorks = await _mediator.Send(new GetSettingOptionByNameCommand
            {
                SettingType = "Workflow",
                SettingName = settingOptionByNameCommand.SettingName
            }) ;

            return Ok(SettingWorks);

        }
        [HttpGet("/GetWorkScheduleUserSettingsByName")]
        public async Task<IActionResult> GetWorkScheduleUserSettingsByName([FromQuery] GetSettingOptionByNameCommand settingOptionByNameCommand)
        {
            Claim userId = HttpContext.GetClaimByStringType("UserId");

            List<GetUserSettingResponse> SettingWorks = await _mediator.Send(new GetUserSettingCommand
            {
                SettingType = "Workflow",
                SettingName = settingOptionByNameCommand.SettingName,
                UserId = Convert.ToInt32(userId.Value)
            });
            //logic to sort workschedule settings by numbers
            if (SettingWorks != null)
            {
                if (settingOptionByNameCommand.SettingName == "Time Starts")
                {
                    DateTime temp;
                    SettingWorks.RemoveAll(a => !DateTime.TryParse(a.SelectedValue, out temp));
                    List<string> optionvalues = SettingWorks.Select(a => a.SelectedValue).ToList();
                    optionvalues = optionvalues.Select(x => new { Time = DateTime.Parse(x), String = x })
        .OrderBy(x => x.Time).Select(x => x.String).ToList();
                    foreach (GetUserSettingResponse option in SettingWorks)
                    {
                        option.Sequence = optionvalues.IndexOf(option.SelectedValue) + 1;
                    }
                }
                else if(settingOptionByNameCommand.SettingName == "Working Hours")
                {
                    List<string> optionvalues = SettingWorks.Select(a => a.SelectedValue).ToList();
                    optionvalues = optionvalues.OrderBy(a => int.Parse(new string(a.TakeWhile(Char.IsDigit).ToArray()))).ToList();
                    foreach (GetUserSettingResponse option in SettingWorks)
                    {
                        option.Sequence = optionvalues.IndexOf(option.SelectedValue) + 1;
                    }
                }
            }
            return Ok(SettingWorks);

        }
        [HttpPost("/CreateWorkScheduleSettingOption")]
        public async Task<IActionResult> CreateWorkScheduleSettingOption(CreateSettingOptionCommand createSettingOptionCommand)
        {
            Claim userId = HttpContext.GetClaimByStringType("UserId");

            CreateUserSettingCommand userSettingCommand = new CreateUserSettingCommand();
            userSettingCommand.UserId = Convert.ToInt32(userId.Value);
            userSettingCommand.SelectedValue = createSettingOptionCommand.OptionValue;
            userSettingCommand.Sequence = createSettingOptionCommand.OptionSequence;
            userSettingCommand.SettingId = createSettingOptionCommand.SettingId;
            CreateUserSettingResponse SettingWorks = await _mediator.Send(userSettingCommand);

            return Ok(SettingWorks);

        }

        [HttpPost("/CreateWorkSchedule")]
        public async Task<IActionResult> CreateWorkSchedule([FromBody] CreateWrokScheduleCommand command)
        {

            Claim c = HttpContext.GetClaimByStringType("CompanyId");
            command.CompanyId = Convert.ToInt32(c.Value);
            var Works = await _mediator.Send(command);

            return Ok(Works);

        }

        [HttpDelete("/DeleteWorkSchedule")]
        public async Task<IActionResult> DeletWorkSchedule([FromQuery] DeleteWorkCommad command)
        {
            var Works = await _mediator.Send(command);
            return Ok(Works);
        }
        [HttpDelete("/DeleteWorkScheduleList")]
        public async Task<IActionResult> DeleteWorkScheduleList([FromQuery] DeleteWorkScheduleListCommand command)
        {

            List<DeleteWorkCommandResponse> response = new List<DeleteWorkCommandResponse>();
            if (command != null && command.DeleteWorkScheduleCommands != null && command.DeleteWorkScheduleCommands.Count > 0)
            {
                foreach (DeleteWorkCommad deleteWorkScheduleCommand in command.DeleteWorkScheduleCommands)
                {
                    response.Add(await _mediator.Send(deleteWorkScheduleCommand));
                }
            }
            return Ok(response);
        }
    
    [HttpPut("/UpdateWorkSchedule")]
        public async Task<IActionResult> UpdateWorkSchedule([FromBody] UpdateWorkScheduleCommand command)
        {
            var Works = await _mediator.Send(command);
            return Ok(Works);
        }
        [HttpPut("/UpdateWorkScheduleList")]
        public async Task<IActionResult> UpdateWorkScheduleList([FromBody] UpdateWorkScheduleListCommand command)
        {

            List<UpdateWorkScheduleResponse> response = new List<UpdateWorkScheduleResponse>();
            if (command!=null&&command.updateWorkScheduleCommands!=null&&command.updateWorkScheduleCommands.Count>0)
            {
                foreach(UpdateWorkScheduleCommand updateWorkScheduleCommand in command.updateWorkScheduleCommands)
                {
                    response.Add(await _mediator.Send(updateWorkScheduleCommand));
                }
            }
            return Ok(response);
        }
    }
}
