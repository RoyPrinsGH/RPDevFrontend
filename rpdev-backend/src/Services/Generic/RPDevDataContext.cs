namespace RPDev.Services.Generic;

using Microsoft.EntityFrameworkCore;
using Models.DatabaseObjects;

public class RPDevDataContext(DbContextOptions<RPDevDataContext> options) : DbContext(options) {
    public DbSet<TodoItem> TodoItems { get; set; }
}