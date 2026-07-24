CREATE TABLE IF NOT EXISTS `payment` (
  `id` text PRIMARY KEY NOT NULL,
  `shop_id` text NOT NULL REFERENCES `shop`(`id`) ON DELETE CASCADE,
  `trans_ref` text NOT NULL UNIQUE,
  `amount` integer NOT NULL,
  `receiver_last4` text NOT NULL,
  `matches_wallet` integer NOT NULL,
  `raw_response` text NOT NULL,
  `created_at` integer NOT NULL
);
