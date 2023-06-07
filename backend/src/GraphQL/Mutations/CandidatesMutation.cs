using HotChocolate.Authorization;
using Microsoft.AspNetCore.Identity;
using recruitment.Data;

namespace recruitment.GraphQL;

public class CandidatesMutation
{
    public async Task<CreationResponse> MoveToNextFunnelStage(
        [Service] IHttpContextAccessor httpContextAccessor,
        [Service] UserManager<ApplicationUser> userManager,
        [Service] AppDbContext dbContext,
        [Service] IFunnelProcessor funnelProcessor,
        int candidateId,
        int nextStageId,
        string motivation)
    {
        var authorIdentity = httpContextAccessor.HttpContext
            !.User
            .Identity;
        var author = await userManager.FindByNameAsync(authorIdentity!.Name!);

        var response = funnelProcessor.MoveToNextStage(
            candidateId,
            nextStageId,
            motivation,
            author!);

        if (response.Succeeded)
            await dbContext.SaveChangesAsync();
        return response;
    }
}