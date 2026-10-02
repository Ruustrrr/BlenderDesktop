# SPDX-License-Identifier: MIT
cmake_minimum_required(VERSION 3.21)

project(BlenderDesktopPlatform LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

option(BUILD_SERVER "Build the C++ world server" ON)
option(BUILD_TESTS "Build test targets" OFF)

if(BUILD_SERVER)
  add_subdirectory(src/server)
endif()

if(BUILD_TESTS)
  enable_testing()
  add_subdirectory(tests)
endif()

message(STATUS "BlenderDesktop Platform configured")
message(STATUS "Client target: Babylon.js + HTML portal system")
message(STATUS "Server target: C++ world service")
