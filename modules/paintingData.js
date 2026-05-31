// ============================================================
// PHÒNG TRIỂN LÃM VR — "Hồ Chí Minh: Tâm Hồn & Di Sản"
// Dữ liệu cập nhật từ docs/01_CONTENT.md
// Bố cục: Hành trình cảm xúc Tò mò → Xúc động → Kính phục
// ============================================================

const sourceData = [
  // ── SẢNH CHÍNH — Lối vào (Front Wall: index 0) ──────────────
  {
    img: "chan-dung-bac-ho.jpg",
    title: "Nguyễn Tất Thành — Người Sẽ Thay Đổi Lịch Sử",
    hoverText: "Một thanh niên mang trong lòng vận mệnh của cả dân tộc.",
    desc: "Nhìn vào đôi mắt này. Đây là ánh mắt của một người thanh niên chưa đến ba mươi tuổi — nhưng đã quyết định rời bỏ tất cả: gia đình, quê hương, sự an toàn — để bước lên con tàu Amiral Latouche-Tréville, ra đi tìm con đường giải phóng cho một dân tộc đang quằn quại dưới gót giày thực dân.\n\nKhông ai có thể đoán được khi ấy rằng người thanh niên mang tên Văn Ba đó sẽ trở thành Nguyễn Ái Quốc — rồi Hồ Chí Minh — rồi trở thành biểu tượng của ý chí tự do được cả thế giới ngưỡng vọng.",
    quote: '"Tôi chỉ có một ham muốn, ham muốn tột bậc, là làm sao cho nước ta được hoàn toàn độc lập, dân ta được hoàn toàn tự do." — Hồ Chí Minh',
    tag: "Sảnh Chính",
    artist: "Bộ sưu tập lịch sử",
    year: "1910 – 1911",
  },

  // ── WING 1: TÁC PHẨM CỦA BÁC (Left Wall: index 1, 2, 3) ────
  {
    img: "Nhat-ky-trong-tu.jpg",
    title: "Nhật Ký Trong Tù — Tự Do Bên Trong Bức Tường",
    hoverText: "133 bài thơ viết bằng xích xiềng, từ tâm hồn không bao giờ bị giam cầm.",
    desc: "Mười ba tháng. Mười ba tháng bị chính quyền Tưởng Giới Thạch giam cầm và giải đi qua hơn ba mươi nhà lao tỉnh Quảng Tây, tay bị xiềng, sức khỏe kiệt quệ, tương lai hoàn toàn mờ mịt. Người khác có thể gục ngã. Người tù này thì làm thơ.\n\nMột trăm ba mươi ba bài thơ chữ Hán được viết lén trên những mảnh giấy nhỏ — đó là Ngục Trung Nhật Ký. Không phải thơ than thân. Đó là những bài thơ của một tâm hồn vẫn đang quan sát trời đêm qua song sắt, vẫn mỉm cười trước trăng tròn, vẫn nghĩ đến đồng bào dù thân mình chẳng còn tự do.",
    quote: '"Trong tù không rượu cũng không hoa,\nCảnh đẹp đêm nay, khó hững hờ!\nNgười ngắm trăng soi ngoài cửa sổ,\nTrăng nhòm khe cửa ngắm nhà thơ." — Ngắm Trăng, Nhật Ký Trong Tù',
    tag: "Wing 1 — Tác phẩm của Bác",
    artist: "Hồ Chí Minh",
    year: "29.8.1942 – 10.9.1943",
  },
  {
    img: "tho-chuc-tet.jpg",
    title: "Thơ Chúc Tết — Khi Lãnh Tụ Nói Chuyện Bằng Thơ",
    hoverText: "Mỗi năm một bài thơ Tết — mỗi bài là một lời thề với dân tộc.",
    desc: "Không có bản tin chính phủ nào. Không có diễn văn dài dòng. Cứ mỗi độ Tết đến, Bác Hồ lại gửi đến toàn thể đồng bào một bài thơ — ngắn gọn, mộc mạc, dễ thuộc, dễ nhớ. Đó là cách một vị lãnh tụ nói chuyện với nhân dân của mình: bằng ngôn ngữ của trái tim.\n\nBài thơ Tết cuối cùng, viết năm Kỷ Dậu 1969, vẫn còn đó — và nét bút kết thúc bằng chữ ký quen thuộc mà hàng triệu người Việt Nam nhận ra ngay. Chữ ký ấy không phải ký hiệu quyền lực. Đó là lời hứa được viết đi viết lại, năm này qua năm khác, cho đến hơi thở cuối cùng.",
    quote: '"Tiến lên! Chiến sĩ, đồng bào.\nBắc Nam sum họp, Xuân nào vui hơn." — Thơ Chúc Tết Xuân Kỷ Dậu 1969',
    tag: "Wing 1 — Tác phẩm của Bác",
    artist: "Hồ Chí Minh",
    year: "1946 – 1969",
  },
  {
    img: "ban-an-che-do-thuc-dan-phap.jpg",
    title: "Bản Án Chế Độ Thực Dân Pháp — Khi Ngòi Bút Là Vũ Khí",
    hoverText: "Nguyễn Ái Quốc viết bằng tiếng Pháp để tố cáo người Pháp với cả thế giới.",
    desc: 'Paris, 1925. Một người Việt Nam ngồi viết bằng tiếng Pháp, gửi đến chính người Pháp — và cả thế giới — một bản cáo trạng lạnh người về những gì đang xảy ra tại các thuộc địa nhân danh "sứ mệnh khai hóa văn minh".\n\nBản Án Chế Độ Thực Dân Pháp không phải lời kêu than. Đó là một công trình khảo cứu sắc bén, có số liệu, có nhân chứng, có tên tuổi, có địa danh. Nguyễn Ái Quốc đã dùng chính ngôn ngữ của kẻ thực dân để vạch trần sự thật mà họ cố che giấu.',
    quote: '"Le Procès de la Colonisation Française" — Nguyễn Ái Quốc, Paris 1925',
    tag: "Wing 1 — Tác phẩm của Bác",
    artist: "Nguyễn Ái Quốc (Hồ Chí Minh)",
    year: "Paris, 1925",
  },

  // ── WING 2: VĂN KIỆN & BÁO CHÍ (Back Wall: index 4) ─────────
  {
    img: "tuyen-ngon-doc-lap.jpg",
    title: "Tuyên Ngôn Độc Lập — Buổi Sáng Mùa Thu Làm Thay Đổi Tất Cả",
    hoverText: 'Bốn chữ "Việt Nam Dân Chủ Cộng Hòa" — và lịch sử sang trang.',
    desc: 'Hà Nội, ngày 2 tháng 9 năm 1945. Quảng trường Ba Đình tràn ngập hơn năm mươi vạn người. Một người đàn ông gầy gò, bước ra lễ đài trong bộ kaki bạc màu. Chỉ có một tờ giấy và một giọng nói.\n\n"Tất cả mọi người đều sinh ra có quyền bình đẳng..."\n\nBản Tuyên ngôn mở đầu bằng lời trích từ Tuyên ngôn Độc lập Mỹ và Tuyên ngôn Nhân quyền Pháp — một cách nói đầy tinh tế với thế giới: Các ông đã đặt ra những nguyên tắc đó. Chúng tôi chỉ đang sống đúng theo chúng.',
    quote: '"Tất cả mọi người đều sinh ra có quyền bình đẳng. Tạo hóa cho họ những quyền không ai có thể xâm phạm được..." — Tuyên ngôn Độc lập, 2.9.1945',
    tag: "Wing 2 — Văn kiện & Báo chí",
    artist: "Hồ Chí Minh soạn thảo",
    year: "2 tháng 9, 1945",
  },

  // ── WING 3 & 4: NGHỆ SĨ THẾ GIỚI (Right Wall: index 5, 6, 7) ─
  {
    img: "Nhac-Si-Chu-Minh.jpg",
    title: "Người Là Niềm Tin Tất Thắng — Khúc Hùng Ca Từ Nỗi Đau",
    hoverText: "Bài hát ra đời trong nước mắt — nhưng vang lên như một lời thề.",
    desc: 'Tháng 9 năm 1969. Khắp Việt Nam chìm trong tang tóc. Bác Hồ đã ra đi. Nhạc sĩ Chu Minh nhận nhiệm vụ: viết một ca khúc để vĩnh biệt Người. Xung quanh ông là tiếng khóc, bầu không khí nặng như chì.\n\nNhưng khi đặt bút, ông lại nghĩ đến một điều khác: Bác ra đi về cõi vĩnh hằng, nhưng tư tưởng của Người thì còn sống mãi. Và thế là thay vì viết một bài điếu ca, ông viết một bài hùng ca: "Hồ Chí Minh, Bác Hồ Chí Minh kính yêu — Người là niềm tin tất thắng sáng ngời..." Ca khúc vang lên ngay trong lễ tang — trở thành lời thề của cả dân tộc.',
    quote: '"Người là niềm tin tất thắng sáng ngời,\nTa tự hào đi lên, ôi Việt Nam!" — Nhạc sĩ Chu Minh, 1969',
    tag: "Wing 3 — Nghệ sĩ thế giới",
    artist: "Nhạc sĩ Chu Minh",
    year: "Tháng 9, 1969",
  },
  {
    img: "Ewan-MacColl.jpg",
    title: "The Ballad of Ho Chi Minh — Khi Huyền Thoại Vượt Biên Giới",
    hoverText: "Một người Anh ngồi viết bài hát về một người Việt — và cả thế giới hát theo.",
    desc: 'London, 1954. Tin tức về chiến thắng Điện Biên Phủ lan ra khắp thế giới. Nhạc sĩ dân gian người Anh Ewan MacColl — người dành cả cuộc đời viết về những người bị áp bức — ngồi xuống và viết một bài ballad về người đàn ông mà ông chưa bao giờ gặp, nhưng cảm thấy như đã biết rất lâu.\n\n"From rice field and mountain, from delta and plain..."\n\nBài hát được dịch ra nhiều ngôn ngữ, được hát ở những cuộc tuần hành phản chiến từ Paris đến New York. Nó nhắc nhở thế giới: cuộc đấu tranh của Việt Nam không phải chuyện của riêng người Việt.',
    quote: '"From rice field and mountain, from delta and plain,\nHo Chi Minh has led us..." — Ewan MacColl, London 1954',
    tag: "Wing 3 — Nghệ sĩ quốc tế",
    artist: "Ewan MacColl (Anh Quốc)",
    year: "London, 1954",
  },
  {
    img: "Bac-Ho-Pac-Bo.jpg",
    title: "Bác Hồ Làm Thơ Ở Pác Bó — Tâm Hồn Thi Sĩ Giữa Núi Rừng",
    hoverText: "Ngồi trên đá lạnh, bên suối Lênin — và vẫn làm thơ.",
    desc: 'Họa sĩ Phan Kế An vẽ bức tranh này năm 1948. Hang đá lạnh thấu xương. Thức ăn là cháo ngô và măng rừng tự hái. Giường ngủ là tấm ván kê trên phiến đá. Kẻ thù có thể ập đến bất cứ lúc nào.\n\nNhưng nhìn vào bức tranh: người đàn ông ngồi trên tảng đá bên dòng suối — trong tư thế hoàn toàn thư thái, như một thi sĩ đang ngồi ở vườn nhà mình. Bác đặt tên dòng suối là suối Lênin, ngọn núi là núi Các Mác. Rồi Người cười và viết: "Sáng ra bờ suối tối vào hang / Cháo bẹ rau măng vẫn sẵn sàng / Cuộc đời cách mạng thật là sang!"',
    quote: '"Cuộc đời cách mạng thật là sang!" — Tức Cảnh Pác Bó, Hồ Chí Minh, 1941',
    tag: "Wing 3 — Nghệ sĩ thế giới",
    artist: "Họa sĩ Phan Kế An",
    year: "Sáng tác 1948",
  },
  {
    img: "Phan-Lac-Hoa.jpg",
    title: "Đêm Nghe Hát Đò Đưa Nhớ Bác — Nguồn Cội Của Một Tâm Hồn Lớn",
    hoverText: "Tiếng hát ru từ dòng sông Lam — và một tâm hồn vĩ đại được sinh ra từ đó.",
    desc: "Nhạc sĩ Phan Lạc Hoa ngồi bên dòng sông Lam vào một đêm trăng, nghe những câu hò ví giặm ngọt ngào của người dân xứ Nghệ — và bỗng nhận ra: chính những lời hát đò đưa này đã nuôi dưỡng nên tâm hồn của một cậu bé tên Nguyễn Sinh Cung. Rằng trước khi trở thành Hồ Chí Minh, Người đã là một đứa trẻ lớn lên bên những câu hát mang đầy tình đất, tình người.\n\nCa khúc ra đời năm 1981 không ca ngợi chiến công — nó chạm vào điều gần gũi hơn và sâu hơn: những rễ cội văn hóa đã tạo nên một con người vĩ đại.",
    quote: '"Gặp lại tiếng thoi mẹ ngồi dệt vải,\nGặp lại giọng trầm đêm trăng cha đọc thơ..." — Phan Lạc Hoa, 1981',
    tag: "Wing 4 — Âm nhạc & Ký ức",
    artist: "Nhạc sĩ Phan Lạc Hoa",
    year: "1981",
  },
];

// ============================================================
// BỐ TRÍ TƯỜNG: 8 hiện vật trên 4 bức tường
//   Front Wall  (z=-19.5): 1 tranh — Sảnh Chính   [index 0]
//   Left Wall   (x=-19.5): 3 tranh — Wing 1        [index 1,2,3]
//   Back Wall   (z=+19.5): 1 tranh — Wing 2        [index 4]
//   Right Wall  (x=+19.5): 3 tranh — Wing 3 & 4   [index 5,6,7]
// ============================================================

export const paintingData = [
  // ── Front Wall — Sảnh Chính (1 tranh, căn giữa) ──────────────
  {
    imgSrc: `images/${sourceData[0].img}`,
    width: 6,
    height: 4,
    position: { x: 0, y: 2.5, z: -19.5 },
    rotationY: 0,
    info: {
      title: sourceData[0].title,
      artist: sourceData[0].artist,
      description: sourceData[0].desc,
      year: sourceData[0].year,
      hoverText: sourceData[0].hoverText,
      quote: sourceData[0].quote,
      tag: sourceData[0].tag,
    },
  },

  // ── Left Wall — Wing 1: Tác phẩm của Bác (3 tranh) ──────────
  ...Array.from({ length: 3 }, (_, i) => {
    const d = sourceData[i + 1];
    return {
      imgSrc: `images/${d.img}`,
      width: 5,
      height: 3.5,
      position: { x: -19.5, y: 2.5, z: -10 + 10 * i },
      rotationY: Math.PI / 2,
      info: {
        title: d.title,
        artist: d.artist,
        description: d.desc,
        year: d.year,
        hoverText: d.hoverText,
        quote: d.quote,
        tag: d.tag,
      },
    };
  }),

  // ── Back Wall — Wing 2: Văn kiện (Dịch trái cửa vào) ────────
  {
    imgSrc: `images/${sourceData[4].img}`,
    width: 6,
    height: 4,
    position: { x: -6.5, y: 2.5, z: 19.5 },
    rotationY: Math.PI,
    info: {
      title: sourceData[4].title,
      artist: sourceData[4].artist,
      description: sourceData[4].desc,
      year: sourceData[4].year,
      hoverText: sourceData[4].hoverText,
      quote: sourceData[4].quote,
      tag: sourceData[4].tag,
    },
  },

  // ── Right Wall — Wing 3 & 4: Nghệ sĩ thế giới (3 tranh) ─────
  ...Array.from({ length: 3 }, (_, i) => {
    const d = sourceData[i + 5];
    return {
      imgSrc: `images/${d.img}`,
      width: 5,
      height: 3.5,
      position: { x: 19.5, y: 2.5, z: -10 + 10 * i },
      rotationY: -Math.PI / 2,
      info: {
        title: d.title,
        artist: d.artist,
        description: d.desc,
        year: d.year,
        hoverText: d.hoverText,
        quote: d.quote,
        tag: d.tag,
      },
    };
  }),
];
