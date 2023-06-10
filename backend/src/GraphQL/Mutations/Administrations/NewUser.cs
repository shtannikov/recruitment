using recruitment.Data;

namespace recruitment.GraphQL;

public class NewUser
{
    public string Email { get; set; }
    public string Password { get; set; }
    public UserRole Role { get; set; }
}