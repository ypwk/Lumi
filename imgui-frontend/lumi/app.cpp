#include <stdio.h>
#include <iostream>
#include <filesystem>

#include "GL/glew.h"

#include "ig_window.h"
#include "central_node_handler.h"

#include <GLFW\glfw3.h>
#include <imgui\imgui.h>
#include <imgui\imgui_impl_glfw.h>
#include <imgui\imgui_impl_opengl3.h>

#include <curl\curl.h>
#include <thread>

#include "whisper.h"

// command-line parameters
struct whisper_params {
    int32_t n_threads = (int32_t)std::thread::hardware_concurrency();
    int32_t voice_ms = 10000;
    int32_t capture_id = -1;
    int32_t max_tokens = 32;
    int32_t audio_ctx = 0;

    float vad_thold = 0.6f;
    float freq_thold = 100.0f;

    bool speed_up = false;
    bool translate = false;
    bool print_special = false;
    bool print_energy = false;
    bool no_timestamps = true;

    std::string person = "Santa";
    std::string language = "en";
    std::string model_wsp = "models/ggml-base.en.bin";
    std::string model_gpt = "models/ggml-gpt-2-117M.bin";
    std::string speak = "./examples/talk/speak";
    std::string fname_out;
};


static void glfw_error_callback(int error, const char* description)
{
    fprintf(stderr, "GLFW Error %d: %s\n", error, description);
}

static bool created = false;
std::vector<std::string> chatMessages;

// Callback function to handle received data
size_t WriteCallback(void* contents, size_t size, size_t nmemb, void* userp) {
    // Process the data as it arrives
    if (!created) {
        chatMessages.push_back("");
        created = true;
    }
    chatMessages[chatMessages.size() - 1].append((char*)contents, size * nmemb);
    return size * nmemb;
}

static void StreamData(char* query) {
    std::cout << query << std::endl;
    curl_global_init(CURL_GLOBAL_DEFAULT);
    CURL* curl;
    CURLcode res;
    std::string readBuffer;
    std::string url = "http://127.0.0.1:5000/query/";
    created = false;

    curl = curl_easy_init();
    if (curl) {
        char* enc_query = curl_easy_escape(curl, query, strlen(query));
        url.append(enc_query);
        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &readBuffer);
        res = curl_easy_perform(curl);
        curl_easy_cleanup(curl);
    }

    chatMessages[chatMessages.size() - 1] = chatMessages[chatMessages.size() - 1].substr(0, chatMessages[chatMessages.size() - 1].length() - 4);
}

void ThreadFunction(char* query) {
    StreamData(query);
    // Clear the input buffer for the next message
    std::memset(query, 0, sizeof(query));
}

int main(void)
{
    // debug output exe path
    //std::cout << "Current path is " << std::filesystem::current_path() << '\n';

    whisper_params params;

    glfwSetErrorCallback(glfw_error_callback);

    GLFWwindow* window;

    /* Initialize the library */
    if (!glfwInit())
        return -1;

    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
    glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);

    /* Create a windowed mode window and its OpenGL context */
    window = glfwCreateWindow(1280, 720, "Lumi", NULL, NULL);
    if (!window)
    {
        glfwTerminate();
        return -1;
    }

    /* Make the window's context current */
    glfwMakeContextCurrent(window);
    glfwSwapInterval(1); // Enable vsync

    if (glewInit() != GLEW_OK)
        std::cout << "Error!" << std::endl;

    std::cout << glGetString(GL_VERSION) << std::endl;
    {
        // init central node handler
        CentralNodeHandler CNH = CentralNodeHandler();

        ImGui_Handler IG_Handler = ImGui_Handler();
        IG_Handler.Create(window);

        /* Loop until the user closes the window */
        while (!glfwWindowShouldClose(window))
        {

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
            }
            ImGui::End();

            ImGui::Begin("Chat");
            {

                // Display chat history (assuming some messages are stored in a vector or similar)
                for (const auto& message : chatMessages)
                {
                    ImGui::TextWrapped("%s", message.c_str());
                }

                // Input text box for typing a new message
                static char inputBuffer[256] = "";
                ImGui::InputText("Type a message", inputBuffer, 256, ImGuiInputTextFlags_EnterReturnsTrue);

                // Handle sending the message when Enter is pressed
                if (ImGui::IsItemDeactivatedAfterEdit() && inputBuffer[0] != '\0')
                {
                    // Add the message to the chat history
                    chatMessages.push_back(inputBuffer);

                    std::thread myThread(ThreadFunction, inputBuffer);
                    myThread.detach();

                    // Scroll to the bottom to show the latest message
                    ImGui::SetScrollHereY(1.0f);
                }
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
