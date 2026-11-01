import type { CompanionStaticUpgradeScript } from '@companion-module/base'
import type { ModuleConfig } from './config.js'
import { upgrade as upgrade_20261008_0447_mapping_rewrite } from './upgrades/20261008_0447_mapping_rewrite.js'

export const UpgradeScripts: CompanionStaticUpgradeScript<ModuleConfig>[] = [
	/*
	 * Place your upgrade scripts here
	 * Remember that once it has been added it cannot be removed!
	 */
	upgrade_20261008_0447_mapping_rewrite,
]
