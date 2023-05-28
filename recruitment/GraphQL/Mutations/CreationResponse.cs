namespace recruitment.GraphQL;

public class CreationResponse
{
    public bool Succeeded { get; set; }
    public string[]? ValidationErrors { get; set; }

    public static CreationResponse CreateSuccessResponse() => new()
    {
        Succeeded = true
    };
    
    public static CreationResponse CreateErrorResponse(string[] validationErrors) => new()
    {
        Succeeded = false,
        ValidationErrors = validationErrors
    };
}