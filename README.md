# Cute UI

一个用于个人学习的现代 React UI 组件项目，保留原仓库中有辨识度的交互：绿色条纹动效 Button、手形 Cursor、中文不规则形状 Dialog，以及 GSAP 海岛 LoadingIsland。

> **品牌与授权边界**
>
> 灵感来自《动物森友会》。任天堂及相关品牌归其权利人所有，本项目与任天堂无关，仅供个人学习。仓库目前没有 `LICENSE` 文件，不应被理解为已获得开源、商用、再分发或 npm 发布授权。发布前必须先完成[资产与品牌审查](./docs/ASSETS_AND_BRAND.md)。

## 当前状态

- React 19.2 + TypeScript strict 6.0.3。
- Vite 8 library mode，输出 ESM、CJS、类型声明和独立 CSS。
- Storybook 10 文档、交互 Story、a11y addon 和本地 showcase。
- Vitest 4 + Testing Library；ESLint 10 flat config；Prettier。
- GitHub Actions 与自建 GitLab CI 使用同一套 `npm run check` 质量门禁。
- Node 24 LTS 为推荐开发环境；`package.json` 也允许受支持的 Node 22 最新维护版本。
- `private: true`：防止当前授权状态下意外发布。

现代化依据来自官方资料：[Node.js 发布周期](https://nodejs.org/en/about/previous-releases)、[React 19.2](https://react.dev/blog/2025/10/01/react-19-2)、[CRA 退役说明](https://react.dev/blog/2025/02/14/sunsetting-create-react-app)、[Vite library mode](https://vite.dev/guide/build.html#library-mode) 和 [Storybook React + Vite](https://storybook.js.org/docs/get-started/frameworks/react-vite)。版本号同时通过 npm registry 包元数据核验；TypeScript 固定为最新且与 `typescript-eslint` 兼容的 6.0.3，而不是不兼容的 7.x。

## 开发

要求：Node 24 LTS（推荐）与 npm。

```bash
nvm use
npm ci
npm run storybook
```

打开 <http://127.0.0.1:6006/>。直接体验 showcase：

```bash
npm run dev
```

打开 <http://127.0.0.1:5173/>。

### 常用命令

| 命令                      | 用途                       |
| ------------------------- | -------------------------- |
| `npm run dev`             | 启动 Vite showcase         |
| `npm run storybook`       | 启动 Storybook 10          |
| `npm run test:run`        | 单次运行组件测试           |
| `npm run test:coverage`   | 运行测试并生成覆盖率报告   |
| `npm run typecheck`       | TypeScript strict 类型检查 |
| `npm run lint`            | ESLint 10 检查             |
| `npm run format:check`    | Prettier 格式检查          |
| `npm run build`           | 生产组件库构建             |
| `npm run build-storybook` | 静态 Storybook 构建        |
| `npm run check`           | 顺序运行完整质量门禁       |

## 本地库用法

当前仓库不发布 npm 包。下面展示的是构建后 API 形态，供本地链接或未来完成授权决策后使用：

```tsx
import { Button, Cursor, Dialog, GlobalCursor, LoadingIsland } from "cute-ui";
import "cute-ui/style.css";

export function Example() {
  return (
    <div className="cute-ui-theme">
      <Button onClick={() => console.log("caught")}>再钓一次</Button>

      <Dialog heading="钓到黑鲈鱼啦" aria-label="钓鱼结果">
        <p>有几厘米？几厘米啊？</p>
      </Dialog>

      <LoadingIsland label="海岛正在加载" />

      <Cursor>这个区域使用手形光标</Cursor>
      <GlobalCursor enabled={false} />
    </div>
  );
}
```

旧中文字体被单独隔离，不进入默认样式。仅在确认当前个人学习场景接受其风险后显式引入：

```tsx
import "cute-ui/legacy-font.css";

// 把 cute-ui-legacy-font 加到希望使用旧字体变量的祖先元素。
```

## 组件 API

### Button

- 继承全部 `button` HTML 属性并转发 `ref`、`className`、事件与 `data-*`。
- `size="compact | default | wide"`，以及 `fullWidth`。
- 原生键盘行为、`:focus-visible`、disabled 状态和 reduced-motion 降级。

### Dialog

- 默认保持旧版“直接可见”的用法；`open={false}` 不渲染。
- `heading` 提供可见标题和 accessible name；也可自行传入 `aria-label`。
- `modal` 会设置 `aria-modal` 并在打开时聚焦。
- `onDismiss` 响应 Escape；`showCloseButton` 显示可聚焦关闭按钮。
- 每个实例使用独立 `clipPath` ID，可在同一页面安全渲染多个 Dialog。

### LoadingIsland

- `motion="auto | full | reduced"`。`auto` 跟随系统 `prefers-reduced-motion`。
- `size="small | medium | large"` 与容器宽度共同决定响应式尺寸。
- 所有 SVG ID 都按实例命名空间化；GSAP 只查询当前实例并在卸载时清理。
- 保留旧名 `Loading` 作为 deprecated 兼容别名。

### Cursor / GlobalCursor

- `Cursor` 是可见的局部容器，继承 `div` 属性并转发 `ref`。
- `GlobalCursor` 是明确 opt-in 的全局能力，卸载时自动清理，并用引用计数避免多个实例互相覆盖。
- 触摸设备不依赖光标来传达任何必要信息。

## 维护策略

1. 先在 Storybook 中增加或更新 Story，再修改视觉实现。
2. 视觉变更需对比 [`docs/visual-baseline`](./docs/visual-baseline/) 中的基线。
3. 不通过增加框架解决单一组件问题；React、Vite、Storybook、Vitest 维持互相兼容的稳定版本。
4. 依赖更新必须通过 `npm run check` 和浏览器 smoke test。
5. 不把字体、光标、SVG 或其他品牌素材复制到别的项目；不复制其他动物森友会风格库的代码或资产。

## 从旧版迁移

旧版 React 16 + CRA 3 + Storybook 5 已移除，`yarn.lock` 被现代 `package-lock.json` 替代。详细基线、风险和 API 变化见：

- [旧版复现与盘点](./docs/BASELINE.md)
- [迁移说明](./docs/MIGRATION.md)
- [资产与品牌声明](./docs/ASSETS_AND_BRAND.md)

## 仍需仓库所有者决策

- 是否创建自有许可证，以及许可证能否覆盖源码之外的资产。
- 是否取得方正字体、手形光标和两份 SVG 的再分发授权，或以自制/可授权素材替换。
- 是否继续使用 `cute-ui` 作为未来包名，以及是否真的发布 npm。
- 若将来公开发布，品牌表述、截图和视觉相似度是否需要进一步法律审查。

在这些问题明确前，不提交发布产物、不发布 npm，也不把仓库描述为开源项目。
