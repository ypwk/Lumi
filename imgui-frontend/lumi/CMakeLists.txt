

cmake_minimum_required(VERSION 3.8)

file(GLOB_RECURSE SRC_FILES CONFIGURE_DEPENDS
    "${PROJECT_SOURCE_DIR}/lumi/src/*.cpp"
    "${PROJECT_SOURCE_DIR}/external/imgui/imgui/*.cpp"
)

# Add source to this project's executable.
add_executable(Lumi_FE
	"app.cpp" ${SRC_FILES} 
  )

target_link_libraries(Lumi_FE PUBLIC
	glfw
	libglew_static
	${CURL_LIBRARIES}
)