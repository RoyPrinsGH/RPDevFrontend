namespace RPDev.Endpoints;

using RPDev.Services;

public static class GetAllTodoItems {
    public static IEndpointRouteBuilder MapGetAllTodoItems(this IEndpointRouteBuilder endpoints) {
        endpoints.MapGet("/api/todo-items", GetAllTodoItemsHandler);
        return endpoints;
    }
    private static IResult GetAllTodoItemsHandler(HttpContext context) {
        TodoItemService todoItemService = context.RequestServices.GetRequiredService<TodoItemService>();
        return Results.Ok(todoItemService.GetAllTodoItems());
    }
}