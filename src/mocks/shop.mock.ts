export const shops = [
  {
    id: "1",
    name: "ครัวบ้านสวน",
    rating: 4.7,
    shopOpen: true,
    table: [{ id: "t1", tableCode: "", status: "available" }],
    menus: [
      {
        id: "m1",
        name: "ข้าวผัด",
        price: 40,
        category: "อาหารจานเดียว",
        options: [
          {
            id: "หมู",
            name: "ระดับความเผ็ด",
            size: "ไม่เผ็ด",
            extraPrice: 0,
          },
          {
            id: "เนื้อ",
            name: "ระดับความเผ็ด",
            size: "เผ็ดมาก",
            extraPrice: 10,
          },
        ],
      },
      {
        id: "m2",
        name: "ข้าวผัดเนื้อ",
        price: 60,
        category: "อาหารจานเดียว",
      },
      {
        id: "m3",
        name: "ผัดไทกุ้งสด",
        price: 70,
        category: "เส้น",
        options: [
          {
            id: "spicy1",
            name: "ระดับความเผ็ด",
            size: "ไม่เผ็ด",
            extraPrice: 0,
          },
          {
            id: "spicy2",
            name: "ระดับความเผ็ด",
            size: "เผ็ดมาก",
            extraPrice: 0,
          },
        ],
      },
      {
        id: "m4",
        name: "ไข่ราวา",
        price: 25,
        category: "ท็อปปิ้ง",
        options: [
          {
            id: "egg1",
            name: "เพิ่มไข่",
            size: "ไข่ดาว",
            extraPrice: 10,
          },
        ],
      },
      {
        id: "m5",
        name: "ชาไทย",
        price: 35,
        category: "เครื่องดื่ม",
        options: [
          {
            id: "size_s",
            name: "ขนาดแก้ว",
            size: "Small",
            extraPrice: 0,
          },
          {
            id: "size_l",
            name: "ขนาดแก้ว",
            size: "Large",
            extraPrice: 10,
          },
        ],
      },
    ],
  },
];
