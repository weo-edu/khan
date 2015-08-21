#
# Vars
#

BIN=node_modules/.bin

#
# Tasks
#

validate:
	@${BIN}/standard

.PHONY: validate