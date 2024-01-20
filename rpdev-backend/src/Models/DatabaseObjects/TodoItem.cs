namespace RPDev.Models.DatabaseObjects;

/// <summary>
/// Represents a TodoItem that is tracked by Entity Framework.
/// </summary>
public class TodoItem {
    public int Id { get; set; }
    public required string Name { get; set; }
    public bool IsComplete { get; set; }
}