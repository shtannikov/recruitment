using Microsoft.EntityFrameworkCore;

namespace recruitment.Data;

public class AppDbContext : DbContext
{
    private readonly IConfiguration _configuration;

    public AppDbContext(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlite(_configuration.GetConnectionString("DefaultConnection"));
    }

    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        configurationBuilder
            .Properties<DateTime>()
            .HaveConversion(typeof(UtcDateTimeConverter));
    }

    public DbSet<Vacancy> Vacancies { get; set; }
    public DbSet<Funnel> Funnels  { get; set; }
    public DbSet<FunnelStage> FunnelStages { get; set; }
    public DbSet<Candidate> Candidates { get; set; }
    public DbSet<Feedback> Feedbacks { get; set; }
}