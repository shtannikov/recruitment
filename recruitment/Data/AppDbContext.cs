using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace recruitment.Data;

public class AppDbContext : DbContext
{
    private readonly IConfiguration Configuration;

    public AppDbContext(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
        options.UseLazyLoadingProxies();
    }

    public DbSet<Candidate> Candidates { get; set; }
    public DbSet<Vacancy> Vacancies { get; set; }
    public DbSet<Funnel> Funnel  { get; set; }
    public DbSet<FunnelStage> FunnelStage { get; set; }
    public DbSet<Feedback> Feedbacks { get; set; }
}