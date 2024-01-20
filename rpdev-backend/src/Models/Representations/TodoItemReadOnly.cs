namespace RPDev.Models.Representations;

/// <summary>
/// Represents a TodoItem that is read-only and untracked by Entity Framework.
/// </summary>
public record TodoItemReadOnly(int Id, string Name, bool IsComplete);