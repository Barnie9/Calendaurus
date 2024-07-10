using System.ComponentModel.DataAnnotations;

namespace Calendaurus.Models;

public class CalendarEntry
{
    public Guid Id { get; set; }

    [Required, StringLength(255)]
    public string Title { get; set; }

    [StringLength(1024)]
    public string? Description { get; set; }

    [Required]
    public DateTime StartTime { get; set; }

    [Required]
    public DateTime EndTime { get; set; }

    [StringLength(255)]
    public string? Location { get; set; }

    [StringLength(15)]
    public string? Color { get; set; }

    public Guid TypeId { get; set; }
    public EntryType? Type { get; set; }

    public Guid UserId { get; set; }
    public User? User { get; set; }
}
