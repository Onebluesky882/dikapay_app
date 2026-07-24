import { RealMenuItem, ScannedTable } from "@/types/table-scan.type";
import { createRequest } from "..";

// Points at apps/api (Hono on Cloudflare Workers) — separate backend from EXPO_PUBLIC_AUTH,
// which is the existing Railway-hosted auth service. Not merged yet; see agentic/DECISIONS.md.
const DIKAPAY_API_URL = process.env.EXPO_PUBLIC_DIKAPAY_API!;

if (!DIKAPAY_API_URL) {
  throw new Error("No API EXPO_PUBLIC_DIKAPAY_API defined");
}

const dikapayRequest = createRequest(DIKAPAY_API_URL);

export const shopApi = {
  resolveTable: (qrToken: string): Promise<ScannedTable> =>
    dikapayRequest(`/api/tables/${qrToken}`),
  getShopMenu: (slug: string): Promise<RealMenuItem[]> =>
    dikapayRequest(`/api/shops/${slug}/menu`),
};
