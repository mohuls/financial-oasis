
// Format currency (ILS)
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format date to Hebrew format
export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('he-IL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

// Get Hebrew month name
export const getHebrewMonth = (date: Date): string => {
  return date.toLocaleString('he-IL', { month: 'long' });
};

// Format percentage
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

// Get current month in YYYY-MM format
export const getCurrentMonth = (): string => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};

// Get previous month in YYYY-MM format
export const getPreviousMonth = (): string => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};

// Get month range (first and last day of month)
export const getMonthRange = (yearMonth: string): { start: string; end: string } => {
  const [year, month] = yearMonth.split('-').map(Number);
  const start = new Date(year, month - 1, 1).toISOString().split('T')[0];
  const end = new Date(year, month, 0).toISOString().split('T')[0];
  return { start, end };
};

// Compare two dates (useful for sorting)
export const compareDates = (a: string, b: string): number => {
  return new Date(a).getTime() - new Date(b).getTime();
};

// Format numbers with comma separators
export const formatNumber = (num: number): string => {
  return num.toLocaleString('he-IL');
};

// Get relative time (e.g., "לפני 3 ימים")
export const getRelativeTime = (date: string): string => {
  const now = new Date();
  const then = new Date(date);
  const diff = now.getTime() - then.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'היום';
  if (days === 1) return 'אתמול';
  if (days < 7) return `לפני ${days} ימים`;
  if (days < 30) return `לפני ${Math.floor(days / 7)} שבועות`;
  if (days < 365) return `לפני ${Math.floor(days / 30)} חודשים`;
  return `לפני ${Math.floor(days / 365)} שנים`;
};
