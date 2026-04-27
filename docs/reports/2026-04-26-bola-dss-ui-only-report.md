# รายงานการสร้างโปรเจกต์ BOLA DSS UI Only

## สรุปงาน

โปรเจกต์นี้เป็นการ clone แนวคิดหน้า `Dashboard`, `LINE OA`, `Contacts`, และ `Segments` ของ BOLA ออกมาเป็นอีกโปรเจกต์หนึ่ง โดยตั้งใจเก็บเฉพาะ `UI + prototype flow` เท่านั้น และตัด backend/API/auth ออกทั้งหมด

ผลลัพธ์อยู่ที่:
- `C:\Users\uSeR\Desktop\Sellsuki\BOLA\back-office-of-line-api-frontend\bola-dss-ui-only`

## หลักฐานเวอร์ชัน DSS

- `version_label`: inferred
- `version_value`: `sellsukidesignsystemv12` + `@uxuissk/design-system@0.8.16` + `@uxuissk/design-tokens@0.1.2`
- `version_evidence`:
  - MCP ใน session นี้ให้สัญญาณ Storybook/preview ของ `sellsukidesignsystemv12`
  - MCP ระบุให้ import root stylesheet เป็น `@uxuissk/design-system/styles.css`
  - package ที่อ้างอิงในโปรเจกต์ต้นทางและโปรเจกต์ใหม่นี้ใช้ `@uxuissk/design-system@0.8.16` และ `@uxuissk/design-tokens@0.1.2`

## Components ที่ใช้

- `Sidebar`
- `TopNavbar`
- `Drawer`
- `NotificationCenter`
- `ToastContainer`
- `Alert`
- `StatCard`
- `Card`
- `CardHeader`
- `CardBody`
- `Badge`
- `DSButton`
- `DSInput`
- `Dropdown`
- `SearchField`
- `Tabs`
- `DSTable`
- `EmptyState`
- `Modal`

## Tokens และตัวแปรที่ใช้

- Typography
  - `--font-p`
  - `--font-h3`
  - `--text-p`
  - `--text-h3`
  - `--text-caption`
  - `--weight-h3`
- Color
  - `--background`
  - `--text-primary`
  - `--text-secondary`
- Spacing
  - `--space-8`
  - `--space-12`
  - `--space-16`
  - `--space-24`
  - `--space-32`

## สิ่งที่เปลี่ยนจากโปรเจกต์เดิม

1. แยกออกมาเป็นโปรเจกต์ใหม่ที่ไม่อิง routing/custom layout ของ BOLA เดิม
2. ใช้ `@uxuissk/design-system/styles.css` เป็น root stylesheet ตัวแรก
3. ไม่ใช้ Tailwind ในโปรเจกต์ใหม่นี้เลย
4. ไม่เรียก backend/API และไม่ใช้ auth mode ของ BOLA
5. เปลี่ยนเป็น mock state ภายในแอปเพื่อให้ทดลอง flow ได้จริง

## Prototype Flow ที่ใช้งานได้

### Dashboard
- แสดง KPI mock
- แสดงรายการ LINE OA ล่าสุด
- แสดง segment snapshot

### LINE OA
- ค้นหา OA
- filter ตาม status
- toggle status
- เพิ่ม OA ใหม่ผ่าน modal

### Contacts
- สลับแท็บ `All followers` / `Phone`
- ค้นหาข้อมูล mock
- filter ตาม LINE OA
- แสดง empty state เมื่อแท็บ `Phone` ไม่มีข้อมูล

### Segments
- แสดงสรุป segment
- แสดงรายการ segment
- เพิ่ม segment ใหม่ผ่าน modal

## สิ่งที่ยังไม่เหมือน BOLA จริง และเหตุผล

1. ยังไม่เชื่อม backend เลย
   - ตั้งใจตัดออกตาม scope เพื่อให้เป็น UI/prototype only

2. ยังไม่ใช่ flow ธุรกิจครบทั้งระบบ
   - ตอนนี้ครอบคลุมเพียง 4 หน้าแรกตามโจทย์

3. Sidebar ไม่ได้ clone menu ทั้งระบบ BOLA
   - ลด scope เหลือเฉพาะ `Dashboard`, `LINE OA`, `Contacts`, `Segments`

4. ยังไม่ใช่ data model เดิมทั้งก้อน
   - ใช้ mock data แบบง่ายเพื่อให้ prototype กดใช้งานได้โดยไม่ต้องมี backend

5. โปรเจกต์ใหม่นี้ยังไม่ได้ push ไปเป็น remote repository ใหม่
   - ใน session นี้มีสิทธิ์สร้างไฟล์/commit/push เข้า repo ที่มีอยู่แล้วได้ แต่ไม่มี tool สำหรับ `create new GitHub repository` โดยตรง
   - ถ้าต้องการ push จริงเป็น repo ใหม่ ต้องมี empty repository URL มาก่อน หรือให้สร้าง repo จากฝั่ง GitHub ก่อน

## การปรับ shell เพิ่มเติมล่าสุด

1. ย้าย `TopNavbar` ไปอยู่แถวบนสุดของแอปให้กินความกว้างเต็ม
2. แยก body ด้านล่างออกเป็น `Sidebar + Content`
3. ใช้ `collapsed` และ `onCollapsedChange` ของ DSS `Sidebar` จริง
4. เพิ่ม hamburger/toggle ให้กดเปิดปิด sidebar ได้
5. เพิ่ม mock menu group ให้ sidebar ยาวขึ้นในสไตล์ DSS
6. ล็อก content padding หลักเป็น `24px` รอบด้าน

## สถานะความเหมือน DSS ล่าสุด

### ทำให้ตรงได้แล้ว

1. `TopNavbar` ใช้ runtime component ของ DSS โดยตรง
2. `Sidebar` ใช้ runtime component ของ DSS โดยตรง
3. main content ถูกห่อด้วย container ภายในและใช้ padding `24px`
4. notification action ซ้ำถูกลบออก เหลือ notification entry หลักของ `TopNavbar`
5. shell แยกเป็น `TopNavbar` ด้านบน และ `Sidebar + Content` ด้านล่างชัดเจนขึ้น

### ยังไม่เหมือน DSS 100%

1. ปุ่ม toggle sidebar บน desktop ยังต้องวางซ้อนเพิ่มเอง
   - สาเหตุ: `TopNavbar` runtime ไม่มี API สำหรับ desktop sidebar toggle pattern โดยตรง
   - ผล: แม้ใช้ `DSButton` แล้ว แต่ยังเป็น custom placement ไม่ใช่ pattern ที่ package สร้างให้มาเอง

2. group expand/collapse ราย section ใน `Sidebar` ยังทำไม่ได้แบบ native
   - สาเหตุ: `SidebarGroup` ของ runtime มีแค่ `label` และ `items`
   - ไม่มี state/API สำหรับ `expanded`, `onToggleGroup`, หรือ accordion behavior ต่อ group
   - ผล: เมนูยาวขึ้นได้ แต่ยังไม่มี action expand ต่อกลุ่มแบบที่ต้องการ

3. ไม่มี `Container` component เฉพาะใน package runtime ชุดนี้
   - สาเหตุ: typings/runtime ปัจจุบันไม่ export `Container`
   - ผล: ต้องใช้ wrapper div ที่อิง token แทน

## ข้อเสนอแนะถ้าจะให้เหมือน DSS เป๊ะกว่านี้

1. ฝั่ง DSS ควรเพิ่ม canonical AppShell composition
   - `TopNavbar` ที่รองรับ desktop shell toggle
   - `Sidebar` ที่รองรับ group expand/collapse

2. ถ้ายังไม่มีการเพิ่มใน package
   - โปรเจกต์นี้จะต้องทำ custom shell layer ทับ DSS runtime
   - วิธีนี้ทำให้หน้าตาใกล้ขึ้นได้ แต่จะไม่ใช่ “ใช้ component runtime ตรง ๆ 100%” ในความหมายเคร่งครัด

## ปัญหาที่พบและวิธีแก้

### ปัญหา
- ตอนแรก DSS `styles.css` ชนกับ `postcss.config.js` ของ repo แม่ เพราะโปรเจกต์ต้นทางยังมี Tailwind plugin อยู่

### วิธีแก้
- สร้าง `postcss.config.js` เฉพาะในโปรเจกต์ `bola-dss-ui-only`
- ใช้ `autoprefixer` อย่างเดียว
- ทำให้โปรเจกต์ใหม่ build ผ่านโดยไม่พึ่ง Tailwind

## ผลการตรวจล่าสุด

- TypeScript check: ผ่าน
- Production build: ผ่าน
- Local preview: ผ่านที่ `http://127.0.0.1:4174/`

## ข้อเสนอแนะถัดไป

1. สร้าง GitHub repo ใหม่สำหรับ `bola-dss-ui-only`
2. ย้ายโฟลเดอร์นี้ออกไปเป็น repo แยกจริง
3. เพิ่ม README/screenshots และ deploy preview
4. ถ้าจะไปต่อ Phase ถัดไป ค่อยเพิ่ม mock workflow ที่ลึกขึ้น เช่น create broadcast, follower detail, segment rule builder
