namespace recruitment.GraphQL;

public static class GraphQLAppBuilderExtensions
{
    public static WebApplicationBuilder AddGraphQL(this WebApplicationBuilder builder)
    {
        builder.Services
            .AddGraphQLServer()
            .AddAuthorization()
            .AddQueryType<Query>()
            .AddMutationType<Mutation>();

        AddInternalServices(builder);

        return builder;
    }

    public static WebApplication UseGraphQL(this WebApplication app)
    {
        app.MapGraphQL().RequireAuthorization();

        return app;
    }

    private static void AddInternalServices(WebApplicationBuilder builder)
    {
        builder.Services.AddHttpContextAccessor();
        builder.Services.AddTransient<IDateTimeProvider, DefaultDateTimeProvider>();
        builder.Services.AddTransient<IFeedbackProcessor, FeedbackProcessor>();
        builder.Services.AddTransient<IFunnelProcessor, FunnelProcessor>();
    }
}