# Debug Session: campaign-burden-blank
- **Status**: [OPEN]
- **Issue**: 促销活动新增页点击“承担规则”后页面空白，商品折扣场景可稳定复现
- **Debug Server**: Pending
- **Log File**: .dbg/trae-debug-log-campaign-burden-blank.ndjson

## Reproduction Steps
1. 打开 `#/campaigns-create`
2. 进入促销活动新增页
3. 在顶部主 tab 点击“承担规则”
4. 观察内容区域为空白

## Hypotheses & Verification
| ID | Hypothesis | Likelihood | Effort | Evidence |
|----|------------|------------|--------|----------|
| A | `campWizMainTab` 已切到 `burden`，但 `wizardStep` 未同步到承担规则步骤，导致 `.wizard-step` 被样式隐藏 | High | Low | Pending |
| B | goods/burden 交界处的模板字符串结构异常，实际 DOM 未生成 burden 面板里的 `.wizard-step` | High | Med | Pending |
| C | `campaignWizardRenderTables()` 或 `campaignWizardRenderBurden()` 在承担规则页签渲染时发生运行时异常 | Med | Low | Pending |
| D | `tplSelected / isGoodsDiscount / burdenStepNo` 组合值异常，承担规则走错了分支 | Med | Low | Pending |

## Log Evidence
- Pending

## Verification Conclusion
- Pending
