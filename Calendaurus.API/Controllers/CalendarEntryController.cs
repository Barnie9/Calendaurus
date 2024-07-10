using Calendaurus.Models;
using Calendaurus.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Calendaurus.API.Controllers;

[Route("api/[controller]")]
[Authorize]
[ApiController]
public class CalendarEntryController : ControllerBase
{
    private readonly ICalendarEntryService _calendarEntryService;
    private readonly IUserService _userService;

    public CalendarEntryController(ICalendarEntryService calendarEntryService, IUserService userService)
    {
        _calendarEntryService = calendarEntryService;
        _userService = userService;
    }

    [HttpPost("filtered")]
    public async Task<ActionResult<IEnumerable<CalendarEntryDto>>> GetByFilterAsync([FromBody] FilterDto filterDto)
    {
        var currentUserEmail = HttpContext.User.Identity!.Name;

        var currentUser = await _userService.GetByEmailAsync(currentUserEmail!);

        return Ok(await _calendarEntryService.GetByFilterAsync(currentUser.Id, filterDto));
    }

    [HttpPost]
    public async Task<ActionResult<CalendarEntryDto>> CreateAsync([FromBody] CalendarEntryDto calendarEntryDto)
    {
        var currentUserEmail = HttpContext.User.Identity!.Name;

        var currentUser = await _userService.GetByEmailAsync(currentUserEmail!);

        var createdCalendarEntry = await _calendarEntryService.CreateAsync(currentUser.Id, calendarEntryDto);

        if (createdCalendarEntry == null)
        {
            return BadRequest();
        }

        return Created(createdCalendarEntry.Id.ToString(), createdCalendarEntry);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<CalendarEntry>> Update([FromRoute] Guid id, [FromBody] CalendarEntryDto calendarEntryDto)
    {
        var currentUserEmail = HttpContext.User.Identity!.Name;

        var currentUser = await _userService.GetByEmailAsync(currentUserEmail!);

        var updatedEntry = await _calendarEntryService.UpdateAsync(currentUser.Id, id, calendarEntryDto);

        if (updatedEntry == null)
        {
            return BadRequest();
        }

        return Ok(updatedEntry);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteAsync([FromRoute] Guid id)
    {
        var currentUserEmail = HttpContext.User.Identity!.Name;

        var currentUser = await _userService.GetByEmailAsync(currentUserEmail!);

        var deleted = await _calendarEntryService.DeleteAsync(currentUser.Id, id);

        if (!deleted)
        {
            return NotFound();
        }

        return Ok();
    }
}

