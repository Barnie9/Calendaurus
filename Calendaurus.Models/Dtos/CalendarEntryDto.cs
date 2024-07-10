namespace Calendaurus.Models;

public class CalendarEntryDto()
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public string? Location { get; set; }
    public string? Color { get; set; }
    public string Type { get; set; }

    public CalendarEntryDto(CalendarEntry calendarEntry)
        : this()
    {
        Id = calendarEntry.Id;
        Title = calendarEntry.Title;
        Description = calendarEntry.Description;
        StartTime = calendarEntry.StartTime;
        EndTime = calendarEntry.EndTime;
        Location = calendarEntry.Location;
        Color = calendarEntry.Color;
        Type = calendarEntry.Type.Name;
    }
}