using System.Collections;
using Calendaurus.Models;

namespace Calendaurus.Services;

public interface IEntryTypeRepository
{
    Task<IEnumerable<EntryType>> GetAllAsync();
    Task<EntryType?> GetByNameAsync(string name);
}