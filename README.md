# Azithun — F0

Workspace nằm ngay tại `AzithunCinema`. `design.md` được giữ nguyên văn; các override F0 của người dùng giới hạn triển khai vào foundation, primitives, MSW rỗng và server skeleton.

## Chạy local

Yêu cầu: Node.js 24 LTS (tối thiểu 24.15; đã kiểm tra với 24.21.0 trong `.node-version`), pnpm 10.34.6, Docker Compose. Dependency JS được khóa version trong manifest và `pnpm-lock.yaml`.

```powershell
pnpm install --frozen-lockfile
Copy-Item .env.example .env
Copy-Item client/.env.local.example client/.env.local
Copy-Item server/.env.example server/.env
# Đặt MINIO_ROOT_USER và MINIO_ROOT_PASSWORD local trong .env trước khi chạy.
docker compose up -d --build
pnpm dev
```

Trên Windows chưa có `pnpm` trong PATH nhưng đã có Corepack, dùng `scripts\pnpm.cmd` thay cho `pnpm`, ví dụ `./scripts/pnpm.cmd dev`. Wrapper chỉ thêm PATH trong tiến trình hiện tại, không đổi cấu hình máy. Nếu PowerShell chặn `pnpm.ps1`, gọi `pnpm.cmd`.

- Client: http://localhost:3000
- Design system (chỉ dev): http://localhost:3000/design-system
- Server health: http://localhost:5000/api/health
- MongoDB: `127.0.0.1:27017`
- MinIO API: http://localhost:9000; console: http://localhost:9001

Server kết nối MongoDB trước khi listen, lỗi kết nối sẽ dừng khởi động. Health ping database: HTTP 200 khi hoạt động, 503 khi database không sẵn sàng. Không tạo collection hoặc seed nghiệp vụ.

Nếu máy đã chạy MongoDB ở 27017, cần giải phóng cổng trước khi bật Mongo trong Compose, hoặc đổi `MONGO_PORT` và `MONGODB_URI` tương ứng. Không dừng dịch vụ MongoDB sẵn có tự động.

MinIO được build từ source chính thức, khóa ở `RELEASE.2025-10-15T17-29-55Z`, theo [hướng dẫn release của MinIO](https://github.com/minio/minio/releases/tag/RELEASE.2025-10-15T17-29-55Z). Lần build đầu cần mạng để tải source và Go modules. Không phụ thuộc tag `minio/minio:latest`.

## Mock

Đặt `NEXT_PUBLIC_MSW_ENABLED=true` trong `client/.env.local`, rồi khởi động lại client. MSW chỉ được khởi động ở development; provider đợi worker sẵn sàng trước khi mount nội dung để tránh request đi nhầm backend.

`GET /api/contents` trả `{ "items": [], "total": 0 }`. Đây là endpoint placeholder để kiểm tra transport và contracts, chưa phải API nghiệp vụ đã chốt. Không có seed phim, audio, tập, người dùng, đơn hàng hay subscription. Trong `/design-system`, nút “Kiểm tra dữ liệu rỗng” thực hiện request thật qua MSW và xác thực bằng Zod.

`lib/contracts` có đầy đủ kiểu và schema mục 12; enum `REFUNDED` chỉ bảo toàn hợp đồng đã cung cấp, không có UI hay logic hoàn tiền. Không có công tắc paywall/player trong F0.

## Kiểm tra

```powershell
pnpm lint
pnpm build
pnpm test
pnpm --filter @azithun/client exec playwright install chromium
pnpm test:e2e
```

`lint` gồm ESLint và TypeScript. `build` chạy Next.js production build và kiểm tra cú pháp toàn bộ source server CommonJS. `test` chạy Vitest phía client, Node test runner + Supertest phía server.

Playwright kiểm tra 360/768/1280px, font tiếng Việt, không tràn ngang trang, focus-visible, focus trap/restore, tương tác primitive, reduced motion, MSW rỗng và `/design-system` trả 404 trong production. Test dùng cổng 3000 và 3001; cần `pnpm build` trước. Nếu đang mở client 3000, bật MSW trước khi chạy test. Ảnh kiểm tra nằm trong `client/test-results/` (không commit).

## Cấu trúc

```text
AzithunCinema/
├─ client/
│  ├─ public/mockServiceWorker.js
│  ├─ src/
│  │  ├─ app/                 # root, design-system, 403, 500, error, not-found
│  │  ├─ components/
│  │  │  ├─ ui/               # mỗi primitive một file PascalCase
│  │  │  ├─ layout/           # shell, container, grid, rail
│  │  │  └─ shared/           # empty/error/offline/skeleton
│  │  ├─ features/            # auth/catalog/player/library/billing/notifications/admin: rỗng
│  │  ├─ hooks/
│  │  ├─ lib/contracts/
│  │  ├─ mocks/               # browser, handlers, factories
│  │  └─ stores/              # dự phòng, chưa có state nghiệp vụ
│  └─ e2e/
├─ server/
│  ├─ src/                    # app, server, config, routes, middleware, module folders
│  ├─ scripts/check-syntax.js
│  └─ tests/
├─ infra/minio/Dockerfile
├─ scripts/pnpm.cmd
├─ design.md
├─ docker-compose.yml
├─ pnpm-workspace.yaml
└─ pnpm-lock.yaml
```

## Quy ước foundation

- Dark only; Plus Jakarta Sans qua `next/font/google`, subset latin/latin-ext/vietnamese, weight 400–800. Build cần truy cập Google Fonts lần đầu; font được Next self-host sau đó.
- CSS tokens trong `client/src/app/globals.css`, Tailwind v4 qua `@theme inline`; không thêm theme sáng. Kích thước Radix đọc CSS token qua `useCssToken`, không lặp lại pixel trong component.
- Component theo cấu trúc shadcn/ui với Radix, file PascalCase; `components.json` sẵn để mở rộng. Khi dùng CLI shadcn sau này, đổi tên file và áp token Azithun trước khi dùng.
- Nút giữ visual height 32/40/48px, hit area mobile mở rộng bằng pseudo-element. Grid và khoảng cách giữa control ngăn hit area chồng nhau trong showcase.
- Các giá trị chưa định nghĩa được đặt thành token dễ đổi: dialog 480px, popover 320px, sheet 360px; độ mờ disabled; chiều cao mẫu showcase, textarea; chu kỳ spinner/skeleton. Đây không phải business rule.
- Header/Footer/MobileBottomNav chỉ là shell có slot. Route group nghiệp vụ và profile/admin shell chi tiết sẽ thêm khi tới phase tương ứng. Menu mục lục của showcase chỉ phục vụ kiểm tra foundation.
- `/403` và `/500` là trang mẫu thị giác (HTTP 200), chưa có guard hoặc logic nghiệp vụ. `error.tsx` là error boundary thực tế. `/design-system` bị chặn server-side ngoài development và trả 404.
- OTP primitive có 6 ô, hỗ trợ dán/chuyển ô; gửi lại mã và thời gian đếm ngược thuộc Auth F1.
- Chưa cài React Hook Form, Vidstack, Zustand, Motion, Recharts, date-fns hoặc SDK nghiệp vụ khi F0 chưa dùng tới. FormField hiện là primitive nhãn/control/hint/error; tích hợp form validation nghiệp vụ bắt đầu ở F1.

## Điểm cần chốt trong specification

Giữ nguyên token màu mục 4.2. Theo công thức tương phản WCAG, trắng trên `primary` đạt 4,69:1; trên `primary-hover` chỉ 3,87:1, thấp hơn yêu cầu chữ thường 4,5:1 tại mục 11. Chưa tự đổi màu. Đề xuất điều chỉnh token hover tối hơn trong lần cập nhật design được duyệt; không thể đồng thời giữ nguyên token này và tuyên bố trạng thái hover đạt 4,5:1.

## Trạng thái kiểm chứng trên máy triển khai

- Đã cài workspace và khởi động cả client/server bằng `pnpm dev`.
- Health thực tế dùng dịch vụ MongoDB Windows sẵn có: `status=ok`, `database=connected`.
- Docker chưa có trên máy; WSL cũng trả lỗi `REGDB_E_CLASSNOTREG`: chưa chạy được Compose, chưa build/pull hoặc kiểm chứng MinIO container. Không đánh dấu bước này là hoàn thành.

## Chưa làm — đúng roadmap

- F1: điều hướng sản phẩm đầy đủ và Auth forms/pages.
- F2: Home, catalog, search, genre, detail, ContentCard/Hero/EpisodeList.
- F3: watch/listen, player, MiniPlayer, PaywallGate và trạng thái mock truy cập.
- F4–F7: pricing/payment/profile, library/notifications và Admin nghiệp vụ.
  Không thực hiện các mục ngoài phạm vi tại mục 1.2.

Tham chiếu công nghệ: [Next.js installation](https://nextjs.org/docs/app/getting-started/installation), [shadcn/ui Tailwind v4](https://ui.shadcn.com/docs/tailwind-v4). Tài liệu đi kèm phiên bản Next đã cài nằm ở `client/node_modules/next/dist/docs/`.
