using Calendaurus.Models;

namespace Calendaurus.Services;

public class CalendarEntryService : ICalendarEntryService
{
    private readonly ICalendarEntryRepository _calendarEntryRepository;
    private readonly IEntryTypeRepository _entryTypeRepository;
    private readonly IUserRepository _userRepository;

    public CalendarEntryService(ICalendarEntryRepository calendarEntryRepository, IEntryTypeRepository entryTypeRepository, IUserRepository userRepository)
    {
        _calendarEntryRepository = calendarEntryRepository;
        _entryTypeRepository = entryTypeRepository;
        _userRepository = userRepository;
    }

    public async Task<IEnumerable<CalendarEntryDto>> GetByFilterAsync(Guid userId, FilterDto filter)
    {
        var calendarEntries = await _calendarEntryRepository.GetByUserIdAsync(userId);

        if (filter.Types != null)
        {
            calendarEntries = calendarEntries.Where(entry => filter.Types.Contains(entry.Type.Name));
        }

        if (filter.StartTime != null)
        {
            calendarEntries = calendarEntries.Where(entry => entry.StartTime >= filter.StartTime);
        }

        if (filter.EndTime != null)
        {
            calendarEntries = calendarEntries.Where(entry => entry.EndTime <= filter.EndTime);
        }

        return calendarEntries.Select(entry => new CalendarEntryDto(entry));
    }

    public async Task<CalendarEntryDto?> CreateAsync(Guid userId, CalendarEntryDto calendarEntryDto)
    {
        if (calendarEntryDto.StartTime >= calendarEntryDto.EndTime)
        {
            return null;
        }

        var entryType = await _entryTypeRepository.GetByNameAsync(calendarEntryDto.Type);
        if (entryType == null)
        {
            return null;
        }

        var sameTimeCalendarEntries = await _calendarEntryRepository.GetAsync(entry =>
                entry.UserId == userId &&
                ((calendarEntryDto.StartTime < entry.EndTime && calendarEntryDto.StartTime >= entry.StartTime)
                || (calendarEntryDto.EndTime <= entry.EndTime && calendarEntryDto.EndTime > entry.StartTime)
                || (entry.StartTime < calendarEntryDto.EndTime && entry.StartTime > calendarEntryDto.StartTime)
                || (entry.EndTime < calendarEntryDto.EndTime && entry.EndTime > calendarEntryDto.StartTime))
                );
        if (sameTimeCalendarEntries.Any())
        {
            return null;
        }

        var calendarEntry = new CalendarEntry
        {
            Title = calendarEntryDto.Title,
            Description = calendarEntryDto.Description,
            StartTime = calendarEntryDto.StartTime,
            EndTime = calendarEntryDto.EndTime,
            Location = calendarEntryDto.Location,
            Color = calendarEntryDto.Color,
            Type = entryType,
            UserId = userId
        };
        var createdCalendarEntry = await _calendarEntryRepository.CreateAsync(calendarEntry);
        return new CalendarEntryDto(createdCalendarEntry!);
    }

    public async Task<CalendarEntryDto?> UpdateAsync(Guid userId, Guid id, CalendarEntryDto calendarEntryDto)
    {
        if (id != calendarEntryDto.Id)
        {
            return null;
        }

        var calendarEntry = await _calendarEntryRepository.GetByIdAsync(id);
        if (calendarEntry == null)
        {
            return null;
        }

        if (calendarEntry.UserId != userId)
        {
            return null;
        }

        if (calendarEntryDto.StartTime != null && calendarEntryDto.EndTime != null)
        {
            if (calendarEntryDto.StartTime >= calendarEntryDto.EndTime)
            {
                return null;
            }

            var sameTimeCalendarEntries = await _calendarEntryRepository.GetAsync(entry =>
                entry.UserId == userId &&
                calendarEntryDto.Id != entry.Id &&
                ((calendarEntryDto.StartTime < entry.EndTime && calendarEntryDto.StartTime >= entry.StartTime)
                 || (calendarEntryDto.EndTime <= entry.EndTime && calendarEntryDto.EndTime > entry.StartTime)
                 || (entry.StartTime < calendarEntryDto.EndTime && entry.StartTime > calendarEntryDto.StartTime)
                 || (entry.EndTime < calendarEntryDto.EndTime && entry.EndTime > calendarEntryDto.StartTime))
            );
            if (sameTimeCalendarEntries.Any())
            {
                return null;
            }
        }
        else
        {
            if (calendarEntryDto.StartTime != null)
            {
                var sameTimeCalendarEntries = await _calendarEntryRepository.GetAsync(entry =>
                    entry.UserId == userId &&
                    calendarEntryDto.Id != entry.Id &&
                    ((calendarEntryDto.StartTime < entry.EndTime && calendarEntryDto.StartTime >= entry.StartTime)
                     || (calendarEntry.EndTime <= entry.EndTime && calendarEntry.EndTime > entry.StartTime)
                     || (entry.StartTime < calendarEntry.EndTime && entry.StartTime > calendarEntryDto.StartTime)
                     || (entry.EndTime < calendarEntry.EndTime && entry.EndTime > calendarEntryDto.StartTime))
                );
                if (sameTimeCalendarEntries.Any())
                {
                    return null;
                }
            }

            if (calendarEntryDto.EndTime != null)
            {
                var sameTimeCalendarEntries = await _calendarEntryRepository.GetAsync(entry =>
                    entry.UserId == userId &&
                    calendarEntryDto.Id != entry.Id &&
                    ((calendarEntry.StartTime < entry.EndTime && calendarEntry.StartTime >= entry.StartTime)
                     || (calendarEntryDto.EndTime <= entry.EndTime && calendarEntryDto.EndTime > entry.StartTime)
                     || (entry.StartTime < calendarEntryDto.EndTime && entry.StartTime > calendarEntry.StartTime)
                     || (entry.EndTime < calendarEntryDto.EndTime && entry.EndTime > calendarEntry.StartTime))
                );
                if (sameTimeCalendarEntries.Any())
                {
                    return null;
                }
            }
        }

        var entryType = await _entryTypeRepository.GetByNameAsync(calendarEntryDto.Type);
        if (entryType == null)
        {
            return null;
        }

        calendarEntry.Title = calendarEntryDto.Title ?? calendarEntry.Title;
        calendarEntry.Description = calendarEntryDto.Description ?? calendarEntry.Description;
        calendarEntry.StartTime = calendarEntryDto.StartTime != null ? calendarEntryDto.StartTime : calendarEntry.StartTime;
        calendarEntry.EndTime = calendarEntryDto.EndTime != null ? calendarEntryDto.EndTime : calendarEntry.EndTime;
        calendarEntry.Location = calendarEntryDto.Location ?? calendarEntry.Location;
        calendarEntry.Color = calendarEntryDto.Color ?? calendarEntry.Color;
        calendarEntry.Type = calendarEntryDto.Type != null ? entryType : calendarEntry.Type;

        var updatedCalendarEntry = await _calendarEntryRepository.UpdateAsync(calendarEntry);
        return new CalendarEntryDto(updatedCalendarEntry!);
    }

    public async Task<bool> DeleteAsync(Guid userId, Guid id)
    {
        var calendarEntry = await _calendarEntryRepository.GetByIdAsync(id);

        if (calendarEntry == null)
        {
            return false;
        }

        if (calendarEntry.UserId != userId)
        {
            return false;
        }

        await _calendarEntryRepository.DeleteAsync(calendarEntry);

        return true;
    }
}