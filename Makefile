all: set-executables
	@echo "Done."

set-executables:
	@chmod -R +x src/bin tests/bin

server:
	@./src/bin/run_server.sh

test: test-unit

test-unit:
	@./tests/bin/test_unit.sh
