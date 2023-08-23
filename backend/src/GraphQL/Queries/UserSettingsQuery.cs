using Microsoft.AspNetCore.Identity;
using recruitment.Data;

namespace recruitment.GraphQL;

public class UserSettingsQuery
{
    public async Task<UserRole> GetUserRole(
        [Service] IHttpContextAccessor httpContextAccessor,
        [Service] UserManager<ApplicationUser> userManager)
    {
        var username = httpContextAccessor.HttpContext
            ?.User
            .Identity
            ?.Name;

        if (username is null)
            throw new InvalidOperationException("Can not get user identity");

        var user = await userManager.FindByNameAsync(username);
        var userRoles = await userManager.GetRolesAsync(user!);
        return Enum.GetValues<UserRole>()
            .Single(role => Enum.GetName(role) == userRoles.Single());
    }
}