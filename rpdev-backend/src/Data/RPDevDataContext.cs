namespace RPDev.Data;

using Microsoft.EntityFrameworkCore;
using Models;

public class RPDevDataContext(DbContextOptions<RPDevDataContext> options) : DbContext(options) {
    public DbSet<TodoItem> TodoItems { get; set; }
}