import { SITE } from '../config';

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${SITE.whatsappPhone}?text=${encodeURIComponent(message)}`;
}
