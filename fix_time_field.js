const fs = require('fs');
let c = fs.readFileSync('app.js', 'utf8');

// Find the outer template string closing - it's `; on its own line after </div>
// Search forward from the time field marker
const marker = '<div class="field__label">时间</div>';
const idx = c.indexOf(marker);
const start = c.lastIndexOf('<div class="field"><div class="field__label">时间</div>', idx);

// Find the closing </div> of the dates area, then the `; on its own line
let end = c.indexOf('</div>\n        `, idx);
if (end < 0) end = c.indexOf('</div>\n      `, idx);
if (end < 0) end = c.indexOf('</div>\n    `, idx);
console.log('end (closing backtick):', end);
if (end < 0) { console.log('end not found'); process.exit(1); }
end += '</div>\n      '.length; // include the closing div and newline in the block

const oldBlock = c.slice(start, end);
console.log('old block length:', oldBlock.length);
console.log('old block preview:', oldBlock.slice(0, 100));

// Build new block using double-quoted string (no template literal evaluation)
const q = '?"';
const newBlock = [
  '<div class="field"><div class="field__label">时间</div>',
  '<select class="select" id="pgtQTimeType" style="flex:0 0 120px">',
  '<option value="活动开始时间" ${ui.qTimeType === "活动开始时间" ? "selected" : ""}>活动开始时间</option>',
  '<option value="活动结束时间" ${ui.qTimeType === "活动结束时间" ? "selected" : ""}>活动结束时间</option>',
  '</select>',
  '<input class="input" id="pgtQTimeFrom" type="date" value="${escapeHtml(ui.qTimeFrom)}" placeholder="开始日期" style="flex:1" />',
  '<span style="flex-shrink:0;padding:0 6px;color:var(--muted);line-height:36px">至</span>',
  '<input class="input" id="pgtQTimeTo" type="date" value="${escapeHtml(ui.qTimeTo)}" placeholder="结束日期" style="flex:1" />',
  '</div>',
  '  '
].join('\n');

console.log('new block preview:', newBlock.slice(0, 100));

if (c.includes(oldBlock)) {
  c = c.replace(oldBlock, newBlock);
  fs.writeFileSync('app.js', c);
  console.log('REPLACED OK');
} else {
  console.log('NOT FOUND - oldBlock:', JSON.stringify(oldBlock.slice(0, 200));
}
