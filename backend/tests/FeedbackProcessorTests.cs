using Microsoft.Extensions.Configuration;
using Moq;
using recruitment.Data;
using recruitment.GraphQL;

namespace tests;

[TestClass]
public class FeedbackProcessorTests
{
    [TestMethod]
    public void SaveFeedback_TextWithWhiteSpacesOnly_ValidationError()
    {
        var text = $" {Environment.NewLine} ";

        var mockConfiguration = new Mock<IConfiguration>();
        var mockDbContext = new Mock<AppDbContext>(mockConfiguration.Object);
        var mockDateTimeProvider = new Mock<IDateTimeProvider>();
        var feedbackProcessor = new FeedbackProcessor(
            mockDbContext.Object,
            mockDateTimeProvider.Object);


        var response = feedbackProcessor.SaveFeedback(
            text,
            new Candidate(),
            author: new ApplicationUser());


        Assert.IsFalse(response.Succeeded);
        Assert.IsNotNull(response.ValidationErrors);
        Assert.AreEqual(1, response.ValidationErrors.Length);
        Assert.AreEqual(
            "Text can not be empty or contain white-space characters only",
            response.ValidationErrors[0]);
    }

    [TestMethod]
    public void SaveFeedback_HappyPath()
    {
        var text = "some text";
        var candidate = new Candidate { Id = 3 };
        var author = new ApplicationUser { Id = "4" };
        var creationDateTimeUtc = DateTime.UtcNow;

        var actualFeedback = default(Feedback);
        var mockFeedbackSet = Array.Empty<Feedback>()
            .AsQueryable()
            .MockAsDbSet();
        mockFeedbackSet.Setup(s => s.Add(It.IsAny<Feedback>()))
            .Callback((Feedback f) => actualFeedback = f);

        var mockConfiguration = new Mock<IConfiguration>();
        var mockDbContext = new Mock<AppDbContext>(mockConfiguration.Object);
        mockDbContext.Setup(c => c.Feedbacks)
            .Returns(mockFeedbackSet.Object);
        var dateTimeProvider = new FixedDateTimeProvider(creationDateTimeUtc);
        var feedbackProcessor = new FeedbackProcessor(
            mockDbContext.Object,
            dateTimeProvider);


        var response = feedbackProcessor.SaveFeedback(
            text,
            candidate,
            author);


        Assert.IsTrue(response.Succeeded);
        Assert.IsNull(response.ValidationErrors);

        Assert.IsNotNull(actualFeedback);
        Assert.AreEqual(text, actualFeedback.Text);
        Assert.AreEqual(candidate.Id, actualFeedback.CandidateId);
        Assert.AreEqual(author.Id, actualFeedback.AuthorId);
        Assert.AreEqual(creationDateTimeUtc, actualFeedback.CreationDateTimeUtc);
    }
}