# AZITHUN — DESIGN SYSTEM & PROJECT SPEC

> Nền tảng xem phim và nghe audio trả phí theo thời hạn.
> Đây là **nguồn sự thật duy nhất** để dựng giao diện. Nếu có mâu thuẫn với PRD cũ, **file này thắng**.
> Phạm vi hiện tại: **thiết kế thị giác (màu sắc, form, component, trang)**. Các danh mục chức năng giữ đúng như đã thống nhất, không tự thêm.

---

## 1. PHẠM VI VÀ NGUYÊN TẮC

### 1.1 Trong phạm vi (MVP)

- Hai loại nội dung do **Admin** đăng: **Phim** (phim lẻ, phim bộ) và **Audio** (mp3, chia tập).
- Hai role: `USER` và `ADMIN`. Không có role Creator.
- Trả phí theo **thời hạn** (Mô hình A): 3 gói **1 ngày / 1 tháng / 6 tháng**, trả trước, không tự gia hạn, mua khi còn hạn thì **cộng dồn**.
- Paywall ở tầng phát: chưa đăng nhập, chưa có gói, hết hạn, vượt giới hạn thiết bị, lỗi lấy link phát.
- Thanh toán qua cổng **VNPay** và **MoMo**.
- Thư viện (yêu thích, tiếp tục xem/nghe, lịch sử), thông báo, banner nhắc hết hạn (còn ≤ 3 ngày), hồ sơ, thiết bị đăng nhập.
- Admin dashboard nằm trong profile: nội dung, thể loại/tag, gói cước, đơn hàng, người dùng, nhật ký, thống kê.

### 1.2 Ngoài phạm vi (KHÔNG code, KHÔNG vẽ giao diện cho các mục này)

Hồ sơ thành viên (Profiles) · AI Match % · AI Smart Search · AI lồng tiếng · Live Radio · Spatial Audio 360 · gói theo tầng (Cơ bản/Tiêu chuẩn/VIP) · quảng cáo · hóa đơn điện tử · comment / rating / report · playlist · so sánh gói · mọi cam kết về 4K, Dolby Vision, Dolby Atmos, FLAC.

Các mục **chưa chốt** (chừa chỗ trong design system nhưng chưa dựng): thanh lọc tâm trạng (Mood Filter), mã giảm giá, hoàn tiền, HLS nhiều chất lượng, số luồng đồng thời theo từng gói.

### 1.3 Nguyên tắc thiết kế

1. **Dark Cinematic.** Nền tối nhiều tầng, ảnh bìa là nhân vật chính, phần giao diện (chrome) lùi lại.
2. **Dành sự nổi bật cho một chỗ: Hero billboard.** Mọi thứ xung quanh giữ yên tĩnh và kỷ luật.
3. **Một màu nhấn chủ đạo (đỏ) cho hành động chính.** Cyan và mint chỉ mang nghĩa (Premium, Miễn phí, thông tin), không dùng để trang trí.
4. **Chuyển động ít và có lý do.** Chỉ một chuyển động vào trang (Hero). Còn lại là phản hồi cho thao tác của người dùng.
5. **Không mượn diện mạo của thương hiệu khác.** Không dùng đúng mã đỏ `#E50914`, không copy kiểu số Top 10 khổng lồ, không nhắc tên đối thủ trong giao diện.
6. **Không cam kết thứ nền tảng không có.** Giao diện không được ghi chuẩn hình ảnh, âm thanh, hay chứng nhận bảo mật mà hệ thống không thực sự đạt.
7. **Chất lượng nền:** responsive từ mobile, focus bàn phím luôn thấy được, tôn trọng `prefers-reduced-motion`, đủ tương phản.

---

## 2. CẤU TRÚC PROJECT

Hai nhánh chính: **`client`** (Frontend) và **`server`** (Backend), quản lý bằng pnpm workspace.

```
azithun/
├─ client/                     # Frontend: Next.js (App Router) + TypeScript
│  ├─ public/                  # ảnh tĩnh, favicon, ảnh placeholder
│  ├─ src/
│  │  ├─ app/
│  │  │  ├─ (public)/          # home, movies, audio, genres/[slug], search, pricing
│  │  │  ├─ (auth)/            # login, register, verify-email, forgot-password, reset-password
│  │  │  ├─ (user)/            # library, notifications, profile, checkout/[orderId]
│  │  │  ├─ (player)/          # watch/[slug]/[episode], listen/[slug]/[episode]
│  │  │  ├─ (admin)/profile/admin/   # dashboard, contents, taxonomy, plans, orders, users, audit-logs, analytics
│  │  │  ├─ design-system/     # trang showcase toàn bộ component (chỉ môi trường dev)
│  │  │  ├─ layout.tsx         # font, provider, MiniPlayer đặt ở đây
│  │  │  ├─ not-found.tsx, error.tsx
│  │  │  └─ globals.css        # design tokens (CSS variables)
│  │  ├─ components/
│  │  │  ├─ ui/                # primitives (shadcn/ui)
│  │  │  ├─ layout/            # Header, Footer, MobileBottomNav, AppShell, AdminShell...
│  │  │  └─ shared/            # ContentCard, ContentRail, EmptyState...
│  │  ├─ features/             # auth, catalog, player, library, billing, notifications, admin
│  │  ├─ lib/                  # api client, query client, utils, guards, contracts (type + zod)
│  │  ├─ stores/               # Zustand (player store, ui store)
│  │  ├─ hooks/
│  │  └─ mocks/                # MSW handlers + seed data
│  ├─ .env.local.example       # NEXT_PUBLIC_API_URL=http://localhost:5000/api
│  └─ package.json
├─ server/                     # Backend: Express (CommonJS) + Mongoose
│  ├─ src/
│  │  ├─ config/               # env, db, storage (S3-compatible)
│  │  ├─ modules/              # auth, users, contents, episodes, media, genres, plans,
│  │  │                        # payments, entitlements, library, notifications,
│  │  │                        # play, analytics, audit-logs
│  │  ├─ middlewares/          # auth, requireRole, validate (zod), rateLimit, errorHandler
│  │  ├─ services/             # mail, storage, mediaInspector, paymentProviders
│  │  ├─ routes/               # gắn route theo module, prefix /api
│  │  ├─ utils/
│  │  ├─ app.js, server.js
│  ├─ tests/
│  ├─ .env.example
│  └─ package.json
├─ docker-compose.yml          # MongoDB 27017, MinIO 9000/9001
├─ pnpm-workspace.yaml         # packages: [client, server]
├─ package.json                # scripts gốc: dev, lint, build, test
├─ design.md                   # file này
└─ README.md
```

**Cổng chạy local:** client `3000` · server `5000` · MongoDB `27017` · MinIO `9000` (API) / `9001` (console).

**Kiểu dữ liệu dùng chung:** vì chỉ có hai nhánh, hợp đồng dữ liệu tạm đặt tại `client/src/lib/contracts` (TypeScript type + Zod) và `server` có validator riêng, hai bên phải khớp nhau. Nếu sau này thấy khó đồng bộ thì thêm thư mục `shared/` vào workspace.

---

## 3. CÔNG NGHỆ

| Lớp | Công nghệ | Ghi chú |
|---|---|---|
| Framework web | Next.js (App Router) + TypeScript | Trang public render phía server để có SEO |
| Style | Tailwind CSS + CSS variables (token ở mục 4) | Đặt tên biến theo chuẩn shadcn/ui |
| UI primitives | shadcn/ui (Radix) + lucide-react | Sửa lại theo token, không giữ giao diện mặc định |
| Dữ liệu server | TanStack Query | |
| State client | Zustand | Chỉ dùng cho player và UI toàn cục |
| Form | React Hook Form + Zod | |
| Player | Vidstack (video + audio), hls.js khi có HLS | |
| Hiệu ứng | Motion (framer-motion) | Dùng tiết kiệm, xem mục 4.7 |
| Biểu đồ | Recharts | Chỉ cho Admin |
| Ngày giờ | date-fns | Hiển thị hạn gói, thời gian tương đối |
| Mock | MSW | Dựng giao diện khi chưa có backend |
| Test | Vitest + Testing Library, Playwright | |
| Backend | Node.js + Express (CommonJS), Mongoose + MongoDB, Zod | Giữ nền của dự án cũ |
| Auth | JWT access + refresh (cookie httpOnly), OTP email | |
| Media | MinIO (dev), Cloudflare R2 / S3 (production) qua AWS SDK v3; ffprobe kiểm tra file | Upload thẳng bằng presigned URL |
| Thanh toán | VNPay, MoMo (adapter riêng cho từng cổng) | Xác nhận bằng webhook, không tin frontend |
| Công cụ | pnpm, ESLint, Prettier, Docker Compose | Khóa version ở bản ổn định mới nhất khi khởi tạo |

---

## 4. DESIGN TOKENS

Website **chỉ có giao diện tối** ở MVP: đặt `color-scheme: dark`, không làm theme sáng.

### 4.1 Màu sắc

**Bề mặt (tối dần lên sáng dần)**

| Token | Hex | Dùng cho |
|---|---|---|
| `surface-base` | `#0D0E15` | Nền trang |
| `surface-card` | `#1A1B22` | Card, panel, ô nhập |
| `surface-raised` | `#282A36` | Viền, nền hover, dropdown, phân cách |
| `surface-bright` | `#383941` | Điểm sáng, viền nhấn mạnh, thanh trượt (track) |

**Chữ**

| Token | Hex | Dùng cho |
|---|---|---|
| `text-primary` | `#F4F5F9` | Tiêu đề, nội dung chính |
| `text-secondary` | `#A9ABBC` | Mô tả, thông tin phụ |
| `text-muted` | `#8B8DA0` | Chú thích, placeholder (chỉ cho nội dung không thiết yếu) |
| `text-disabled` | `#5A5C6E` | Trạng thái vô hiệu |

**Thương hiệu và ngữ nghĩa**

| Token | Hex | Dùng cho |
|---|---|---|
| `primary` | `#E5162A` | Nền nút chính (chữ trắng đạt tương phản khoảng 4.7:1) |
| `primary-hover` | `#F5333F` | Hover nút chính |
| `primary-pressed` | `#C21224` | Nhấn nút chính |
| `brand` | `#FF1E27` | Icon, chữ nhấn, thanh tiến độ, glow (dùng trên nền tối, không dùng làm nền nút chữ trắng) |
| `cyan` | `#00F0FF` | Nhãn Premium, thông tin, **vòng focus** |
| `mint` | `#00DF81` | Nhãn Miễn phí, thành công |
| `warning` | `#FFB020` | Banner sắp hết hạn, đơn đang chờ |
| `danger` | `#FF5C6C` | Lỗi, hành động xóa/thu hồi (luôn kèm icon và chữ, không dựa vào màu) |

> Nếu muốn đổi sắc đỏ cho khác hẳn, chỉ cần sửa `primary`, `primary-hover`, `primary-pressed`, `brand` (bốn dòng trong `globals.css`).

**Lớp phủ và gradient**

- `scrim`: `rgba(13, 14, 21, 0.72)` cho lớp nền của modal và drawer.
- `hero-fade-bottom`: `linear-gradient(to top, #0D0E15 0%, rgba(13,14,21,0.85) 25%, rgba(13,14,21,0) 70%)`.
- `hero-fade-left`: `linear-gradient(to right, rgba(13,14,21,0.9) 0%, rgba(13,14,21,0) 60%)`.
- `card-fade`: `linear-gradient(to top, rgba(13,14,21,0.9), rgba(13,14,21,0) 60%)` (chữ đè lên ảnh).

### 4.2 Biến CSS (`client/src/app/globals.css`)

Đặt tên theo chuẩn shadcn/ui để các component sinh ra tự dùng đúng token.

```css
:root {
  color-scheme: dark;

  /* shadcn/ui semantic tokens */
  --background: #0D0E15;
  --foreground: #F4F5F9;
  --card: #1A1B22;
  --card-foreground: #F4F5F9;
  --popover: #1A1B22;
  --popover-foreground: #F4F5F9;
  --primary: #E5162A;
  --primary-foreground: #FFFFFF;
  --secondary: #282A36;
  --secondary-foreground: #F4F5F9;
  --muted: #1A1B22;
  --muted-foreground: #8B8DA0;
  --accent: #282A36;
  --accent-foreground: #F4F5F9;
  --destructive: #FF5C6C;
  --destructive-foreground: #0D0E15;
  --border: #282A36;
  --input: #282A36;
  --ring: #00F0FF;

  /* Azithun tokens */
  --surface-base: #0D0E15;
  --surface-card: #1A1B22;
  --surface-raised: #282A36;
  --surface-bright: #383941;
  --text-primary: #F4F5F9;
  --text-secondary: #A9ABBC;
  --text-muted: #8B8DA0;
  --text-disabled: #5A5C6E;
  --primary-hover: #F5333F;
  --primary-pressed: #C21224;
  --brand: #FF1E27;
  --cyan: #00F0FF;
  --mint: #00DF81;
  --warning: #FFB020;
  --success: #00DF81;
  --info: #00F0FF;
  --scrim: rgba(13, 14, 21, 0.72);

  /* radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-pill: 999px;

  /* motion */
  --dur-fast: 120ms;
  --dur-base: 200ms;
  --dur-slow: 360ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
}
```

Nếu dùng Tailwind v4 thì khai báo lại các biến này trong khối `@theme inline` để sinh utility (`bg-surface-card`, `text-text-secondary`, `border-border`...). Nếu dùng Tailwind v3 thì ánh xạ vào `tailwind.config`.

### 4.3 Typography

- **Font:** Plus Jakarta Sans qua `next/font/google`, bật subset `latin`, `latin-ext`, `vietnamese`. Dùng trọng số 400, 500, 600, 700, 800 (font này dừng ở 800; kiểm tra lại trên Google Fonts khi cài). **Kiểm tra dấu tiếng Việt hiển thị đúng** ở mọi cỡ chữ.
- **Quy tắc chữ:** viết hoa đầu câu (sentence case), **không** viết HOA toàn bộ cho nhãn hay tiêu đề, không thêm nhãn nhỏ phía trên tiêu đề nếu không có thông tin thật.
- Độ dài dòng của đoạn mô tả **≤ 72 ký tự**.

| Vai trò | Desktop | Mobile | Trọng số | Ghi chú |
|---|---|---|---|---|
| Display (tiêu đề Hero) | 56/60 | 34/40 | 800 | letter-spacing -0.02em |
| H1 | 40/48 | 30/38 | 700 | |
| H2 | 30/38 | 24/32 | 700 | Tiêu đề dải nội dung |
| H3 | 22/30 | 20/28 | 600 | |
| H4 | 18/26 | 16/24 | 600 | |
| Body L | 18/28 | 16/26 | 400 | Mô tả phim ở trang chi tiết |
| Body | 16/26 | 15/24 | 400 | |
| Body S | 14/22 | 14/22 | 400 | |
| Caption | 12/18 | 12/18 | 500 | |
| Button | 14/20 | 14/20 | 600 | |

### 4.4 Khoảng cách và lưới

- Thang 4px: `4, 8, 12, 16, 24, 32, 48, 64, 96`.
- Container tối đa `1440px`; padding ngang `16px` (mobile) / `24px` (tablet) / `48px` (desktop).
- Khoảng cách giữa các dải nội dung: `32px` (mobile) / `48px` (desktop).

### 4.5 Bo góc (theo cấp bậc, không dùng một số cho mọi thứ)

| Cấp | Giá trị | Dùng cho |
|---|---|---|
| sm | `4px` | Badge, thanh tiến độ |
| md | `8px` | Nút, ô nhập, card, ảnh bìa |
| lg | `12px` | Dialog, drawer, panel lớn, PlanCard |
| pill | `999px` | Chip thể loại, avatar, nút tròn của player |

### 4.6 Độ nổi (elevation)

| Cấp | Dùng cho | Hiệu ứng |
|---|---|---|
| 0 | Card thường | Chỉ có viền `border` |
| 1 | Card khi hover / focus | Viền `surface-bright`, bóng `0 8px 24px rgba(0,0,0,.45)` |
| 2 | Dropdown, popover | Nền `surface-card`, viền, bóng `0 12px 32px rgba(0,0,0,.55)` |
| 3 | Dialog, drawer | Bóng `0 24px 64px rgba(0,0,0,.6)`, nền phía sau `scrim` + blur 12px |
| Glow | **Chỉ** nút chính trong Hero | `0 0 24px rgba(255,30,39,.35)` |

### 4.7 Chuyển động

- Thời lượng: `120ms` (hover, nhấn) · `200ms` (mở dropdown, đổi tab) · `360ms` (dialog, drawer, hero).
- Easing chuẩn: `cubic-bezier(0.2, 0, 0, 1)`.
- **Chuyển động vào trang:** chỉ Hero (fade và slow pan nhẹ của ảnh nền). Các dải nội dung **không** trượt lên từng cái một.
- **Hover card:** không phóng to. Hiện viền sáng, lớp phủ gradient và nút Play tròn ở giữa.
- Cuộn ngang dùng `scroll-snap`.
- Khi `prefers-reduced-motion: reduce`: tắt slow pan, tắt tự phát trailer, thay hiệu ứng bằng đổi trạng thái tức thì.

### 4.8 Breakpoint và z-index

- Breakpoint (mobile-first): `sm 640` · `md 768` · `lg 1024` · `xl 1280` · `2xl 1536`.
- z-index: content `0` · header dính `40` · mini-player `50` · dropdown/popover `60` · drawer/sheet `70` · modal `80` · toast `90`.

### 4.9 Icon và hình ảnh

- Icon: `lucide-react`, nét `1.75`, cỡ `16 / 20 / 24` (nút của player dùng `24 / 28`).
- Tỉ lệ ảnh: poster phim `2:3` · bìa audio `1:1` · backdrop Hero `16:9` · thumbnail tập `16:9`.
- Dùng `next/image`; chỉ ảnh Hero có `priority`; các ảnh còn lại lazy, có `blurDataURL` hoặc skeleton.
- Ảnh chưa có: nền `surface-card` kèm icon phim/loa mờ ở giữa, không dùng ảnh lỗi của trình duyệt.

---

## 5. LAYOUT

| Thành phần | Desktop | Mobile |
|---|---|---|
| Header | Cao `64px`, trong suốt ở đầu trang, chuyển sang nền `surface-base` + blur khi cuộn | Cao `56px` |
| Bottom nav | Không có | Cao `64px` + safe-area, 5 tab |
| Banner hết hạn | Dải mỏng ngay dưới Header | Như desktop, chữ xuống dòng |
| MiniPlayer | Cao `72px`, cố định đáy | Nằm **trên** bottom nav |
| Hero (Home) | Cao `70vh`, tối thiểu `480px`, tối đa `760px` | Cao `60vh` |
| Lưới nội dung | 6 cột (`xl`) · 5 (`lg`) · 4 (`md`) · 3 (`sm`) · 2 (mobile) | |
| Card trong Rail | Poster rộng `160 / 180 / 200 / 220px` theo breakpoint | Rộng `128px` |
| Sidebar Admin | `260px`, có thể thu gọn `72px` | Thành drawer |

---

## 6. MENU VÀ ĐIỀU HƯỚNG

| Vị trí | Mục |
|---|---|
| **Header (desktop)** | Logo · Trang chủ · Phim (Phim lẻ, Phim bộ) · Audio · Thể loại (mega menu) · Bảng giá · Ô tìm kiếm · Chuông thông báo · Avatar / nút Đăng nhập |
| **Menu avatar (user)** | Hồ sơ · Thư viện · Gói của tôi · Lịch sử thanh toán · Thông báo · Đăng xuất |
| **Menu avatar (admin)** | Như user, thêm **Quản trị** |
| **Mobile bottom nav** | Trang chủ · Phim · Audio · Thư viện · Hồ sơ |
| **Mobile drawer** | Thể loại · Bảng giá · Đăng xuất |
| **Footer** | Giới thiệu · Điều khoản sử dụng · Chính sách bảo mật · Chính sách thanh toán · Liên hệ |
| **Tab Thư viện** | Yêu thích · Đang xem/nghe · Lịch sử |
| **Tab Hồ sơ** | Thông tin cá nhân · Gói của tôi · Thanh toán · Thiết bị · Bảo mật |
| **Sidebar Admin** | Tổng quan · Nội dung (Phim, Audio) · Thể loại và Tag · Gói cước · Đơn hàng và doanh thu · Người dùng · Nhật ký hoạt động · Thống kê |

Mục đang mở: chữ `text-primary`, có thanh nhấn `brand` dày `2px`. Mục thường: `text-secondary`.

---

## 7. COMPONENT

Mỗi component phải có đủ trạng thái: `default`, `hover`, `focus-visible`, `active`, `disabled`, và `loading` / `error` nếu có ý nghĩa. Mọi component phải xuất hiện trong trang `/design-system`.

Ưu tiên: **P0** (làm trước, giai đoạn F0–F3) · **P1** (F4–F5) · **P2** (F6–F7).

### 7.1 Primitives (P0)

| Component | Đặc tả |
|---|---|
| **Button** | Biến thể: `primary` (nền `primary`), `secondary` (nền `surface-raised`), `outline`, `ghost`, `danger`, `icon`. Cỡ: `sm 32px`, `md 40px`, `lg 48px`. Bo `8px`. Có trạng thái `loading` (spinner thay icon, giữ nguyên độ rộng) |
| **Input / Textarea / PasswordInput** | Cao `44px`, nền `surface-card`, viền `border`; `focus` viền `ring` (cyan); `error` viền `danger` + thông báo bên dưới |
| **OTPInput** | 6 ô, tự nhảy ô, dán được cả chuỗi, có đếm ngược "Gửi lại mã" |
| **Select, Combobox, Checkbox, Radio, Switch, Slider** | Theo shadcn/ui, thay màu theo token; Slider dùng cho tiến độ và âm lượng |
| **FormField** | Nhãn, ô nhập, gợi ý, lỗi (lỗi dùng icon + chữ) |
| **Badge, Chip** | Badge bo `4px`; Chip bo `pill`; có màu ngữ nghĩa |
| **Avatar** | Ảnh hoặc chữ cái đầu; cỡ `24 / 32 / 40 / 64` |
| **Tooltip, Popover, DropdownMenu** | Độ nổi cấp 2 |
| **Dialog, Drawer (Sheet)** | Độ nổi cấp 3; Drawer dùng cho mobile và Admin |
| **Tabs, Accordion, Breadcrumb, Pagination** | |
| **Toast** | Thành công, lỗi, cảnh báo, thông tin; tự tắt sau 4–6 giây |
| **Alert / Banner** | Cùng bộ màu ngữ nghĩa |
| **Progress, Skeleton, Spinner** | Skeleton dùng `surface-card` → `surface-raised`, **không** nhấp nháy khi `reduced-motion` |
| **Table, Separator, ScrollArea** | |
| **EmptyState, ErrorState** | Icon mờ + một dòng nói rõ chuyện gì xảy ra + một nút hành động |

### 7.2 Layout (P0)

`AppShell`, `Header` (trong suốt → đặc khi cuộn), `MobileBottomNav`, `Footer`, `Container`, `PageHeader`, `ProfileSidebar`, `ContentGrid`, `Rail` (cuộn ngang, snap, nút trái/phải chỉ hiện khi hover trên desktop).

### 7.3 Nội dung (P0)

| Component | Đặc tả |
|---|---|
| **ContentCard** | Phim: poster `2:3`; Audio: bìa vuông `1:1`. Bo `8px`, viền `border`. Tiêu đề 1 dòng cắt bằng dấu "…" (`14/22`, `600`), dòng phụ `12/18` `text-muted`. Góc trên trái: **AccessBadge**. Hover/focus: viền `surface-bright`, `card-fade`, nút Play tròn `44px` nền `primary` ở giữa. Biến thể: `default`, `compact` (danh sách), `wide` (16:9, dùng cho "Tiếp tục xem"). Có thanh tiến độ `3px` màu `brand` ở đáy khi là "Tiếp tục" |
| **ContentRail** | Tiêu đề H2 bên trái, "Xem tất cả" bên phải (`text-secondary`), Rail phía dưới. Có skeleton |
| **HeroBanner** | Backdrop 16:9 + `hero-fade-bottom` + `hero-fade-left`; tiêu đề Display, mô tả tối đa 3 dòng, hàng chip thể loại, nút **Xem ngay** / **Nghe ngay** (nút chính, có glow), **Chi tiết**, **Yêu thích**. Chỉ có ở đây mới có chuyển động vào trang |
| **AccessBadge** | `Miễn phí` (nền mint 15%, chữ `mint`), `Premium` (nền cyan 15%, chữ `cyan`), `Khóa` (nền `surface-raised`, chữ `text-secondary`, icon khóa) |
| **StatusChip nội dung** | `Mới`, `Có tập mới`, `Hoàn thành` (nhỏ, nền `surface-raised`) |
| **GenreChip / GenreCard** | Chip cho lọc; Card cho trang thể loại |
| **SearchBar** | Ô tìm ở Header (desktop) hoặc toàn màn hình (mobile); gợi ý bên dưới; trạng thái rỗng và không có kết quả |
| **FilterBar, SortSelect** | Lọc theo loại, thể loại, Miễn phí/Premium; sắp xếp theo mới nhất, xem nhiều |
| **ContentDetailHeader** | Backdrop mờ, poster, tiêu đề H1, meta (năm, thời lượng hoặc số tập, thể loại), mô tả Body L, nút Xem/Nghe, Yêu thích |
| **EpisodeList / EpisodeItem** | Hàng: thumbnail `16:9` (120×68) · số tập · tiêu đề · thời lượng · biểu tượng trạng thái. Trạng thái: `đang phát` (nền `surface-raised`, thanh `brand` bên trái), `đã xem` (dấu tích, chữ mờ), `miễn phí`, `premium`, `khóa` (icon khóa) |
| **FavoriteButton** | Chưa thích / đã thích / đang xử lý |

### 7.4 Player (P0)

| Component | Đặc tả |
|---|---|
| **VideoPlayer** | Vidstack. Điều khiển: play/pause, tua ±10 giây, thanh tiến độ, âm lượng, tốc độ, toàn màn hình, tập tiếp theo. Chất lượng và phụ đề chỉ hiện khi dữ liệu có. Điều khiển tự ẩn sau 3 giây không thao tác. Phím tắt: `Space` phát/dừng, `←/→` tua, `↑/↓` âm lượng, `M` tắt tiếng, `F` toàn màn hình |
| **AudioPlayer (mở rộng)** | Bìa lớn, tên tập, thanh tiến độ, tua ±15 giây, tốc độ, danh sách tập |
| **MiniPlayer** | Cố định đáy, bìa nhỏ, tên, Play/Pause, tua, thanh tiến độ mảnh, nút mở rộng, nút đóng. Nằm trong `app/layout.tsx` để không mất khi chuyển trang |
| **UpNext** | Hiện cuối tập: tên tập kế, đếm ngược 10 giây, nút **Phát ngay** và **Hủy** |
| **PaywallGate** | Phủ lên khung player, nền là poster mờ + `scrim`, thẻ ở giữa rộng tối đa `420px` (5 biến thể ở mục 9) |
| **ResumePrompt** | "Xem tiếp từ mm:ss" và "Xem từ đầu" |
| **PlayerError** | Nói rõ lỗi, có nút **Thử lại** |

### 7.5 Auth (P0)

`AuthLayout` (thẻ ở giữa, nền `surface-base` có gradient rất nhẹ), `LoginForm`, `RegisterForm`, `OTPVerifyForm`, `ForgotPasswordForm`, `ResetPasswordForm`, `PasswordStrengthMeter`.

### 7.6 Thanh toán và gói cước (P1)

| Component | Đặc tả |
|---|---|
| **PlanCard** | 3 thẻ theo thời hạn. Nội dung: tên gói, thời hạn, giá, giá quy đổi mỗi ngày, danh sách quyền lợi (giống nhau ở cả 3 gói). Một thẻ được nhấn mạnh (mặc định gói **6 tháng**, nhãn "Tiết kiệm nhất"): viền `primary`, nền `surface-card`. Bo `12px`. Nút **Chọn gói** (chưa đăng nhập: **Đăng nhập để mua**). Dòng chú thích chung: "Mua khi còn hạn sẽ được cộng dồn. Gói không tự động gia hạn." |
| **SubscriptionStatusCard** | Bốn trạng thái: `chưa có gói`, `còn hạn`, `sắp hết hạn` (≤ 3 ngày, viền `warning`), `hết hạn` |
| **ExpiryBanner** | Dải dưới Header, nền `warning` 12%, chữ "Gói của bạn còn {n} ngày", nút **Gia hạn**, nút tắt (ẩn trong ngày) |
| **CheckoutSummary** | Gói đã chọn, thời hạn hiện tại → thời hạn sau khi cộng dồn, tổng tiền |
| **PaymentMethodSelector** | Radio dạng thẻ: VNPay, MoMo |
| **OrderStatus** | `đang chờ` (hỏi lại trạng thái đơn theo chu kỳ), `thành công`, `thất bại`, `hết thời gian` |
| **PaymentHistoryTable** | Ngày, gói, số tiền, trạng thái (StatusBadge) |

### 7.7 Thông báo (P1)

`NotificationBell` (chấm hoặc số, tối đa `9+`), `NotificationDropdown`, `NotificationItem` (chưa đọc có chấm `brand`, có đường dẫn hành động), `NotificationList`.

### 7.8 Thư viện và hồ sơ (P1)

`LibraryTabs`, `HistoryItem` (kèm tiến độ), `ProfileForm`, `AvatarUploader`, `DeviceList` (thiết bị, lần hoạt động cuối, nút Đăng xuất thiết bị), `ChangePasswordForm`.

### 7.9 Admin (P2)

| Component | Đặc tả |
|---|---|
| **AdminShell** | Sidebar `260px` + topbar `56px`, nội dung tối đa `1280px` |
| **StatCard** | Nhãn, số lớn (H1), xu hướng tăng/giảm |
| **Chart wrappers** | Recharts. Màu chuỗi dữ liệu: `brand`, `cyan`, `mint`, `warning`. Lưới `surface-raised`, trục `text-muted` |
| **DataTable** | Sắp xếp, lọc, phân trang, thao tác từng dòng, chọn nhiều; mật độ gọn (hàng `48px`) |
| **StatusBadge** | Nội dung: `draft` (xám) · `processing` (cyan, có icon xoay) · `ready` (viền mint) · `published` (nền mint) · `archived` (mờ) · `failed` (danger). Đơn hàng: `pending` (warning) · `paid` (mint) · `failed` (danger) · `refunded` (xám) |
| **ContentForm** | Thông tin nội dung, thể loại, quyền truy cập |
| **EpisodeManager** | Danh sách tập, kéo thả đổi thứ tự, đánh dấu Miễn phí/Premium |
| **MediaUploader** | Vùng thả viền nét đứt; ghi rõ giới hạn ("MP3, tối đa 50 MB"). State machine: `IDLE → SELECTED → CREATING_METADATA → UPLOADING → CONFIRMING → PROCESSING → READY`, hoặc `ERROR`. Có thanh tiến trình, nút Hủy và Thử lại, chặn bấm đúp. Dùng chung cho mp3 và mp4, giới hạn lấy từ cấu hình |
| **ImageUploader** | Ảnh bìa, xem trước đúng tỉ lệ |
| **GenreTagManager, PlanEditor** | |
| **UserDetailDrawer** | Xem gói, cấp hoặc thu hồi thời hạn thủ công (luôn qua ConfirmDialog và ghi AuditLog) |
| **AuditLogTable** | Ai, làm gì, lên đối tượng nào, lúc nào |
| **ConfirmDialog** | Hành động nguy hiểm; nút chính ghi đúng hành động ("Thu hồi gói", không ghi "OK") |

### 7.10 Trang hệ thống (P0)

Trang `404`, `403` (không đủ quyền), `500`, `OfflineNotice`, skeleton cho Card, Rail, Hero, Table.

---

## 8. TRANG (WIREFRAME)

### 8.1 Home `/`

```
┌ Header (trong suốt) ─────────────────────────────────────┐
│ HERO  backdrop 16:9, tiêu đề, mô tả, [Xem ngay] [Chi tiết] │
├───────────────────────────────────────────────────────────┤
│ Tiếp tục xem / nghe   (chỉ khi đã đăng nhập, card wide)    │
│ Mới cập nhật          (Rail)                               │
│ Phim lẻ               (Rail)                               │
│ Phim bộ               (Rail)                               │
│ Audio mới             (Rail, bìa vuông)                    │
│ Xem nhiều             (Rail, dữ liệu từ WatchEvent)        │
│ Thử miễn phí          (Rail, nội dung FREE)                │
├───────────────────────────────────────────────────────────┤
│ Footer                                                     │
└───────────────────────────────────────────────────────────┘
```

Các dải hiển thị là **cấu hình theo dữ liệu** (`ContentRail` nhận tiêu đề + nguồn dữ liệu). Danh mục dải cụ thể sẽ chốt sau, không cứng hóa trong code.

### 8.2 Chi tiết `/movies/[slug]`, `/audio/[slug]`

```
┌ Backdrop mờ ─────────────────────────────────────────────┐
│ [Poster]  Tiêu đề (H1)                                    │
│           Năm · thời lượng/số tập · thể loại (chip)       │
│           Mô tả                                           │
│           [Xem ngay] [Yêu thích]                          │
├───────────────────────────────────────────────────────────┤
│ Danh sách tập (EpisodeList)   |  (bên phải, desktop)      │
│                               |  Thông tin thêm           │
└───────────────────────────────────────────────────────────┘
```

Phim lẻ chỉ có một tập nên ẩn EpisodeList và hiển thị nút Xem ngay.

### 8.3 Xem phim `/watch/[slug]/[episode]`

```
┌ Header gọn ───────────────────────────────────────────────┐
│ ┌ VideoPlayer 16:9 (PaywallGate phủ lên khi bị khóa) ───┐ │
│ └───────────────────────────────────────────────────────┘ │
│ Tiêu đề tập · nút Yêu thích                               │
│ Danh sách tập (bên phải trên desktop, bên dưới trên mobile)│
└───────────────────────────────────────────────────────────┘
```

### 8.4 Nghe audio `/listen/[slug]/[episode]`

Bìa vuông lớn ở giữa (mobile) hoặc bên trái (desktop), AudioPlayer bên dưới/bên phải, danh sách tập kèm trạng thái. Khi rời trang, phát tiếp bằng MiniPlayer.

### 8.5 Bảng giá `/pricing`

Tiêu đề, một dòng mô tả, **3 PlanCard** cạnh nhau (xếp dọc trên mobile), dòng chú thích cộng dồn và không tự gia hạn, chọn phương thức thanh toán ở bước sau. Nếu đang có gói: hiện `SubscriptionStatusCard` phía trên.

### 8.6 Các trang còn lại

- **Auth:** một thẻ ở giữa (`AuthLayout`); OTP có đếm ngược gửi lại.
- **Kết quả thanh toán `/checkout/[orderId]`:** `OrderStatus` ở giữa, nút quay lại nội dung hoặc thử lại.
- **Thư viện, Thông báo, Hồ sơ:** khung có tab (mục 6), nội dung là lưới `ContentCard` hoặc danh sách.
- **Admin:** `AdminShell`; danh sách nội dung là `DataTable` (có lọc trạng thái), tạo/sửa dùng trang riêng với `ContentForm`, `EpisodeManager`, `MediaUploader`.

---

## 9. TRẠNG THÁI TRUY CẬP VÀ PAYWALL

`PaywallGate` có 5 biến thể. Frontend **không tự quyết định quyền xem**: chỉ hiển thị theo kết quả mà API cấp quyền phát trả về (`PlayGrant`).

| Trạng thái | Tiêu đề | Mô tả | Nút chính | Nút phụ |
|---|---|---|---|---|
| `UNAUTHENTICATED` | Đăng nhập để xem tiếp | Tập này dành cho tài khoản đã đăng nhập. | Đăng nhập | Tạo tài khoản |
| `NO_SUBSCRIPTION` | Tập này dành cho hội viên | Chọn một gói để xem toàn bộ phim và audio. | Xem các gói | Xem tập miễn phí |
| `EXPIRED` | Gói của bạn đã hết hạn | Gia hạn để tiếp tục xem từ chỗ đang dở. | Gia hạn | |
| `DEVICE_LIMIT` | Tài khoản đang được dùng trên thiết bị khác | Dừng phát trên thiết bị kia hoặc quản lý thiết bị. | Quản lý thiết bị | Thử lại |
| `PLAY_ERROR` | Không tải được nội dung | Kiểm tra kết nối rồi thử lại. | Thử lại | |

Nội dung `FREE` luôn phát được, kể cả khi chưa đăng nhập (tuỳ cấu hình từng tập).

---

## 10. QUY TẮC NỘI DUNG CHỮ (COPY)

- Tiếng Việt, **sentence case**, câu ngắn, động từ rõ ràng. Không viết HOA toàn bộ, không thêm mũi tên "→" vào nút.
- Nút nói đúng việc sẽ xảy ra: **Xem ngay**, **Nghe ngay**, **Chọn gói**, **Đăng nhập**, **Gia hạn**, **Lưu thay đổi**. Không dùng "Submit", "OK".
- Một hành động giữ **một tên** xuyên suốt: nút "Xuất bản" thì toast là "Đã xuất bản".
- Lỗi: nói rõ chuyện gì xảy ra và cách sửa, không xin lỗi, không nói chung chung. Ví dụ: "Mã OTP không đúng. Kiểm tra lại mã hoặc gửi mã mới."
- Trạng thái rỗng là lời mời hành động. Ví dụ Thư viện rỗng: "Bạn chưa lưu gì. Thêm phim hoặc audio vào Yêu thích để xem lại tại đây."
- Định dạng: tiền `59.000 ₫` (`Intl.NumberFormat('vi-VN')`), ngày `dd/MM/yyyy`, thời gian tương đối bằng `date-fns` locale `vi`.
- Thuật ngữ cố định: **Phim lẻ**, **Phim bộ**, **Audio**, **Tập**, **Gói**, **Thư viện**, **Yêu thích**.
- Không ghi các cam kết về chất lượng hình/âm hoặc chứng nhận bảo mật mà hệ thống chưa có. Thanh toán chỉ ghi "qua VNPay / MoMo".

---

## 11. TIẾP CẬN, HIỆU NĂNG, RESPONSIVE

- **Focus:** vòng `2px` màu `ring` (cyan), cách `2px`, luôn thấy trên nền tối. Không bao giờ `outline: none` mà không thay thế.
- **Tương tác:** vùng chạm tối thiểu `44×44px` trên mobile. Mọi thứ dùng được bằng bàn phím; player có phím tắt (mục 7.4).
- **Tương phản:** chữ thường ≥ `4.5:1`. `text-muted` chỉ dùng cho nội dung không thiết yếu. Không truyền đạt thông tin chỉ bằng màu (lỗi/thành công luôn kèm icon và chữ).
- **ARIA:** nút icon có `aria-label`; player, tab, dialog theo chuẩn Radix/Vidstack; vùng thông báo dùng `aria-live="polite"`.
- **Reduced motion:** xem mục 4.7.
- **Mobile-first:** thiết kế và kiểm tra từ `360px`; chừa safe-area cho bottom nav và MiniPlayer.
- **Hiệu năng:** trang public render phía server; Rail lazy-load; ảnh `next/image` đúng `sizes`; không tải thư viện player ở trang không cần; không đưa dữ liệu nhạy cảm (link file gốc) vào HTML render.

---

## 12. HỢP ĐỒNG DỮ LIỆU VÀ MOCK

Frontend làm trước bằng **MSW**. Biến môi trường: `NEXT_PUBLIC_API_URL=http://localhost:5000/api`. Khi backend xong chỉ cần đổi URL và tắt mock.

### 12.1 Kiểu dữ liệu (`client/src/lib/contracts`)

```ts
export type Role = 'USER' | 'ADMIN';
export type ContentType = 'MOVIE' | 'SERIES' | 'AUDIO';
export type AccessLevel = 'FREE' | 'PREMIUM';
export type ContentStatus = 'DRAFT' | 'PROCESSING' | 'READY' | 'PUBLISHED' | 'ARCHIVED';
export type ProcessingStatus = 'PENDING' | 'PROCESSING' | 'READY' | 'FAILED';
export type PlanCode = 'DAY_1' | 'MONTH_1' | 'MONTH_6';
export type OrderStatus = 'PENDING' | 'PAID' | 'FAILED' | 'EXPIRED' | 'REFUNDED';
export type PlayDenyReason =
  | 'UNAUTHENTICATED' | 'NO_SUBSCRIPTION' | 'EXPIRED' | 'DEVICE_LIMIT' | 'PLAY_ERROR';

export interface Genre { id: string; slug: string; name: string; }

export interface Content {
  id: string; slug: string; type: ContentType;
  title: string; description: string;
  posterUrl: string; backdropUrl?: string;
  genres: Genre[]; year?: number;
  episodeCount: number; status: ContentStatus;
  isNew?: boolean; hasNewEpisode?: boolean;
}

export interface Episode {
  id: string; contentId: string; episodeNumber: number; season?: number;
  title: string; durationSec: number; thumbnailUrl?: string;
  accessLevel: AccessLevel; processingStatus: ProcessingStatus;
}

export interface Plan {
  id: string; code: PlanCode; name: string;
  durationDays: number; priceVnd: number;
  highlight?: boolean; highlightLabel?: string;
}

export interface Entitlement {
  status: 'NONE' | 'ACTIVE' | 'EXPIRING' | 'EXPIRED';
  expiresAt?: string;           // ISO 8601; banner hiện khi còn <= 3 ngày
}

export type PlayGrant =
  | { allowed: true; url: string; expiresInSec: number; resumeSec?: number }
  | { allowed: false; reason: PlayDenyReason };

export interface AppNotification {
  id: string; type: string; title: string; body?: string;
  actionRoute?: string; read: boolean; createdAt: string;
}

export interface Order {
  id: string; planCode: PlanCode; amountVnd: number;
  status: OrderStatus; provider: 'VNPAY' | 'MOMO'; createdAt: string;
}
```

### 12.2 Dữ liệu mock (seed)

- Tối thiểu: 4 phim lẻ, 3 phim bộ (mỗi bộ 6–10 tập), 4 audio (mỗi audio 4–8 tập), 8 thể loại; ảnh dùng placeholder tạo từ gradient hoặc ảnh mẫu trong `public/`.
- Có nội dung `FREE` lẫn `PREMIUM`; có tập `đang xử lý` để thử `StatusBadge`.
- **Giá mock (chưa chốt, chỉ để dựng giao diện):** 1 ngày `12.000 ₫`, 1 tháng `59.000 ₫`, 6 tháng `299.000 ₫`.
- Công tắc mock cho trang phát: chọn được một trong 5 trạng thái ở mục 9 và trạng thái gói (`NONE / ACTIVE / EXPIRING / EXPIRED`) để kiểm tra giao diện; công tắc này chỉ hiện ở môi trường dev.
- Phát thử bằng file mp4 và mp3 mẫu.

---

## 13. SERVER (CHỈ SKELETON Ở GIAI ĐOẠN NÀY)

Giai đoạn thiết kế Frontend chỉ cần **khung server chạy được**:

- Express + kết nối MongoDB trước khi listen; prefix `/api`; `GET /api/health` kiểm tra server và database.
- `middlewares/errorHandler`, `middlewares/validate` (Zod), cấu hình `env`.
- Thư mục `modules/` tạo sẵn rỗng theo danh sách ở mục 2.
- `docker-compose.yml` chạy MongoDB và MinIO.

Nghiệp vụ backend (auth, upload, thanh toán, paywall) làm sau khi Frontend đã dựng xong theo hợp đồng ở mục 12.

---

## 14. LỘ TRÌNH FRONTEND VÀ TIÊU CHÍ HOÀN THÀNH

| Bước | Nội dung | Xong khi |
|---|---|---|
| **F0** | Workspace, cấu hình Tailwind/shadcn, token, font, primitives, layout, trang `/design-system`, khung MSW, skeleton server | `pnpm dev` chạy được cả `client` và `server`; `/design-system` hiển thị mọi primitive và token |
| **F1** | Header, Footer, MobileBottomNav, các trang Auth | Điều hướng đủ mục ở mục 6; form có kiểm tra Zod và trạng thái lỗi |
| **F2** | Home (khung), Explore, Genre, Search, trang chi tiết | Dùng dữ liệu mock; mọi Rail, Card, EpisodeList có đủ trạng thái |
| **F3** | Trang xem/nghe, MiniPlayer, PaywallGate 5 biến thể | Chuyển được giữa 5 trạng thái bằng công tắc mock; audio phát tiếp khi đổi trang |
| **F4** | Pricing, thanh toán (giao diện), Hồ sơ → Gói của tôi | Ba PlanCard, OrderStatus đủ 4 trạng thái, ExpiryBanner |
| **F5** | Thư viện, Yêu thích, Tiếp tục xem, Thông báo | Trạng thái rỗng, đang tải, lỗi đều có |
| **F6** | Admin shell, quản lý nội dung, MediaUploader | State machine upload chạy đủ với mock |
| **F7** | Admin: gói, đơn hàng, người dùng, nhật ký, thống kê | DataTable và biểu đồ hoạt động với mock |

**Tiêu chí hoàn thành cho mỗi component:**

1. Đủ trạng thái (mục 7) và có mục riêng trong `/design-system`.
2. Chỉ dùng token, **không** viết mã màu, kích thước, bo góc trực tiếp trong component.
3. Đẹp ở `360px`, `768px`, `1280px`; có `focus-visible`; đạt tương phản.
4. Không lỗi TypeScript, `pnpm lint` và `pnpm build` đều qua.
5. Không thêm tính năng ngoài mục 1.1.

**Quy ước code:** file component `PascalCase.tsx`, hook `useXxx.ts`, mỗi feature có `index.ts` xuất công khai; `client` dùng alias `@/`; không đặt logic nghiệp vụ trong `components/ui`.
