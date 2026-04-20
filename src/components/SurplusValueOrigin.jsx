import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Info, X } from 'lucide-react';

const sections = [
  {
    title: "Công thức chung của tư bản",
    subtitle: "T - H - T'",
    summary: "Tiền chỉ trở thành tư bản khi vận động theo công thức T-H-T', tạo ra phần giá trị dôi ra.",
    content: "Tiền chỉ biến thành tư bản khi vận động theo công thức T-H-T', trong đó T' > T. Giá trị thặng dư (Δt) không đến từ lưu thông mà từ một hàng hóa đặc biệt.",
    example: {
      title: "Ví dụ về công thức chung",
      image: "https://res.cloudinary.com/dbdnvpfw8/image/upload/v1776673015/Gemini_Generated_Image_7xodb17xodb17xod_tsycgb.png",
      alt: "T-H-T Diagram",
      points: [
        "Nhà tư bản có 100 USD (T).",
        "Họ dùng tiền mua máy móc, nguyên liệu và sức lao động (H).",
        "Sau sản xuất, họ bán hàng hóa và thu về 110 USD (T').",
        "Phần 10 USD dôi ra (Δt) chính là giá trị thặng dư."
      ]
    }
  },
  {
    title: "Chìa khóa: Hàng hóa sức lao động",
    subtitle: "Giá trị sử dụng đặc biệt",
    summary: "Sức lao động là hàng hóa đặc biệt vì nó tạo ra giá trị mới lớn hơn giá trị bản thân nó.",
    content: "Sức lao động là hàng hóa đặc biệt, vì khi \"tiêu dùng\" nó trong sản xuất, nó tạo ra một giá trị mới lớn hơn giá trị của chính nó.",
    example: {
      title: "Ví dụ về giá trị sức lao động",
      image: "https://res.cloudinary.com/dbdnvpfw8/image/upload/v1776674637/Screenshot_2026-04-20_152450_ff2gpv.png",
      alt: "Labor Value Diagram",
      points: [
        "Giá trị sức lao động của công nhân là 15 USD/ngày (đủ để sống).",
        "Trong ngày làm việc, công nhân tạo ra sản phẩm có giá trị 30 USD.",
        "Giá trị mới tạo ra (30 USD) lớn hơn giá trị bản thân sức lao động (15 USD)."
      ]
    }
  },
  {
    title: "Quá trình sản xuất giá trị thặng dư",
    subtitle: "Thời gian lao động",
    summary: "Ngày lao động gồm phần tất yếu để bù tiền công và phần thặng dư tạo giá trị cho nhà tư bản.",
    content: "Ngày lao động được chia thành hai phần: thời gian lao động tất yếu (để bù lại giá trị sức lao động) và thời gian lao động thặng dư (tạo ra giá trị cho nhà tư bản).",
    example: {
      title: "Ví dụ về ngày lao động 8 giờ",
      image: "https://res.cloudinary.com/dbdnvpfw8/image/upload/v1776674628/Screenshot_2026-04-20_154204_mfmrsp.png",
      alt: "Workday Diagram",
      points: [
        "Tiền công 1 ngày (giá trị sức lao động) là 15 USD.",
        "Trong 4 giờ đầu (thời gian tất yếu), công nhân tạo ra giá trị 15 USD, bù đủ tiền công.",
        "Trong 4 giờ sau (thời gian thặng dư), công nhân tạo ra thêm 15 USD nữa. Đây chính là giá trị thặng dư mà nhà tư bản chiếm đoạt."
      ]
    }
  }
];

const SurplusValueOrigin = () => {
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
    <section id="origin" className="py-24 px-6 bg-soviet-offwhite">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-soviet-red mb-6">
            1. Nguồn Gốc Của Giá Trị Thặng Dư
          </h2>
          <p className="text-lg text-zinc-600 max-w-3xl mx-auto font-medium">
            Từ công thức tư bản đến hàng hóa sức lao động - khám phá cội nguồn của giá trị thặng dư.
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
                        Nguồn gốc giá trị thặng dư
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

export default SurplusValueOrigin;