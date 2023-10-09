#include <stdio.h>
#include <iostream>
#include <filesystem>

#include "GL/glew.h"

#include <GLFW\glfw3.h>
#include <imgui\imgui.h>
#include <imgui\imgui_impl_glfw.h>
#include <imgui\imgui_impl_opengl3.h>


static void glfw_error_callback(int error, const char* description)
{
    fprintf(stderr, "GLFW Error %d: %s\n", error, description);
}

int main(void)
{
    // debug output exe path
    //std::cout << "Current path is " << std::filesystem::current_path() << '\n';

    glfwSetErrorCallback(glfw_error_callback);

    GLFWwindow* window;

    /* Initialize the library */
    if (!glfwInit())
        return -1;

    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
    glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);

    /* Create a windowed mode window and its OpenGL context */
    window = glfwCreateWindow(1280, 720, "DecoderVIS", NULL, NULL);
    if (!window)
    {
        glfwTerminate();
        return -1;
    }

    Input InputHandler(window);

    /* Make the window's context current */
    glfwMakeContextCurrent(window);
    glfwSwapInterval(1); // Enable vsync

    if (glewInit() != GLEW_OK)
        std::cout << "Error!" << std::endl;

    std::cout << glGetString(GL_VERSION) << std::endl;
    {
        ImGui_ContentWindowHandler IG_CWHandler(1280, 720);
        IG_CWHandler.RenderInit();

        // init engine
        Engine RenderEngine = Engine();

        // init input
        InputHandler.SetEngine(&RenderEngine);

        // init central node handler
        CentralNodeHandler CNH = CentralNodeHandler();

        // init simulation
        Simulation sim = Simulation(&RenderEngine);

        int counter = 0;

        ImGui_Handler IG_Handler = ImGui_Handler();
        IG_Handler.Create(window);

        sim.updateEngineForCode(&InputHandler);

        /* Loop until the user closes the window */
        while (!glfwWindowShouldClose(window))
        {
            counter = (counter + 1) % sim.delay;

            if (!counter) {
                sim.doTimeStep();
            }

            // clear
            IG_Handler.NewFrame();

            // render central node
            CNH.Render();

            // render controller window
            ImGui::Begin("Controller");
            {
                ImGuiIO& io = ImGui::GetIO(); (void)io;

                ImGui::Text("DisplaySize = %f,%f", io.DisplaySize.x, io.DisplaySize.y);
                ImGui::Text("Application average %.3f ms/frame (%.1f FPS)", 1000.0f / io.Framerate, io.Framerate);

            ImGui:ImGui::SliderInt("Frames/Update", &sim.delay, 1, 100);
            }
            ImGui::End();

            IG_Handler.Render();

            glfwSwapBuffers(window);
            glfwPollEvents();
        }

        // Cleanup
        IG_Handler.Shutdown();
    }
    glfwDestroyWindow(window);
    glfwTerminate();

    return 0;
}