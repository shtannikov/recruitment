using HotChocolate.Authorization;
using Microsoft.AspNetCore.Identity;
using recruitment.Data;

namespace recruitment.GraphQL;

public class Mutation
{
    [Authorize(Roles = new [] { "LeadRecruiter", "Helpdesk" })]
    public async Task<CreationResponse> CreateUserAsync(
        [Service] UserManager<ApplicationUser> userManager,
        User newUser)
    {
        var creationResult = await userManager.CreateAsync(
            new ApplicationUser { UserName = newUser.Email, Email = newUser.Email },
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
        var validationErrors = errors.Select(e => e.Description)
            .ToArray();
        return CreationResponse.CreateErrorResponse(validationErrors);
    }
}