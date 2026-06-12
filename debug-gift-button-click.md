# Debug Session: gift-button-click
- **Status**: [OPEN]
- **Issue**: 满金额赠、满数量赠商品范围中，“选择赠品”按钮点击后未正常弹出赠品选择弹窗，“新增赠品范围”按钮点击后无响应。
- **Debug Server**: http://127.0.0.1:7777/event
- **Log File**: .dbg/trae-debug-log-gift-button-click.ndjson

## Reproduction Steps
1. 打开促销活动创建/编辑页。
2. 进入满金额赠或满数量赠的商品范围步骤。
3. 点击“选择赠品”按钮，观察是否弹出赠品选择弹窗。
4. 点击“新增赠品范围”按钮，观察是否新增一组赠品范围。

## Hypotheses & Verification
| ID | Hypothesis | Likelihood | Effort | Evidence |
|----|------------|------------|--------|----------|
| A | 点击事件未进入当前路由下的按钮处理分支 | High | Low | Pending |
| B | 事件进入后因场景状态或索引校验提前 return | High | Low | Pending |
| C | openCampaignGiftSelectModal 已调用，但 openModal/渲染容器未正常工作 | Med | Low | Pending |
| D | 新增赠品范围事件已触发，但 reward 区域因场景或容器问题未刷新 | Med | Low | Pending |

## Log Evidence
- Source evidence: [bindPageEvents](file:///d:/trae%20AI/%E5%95%86%E5%93%81%E4%BF%83%E9%94%80%E4%B8%AD%E5%BF%83/app.js#L16446-L16515) 先绑定内容区按钮事件。
- Source evidence: [campaignWizardSetStep](file:///d:/trae%20AI/%E5%95%86%E5%93%81%E4%BF%83%E9%94%80%E4%B8%AD%E5%BF%83/app.js#L8199-L8221) 随后才调用 `campaignWizardRenderTables()` 渲染满赠商品范围表格。
- Inference: “选择赠品”“新增赠品范围”等按钮由后续表格渲染插入，原先不会自动获得点击监听，因此表现为点击无响应。
- Instrumentation added: 已加入 A/D 两个埋点，用于在你刷新页面后记录绑定阶段与表格渲染后的按钮数量差异。

## Verification Conclusion
- Fix applied: 将内容区 `data-act` 点击从逐个绑定改为统一委托，覆盖动态插入的满赠按钮。
- Awaiting user verification after refresh.
