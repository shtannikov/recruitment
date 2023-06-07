using Microsoft.EntityFrameworkCore;
using Moq;

namespace tests;

public static class QueryableExtensions
{
    public static Mock<DbSet<TEntity>> MockAsDbSet<TEntity>(this IQueryable<TEntity> data)
        where TEntity : class
    {
        var mockSet = new Mock<DbSet<TEntity>>();
        mockSet.As<IQueryable<TEntity>>().Setup(m => m.Provider).Returns(data.Provider);
        mockSet.As<IQueryable<TEntity>>().Setup(m => m.Expression).Returns(data.Expression);
        mockSet.As<IQueryable<TEntity>>().Setup(m => m.ElementType).Returns(data.ElementType);
        mockSet.As<IQueryable<TEntity>>().Setup(m => m.GetEnumerator()).Returns(() => data.GetEnumerator());
        return mockSet;
    }
}