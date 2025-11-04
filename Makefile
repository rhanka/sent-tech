COMPOSE?=docker compose
WORKSPACE_SERVICE?=workspace
E2E_SERVICE?=e2e
UI_BUILD_API_BASE_URL?=http://localhost:8787/api/v1
DATABASE_URL?=postgres://senttech:senttech@db:5432/senttech

.PHONY: install dev lint lint-api lint-ui test test-api test-ui test-e2e build build-api build-ui migrate seed clean

define run_workspace
	$(COMPOSE) run --rm $(WORKSPACE_SERVICE) bash -lc "set -euo pipefail; corepack enable; pnpm $(1)"
endef

dev:
	$(COMPOSE) up --build

install:
	$(call run_workspace,install)

lint: lint-api lint-ui

lint-api:
	$(call run_workspace,--filter sent-tech-api lint)

lint-ui:
	$(call run_workspace,--filter sent-tech-ui lint)

test: test-api test-ui test-e2e

test-api:
	$(call run_workspace,--filter sent-tech-api test)

test-ui:
	$(call run_workspace,--filter sent-tech-ui test)

test-e2e:
	@$(COMPOSE) up -d db api
	@bash -c "set -euo pipefail; trap '$(COMPOSE) down --remove-orphans' EXIT; $(COMPOSE) run --rm $(E2E_SERVICE)"

build: build-api build-ui

build-api:
	$(call run_workspace,--filter sent-tech-api build)

build-ui:
	$(COMPOSE) run --rm -e VITE_API_BASE_URL=$(UI_BUILD_API_BASE_URL) $(WORKSPACE_SERVICE) bash -lc "set -euo pipefail; corepack enable; pnpm --filter sent-tech-ui build"

migrate:
	@$(COMPOSE) up -d db
	$(COMPOSE) run --rm -e DATABASE_URL=$(DATABASE_URL) $(WORKSPACE_SERVICE) bash -lc "set -euo pipefail; corepack enable; pnpm --filter sent-tech-api exec drizzle-kit push"

seed:
	@$(COMPOSE) up -d db
	$(COMPOSE) run --rm -e DATABASE_URL=$(DATABASE_URL) $(WORKSPACE_SERVICE) bash -lc "set -euo pipefail; corepack enable; pnpm --filter sent-tech-api exec tsx scripts/seed.ts"

clean:
	$(COMPOSE) down --remove-orphans --volumes
