export interface Product {
  id: string;
  name: string;
  category: "languages" | "tech" | "business" | "science" | "combo";
  categoryName: string;
  price: number;
  originalPrice?: number;
  tag?: string;
  rating: number;
  reviewCount: number;
  durationSeconds: number; // Thời gian nạp tri thức
  description: string;
  image: string;
  highlights: string[];
  specs: {
    retentionRate: string; // Tỷ lệ thẩm thấu
    suitableFor: string;
    version: string;
    updatePolicy: string;
  };
}

export const CATEGORIES = [
  { id: "all", label: "Tất cả lĩnh vực" },
  { id: "languages", label: "Ngôn ngữ toàn cầu" },
  { id: "tech", label: "Công nghệ & AI" },
  { id: "business", label: "Kinh doanh & Tài chính" },
  { id: "science", label: "Khoa học & Não bộ" },
  { id: "combo", label: "Gói Combo Siêu Cấp" },
] as const;

export const PRODUCTS: Product[] = [
  {
    id: "polyglot-mastery",
    name: "Ống Tiêm 10 Ngoại Ngữ Cấp Tốc",
    category: "languages",
    categoryName: "Ngôn ngữ",
    price: 18900000,
    originalPrice: 25000000,
    tag: "Bán chạy nhất",
    rating: 4.9,
    reviewCount: 342,
    durationSeconds: 15,
    description: "Nạp trực tiếp phản xạ bản ngữ 10 thứ tiếng (Anh, Trung, Nhật, Hàn, Đức, Pháp, Tây Ban Nha, Ý, Nga, Ả Rập) vào vùng ngôn ngữ não bộ Broca và Wernicke.",
    image: "/prod-2.png",
    highlights: [
      "Đạt trình độ tương đương C1/C2 quốc tế ngay sau khi hấp thụ",
      "Phản xạ ngữ âm, ngữ điệu chuẩn người bản xứ",
      "Vốn từ vựng hơn 45.000 từ mỗi ngôn ngữ",
      "Thời gian truyền tải: 15 giây"
    ],
    specs: {
      retentionRate: "99.8% trọn đời",
      suitableFor: "Du học sinh, chuyên viên quốc tế, doanh nhân",
      version: "Synapse-v5.2",
      updatePolicy: "Cập nhật tiếng lóng & từ mới mỗi năm qua Neuro-Sync",
    },
  },
  {
    id: "ai-super-engineer",
    name: "Ống Tiêm Siêu Kỹ Sư AI & Fullstack",
    category: "tech",
    categoryName: "Công nghệ & AI",
    price: 29500000,
    originalPrice: 38000000,
    tag: "Khuyên dùng",
    rating: 5.0,
    reviewCount: 289,
    durationSeconds: 20,
    description: "Bộ vi mạch tri thức chứa toàn bộ kiến trúc máy học, Deep Learning, LLM fine-tuning, thuật toán phân tán và kinh nghiệm 15 năm thiết kế hệ thống chịu tải triệu CCU.",
    image: "/prod-3.png",
    highlights: [
      "Thấu suốt toàn bộ cấu trúc Transformer, Diffusion, Agentic AI",
      "Thực chiến thiết kế hệ thống vi dịch vụ (Microservices), Kubernetes, Cloud",
      "Tối ưu code ở mức nhị phân và compiler",
      "Thời gian truyền tải: 20 giây"
    ],
    specs: {
      retentionRate: "99.9%",
      suitableFor: "Kỹ sư phần mềm, CTO, Tech Lead muốn bứt phá đỉnh cao",
      version: "QuantumDev-2026.4",
      updatePolicy: "Đồng bộ mô hình kiến trúc mới nhất hàng quý",
    },
  },
  {
    id: "wall-street-quant",
    name: "Ống Tiêm Định Lượng & Đầu Tư Tài Chính",
    category: "business",
    categoryName: "Kinh doanh & Tài chính",
    price: 36000000,
    originalPrice: 45000000,
    tag: "Độc quyền",
    rating: 4.95,
    reviewCount: 178,
    durationSeconds: 18,
    description: "Kế thừa tư duy phân tích của các quỹ phòng hộ hàng đầu Wall Street: định giá tài sản, phân tích chu kỳ vĩ mô, giao dịch thuật toán và quản trị rủi ro đa thị trường.",
    image: "/prod-4.png",
    highlights: [
      "Bộ dữ liệu phân tích mô hình tài chính 50 năm qua",
      "Kỹ năng lập trình giao dịch định lượng (Quant Trading)",
      "Tư duy tâm lý giao dịch vững vàng trước biến động cực đại",
      "Thời gian truyền tải: 18 giây"
    ],
    specs: {
      retentionRate: "99.7%",
      suitableFor: "Nhà đầu tư, Trader, Chuyên gia phân tích tài chính",
      version: "QuantMacro-3.1",
      updatePolicy: "Cập nhật luật tài chính toàn cầu liên tục",
    },
  },
  {
    id: "neuroscience-medicine",
    name: "Ống Tiêm Y Khoa & Thần Kinh Học Toàn Thư",
    category: "science",
    categoryName: "Khoa học & Não bộ",
    price: 49000000,
    originalPrice: 65000000,
    tag: "Chuyên sâu",
    rating: 4.98,
    reviewCount: 112,
    durationSeconds: 25,
    description: "Tích hợp toàn bộ giải phẫu học, dược lý học, sinh học phân tử và phản xạ vi phẫu thuật chuyên khoa thần kinh.",
    image: "/prod-1.png",
    highlights: [
      "Chuẩn đoán triệu chứng phức tạp với độ chính xác tuyệt đối",
      "Ghi nhớ cấu trúc 10.000+ hợp chất dược lý",
      "Kỹ năng phản xạ vi phẫu mô phỏng độ chính xác micron",
      "Thời gian truyền tải: 25 giây"
    ],
    specs: {
      retentionRate: "99.95%",
      suitableFor: "Bác sĩ, nghiên cứu sinh, chuyên gia y sinh",
      version: "MedBio-Ultra-8",
      updatePolicy: "Bảo hành đồng bộ y văn quốc tế mới nhất",
    },
  },
  {
    id: "ceo-leadership",
    name: "Ống Tiêm Quản Trị Cấp Cao & Đàm Phán",
    category: "business",
    categoryName: "Kinh doanh & Tài chính",
    price: 22000000,
    originalPrice: 28000000,
    rating: 4.88,
    reviewCount: 204,
    durationSeconds: 12,
    description: "Nắm vững nghệ thuật đàm phán đỉnh cao, quản trị nhân sự quy mô lớn, chiến lược M&A và đọc vị tâm lý đối tác trong nháy mắt.",
    image: "/prod-6.png",
    highlights: [
      "100+ case study chiến lược của các tập đoàn Fortune 500",
      "Phương pháp quản trị động lực nhân sự tân tiến",
      "Nghệ thuật thương thuyết chuẩn FBI và Harvard",
      "Thời gian truyền tải: 12 giây"
    ],
    specs: {
      retentionRate: "99.6%",
      suitableFor: "Nhà sáng lập, Giám đốc điều hành, Nhà ngoại giao",
      version: "ExecLead-v4",
      updatePolicy: "Hỗ trợ tái nạp miễn phí trong 3 năm",
    },
  },
  {
    id: "infinite-knowledge-capsule",
    name: "Gói Vô Hạn: Toàn Bộ Tri Thức Nhân Loại",
    category: "combo",
    categoryName: "Combo Siêu Cấp",
    price: 199900000,
    originalPrice: 250000000,
    tag: "Đỉnh cao tuyệt đối",
    rating: 5.0,
    reviewCount: 95,
    durationSeconds: 60,
    description: "Tuyệt tác ống tiêm tổng hợp toàn diện: Khoa học, Nghệ thuật, Triết học, Vũ trụ học, Toàn bộ ngôn ngữ và Kỹ thuật tối tân. Cập nhật trọn đời qua vệ tinh sinh học.",
    image: "/prod-5.png",
    highlights: [
      "Không giới hạn số lần nạp và chia sẻ cho gia đình",
      "Bộ vỏ kim loại titan nguyên khối mạ vàng sang trọng",
      "Kèm buồng ổn định sóng não Neuro-Pod độc quyền",
      "Thời gian truyền tải: 60 giây"
    ],
    specs: {
      retentionRate: "100% vĩnh viễn",
      suitableFor: "Những cá nhân tiên phong định hình tương lai",
      version: "OmniMind-Omega",
      updatePolicy: "Truyền dẫn dữ liệu cập nhật theo thời gian thực",
    },
  },
];

export function formatVND(amount: number): string {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
}
