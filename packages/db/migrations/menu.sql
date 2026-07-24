CREATE TABLE IF NOT EXISTS `menu_item` (
  `id` text PRIMARY KEY NOT NULL,
  `shop_id` text NOT NULL REFERENCES `shop`(`id`) ON DELETE CASCADE,
  `name` text NOT NULL,
  `base_price` integer NOT NULL,
  `description` text,
  `is_active` integer NOT NULL DEFAULT 1,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL
);

CREATE TABLE IF NOT EXISTS `modifier_group` (
  `id` text PRIMARY KEY NOT NULL,
  `menu_item_id` text NOT NULL REFERENCES `menu_item`(`id`) ON DELETE CASCADE,
  `name` text NOT NULL,
  `selection_type` text NOT NULL CHECK (`selection_type` IN ('single', 'multiple')),
  `is_required` integer NOT NULL DEFAULT 0,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL
);

CREATE TABLE IF NOT EXISTS `modifier_option` (
  `id` text PRIMARY KEY NOT NULL,
  `modifier_group_id` text NOT NULL REFERENCES `modifier_group`(`id`) ON DELETE CASCADE,
  `name` text NOT NULL,
  `price_delta` integer NOT NULL DEFAULT 0,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL
);
