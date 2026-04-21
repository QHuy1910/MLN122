import React from 'react';
import { motion } from 'framer-motion';
import cqText from '../../cauhoiQC.txt?raw';

const SECTION_TITLE_PATTERN = /^([IVX]+)\.\s+/i;
const SUBSECTION_TITLE_PATTERN = /^\d+[\)\.]\s+/;
const FIRST_SUBSECTION_PATTERN = /^1[\)\.]\s+/;
const BULLET_LINE_PATTERN = /^[-•]\s*/;
const SEPARATOR_LINE_PATTERN = /^_+$/;
const LAPTOP_VIDEO_SRC = '/video/H%C3%A0nh_Tr%C3%ACnh_B%C3%AD_M%E1%BA%ADt_C%E1%BB%A7a_Laptop.mp4';

const parseSections = (rawText) => {
  const lines = rawText
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !SEPARATOR_LINE_PATTERN.test(line));

  const sections = [];
  let currentSection = null;
  let currentSubsection = null;

  lines.forEach((line) => {
    if (SECTION_TITLE_PATTERN.test(line) || /^KẾT LUẬN\s*:?$/i.test(line)) {
      currentSection = {
        title: line,
        intro: [],
        subsections: []
      };
      sections.push(currentSection);
      currentSubsection = null;
      return;
    }

    if (!currentSection) {
      currentSection = { title: 'Nội dung', intro: [], subsections: [] };
      sections.push(currentSection);
    }

    if (SUBSECTION_TITLE_PATTERN.test(line)) {
      currentSubsection = {
        title: line,
        lines: []
      };
      currentSection.subsections.push(currentSubsection);
      return;
    }

    if (currentSubsection) {
      currentSubsection.lines.push(line);
    } else {
      currentSection.intro.push(line);
    }
  });

  return sections;
};

const tokenizeContent = (lines) => {
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (BULLET_LINE_PATTERN.test(line)) {
      const items = [];
      while (index < lines.length && BULLET_LINE_PATTERN.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(BULLET_LINE_PATTERN, '').trim());
        index += 1;
      }
      blocks.push({ type: 'bullets', items });
      continue;
    }

    if (SUBSECTION_TITLE_PATTERN.test(line)) {
      blocks.push({ type: 'subsection-title', text: line });
      index += 1;
      continue;
    }

    if (line.includes('|')) {
      const rows = [];
      while (index < lines.length && lines[index].includes('|')) {
        const cols = lines[index]
          .split('|')
          .map((cell) => cell.trim())
          .filter((cell) => cell.length > 0);

        if (cols.length > 0) {
          rows.push(cols);
        }

        index += 1;
      }

      if (rows.length > 0) {
        blocks.push({ type: 'table', rows });
      }

      continue;
    }

    const paragraphs = [];
    while (
      index < lines.length &&
      lines[index].trim() &&
      !BULLET_LINE_PATTERN.test(lines[index].trim()) &&
      !lines[index].includes('|')
    ) {
      paragraphs.push(lines[index].trim());
      index += 1;
    }

    if (paragraphs.length > 0) {
      blocks.push({ type: 'paragraphs', items: paragraphs });
    }
  }

  return blocks;
};

const normalizeTableRows = (rows) => {
  const maxColumns = rows.reduce((max, row) => Math.max(max, row.length), 0);
  return rows.map((row) => {
    if (row.length === maxColumns) {
      return row;
    }

    const padded = [...row];
    while (padded.length < maxColumns) {
      padded.push('');
    }
    return padded;
  });
};

const ContentBlocks = ({ lines }) => {
  const blocks = tokenizeContent(lines);

  return (
    <div className="space-y-5">
      {blocks.map((block, blockIndex) => {
        if (block.type === 'paragraphs') {
          return (
            <div key={`paragraphs-${blockIndex}`} className="space-y-2 text-zinc-700 leading-relaxed">
              {block.items.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          );
        }

        if (block.type === 'bullets') {
          return (
            <ul key={`bullets-${blockIndex}`} className="list-disc pl-5 space-y-2 text-zinc-700 leading-relaxed">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }

        if (block.type === 'subsection-title') {
          return (
            <h3 key={`sub-title-${blockIndex}`} className="text-lg md:text-xl font-bold text-[#8a4f35]">
              {block.text}
            </h3>
          );
        }

        const normalizedRows = normalizeTableRows(block.rows);
        const headerRow = normalizedRows[0];
        const dataRows = normalizedRows.slice(1);

        return (
          <div
            key={`table-${blockIndex}`}
            className="overflow-x-auto rounded-2xl border border-[#e6d3b4] bg-gradient-to-br from-[#fffaf1] to-[#fff3de]"
          >
            <table className="min-w-full text-sm md:text-base">
              <thead>
                <tr className="bg-[#f2e2c6] text-[#7a4a2f]">
                  {headerRow.map((cell, cellIndex) => (
                    <th
                      key={`head-${cellIndex}`}
                      className="text-left font-bold px-4 py-3 border-b border-[#e6d3b4]"
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataRows.map((row, rowIndex) => (
                  <tr key={`row-${rowIndex}`} className="odd:bg-white/60 even:bg-transparent">
                    {row.map((cell, cellIndex) => (
                      <td
                        key={`cell-${rowIndex}-${cellIndex}`}
                        className="px-4 py-3 align-top border-b border-[#f0e3cc] text-zinc-700"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

const CQPage = () => {
  const sections = parseSections(cqText);

  return (
    <section className="pt-32 pb-24 px-5 md:px-8 min-h-screen bg-[radial-gradient(circle_at_top_left,_#fff6e5_0%,_#fdeacc_35%,_#f8e6cf_60%,_#f5e4d2_100%)]">
      <div className="max-w-7xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2rem] border border-[#e7d7bd] bg-gradient-to-br from-[#fffdf8] via-[#fff7ea] to-[#fbe9d1] p-6 md:p-8 lg:p-10 shadow-[0_20px_45px_rgba(110,65,30,0.14)] mb-10"
        >
          <div className="absolute -right-16 -top-16 w-52 h-52 rounded-full bg-[#a35d43]/10 blur-2xl" />
          <div className="absolute -left-20 -bottom-20 w-56 h-56 rounded-full bg-[#d7b68a]/20 blur-2xl" />

          <p className="relative inline-block px-4 py-1.5 rounded-full bg-[#7a1f1a] text-[#fff7e8] uppercase tracking-[0.2em] text-[11px] font-black mb-5 shadow-md">
            Chuyên đề CQ
          </p>

          <h1 className="relative max-w-5xl text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.04] text-[#8b523f]">
            Một chiếc laptop đến tay người tiêu dùng: Ai làm gì, ai được gì?
          </h1>

          <div className="relative mt-6 h-1.5 w-28 rounded-full bg-gradient-to-r from-[#9c5f4d] to-[#d7b173]" />

          <p className="relative mt-6 text-zinc-700/90 leading-relaxed max-w-4xl text-base md:text-lg">
            Là một người tiêu dùng thông minh, bạn hãy lựa chọn một loại hàng hóa hoặc dịch vụ mà bạn quan tâm nhất và phân tích quá trình sản xuất, tiêu dùng và phân phối của nó trên thị trường. Từ ví dụ cụ thể đó, bạn hãy đưa ra những nhận xét vai trò của người sản xuất, người tiêu dùng, các chủ thể trung gian và nhà nước trong quá trình sản xuất, lưu thông và tiêu dùng sp đó trong xã hội hiện nay.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <aside className="lg:sticky lg:top-24 h-fit rounded-3xl border border-[#dfc49d] bg-white/85 p-5 shadow-[0_20px_45px_rgba(110,65,30,0.12)]">
            <p className="text-xs uppercase tracking-[0.2em] text-[#9c5f4d] font-black mb-4">Mục lục</p>
            <nav className="space-y-2">
              {sections.map((section, index) => {
                const sectionId = `cq-section-${index}`;
                return (
                  <a
                    key={sectionId}
                    href={`#${sectionId}`}
                    className="block rounded-xl px-3 py-2 text-sm text-zinc-700 hover:bg-[#f9efe0] hover:text-[#7a1f1a] transition-colors"
                  >
                    {section.title}
                  </a>
                );
              })}
            </nav>
          </aside>

          <div className="space-y-8">
            {sections.map((section, sectionIndex) => {
              const sectionId = `cq-section-${sectionIndex}`;
              const firstSubsection = section.subsections[0];
              const shouldMergeFirstSubsection =
                firstSubsection && FIRST_SUBSECTION_PATTERN.test(firstSubsection.title);

              const mergedMainLines = shouldMergeFirstSubsection
                ? [...section.intro, firstSubsection.title, ...firstSubsection.lines]
                : section.intro;

              const remainingSubsections = shouldMergeFirstSubsection
                ? section.subsections.slice(1)
                : section.subsections;

              return (
                <motion.article
                  id={sectionId}
                  key={sectionId}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.45, delay: sectionIndex * 0.03 }}
                  className="rounded-[2rem] overflow-hidden border border-[#dfc49d] bg-white shadow-[0_25px_55px_rgba(110,65,30,0.12)]"
                >
                  <div className="px-6 md:px-8 py-6 border-b border-[#efe2ca] bg-gradient-to-r from-[#fff8ec] to-[#fff2df]">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#9c5f4d] font-black mb-2">Phần {sectionIndex + 1}</p>
                    <h2 className="text-2xl md:text-3xl font-black text-[#7a1f1a] leading-tight">{section.title}</h2>
                  </div>

                  <div className="p-6 md:p-8 space-y-6">
                    {mergedMainLines.length > 0 && <ContentBlocks lines={mergedMainLines} />}

                    {remainingSubsections.map((subsection, subsectionIndex) => (
                      <section
                        key={`${sectionId}-sub-${subsectionIndex}`}
                        className="rounded-2xl border border-[#ead8bc] bg-[#fffdf8] p-5 md:p-6"
                      >
                        <h3 className="text-lg md:text-xl font-bold text-[#8a4f35] mb-4">{subsection.title}</h3>
                        <ContentBlocks lines={subsection.lines} />
                      </section>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
          className="mt-12 rounded-[2rem] overflow-hidden border border-[#dfc49d] bg-white shadow-[0_25px_55px_rgba(110,65,30,0.12)]"
        >
          <div className="px-6 md:px-8 py-6 border-b border-[#efe2ca] bg-gradient-to-r from-[#fff8ec] to-[#fff2df]">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#9c5f4d] font-black mb-2">Video minh họa</p>
            <h2 className="text-2xl md:text-3xl font-black text-[#7a1f1a] leading-tight">Hành Trình Bí Mật Của Laptop</h2>
          </div>
          <div className="p-4 md:p-6 bg-zinc-900">
            <video className="w-full rounded-xl" controls preload="metadata" src={LAPTOP_VIDEO_SRC} />
          </div>
        </motion.section>
      </div>
    </section>
  );
};

export default CQPage;