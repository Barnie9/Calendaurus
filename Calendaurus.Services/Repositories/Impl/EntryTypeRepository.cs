using Microsoft.EntityFrameworkCore;
using Calendaurus.Models;

namespace Calendaurus.Services;

public class EntryTypeRepository : IEntryTypeRepository
{
    private readonly CalendaurusContext _context;
    private readonly DbSet<EntryType> _entryTypes;

    public EntryTypeRepository(CalendaurusContext context)
    {
        _context = context;
        _entryTypes = context.EntryTypes;
    }

    public async Task<IEnumerable<EntryType>> GetAllAsync()
    {
        return await _entryTypes.ToListAsync();
    }

    public async Task<EntryType?> GetByNameAsync(string name)
    {
        return await _entryTypes.FirstOrDefaultAsync(t => t.Name == name);
    }
}