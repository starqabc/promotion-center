# 满金额换购/满数量换购商品范围实施计划

> **目标：** 只调整促销活动中满金额换购、满数量换购的商品范围区域，使其符合方案 A 的布局与交互。
> **架构：** 倍数场景继续沿用 `reduceScope.rules + addOnGoods`；阶梯场景新增 `addOnRewardGroups` 作为组合模块数据源，并在渲染、事件、输入回填和校验中按模式切换。

---

### 任务 1: 数据结构与校验切换

**涉及文件：**
- 修改：`app.js`
- 参考：`docs/superpowers/specs/2026-06-13-addon-goods-range-design.md`

- [ ] **步骤 1：补充草稿默认结构**
  - 在换购模板初始化处增加 `addOnRewardGroups`
  - 阶梯模式下确保至少有一组默认值：`{ rules: [{ fullAmount: "", capQty: "" }], goods: [] }`

- [ ] **步骤 2：扩展输入回填**
  - 在 `campaignWizardUpdateDraftFromEvent` 中增加：
    - `addOnRewardGroups`
    - `addOnRewardGroupRules`
    - `addOnRewardGroupGoods`

- [ ] **步骤 3：按模式重写校验**
  - 倍数校验：一条购满记录 + 至少一条换购信息
  - 阶梯校验：至少一组换购信息，每组有购满记录且有换购商品

---

### 任务 2: 渲染调整

**涉及文件：**
- 修改：`app.js`

- [ ] **步骤 1：调整购满列表**
  - `campaignWizardRenderAddOnRulesTable` 增加“上限数量”列
  - 条件范围移除“上限数量”输入

- [ ] **步骤 2：新增阶梯组合模块渲染**
  - 新增分组渲染函数，输出：
    - 组标题/删除按钮
    - 购满金额或购满数量列表
    - 换购信息列表

- [ ] **步骤 3：调整页面顺序**
  - 在 `renderCampaignWizardPage` 中把购满区块放到换购信息上方
  - 阶梯时改成“换购信息”组合模块并展示“添加换购信息”按钮

---

### 任务 3: 事件与交互

**涉及文件：**
- 修改：`app.js`

- [ ] **步骤 1：保留倍数现有事件**
  - `campAddOnRuleAdd`
  - `campAddOnGoodsAdd`
  - `campAddOnGoodsDel`
  - `campAddOnGoodsImport`

- [ ] **步骤 2：新增阶梯分组事件**
  - `campAddOnRewardGroupAdd`
  - `campAddOnRewardGroupDel`
  - `campAddOnRewardGroupGoodsAdd`
  - `campAddOnRewardGroupGoodsDel`

- [ ] **步骤 3：切换模式时补齐数据**
  - 选择“阶梯”时自动初始化 `addOnRewardGroups`
  - 选择“倍数”时保留原有 `reduceScope.rules + addOnGoods`

---

### 任务 4: 验证

**涉及文件：**
- 修改：`app.js`

- [ ] **步骤 1：运行语法检查**
  运行：`node --check app.js`
  预期：PASS

- [ ] **步骤 2：检查编辑器诊断**
  运行：获取 `app.js` 诊断
  预期：无新增错误

- [ ] **步骤 3：手工验证场景**
  - 满金额换购 + 倍数：购满金额在换购信息上方，列表有上限数量
  - 满数量换购 + 倍数：购满数量在换购信息上方，列表有上限数量
  - 满金额换购 + 阶梯：显示换购信息组合模块，可添加多组
  - 满数量换购 + 阶梯：显示换购信息组合模块，可添加多组
