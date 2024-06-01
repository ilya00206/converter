export interface SkipLink {
  id: string;
  label: string;
}

export const CONTENT_SKIP_LINK: SkipLink = {
  id: 'content',
  label: 'Przejdź do treści',
};

export const SKIP_LINKS: SkipLink[] = [CONTENT_SKIP_LINK];
