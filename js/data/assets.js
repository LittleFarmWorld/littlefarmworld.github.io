/* ===== assets.js : รายการไฟล์รูป =====
   - มอนสเตอร์: assets/mon/NNN.png  (NNN = เลขชีต 001-142)
       แต่ละไฟล์ 192x256 พื้นโปร่งใส = ตาราง 3 คอลัมน์ x 4 แถว ช่องละ 64x64
       คอลัมน์ = ร่าง (ซ้าย=ร่าง 1, กลาง=v.2, ขวา=Max)  แถว = มอน 4 ตัวในชีตนั้น
       สีลดเหลือ RGB565 และไม่มีเงา/เส้นพื้น (ภาพนิ่งสำหรับ ESP32)
   - พื้นหลัง: assets/still/bg/zoneN.png  224x144 RGB565 (N = เลขโซน 0-32 ดู world.js) */
const BG=Array.from({length:33},(_,i)=>'assets/still/bg/zone'+i+'.png');
const monImg=k=>'assets/mon/'+String(sheetOf(k)).padStart(3,'0')+'.png';
