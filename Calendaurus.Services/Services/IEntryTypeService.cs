namespace Calendaurus.Services;

public interface IEntryTypeService
{
    Task<IEnumerable<string>> GetAllAsync();
}