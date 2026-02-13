## เรื่องที่ 1 ใช้ pnpm pressto

pressto

เป็นปุ่ม feature ที่แนบ animation และเพิ่มความ smooth

<Stack. Screen
name="auth-sheet"
options={{
 presentation: "formSheet", You, last month • cleaning st
 sheetGrabberVisible: true,
 sheetAllowedDetents: [0.45],
 contentStyle: {
 backgroundColor: isLiquidGlassAvailable() ? "transparent" :
 }}
/>

## เรื่องที่ 2 avoid modal

🎯 formSheet ดีกว่า modal ยังไง?

✅ 1. UX เป็นธรรมชาติกว่า (ไม่ block ทั้งจอ)
formSheet
• โผล่จากล่างขึ้นมา
• ยังเห็นหน้าหลักด้านหลัง
• รู้ว่าเป็น “งานชั่วคราว”

👉 เหมาะกับ งานสั้น ๆ / secondary action

✅ 2. ปัดลงเพื่อปิดได้ (gesture native)
sheetGrabberVisible: true

    •	มี grabber bar
    •	swipe down ปิดได้
    •	UX แบบ iOS แท้ ๆ
    •	ไม่ต้องเขียน gesture เอง

✅ 3. กำหนดความสูงได้ (detents)
sheetAllowedDetents: [0.45]

## เรื่องที่ 3 avoid modal

Prefer FlatList over
ScrollView for large lists

## เรื่องที่ 4 FlashList

<LegendList
horizontal
contentInsetAdjustmentBehavior="automatic"
/>


