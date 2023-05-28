using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using recruitment.data;

public class DataContext : DbContext
{
    protected readonly IConfiguration Configuration;

    public DataContext(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
    }

    public DbSet<Candidate> Candidates { get; set; }
}