using Calendaurus.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Calendaurus.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EntryTypeController : ControllerBase
{
    private readonly IEntryTypeService _entryTypeService;

    public EntryTypeController(IEntryTypeService entryTypeService)
    {
        _entryTypeService = entryTypeService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<string>>> GetAllAsync()
    {
        return Ok(await _entryTypeService.GetAllAsync());
    }
}

