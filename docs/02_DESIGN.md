# Thiết Kế Trải Nghiệm — VR Art Gallery
## "Hồ Chí Minh: Tâm Hồn & Di Sản"

> Tài liệu định hướng thiết kế toàn diện: không gian, ánh sáng, màu sắc, typography, âm thanh, và hành trình cảm xúc của người xem.

---

## 1. Triết Lý Thiết Kế

Phòng triển lãm này không phải bảo tàng truyền thống. Không phải nơi người ta đi qua, đọc bảng chú thích rồi về. Đây là một **không gian cảm xúc** — nơi người xem không chỉ *nhìn* mà *cảm nhận* được sự hiện diện của một con người vĩ đại thông qua những tác phẩm Người để lại và những tác phẩm Người truyền cảm hứng.

**Nguyên tắc cốt lõi:**
- **Tĩnh lặng có chủ đích** — Không gian không ồn ào. Ánh sáng không chói. Âm thanh không át giọng nói bên trong mỗi người xem.
- **Kể chuyện, không liệt kê** — Mọi yếu tố thiết kế phục vụ câu chuyện. Không có chi tiết trang trí vô nghĩa.
- **Kính trọng, không khô cứng** — Trang trọng nhưng ấm áp. Lịch sử nhưng không xa cách.

---

## 2. Bảng Màu (Color Palette)

### Màu Chủ Đạo — Gam Màu Di Sản

| Tên | Hex | Ý nghĩa | Dùng cho |
|-----|-----|---------|----------|
| **Vàng Cổ Vật** | `#C9A84C` | Ánh sáng của những trang sách cũ, của đèn dầu đêm khuya | Accent chính, viền modal, icon |
| **Đỏ Cách Mạng Trầm** | `#8B1A1A` | Lá cờ đỏ không chói mắt — trang trọng và có chiều sâu | Highlight đặc biệt, ngày tháng quan trọng |
| **Đen Mực Tàu** | `#1A1410` | Màu mực viết thư pháp, màu của những trang nhật ký | Nền chính toàn không gian |
| **Nâu Giấy Cũ** | `#D4B896` | Màu của những tờ báo, những trang sách đã ngả màu | Tone tường phòng, nền thứ cấp |
| **Kem Cổ Điển** | `#F0E6D3` | Màu của ánh nến, ấm áp và không mỏi mắt | Text chính trong modal |
| **Xanh Đá Phiến** | `#2C3E50` | Màu núi rừng Việt Bắc trong sương sớm | Nền của panel phụ, hover state |

### Quy Tắc Dùng Màu
- **80% tối** — Không gian phòng dùng gam tối để tranh nổi bật.
- **15% trung tính** (nâu, kem) — Các bề mặt tường và sàn.
- **5% accent** (vàng, đỏ trầm) — Chỉ xuất hiện ở điểm nhấn quan trọng. Không lạm dụng.

---

## 3. Typography — Hệ Thống Chữ

### Font Chính: Cormorant Garamond
*Dùng cho: Tiêu đề lớn, tên tác phẩm, trích dẫn thơ*

Cormorant Garamond mang linh hồn của những trang sách cổ Châu Âu — nơi Nguyễn Ái Quốc từng đặt bút. Chữ serif cao, thanh mảnh, tạo cảm giác trang nghiêm mà không nặng nề. Đặc biệt đẹp khi hiển thị chữ Việt có dấu.

### Font Phụ: Be Vietnam Pro
*Dùng cho: Nội dung body text, chú thích, label*

Font thuần Việt, dễ đọc, hiện đại nhưng không lạnh lẽo. Kết hợp với Cormorant tạo ra sự tương phản giữa "di sản" và "ngày nay" — đúng với tinh thần của triển lãm.

### Hệ Thống Kích Thước
```
Tên tác phẩm (Modal Title):     40–48px  |  Cormorant Garamond Bold  |  Letter-spacing: 0.02em
Tên nghệ sĩ / năm:              16px     |  Be Vietnam Pro Light     |  Letter-spacing: 0.15em  |  Uppercase
Body text (câu chuyện):         18px     |  Be Vietnam Pro Regular   |  Line-height: 1.8
Trích dẫn thơ:                  20px     |  Cormorant Garamond Italic|  Line-height: 1.9
Hover text (nhỏ):               14px     |  Be Vietnam Pro Regular   |  Opacity: 0.85
```

---

## 4. Thiết Kế Không Gian 3D

### Phòng Chính — Tỉ Lệ & Cảm Giác

Phòng hình chữ nhật, kích thước 40×40 đơn vị, trần cao 20 đơn vị. **Không thu nhỏ phòng** — sự rộng rãi tạo ra cảm giác trang trọng. Người xem cần có khoảng cách để *ngắm* tranh, không phải đứng sát mặt vào.

**Tường:** Màu Colonial Yellow (`#E8D0A9`) với texture da thuộc thô — gợi lên vẻ cổ kính của một dinh thự thời Pháp thuộc được cải tạo thành bảo tàng.

**Sàn:** Gỗ tối màu, bóng nhẹ — phản chiếu ánh đèn spotlight tạo chiều sâu không gian.

**Trần:** Tối, gần như đen — không để trần cạnh tranh với ánh sáng spotlight trên tranh.

### Bố Cục Trưng Bày Theo Hành Trình

Người xem bước vào từ phía Nam (z = +15). Hành trình tự nhiên dẫn ra phía Bắc (tường Front Wall), rồi vòng theo chiều kim đồng hồ:

```
[Lối vào] → [Sảnh chính: Chân dung trẻ] → [Wing 1: Tác phẩm Bác]
→ [Wing 2: Văn kiện & Báo chí] → [Wing 3: Nghệ sĩ quốc tế]
→ [Wing 4: Âm nhạc & Ký ức] → [Trung tâm: Tượng Bác + Bàn làm việc]
```

**Mỗi Wing là một chương của câu chuyện** — người xem không đọc một danh sách, họ đang đi qua một cuộc đời.

---

## 5. Ánh Sáng — Ngôn Ngữ Không Lời

Ánh sáng là một trong những công cụ cảm xúc mạnh nhất trong thiết kế VR. Trong triển lãm này, ánh sáng được dùng có chủ đích:

### Spotlight Trên Tranh
- Mỗi bức tranh có **một spotlight riêng**, chiếu từ trên cao xuống góc 30°.
- Màu spotlight: **Warm white** (`#FFF5E0`) — không dùng ánh sáng lạnh xanh trắng.
- Cường độ vừa đủ để tranh rõ nét, không tạo bóng cứng xấu trên mặt tranh.
- Phần nền xung quanh tranh **tối hơn đáng kể** — tạo hiệu ứng "tranh tự phát sáng".

### Ánh Sáng Nền
- Môi trường phòng có ánh sáng ambient rất thấp — chỉ đủ để người xem thấy mình đang ở đâu, không bị mù.
- Không có ánh sáng overhead rực rỡ — tránh cảm giác nhà kho hay siêu thị.

### Ánh Sáng Tương Tác (Hover State)
- Khi người xem nhìn vào tranh → spotlight của tranh đó **tăng nhẹ cường độ** (10–15%) và **tỏa thêm golden glow** xung quanh khung tranh.
- Hiệu ứng này tinh tế — không nháy nháy, không chói — chỉ đủ để tranh "đón chào" người xem đang đến gần.

### Khu Vực Trung Tâm (Tượng + Bàn Làm Việc)
- Ánh sáng ấm hơn, lan tỏa hơn — cảm giác như đây là không gian sống, không phải trưng bày.
- Đèn bàn trên bàn làm việc tạo **ánh sáng điểm** nhỏ ấm — điểm nhấn duy nhất không phải spotlight từ trần.

---

## 6. Thiết Kế Modal — Glassmorphism

Khi người xem click vào một tác phẩm, một Modal xuất hiện ở giữa màn hình. Đây là khoảnh khắc quan trọng nhất của trải nghiệm — khi câu chuyện được kể.

### Hình Dáng & Vật Liệu

Modal hình chữ nhật, góc bo tròn `24px`. Nền là kính mờ — **glassmorphism** — nhìn xuyên qua thấy phòng triển lãm phía sau nhưng mờ nhạt, không gây phân tâm.

```
Nền:            rgba(20, 15, 10, 0.75)
Backdrop blur:  24px
Viền:           1px solid rgba(201, 168, 76, 0.3)  [Vàng cổ vật, mờ]
Box shadow:     0 32px 64px rgba(0, 0, 0, 0.6)
Border radius:  24px
Padding:        48px
Max width:      680px
```

### Cấu Trúc Nội Dung Modal

```
┌────────────────────────────────────────┐
│  [TAG: Giai đoạn / Thể loại]          │  ← 12px, uppercase, vàng cổ vật, letter-spacing rộng
│                                        │
│  TÊN TÁC PHẨM                         │  ← 40px, Cormorant Garamond Bold, kem cổ điển
│  Tên nghệ sĩ · Năm                    │  ← 14px, Be Vietnam Pro Light, opacity 0.6
│                                        │
│  ─────────────────────────────         │  ← Divider: 1px, gradient từ vàng → transparent
│                                        │
│  [Nội dung câu chuyện]                 │  ← 18px, Be Vietnam Pro, line-height 1.8
│                                        │
│  ❝ Trích dẫn thơ hoặc lời nói ❞       │  ← 20px, Cormorant Garamond Italic, thụt lề trái 24px
│    — Nguồn trích dẫn                   │  ← 14px, opacity 0.6
│                                        │
│                              [Đóng ×]  │  ← Góc trên phải, nhỏ, không chiếm diện tích
└────────────────────────────────────────┘
```

### Hiệu Ứng Xuất Hiện Modal
- **Fade in + Scale up nhẹ**: từ `scale(0.95) opacity(0)` → `scale(1) opacity(1)`
- Duration: `400ms`, easing: `cubic-bezier(0.16, 1, 0.3, 1)` — cảm giác nặng, chắc, không bật nảy.
- Nền phía sau **tối xuống 40%** khi modal mở — focus hoàn toàn vào nội dung.

---

## 7. Hover Panel — Thông Tin Nhanh

Khi người xem nhìn thẳng vào tranh (chưa click), một panel nhỏ hiện ở góc dưới màn hình:

```
┌──────────────────────────────────┐
│  ══ TÊN TÁC PHẨM                │  ← 16px, Cormorant Garamond
│  Hover text ngắn gọn...          │  ← 13px, Be Vietnam Pro, opacity 0.8
│  [Click để xem chi tiết →]       │  ← 12px, vàng cổ vật, gợi ý tương tác
└──────────────────────────────────┘
```

- Nền: `rgba(20, 15, 10, 0.85)` với blur nhẹ.
- Xuất hiện từ dưới lên (slide up) trong `200ms`.
- **Không che khuất** phần lớn màn hình — panel chỉ chiếm ~120px chiều cao ở cạnh dưới.

---

## 8. Crosshair — Điểm Ngắm

Thay vì dấu chấm thông thường, crosshair được thiết kế tinh tế:

- **Trạng thái bình thường:** Bốn nét nhỏ (`+`) màu trắng, mờ, kích thước 12px. Không gây chú ý.
- **Khi hover vào tranh:** Crosshair chuyển thành vòng tròn nhỏ với điểm trung tâm — màu vàng cổ vật, pulsate nhẹ. Gợi ý "có thể tương tác".
- Transition: `200ms ease`.

---

## 9. Âm Thanh — Kiến Trúc Cảm Xúc

### Nhạc Nền Toàn Không Gian

Nhạc nền phải **không có lời**, giai điệu chậm và sâu — không phải nhạc vui, không phải nhạc buồn não nề. Đây là âm thanh của sự chiêm nghiệm.

**Gợi ý phong cách:** Chamber music với đàn tranh, đàn bầu kết hợp với cello và piano — kết hợp âm nhạc truyền thống Việt Nam với dàn nhạc phương Tây, phản ánh chính cuộc đời Bác.

Volume: đủ để cảm nhận nhưng không lấn át — khi người xem dừng lại trước tranh, nhạc nền trở thành phông nền thứ yếu.

### Zone Audio Trigger

Khi người xem bước vào từng Wing, âm lượng của track tương ứng **cross-fade** vào:

| Wing | Âm thanh đặc trưng |
|------|-------------------|
| Sảnh chính | Tiếng bước chân trong hành lang bảo tàng — tiếng vang khẽ |
| Wing 1 (Tác phẩm Bác) | Tiếng lật sách nhẹ, tiếng bút viết |
| Wing 2 (Văn kiện) | Tiếng máy đánh chữ xa xa, tiếng giấy xào xạc |
| Wing 3 (Nghệ sĩ quốc tế) | Giai điệu nhẹ của *Người Là Niềm Tin Tất Thắng* phiên bản đàn tranh |
| Wing 4 (Âm nhạc) | Vài nốt đầu của *Đêm Nghe Hát Đò Đưa Nhớ Bác* |

### Âm Thanh Tương Tác

- **Hover vào tranh:** Tiếng "soạt" nhẹ của khung tranh — như đang mở một trang sách.
- **Click mở Modal:** Tiếng chuông khẽ, một nốt duy nhất — `C4`, reverb dài, fade out trong 2 giây.
- **Đóng Modal:** Im lặng hoàn toàn trong 0.5 giây, rồi nhạc nền trở lại.

---

## 10. Hành Trình Cảm Xúc

Toàn bộ trải nghiệm được thiết kế theo một đường cong cảm xúc có chủ đích:

```
CẢM XÚC

Kính phục ──────────────────────────────────── ★ Picasso & Bác
                                        ★ Tuyên ngôn ĐL
Xúc động ──────────────────── ★ Nhật ký trong tù
                         ★ Thơ Tết
Tò mò ─── ★ Chân dung trẻ
         ★ Lối vào

          [Sảnh]  [Wing 1]  [Wing 2]  [Wing 3]  [Wing 4]
                                              HÀNH TRÌNH →
```

Người xem bước vào với sự **tò mò**. Qua Wing 1-2, cảm xúc dâng lên thành **xúc động** trước những tác phẩm của Bác. Đến Wing 3-4, khi thấy cả thế giới nghiêng mình trước Người, cảm xúc chuyển thành **kính phục** và **tự hào**.

Đây không phải hiệu ứng ngẫu nhiên — đây là kết quả của việc sắp xếp nội dung và thiết kế không gian có chủ đích.

---

## 11. Màn Hình Chào & Kết Thúc

### Màn Hình Chào (Intro Screen)

**Nền:** Ảnh chân dung Bác thời trẻ, được xử lý thành grayscale nhẹ, overlay màu tối `rgba(10,8,5,0.7)`.

**Text trung tâm:**
```
[Logo nhỏ — ngôi sao vàng đơn giản]

HỒ CHÍ MINH
Tâm Hồn & Di Sản

─────────────────────

"Tôi chỉ có một ham muốn, ham muốn tột bậc..."

[NÚT: BẮT ĐẦU THAM QUAN →]
```

**Không có menu phức tạp.** Một nút duy nhất. Sự giản dị là tôn trọng.

### Lời Kết — Khi Rời Khỏi Phòng Triển Lãm

Khi người xem đi đến cuối hành trình (khu vực lối ra), một bảng text xuất hiện trên tường:

> *"Năm 1987, UNESCO vinh danh Hồ Chí Minh là Anh hùng giải phóng dân tộc, Danh nhân văn hóa kiệt xuất của thế kỷ XX.*
> *Nhưng với hàng triệu người Việt Nam — Người chỉ đơn giản là Bác."*

Không có hiệu ứng rầm rộ. Chỉ có chữ, ánh sáng, và sự im lặng.
