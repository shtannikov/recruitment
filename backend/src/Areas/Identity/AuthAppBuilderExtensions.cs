using Microsoft.AspNetCore.Authentication;
using recruitment.Data;
using Microsoft.AspNetCore.Identity;

namespace recruitment.Identity;

public static class AuthAppBuilderExtensions
{
    public static WebApplicationBuilder AddAuth(this WebApplicationBuilder builder)
    {
        builder.Services.AddDbContext<AuthorizationDbContext>();
        AddIdentityServer(builder);
        OverrideAuthErrorForGraphQL(builder);
        AddDependenciesForLoginRazorPage(builder);

        return builder;
    }

    public static WebApplication UseAuth(this WebApplication app)
    {
        app.UseAuthentication();
        app.UseIdentityServer();
        app.UseAuthorization();
        UseDependenciesForLoginRazorPage(app);
        MapLogoutEndpoint(app);

        return app;
    }

    private static void AddIdentityServer(WebApplicationBuilder builder)
    {
        builder.Services.AddAuthentication(o =>
            {
                o.DefaultScheme = IdentityConstants.ApplicationScheme;
            })
            .AddIdentityCookies();

        builder.Services
            .AddIdentityCore<ApplicationUser>()
            .AddRoles<IdentityRole>()
            .AddDefaultUI()
            .AddEntityFrameworkStores<AuthorizationDbContext>();

        builder.Services.AddIdentityServer()
            .AddApiAuthorization<ApplicationUser, AuthorizationDbContext>();
    }

    private static void OverrideAuthErrorForGraphQL(WebApplicationBuilder builder)
    {
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
    }

    private static void AddDependenciesForLoginRazorPage(WebApplicationBuilder builder)
    {
        builder.Services.AddControllersWithViews();
        builder.Services.AddRazorPages();
    }

    private static void UseDependenciesForLoginRazorPage(WebApplication app)
    {
        app.MapRazorPages();
    }

    private static void MapLogoutEndpoint(WebApplication app)
    {
        app.MapGet("/logout", async httpContext =>
        {
            await httpContext.SignOutAsync();
            httpContext.Response.Redirect("/");
        });
    }
}