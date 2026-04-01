Mobile App (React Native)
│
│
▼
Local Database
(SQLite)
│
│ Sync Engine
▼
API Server
│
▼
Main Database
(PostgreSQL)

1.App Start
User เปิดแอป
↓
Load data จาก SQLite
↓
แสดง menu / order history

2. Create Order (Offline ได้)
   User กดสั่งอาหาร
   ↓
   Save order → SQLite
   ↓
   status = pending_sync
   ↓
   UI แสดง order ทันที

3. Sync Worker
   check internet
   ↓
   query orders WHERE sync_status = pending
   ↓
   POST /orders API
   ↓
   server save → PostgreSQL
   ↓
   update SQLite sync_status = synced

4. Server Side
   API
   ↓
   validate order
   ↓
   save PostgreSQL
   ↓
   return order_id
5. Pull Update จาก Server
   app sync
   ↓
   GET /sync?last_sync=timestamp
   ↓
   server return changes
   ↓
   update SQLite

6. Sync Flow Diagram
   Create Order
   │
   ▼
   Save SQLite
   │
   sync_status = pending
   │
   ▼
   Sync Worker
   │
   POST /orders
   │
   ▼
   Server PostgreSQL
   │
   ▼
   Return success
   │
   ▼
   SQLite update sync_status
