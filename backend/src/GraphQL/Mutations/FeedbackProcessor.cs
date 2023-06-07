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
    private readonly IDateTimeProvider _dateTimeProvider;

    public FeedbackProcessor(
        AppDbContext dbContext,
        IDateTimeProvider dateTimeProvider)
    {
        _dbContext = dbContext;
        _dateTimeProvider = dateTimeProvider;
    }

    public CreationResponse SaveFeedback(
        string text,
        Candidate candidate,
        ApplicationUser author)
    {
        var trimmedText = text.Trim();
        if (string.IsNullOrEmpty(trimmedText))
            return CreationResponse.CreateErrorResponse(
                "Text can not be empty or contain white-space characters only");

        var feedback = new Feedback
        {
            Text = text,
            AuthorId = author.Id,
            CandidateId = candidate.Id,
            FunnelStageId = candidate.CurrentStageId,
            CreationDateTimeUtc = _dateTimeProvider.GetUtcNow()
        };
        _dbContext.Feedbacks.Add(feedback);

        return CreationResponse.CreateSuccessResponse();
    }
}