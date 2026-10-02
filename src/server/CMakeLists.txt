cmake_minimum_required(VERSION 3.21)

project(PlatformServer LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

include_directories(${CMAKE_CURRENT_SOURCE_DIR}/include)

add_executable(platform_server
  src/main.cpp
  src/world.cpp
  src/portal.cpp
  src/player.cpp
)

target_include_directories(platform_server
  PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}/include
)

message(STATUS "platform_server target configured")
