ลูกค้าโอนเงิน
↓
bank app
↓
bank app save slip หรือ user screenshot
↓
เปิด Dikapay
↓
Dikapay ตรวจพบรูปใหม่
↓
popup ถาม user
"พบสลิปใหม่ ต้องการส่งหรือไม่?"
↓
upload backend

วิธีตรวจ screenshot

บน iOS มี event
UIApplicationUserDidTakeScreenshotNotification

พบรูปสลิปใหม่

ต้องการส่งให้ร้านค้าไหม?

[ส่งสลิป] [ยกเลิก]

// --------------- -\*-
ใช่ครับ แนวคิดนี้เรียกว่า Local-First Architecture ซึ่งนิยมมากใน mobile apps โดยเฉพาะแอปที่ต้องเร็วหรือทำงาน offline ได้ เช่น wallet หรือ POS

คุณสามารถใช้
react-native-nitro-sqlite
เป็น local database ใน React Native แล้วค่อย sync กับ backend database เช่น PostgreSQL

App
↓
Local DB (SQLite)
↓
Background Sync
↓
API
↓
Server DB

<video data-html5-video="" preload="metadata" src="blob:https://embed.bananacreamcafe.com/5d74d704-dab4-4164-bf05-7d6b6b6208e3" webkit-playsinline="" playsinline=""></video>
