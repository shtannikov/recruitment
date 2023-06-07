namespace recruitment.GraphQL;

public interface IDateTimeProvider
{
    DateTime GetUtcNow();
}

internal class DefaultDateTimeProvider : IDateTimeProvider
{
    public DateTime GetUtcNow() => DateTime.UtcNow;
}

public class FixedDateTimeProvider : IDateTimeProvider
{
    private readonly DateTime _utcNow;

    public FixedDateTimeProvider(DateTime utcNow)
    {
        _utcNow = utcNow;
    }

    public DateTime GetUtcNow() => _utcNow;
}

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddDateTimeProvider(this IServiceCollection services)
    {
        services.AddTransient<IDateTimeProvider, DefaultDateTimeProvider>();
        return services;
    }
}