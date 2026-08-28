# 0.1 → 0.2 本地迁移说明

## 构建系统

- 删除 CRA 3、react-scripts、service worker、默认 App、Storybook 5 preset 和旧 `yarn.lock`。
- 使用 Vite 8 library mode，React/ReactDOM 作为 peer dependency，GSAP 作为运行依赖。
- 生成 ESM、CJS、`.d.ts` 和 `cute-ui.css`；旧中文字体为单独 opt-in CSS/asset。
- Node 24 LTS 是推荐基线；React 19.2、TypeScript 6.0.3、Storybook 10、Vitest 4、ESLint 10。

## API 迁移

### Button

旧：

```tsx
<Button>Animal</Button>
```

新用法兼容，并新增完整 button props：

```tsx
<Button className="save" onClick={save} aria-label="保存岛屿">
  保存
</Button>
```

旧 `style` 声明过去没有真正转发；现在作为原生 button 属性正确转发。

### Dialog

旧的 children + style 用法仍可表达，但建议增加 accessible name：

```tsx
<Dialog heading="钓到黑鲈鱼啦" aria-label="钓鱼结果">
  <p>有几厘米？几厘米啊？</p>
</Dialog>
```

需要交互关闭时使用 `open`、`modal`、`onDismiss` 和 `showCloseButton`。`style` 现在应用到组件根节点，推荐用 `size` 和 CSS custom properties 调整视觉。

### Loading → LoadingIsland

`Loading` 仍导出但已 deprecated：

```tsx
<LoadingIsland label="海岛正在加载" motion="auto" size="medium" />
```

不再创建全屏黑色 100vw/99vh 容器；背景和布局由消费方决定。

### Cursor

旧 `Cursor` 返回 `null`，其 CSS 导入会直接修改 `html, body`。新版：

```tsx
<Cursor>仅这个区域使用手形光标</Cursor>
<GlobalCursor enabled={shouldEnableGlobalCursor} />
```

全局光标必须明确 opt-in，并在卸载时清理。

## CSS 边界

- 组件类统一使用 `cute-` 前缀。
- 不再修改 `:root`、`body`、通配符 `*` 或通用 `.container`。
- 主题变量只在 `.cute-ui-theme` 内提供默认 token；组件本身也带安全 fallback。
- reduced-motion 会关闭 Button 动画；LoadingIsland 默认跟随系统偏好。

## 验证差异

- 旧版：约 2400 个安装包，298 个 audit 漏洞项；默认 Node 20 build/test 因 webpack preflight 失败。
- 新版：346 个安装包，`npm audit` 0 漏洞；Node 24 下 typecheck、lint、Vitest、library build、Storybook build 均通过。
- 浏览器实测覆盖 Button 键盘触发、Dialog Escape 关闭、LoadingIsland 双实例 83/83 唯一 ID、reduced motion 和非空 Cursor Story。
