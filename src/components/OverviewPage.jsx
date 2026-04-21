import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookText, NotebookPen, Bot, BrainCircuit, Sparkles } from 'lucide-react';

const teamMembers = [
  { name: 'Thân Trần Quốc Huy', code: 'SE183533' },
  { name: 'Lê Nguyễn Xuân Khôi', code: 'SE183384' },
  { name: 'Trần Anh Tú', code: 'SE183396' },
  { name: 'Võ Thanh Tòng', code: 'SE182169' }
];

const presentationOutline = [
  {
    title: 'Nguồn Gốc Của Giá Trị Thặng Dư',
    desc: 'Lao động của công nhân tạo ra giá trị lớn hơn sức lao động mình được trả.'
  },
  {
    title: 'Bản Chất Của Giá Trị Thặng Dư',
    desc: 'Là phần giá trị mới dôi ra ngoài tiền công, bị nhà tư bản chiếm không.'
  },
  {
    title: 'Phương Pháp Sản Xuất',
    desc: 'Tăng ca, tăng năng suất để kéo dài và rút ngắn thời gian lao động tất yếu.'
  },
  {
    title: 'CQ & Trò Chơi',
    desc: 'Vận dụng quy luật kinh tế để đạt mục tiêu mà không chống lại quy luật khách quan.'
  }
];

const supportTools = [
  {
    name: 'NotebookLM',
    desc: 'Tổng hợp nội dung, trích ý chính và dựng ghi chú nhanh. Tạo dựng video.',
    icon: NotebookPen,
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-100'
  },
  {
    name: 'ChatGPT & Deepseek',
    desc: 'Gợi ý bố cục, tinh chỉnh câu chữ và soát logic trình bày.',
    icon: Bot,
    iconColor: 'text-emerald-500',
    bgColor: 'bg-emerald-100'
  },
  {
    name: 'Cursor',
    desc: 'Hỗ trợ làm game tương tác và tạo hiệu ứng trình chiếu sinh động.',
    icon: BrainCircuit,
    iconColor: 'text-orange-500',
    bgColor: 'bg-orange-100'
  },
  {
    name: 'Gemini',
    desc: 'Hỗ trợ tạo minh họa.',
    icon: Sparkles,
    iconColor: 'text-indigo-500',
    bgColor: 'bg-indigo-100'
  }
];

const cardMotion = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.45 }
};

const OverviewPage = () => {
  return (
    <section className="pt-28 pb-20 px-5 md:px-8 min-h-screen bg-zinc-100 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-40 [background-image:radial-gradient(#dc2626_1px,transparent_1px)] [background-size:150px_150px]" />

      <div className="max-w-7xl mx-auto relative space-y-8">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-center py-4"
        >
          <p className="inline-flex items-center px-5 py-1.5 rounded-full bg-red-100 text-red-600 text-xs md:text-sm font-black tracking-[0.12em] uppercase mb-6">
            Môn học: Triết học Mác - Lênin
          </p>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase italic tracking-tight leading-none">
            <span className="text-red-600">Tổng Quan</span>{' '}
            <span className="text-zinc-800">Thuyết Trình</span>
          </h1>

          <p className="mt-7 text-zinc-500 text-lg md:text-2xl">
            Giảng viên hướng dẫn:{' '}
            <span className="text-zinc-800 font-bold underline decoration-red-500 underline-offset-4">Đoàn Thị Ngân</span>
          </p>

          <div className="h-1.5 w-28 bg-red-600 mx-auto mt-8 rounded-full" />
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.article
            {...cardMotion}
            className="p-3 md:p-4"
          >
            <h2 className="text-2xl font-black uppercase text-red-600 mb-6 flex items-center gap-3 tracking-wider">
              <Users className="w-7 h-7" /> Đội ngũ thực hiện
            </h2>

            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.code} className="bg-white border-l-2 border-red-500 shadow-sm px-6 py-6 flex items-center justify-between">
                  <p className="text-zinc-800 text-xl font-bold">{member.name}</p>
                  <p className="text-red-600 font-bold text-xl">{member.code}</p>
                </div>
              ))}
            </div>
          </motion.article>

          <motion.article
            {...cardMotion}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="p-3 md:p-4"
          >
            <h2 className="text-2xl font-black uppercase text-red-600 mb-6 flex items-center gap-3 tracking-wider">
              <BookText className="w-7 h-7" /> Nội dung thuyết trình
            </h2>

            <div className="relative pl-8 space-y-8 before:content-[''] before:absolute before:left-[23px] before:top-2 before:bottom-2 before:w-[2px] before:bg-zinc-300">
              {presentationOutline.map((item, index) => (
                <div key={item.title} className="relative">
                  <span className="absolute -left-8 top-0 w-11 h-11 rounded-full bg-red-600 text-white font-black text-xl flex items-center justify-center shadow-lg">
                    {index + 1}
                  </span>
                  <div className="pl-10">
                    <h3 className="text-zinc-800 text-2xl font-black uppercase leading-tight">{item.title}</h3>
                    <p className="mt-2 text-zinc-500 text-lg leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.article>
        </div>

        <motion.article
          {...cardMotion}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="rounded-3xl border border-zinc-200 bg-white p-6 md:p-8 shadow-sm"
        >
          <div className="h-1 w-full bg-red-600 rounded-full mb-8" />

          <h2 className="text-xl md:text-2xl text-center font-black text-zinc-500 mb-8 uppercase tracking-[0.12em]">
            Phụ lục: Công cụ hỗ trợ
          </h2>

          <ul className="grid grid-cols-2 md:grid-cols-4 gap-5 text-zinc-700 leading-relaxed">
            {supportTools.map((tool) => {
              const Icon = tool.icon;

              return (
                <li key={tool.name} className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-5 text-center">
                  <div className={`w-12 h-12 mx-auto rounded-2xl ${tool.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${tool.iconColor}`} />
                  </div>
                  <p className="mt-4 text-sm md:text-base font-black uppercase tracking-wide text-zinc-700">{tool.name}</p>
                  <p className="mt-2 text-xs md:text-sm text-zinc-500 leading-relaxed">{tool.desc}</p>
                </li>
              );
            })}
          </ul>

          <div className="h-1 w-full bg-red-600 rounded-full mt-8" />
        </motion.article>

        
      </div>
    </section>
  );
};

export default OverviewPage;
