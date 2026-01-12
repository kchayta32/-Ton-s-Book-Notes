# 📚 Ton's Book Notes | บันทึกหนังสือของต้น

> เว็บไซต์สำหรับเก็บบันทึกสาระสำคัญจากหนังสือต่างๆ ออกแบบเป็นสไตล์สมุดบันทึกลายมือ + สีน้ำ

![Ton's Book Notes Preview](assets/images/preview.png)

## ✨ Features

- 📖 **บันทึกสาระสำคัญ** - เก็บประเด็นสำคัญจากหนังสือแต่ละเล่มอย่างเป็นระบบ
- 🎨 **ดีไซน์สไตล์สมุดบันทึก** - ออกแบบเหมือนสมุดบันทึกลายมือพร้อมเอฟเฟกต์สีน้ำ
- 📊 **Infographic** - แสดง infographic สรุปเนื้อหาในแต่ละหัวข้อ
- 📱 **Responsive Design** - รองรับการแสดงผลทุกขนาดหน้าจอ
- 🚀 **Single Page Application** - โหลดเร็ว ใช้งานง่าย

## 📂 Project Structure

```
summery_book/
├── index.html          # หน้าเว็บหลัก
├── styles.css          # สไตล์ CSS (สีน้ำ + ลายมือ)
├── app.js              # JavaScript สำหรับ navigation
├── data.js             # ข้อมูลหนังสือทั้งหมด
├── README.md           # ไฟล์นี้
└── assets/
    └── images/         # รูปภาพปกหนังสือและ infographics
```

## 📚 หนังสือที่บันทึก

### 1. AI and Blockchain Technology in 6G Wireless Network
- **ผู้แต่ง:** Malaya Dutta Borah, Pushpa Singh, Ganesh Chandra Deka (Editors)
- **สำนักพิมพ์:** Springer
- **เนื้อหาที่บันทึก:**
  - ข้อจำกัดของเครือข่าย 5G
  - บทบาทสำคัญและขีดความสามารถของ 6G
  - รูปแบบบริการและเทคโนโลยีใหม่ใน 6G
  - ตารางวิวัฒนาการ 1G-6G
  - Performance Metrics เปรียบเทียบ 5G vs 6G
  - High Security, Privacy, and Secrecy
  - Multi-Band Ultrafast Transmission

## 🚀 Getting Started

### วิธีใช้งาน

1. Clone repository นี้:
```bash
git clone https://github.com/kchayta32/-Ton-s-Book-Notes.git
```

2. เปิดไฟล์ `index.html` ด้วย browser หรือใช้ Live Server:
```bash
# ใช้ VS Code Live Server Extension หรือ
npx serve .
```

3. เพลิดเพลินกับการอ่านบันทึก! 📖

## 🎨 Design Highlights

- **Watercolor Effects** - เอฟเฟกต์สีน้ำพื้นหลังเคลื่อนไหว
- **Notebook Paper** - พื้นหลังกระดาษสมุดบันทึกพร้อมเส้นบรรทัด
- **Washi Tape** - ตกแต่งด้วยเทปวาชิ
- **Handwriting Fonts** - ฟอนต์ลายมือ (Caveat, Indie Flower)
- **Thai Typography** - รองรับภาษาไทย (Sarabun, Chakra Petch)

## 🛠️ Technologies Used

- **HTML5** - โครงสร้างหน้าเว็บ
- **CSS3** - สไตล์และ animations
- **Vanilla JavaScript** - ไม่ใช้ framework ใดๆ
- **Google Fonts** - ฟอนต์ลายมือและภาษาไทย

## 📝 การเพิ่มหนังสือใหม่

เพิ่มข้อมูลหนังสือใหม่ใน `data.js`:

```javascript
{
    id: "book-id",
    title: "ชื่อหนังสือ",
    subtitle: "คำบรรยาย",
    cover: "assets/images/cover.png",
    authors: "ผู้แต่ง",
    publisher: "สำนักพิมพ์",
    tags: ["แท็ก1", "แท็ก2"],
    sections: [
        {
            type: "list",
            title: "หัวข้อ",
            items: [...]
        }
        // เพิ่ม sections ตามต้องการ
    ]
}
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Ton** - Made with 💖

---

> 📚 "การอ่านหนังสือหนึ่งเล่มดีกว่าการอ่านร้อยเล่มแล้วลืม" - จดบันทึกไว้ จำได้ตลอดไป ✨
