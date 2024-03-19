import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export default function createSvgIcon(isBuild) {
  return createSvgIconsPlugin({
    iconDirs: [
      path.resolve(import.meta.env.VITE_PROJECT_ROOT, 'src/assets/icons/svg'),
    ],
    symbolId: 'icon-[dir]-[name]',
    svgoOptions: isBuild,
  })
}
