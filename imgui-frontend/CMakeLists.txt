# CMakeList.txt : CMake project for frontend, include source and define
# project specific logic here.
#
cmake_minimum_required (VERSION 3.8)

# Enable Hot Reload for MSVC compilers if supported.
if (POLICY CMP0141)
  cmake_policy(SET CMP0141 NEW)
  set(CMAKE_MSVC_DEBUG_INFORMATION_FORMAT "$<IF:$<AND:$<C_COMPILER_ID:MSVC>,$<CXX_COMPILER_ID:MSVC>>,$<$<CONFIG:Debug,RelWithDebInfo>:EditAndContinue>,$<$<CONFIG:Debug,RelWithDebInfo>:ProgramDatabase>>")
endif()

project ("Lumi_FE")

find_package(CURL REQUIRED)

set(GLFW_BUILD_DOCS OFF CACHE BOOL "" FORCE)
set(GLFW_BUILD_TESTS OFF CACHE BOOL "" FORCE)
set(GLFW_BUILD_EXAMPLES OFF CACHE BOOL "" FORCE)

add_subdirectory(${PROJECT_SOURCE_DIR}/lumi)
add_subdirectory(${PROJECT_SOURCE_DIR}/external/glew-cmake)
add_subdirectory(${PROJECT_SOURCE_DIR}/external/glfw)
add_subdirectory(${PROJECT_SOURCE_DIR}/external/curl)

target_include_directories(Lumi_FE PRIVATE
    ${PROJECT_SOURCE_DIR}/lumi/include
    ${PROJECT_SOURCE_DIR}/external/imgui/
    ${CURL_INCLUDE_DIRS}
)

target_include_directories(Lumi_FE PUBLIC
    ${PROJECT_SOURCE_DIR}/external/glew-cmake/include
    ${PROJECT_SOURCE_DIR}/external/glfw/include
    ${PROJECT_SOURCE_DIR}/external/curl/include
)

if (CMAKE_VERSION VERSION_GREATER 3.12)
  set_property(TARGET Lumi_FE PROPERTY CXX_STANDARD 20)
endif()

# TODO: Add tests and install targets if needed.
