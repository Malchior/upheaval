SRC_DIR = src
BUILD_DIR = build

PREFIX = .
DIST_DIR = ${PREFIX}/dist

RHINO ?= java -jar ${BUILD_DIR}/js-1.7R2.jar

CLOSURE_COMPILER = ${BUILD_DIR}/google-compiler-20100917.jar

MINIFY ?= java -jar ${CLOSURE_COMPILER}

DEPS_DIR = deps
DEPS_FILES = ${DEPS_DIR}/jquery.js

SYS_DIR = ${SRC_DIR}/sys
SYS_FILES = ${SYS_DIR}/graphics.js\
	${SYS_DIR}/audio.js\
	${SYS_DIR}/io.js\
	${SYS_DIR}/conf.js\
	${SYS_DIR}/time.js

ENGINE_DIR = ${SRC_DIR}/engine
ENGINE_FILES = ${ENGINE_DIR}/render.js

API_DIR = ${SRC_DIR}/api
API_FILES = ${API_DIR}/core.js

ALL_FILES = ${DEPS_FILES}\
	${SRC_DIR}/header.js\
	${SRC_DIR}/console.js\
	${SYS_FILES}\
	${ENGINE_FILES}\
	${API_FILES}\
	${SRC_DIR}/footer.js
