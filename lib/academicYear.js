/**
 * Utility functions for calculating dynamic Academic Years & Copyright years automatically.
 * 
 * Standard School Academic Year cycle:
 * For year 2026 -> "2026–27"
 * When the year changes to 2027 -> automatically becomes "2027–28"
 * When the year changes to 2028 -> automatically becomes "2028–29"
 */

export function getCurrentYear() {
  return new Date().getFullYear();
}

/**
 * Returns academic year string with en-dash (e.g. "2026–27", "2027–28")
 */
export function getAcademicYear(offset = 0) {
  const now = new Date();
  const year = now.getFullYear() + offset;
  const nextYearShort = String((year + 1) % 100).padStart(2, '0');
  return `${year}–${nextYearShort}`;
}

/**
 * Returns academic year string with standard hyphen (e.g. "2026-27", "2027-28")
 */
export function getAcademicYearHyphen(offset = 0) {
  const now = new Date();
  const year = now.getFullYear() + offset;
  const nextYearShort = String((year + 1) % 100).padStart(2, '0');
  return `${year}-${nextYearShort}`;
}

/**
 * Returns full 4-digit academic year string (e.g. "2026-2027", "2027-2028")
 */
export function getFullAcademicYear(offset = 0) {
  const now = new Date();
  const year = now.getFullYear() + offset;
  return `${year}-${year + 1}`;
}

/**
 * Returns default headline for admissions banner
 */
export function getAdmissionBannerTitle() {
  return `Admissions Open for Academic Year ${getAcademicYear()}`;
}

/**
 * Automatically formats dynamic announcement titles/messages to current academic year
 * if they contain older/hardcoded year strings like 2024-25, 2025-26, 2026-27.
 */
export function formatDynamicYears(text) {
  if (!text || typeof text !== 'string') return text;
  const currentAcademic = getAcademicYear();
  return text.replace(/20\d{2}[–-](?:20\d{2}|\d{2})/g, currentAcademic);
}
