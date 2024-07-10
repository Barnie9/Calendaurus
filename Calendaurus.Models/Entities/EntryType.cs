using System.ComponentModel.DataAnnotations;

namespace Calendaurus.Models;

public class EntryType
{
    public Guid Id { get; set; }

    [Required, StringLength(16)]
    public string Name { get; set; }
}