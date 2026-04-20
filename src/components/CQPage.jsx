import React, { useState } from 'react';
import { motion } from 'framer-motion';
import cqText from '../../cauhoiQC.txt?raw';

const RULE_BULLET_PATTERN = /^Quy luật\s+/i;
const ACTOR_BULLET_PATTERN = /^(Người sản xuất|Người tiêu dùng|Chủ thể trung gian|Nhà nước)\s*:/i;
const ECONOMIC_ACTORS_INFO_IMAGE = 'https://res.cloudinary.com/dbdnvpfw8/image/upload/v1776686615/Screenshot_2026-04-20_190323_cxvz3i.png';
const SECTION_2_TITLE_PATTERN = /^2\.\s*CÁCH THỨC VẬN HÀNH CỦA THỊ TRƯỜNG/i;
const SECTION_3_TITLE_PATTERN = /^3\.\s*CÁC CHỦ THỂ CHÍNH TRONG NỀN KINH TẾ/i;

const parseRuleItem = (text) => {
  const [name, ...rest] = text.split(':');

  return {
    name: name ? name.trim() : text,
    detail: rest.length > 0 ? rest.join(':').trim() : text
  };
};

const MarketRulesPanel = ({ section }) => {
  const introBullets = section.bullets.filter((item) => !RULE_BULLET_PATTERN.test(item));
  const rules = section.bullets.filter((item) => RULE_BULLET_PATTERN.test(item)).map(parseRuleItem);
  const [activeRuleIndex, setActiveRuleIndex] = useState(0);

  const safeActiveIndex = activeRuleIndex >= rules.length ? 0 : activeRuleIndex;
  const activeRule = rules[safeActiveIndex];

  return (
    <>
      {introBullets.length > 0 && (
        <section className="bg-zinc-50 rounded-2xl border border-zinc-200 p-5 md:p-6">
          <h3 className="text-xl md:text-2xl font-bold text-zinc-900 mb-3">Thông tin chính</h3>
          <ul className="list-disc pl-5 space-y-2 text-zinc-700 leading-relaxed">
            {introBullets.map((item, index) => (
              <li key={`${item}-${index}`}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {rules.length > 0 && (
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <div className="w-full md:w-1/3 flex md:flex-col gap-3">
            {rules.map((rule, index) => (
              <button
                key={`${rule.name}-${index}`}
                onClick={() => setActiveRuleIndex(index)}
                className={`w-full p-4 text-left rounded-xl transition-all duration-300 ${
                  safeActiveIndex === index
                    ? 'bg-soviet-red text-white shadow-lg shadow-soviet-red/30'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                <h4 className="text-sm md:text-base font-bold uppercase tracking-tight">{rule.name}</h4>
              </button>
            ))}
          </div>

          <div className="w-full md:w-2/3">
            <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-5 md:p-6 min-h-[220px]">
              <motion.div
                key={activeRule.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-400 mb-3">Chi tiết quy luật</p>
                <h3 className="text-xl md:text-2xl font-bold text-zinc-900 mb-4">{activeRule.name}</h3>
                <p className="text-zinc-700 leading-relaxed">{activeRule.detail}</p>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const EconomicActorsPanel = ({ section }) => {
  const introBullets = section.bullets.filter((item) => !ACTOR_BULLET_PATTERN.test(item));
  const actors = section.bullets.filter((item) => ACTOR_BULLET_PATTERN.test(item)).map(parseRuleItem);
  const [activeActorIndex, setActiveActorIndex] = useState(0);

  const safeActiveIndex = activeActorIndex >= actors.length ? 0 : activeActorIndex;
  const activeActor = actors[safeActiveIndex];

  return (
    <>
      {introBullets.length > 0 && (
        <section className="bg-zinc-50 rounded-2xl border border-zinc-200 p-5 md:p-6">
          <h3 className="text-xl md:text-2xl font-bold text-zinc-900 mb-3">Thông tin chính</h3>
          <ul className="list-disc pl-5 space-y-2 text-zinc-700 leading-relaxed">
            {introBullets.map((item, index) => (
              <li key={`${item}-${index}`}>{item}</li>
            ))}
          </ul>

          <figure className="mt-4 rounded-xl overflow-hidden border border-zinc-200 bg-white">
            <img
              src={ECONOMIC_ACTORS_INFO_IMAGE}
              alt="Minh họa các chủ thể chính trong nền kinh tế"
              className="w-full h-auto"
            />
          </figure>
        </section>
      )}

      {actors.length > 0 && (
        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {actors.map((actor, index) => (
              <button
                key={`${actor.name}-${index}`}
                onClick={() => setActiveActorIndex(index)}
                className={`w-full p-4 text-left rounded-xl transition-all duration-300 ${
                  safeActiveIndex === index
                    ? 'bg-soviet-red text-white shadow-lg shadow-soviet-red/30'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                <h4 className="text-sm md:text-base font-bold uppercase tracking-tight">{actor.name}</h4>
              </button>
            ))}
          </div>

          <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-5 md:p-6 min-h-[220px]">
            <motion.div
              key={activeActor.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400 mb-3">Chi tiết chủ thể</p>
              <h3 className="text-xl md:text-2xl font-bold text-zinc-900 mb-4">{activeActor.name}</h3>
              <p className="text-zinc-700 leading-relaxed">{activeActor.detail}</p>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};

const CQPage = () => {
  const URL_PATTERN = /(https?:\/\/[^\s]+)/i;

  const splitBulletContent = (bullets) => {
    return bullets.reduce(
      (acc, item) => {
        const urlMatch = item.match(URL_PATTERN);

        if (urlMatch) {
          const url = urlMatch[1];
          const caption = item
            .replace(url, '')
            .replace(/[:\-]\s*$/, '')
            .trim();

          acc.images.push({ url, caption });
          return acc;
        }

        acc.text.push(item);
        return acc;
      },
      { text: [], images: [] }
    );
  };

  const lines = cqText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const sections = [];
  let currentSection = null;
  let currentSubsection = null;

  lines.forEach((line) => {
    if (/^([IVX]+|\d+)\.\s+/.test(line) || /^KẾT LUẬN\s*:?$/i.test(line)) {
      currentSection = {
        title: line,
        intro: [],
        bullets: [],
        subsections: []
      };
      sections.push(currentSection);
      currentSubsection = null;
      return;
    }

    if (!currentSection) {
      return;
    }

    if (/^\d+\)\s+/.test(line)) {
      currentSubsection = {
        title: line,
        paragraphs: [],
        bullets: []
      };
      currentSection.subsections.push(currentSubsection);
      return;
    }

    if (line.startsWith('- ')) {
      const bullet = line.slice(2);
      if (currentSubsection) {
        currentSubsection.bullets.push(bullet);
      } else {
        currentSection.bullets.push(bullet);
      }
      return;
    }

    if (currentSubsection) {
      currentSubsection.paragraphs.push(line);
    } else {
      currentSection.intro.push(line);
    }
  });

  return (
    <section className="pt-36 pb-24 px-6 bg-soviet-offwhite min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-bold text-soviet-red mb-4">CQ</h1>
          <p className="text-zinc-600 text-lg max-w-3xl mx-auto">
            Phân tích quá trình sản xuất, phân phối, tiêu dùng và vai trò các chủ thể theo nội dung trong file câu hỏi.
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section, sectionIndex) => (
            <motion.article
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.4, delay: sectionIndex * 0.04 }}
              className="bg-white rounded-[2rem] border-2 border-soviet-red/20 shadow-xl overflow-hidden"
            >
              <div className="p-6 md:p-10 border-b border-zinc-200 bg-zinc-50">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-400 mb-3">
                  Phần {sectionIndex + 1}
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-soviet-red mb-4">{section.title}</h2>
                <div className="space-y-3 text-zinc-700 leading-relaxed text-base md:text-lg">
                  {section.intro.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="p-6 md:p-10 space-y-5">
                {SECTION_2_TITLE_PATTERN.test(section.title) ? (
                  <MarketRulesPanel section={section} />
                ) : SECTION_3_TITLE_PATTERN.test(section.title) ? (
                  <EconomicActorsPanel section={section} />
                ) : (
                  <>
                    {section.subsections.map((subsection) => {
                      const subsectionContent = splitBulletContent(subsection.bullets);

                      return (
                        <section key={subsection.title} className="bg-zinc-50 rounded-2xl border border-zinc-200 p-5 md:p-6">
                          <h3 className="text-xl md:text-2xl font-bold text-zinc-900 mb-3">{subsection.title}</h3>

                          {subsection.paragraphs.length > 0 && (
                            <div className="space-y-2 text-zinc-700 leading-relaxed mb-4">
                              {subsection.paragraphs.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                              ))}
                            </div>
                          )}

                          {subsectionContent.text.length > 0 && (
                            <ul className="list-disc pl-5 space-y-2 text-zinc-700 leading-relaxed">
                              {subsectionContent.text.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          )}

                          {subsectionContent.images.length > 0 && (
                            <div className="mt-4 space-y-4">
                              {subsectionContent.images.map((image) => (
                                <figure key={image.url} className="rounded-xl overflow-hidden border border-zinc-200 bg-white">
                                  <img src={image.url} alt={image.caption || subsection.title} className="w-full h-auto" />
                                  {image.caption && (
                                    <figcaption className="px-4 py-3 text-sm text-zinc-500 border-t border-zinc-200">
                                      {image.caption}
                                    </figcaption>
                                  )}
                                </figure>
                              ))}
                            </div>
                          )}
                        </section>
                      );
                    })}

                    {section.bullets.length > 0 && (() => {
                      const sectionContent = splitBulletContent(section.bullets);

                      return (
                        <section className="bg-zinc-50 rounded-2xl border border-zinc-200 p-5 md:p-6">
                          <h3 className="text-xl md:text-2xl font-bold text-zinc-900 mb-3">Thông tin chính</h3>

                          {sectionContent.text.length > 0 && (
                            <ul className="list-disc pl-5 space-y-2 text-zinc-700 leading-relaxed">
                              {sectionContent.text.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          )}

                          {sectionContent.images.length > 0 && (
                            <div className="mt-4 space-y-4">
                              {sectionContent.images.map((image) => (
                                <figure key={image.url} className="rounded-xl overflow-hidden border border-zinc-200 bg-white">
                                  <img src={image.url} alt={image.caption || section.title} className="w-full h-auto" />
                                  {image.caption && (
                                    <figcaption className="px-4 py-3 text-sm text-zinc-500 border-t border-zinc-200">
                                      {image.caption}
                                    </figcaption>
                                  )}
                                </figure>
                              ))}
                            </div>
                          )}
                        </section>
                      );
                    })()}
                  </>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CQPage;