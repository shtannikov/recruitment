using recruitment.Data;

namespace recruitment.GraphQL;

public interface IFunnelProcessor
{
    public CreationResponse MoveToNextStage(
        int candidateId,
        int nextStageId,
        string motivation,
        ApplicationUser decisionMaker);
}

public class FunnelProcessor : IFunnelProcessor
{
    private readonly AppDbContext _dbContext;
    private readonly IDateTimeProvider _dateTimeProvider;
    private readonly IFeedbackProcessor _feedbackProcessor;

    public FunnelProcessor(
        AppDbContext dbContext,
        IDateTimeProvider dateTimeProvider,
        IFeedbackProcessor feedbackProcessor)
    {
        _dbContext = dbContext;
        _dateTimeProvider = dateTimeProvider;
        _feedbackProcessor = feedbackProcessor;
    }

    public CreationResponse MoveToNextStage(
        int candidateId,
        int nextStageId,
        string motivation,
        ApplicationUser decisionMaker)
    {
        var validationErrors = new List<string>();

        var candidate = _dbContext.Candidates
            .SingleOrDefault(c => c.Id == candidateId);
        if (candidate == null)
            validationErrors.Add($"Candidate with Id {candidateId} is not found");

        var nextStage = _dbContext.FunnelStages
            .SingleOrDefault(s => s.Id == nextStageId);
        if (nextStage == null)
            validationErrors.Add($"Funnel stage with Id {nextStageId} is not found");

        if (validationErrors.Any())
            return CreationResponse.CreateErrorResponse(validationErrors);

        if (candidate!.CurrentStage.Order > nextStage!.Order)
            validationErrors.Add("You can not move the candidate to previous funnel stage");
        if (candidate.CurrentStage.Order == nextStage.Order)
            validationErrors.Add("The candidate is already at the selected funnel stage");

        if (validationErrors.Any())
            return CreationResponse.CreateErrorResponse(validationErrors);

        var response = _feedbackProcessor.SaveFeedback(
            text: motivation,
            candidate,
            author: decisionMaker);

        candidate.CurrentStageId = nextStageId;
        candidate.StageEntranceDateTimeUtc = _dateTimeProvider.GetUtcNow();

        return response;
    }
}