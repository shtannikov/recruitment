namespace recruitment.Data;

public class Vacancy
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int RecruitemtFunnelId { get; set; }
    public Funnel RecruitemtFunnel { get; set; }
}