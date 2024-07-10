using Calendaurus.Models;

namespace Calendaurus.Services;

public class EntryTypeService : IEntryTypeService
{
    private readonly IEntryTypeRepository _entryTypeRepository;

    public EntryTypeService(IEntryTypeRepository entryTypeRepository)
    {
        _entryTypeRepository = entryTypeRepository;
    }

    public async Task<IEnumerable<string>> GetAllAsync()
    {
        var entryTypes = await _entryTypeRepository.GetAllAsync();

        return entryTypes.Select(entryType => entryType.Name);
    }
}