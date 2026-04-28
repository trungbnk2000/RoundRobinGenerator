# Round Robin Generator

Ứng dụng web tĩnh để tạo lịch thi đấu vòng tròn cho 8 người chơi pickleball, nhập điểm sau từng trận và xem bảng xếp hạng chung cuộc.

Live site: https://trungbnk2000.github.io/RoundRobinGenerator/

## Tính năng

- Nhập đúng 8 người chơi.
- Chỉnh tên và thứ tự người chơi trước khi tạo lịch.
- Chọn 4 người chơi cho trận đầu tiên để xử lý trường hợp có người đến trễ.
- Tạo 7 vòng đấu, tổng cộng 14 trận.
- Nhập điểm từng trận sau khi thi đấu thực tế.
- Bảng xếp hạng cập nhật theo các trận đã hoàn tất.
- Trang kết quả chung cuộc sau khi nhập đủ điểm.
- Giao diện tiếng Việt, tối ưu cho mobile.

## Luật xếp hạng

Bảng xếp hạng được tính từ các trận đã có đủ điểm hợp lệ:

1. Số trận thắng giảm dần.
2. Hiệu số điểm giảm dần.
3. Tổng điểm ghi được giảm dần.
4. Tên người chơi theo alphabet.

Điểm hợp lệ phải là số nguyên không âm và không được hòa.

## Công nghệ

- React
- TypeScript
- Vite
- Vitest
- GitHub Pages

## Chạy local

```bash
npm install
npm run dev
```

Local URL:

```txt
http://127.0.0.1:5173/RoundRobinGenerator/
```

## Kiểm tra và build

```bash
npm test
npm run build
```

Build output nằm trong thư mục `dist/`.

## Deploy

Repo đang deploy qua nhánh `gh-pages`:

```txt
https://trungbnk2000.github.io/RoundRobinGenerator/
```

GitHub Actions workflow đã có trong `.github/workflows/deploy.yml`, nhưng hiện tại Actions bị chặn bởi trạng thái billing/account của GitHub. Vì vậy cách deploy đang dùng là build local rồi push nội dung `dist/` lên nhánh `gh-pages`.

Khi GitHub Actions hoạt động lại, workflow có thể deploy tự động sau mỗi lần push lên `main`.

## Cấu hình GitHub Pages

Vite đang dùng base path:

```ts
base: "/RoundRobinGenerator/"
```

Nếu đổi tên repo, cần cập nhật `base` trong `vite.config.ts` theo tên repo mới.
