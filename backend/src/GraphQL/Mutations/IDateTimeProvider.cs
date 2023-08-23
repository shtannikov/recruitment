namespace recruitment.GraphQL;

public interface IDateTimeProvider
{
    DateTime GetUtcNow();
}

internal class DefaultDateTimeProvider : IDateTimeProvider
{
    public DateTime GetUtcNow() => DateTime.UtcNow;
}