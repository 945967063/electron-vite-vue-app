import {
  type MenuItem,
  type MenuItemConstructorOptions,
  app,
  shell,
  BrowserWindow,
  Menu
} from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
// 创建菜单
function createMenu(label = '进入全屏幕') {
  const menu = Menu.buildFromTemplate(appMenu(label) as (MenuItemConstructorOptions | MenuItem)[])
  Menu.setApplicationMenu(menu)
}
function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  createMenu()
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 菜单栏 https://www.electronjs.org/zh/docs/latest/api/menu-item#%E8%8F%9C%E5%8D%95%E9%A1%B9
const appMenu = (fullscreenLabel: string) => {
  const menuItems = [
    { label: '关于', role: 'about' },
    { label: '开发者工具', role: 'toggleDevTools' },
    { label: '强制刷新', role: 'forcereload' },
    { label: '退出', role: 'quit' }
  ]
  // 生产环境删除开发者工具菜单
  // if (!isDev) menuItems.splice(1, 1)
  const template = [
    {
      label: app.name,
      submenu: menuItems
    },
    {
      label: '显示',
      submenu: [
        { label: '加大', role: 'zoomin' },
        {
          label: '默认大小',
          role: 'resetzoom'
        },
        { label: '缩小', role: 'zoomout' },
        { type: 'separator' },
        {
          label: fullscreenLabel,
          role: 'togglefullscreen'
        }
      ]
    }
  ]
  return template
}

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
