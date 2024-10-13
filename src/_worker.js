// _worker.js

const PIXELDRAIN_HOST = 'pixeldrain.com';
var PASSWORD = ''
/**
 * 生成输入表单的 HTML 页面
 */
function generateInputForm() {
	return `
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Pixeldrain代理</title>
		<style>
			body {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				height: 100vh;
				font-family: Arial, sans-serif;
				background-color: #3b4252;
				color: white;
			}
			.container {
				text-align: center;
			}
			.title {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 20px;
			}
			.logo {
				width: 30px;
				height: 30px;
				margin-right: 10px;
			}
			#link-input {
				width: 300px;
				padding: 10px;
				margin-bottom: 10px;
				border-radius: 4px;
				border: 1px solid #ddd;
				background-color: #4c566a;
				color: white;
			}
			#submit-button {
				padding: 10px;
				border: none;
				border-radius: 4px;
				cursor: pointer;
				background-color: rgba(255, 255, 255, 0.2);
				color: white;
			}
		</style>
	</head>
	<body>
		<div class="container">
			<div class="title">
				<!-- Pixeldrain Logo SVG -->
				<svg class="logo" viewBox="0 0 284 284" xmlns="http://www.w3.org/2000/svg">
					<defs>
						<radialGradient id="gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
							<stop offset="0%" style="stop-color:#4c566a; stop-opacity:1" />
							<stop offset="100%" style="stop-color:#2e3440; stop-opacity:1" />
						</radialGradient>
					</defs>
					<circle cx="142" cy="142" r="140" fill="url(#gradient)" />
					<path d="m142 2.23c-77 0-139 62.5-139 140 0 77 62.5 139 139 139 77 0 139-62.5 139-139 1e-3 -77-62.5-140-139-140zm0 258c-65.7 0-119-53.2-119-119s53.2-119 119-119c65.7 0 119 53.2 119 119 0 65.7-53.2 119-119 119zm0-219c-55.1 0-99.8 44.7-99.8 99.8 0 55.1 44.7 99.8 99.8 99.8s99.8-44.7 99.8-99.8c0-55.1-44.7-99.8-99.8-99.8zm49.3 36c8.69 0 15.7 7.04 15.7 15.7 0 8.69-7.04 15.7-15.7 15.7s-15.7-7.04-15.7-15.7c0-8.69 7.04-15.7 15.7-15.7zm-49.3-20c8.69 0 15.7 7.04 15.7 15.7 0 8.69-7.04 15.7-15.7 15.7s-15.7-7.04-15.7-15.7c0-8.69 7.04-15.7 15.7-15.7zm-48.7 20c8.69 0 15.7 7.04 15.7 15.7 0 8.69-7.04 15.7-15.7 15.7s-15.7-7.04-15.7-15.7c-1e-3 -8.69 7.04-15.7 15.7-15.7zm-35 63.8c0-8.69 7.04-15.7 15.7-15.7s15.7 7.04 15.7 15.7c0 8.69-7.04 15.7-15.7 15.7-8.69 0-15.7-7.04-15.7-15.7zm35 65.6c-8.69 0-15.7-7.04-15.7-15.7s7.04-15.7 15.7-15.7 15.7 7.04 15.7 15.7-7.04 15.7-15.7 15.7zm48.7 20.7c-8.69 0-15.7-7.04-15.7-15.7 0-8.69 7.04-15.7 15.7-15.7 8.69 0 15.7 7.04 15.7 15.7 1e-3 8.68-7.04 15.7-15.7 15.7zm2e-3 -47c-21.2 0-38.5-17.2-38.5-38.5 0-21.2 17.2-38.5 38.5-38.5 21.2 0 38.5 17.2 38.5 38.5 0 21.2-17.2 38.5-38.5 38.5zm49.3 26.3c-8.69 0-15.7-7.04-15.7-15.7s7.04-15.7 15.7-15.7 15.7 7.04 15.7 15.7-7.04 15.7-15.7 15.7zm18.6-49.9c-8.69 0-15.7-7.04-15.7-15.7 0-8.69 7.04-15.7 15.7-15.7s15.7 7.04 15.7 15.7c0 8.69-7.04 15.7-15.7 15.7z" fill="#d8dee9"/>
				</svg>
				<h1>Pixeldrain代理</h1>
			</div>
			<input type="text" id="link-input" placeholder="输入Pixeldrain链接">
			<button id="submit-button">提交</button>
		</div>
		<script>
			document.getElementById('submit-button').addEventListener('click', () => {
				const link = document.getElementById('link-input').value;
				if (link) {
					const basePath = '${PASSWORD ? "/" + PASSWORD : ""}/proxy';
					window.location.href = basePath + '?url=' + encodeURIComponent(link);
				}
			});
		</script>
	</body>
	</html>
	`;
}

/**
 * 解析并代理 Pixeldrain 链接
 * @param {string} url 用户输入的 Pixeldrain URL
 */
function parsePixeldrainLink(url) {
	try {
		const parsedUrl = new URL(url);

		// 检查域名是否为 pixeldrain.com
		if (parsedUrl.hostname !== PIXELDRAIN_HOST) {
			return null;
		}

		// 检查路径格式是否符合预期
		const path = parsedUrl.pathname;
		const fileIdMatch = path.match(/\/(?:u|api\/file)\/([^?]+)/);

		if (fileIdMatch) {
			const fileId = fileIdMatch[1];
			// 生成真实下载链接
			return `https://${PIXELDRAIN_HOST}/api/file/${fileId}?download`;
		}
	} catch (error) {
		console.error('Invalid URL:', error);
	}

	// 返回 null 表示链接无效
	return null;
}

export default {
	async fetch(request, env, ctx) {
    if (env.PASSWORD) PASSWORD = env.PASSWORD
		const url = new URL(request.url);
		const pathnameParts = url.pathname.split('/');
		const isAuthorized = PASSWORD === '' || pathnameParts[1] === PASSWORD;  // 如果密码为空或路径包含密码则授权

		// 只允许带有密码路径或无密码访问解析界面和代理功能
		if (isAuthorized) {
			const userLink = url.searchParams.get('url');

			// 处理 /proxy?url= 代理请求
			if ((PASSWORD === '' && pathnameParts[1] === 'proxy') || pathnameParts[2] === 'proxy') {
				if (userLink) {
					const downloadUrl = parsePixeldrainLink(userLink);
					if (downloadUrl) {
						const response = await fetch(downloadUrl, {
							headers: {
								'User-Agent': request.headers.get('User-Agent'),
							},
						});
						const headers = new Headers(response.headers);
						headers.set('access-control-allow-origin', '*');

						return new Response(response.body, {
							status: response.status,
							headers: headers,
						});
					} else {
						return new Response('无效的 Pixeldrain 链接或不支持的 URL 格式', { status: 400 });
					}
				}
			}

			// 显示输入表单页面
			return new Response(generateInputForm(), {
				headers: { 'Content-Type': 'text/html; charset=UTF-8' },
			});
		}

		// 未授权请求返回 403 错误
		return new Response('403 禁止：密码不正确', { status: 403 });
	},
};
