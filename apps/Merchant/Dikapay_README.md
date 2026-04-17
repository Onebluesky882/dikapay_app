# Dikapay — QR Code Table Ordering System

## Overview

Dikapay คือระบบสั่งอาหารผ่าน QR Code ที่ออกแบบมาสำหรับร้านอาหาร โดยมุ่งเน้น Mobile-first Experience ลูกค้าสามารถสแกน QR Code ที่โต๊ะ เลือกเมนู ชำระเงิน และติดตามสถานะออเดอร์ได้ทั้งหมดในขั้นตอนเดียว โดยไม่ต้องรอพนักงาน ระบบช่วยลดความผิดพลาดในการรับออเดอร์และเพิ่มความเร็วในการให้บริการโดยรวม

---

## Architecture

Dikapay ใช้โครงสร้าง Monorepo แบ่งออกเป็น 3 แอปพลิเคชันหลัก แต่ละแอปรับผิดชอบกลุ่มผู้ใช้งานที่แตกต่างกันอย่างชัดเจน

```
Dikapay/
├── Dikapay      # Client — สำหรับลูกค้า
├── Merchant     # สำหรับเจ้าของร้านค้า
└── Manager      # Admin / Support
```

---

## Applications

### Client App

แอปพลิเคชันสำหรับลูกค้าทั่วไป รองรับการใช้งานตั้งแต่ต้นจนจบกระบวนการสั่งอาหาร ได้แก่ การสแกน QR Code ที่โต๊ะ การดูเมนูและเพิ่มสินค้าเข้าตะกร้า การอัปโหลดสลิปชำระเงิน และการติดตามสถานะออเดอร์แบบ Real-time รองรับทั้ง Dark Mode และ Light Mode

### Merchant App

แอปพลิเคชันสำหรับเจ้าของร้านและพนักงาน รองรับการรับออเดอร์แบบ Real-time พร้อมการแจ้งเตือน การอัปเดตสถานะออเดอร์ (กำลังเตรียม / เสร็จแล้ว) การตรวจสอบสลิปการชำระเงิน และ Dashboard แสดงรายได้ประจำวัน

### Manager App

ระบบ Back-office สำหรับทีม Admin และ Support ครอบคลุมการจัดการร้านค้าในระบบ การตรวจสอบธุรกรรม การแก้ไขเคสด้วยตนเอง และการดู Analytics ภาพรวมของระบบ

---

## Tech Stack

**Mobile Framework** — React Native 0.83 พร้อม Expo SDK 55 และ Expo Router สำหรับการจัดการ Navigation

**State Management & Storage** — Zustand สำหรับ Global State และ MMKV สำหรับ Local Storage ที่มีประสิทธิภาพสูง

**UI** — Tailwind ผ่าน Uniwind สำหรับ Styling ที่สอดคล้องกันทั้งระบบ

**Performance** — Nitro Modules สำหรับการทำงานที่ต้องการ Native Performance

---

## Project Structure

```
src/
├── app           # Routes (Expo Router)
├── components    # Reusable UI Components
├── api           # API Layer
├── store         # Zustand State Management
├── hooks         # Custom Hooks
├── constants     # Theme & Config
├── utils         # Helper Functions
└── types         # TypeScript Type Definitions
```
