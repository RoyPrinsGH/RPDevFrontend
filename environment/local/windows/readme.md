# Local development on Windows
Clone the repo, then run CD into `environment/local/windows/scripts` (or equivalently, in VS Code, right click on the 'scripts' folder and open in terminal) for easy use of the commands given below.

## Environment setup
When first setting up for windows, use the `envsetup` command. You need administrator privileges for this one (for VS Code, simply start VS Code as admin). This command checks your environment setup (.NET 8, Node), and allows you to select an environment (Development, Staging, Production). **VS Code caches environment variables, so you need to restart after changing environment.**

## Running the front end only (enabling Vite hot reload)
The `frontend` command will start the Vite server. Making any change to a development file will cause Vite's loopback websocket to refresh the corresponding local page in the browser.

## Running the full app
The `build` and then `startapp` commands will build the project in the `environment/local/windows/devenv` folder and start Kestrel locally, which runs the API and serves the front end.

## Can't I just `npm run dev`/`dotnet run`?
As a maintenance measure, I rely on scripts. This way I can update the inner workings of the environment setup without ever changing the developer's workflow side of things. Kind of like Dependency Injection!

## Notes
- Do not modify any files in the `environment/local/windows/devenv` folder. This folder is not committed.