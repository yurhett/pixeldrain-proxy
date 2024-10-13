# pixeldrain-proxy
A pixeldrain.com proxy deployed on Cloudflare Workers, unlocked, tailored for Chinese users. 🌐🚀

## 部署方式

### Cloudflare Workers 部署
1. 复制 `_worker.js` 文件代码，粘贴到 Cloudflare Workers 控制台中。
2. 配置环境变量：
   - **PASSWORD**（可选）：为代理服务添加一个访问密码保护。如果设置为空，则无需密码保护。

3. **保存并部署** 即可。

### Cloudflare Pages 部署
1. `Fork` 该项目到您的 GitHub 仓库。
2. 在 Cloudflare Pages 中创建项目，并连接到您的 GitHub 仓库。
3. 在项目设置中添加环境变量 `PASSWORD`（可选），如果需要设置访问密码保护。
4. 部署完成后即可使用。

## 如何使用

假设您的 Workers 或 Pages 项目的域名为 `pixeldrain-proxy.example.workers.dev`。

### 使用主页代理文件下载

1. 访问代理服务的主页：
   ```shell
   https://pixeldrain-proxy.example.workers.dev/
   ```
   如果设置了密码保护，则需要使用带有密码路径的主页地址：
   ```shell
   https://pixeldrain-proxy.example.workers.dev/<PASSWORD>/
   ```
   例如，如果密码是 `1234`，则访问：
   ```shell
   https://pixeldrain-proxy.example.workers.dev/1234/
   ```

2. 输入 Pixeldrain 文件链接，例如：
   ```shell
   https://pixeldrain.com/u/xxxxxxxx
   ```
   
3. 点击 “提交” 按钮。代理工具会解析文件链接并生成下载链接，为您加速文件下载。

## 环境变量说明

| 变量名   | 示例           | 必填 | 说明                                      |
| -------- | -------------- | ---- | ----------------------------------------- |
| PASSWORD | 1234           | 否   | 设置代理服务访问密码，留空则不启用密码保护 |

## 注意事项

- 该代理仅中国用户用于加速访问 Pixeldrain 文件，用户需自行遵守相关使用协议。

## 鸣谢

特别感谢 Cloudflare Workers 和 Pixeldrain 提供的开放平台。
