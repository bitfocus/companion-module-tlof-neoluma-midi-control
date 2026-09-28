import path from 'path'
import os from 'os'

function getXdgDir(envValue: string | undefined, defaultValue: string): string {
	if (typeof envValue !== 'undefined' && envValue.length > 0) return envValue
	return defaultValue
}

const XdgConfigHome = getXdgDir(process.env.XDG_CONFIG_HOME, path.join(os.homedir(), '.config'))
const XdgDataHome = getXdgDir(process.env.XDG_DATA_HOME, path.join(os.homedir(), '.local', 'share'))

export const VRC_EDITOR_PATH =
	os.platform() === 'win32'
		? path.join(os.homedir(), 'AppData', 'Local', 'Unity', 'Editor', 'Editor.log')
		: path.join(XdgConfigHome, 'unity3d', 'Editor.log')
export const VRC_PATH = path.join(
	os.platform() === 'win32' ? path.join(os.homedir(), 'AppData', 'LocalLow') : XdgDataHome,
	'VRChat',
	'VRChat',
)
