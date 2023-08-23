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
        var authorName = httpContextAccessor.HttpContext
            ?.User
            .Identity
            ?.Name;
        if (authorName is null)
            throw new InvalidOperationException("Can not get user identity");
        var author = await userManager.FindByNameAsync(authorName);

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