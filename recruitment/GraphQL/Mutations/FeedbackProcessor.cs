using recruitment.Data;

namespace recruitment.GraphQL;

public interface IFeedbackProcessor
{
    public CreationResponse SaveFeedback(
        string text,
        Candidate candidate,
        ApplicationUser author);
}

public class FeedbackProcessor : IFeedbackProcessor
{
    private readonly AppDbContext _dbContext;

    public FeedbackProcessor(
        AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public CreationResponse SaveFeedback(
        string text,
        Candidate candidate,
        ApplicationUser author)
    {
        var trimmedText = text.Trim();
        if (string.IsNullOrEmpty(trimmedText))
            CreationResponse.CreateErrorResponse(
                "Text can not be empty or contain white-space characters only");

        var feedback = new Feedback
        {
            Text = text,
            AuthorId = author.Id,
            CandidateId = candidate.Id,
            FunnelStageId = candidate.CurrentStageId,
            CreationDateTimeUtc = DateTime.UtcNow
        };
        _dbContext.Feedbacks.Add(feedback);

        return CreationResponse.CreateSuccessResponse();
    }
}