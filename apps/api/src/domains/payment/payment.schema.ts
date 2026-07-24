import { z } from 'zod'

// qrCode is the raw payload decoded from the bank slip's QR — decoding the photo into this
// string is a client concern (Dikapay/Merchant app), not this API's job.
export const submitSlipSchema = z.object({
  qrCode: z.string().min(1),
})
