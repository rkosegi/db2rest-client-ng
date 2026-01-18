#	Copyright 2025 Richard Kosegi
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

.DEFAULT_GOAL := build

gen:
	npx -y @openapitools/openapi-generator-cli generate \
		--global-property models,apis,supportingFiles		\
		--generator-name typescript-angular				\
		--config apigen.config.json		\
		--input-spec-root-directory .cache/specs 	\
		--output projects/db2rest-client-ng/src/lib/spec
	cd projects/db2rest-client-ng/src/lib/spec && rm -fr git_push.sh README.md .gitignore .openapi-generator-ignore .openapi-generator

build:
	npm ci
	ng build
	cd dist/db2rest-client-ng
	npm pack --pack-destination dist

prepare:
	test -d .cache/specs || mkdir -p .cache/specs

download-spec: prepare
	test -f  .cache/specs/openapi.yaml || \
		curl -sSL -o .cache/specs/openapi.yaml --url https://raw.githubusercontent.com/rkosegi/db2rest-bridge/refs/tags/v1.0.6/pkg/api/openapi.yaml
