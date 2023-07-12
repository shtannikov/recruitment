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
        options.UseLazyLoadingProxies();
    }

    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        configurationBuilder
            .Properties<DateTime>()
            .HaveConversion(typeof(UtcDateTimeConverter));
    }

    public DbSet<Vacancy> Vacancies { get; set; }
    public DbSet<Funnel> Funnels  { get; set; }
    public virtual DbSet<FunnelStage> FunnelStages { get; set; }
    public virtual DbSet<Candidate> Candidates { get; set; }
    public virtual DbSet<Feedback> Feedbacks { get; set; }
}