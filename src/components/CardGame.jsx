import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Club, Heart, Spade, Diamond, RefreshCcw, Hand, Trophy, TriangleAlert, Cpu, ArrowLeft, HelpCircle, CheckCircle2, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const LAPTOP_VIDEO_SRC = '/video/H%C3%A0nh_Tr%C3%ACnh_B%C3%AD_M%E1%BA%ADt_C%E1%BB%A7a_Laptop.mp4';

const SUITS = [
  { name: 'Spades', icon: <Spade className="w-6 h-6" />, color: 'text-zinc-900' },
  { name: 'Hearts', icon: <Heart className="w-6 h-6" />, color: 'text-soviet-red' },
  { name: 'Clubs', icon: <Club className="w-6 h-6" />, color: 'text-zinc-900' },
  { name: 'Diamonds', icon: <Diamond className="w-6 h-6" />, color: 'text-soviet-red' },
];

const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

const QUESTIONS = [
  {
    q: "Công thức vận động của tiền để biến thành tư bản là gì?",
    options: ["T-H-T", "H-T-H", "T-H-T'", "T-T-H"],
    correct: 2,
    desc: "Công thức T-H-T' (Tiền - Hàng - Tiền') cho thấy sự tăng trưởng của giá trị, trong đó T' > T."
  },
  {
    q: "Nguồn gốc của giá trị thặng dư nằm ở đâu?",
    options: ["Lưu thông (mua rẻ bán đắt)", "Máy móc và công nghệ", "Hàng hóa sức lao động", "Vay mượn"],
    correct: 2,
    desc: "Hàng hóa sức lao động là loại hàng hóa đặc biệt có khả năng tạo ra giá trị mới lớn hơn giá trị của chính nó."
  },
  {
    q: "Thời gian lao động thặng dư là gì?",
    options: ["Thời gian công nhân nghỉ ngơi", "Thời gian công nhân tạo ra giá trị ngang bằng tiền lương", "Thời gian công nhân tạo ra giá trị cho nhà tư bản ngoài tiền lương", "Toàn bộ ngày làm việc"],
    correct: 2,
    desc: "Là khoảng thời gian lao động mà trong đó công nhân tạo ra giá trị thặng dư cho nhà tư bản."
  },
  {
    q: "Bản chất của giá trị thặng dư là gì?",
    options: ["Lợi nhuận từ thương mại", "Phần giá trị mới do công nhân tạo ra và bị nhà tư bản chiếm đoạt", "Tiền tiết kiệm của nhà tư bản", "Sự hao mòn của máy móc"],
    correct: 1,
    desc: "Nó phản ánh mối quan hệ bóc lột giữa giai cấp tư sản và giai cấp công nhân làm thuê."
  },
  {
    q: "Tỷ suất giá trị thặng dư (m') được tính bằng công thức nào?",
    options: ["(v/m) * 100%", "(m/v) * 100%", "(c/v) * 100%", "(m/c) * 100%"],
    correct: 1,
    desc: "m' = (m/v) * 100%, trong đó m là giá trị thặng dư và v là tư bản khả biến (giá trị sức lao động)."
  },
  {
    q: "Phương pháp sản xuất giá trị thặng dư tuyệt đối được thực hiện bằng cách nào?",
    options: ["Tăng năng suất lao động", "Giảm tiền lương của công nhân", "Kéo dài ngày lao động", "Sử dụng máy móc hiện đại"],
    correct: 2,
    desc: "Nhà tư bản kéo dài ngày lao động trong khi thời gian lao động tất yếu không đổi."
  },
  {
    q: "Phương pháp sản xuất giá trị thặng dư tương đối dựa trên cơ sở nào?",
    options: ["Kéo dài ngày lao động", "Tăng cường độ lao động", "Rút ngắn thời gian lao động tất yếu", "Giảm giá trị máy móc"],
    correct: 2,
    desc: "Bằng cách tăng năng suất lao động xã hội, làm giảm giá trị sức lao động, từ đó rút ngắn thời gian lao động tất yếu."
  },
  {
    q: "Giá trị thặng dư siêu ngạch là gì?",
    options: ["Giá trị thặng dư thu được từ việc tăng lương", "Giá trị thặng dư có ở mọi doanh nghiệp", "Phần giá trị thặng dư thu được do có giá trị cá biệt thấp hơn giá trị xã hội", "Giá trị thặng dư từ việc bán hàng giả"],
    correct: 2,
    desc: "Đây là lợi nhuận vượt trội mà một doanh nghiệp có được nhờ áp dụng kỹ thuật mới trước các doanh nghiệp khác."
  },
  {
    q: "Trong ví dụ về người công nhân làm 8 giờ, thời gian lao động tất yếu là 4 giờ. Tỷ suất giá trị thặng dư là bao nhiêu?",
    options: ["50%", "200%", "100%", "25%"],
    correct: 2,
    desc: "Thời gian lao động thặng dư là 4 giờ. m' = (4/4) * 100% = 100%."
  },
  {
    q: "Nếu một nhà tư bản thuê 100 công nhân với m' = 100% và giá trị sức lao động mỗi người là 15 USD, khối lượng giá trị thặng dư (M) là bao nhiêu?",
    options: ["150 USD", "15000 USD", "750 USD", "1500 USD"],
    correct: 3,
    desc: "M = m' * (v * số công nhân) = 100% * (15 USD * 100) = 1500 USD."
  },
  {
    q: "Việc áp dụng máy móc hiện đại để giảm giá trị nhu yếu phẩm, từ đó giảm giá trị sức lao động, là ví dụ của phương pháp nào?",
    options: ["Sản xuất giá trị thặng dư tuyệt đối", "Sản xuất giá trị thặng dư siêu ngạch", "Sản xuất giá trị thặng dư tương đối", "Tăng cường độ lao động"],
    correct: 2,
    desc: "Đây là cách rút ngắn thời gian lao động tất yếu để tăng thời gian lao động thặng dư."
  },
  {
    q: "Khi một công ty dệt may lắp robot tự động, giảm thời gian sản xuất áo từ 2 giờ xuống 1 giờ, họ thu được loại giá trị thặng dư nào khi bán theo giá thị trường?",
    options: ["Giá trị thặng dư tuyệt đối", "Giá trị thặng dư tương đối", "Giá trị thặng dư siêu ngạch", "Lợi nhuận bình quân"],
    correct: 2,
    desc: "Đây là hình thái biến tướng của giá trị thặng dư tương đối, phát sinh từ chênh lệch giữa giá trị cá biệt và giá trị xã hội."
  },
  {
    q: "Ai là tác giả của học thuyết giá trị thặng dư?",
    options: ["Friedrich Engels", "Vladimir Lenin", "Adam Smith", "Karl Marx"],
    correct: 3,
    desc: "Karl Marx (C. Mác) là người đã phát triển và hoàn thiện học thuyết về giá trị thặng dư."
  },
  {
    q: "Theo C. Mác, tư bản (capital) được ví như cái gì?",
    options: ["Một dòng sông", "Một con ma cà rồng", "Một cái cây", "Một cỗ máy"],
    correct: 1,
    desc: "'Tư bản là lao động chết, giống như ma cà rồng, chỉ sống bằng cách hút lao động sống.'"
  },
  {
    q: "Mối liên hệ giữa 'Cái riêng' và 'Cái chung' là gì?",
    options: ["Cái riêng nằm ngoài cái chung", "Cái chung nằm ngoài cái riêng", "Cái chung chỉ tồn tại trong cái riêng", "Cái riêng và cái chung không liên quan"],
    correct: 2,
    desc: "Cái chung không tồn tại biệt lập, nó chỉ tồn tại trong cái riêng, thông qua cái riêng."
  },
  {
    q: "Phạm trù 'Hình thức' trong triết học dùng để chỉ:",
    options: ["Vẻ bề ngoài của sự vật", "Cách thức liên kết các yếu tố của nội dung", "Chỉ là màu sắc sự vật", "Vật chất cấu tạo nên sự vật"],
    correct: 1,
    desc: "Hình thức là hệ thống các mối liên hệ tương đối ổn định giữa các yếu tố của nội dung."
  },
  {
    q: "Hiện tượng là gì?",
    options: ["Mặt bên trong của sự vật", "Mặt biểu hiện ra bên ngoài của bản chất", "Cái không thay đổi của sự vật", "Quy luật vận động của sự vật"],
    correct: 1,
    desc: "Hiện tượng là sự biểu hiện của những mặt, những khía cạnh của bản chất ra bên ngoài."
  },
  {
    q: "Cái 'Đơn nhất' có thể biến thành cái 'Chung' không?",
    options: ["Không bao giờ", "Có, trong quá trình phát triển của sự vật", "Chỉ trong tư duy", "Chỉ khi sự vật mất đi"],
    correct: 1,
    desc: "Trong quá trình vận động, cái mới (đơn nhất) có thể phát triển thành cái chung, và ngược lại."
  },
  {
    q: "Nguyên tắc 'Lịch sử - cụ thể' đòi hỏi điều gì?",
    options: ["Chỉ nhìn vào quá khứ", "Xem xét sự vật trong không gian, thời gian xác định", "Bỏ qua các chi tiết nhỏ", "Chỉ quan tâm đến tương lai"],
    correct: 1,
    desc: "Mọi sự vật đều tồn tại trong những điều kiện không gian và thời gian cụ thể."
  },
  {
    q: "Trong các loại khả năng, 'Khả năng thực tế' là gì?",
    options: ["Do may mắn", "Do các mối liên hệ tất nhiên bên trong quy định", "Do ý muốn con người", "Do tác động ngẫu nhiên bên ngoài"],
    correct: 1,
    desc: "Khả năng thực tế được hình thành do các quy luật vận động nội tại của sự vật."
  },
  {
    q: "Mối quan hệ giữa 'Nội dung' và 'Hình thức' là mối quan hệ:",
    options: ["Tách rời nhau", "Nội dung quyết định hình thức", "Hình thức quyết định nội dung", "Không có ảnh hưởng lẫn nhau"],
    correct: 1,
    desc: "Nội dung giữ vai trò quyết định, hình thức phụ thuộc vào nội dung và có tính độc lập tương đối."
  },
  {
    q: "Phạm trù 'Tất nhiên' và 'Ngẫu nhiên' khác nhau ở điểm nào?",
    options: ["Tất nhiên là cái có thể xảy ra, ngẫu nhiên là cái phải xảy ra", "Tất nhiên do nguyên nhân bên trong, ngẫu nhiên do nguyên nhân bên ngoài", "Cả hai đều do nguyên nhân bên ngoài", "Cả hai đều là ảo giác"],
    correct: 1,
    desc: "Tất nhiên xuất phát từ bản chất nội tại, ngẫu nhiên xuất phát từ sự giao thoa các điều kiện bên ngoài."
  },
  {
    q: "Vì sao phải dựa vào 'Tất nhiên' trong hoạt động thực tiễn?",
    options: ["Vì nó dễ thấy hơn", "Vì nó là cái vạch đường đi cho sự phát triển", "Vì nó không thay đổi", "Vì nó luôn mang lại may mắn"],
    correct: 1,
    desc: "Tất nhiên là cái định hướng sự phát triển, nên cần dựa vào nó để lập kế hoạch."
  },
  {
    q: "Sự tương tác giữa các loài trong hệ sinh thái phản ánh điều gì?",
    options: ["Cuộc đấu tranh sinh tồn tách biệt", "Mạng lưới liên hệ phổ biến", "Sự đứng yên của tự nhiên", "Tính đơn nhất của sự vật"],
    correct: 1,
    desc: "Mọi loài đều là mắt xích trong chuỗi liên hệ phức tạp của hệ sinh thái."
  },
  {
    q: "Engels viết tác phẩm nào để trình bày các quy luật của tự nhiên?",
    options: ["Tư bản", "Biện chứng của tự nhiên", "Chống Dühring", "Nguồn gốc của gia đình"],
    correct: 1,
    desc: "Tác phẩm 'Biện chứng của tự nhiên' là nơi Engels hệ thống hóa các quy luật vận động của thế giới tự nhiên."
  },
  {
    q: "Tại sao tư duy siêu hình lại sai lầm khi nhìn về tự nhiên?",
    options: ["Vì nó nhìn thấy sự liên hệ", "Vì nó nhìn sự vật trong trạng thái cô lập, tĩnh tại", "Vì nó quá phức tạp", "Vì nó phủ nhận sự tồn tại của vật chất"],
    correct: 1,
    desc: "Tư duy siêu hình chỉ thấy những sự vật riêng biệt mà không thấy mối liên hệ giữa chúng."
  },
  {
    q: "Mối liên hệ giữa trái đất và mặt trời là minh chứng cho loại liên hệ nào?",
    options: ["Liên hệ bên trong", "Liên hệ bên ngoài nhưng tất yếu", "Liên hệ ngẫu nhiên", "Liên hệ không bản chất"],
    correct: 1,
    desc: "Các hành tinh liên kết với nhau bằng lực hấp dẫn - một liên hệ tất yếu của vũ trụ."
  },
  {
    q: "Câu nói của Engels nhấn mạnh vai trò của phương pháp luận nào?",
    options: ["Phương pháp phân tích rời rạc", "Phương pháp biện chứng", "Phương pháp thực nghiệm thuần túy", "Phương pháp diễn dịch"],
    correct: 1,
    desc: "Phép biện chứng cho phép nhìn nhận thế giới như một chỉnh thể vận động và liên kết."
  },
  {
    q: "Biến đổi khí hậu toàn cầu minh chứng cho điều gì trong học thuyết Engels?",
    options: ["Sự độc lập của các quốc gia", "Tính phổ biến của các mối liên hệ", "Sự ngẫu nhiên của thời tiết", "Sự bất biến của môi trường"],
    correct: 1,
    desc: "Một tác động tại một nơi có thể gây ra hệ quả trên toàn cầu do tính liên kết phổ biến."
  },
  {
    q: "Phép biện chứng duy vật là gì?",
    options: ["Khoa học về các mối liên hệ phổ biến và sự phát triển", "Khoa học về sự đứng yên", "Cách nhìn thế giới cô lập", "Sự kết hợp các ý kiến chủ quan"],
    correct: 0,
    desc: "Phép biện chứng duy vật nghiên cứu những quy luật chung nhất của tự nhiên, xã hội và tư duy."
  },
  {
    q: "Thế nào là 'Cái đơn nhất'?",
    options: ["Cái lặp lại ở nhiều sự vật", "Cái chỉ có ở một sự vật hiện tượng", "Cái không bao giờ thay đổi", "Cái bao quát toàn bộ thế giới"],
    correct: 1,
    desc: "Cái đơn nhất là những đặc điểm riêng biệt, chỉ có ở một thực thể duy nhất."
  },
  {
    q: "Tại sao nói 'Cái chung sâu sắc hơn cái riêng'?",
    options: ["Vì nó to lớn hơn", "Vì nó phản ánh những mối liên hệ bản chất, tất nhiên", "Vì nó dễ nhận biết hơn", "Vì nó tồn tại lâu hơn"],
    correct: 1,
    desc: "Cái chung phản ánh những thuộc tính mang tính quy luật, bản chất của sự vật."
  },
  {
    q: "Điều kiện để 'Khả năng' trở thành 'Hiện thực' là gì?",
    options: ["Thời gian tự trôi qua", "Sự hội tụ các điều kiện khách quan và nhân tố chủ quan", "Chỉ cần suy nghĩ tích cực", "Sự biến mất của các quy luật"],
    correct: 1,
    desc: "Hiện thực chỉ xuất hiện khi các điều kiện cần và đủ cho khả năng đó được đáp ứng."
  },
  {
    q: "Engels cho rằng con người cần làm gì đối với các mối liên hệ trong tự nhiên?",
    options: ["Chinh phục bất chấp quy luật", "Nhận thức và vận dụng đúng các quy luật", "Bỏ qua vì nó quá rộng lớn", "Thay đổi quy luật theo ý muốn"],
    correct: 1,
    desc: "Con người chỉ có thể tự do khi nhận thức và hành động theo đúng quy luật khách quan."
  },
  {
    q: "Phạm trù 'Kết quả' dùng để chỉ điều gì?",
    options: ["Sự biến đổi xuất hiện do sự tác động lẫn nhau giữa các mặt, các yếu tố", "Cái có trước nguyên nhân", "Cái luôn luôn đứng yên", "Sự tác động từ bên ngoài vào sự vật"],
    correct: 0,
    desc: "Kết quả là những biến đổi xuất hiện do sự tác động giữa các nguyên nhân."
  },
  {
    q: "Mối liên hệ giữa bản chất và hiện tượng là gì?",
    options: ["Bản chất và hiện tượng luôn đồng nhất", "Bản chất biểu hiện thông qua hiện tượng", "Bản chất và hiện tượng không liên quan", "Hiện tượng quyết định bản chất"],
    correct: 1,
    desc: "Bản chất luôn bộc lộ thông qua hiện tượng, còn hiện tượng là sự biểu hiện của bản chất."
  },
  {
    q: "Trong đời sống xã hội, 'Nhân tố chủ quan' có vai trò gì trong việc biến khả năng thành hiện thực?",
    options: ["Không có vai trò gì", "Có vai trò quyết định hoàn toàn", "Là điều kiện quan trọng để thúc đẩy khả năng thành hiện thực", "Làm khả năng biến mất"],
    correct: 2,
    desc: "Trong xã hội, sự hoạt động có ý thức của con người là mắt xích quan trọng để chuyển khả năng thành hiện thực."
  },
  {
    q: "Vì sao nói 'Ngẫu nhiên là hình thức biểu hiện của tất nhiên'?",
    options: ["Vì ngẫu nhiên che lấp tất nhiên", "Vì tất nhiên vạch đường đi thông qua vô số cái ngẫu nhiên", "Vì ngẫu nhiên và tất nhiên là một", "Vì ngẫu nhiên quan trọng hơn"],
    correct: 1,
    desc: "Phía sau những cái có vẻ ngẫu nhiên là những quy luật tất yếu đang vận động."
  },
  {
    q: "Sự phân biệt giữa 'Khả năng' và 'Hiện thực' có tính chất gì?",
    options: ["Tuyệt đối, không thể thay đổi", "Tương đối, chúng có thể chuyển hóa cho nhau", "Chỉ là ảo giác của con người", "Chỉ tồn tại trong toán học"],
    correct: 1,
    desc: "Khả năng và hiện thực luôn chuyển hóa lẫn nhau trong quá trình phát triển."
  },
  {
    q: "Khi một 'Hình thức' không còn phù hợp với 'Nội dung' thì điều gì sẽ xảy ra?",
    options: ["Nội dung sẽ dừng lại", "Hình thức sẽ kìm hãm sự phát triển của nội dung", "Nội dung sẽ biến mất", "Hình thức sẽ trở nên vĩnh cửu"],
    correct: 1,
    desc: "Hình thức phù hợp sẽ thúc đẩy, còn không phù hợp sẽ kìm hãm sự phát triển của nội dung."
  },
  {
    q: "Đặc điểm của 'Cái riêng' là gì?",
    options: ["Nó vô cùng phong phú, đa dạng hơn cái chung", "Nó đơn giản hơn cái chung", "Nó không bao giờ thay đổi", "Nó nằm ngoài mọi mối liên hệ"],
    correct: 0,
    desc: "Cái riêng bao hàm cái chung nhưng còn có những đặc điểm đơn nhất nên phong phú hơn."
  },
  {
    q: "Tại sao không được phủ nhận cái 'Ngẫu nhiên' trong cuộc sống?",
    options: ["Vì ngẫu nhiên là tất cả", "Vì ngẫu nhiên có thể gây ra những bước ngoặt bất ngờ", "Vì ngẫu nhiên không có nguyên nhân", "Vì ngẫu nhiên dễ kiểm soát"],
    correct: 1,
    desc: "Dù tất nhiên là chính, nhưng ngẫu nhiên cũng ảnh hưởng đến tiến trình phát triển của sự vật."
  },
  {
    q: "Mối liên hệ nhân quả mang tính 'Phổ biến' nghĩa là gì?",
    options: ["Chỉ xảy ra ở một số nơi", "Mọi sự vật hiện tượng đều có nguyên nhân của nó", "Chỉ xảy ra trong tư duy", "Chỉ xảy ra trong phòng thí nghiệm"],
    correct: 1,
    desc: "Không có sự vật nào xuất hiện mà không có nguyên nhân, dù ta có biết hay chưa."
  },
  {
    q: "Phạm trù 'Nội dung' dùng để chỉ:",
    options: ["Vẻ ngoài của sự vật", "Tổng hợp tất cả các mặt, yếu tố tạo nên sự vật", "Mối liên hệ giữa các sự vật", "Sự vận động của sự vật"],
    correct: 1,
    desc: "Nội dung là phạm trù chỉ tổng thể các yếu tố, quá trình tạo nên sự vật."
  },
  {
    q: "Bản chất là cái 'Ổn định', điều này có nghĩa là gì?",
    options: ["Bản chất không bao giờ thay đổi", "Bản chất biến đổi chậm hơn so với hiện tượng", "Bản chất luôn đứng yên", "Bản chất là vĩnh cửu"],
    correct: 1,
    desc: "Bản chất có tính ổn định tương đối, nó không biến đổi nhanh chóng như các hiện tượng bề ngoài."
  },
  {
    q: "Thế nào là 'Khả năng tất yếu'?",
    options: ["Xảy ra do may mắn", "Xảy ra do bản chất nội tại của sự vật quy định", "Xảy ra do ý muốn chủ quan", "Không bao giờ xảy ra"],
    correct: 1,
    desc: "Khả năng tất yếu là khả năng chắc chắn sẽ xảy ra khi có đủ điều kiện."
  },
  {
    q: "Sự khác biệt giữa 'Nguyên nhân' và 'Điều kiện' là gì?",
    options: ["Không có sự khác biệt", "Nguyên nhân trực tiếp sinh ra kết quả, điều kiện chỉ hỗ trợ", "Điều kiện sinh ra kết quả", "Nguyên nhân chỉ là phụ"],
    correct: 1,
    desc: "Nguyên nhân là cái sinh ra kết quả, còn điều kiện là những yếu tố cần thiết để nguyên nhân phát huy tác dụng."
  },
  {
    q: "Quan điểm 'Chiết trung' sai lầm ở chỗ nào khi xem xét các mối liên hệ?",
    options: ["Nó quá chú trọng vào bản chất", "Nó kết hợp các mặt một cách vô nguyên tắc, tùy tiện", "Nó chỉ nhìn vào một mặt", "Nó quá máy móc"],
    correct: 1,
    desc: "Ngụy biện và chiết trung đều sai lầm vì không xác định được mối liên hệ bản chất, chủ yếu."
  },
  {
    q: "Để hiểu đúng 'Bản chất', chúng ta phải làm gì?",
    options: ["Chỉ cần quan sát một hiện tượng", "Phân tích nhiều hiện tượng khác nhau để tìm ra cái chung, lặp lại", "Dựa vào trực giác", "Bỏ qua các hiện tượng"],
    correct: 1,
    desc: "Bản chất không lộ diện trực tiếp, ta phải thông qua quá trình tư duy và tổng hợp nhiều hiện tượng."
  }
];

const Card = ({ card, hidden }) => (
  <motion.div
    initial={{ scale: 0, rotateY: 180 }}
    animate={{ scale: 1, rotateY: hidden ? 180 : 0 }}
    className={`w-24 h-36 bg-white rounded-xl border-2 border-zinc-200 shadow-lg flex flex-col items-center justify-center relative overflow-hidden ${hidden ? 'bg-soviet-red shadow-[0_0_20px_rgba(220,38,38,0.3)]' : ''}`}
  >
    {hidden ? (
      <div className="w-full h-full flex items-center justify-center bg-soviet-red">
        <div className="w-12 h-20 border-2 border-white/20 rounded-lg flex items-center justify-center text-white/20 font-black text-2xl italic">?</div>
      </div>
    ) : (
      <>
        <div className={`absolute top-2 left-2 font-black text-lg ${card.suit.color}`}>{card.value}</div>
        <div className={`${card.suit.color} scale-125`}>{card.suit.icon}</div>
        <div className={`absolute bottom-2 right-2 font-black text-lg rotate-180 ${card.suit.color}`}>{card.value}</div>
      </>
    )}
  </motion.div>
);

const CardGame = () => {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameState, setGameState] = useState('betting'); 
  const [message, setMessage] = useState('Chào mừng đến với Xì Dách Biện Chứng!');
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizFeedback, setQuizFeedback] = useState(null);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [showResultOverlay, setShowResultOverlay] = useState(false);

  const isXiBan = (hand) => hand.length === 2 && hand.every(c => c.value === 'A');
  const isXiDach = (hand) => hand.length === 2 && hand.some(c => c.value === 'A') && hand.some(c => ['10', 'J', 'Q', 'K'].includes(c.value));

  const calculateScore = (hand) => {
    if (!hand || hand.length === 0) return 0;
    let score = 0;
    let aces = 0;
    for (let card of hand) {
      if (card.value === 'A') {
        aces += 1;
        score += 11;
      } else if (['J', 'Q', 'K'].includes(card.value)) {
        score += 10;
      } else {
        score += parseInt(card.value);
      }
    }
    while (score > 21 && aces > 0) {
      score -= 10;
      aces -= 1;
    }
    return score;
  };

  const createDeck = () => {
    const newDeck = [];
    for (let suit of SUITS) {
      for (let value of VALUES) {
        newDeck.push({ suit, value });
      }
    }
    return newDeck.sort(() => Math.random() - 0.5);
  };

  const startGame = () => {
    const newDeck = createDeck();
    const pHand = [newDeck.pop(), newDeck.pop()];
    const dHand = [newDeck.pop(), newDeck.pop()];
    
    setDeck(newDeck);
    setPlayerHand(pHand);
    setDealerHand(dHand);
    setPlayerScore(calculateScore(pHand));
    setDealerScore(calculateScore(dHand));
    setWrongAnswers(0);
    setShowResultOverlay(false);

    // Check Special Hands Immediately
    const playerXB = isXiBan(pHand);
    const playerXD = isXiDach(pHand);
    const dealerXB = isXiBan(dHand);
    const dealerXD = isXiDach(dHand);

    if (playerXB || playerXD || dealerXB || dealerXD) {
      setGameState('finished');
      setShowResultOverlay(true);
      if (playerXB && !dealerXB) setMessage("XÌ BÀN! Bạn thắng tuyệt đối!");
      else if (dealerXB && !playerXB) setMessage("NHÀ CÁI XÌ BÀN! Bạn đã thua.");
      else if (playerXD && !dealerXD && !dealerXB) setMessage("XÌ DÁCH! Bạn thắng ngay lập tức!");
      else if (dealerXD && !playerXD && !playerXB) setMessage("NHÀ CÁI XÌ DÁCH! Bạn đã thua.");
      else setMessage("Cả hai cùng có bộ bài đặc biệt! Hòa bài (Push)!");
    } else {
      setGameState('playing');
      setMessage('Muốn rút bài? Hãy trả lời đúng câu hỏi biện chứng!');
    }
    setQuizFeedback(null);
  };

  const requestHit = () => {
    if (gameState !== 'playing') return;
    const randomQuiz = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
    setCurrentQuiz(randomQuiz);
    setQuizFeedback(null);
    setShowQuiz(true);
  };

  const handleQuizAnswer = (index) => {
    if (index === currentQuiz.correct) {
      setQuizFeedback('correct');
      // Không tự động đóng, để người chơi đọc giải thích
    } else {
      setQuizFeedback('incorrect');
      setWrongAnswers(prev => prev + 1);
    }
  };

  const closeQuiz = () => {
    if (quizFeedback === 'correct') {
      executeHit();
    } else if (quizFeedback === 'incorrect') {
      if (wrongAnswers >= 3) {
        setGameState('finished');
        setShowResultOverlay(true);
        setMessage("BẠN ĐÃ THUA! Sai 3 câu hỏi, bạn không đủ trình độ để tiếp tục cuộc chơi!");
      } else {
        setMessage(`Sai rồi! Bạn không được rút bài lượt này. (Sai ${wrongAnswers}/3 câu)`);
      }
    }
    setShowQuiz(false);
    setQuizFeedback(null);
  };

  const executeHit = () => {
    const newDeck = [...deck];
    if (newDeck.length === 0) return;
    const newCard = newDeck.pop();
    const newHand = [...playerHand, newCard];
    setDeck(newDeck);
    setPlayerHand(newHand);
    const score = calculateScore(newHand);
    setPlayerScore(score);

    if (score > 21) {
      setGameState('finished');
      setShowResultOverlay(true);
      setMessage('Quá 21 điểm! Bạn đã thua.');
    } else {
      setMessage("Trả lời đúng! Bạn đã nhận được một lá bài.");
    }
  };

  const stand = () => {
    if (gameState !== 'playing') return;
    setGameState('dealerTurn');
    setMessage('Lượt của Nhà cái...');
  };

  useEffect(() => {
    if (gameState === 'dealerTurn') {
      const timer = setTimeout(() => {
        const dScore = calculateScore(dealerHand);
        const pScore = calculateScore(playerHand);
        
        // Logic Nhà cái thông minh & may mắn hơn:
        // 1. Rút nếu dưới 17 (bắt buộc)
        // 2. Rút nếu vẫn thua điểm người chơi và người chơi chưa quắc (đến ngưỡng 19 điểm)
        const shouldHit = dScore < 17 || (dScore < pScore && pScore <= 21 && dScore < 19);

        if (shouldHit) {
          let newDeck = [...deck];
          if (newDeck.length === 0) return;
          
          let nextCard = newDeck[newDeck.length - 1];
          
          // "Vận may biện chứng": Nếu rút quân tiếp theo bị quắc, có 40% cơ hội tráo con khác an toàn hơn
          if (calculateScore([...dealerHand, nextCard]) > 21 && Math.random() < 0.4) {
            const safeCardIdx = newDeck.findIndex(c => calculateScore([...dealerHand, c]) <= 21);
            if (safeCardIdx !== -1) {
              // Tráo quân bài an toàn lên đầu để rút
              const safeCard = newDeck.splice(safeCardIdx, 1)[0];
              newDeck.push(safeCard);
              nextCard = safeCard;
            }
          }

          const newCard = newDeck.pop();
          const nextDealerHand = [...dealerHand, newCard];
          setDeck(newDeck);
          setDealerHand(nextDealerHand);
          setDealerScore(calculateScore(nextDealerHand));
        } else {
          setGameState('finished');
          setShowResultOverlay(true);
          if (dScore > 21) setMessage('NHÀ CÁI QUẮC! Bạn đã thắng!');
          else if (pScore > dScore) setMessage('CHÚC MỪNG! Bạn thắng với điểm số cao hơn!');
          else if (pScore < dScore) setMessage('NHÀ CÁI THẮNG! Bạn đã thua rồi.');
          else setMessage('Hòa bài (Push)!');
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [gameState, dealerHand, deck, playerHand]);

  return (
    <section className="min-h-screen bg-zinc-900 pt-32 pb-20 px-6 flex flex-col items-center overflow-x-hidden relative">
      <AnimatePresence>
        {showResultOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowResultOverlay(false)}
          >
            <motion.div
              initial={{ scale: 0.5, y: 100, rotate: -10 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.5, y: 100, opacity: 0 }}
              className={`relative max-w-sm w-full p-8 rounded-[3rem] border-4 shadow-[0_0_50px_rgba(0,0,0,0.5)] text-center ${
                message.includes('Bạn thắng') || message.includes('XÌ BÀN') || message.includes('XÌ DÁCH') || message.includes('Bạn đã thắng')
                  ? 'bg-soviet-gold border-white text-zinc-900' 
                  : message.includes('Hòa')
                  ? 'bg-zinc-600 border-zinc-400 text-white'
                  : 'bg-soviet-red border-white text-white'
              }`}
            >
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-inherit border-4 border-white rounded-full flex items-center justify-center shadow-xl">
                {message.includes('Bạn thắng') || message.includes('XÌ BÀN') || message.includes('XÌ DÁCH') || message.includes('Bạn đã thắng') ? (
                  <Trophy className="w-12 h-12" />
                ) : message.includes('Hòa') ? (
                  <RefreshCcw className="w-12 h-12" />
                ) : (
                  <XCircle className="w-12 h-12" />
                )}
              </div>
              
              <h3 className="mt-8 text-3xl font-black uppercase italic tracking-tighter leading-tight mb-4">
                {message.includes('Bạn thắng') || message.includes('XÌ BÀN') || message.includes('XÌ DÁCH') || message.includes('Bạn đã thắng')
                  ? 'CHIẾN THẮNG!' 
                  : message.includes('Hòa')
                  ? 'KẾT QUẢ HÒA'
                  : 'THẤT BẠI!'}
              </h3>
              
              <p className="font-bold text-lg leading-tight mb-8 opacity-90">
                {message}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  startGame();
                }}
                className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg transition-all hover:scale-105 active:scale-95 ${
                  message.includes('Bạn thắng') || message.includes('XÌ BÀN') || message.includes('XÌ DÁCH') || message.includes('Bạn đã thắng')
                    ? 'bg-zinc-900 text-white'
                    : 'bg-white text-zinc-900'
                }`}
              >
                Chơi ván mới
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl w-full">
        <div className="mb-8 flex justify-start">
          <Link to="/" className="text-zinc-500 hover:text-white flex items-center gap-2 font-bold uppercase text-xs transition-colors">
            <ArrowLeft className="w-4 h-4" /> Quay về trang chủ
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-black text-soviet-red mb-4 uppercase tracking-tighter italic">
            Xì Dách <span className="text-white">Biện Chứng</span>
          </h2>
          <div className="h-1.5 w-20 bg-soviet-gold mx-auto mb-6 rounded-full" />
          <p className="text-zinc-400 font-bold uppercase tracking-widest text-sm px-4">{message}</p>
        </motion.div>

        <div className="grid gap-12">
          {/* Dealer Area */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-white px-4">
              <span className="font-black uppercase tracking-widest text-xs opacity-50 flex items-center gap-2">
                <Cpu className="w-4 h-4" /> Nhà cái
              </span>
              <span className="font-mono font-bold text-soviet-gold text-xl">
                {gameState === 'finished' ? dealerScore : (dealerHand.length > 0 ? '??' : '0')}
              </span>
            </div>
            <div className="flex justify-center gap-4 flex-wrap min-h-[160px] p-8 bg-black/40 rounded-[2rem] border-2 border-dashed border-white/5">
              {dealerHand.map((card, i) => (
                <Card key={`dealer-${i}`} card={card} hidden={i === 1 && gameState === 'playing'} />
              ))}
            </div>
          </div>

          {/* Player Area */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-white px-4">
              <div className="flex flex-col">
                <span className="font-black uppercase tracking-widest text-xs opacity-50 flex items-center gap-2">
                  <Hand className="w-4 h-4" /> Bạn
                </span>
                {wrongAnswers > 0 && (
                  <span className="text-[10px] text-red-500 font-bold uppercase tracking-tighter mt-1">
                    Lỗi: {wrongAnswers}/3
                  </span>
                )}
              </div>
              <span className="font-mono font-bold text-soviet-red text-xl">{playerScore}</span>
            </div>
            <div className="flex justify-center gap-4 flex-wrap min-h-[160px] p-8 bg-black/40 rounded-[2rem] border-2 border-soviet-red/10 shadow-[0_0_50px_rgba(220,38,38,0.05)]">
              {playerHand.map((card, i) => (
                <Card key={`player-${i}`} card={card} />
              ))}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-16 flex flex-wrap justify-center gap-6">
          {gameState === 'betting' && (
            <button
              onClick={startGame}
              className="px-12 py-5 bg-soviet-red text-white font-black uppercase tracking-[0.2em] rounded-full shadow-2xl hover:bg-red-700 transition-all hover:scale-105 active:scale-95"
            >
              Bắt đầu ván bài
            </button>
          )}

          {gameState === 'playing' && (
            <>
              <button
                onClick={requestHit}
                className="px-10 py-4 bg-white text-zinc-900 font-black uppercase tracking-widest rounded-full hover:bg-zinc-100 transition-all shadow-xl flex items-center gap-3"
              >
                <HelpCircle className="w-5 h-5 text-soviet-red" /> Rút bài (Trả lời Quiz)
              </button>
              <button
                onClick={stand}
                className="px-10 py-4 bg-soviet-red text-white font-black uppercase tracking-widest rounded-full hover:bg-red-700 transition-all shadow-xl flex items-center gap-3"
              >
                <Hand className="w-5 h-5" /> Dừng
              </button>
            </>
          )}

          {gameState === 'finished' && (
            <div className="flex flex-col items-center gap-8 w-full">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`text-xl md:text-3xl font-black uppercase tracking-tighter p-6 rounded-3xl border-2 text-center ${
                  message.includes('Bạn thắng') || message.includes('XÌ BÀN') || message.includes('XÌ DÁCH') || message.includes('Bạn đã thắng') 
                    ? 'bg-soviet-gold/10 text-soviet-gold border-soviet-gold/20' 
                    : message.includes('Hòa') 
                    ? 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20' 
                    : 'bg-red-500/10 text-red-500 border-red-500/20'
                }`}
              >
                {message.includes('Bạn thắng') || message.includes('XÌ BÀN') || message.includes('XÌ DÁCH') || message.includes('Bạn đã thắng') 
                  ? <Trophy className="inline w-8 h-8 mr-3 mb-1" /> 
                  : <TriangleAlert className="inline w-8 h-8 mr-3 mb-1" />}
                {message}
              </motion.div>
              <button
                onClick={startGame}
                className="px-12 py-5 bg-white text-zinc-900 font-black uppercase tracking-[0.2em] rounded-full shadow-2xl hover:bg-zinc-100 transition-all hover:scale-105 active:scale-95"
              >
                Chơi ván mới
              </button>
            </div>
          )}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
          className="mt-16 rounded-[2rem] overflow-hidden border border-soviet-red/30 bg-zinc-900/70 shadow-[0_25px_45px_rgba(0,0,0,0.35)]"
        >
          <div className="px-6 md:px-8 py-6 border-b border-soviet-red/20 bg-zinc-900/90">
            <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 font-black mb-2">Video minh họa</p>
            <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">Hành Trình Bí Mật Của Laptop</h3>
          </div>
          <div className="p-4 md:p-6 bg-black/70">
            <video className="w-full rounded-xl" controls preload="metadata" src={LAPTOP_VIDEO_SRC} />
          </div>
        </motion.section>
      </div>

      {/* Quiz Modal */}
      <AnimatePresence>
        {showQuiz && currentQuiz && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={quizFeedback ? closeQuiz : null}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] p-10 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-soviet-red" />
              
              <div className="mb-8 flex items-center gap-4">
                <div className="w-12 h-12 bg-soviet-red/10 rounded-2xl flex items-center justify-center text-soviet-red">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-zinc-400 font-black uppercase text-xs tracking-widest italic">Engels & Tự nhiên</h3>
                  <p className="text-zinc-900 font-bold text-lg leading-tight">{currentQuiz.q}</p>
                </div>
              </div>

              <div className="grid gap-4">
                {currentQuiz.options.map((option, idx) => (
                  <button
                    key={idx}
                    disabled={quizFeedback !== null}
                    onClick={() => handleQuizAnswer(idx)}
                    className={`p-5 rounded-2xl border-2 text-left font-bold transition-all flex justify-between items-center group ${
                      quizFeedback === null 
                        ? 'border-zinc-100 hover:border-soviet-red hover:bg-soviet-red/5 text-zinc-700'
                        : idx === currentQuiz.correct
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : quizFeedback === 'incorrect' && idx !== currentQuiz.correct
                        ? 'border-zinc-100 text-zinc-300 opacity-50'
                        : 'border-zinc-100'
                    }`}
                  >
                    <span>{idx + 1}. {option}</span>
                    {quizFeedback !== null && idx === currentQuiz.correct && <CheckCircle2 className="text-green-500 w-6 h-6" />}
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {quizFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-8 p-6 rounded-2xl border-2 flex items-start gap-4 ${
                      quizFeedback === 'correct' 
                        ? 'bg-green-50 border-green-200 text-green-800' 
                        : 'bg-red-50 border-red-200 text-red-800'
                    }`}
                  >
                    {quizFeedback === 'correct' ? (
                      <CheckCircle2 className="w-6 h-6 shrink-0 mt-1" />
                    ) : (
                      <XCircle className="w-6 h-6 shrink-0 mt-1" />
                    )}
                    <div>
                      <p className="font-black uppercase text-xs tracking-widest mb-1">
                        {quizFeedback === 'correct' ? 'Chính xác!' : 'Chưa đúng rồi!'}
                      </p>
                      <p className="text-sm font-medium leading-relaxed">{currentQuiz.desc}</p>
                      
                      <button
                        onClick={closeQuiz}
                        className={`mt-4 px-6 py-2 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${
                          quizFeedback === 'correct' 
                            ? 'bg-green-600 text-white hover:bg-green-700' 
                            : 'bg-red-600 text-white hover:bg-red-700'
                        }`}
                      >
                        Tiếp tục ván bài
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CardGame;
