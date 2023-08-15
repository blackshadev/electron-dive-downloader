import { Menu, BrowserWindow, MenuItemConstructorOptions } from 'electron';

export default class MenuBuilder {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  public buildMenu(): Menu {
    if (this.isDev()) {
      this.setupDevelopmentEnvironment();
    }

    const template =
      process.platform === 'darwin'
        ? this.buildDarwinTemplate()
        : this.buildDefaultTemplate();

    if (this.isDev()) {
      template.push({
        label: 'reload',
        click(_, browser) {
          browser?.reload();
        }
      })
    }

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  private setupDevelopmentEnvironment(): void {
    this.mainWindow.webContents.on('context-menu', (_, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            this.mainWindow.webContents.inspectElement(x, y);
          },
        },
      ]).popup({ window: this.mainWindow });
    });
  }

  private buildDarwinTemplate(): MenuItemConstructorOptions[] {
    return [];
  }

  private buildDefaultTemplate(): MenuItemConstructorOptions[] {
    return [];
  }

  private isDev(): boolean {
    return process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
  }
}
