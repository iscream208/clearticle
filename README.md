# clearticle
a chrome plugin make web article cleaner. 一个纯净化网页文章阅读的Chrome插件。#### 代码和readme由Gemini生成。

这是一个基于 Mozilla Readability 算法开发的 Chrome 浏览器插件。它能一键提取网页正文，去除干扰元素。目前适用于少数派、微信公众号。

<img width="1920" height="813" alt="image" src="https://github.com/user-attachments/assets/911aafec-fdc9-4a0c-b00e-29110d6ccee8" />

<img width="1920" height="816" alt="image" src="https://github.com/user-attachments/assets/62681fe9-8fb5-439c-90b2-771906cbf5fd" />


✨ 功能特性
智能正文提取：采用 Readability 算法，精准识别网页主体内容。

深度图片适配：

支持 少数派 的 data-original 高清原图解析。

支持 微信公众号 的跨域图片显示（自动处理 Referrer 策略）。

图片按需加载：默认隐藏图片，点击按钮后加载并显示，再次点击可折叠。

沉浸式排版：

极简深色模式设计，保护视力。

针对代码块 (pre, code) 进行美化，适合开发者阅读技术文章。

轻量化：无后台持续运行进程，仅在点击插件图标时激活。

🛠️ 安装方法
由于本项目目前尚未发布至 Chrome Web Store，请通过以下步骤手动安装：

下载项目：点击仓库右上角的 Code -> Download ZIP 并解压，或使用 Git 克隆：

Bash

git clone https://github.com/你的用户名/你的仓库名.git
打开扩展程序页面：在 Chrome 地址栏输入 chrome://extensions/。

开启开发者模式：打开右上角的“开发者模式”开关。

加载插件：点击左上角的“加载已解压的扩展程序”，选择本项目所在的文件夹。

📖 使用指南
打开任意一篇你想阅读的长文章。

点击浏览器工具栏中的 阅读器插件图标。

页面将自动进入纯净模式。

遇到图片时，点击 "🖼️ 显示图片" 按钮即可查看。

🏗️ 项目架构
本项目是一个典型的 Chrome 扩展程序，展示了解释型语言（JavaScript）如何动态操纵 DOM：

manifest.json: 插件配置文件。

background.js: 监听插件图标点击事件。

content.js: 核心逻辑。负责调用 Readability 接口并重构页面 DOM。

lib/Readability.js: 核心算法库。

📝 致谢 (Acknowledgments)
本项目在开发过程中得到了以下开源项目和平台的启发与支持：

Mozilla Readability: 感谢 Mozilla 团队开源了如此强大的网页正文提取库。本项目遵循其 Apache License 2.0 协议进行使用。

少数派 (sspai.com): 感谢少数派提供的高质量内容，本项目对其图片懒加载机制进行了专项适配。

微信公众平台: 针对其防盗链机制，本项目特别优化了 Referrer 策略。

⚖️ 许可证 (License)
本项目采用 MIT License 许可。
