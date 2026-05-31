.PHONY: build
build:
	pnpm api:build:bundle
# 	todo build FE

.PHONY: test
test:
# 	todo test unit/integration
	pnpm e2e

.PHONY: ci
ci:
	${MAKE} build
	${MAKE} test
