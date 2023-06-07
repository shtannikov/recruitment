using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using recruitment.Data;
using recruitment.GraphQL;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ??
                       throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<AuthorizationDbContext>(options =>
    options.UseSqlite(connectionString));

builder.Services.AddDbContext<AppDbContext>(options =>
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
    .AddRoles<IdentityRole>()
    .AddDefaultUI()
    .AddDefaultTokenProviders()
    .AddEntityFrameworkStores<AuthorizationDbContext>();
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddIdentityServer()
    .AddApiAuthorization<ApplicationUser, AuthorizationDbContext>();

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

builder.Services.AddHttpContextAccessor();
builder.Services.AddDateTimeProvider();
builder.Services.AddTransient<IFeedbackProcessor, FeedbackProcessor>();
builder.Services.AddTransient<IFunnelProcessor, FunnelProcessor>();

builder.Services
    .AddGraphQLServer()
    .AddAuthorization()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>();

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

//app.MapGraphQL();
app.MapGraphQL().RequireAuthorization();

app.Run();