all: set-executables
	@echo "Done."

set-executables:
	@chmod -R +x tests/bin

server:
	@grunt server

babel:
	@grunt

test: test-unit

test-unit:
	@./tests/bin/test_unit.sh
