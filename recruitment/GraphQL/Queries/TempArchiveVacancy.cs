using recruitment.data;

namespace recruitment.GraphQL;

public static class ArchiveVacancy
{
    public static Vacancy GetVacancy(CandidateRepository repository)
    {
        var candidate = repository.Get();
        var vacancy = new Vacancy
        {
            Id = 3,
            Name = "Разработчик Backend(Архив)",
            RecruitemtFunnelId = 2,
            RecruitemtFunnel = new Funnel
            {
                Id = 2,
                OrderedStages = new[]
            {
                new FunnelStage
                {
                    Id = 10,
                    Order = 1,
                    Name = "Отказ",
                    Candidates = new []
                    {
                        new Candidate
                        {
                            Id = 7,
                            FirstName = "Марина",
                            MiddleName = "Андреевна",
                            LastName = "Кузмичева",
                            ElapsedDaysInCurrentStage = 9,
                            City = "Moscow",
                            Contacts = new Contact[]
                            {
                                new Contact()
                                {
                                    Id = 1,
                                    CandidateId = 7,
                                    Type = "телефон",
                                    Value = "+79841234567"
                                },
                                new Contact()
                                {
                                    Id = 2,
                                    CandidateId = 7,
                                    Type = "почта",
                                    Value = "123@mail.com"
                                }

                            }
                        },
                    }
                },
            }
            }
        };

        vacancy.RecruitemtFunnel.Vacancy = vacancy;

        return vacancy;
    }
}