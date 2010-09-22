#V ?= 1
OPT_LEVEL ?= 1

SRC_DIR = src
BUILD_DIR = build

PREFIX = .
DIST_DIR = ${PREFIX}/dist

#RHINO ?= java -jar ${BUILD_DIR}/js-1.7R2.jar

CLOSURE_COMPILER = ${BUILD_DIR}/closure-compiler-20100917.jar

MINIFY ?= java -jar ${CLOSURE_COMPILER}

DEPS_DIR = deps
DEPS_FILES = ${DEPS_DIR}/jquery.js

SYS_DIR = ${SRC_DIR}/sys

SYS_AUDIO_DIR = ${SYS_DIR}/audio
SYS_AUDIO_FILES = ${SYS_AUDIO_DIR}/audio.js

SYS_CONF_DIR = ${SYS_DIR}/conf
SYS_CONF_FILES = ${SYS_CONF_DIR}/conf.js

SYS_GRAPHICS_DIR = ${SYS_DIR}/graphics
SYS_GRAPHICS_FILES = ${SYS_GRAPHICS_DIR}/builder.js

SYS_IO_DIR = ${SYS_DIR}/io
SYS_IO_FILES = ${SYS_IO_DIR}/ajax.js

SYS_TIME_DIR = ${SYS_DIR}/time
SYS_TIME_FILES = ${SYS_TIME_DIR}/time.js

SYS_FILES = ${SYS_AUDIO_FILES}\
	${SYS_CONF_FILES}\
	${SYS_GRAPHICS_FILES}\
	${SYS_IO_FILES}\
	${SYS_TIME_FILES}

ENGINE_DIR = ${SRC_DIR}/engine

SUPPORT_DIR = ${ENGNIE_DIR}/support
SUPPORT_FILES = ${SUPPORT_DIR}/physics.js

ENGINE_FILES = ${SUPPORT_FILES}\
	${ENGINE_DIR}/render.js

API_DIR = ${SRC_DIR}/api
API_FILES = ${API_DIR}/core.js

ALL_FILES = ${DEPS_FILES}\
	${SRC_DIR}/header.js\
	${SRC_DIR}/console.js\
	${SYS_FILES}\
	${ENGINE_FILES}\
	${API_FILES}\
	${SRC_DIR}/footer.js

UPHEAVAL = ${DIST_DIR}/upheaval.js
UPHEAVAL_MIN = ${DIST_DIR}/upheaval.min.js

UPHEAVAL_VERSION = $(shell cat VERSION)
VER = sed s/@VERSION/${UPHEAVAL_VERSION}/

all: upheaval min
	@@echo "Upheaval build and minification complete."

${DIST_DIR}:
	@@echo "Creating" ${DIST_DIR}
	@@mkdir -p ${DIST_DIR}

ifeq ($(strip $(OPT_LEVEL)),0)
comp_level = WHITESPACE_ONLY
else ifeq ($(strip $(OPT_LEVEL)),1)
comp_level = SIMPLE_OPTIMIZATIONS
else ifeq ($(strip $(OPT_LEVEL)),2)
comp_level = ADVANCED_OPTIMIZATIONS
else
comp_level = SIMPLE_OPTIMIZATIONS
endif

upheaval: ${UPHEAVAL}

${UPHEAVAL}: ${ALL_FILES} ${DIST_DIR}
	@@echo "Building" ${UPHEAVAL}
	@@cat ${ALL_FILES} | ${VER} > ${UPHEAVAL}
	@@echo "Done."

min: ${UPHEAVAL_MIN}

${UPHEAVAL_MIN}: ${UPHEAVAL}
	@@echo "Building" ${UPHEAVAL_MIN}
	@@echo "Optimization level:" ${comp_level}
	@@${MINIFY} --js ${UPHEAVAL}\
	--warning_level QUIET\
	--compilation_level $(strip ${comp_level})\
	--js_output_file ${UPHEAVAL_MIN}
	@@echo "Done."

clean:
	@@echo "Removing dist dir:" ${DIST_DIR}
	@@rm -rf ${DIST_DIR}

.PHONY: all upheaval min clean
