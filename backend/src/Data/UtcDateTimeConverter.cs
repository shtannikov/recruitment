using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace recruitment.Data;

public class UtcDateTimeConverter : ValueConverter<DateTime, DateTime>
{
    public UtcDateTimeConverter()
        : base(d => d, d => SpecifyUtc(d))
    {
    }

    private static DateTime SpecifyUtc(DateTime date)
    {
        return DateTime.SpecifyKind(date, DateTimeKind.Utc);
    }
}