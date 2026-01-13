chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "toggleReader") {
    if (typeof Readability === 'undefined') return;

    const isWechat = window.location.hostname.includes('mp.weixin.qq.com');
    const docClone = document.cloneNode(true);
    const article = new Readability(docClone).parse();

    if (article) {
      const container = document.createElement('div');
      container.innerHTML = article.content;

      const images = container.querySelectorAll('img');
      images.forEach((img) => {
        let realSrc = img.getAttribute('data-original') || 
                      img.getAttribute('data-src') || 
                      img.getAttribute('data-actualsrc') || 
                      img.src;
        
        if (!realSrc || realSrc.includes('data:image')) return;
        if (realSrc.startsWith('//')) realSrc = 'https:' + realSrc;

        const wrapper = document.createElement('div');
        wrapper.className = 'reader-img-container';
        // 增加一点边框和过渡效果，让容器在隐藏图片时更整齐
        wrapper.style.cssText = "border: 1px dashed #444; padding: 15px; margin: 20px 0; text-align: center; background: #1e1e1e; border-radius: 8px;";
        
        // 核心改动：按钮和图片现在是兄弟节点，图片初始状态为隐藏
        wrapper.innerHTML = `
          <button class="img-ctrl-btn" data-src="${realSrc}" data-status="hidden" style="padding: 8px 16px; cursor: pointer; border: 1px solid #666; background: #333; color: #eee; border-radius: 4px; font-size: 14px;">
            🖼️ 显示图片
          </button>
          <img class="reader-image" src="" style="display:none; max-width:100%; margin: 15px auto 0 auto; border-radius: 4px;">
        `;
        
        img.parentNode.replaceChild(wrapper, img);
      });

      const readerHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            ${isWechat ? '<meta name="referrer" content="no-referrer">' : ''}
            <title>${article.title}</title>
            <style>
              body { max-width: 750px; margin: 50px auto; line-height: 1.8; color: #e0e0e0; font-family: serif; background: #121212; padding: 0 20px; }
              h1 { font-size: 2.2em; border-bottom: 2px solid #333; padding-bottom: 15px; color: #ffffff; }
              a { color: #8ab4f8; text-decoration: underline; }
              pre { background: #1e1e1e; color: #dcdcdc; padding: 15px; border-radius: 5px; overflow-x: auto; border: 1px solid #333; }
              button:not(.img-ctrl-btn), input, form, nav, footer { display: none !important; }
              .img-ctrl-btn { display: inline-block !important; margin-bottom: 5px; }
              .img-ctrl-btn:hover { background: #444; border-color: #888; }
            </style>
          </head>
          <body>
            <h1>${article.title}</h1>
            <div id="reader-content">${container.innerHTML}</div>
          </body>
        </html>`;

      document.open();
      document.write(readerHtml);
      document.close();

      // 绑定切换逻辑
      document.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('img-ctrl-btn')) {
          const btn = e.target;
          const parent = btn.parentElement;
          const img = parent.querySelector('.reader-image');
          const status = btn.getAttribute('data-status');
          const src = btn.getAttribute('data-src');

          if (status === 'hidden') {
            // 状态 1: 隐藏 -> 显示
            if (!img.src || img.src.includes(window.location.hostname)) {
              // 第一次点击，设置真正的图片地址
              btn.innerText = "⌛ 加载中...";
              if (isWechat) img.referrerPolicy = "no-referrer";
              
              img.onload = () => {
                img.style.display = "block";
                btn.innerText = "🔼 隐藏图片";
                btn.setAttribute('data-status', 'shown');
                parent.style.borderStyle = "solid"; // 加载成功后虚线变实线
              };
              img.onerror = () => { btn.innerText = "❌ 加载失败"; };
              img.src = src;
            } else {
              // 非第一次点击，直接显示
              img.style.display = "block";
              btn.innerText = "🔼 隐藏图片";
              btn.setAttribute('data-status', 'shown');
            }
          } else {
            // 状态 2: 显示 -> 隐藏
            img.style.display = "none";
            btn.innerText = "🖼️ 显示图片";
            btn.setAttribute('data-status', 'hidden');
          }
        }
      });
    }
  }
});