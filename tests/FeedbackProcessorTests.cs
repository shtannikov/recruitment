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
        var feedbackProcessor = new FeedbackProcessor(mockDbContext.Object);

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
}