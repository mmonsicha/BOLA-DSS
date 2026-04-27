# Sumary: DSS runtime component report 27/04/2026

## ภาพรวม

รายงานฉบับนี้สรุปสถานะความสอดคล้องของโปรเจกต์ `BOLA-DSS` กับ Sellsuki Design System runtime component ณ วันที่ `27/04/2026` โดยอิงจากโค้ดจริงในโปรเจกต์ prototype ปัจจุบัน ไม่ใช่การประมาณจาก mockup อย่างเดียว

ผลสรุปตรงไปตรงมา:
- โปรเจกต์นี้ใช้ DSS runtime component จริงในส่วนหลักแล้ว
- token ด้านสีถือว่าใช้งานถูกทาง
- จุดที่ยังไม่เป๊ะ 100% แบ่งได้เป็น 2 กลุ่ม
  - กลุ่มที่เป็น **gap ของ DSS runtime/package**
  - กลุ่มที่เป็น **งาน layout/composition ของโปรเจกต์ clone เอง**

## Components ที่ตรวจ

- Appshell
- TopNavbar
- Sidebar
- Button
- Table
- Card
- Notification
- Toast

## สรุปตาม component

### 1. Appshell

สถานะ:
- ยังไม่ตรง Storybook/AppShell 100%

สิ่งที่ใช้จริง:
- `TopNavbar`
- `Sidebar`
- `Drawer`
- wrapper layout ในโปรเจกต์

ปัญหา:
- DSS runtime ไม่มี `AppShell` สำเร็จรูปให้ใช้ตรง ๆ
- DSS runtime ไม่มี `Container` component export
- shell ปัจจุบันจึงต้อง compose เองในโค้ด

สาเหตุ:
- เป็น **gap ฝั่ง design system runtime**

สิ่งที่ทีม design system ต้องแก้:
- เพิ่ม canonical `AppShell` runtime component
- หรืออย่างน้อย export `Container`
- และเตรียม shell composition pattern ที่ใช้ซ้ำได้จริง

### 2. TopNavbar

สถานะ:
- ใกล้มาก แต่ยังไม่ 100%

สิ่งที่ใช้จริง:
- `TopNavbar` ของ DSS runtime

ปัญหา:
- desktop sidebar toggle ยังต้องวางซ้อนเอง
- ไม่ใช่ pattern first-class ที่ runtime ให้มาโดยตรง

สาเหตุ:
- เป็นทั้ง **gap ฝั่ง design system**
- และมี **layout work ฝั่งโค้ด clone**

สิ่งที่ทีม design system ต้องแก้:
- เพิ่ม desktop shell toggle pattern ใน `TopNavbar`
- หรือรองรับผ่าน `AppShell`

### 3. Sidebar

สถานะ:
- ยังไม่ 100%

สิ่งที่ใช้จริง:
- `Sidebar` ของ DSS runtime

ปัญหา:
- `SidebarGroup` มีแค่ `label` และ `items`
- ไม่มี expand/collapse ราย group
- ไม่มี `expanded`, `defaultExpanded`, `onToggleGroup`

สาเหตุ:
- เป็น **gap ฝั่ง design system runtime**

สิ่งที่ทีม design system ต้องแก้:
- เพิ่ม group accordion behavior
- รองรับการ expand/collapse ราย section

### 4. Button

สถานะ:
- ใช้งานได้ดี และใกล้ DSS มาก

สิ่งที่ใช้จริง:
- `DSButton`

ปัญหาที่เหลือ:
- เรื่องความกว้างปุ่มและตำแหน่งใน page header
- เป็นเรื่อง page composition มากกว่าปัญหาของตัว component

สาเหตุ:
- เป็น **งานฝั่งโค้ด clone**

ทีม design system ไม่จำเป็นต้องแก้ทันที:
- เว้นแต่จะต้องการ page action recipe ที่ชัดกว่านี้ใน Storybook

### 5. Table

สถานะ:
- ยังไม่ 100%

สิ่งที่ใช้จริง:
- `DSTable`

ปัญหา:
- table structure ใช้ของ DSS จริง
- แต่ cell layout, row density, wrapping, และ action alignment ยังต้องจัดเอง

สาเหตุ:
- ส่วนใหญ่เป็น **งานฝั่งโค้ด clone**

ทีม design system ควรพิจารณาเพิ่ม ถ้าต้องการ:
- admin table recipe
- standard toolbar/table/header composition

### 6. Card

สถานะ:
- ยังไม่ 100% แต่ไปถูกทาง

สิ่งที่ใช้จริง:
- `Card`
- `CardHeader`
- `CardBody`
- `StatCard`

ปัญหา:
- spacing ระหว่าง card
- rhythm ของ section
- header/content spacing ในแต่ละหน้า

สาเหตุ:
- เป็น **งานฝั่งโค้ด clone**

ทีม design system ยังไม่จำเป็นต้องเปิด issue แยกตอนนี้:
- เว้นแต่ Storybook มี page recipe เฉพาะที่อยากบังคับใช้

### 7. Notification

สถานะ:
- ยังไม่ 100%

สิ่งที่ใช้จริง:
- notification badge/count ใน `TopNavbar`
- `NotificationCenter`

ปัญหา:
- การเปิด panel notification ผ่าน `Drawer` ยังเป็นการ compose เอง
- ไม่ใช่ shell pattern ที่ runtime จัดให้ครบชุด

สาเหตุ:
- หลัก ๆ เป็น **งานฝั่งโค้ด clone**
- แต่ถ้าจะให้มี canonical pattern ก็เป็น **เรื่อง design system**

สิ่งที่ทีม design system ควรพิจารณา:
- shell-level notification panel pattern

### 8. Toast

สถานะ:
- ใกล้ 100% มากที่สุด

สิ่งที่ใช้จริง:
- `toast`
- `ToastContainer`

ปัญหา:
- ยังไม่ได้ทำ visual QA ครบทุก variant ในทุกหน้า

สาเหตุ:
- เป็น **งาน QA ฝั่งโค้ด clone**

ทีม design system ยังไม่ต้องแก้ตอนนี้:
- runtime usage ใช้ได้ตาม intended pattern แล้ว

## สรุปว่าอะไรเป็นปัญหาฝั่ง design system

ต้องส่งให้ทีม design system แก้:

1. ไม่มี canonical `AppShell` runtime
2. ไม่มี `Container` runtime component export
3. `Sidebar` ไม่มี group expand/collapse
4. `TopNavbar` ไม่มี desktop sidebar toggle pattern

## สรุปว่าอะไรเป็นปัญหาฝั่งโค้ด clone

ต้องเก็บต่อในโปรเจกต์:

1. padding
2. margin
3. content width
4. page layout
5. section rhythm
6. table composition
7. card spacing
8. button placement ใน page header
9. notification panel composition

## Issues ที่เปิดให้แล้ว

### ฝั่ง prototype repo

- [mmonsicha/BOLA-DSS#1](https://github.com/mmonsicha/BOLA-DSS/issues/1)

เนื้อหาหลัก:
- shell parity ยังไม่ครบ
- ยังต้องใช้ custom glue code
- ต้องติดตาม gap ระหว่าง runtime component กับ implementation จริง

### ฝั่ง design system repo

- [BearyCenter/Sellsukidesignsystemv12#15](https://github.com/BearyCenter/Sellsukidesignsystemv12/issues/15)

เนื้อหาที่ส่งให้ทีม design system แก้:
- เพิ่ม `Sidebar` group expand/collapse
- เพิ่ม canonical desktop shell toggle
- เพิ่ม `Container` runtime component
- พิจารณา export `AppShell` runtime โดยตรง

## ข้อเสนอแนะถัดไป

1. ฝั่ง design system
   - แก้ runtime gaps ตาม issue #15

2. ฝั่ง prototype
   - เก็บ spacing/layout ทีละหน้า
   - ใช้ token เดิมต่อไป
   - อย่าผลักงาน spacing/layout ไปเป็น issue DS ถ้ายังเป็นแค่ page composition

## ข้อสรุปสุดท้าย

ถ้าถามว่า “ตอนนี้ยังไม่เป๊ะ 100% เพราะอะไร”

คำตอบคือ:
- **เรื่อง token สี** ใช้ถูกทางแล้ว
- **เรื่อง shell behavior บางจุด** ยังติดที่ DSS runtime
- **เรื่อง padding, margin, layout** เป็นงานที่ต้องเก็บเองในโปรเจกต์ clone นี้ต่อ

ดังนั้นคำว่า “ไม่เป๊ะ” ตอนนี้ไม่ได้หมายความว่าทำผิดทั้งหมด แต่หมายถึง:
- component หลักหลายตัวใช้ถูกแล้ว
- ทว่ายังมีทั้ง runtime gap และ page composition gap ที่ต้องแยกแก้คนละทาง
