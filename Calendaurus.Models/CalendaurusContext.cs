using Microsoft.EntityFrameworkCore;

namespace Calendaurus.Models;

public class CalendaurusContext : DbContext
{
    public CalendaurusContext()
    {
    }

    public CalendaurusContext(DbContextOptions<CalendaurusContext> options) : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Server=localhost;Database=Calendaurus;Trusted_Connection=True;Encrypt=false");
    }

    public virtual DbSet<CalendarEntry> CalendarEntries { get; set; }
    public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<EntryType> EntryTypes { get; set; }
}