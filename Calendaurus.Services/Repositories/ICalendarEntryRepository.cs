using System.Linq.Expressions;
using Calendaurus.Models;

namespace Calendaurus.Services;

public interface ICalendarEntryRepository
{
    Task<CalendarEntry?> GetByIdAsync(Guid id);
    Task<IEnumerable<CalendarEntry>> GetByUserIdAsync(Guid userId);
    Task<IEnumerable<CalendarEntry>> GetAsync(Expression<Func<CalendarEntry, bool>> filter);
    Task<CalendarEntry?> CreateAsync(CalendarEntry calendarEntry);
    Task<CalendarEntry?> UpdateAsync(CalendarEntry calendarEntry);
    Task<CalendarEntry?> DeleteAsync(CalendarEntry calendarEntry);
}