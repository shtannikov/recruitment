using recruitment.GraphQL;

namespace tests;

public class FixedDateTimeProvider : IDateTimeProvider
{
    private readonly DateTime _utcNow;

    public FixedDateTimeProvider(DateTime utcNow)
    {
        _utcNow = utcNow;
    }

    public DateTime GetUtcNow() => _utcNow;
}