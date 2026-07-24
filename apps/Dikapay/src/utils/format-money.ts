// Every price from apps/api is satang (1 baht = 100 satang) — see packages/db's schema comments.
export function formatBaht(satang: number): string {
  const baht = satang / 100;
  return `฿${baht.toLocaleString("th-TH", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}
