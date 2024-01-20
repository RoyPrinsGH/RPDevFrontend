namespace RPDev.Endpoints;

using Microsoft.AspNetCore.Mvc;
using RPDev.Models.Representations;
using Services.TodoItems;
using Services.TodoItems.Commands;

public static class TodoItems {
    private const string _todoItemsApiPath = "/api/todoitems";

    public static IEndpointRouteBuilder ConfigureTodoItemsEndpoints(this IEndpointRouteBuilder routeBuilder) {
        RouteGroupBuilder groupBuilder = routeBuilder.MapGroup(_todoItemsApiPath);

        groupBuilder.MapGet("/", (Delegate) GetAll)
                    .Produces<List<TodoItemReadOnly>>();

        groupBuilder.MapGet("/{id}", GetById)
                    .Produces<TodoItemReadOnly>(500)
                    .ProducesProblem(404);

        groupBuilder.MapPost("/", Create)
                    .Accepts<TodoItemCreateCommand>("application/json")
                    .Produces<TodoItemReadOnly>(201)
                    .ProducesProblem(400);

        return routeBuilder;
    }

    public static async Task<IResult> GetAll(HttpContext context) {
        ITodoItemService todoItemService = context.RequestServices.GetRequiredService<ITodoItemService>();
        return Results.Ok(await todoItemService.GetAllTodoItems());
    }

    public static async Task<IResult> GetById(HttpContext context, int id) {
        ITodoItemService todoItemService = context.RequestServices.GetRequiredService<ITodoItemService>();
        (bool success, TodoItemReadOnly? item) = await todoItemService.GetTodoItemById(id);
        if (success) {
            return Results.Ok(item);
        }
        return Results.NotFound(new ProblemDetails {
            Title = "The specified TodoItem does not exist.",
            Status = StatusCodes.Status404NotFound,
            Detail = "The specified TodoItem does not exist.",
            Type = "https://tools.ietf.org/html/rfc7231#section-6.5.4",
            Instance = context.Request.Path
        });
    }

    public static async Task<IResult> Create(HttpContext context, TodoItemCreateCommand todoItemCreateCommand) {
        ITodoItemService todoItemService = context.RequestServices.GetRequiredService<ITodoItemService>();
        (bool success, string[] softErrors, TodoItemReadOnly? item) = await todoItemService.CreateTodoItem(todoItemCreateCommand);
        if (success) {
            return Results.Created($"{_todoItemsApiPath}/{item!.Id}", item);
        }
        return Results.BadRequest(new ProblemDetails {
            Title = "One or more validation errors occurred.",
            Status = StatusCodes.Status400BadRequest,
            Detail = "See the 'errors' property for details.",
            Type = "https://tools.ietf.org/html/rfc7231#section-6.5.1",
            Instance = context.Request.Path,
            Extensions = {
                ["errors"] = softErrors
            }
        });
    }
}