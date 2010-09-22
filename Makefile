V ?= 1

SRC_DIR = src
BUILD_DIR = build

PREFIX = .
DIST_DIR = ${PREFIX}/dist

#RHINO ?= java -jar ${BUILD_DIR}/js-1.7R2.jar

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

UPHEAVAL = ${DIST_DIR}/upheaval.js
UPHEAVAL_MIN = ${DIST_DIR}/upheaval.min.js

UPHEAVAL_VERSION = $(shell cat VERSION)
VER = sed s/@VERSION/${UPHEAVAL_VERSION}/

all: upheaval min
	@@echo "Upheaval build complete."

${DIST_DIR}
	@@mkdir -p ${DIST_DIR}

ifeq ($(strip $(V)),0)
verbose = --quiet
else ifeq($(strip $(V)),1)
verbose =
else
verbose = --verbose
endif

upheaval: ${UPHEAVAL}

${UPEHAVAL}: ${ALL_FILES} ${DIST_DIR}
	@@echo "Building" ${UPHEAVAL}
	
	@@cat ${ALL_FILES} | ${VER} > ${UPHEAVAL}

min: ${UPHEAVAL_MIN}

${UPHEAVAL_MIN}: ${UPHEAVAL}
	@@echo "Building" ${UPHEAVAL_MIN}
	
	@@${MINIFY} --js ${UPHEAVAL} --warning_level QUIET --js_output_file ${UPHEAVAL_MIN}

clean:
	@@echo "Removing dist dir:" ${DIST_DIR}
	@@rm -rf ${DIST_DIR}

.PHONY all upheaval min clean
