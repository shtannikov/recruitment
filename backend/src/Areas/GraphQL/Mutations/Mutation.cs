using HotChocolate.Authorization;

namespace recruitment.GraphQL;

public class Mutation
{
    [Authorize(Roles = new [] { "LeadRecruiter", "Helpdesk" })]
    public AdministrationMutation Administrations => new();

    [Authorize(Roles = new [] { "Recruiter", "LeadRecruiter" })]
    public CandidatesMutation Candidates => new();
}