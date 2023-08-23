using recruitment.Data;
using recruitment.GraphQL;
using recruitment.Identity;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>();
builder.AddAuth();
builder.AddGraphQL();

var app = builder.Build();
app.UseRouting();
UseSPAFrontend();
app.UseAuth();
app.UseGraphQL();

app.Run();

void UseSPAFrontend()
{
    app.UseStaticFiles();
    app.MapFallbackToFile("index.html").RequireAuthorization();
}