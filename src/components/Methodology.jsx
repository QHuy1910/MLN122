import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, Award } from 'lucide-react';

const methods = [
  {
    id: 'absolute',
    icon: Clock,
    title: "Sản xuất giá trị thặng dư tuyệt đối",
    summary: "Thu được bằng cách kéo dài ngày lao động vượt quá thời gian lao động tất yếu, trong khi các yếu tố khác không đổi.",
    details: "Đây là phương pháp sơ khai, dựa trên việc tăng thời gian bóc lột một cách trực tiếp. Bị giới hạn bởi thể chất và sự phản kháng của công nhân.",
    image: 'https://res.cloudinary.com/dbdnvpfw8/image/upload/v1776678933/Screenshot_2026-04-20_165514_oqedsn.png',
    points: [
      "Ngày làm việc 8 giờ = 4 giờ tất yếu + 4 giờ thặng dư (m' = 100%).",
      'Chủ xí nghiệp tăng ca, ép làm 10 giờ/ngày.',
      'Ngày làm việc mới = 4 giờ tất yếu + 6 giờ thặng dư.',
      "Tỷ suất mới m' = (6 / 4) * 100% = 150%."
    ]
  },
  {
    id: 'relative',
    icon: Zap,
    title: "Sản xuất giá trị thặng dư tương đối",
    summary: "Rút ngắn thời gian lao động tất yếu bằng cách tăng năng suất lao động xã hội.",
    details: "Phương pháp này tinh vi hơn, dựa vào tiến bộ khoa học kỹ thuật để giảm giá trị tư liệu sinh hoạt, từ đó giảm giá trị sức lao động.",
    image: 'https://res.cloudinary.com/dbdnvpfw8/image/upload/v1776678967/Screenshot_2026-04-20_165549_chii2j.png',
    imageExtra: 'https://res.cloudinary.com/dbdnvpfw8/image/upload/v1776679052/Screenshot_2026-04-20_165720_kg5kaz.png',
    points: [
      'Ngày làm việc vẫn là 8 giờ.',
      'Nhờ máy móc mới, giá thực phẩm, quần áo giảm. Giá trị sức lao động giảm, công nhân chỉ cần 2 giờ để tạo ra giá trị bằng tiền lương.',
      'Thời gian tất yếu giảm từ 4 giờ xuống 2 giờ.',
      "Thời gian thặng dư tăng từ 4 giờ lên 6 giờ (m' tăng từ 100% lên 300%)."
    ]
  },
  {
    id: 'super',
    icon: Award,
    title: "Giá trị thặng dư siêu ngạch",
    summary: "Phần lợi nhuận vượt trội khi năng suất cá biệt cao hơn năng suất xã hội.",
    details: "Đây là động lực chính cho cạnh tranh và cải tiến kỹ thuật. Nó là hình thái biến tướng của giá trị thặng dư tương đối và sẽ mất đi khi kỹ thuật mới được phổ biến.",
    points: [
      'Giá thị trường của 1 cái áo là 10 USD (trung bình ngành dệt mất 2 giờ).',
      'Công ty A áp dụng robot, chỉ mất 1 giờ để dệt 1 áo.',
      'Khi bán với giá thị trường 10 USD, công ty A thu được một khoản lợi nhuận dôi ra so với đối thủ.',
      'Phần lợi nhuận dôi ra đó chính là giá trị thặng dư siêu ngạch.'
    ]
  }
];

const TimeBar = ({ leftText, rightText, leftClassName, rightClassName }) => (
  <div className="grid grid-cols-2 rounded-xl overflow-hidden border border-zinc-200">
    <div className={`py-2 text-center font-bold ${leftClassName}`}>{leftText}</div>
    <div className={`py-2 text-center font-bold ${rightClassName}`}>{rightText}</div>
  </div>
);

const ExampleVisual = ({ type }) => {
  if (type === 'absolute') {
    return (
      <div className="space-y-3 mb-4">
        <TimeBar
          leftText="4h Tất yếu"
          rightText="4h Thặng dư"
          leftClassName="bg-slate-200 text-slate-600"
          rightClassName="bg-blue-100 text-blue-600"
        />
        <TimeBar
          leftText="4h Tất yếu"
          rightText="6h Thặng dư"
          leftClassName="bg-slate-200 text-slate-600"
          rightClassName="bg-amber-200 text-amber-800"
        />
      </div>
    );
  }

  if (type === 'relative') {
    return (
      <div className="space-y-3 mb-4">
        <TimeBar
          leftText="4h Tất yếu"
          rightText="4h Thặng dư"
          leftClassName="bg-slate-200 text-slate-600"
          rightClassName="bg-blue-100 text-blue-600"
        />
        <TimeBar
          leftText="2h Tất yếu"
          rightText="6h Thặng dư"
          leftClassName="bg-emerald-200 text-emerald-700"
          rightClassName="bg-blue-100 text-blue-600"
        />
      </div>
    );
  }

  return (
    <div className="space-y-3 mb-4">
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
        <p className="md:w-40 text-zinc-500">Giá trị xã hội (2h)</p>
        <div className="h-10 flex-1 rounded-xl bg-slate-200 px-3 flex items-center justify-end">
          <span className="text-zinc-600 font-bold">10$</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
        <p className="md:w-40 text-zinc-500">Giá trị cá biệt (1h)</p>
        <div className="relative h-10 flex-1">
          <div className="h-full w-1/2 rounded-xl border border-blue-300 bg-blue-100 px-3 flex items-center justify-end">
            <span className="text-blue-600 font-bold">5$</span>
          </div>
          <div className="absolute left-1/2 top-0 h-full border-l-2 border-dashed border-indigo-500" />
          <div className="absolute left-[calc(50%+8px)] top-1/2 -translate-y-1/2 text-indigo-500 text-[11px] md:text-xs font-black whitespace-nowrap">
            Lợi nhuận siêu ngạch
          </div>
        </div>
      </div>
    </div>
  );
};

const Methodology = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="methodology" className="py-24 px-6 bg-white border-y border-zinc-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-soviet-red mb-6">Phương Pháp Sản Xuất</h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto font-medium">
            C. Mác đã chỉ ra các phương pháp chính để nhà tư bản gia tăng giá trị thặng dư, phản ánh sự bóc lột ngày càng tinh vi.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Tabs */}
          <div className="w-full md:w-1/3 flex md:flex-col gap-4">
            {methods.map((method, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`w-full p-6 text-left rounded-xl transition-all duration-300 ${
                  activeTab === index 
                    ? 'bg-soviet-red text-white shadow-lg shadow-soviet-red/30' 
                    : 'bg-zinc-100 hover:bg-zinc-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${activeTab === index ? 'bg-white/20' : 'bg-white'}`}>
                    <method.icon className={`w-6 h-6 ${activeTab === index ? 'text-white' : 'text-soviet-red'}`} />
                  </div>
                  <h4 className="text-lg font-bold uppercase tracking-tight flex-1">{method.title}</h4>
                </div>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="w-full md:w-2/3">
            <div className="bg-soviet-offwhite p-8 rounded-2xl border-2 border-soviet-red/20 min-h-[300px]">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold text-zinc-900 mb-4">{methods[activeTab].title}</h3>
                <p className="text-zinc-700 leading-relaxed mb-6">
                  {methods[activeTab].summary}
                </p>
                <p className="text-zinc-600 leading-relaxed mb-6">
                  {methods[activeTab].details}
                </p>
                <div className="bg-white p-6 rounded-lg border-l-4 border-soviet-gold">
                  <h5 className="font-bold text-soviet-red mb-2">Ví dụ:</h5>
                  {methods[activeTab].image && (
                    <img
                      src={methods[activeTab].image}
                      alt={methods[activeTab].title}
                      className="w-full h-auto rounded-xl border border-zinc-200 mb-4"
                    />
                  )}
                  {methods[activeTab].imageExtra && (
                    <img
                      src={methods[activeTab].imageExtra}
                      alt={`${methods[activeTab].title} bổ sung`}
                      className="w-full h-auto rounded-xl border border-zinc-200 mb-4"
                    />
                  )}
                  <ExampleVisual type={methods[activeTab].id} />
                  <ul className="list-disc pl-5 space-y-2 text-zinc-600 leading-relaxed">
                    {methods[activeTab].points.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Methodology;
