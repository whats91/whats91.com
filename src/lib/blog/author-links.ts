/** Derived display/link records only. No approved identity or organizational byline exists.
 * Initials come from source spelling; they do not verify a person or a photograph.
 * Raw profiles/history remain in authors.ts and are not sent to client components.
 */
export const authorLinks = [
  {
    "id": "1",
    "slug": "devendar-singh-gohil",
    "initials": "DSG"
  },
  {
    "id": "2",
    "slug": "mayur-arya",
    "initials": "MA"
  },
  {
    "id": "3",
    "slug": "santosh-patil",
    "initials": "SP"
  },
  {
    "id": "4",
    "slug": "ankita-arya",
    "initials": "AA"
  }
] as const;
export function getAuthorLink(id: string) { return authorLinks.find(author => author.id === id); }
export const attributionLabel = "Attribution pending";
