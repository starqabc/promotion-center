 # 审批配置（原型）实施计划
 
 > **目标：** 在系统管理下新增“审批配置”菜单，提供审批流程配置列表与流程设计器原型。
 > **架构：** 基于现有 `index.html` 菜单 + `app.js` 路由/渲染/事件模式实现；复用现有 `listPageLayout/openModal/openDrawer` 组件；新增少量 CSS 支持流程画布布局。
 
 ---
 
 ### 任务 1：新增菜单入口
 
 **涉及文件：**
 - 修改：`index.html`
 
 - [ ] 在“系统管理”菜单下新增二级菜单“审批配置”，route 为 `#/sys-approval`
 - [ ] 更新静态资源版本号，避免 file:// 缓存
 
 **验证：**
 - 打开 `index.html`，左侧系统管理出现“审批配置”
 
 ---
 
 ### 任务 2：新增路由与页面骨架
 
 **涉及文件：**
 - 修改：`app.js`
 
 - [ ] 在 `AppState.routes` 增加 `/sys-approval`、`/sys-approval-edit`
 - [ ] 在 `render()` 分发中接入新页面渲染函数
 - [ ] 在 `AppState.ui` 增加 `sysApproval`（查询条件、编辑态）
 - [ ] 在 `AppState.data` 增加 `sysApprovalFlows`、`sysUsers` 示例数据
 
 **验证：**
 - 运行：`node --check app.js` 预期：无输出且 exit code 0
 - 运行诊断：编辑器 diagnostics 预期：0
 
 ---
 
 ### 任务 3：实现审批配置列表页
 
 **涉及文件：**
 - 修改：`app.js`
 
 - [ ] 实现 `renderSysApprovalPage()`：查询区（ID/名称/状态/发布状态）+ 列表字段（ID/名称/创建人/最后发布时间/发布状态/状态/版本号/操作）
 - [ ] 列表操作：查看/修改/发布/应用（发布、应用需要二次确认）
 - [ ] 新增按钮：进入设计器（新增）
 - [ ] `handleAction` 增加 `/sys-approval` 的查询/重置/新增/发布/应用/查看/修改事件
 
 **验证：**
 - 进入 `#/sys-approval` 能正常展示列表与操作，无报错
 
 ---
 
 ### 任务 4：实现设计器页（画布 + 右侧配置）
 
 **涉及文件：**
 - 修改：`app.js`
 - 修改：`styles.css`
 
 - [ ] 实现 `renderSysApprovalEditPage(mode)`：左侧流程画布 + 右侧节点配置面板
 - [ ] 支持选择节点、配置审批节点字段（处理方式/处理人/多人审批方式/通过条件/处理人为空策略/任务转交人）
 - [ ] 支持“选择人员”弹窗，完成选择后回填到节点配置
 - [ ] 保存：写回 `AppState.data.sysApprovalFlows`
 - [ ] 发布：二次确认并更新发布状态/最后发布时间/版本号
 
 **验证：**
 - 在设计器中修改配置后保存，返回列表能看到版本号/状态变化（原型演示）
 
 ---
 
 ### 任务 5：全量校验与版本更新
 
 **涉及文件：**
 - 修改：`index.html`
 - 修改：`app.js`
 - 修改：`styles.css`
 
 - [ ] 更新静态资源版本号
 - [ ] 运行：`node --check app.js` 预期：PASS
 - [ ] 运行诊断：`app.js/index.html/styles.css` diagnostics 预期：0
 
