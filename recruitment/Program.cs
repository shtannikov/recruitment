using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using recruitment.Data;
using recruitment.GraphQL;
using recruitment.Models;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ??
                       throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(connectionString));

builder.Services.AddAuthentication(o =>
    {
        o.DefaultScheme = IdentityConstants.ApplicationScheme;
    })
    .AddIdentityCookies(o => { });

builder.Services
    .AddIdentityCore<ApplicationUser>(options =>
    {
        options.SignIn.RequireConfirmedAccount = false;
    })
    .AddDefaultUI()
    .AddDefaultTokenProviders()
    .AddEntityFrameworkStores<ApplicationDbContext>();
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddIdentityServer()
    .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.SameSite = SameSiteMode.Strict;
    
    options.Events.OnRedirectToLogin = context =>
    {
        if (context.Request.Path == "/graphql" && context.Request.Method == "POST")
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        else
            context.Response.Redirect(context.RedirectUri);
        return Task.CompletedTask;
    };
});


builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();

builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>();

var app = builder.Build();

app.UseMigrationsEndPoint();

app.UseRouting();

app.UseStaticFiles();

app.UseAuthentication();
app.UseIdentityServer();

app.UseAuthorization();

app.MapRazorPages();

app.MapFallbackToFile("index.html").RequireAuthorization();

app.MapGet("/logout", async (httpContext) =>
{
    await httpContext.SignOutAsync();
    httpContext.Response.Redirect("/");
});

app.MapGraphQL().RequireAuthorization();

app.Run();