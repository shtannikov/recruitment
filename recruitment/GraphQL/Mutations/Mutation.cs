using HotChocolate.Authorization;

namespace recruitment.GraphQL;

public class Mutation
{
    [Authorize(Roles = new [] { "LeadRecruiter", "Helpdesk" })]
    public AdministrationMutation Administrations => new AdministrationMutation();

    [Authorize(Roles = new [] { "Recruiter", "LeadRecruiter" })]
    public CandidatesMutation Candidates => new CandidatesMutation();
}