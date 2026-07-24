-- Real example shop, per Dev: "เอวาริน" (Awarin) — 10 tables, 4 seats each, customers scan a
-- per-table QR to order. qr_token is what gets encoded into the physical QR code on each table.
INSERT INTO `shop` (`id`, `name`, `slug`, `created_at`, `updated_at`)
VALUES ('shop_awarin', 'เอวาริน', 'awarin', unixepoch(), unixepoch());

INSERT INTO `dining_table` (`id`, `shop_id`, `table_number`, `seats`, `qr_token`, `created_at`, `updated_at`)
VALUES
  ('table_awarin_01', 'shop_awarin', 1, 4, 'awarin-t01', unixepoch(), unixepoch()),
  ('table_awarin_02', 'shop_awarin', 2, 4, 'awarin-t02', unixepoch(), unixepoch()),
  ('table_awarin_03', 'shop_awarin', 3, 4, 'awarin-t03', unixepoch(), unixepoch()),
  ('table_awarin_04', 'shop_awarin', 4, 4, 'awarin-t04', unixepoch(), unixepoch()),
  ('table_awarin_05', 'shop_awarin', 5, 4, 'awarin-t05', unixepoch(), unixepoch()),
  ('table_awarin_06', 'shop_awarin', 6, 4, 'awarin-t06', unixepoch(), unixepoch()),
  ('table_awarin_07', 'shop_awarin', 7, 4, 'awarin-t07', unixepoch(), unixepoch()),
  ('table_awarin_08', 'shop_awarin', 8, 4, 'awarin-t08', unixepoch(), unixepoch()),
  ('table_awarin_09', 'shop_awarin', 9, 4, 'awarin-t09', unixepoch(), unixepoch()),
  ('table_awarin_10', 'shop_awarin', 10, 4, 'awarin-t10', unixepoch(), unixepoch());
