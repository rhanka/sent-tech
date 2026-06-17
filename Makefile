COMPOSE?=docker compose
WORKSPACE_SERVICE?=workspace
E2E_SERVICE?=e2e
UI_BUILD_API_BASE_URL?=http://localhost:8787/api/v1
DATABASE_URL?=postgres://senttech:senttech@db:5432/senttech

.PHONY: install dev lint lint-api lint-ui test test-api test-ui test-e2e build build-api build-ui migrate seed clean

define run_workspace
	$(COMPOSE) run --rm $(WORKSPACE_SERVICE) bash -lc "set -euo pipefail; $(1)"
endef

dev:
	$(COMPOSE) up --build

install:
	$(call run_workspace,npm install)

lint: lint-api lint-ui

lint-api:
	$(call run_workspace,npm run lint --workspace=sent-tech-api)

lint-ui:
	$(call run_workspace,npm run lint --workspace=sent-tech-ui)

test: test-api test-ui test-e2e

test-api:
	$(call run_workspace,npm run test --workspace=sent-tech-api)

test-ui:
	$(call run_workspace,npm run test --workspace=sent-tech-ui)

test-e2e:
	@$(COMPOSE) up -d db api
	@bash -c "set -euo pipefail; trap '$(COMPOSE) down --remove-orphans' EXIT; $(COMPOSE) run --rm $(E2E_SERVICE)"

build: build-api build-ui

build-api:
	$(call run_workspace,npm run build --workspace=sent-tech-api)

build-ui:
	$(COMPOSE) run --rm -e VITE_API_BASE_URL=$(UI_BUILD_API_BASE_URL) $(WORKSPACE_SERVICE) bash -lc "set -euo pipefail; npm run build --workspace=sent-tech-ui"

migrate:
	@$(COMPOSE) up -d db
	$(COMPOSE) run --rm -e DATABASE_URL=$(DATABASE_URL) $(WORKSPACE_SERVICE) bash -lc "set -euo pipefail; npm exec --workspace=sent-tech-api drizzle-kit push"

seed:
	@$(COMPOSE) up -d db
	$(COMPOSE) run --rm -e DATABASE_URL=$(DATABASE_URL) $(WORKSPACE_SERVICE) bash -lc "set -euo pipefail; npm exec --workspace=sent-tech-api tsx scripts/seed.ts"

clean:
	$(COMPOSE) down --remove-orphans --volumes
