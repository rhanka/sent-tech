PNPM?=pnpm

.PHONY: dev lint lint-api lint-ui test test-api test-ui test-e2e build build-api build-ui migrate seed

dev:
docker compose up --build

lint: lint-api lint-ui

lint-api:
$(PNPM) --filter sent-tech-api lint

lint-ui:
$(PNPM) --filter sent-tech-ui lint

test: test-api test-ui test-e2e

test-api:
$(PNPM) --filter sent-tech-api test

test-ui:
$(PNPM) --filter sent-tech-ui test

test-e2e:
$(PNPM) --filter sent-tech-e2e test

build: build-api build-ui

build-api:
$(PNPM) --filter sent-tech-api build

build-ui:
$(PNPM) --filter sent-tech-ui build

migrate:
cd api && $(PNPM) drizzle-kit push

seed:
cd api && $(PNPM) exec tsx scripts/seed.ts
