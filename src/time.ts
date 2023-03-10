/* eslint-disable @typescript-eslint/no-magic-numbers */
import intervalToDuration from 'date-fns/intervalToDuration/index';

export const zeroPad = (num: number | undefined) => String(num).padStart(2, '0');

export const formatTimeLeft = (msLeft: number) => {
  const duration = intervalToDuration({ start: 0, end: msLeft });
  const formatted = [duration.hours, duration.minutes, duration.seconds].map(zeroPad).join(':');
  const days = duration.days != null && duration.days > 0 ? `${duration.days}d ` : '';
  const months = duration.months != null && duration.months > 0 ? `${duration.months}m ` : '';
  const years = duration.years != null && duration.years > 0 ? `${duration.years}a ` : '';
  return `${years}${months}${days}${formatted}`;
};
