CREATE TABLE IF NOT EXISTS `shop` (
  `id` text PRIMARY KEY NOT NULL,
  `name` text NOT NULL,
  `slug` text NOT NULL UNIQUE,
  `owner_user_id` text REFERENCES `user`(`id`),
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL
);

CREATE TABLE IF NOT EXISTS `dining_table` (
  `id` text PRIMARY KEY NOT NULL,
  `shop_id` text NOT NULL REFERENCES `shop`(`id`) ON DELETE CASCADE,
  `table_number` integer NOT NULL,
  `seats` integer NOT NULL,
  `qr_token` text NOT NULL UNIQUE,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL
);
