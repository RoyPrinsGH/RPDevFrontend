using RPDev.Endpoints;

namespace RPDev;

public class RPDevBackend {
    public static void Main(string[] args) {
        BuildRPDevBackendApp(args).Run();
    }

    private static WebApplication BuildRPDevBackendApp(string[] args) {
        WebApplication app = MakeWebAppWithRPDevServices(args);

        app.ConfigureRPDevMiddlewarePipeline(env: app.Environment);
        app.ConfigureGenericRPDevEndpoints();

        app.MapGetAllTodoItems();

        return app;
    }

    private static WebApplication MakeWebAppWithRPDevServices(string[] args) {
        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

        builder.Services.ConfigureRPDevServices();

        return builder.Build();
    }
}
