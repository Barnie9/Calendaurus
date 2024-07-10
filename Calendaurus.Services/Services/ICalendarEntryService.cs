using Calendaurus.Models;

namespace Calendaurus.Services;

public interface ICalendarEntryService
{
    Task<IEnumerable<CalendarEntryDto>> GetByFilterAsync(Guid userId, FilterDto filter);
    Task<CalendarEntryDto?> CreateAsync(Guid userId, CalendarEntryDto entry);
    Task<CalendarEntryDto?> UpdateAsync(Guid userId, Guid id, CalendarEntryDto entry);
    Task<bool> DeleteAsync(Guid userId, Guid id);
}