#!/usr/bin/env bash
#
# Creates Container/View/Store files.
#
set -ue -o pipefail
export LC_ALL=C

RootDir=$(cd $(dirname $0); pwd | xargs dirname)
CurrentDir=$(cd $(dirname $0); pwd)

usage_exit() {
  echo "Usage: $0 base_name" 1>&2
  exit 1
}

while getopts ad:h OPT
do
    case $OPT in
        h)  usage_exit
            ;;
        \?) usage_exit
            ;;
    esac
done

shift $((OPTIND - 1))

if [ $# -ne 1 ] || [ $# -ge 2 ]; then
    usage_exit
fi

BASE=$1

# Container
CONTAINER_JS=${BASE}Container.js
CONTAINER_PATH=${RootDir}/src/container/${CONTAINER_JS}

if [ -f ${CONTAINER_PATH} ]; then
  echo "${CONTAINER_PATH} exists: ...skipped"
else
  BASE=${BASE} ${CurrentDir}/template/mo ${CurrentDir}/template/container.mo > ${CONTAINER_PATH}
  echo "${CONTAINER_PATH}  ...generated"
fi

# View
VIEW_JS=${BASE}View.js
VIEW_PATH=${RootDir}/src/view/${VIEW_JS}

if [ -f ${VIEW_PATH} ]; then
  echo "${VIEW_PATH} exists: ...skipped"
else
  BASE=${BASE} ${CurrentDir}/template/mo ${CurrentDir}/template/view.mo > ${VIEW_PATH}
  echo "${VIEW_PATH}  ...generated"
fi

# Store
STORE_JS=${BASE}Store.js
STORE_PATH=${RootDir}/src/store/${STORE_JS}

if [ -f ${STORE_PATH} ]; then
  echo "${STORE_PATH} exists: ...skipped"
else
  BASE=${BASE} ${CurrentDir}/template/mo ${CurrentDir}/template/store.mo > ${STORE_PATH}
  echo "${STORE_PATH}  ...generated"
fi

