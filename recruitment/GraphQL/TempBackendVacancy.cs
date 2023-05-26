namespace recruitment.GraphQL;

public static class BackendVacancy
{
    public static Vacancy Value = new Vacancy
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
                    Candidates = new[]
                    {
                        new Candidate
                        {
                            Id = 7,
                            FirstName = "Марина",
                            MiddleName = "Андреевна",
                            LastName = "Кузмичева",
                            ElapsedDaysInCurrentStage = 9
                        },
                        new Candidate
                        {
                            Id = 8,
                            FirstName = "Роман",
                            LastName = "Мисюрев",
                            ElapsedDaysInCurrentStage = 7
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
}