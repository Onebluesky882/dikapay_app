-- เอวาริน (Awarin) menu, per Dev: made-to-order — pick a dish, then protein, size, and add-ons,
-- each priced individually. Prices are MOCK values (Dev: "mock ราคาได้ตามใจชอบ") — realistic
-- Thai street-food pricing, not the shop's actual menu. Update once Dev gives real numbers.
-- All amounts in satang (1 baht = 100 satang).

INSERT OR IGNORE INTO `menu_item` (`id`, `shop_id`, `name`, `base_price`, `is_active`, `created_at`, `updated_at`)
VALUES ('item_awarin_krapao', 'shop_awarin', 'กะเพรา', 5000, 1, unixepoch(), unixepoch()); -- 50.00 THB base

INSERT OR IGNORE INTO `modifier_group` (`id`, `menu_item_id`, `name`, `selection_type`, `is_required`, `created_at`, `updated_at`)
VALUES
  ('mg_awarin_krapao_protein', 'item_awarin_krapao', 'โปรตีน', 'single', 1, unixepoch(), unixepoch()),
  ('mg_awarin_krapao_size',    'item_awarin_krapao', 'ไซส์',    'single', 1, unixepoch(), unixepoch()),
  ('mg_awarin_krapao_topping', 'item_awarin_krapao', 'ท็อปปิ้ง', 'multiple', 0, unixepoch(), unixepoch());

INSERT OR IGNORE INTO `modifier_option` (`id`, `modifier_group_id`, `name`, `price_delta`, `created_at`, `updated_at`)
VALUES
  ('mo_awarin_krapao_moo_krob',       'mg_awarin_krapao_protein', 'หมูกรอบ',      1000, unixepoch(), unixepoch()), -- +10.00 THB
  ('mo_awarin_krapao_size_xl',        'mg_awarin_krapao_size',    'XL',           1500, unixepoch(), unixepoch()), -- +15.00 THB
  ('mo_awarin_krapao_bacon',          'mg_awarin_krapao_topping', 'ใส่เบคอน',     1500, unixepoch(), unixepoch()), -- +15.00 THB
  ('mo_awarin_krapao_straw_mushroom', 'mg_awarin_krapao_topping', 'ใส่เห็ดฟาง', 1000, unixepoch(), unixepoch()); -- +10.00 THB
