import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import AtelierFooter from '@/components/sections/AtelierFooter';
import { BLOG_POSTS } from '@/lib/blog-data';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: 'Article Not Found | Style with J' };

  const canonicalUrl = `https://stylewithj.com/blog/${post.slug}`;

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: canonicalUrl,
      type: 'article',
      publishedTime: post.publishDate,
      authors: [post.author],
      images: [
        {
          url: `https://stylewithj.com${post.coverImage}`,
          width: 1200,
          height: 630,
          alt: post.coverImageAlt || post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
      images: [`https://stylewithj.com${post.coverImage}`],
    },
  };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Related articles from same category or fallback
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  const articleUrl = `https://stylewithj.com/blog/${post.slug}`;

  // Schema.org BlogPosting Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    headline: post.title,
    description: post.metaDescription,
    image: `https://stylewithj.com${post.coverImage}`,
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: 'Personal Stylist & Image Consultant',
      worksFor: {
        '@type': 'Organization',
        name: 'Style with J',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Style with J',
      logo: {
        '@type': 'ImageObject',
        url: 'https://stylewithj.com/images/style%20with%20j.png',
      },
    },
    datePublished: post.publishDate,
    keywords: post.keywords.join(', '),
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />

      <main className="pt-32 sm:pt-40 pb-16 sm:pb-24">
        {/* ── HEADER ── */}
        <article className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Link
              href="/blog"
              className="font-mono text-[9px] tracking-[0.25em] uppercase text-black/50 hover:text-black font-semibold border-b border-black/20 pb-0.5"
            >
              ← Back to Blog
            </Link>
            <span className="text-black/30">•</span>
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-black/60 bg-[#EFECE6] px-2.5 py-1 rounded-xs font-semibold">
              {post.category}
            </span>
            <span className="text-black/30">•</span>
            <span className="font-mono text-[9px] text-black/45">{post.readTime}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-tight text-black mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 py-4 border-y border-black/10 text-xs text-black/60 font-sans font-light mb-8">
            <span>By <strong className="font-semibold text-black">{post.author}</strong></span>
            <span>•</span>
            <span>Published {post.publishDate}</span>
            <span>•</span>
            <span>Bangalore, India</span>
          </div>

          {/* Featured Image */}
          <div className="relative w-full h-[450px] sm:h-[550px] bg-[#0D0D0D] border border-black/10 overflow-hidden mb-12 rounded-xs shadow-md">
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt || post.title}
              fill
              priority
              className="object-cover object-top"
            />
          </div>

          {/* Excerpt Lead */}
          <p className="font-serif text-lg sm:text-2xl font-light italic leading-relaxed text-black/85 mb-10 pb-8 border-b border-black/10">
            "{post.excerpt}"
          </p>

          {/* Body Sections */}
          <div className="space-y-10 text-black/85 font-sans leading-relaxed text-base sm:text-lg font-light">
            {post.sections.map((sec, idx) => (
              <div key={idx} className="space-y-4">
                {sec.heading && (
                  <h2 className="font-serif text-2xl sm:text-3xl font-light text-black tracking-tight pt-4">
                    {sec.heading}
                  </h2>
                )}
                {sec.subheading && (
                  <h3 className="font-sans text-sm sm:text-base tracking-wider uppercase font-semibold text-black/80 pt-2">
                    {sec.subheading}
                  </h3>
                )}
                {sec.paragraphs && sec.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="text-black/80 leading-relaxed font-light text-sm sm:text-base">
                    {para}
                  </p>
                ))}

                {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                  <div className="my-6 p-5 sm:p-6 bg-[#FAF8F3] border border-black/10 rounded-xs">
                    <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-black/50 font-bold block mb-3">
                      KEY TAKEAWAYS & FORMULAS:
                    </span>
                    <ul className="space-y-2.5">
                      {sec.bulletPoints.map((pt, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm font-sans text-black/85 font-light">
                          <span className="w-1.5 h-1.5 rounded-full bg-black/40 mt-1.5 flex-shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {sec.quote && (
                  <blockquote className="my-8 p-6 sm:p-8 bg-[#EFECE6] border-l-4 border-black rounded-xs">
                    <p className="font-serif text-base sm:text-xl font-light italic leading-snug text-black">
                      "{sec.quote}"
                    </p>
                  </blockquote>
                )}
              </div>
            ))}
          </div>

          {/* ── MANDATORY CLIENT CTA BLOCK ── */}
          <div className="mt-14 p-6 sm:p-10 bg-[#1A1A1A] text-white rounded-xs shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-black">
            <div className="max-w-xl">
              <span className="font-sans text-[9px] tracking-[0.4em] uppercase font-semibold text-white/50 block mb-2">
                PERSONAL STYLING DISCOVERY
              </span>
              <h3 className="font-serif text-xl sm:text-3xl font-light text-white leading-snug">
                Ready to curate a wardrobe that fits your lifestyle?
              </h3>
              <p className="font-sans text-xs sm:text-sm font-light text-white/70 mt-2 leading-relaxed">
                Book a 1-on-1 Style Discovery session with J today in Bangalore or virtually worldwide.
              </p>
            </div>
            <Link
              href="/connect"
              className="flex-shrink-0 px-6 py-3.5 bg-white text-black font-mono text-[9px] tracking-[0.25em] uppercase font-semibold hover:bg-white/90 transition-colors shadow-md rounded-xs"
            >
              Book Session →
            </Link>
          </div>

          {/* Internal Links to Core Services & Journal Articles */}
          <div className="mt-10 pt-6 border-t border-black/10 flex flex-wrap items-center justify-between gap-4 text-xs font-sans text-black/60">
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-semibold text-black">Explore Services:</span>
              <Link href="/services" className="hover:text-black border-b border-black/20 pb-0.5">Personal Shopping</Link>
              <Link href="/services" className="hover:text-black border-b border-black/20 pb-0.5">Wardrobe Audit</Link>
              <Link href="/services" className="hover:text-black border-b border-black/20 pb-0.5">Workwear Styling</Link>
              <Link href="/services" className="hover:text-black border-b border-black/20 pb-0.5">Occasion Styling</Link>
            </div>
          </div>
        </article>

        {/* ── RELATED ARTICLES ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-20 mt-20 pt-16 border-t border-black/10">
          <div className="mb-8">
            <h2 className="font-serif text-2xl sm:text-4xl font-light text-black">
              More From The Journal
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className="group flex flex-col bg-white border border-black/10 overflow-hidden hover:shadow-md transition-all duration-300 rounded-xs"
              >
                <div className="relative aspect-[4/3] bg-[#0D0D0D] overflow-hidden">
                  <Image
                    src={rel.coverImage}
                    alt={rel.coverImageAlt || rel.title}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/80 text-white font-mono text-[8px] tracking-[0.2em] uppercase px-2.5 py-1">
                    {rel.categorySlug.replace('-', ' ')}
                  </div>
                </div>
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-serif text-lg font-light text-black leading-snug mb-2 group-hover:text-black/70 transition-colors">
                      {rel.title}
                    </h3>
                    <p className="font-sans text-xs text-black/60 font-light line-clamp-2 leading-relaxed">
                      {rel.excerpt}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-[9px] font-mono text-black font-semibold">
                    <span>Read Guide →</span>
                    <span className="text-black/40 font-normal">{rel.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <AtelierFooter />
    </div>
  );
}
