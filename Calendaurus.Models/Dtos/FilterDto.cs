namespace Calendaurus.Models;

public class FilterDto
{
    public List<string> Types { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
}