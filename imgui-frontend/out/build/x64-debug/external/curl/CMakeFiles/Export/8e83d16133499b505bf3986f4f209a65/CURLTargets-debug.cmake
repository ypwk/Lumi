#----------------------------------------------------------------
# Generated CMake target import file for configuration "Debug".
#----------------------------------------------------------------

# Commands may need to know the format version.
set(CMAKE_IMPORT_FILE_VERSION 1)

# Import target "CURL::libcurl_static" for configuration "Debug"
set_property(TARGET CURL::libcurl_static APPEND PROPERTY IMPORTED_CONFIGURATIONS DEBUG)
set_target_properties(CURL::libcurl_static PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_DEBUG "C"
  IMPORTED_LOCATION_DEBUG "${_IMPORT_PREFIX}/lib/libcurl-d.lib"
  )

list(APPEND _cmake_import_check_targets CURL::libcurl_static )
list(APPEND _cmake_import_check_files_for_CURL::libcurl_static "${_IMPORT_PREFIX}/lib/libcurl-d.lib" )

# Import target "CURL::curl" for configuration "Debug"
set_property(TARGET CURL::curl APPEND PROPERTY IMPORTED_CONFIGURATIONS DEBUG)
set_target_properties(CURL::curl PROPERTIES
  IMPORTED_LOCATION_DEBUG "${_IMPORT_PREFIX}/bin/curl.exe"
  )

list(APPEND _cmake_import_check_targets CURL::curl )
list(APPEND _cmake_import_check_files_for_CURL::curl "${_IMPORT_PREFIX}/bin/curl.exe" )

# Commands beyond this point should not need to know the version.
set(CMAKE_IMPORT_FILE_VERSION)
