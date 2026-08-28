import { useState } from "react";
import { Button, Cursor, Dialog, GlobalCursor, LoadingIsland } from "../src";
import "../src/styles/legacy-font.css";

export function Showcase() {
  const [dialogOpen, setDialogOpen] = useState(true);
  const [globalCursor, setGlobalCursor] = useState(false);
  const [catchCount, setCatchCount] = useState(0);

  return (
    <main className="showcase cute-ui-theme cute-ui-legacy-font">
      <GlobalCursor enabled={globalCursor} />

      <header className="showcase__hero">
        <div>
          <p className="showcase__eyebrow">PERSONAL LEARNING LAB · 0.2.0</p>
          <h1>熟悉的岛屿气息，现代的 React 基础。</h1>
          <p className="showcase__lede">
            保留绿色条纹按钮、不规则中文对话框、手形光标与 GSAP
            海岛动画，同时让它们可以组合、响应尺寸并尊重 reduced motion。
          </p>
        </div>
        <label className="showcase__toggle">
          <input
            type="checkbox"
            checked={globalCursor}
            onChange={(event) => setGlobalCursor(event.currentTarget.checked)}
          />
          <span>全局手形光标</span>
        </label>
      </header>

      <section className="showcase__grid" aria-label="组件展示">
        <article className="showcase__card showcase__card--actions">
          <div className="showcase__card-heading">
            <span className="showcase__index">01</span>
            <div>
              <h2>Button</h2>
              <p>原有绿色动效，补齐原生属性、焦点与弹性宽度。</p>
            </div>
          </div>
          <Button onClick={() => setCatchCount((count) => count + 1)}>
            再钓一次 · {catchCount}
          </Button>
          <Button size="compact" disabled>
            背包已满
          </Button>
        </article>

        <article className="showcase__card showcase__card--island">
          <div className="showcase__card-heading showcase__card-heading--light">
            <span className="showcase__index">02</span>
            <div>
              <h2>LoadingIsland</h2>
              <p>实例内 GSAP 动画；多个海岛不会再共享全局 SVG ID。</p>
            </div>
          </div>
          <LoadingIsland label="海岛正在加载" size="large" />
        </article>

        <article className="showcase__card showcase__card--dialog">
          <div className="showcase__card-heading">
            <span className="showcase__index">03</span>
            <div>
              <h2>Dialog</h2>
              <p>保留不规则轮廓，支持 Escape、可访问命名与窄屏边界。</p>
            </div>
          </div>
          {dialogOpen ? (
            <Dialog
              heading="钓到黑鲈鱼啦"
              aria-label="钓鱼结果"
              modal
              showCloseButton
              onDismiss={() => setDialogOpen(false)}
            >
              <p>有几厘米？几厘米啊？</p>
            </Dialog>
          ) : (
            <Button size="compact" onClick={() => setDialogOpen(true)}>
              再看一次对话
            </Button>
          )}
        </article>

        <article className="showcase__card showcase__card--cursor">
          <div className="showcase__card-heading">
            <span className="showcase__index">04</span>
            <div>
              <h2>Cursor</h2>
              <p>局部区域默认安全；GlobalCursor 必须明确启用。</p>
            </div>
          </div>
          <Cursor className="showcase__cursor-zone" tabIndex={0}>
            <span>把鼠标移到这里</span>
            <a href="#cursor-notes">查看 API 边界</a>
          </Cursor>
        </article>
      </section>

      <footer id="cursor-notes" className="showcase__footer">
        任天堂及相关品牌归其权利人所有。本项目仅供个人学习，不代表官方，未声明开源许可。
      </footer>
    </main>
  );
}
