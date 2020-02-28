.DEFAULT_GOAL:=help
SHELL:=/bin/bash

PROJECT_NAME=$(shell basename $(CURDIR))
DOCKER_COMPOSE_DIR=./.docker
DOCKER_COMPOSE_FILE=$(DOCKER_COMPOSE_DIR)/docker-compose.yml
DOCKER_COMPOSE=docker-compose -f $(DOCKER_COMPOSE_FILE) --project-name $(PROJECT_NAME) --project-directory $(DOCKER_COMPOSE_DIR)
COMMAND=/bin/bash

.PHONY: help
help:
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

.PHONY: docker-build
docker-build: ## Build all images
	$(DOCKER_COMPOSE) build $(CONTAINER)

.PHONY: docker-up
docker-up: ## Start all containers
	$(DOCKER_COMPOSE) up -d $(CONTAINER)

.PHONY: docker-down
docker-down: ## Stop all containers
	$(DOCKER_COMPOSE) down $(CONTAINER)

.PHONY: docker-logs
docker-logs: ## Follow log output
	$(DOCKER_COMPOSE) logs -f $(CONTAINER)

.PHONY: docker-images
docker-images: ## List images
	$(DOCKER_COMPOSE) images

.PHONY: docker-ps
docker-ps: ## List containers
	$(DOCKER_COMPOSE) ps

.PHONY: docker-exec
docker-exec: ## Execute a command in the specified running container
	$(DOCKER_COMPOSE) exec $(CONTAINER) $(COMMAND)

.PHONY: docker-run
docker-run: ## Run a command in the specified container
	$(DOCKER_COMPOSE) run --rm $(CONTAINER) $(COMMAND)
