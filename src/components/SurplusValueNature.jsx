import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Info, X } from 'lucide-react';

const sections = [
  {
    title: 'Bản chất của giá trị thặng dư',
    subtitle: 'Quan hệ bóc lột lao động làm thuê',
    summary:
      'Theo C. Mác, bản chất của giá trị thặng dư chính là sự bóc lột lao động làm thuê của nhà tư bản đối với công nhân.',
    content:
      'Nhà tư bản trả lương cho công nhân nhưng không trả hết giá trị mà họ tạo ra. Họ chỉ trả phần đủ để người lao động duy trì cuộc sống và tiếp tục làm việc, còn phần giá trị dôi ra sẽ bị chiếm lấy dưới hình thức lợi nhuận.',
    example: {
      title: 'Giải thích bản chất bóc lột',
      image:
        'https://res.cloudinary.com/dbdnvpfw8/image/upload/v1776677565/Gemini_Generated_Image_e9h8xfe9h8xfe9h8_jgbihp.png',
      alt: 'Bản chất giá trị thặng dư',
      formula: 'Tiền lương ≠ Toàn bộ giá trị lao động tạo ra',
      points: [
        'Công nhân tạo ra giá trị lớn hơn tiền lương nhận được.',
        'Tiền lương chỉ đủ để tái sản xuất sức lao động.',
        'Phần giá trị dôi ra bị nhà tư bản chiếm lấy.',
        'Phần đó chính là giá trị thặng dư và trở thành lợi nhuận.'
      ]
    }
  },
  {
    title: 'Lao động cần thiết và lao động thặng dư',
    subtitle: 'Nguồn tạo ra giá trị thặng dư',
    summary:
      'Giá trị thặng dư được tạo ra từ phần lao động thặng dư – tức phần lao động không được trả công của công nhân.',
    content:
      'Nhà tư bản mua sức lao động chứ không phải mua toàn bộ lao động. Trong ngày làm việc, công nhân phải làm đủ thời gian để bù lại tiền lương và tiếp tục làm thêm để tạo ra giá trị cho nhà tư bản.',
    example: {
      title: 'Ví dụ ngày lao động 8 giờ',
      image:
        'https://res.cloudinary.com/dbdnvpfw8/image/upload/v1776677714/Screenshot_2026-04-20_163503_lciae7.png',
      alt: 'Lao động cần thiết và lao động thặng dư',
      formula: '4 giờ lao động cần thiết + 4 giờ lao động thặng dư',
      points: [
        '4 giờ đầu tạo ra giá trị đủ bù tiền lương cho công nhân.',
        'Đây gọi là lao động cần thiết.',
        '4 giờ sau là phần lao động không được trả công.',
        'Đây chính là lao động thặng dư tạo ra giá trị thặng dư.'
      ]
    }
  },
  {
    title: 'Kết luận về bản chất giá trị thặng dư',
    subtitle: 'Nguồn gốc lợi nhuận tư bản',
    summary:
      'Lợi nhuận của nhà tư bản không đến từ lưu thông mà bắt nguồn từ phần lao động không công của công nhân làm thuê.',
    content:
      'Giá trị thặng dư phản ánh mối quan hệ đối kháng giữa tư bản và lao động. Mục tiêu của sản xuất tư bản chủ nghĩa là tối đa hóa phần lao động thặng dư để thu được nhiều lợi nhuận hơn.',
    example: {
      title: 'Ý nghĩa thực chất',
      image:
        'https://res.cloudinary.com/dbdnvpfw8/image/upload/v1776677655/Screenshot_2026-04-20_163402_vqvred.png',
      alt: 'Kết luận bản chất giá trị thặng dư',
      formula: 'Lao động không công → Giá trị thặng dư → Lợi nhuận',
      points: [
        'Nhà tư bản luôn tìm cách tăng phần lao động thặng dư.',
        'Có thể bằng cách kéo dài thời gian làm việc.',
        'Hoặc tăng cường độ lao động và năng suất.',
        'Mục tiêu cuối cùng là tối đa hóa lợi nhuận.'
      ]
    }
  }
];

const SurplusValueNature = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const activeSection = activeIndex !== null ? sections[activeIndex] : null;

  useEffect(() => {
    if (activeSection) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [activeSection]);

  return (
    <section id="nature" className="py-24 px-6 bg-soviet-offwhite">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-soviet-red mb-6">
            2. Bản Chất Của Giá Trị Thặng Dư
          </h2>
          <p className="text-lg text-zinc-600 max-w-3xl mx-auto font-medium">
            Quan hệ bóc lột và các thước đo: bản chất m, tỷ suất m&apos; và khối lượng M.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="bg-white border-2 border-soviet-red/20 rounded-[2rem] overflow-hidden shadow-xl hover:shadow-red-glow transition-all duration-300"
            >
              <div className="relative h-64">
                <img
                  src={section.example.image}
                  alt={section.example.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/35 via-transparent to-transparent" />
                <button
                  onClick={() => setActiveIndex(index)}
                  className="absolute left-4 bottom-4 bg-soviet-red hover:bg-soviet-darkred text-white text-sm font-bold uppercase tracking-widest px-5 py-2 rounded-full transition-colors"
                >
                  Chi tiết
                </button>
              </div>

              <div className="p-6 md:p-7">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-400 mb-3">{section.subtitle}</p>
                <h3 className="text-2xl font-extrabold text-soviet-red mb-3 uppercase leading-tight">{section.title}</h3>
                <p className="text-zinc-600 leading-relaxed">{section.summary}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <AnimatePresence>
          {activeSection && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-zinc-950/85 backdrop-blur-sm p-3 md:p-8"
              onClick={() => setActiveIndex(null)}
            >
              <motion.div
                initial={{ y: 32, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 32, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="h-full max-h-[920px] max-w-7xl mx-auto bg-white rounded-[2rem] border-2 border-soviet-red/20 overflow-hidden"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="h-full grid lg:grid-cols-[1.1fr_1fr]">
                  <div className="bg-gradient-to-br from-zinc-950 to-zinc-900 p-4 md:p-8 flex items-center justify-center">
                    <img
                      src={activeSection.example.image}
                      alt={activeSection.example.alt}
                      className="w-full h-auto max-h-[78vh] object-contain rounded-2xl"
                    />
                  </div>

                  <div className="p-6 md:p-10 overflow-y-auto">
                    <div className="flex justify-between items-start gap-4 mb-6">
                      <span className="bg-soviet-red/10 text-soviet-red text-xs md:text-sm font-bold uppercase tracking-[0.15em] rounded-full px-4 py-2">
                        Bản chất giá trị thặng dư
                      </span>
                      <button
                        onClick={() => setActiveIndex(null)}
                        className="w-11 h-11 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-700 hover:text-soviet-red hover:border-soviet-red transition-colors"
                        aria-label="Đóng"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <h3 className="text-4xl md:text-5xl font-extrabold italic text-zinc-900 leading-tight mb-5">
                      {activeSection.title}
                    </h3>
                    <div className="w-24 h-1 bg-soviet-gold rounded-full mb-8" />

                    <section className="mb-8">
                      <h4 className="flex items-center gap-2 text-soviet-red font-bold text-xl uppercase tracking-widest mb-4">
                        <BookOpen className="w-5 h-5" />
                        Định nghĩa
                      </h4>
                      <div className="bg-zinc-50 border-l-4 border-soviet-red rounded-r-2xl p-5 text-zinc-700 text-lg leading-relaxed">
                        {activeSection.content}
                      </div>
                    </section>

                    <section>
                      <h4 className="flex items-center gap-2 text-soviet-red font-bold text-xl uppercase tracking-widest mb-4">
                        <Info className="w-5 h-5" />
                        Ví dụ minh họa
                      </h4>
                      <div className="bg-zinc-50 rounded-2xl p-5">
                        <p className="font-bold text-zinc-800 mb-3">{activeSection.example.title}</p>
                        <p className="text-soviet-red font-bold mb-3">{activeSection.example.formula}</p>
                        <ul className="list-disc list-inside text-zinc-700 space-y-2 leading-relaxed">
                          {activeSection.example.points.map((point, pointIndex) => (
                            <li key={pointIndex}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    </section>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SurplusValueNature;