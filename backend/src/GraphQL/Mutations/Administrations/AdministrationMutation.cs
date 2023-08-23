using Microsoft.AspNetCore.Identity;
using recruitment.Data;

namespace recruitment.GraphQL;

public class AdministrationMutation
{
    public async Task<CreationResponse> CreateUser(
        [Service] UserManager<ApplicationUser> userManager,
        NewUser newUser)
    {
        var creationResult = await userManager.CreateAsync(
            new ApplicationUser
            {
                PersonalName = newUser.PersonalName,
                UserName = newUser.Email,
                Email = newUser.Email
            },
            newUser.Password);

        if (creationResult.Succeeded)
        {
            var createdUser = await userManager.FindByEmailAsync(newUser.Email);
            var roleUpdatingResult = await userManager.AddToRoleAsync(createdUser!, Enum.GetName(newUser.Role)!);

            return roleUpdatingResult.Succeeded
                ? CreationResponse.CreateSuccessResponse()
                : CreateErrorResponse(roleUpdatingResult.Errors);
        }

        return CreateErrorResponse(creationResult.Errors);
    }

    private static CreationResponse CreateErrorResponse(IEnumerable<IdentityError> errors)
    {
        var validationErrors = errors
            .Select(e => e.Description)
            .ToArray();
        return CreationResponse.CreateErrorResponse(validationErrors);
    }
}