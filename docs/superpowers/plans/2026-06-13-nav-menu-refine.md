# 导航菜单文案与层级微调实施计划

> **目标：** 完成左侧导航的 3 处菜单改名，并去掉 `促销活动` 下的中间层二级 `促销活动`，让活动分组直接成为二级结构。
> **架构：** 通过修改 `index.html` 中的静态导航骨架，以及 `app.js` 中的路由标题、面包屑文案、动态子导航渲染与高亮展开逻辑完成。本项目无自动化测试体系，本计划采用“代码修改 + diagnostics + 手动路由回归”的验证方式执行。

---

## 文件结构映射

**修改文件：**

- `index.html`
  - 负责左侧静态一级/二级菜单结构
- `app.js`
  - 负责页面标题、副标题、面包屑文案
  - 负责促销活动动态子导航渲染
  - 负责导航高亮与展开逻辑

**设计文档：**

- `docs/superpowers/specs/2026-06-13-nav-menu-refine-design.md`
  - 记录本轮菜单改名与层级微调口径

**计划文档：**

- `docs/superpowers/plans/2026-06-13-nav-menu-refine.md`
  - 记录实施步骤与验证方式

---

### 任务 1：修改静态菜单名称与促销活动容器结构

**涉及文件：**
- 修改：`index.html`

- [ ] **步骤 1：修改促销规划与促销模版文案**
  - 将 `选品汇总` 改为 `档期商品`
  - 将 `模版优先级` 改为 `模版规则设置`

- [ ] **步骤 2：修改促销调度文案**
  - 将 `促销商品终止` 改为 `生效商品`

- [ ] **步骤 3：去掉促销活动中间层按钮**
  - 删除 `campaignsGroup` 中的二级按钮 `促销活动`
  - 保留 `campaignsSubNav` 容器，改为直接挂在 `促销活动` 一级菜单面板下

- [ ] **步骤 4：检查 HTML diagnostics**
  - 使用 IDE diagnostics 检查 `index.html`
  - 预期：无新增 diagnostics

- [ ] **步骤 5：静态结构人工检查**
  - 打开侧栏
  - 预期：不再出现中间层二级 `促销活动`

---

### 任务 2：统一路由标题、副标题与面包屑文案

**涉及文件：**
- 修改：`app.js`

- [ ] **步骤 1：更新 `/assortment*` 文案**
  - `/assortment`、`/assortment-summary` 的标题改为 `档期商品`
  - 相关面包屑中的 `选品汇总` 改为 `档期商品`

- [ ] **步骤 2：更新 `/template-priority*` 文案**
  - `/template-priority`、`/template-priority-create`、`/template-priority-edit` 的标题与副标题改为 `模版规则设置`
  - 相关面包屑中的 `模版优先级` 改为 `模版规则设置`

- [ ] **步骤 3：更新 `/promo-goods-terminate` 文案**
  - 标题改为 `生效商品`
  - 副标题按 `生效商品` 语义同步调整

- [ ] **步骤 4：检查 JS diagnostics**
  - 使用 IDE diagnostics 检查 `app.js`
  - 预期：无新增 diagnostics

---

### 任务 3：调整促销活动动态子导航渲染

**涉及文件：**
- 修改：`app.js`

- [ ] **步骤 1：保持 `campaignNavTree()` 分组不变**
  - 保留 `特价 / 折扣 / 满减满赠 / 满赠券促销` 的现有玩法配置

- [ ] **步骤 2：调整 `renderCampaignSubNav()` 输出层级**
  - 保持顶部 `档期智能促销`
  - 保持四个活动分组继续渲染为 `.nav__subgroup`
  - 不再假设外层存在 `campaignsGroup` 按钮

- [ ] **步骤 3：检查二级结构展示顺序**
  - 预期顺序为：`档期智能促销 / 特价 / 折扣 / 满减满赠 / 满赠券促销`

- [ ] **步骤 4：检查 JS diagnostics**
  - 使用 IDE diagnostics 检查 `app.js`
  - 预期：无新增 diagnostics

---

### 任务 4：重写导航高亮与展开状态逻辑

**涉及文件：**
- 修改：`app.js`

- [ ] **步骤 1：更新 `setActiveNav(r)`**
  - 确保 `/template-priority-schedule-import*` 仍高亮 `档期智能促销`
  - 确保 `/template-priority*` 仍高亮 `模版规则设置`
  - 确保 `/assortment*` 仍高亮 `档期商品`
  - 确保 `/promo-goods-terminate` 仍高亮 `生效商品`

- [ ] **步骤 2：更新 `navSyncWithRoute(r)`**
  - 保留活动分组自动展开逻辑
  - 去掉对中间层 `campaignsGroup` 展开态的依赖

- [ ] **步骤 3：更新 `navApplyOpenState()`**
  - 删除对 `campaignsGroup` 的特殊处理
  - 只保留一级菜单展开与活动分组展开控制

- [ ] **步骤 4：检查 JS diagnostics**
  - 使用 IDE diagnostics 检查 `app.js`
  - 预期：无新增 diagnostics

---

### 任务 5：执行手动回归验证

**涉及文件：**
- 修改：`index.html`
- 修改：`app.js`

- [ ] **步骤 1：检查左侧菜单文案**
  - 预期出现：`档期商品`、`模版规则设置`、`生效商品`
  - 预期不再出现：`选品汇总`、`模版优先级`、`促销商品终止`

- [ ] **步骤 2：检查促销活动层级**
  - 展开 `促销活动`
  - 预期直接看到：`档期智能促销 / 特价 / 折扣 / 满减满赠 / 满赠券促销`

- [ ] **步骤 3：检查代表性路由高亮**
  - 进入 `#/assortment`
  - 进入 `#/template-priority`
  - 进入 `#/promo-goods-terminate`
  - 进入 `#/template-priority-schedule-import`
  - 进入任意 `#/campaigns-pt/...`
  - 预期：高亮和展开状态均正确

- [ ] **步骤 4：检查页面标题与面包屑**
  - 预期相关页面标题与侧栏文案一致
  - 预期不残留旧名称

- [ ] **步骤 5：最终 diagnostics**
  - 使用 IDE diagnostics 检查 `index.html` 和 `app.js`
  - 预期：无新增 diagnostics

---

## 自审

### 需求覆盖检查

- `选品汇总` -> `档期商品`：已覆盖
- `模版优先级` -> `模版规则设置`：已覆盖
- `促销商品终止` -> `生效商品`：已覆盖
- 去掉中间层二级 `促销活动`：已覆盖
- 其他菜单升级为二级菜单：已按“分组升二级”覆盖

### 占位符检查

- 无 `TODO`
- 无 `TBD`
- 无“稍后实现”

### 一致性检查

- 路由地址保持不变
- 促销活动玩法分组保持不变
- 本轮只改导航层、标题文案与高亮逻辑
