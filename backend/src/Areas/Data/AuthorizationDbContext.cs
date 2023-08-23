using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Duende.IdentityServer.EntityFramework.Options;

namespace recruitment.Data;

public class AuthorizationDbContext : ApiAuthorizationDbContext<ApplicationUser>
{
    private readonly IConfiguration _configuration;

    public AuthorizationDbContext(
        DbContextOptions options,
        IOptions<OperationalStoreOptions> operationalStoreOptions,
        IConfiguration configuration)
        : base(options, operationalStoreOptions)
    {
        _configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlite(_configuration.GetConnectionString("DefaultConnection"));
    }
}