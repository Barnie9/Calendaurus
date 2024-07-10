using System.Linq.Expressions;
using Calendaurus.Models;
using Microsoft.EntityFrameworkCore;

namespace Calendaurus.Services;

public class CalendarEntryRepository : ICalendarEntryRepository
{
    private readonly CalendaurusContext _context;
    private readonly DbSet<CalendarEntry> _calendarEntries;

    public CalendarEntryRepository(CalendaurusContext context)
    {
        _context = context;
        _calendarEntries = context.CalendarEntries;
    }

    public async Task<CalendarEntry?> GetByIdAsync(Guid id)
    {
        return await _calendarEntries.Include(entry => entry.Type).FirstOrDefaultAsync(entry => entry.Id == id);
    }

    public async Task<IEnumerable<CalendarEntry>> GetByUserIdAsync(Guid userId)
    {
        return await _calendarEntries.Where(entry => entry.UserId == userId).Include(entry => entry.Type).ToListAsync();
    }

    public async Task<IEnumerable<CalendarEntry>> GetAsync(Expression<Func<CalendarEntry, bool>> filter)
    {
        return await _calendarEntries.Where(filter).ToListAsync();
    }

    public async Task<CalendarEntry?> CreateAsync(CalendarEntry calendarEntry)
    {
        var entry = _calendarEntries.Attach(calendarEntry);

        await _context.SaveChangesAsync();

        return entry.Entity;
    }

    public async Task<CalendarEntry?> UpdateAsync(CalendarEntry calendarEntry)
    {
        var entry = _calendarEntries.Attach(calendarEntry);

        entry.State = EntityState.Modified;

        await _context.SaveChangesAsync();

        return entry.Entity;
    }

    public async Task<CalendarEntry?> DeleteAsync(CalendarEntry calendarEntry)
    {
        var entry = _calendarEntries.Attach(calendarEntry);

        entry.State = EntityState.Deleted;

        await _context.SaveChangesAsync();

        return entry.Entity;
    }
}