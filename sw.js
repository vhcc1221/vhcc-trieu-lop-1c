const CACHE_NAME = 'quy-lop-1c-v1';
// Danh sách các file cần lưu để chạy offline
const urlsToCache = [
  './',
  './index.html',
  './trieu.jpg',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
];

// Bước 1: Cài đặt và lưu file vào bộ nhớ đệm
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Bước 2: Kích hoạt và xóa cache cũ nếu có cập nhật
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Bước 3: Phản hồi yêu cầu khi không có mạng (Lấy từ Cache)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Nếu có trong cache thì trả về, không thì tải từ mạng
      return response || fetch(event.request);
    })
  );
});
