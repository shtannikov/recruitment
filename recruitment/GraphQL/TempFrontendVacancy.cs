namespace recruitment.GraphQL;

public static class FrontendVacancy
{
    public static Vacancy GetValue()
    {
        var vacancy = new Vacancy
        {
            Id = 1,
            Name = "Разработчик Frontend",
            RecruitemtFunnelId = 1,
            RecruitemtFunnel = new Funnel
            {
                Id = 1,
                OrderedStages = new[]
                {
                    new FunnelStage
                    {
                        Id = 1,
                        Order = 1,
                        Name = "Новые отклики",
                        Candidates = new[]
                        {
                            new Candidate
                            {
                                Id = 1,
                                FirstName = "Евгений",
                                MiddleName = "Павлович",
                                LastName = "Штанников",
                                ElapsedDaysInCurrentStage = 15
                            },
                            new Candidate
                            {
                                Id = 2,
                                FirstName = "Кирилл",
                                LastName = "Родимов",
                                ElapsedDaysInCurrentStage = 6
                            }
                        }
                    },
                    new FunnelStage
                    {
                        Id = 2,
                        Order = 2,
                        Name = "Прескрин",
                        Candidates = new[]
                        {
                            new Candidate
                            {
                                Id = 3,
                                FirstName = "Сергей",
                                LastName = "Тарасенко",
                                ElapsedDaysInCurrentStage = 4
                            },
                            new Candidate
                            {
                                Id = 4,
                                FirstName = "Вячеслав",
                                LastName = "Филатов",
                                ElapsedDaysInCurrentStage = 3
                            }
                        }
                    },
                    new FunnelStage
                    {
                        Id = 3,
                        Order = 3,
                        Name = "Техническое интервью",
                        Candidates = new[]
                        {
                            new Candidate
                            {
                                Id = 5,
                                FirstName = "Никита",
                                LastName = "Прудников",
                                ElapsedDaysInCurrentStage = 8
                            },
                            new Candidate
                            {
                                Id = 6,
                                FirstName = "Андрейчук",
                                LastName = "Николай",
                                ElapsedDaysInCurrentStage = 2
                            }
                        }
                    },
                    new FunnelStage
                    {
                        Id = 7,
                        Order = 4,
                        Name = "Ждем выхода",
                        Candidates = new[]
                        {
                            new Candidate
                            {
                                Id = 11,
                                FirstName = "Юрий",
                                LastName = "Соколов",
                                ElapsedDaysInCurrentStage = 3
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