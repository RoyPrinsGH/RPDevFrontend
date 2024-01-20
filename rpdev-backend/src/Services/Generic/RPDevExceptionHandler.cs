namespace RPDev.Services.Generic;

using System.Net;

public class RPDevExceptionHandler(IProblemDetailsService problemDetailsService) : Microsoft.AspNetCore.Diagnostics.IExceptionHandler
{
    private readonly IProblemDetailsService _problemDetailsService = problemDetailsService;

    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        httpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        return await _problemDetailsService.TryWriteAsync(
            new ProblemDetailsContext
            {
                HttpContext = httpContext,
                ProblemDetails =
                    {
                        Title = "An exception occurred while processing your request.",
                        Detail = exception.Message,
                        Type = exception.GetType().Name,
                    },
                Exception = exception
            }
        );
    }
}