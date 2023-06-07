using Microsoft.Extensions.Configuration;
using Moq;
using recruitment.Data;
using recruitment.GraphQL;

namespace tests;

[TestClass]
public class FunnelProcessorTests
{
    [TestMethod]
    public void  MoveToNextStage_CandidateIsNotFound_ValidationError()
    {
        var nonexistentCandidateId = -1;
        var candidateSet = Array.Empty<Candidate>();

        var stageSet = new[]
        {
            new FunnelStage { Id = 1 }
        };
        var mockDbContext = MockDbContext(candidateSet, stageSet);
        var mockFeedbackProcessor = new Mock<IFeedbackProcessor>();
        var mockDateTimeProvider = new Mock<IDateTimeProvider>();

        var funnelProcessor = new FunnelProcessor(
            mockDbContext.Object,
            mockDateTimeProvider.Object,
            mockFeedbackProcessor.Object);


        var response = funnelProcessor.MoveToNextStage(
            candidateId: nonexistentCandidateId,
            nextStageId: stageSet[0].Id,
            motivation: "",
            decisionMaker: new ApplicationUser());


        Assert.IsFalse(response.Succeeded);
        Assert.IsNotNull(response.ValidationErrors);
        Assert.AreEqual(1, response.ValidationErrors.Length);
        Assert.AreEqual(
            "Candidate with Id -1 is not found",
            response.ValidationErrors[0]);
    }

    [TestMethod]
    public void  MoveToNextStage_NextStageIsNotFound_ValidationError()
    {
        var nonexistentStageId = -1;
        var stageSet = Array.Empty<FunnelStage>();

        var candidateSet = new[]
        {
            new Candidate { Id = 1 }
        };
        var mockDbContext = MockDbContext(candidateSet, stageSet);
        var mockFeedbackProcessor = new Mock<IFeedbackProcessor>();
        var mockDateTimeProvider = new Mock<IDateTimeProvider>();

        var funnelProcessor = new FunnelProcessor(
            mockDbContext.Object,
            mockDateTimeProvider.Object,
            mockFeedbackProcessor.Object);


        var response = funnelProcessor.MoveToNextStage(
            candidateId: candidateSet[0].Id,
            nextStageId: nonexistentStageId,
            motivation: "",
            decisionMaker: new ApplicationUser());


        Assert.IsFalse(response.Succeeded);
        Assert.IsNotNull(response.ValidationErrors);
        Assert.AreEqual(1, response.ValidationErrors.Length);
        Assert.AreEqual(
            "Funnel stage with Id -1 is not found",
            response.ValidationErrors[0]);
    }

    [TestMethod]
    public void  MoveToNextStage_NextStageIsActuallyPreviousStage_ValidationError()
    {
        var previousStage = new FunnelStage
        {
            Id = 1,
            Order = 1
        };
        var currentStage = new FunnelStage
        {
            Id = 2,
            Order = 2
        };
        var stageSet = new[]
        {
            previousStage,
            currentStage
        };

        var candidateSet = new[]
        {
            new Candidate
            {
                Id = 1,
                CurrentStage = currentStage
            }
        };
        var mockDbContext = MockDbContext(candidateSet, stageSet);
        var mockFeedbackProcessor = new Mock<IFeedbackProcessor>();
        var mockDateTimeProvider = new Mock<IDateTimeProvider>();

        var funnelProcessor = new FunnelProcessor(
            mockDbContext.Object,
            mockDateTimeProvider.Object,
            mockFeedbackProcessor.Object);


        var response = funnelProcessor.MoveToNextStage(
            candidateId: candidateSet[0].Id,
            nextStageId: previousStage.Id,
            motivation: "",
            decisionMaker: new ApplicationUser());


        Assert.IsFalse(response.Succeeded);
        Assert.IsNotNull(response.ValidationErrors);
        Assert.AreEqual(1, response.ValidationErrors.Length);
        Assert.AreEqual(
            "You can not move the candidate to previous funnel stage",
            response.ValidationErrors[0]);
    } 

    [TestMethod]
    public void  MoveToNextStage_NextStageIsActuallyCurrentStage_ValidationError()
    {
        var currentStage = new FunnelStage { Id = 2 };
        var stageSet = new[]
        {
            currentStage
        };

        var candidateSet = new[]
        {
            new Candidate
            {
                Id = 1,
                CurrentStage = currentStage
            }
        };
        var mockDbContext = MockDbContext(candidateSet, stageSet);
        var mockFeedbackProcessor = new Mock<IFeedbackProcessor>();
        var mockDateTimeProvider = new Mock<IDateTimeProvider>();

        var funnelProcessor = new FunnelProcessor(
            mockDbContext.Object,
            mockDateTimeProvider.Object,
            mockFeedbackProcessor.Object);


        var response = funnelProcessor.MoveToNextStage(
            candidateId: candidateSet[0].Id,
            nextStageId: currentStage.Id,
            motivation: "",
            decisionMaker: new ApplicationUser());


        Assert.IsFalse(response.Succeeded);
        Assert.IsNotNull(response.ValidationErrors);
        Assert.AreEqual(1, response.ValidationErrors.Length);
        Assert.AreEqual(
            "The candidate is already at the selected funnel stage",
            response.ValidationErrors[0]);
    } 

    [TestMethod]
    public void MoveToNextStage_HappyPath()
    {
        var currentDateTimeUtc = DateTime.UtcNow;
        var currentStage = new FunnelStage
        {
            Id = 1,
            Order = 1
        };
        var nextStage = new FunnelStage
        {
            Id = 2,
            Order = 2
        };
        var candidate = new Candidate
        {
            Id = 1,
            CurrentStageId = currentStage.Id,
            CurrentStage = currentStage,
            StageEntranceDateTimeUtc = currentDateTimeUtc.AddDays(-8)
        };
        var motivation = "some motivation";
        var decisionMaker = new ApplicationUser { Id = "4" };

        var stageSet = new[]
        {
            currentStage,
            nextStage
        };
        var candidateSet = new[] { candidate };
        var mockDbContext = MockDbContext(candidateSet, stageSet);
        var mockFeedbackProcessor = new Mock<IFeedbackProcessor>();
        mockFeedbackProcessor.Setup(
                p => p.SaveFeedback(motivation, candidate, decisionMaker))
            .Returns(CreationResponse.CreateSuccessResponse);
        var dateTimeProvider = new FixedDateTimeProvider(currentDateTimeUtc);

        var funnelProcessor = new FunnelProcessor(
            mockDbContext.Object,
            dateTimeProvider,
            mockFeedbackProcessor.Object);


        var response = funnelProcessor.MoveToNextStage(
            candidate.Id,
            nextStage.Id,
            motivation,
            decisionMaker);


        Assert.IsTrue(response.Succeeded);
        Assert.IsNull(response.ValidationErrors);
        
        Assert.AreEqual(nextStage.Id, candidate.CurrentStageId);
        Assert.AreEqual(currentDateTimeUtc, candidate.StageEntranceDateTimeUtc);
    }

    private static Mock<AppDbContext> MockDbContext(
        IEnumerable<Candidate> candidateSet,
        IEnumerable<FunnelStage> stageSet)
    {
        var mockConfiguration = new Mock<IConfiguration>();
        var mockDbContext = new Mock<AppDbContext>(mockConfiguration.Object);

        var mockCandidateSet = candidateSet.AsQueryable().MockAsDbSet();
        var mockStageSet = stageSet.AsQueryable().MockAsDbSet();

        mockDbContext.Setup(c => c.Candidates)
            .Returns(mockCandidateSet.Object);
        mockDbContext.Setup(c => c.FunnelStage)
            .Returns(mockStageSet.Object);

        return mockDbContext;
    }
}