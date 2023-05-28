using recruitment.data;

namespace recruitment.GraphQL;

public static class BackendVacancy
{
    public static Vacancy GetVacancy(CandidateRepository repository)
    {
        var candidate = repository.Get();
        var vacancy = new Vacancy
        {
            Id = 2,
            Name = "Разработчик Backend",
            RecruitemtFunnelId = 2,
            RecruitemtFunnel = new Funnel
            {
                Id = 2,
                OrderedStages = new[]
            {
                new FunnelStage
                {
                    Id = 4,
                    Order = 1,
                    Name = "Новые отклики",
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
                        new Candidate
                        {
                            Id = candidate.Id,
                            FirstName = candidate.FirstName,
                            LastName = candidate.LastName,
                            ElapsedDaysInCurrentStage = 250,
                        }
                    }
                },
                new FunnelStage
                {
                    Id = 5,
                    Order = 2,
                    Name = "Техническое интервью",
                    Candidates = new[]
                    {
                        new Candidate
                        {
                            Id = 9,
                            FirstName = "Павел",
                            LastName = "Кравцов",
                            ElapsedDaysInCurrentStage = 1
                        }
                    }
                },
                new FunnelStage
                {
                    Id = 6,
                    Order = 3,
                    Name = "Командное интервью",
                    Candidates = new[]
                    {
                        new Candidate
                        {
                            Id = 10,
                            FirstName = "Давид",
                            LastName = "Хуриев",
                            ElapsedDaysInCurrentStage = 0
                        }
                    }
                }
            }
            }
        };

        vacancy.RecruitemtFunnel.Vacancy = vacancy;

        return vacancy;
    }
}