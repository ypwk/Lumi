# Lumi — LLM Powered Voice Assistant

I usually test code using a backend server, served via SSH tunnel. 

## ImGUI Testing Frontend
A quick and dirty Dear ImGUI testing frontend is included in this repository under the ```imgui-frontend``` directory. This frontend uses [```GLFW```](https://github.com/glfw/glfw) and [```cURL```](https://github.com/curl/curl), which are linked as git submodules. Before compiling this with CMake, run the ```buildconf.bat``` file in the cURL subdirectory, at ```imgui-frontend/external/curl```.