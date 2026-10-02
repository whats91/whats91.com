/** Content history only. Request, build, review and evidence clocks are not substitutes. */
export interface ContentDates {
  publishedAt?: string;
  /** Existing registry name for a material public update, never a technical check. */
  updatedAt?: string;
}

export function contentDate(value?: string): string | undefined {
  if (!value || !/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2}))?$/.test(value)) return;
  const time = Date.parse(value);
  if (!Number.isFinite(time)) return;
  const day = value.slice(0, 10);
  // Date.parse normalizes impossible days such as February 30.
  if (new Date(`${day}T00:00:00Z`).toISOString().slice(0, 10) !== day) return;
  return new Date(time).toISOString();
}

export function contentDates(record: ContentDates) {
  const published = contentDate(record.publishedAt);
  const candidate = contentDate(record.updatedAt);
  const modified = candidate && (!published || candidate >= published) ? candidate : undefined;
  return {
    published,
    modified,
    // Initial publication can establish sitemap lastmod; it is never labelled an update.
    lastModified: modified || published,
    feedPublished: published ? new Date(published).toUTCString() : undefined,
  };
}

export function feedItems<T extends ContentDates>(records: T[], requiresPublicationDate = false): T[] {
  return requiresPublicationDate ? records.filter(record => contentDates(record).published) : records;
}
