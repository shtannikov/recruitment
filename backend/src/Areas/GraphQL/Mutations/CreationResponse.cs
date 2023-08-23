namespace recruitment.GraphQL;

public class CreationResponse
{
    public bool Succeeded { get; private set; }
    public string[]? ValidationErrors { get; private set; }

    public static CreationResponse CreateSuccessResponse() => new()
    {
        Succeeded = true
    };
    
    public static CreationResponse CreateErrorResponse(IEnumerable<string> validationErrors) => new()
    {
        Succeeded = false,
        ValidationErrors = validationErrors.ToArray()
    };

    public static CreationResponse CreateErrorResponse(string validationError) => new()
    {
        Succeeded = false,
        ValidationErrors = new []{ validationError }
    };
}