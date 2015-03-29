export NBACK_FUNCTIONAL_TESTS_HEADLESS=false
ABSOLUTE_DIR=$(dirname "$(readlink -f "$0")")

sh "$ABSOLUTE_DIR"/test_functional_path.sh "$1"