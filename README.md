# Social Media App

Một [trang mạng xã hội](https://ie213-social-media-app.onrender.com/) xây dựng bằng `React.js` và `Tailwind CSS` với các chức năng cơ bản như đăng nhập, kết bạn, đăng bài viết và bình luận; truy vấn dữ liệu từ [máy chủ Node.js/Express](https://github.com/minhlong149/social-media-server) và cơ sở dữ liệu `MongoDB`. *Đây là đồ án môn học Kỹ thuật phát triển hệ thống Web của nhóm sinh viên trường Đại học Công nghệ Thông tin - ĐHQG TP.HCM*.

- [Social Media App](#social-media-app)
  - [Yêu cầu chức năng](#yêu-cầu-chức-năng)
  - [Thiết kế giao diện](#thiết-kế-giao-diện)
  - [Hướng dẫn cài đặt](#hướng-dẫn-cài-đặt)
  - [Tác giả](#tác-giả)

## Yêu cầu chức năng

- Cho phép người dùng tạo tài khoản mới và đăng nhập.

- Hiển thị danh sách bài đăng của bạn bè trên trang chủ. Với mỗi bài viết, người dùng có thể thích hoặc truy cập trang cá nhân của người đăng bài. Khi ấn vào một bài viết, người dùng có thể xem chi tiết nội dung bài đăng đó, bao gồm cả bình luận.

- Hiển thị nội dung chi tiết của bài đăng. Người dùng có thể xem và bình luận nội dung mới tại đây. Tại đây, người dùng cũng có thể thích hoặc truy cập trang cá nhân của người đăng bài.

- Hiển thị trang cá nhân của mỗi người dùng và các thông tin liên quan như tên, danh sách bài đăng và bạn bè. Sẽ có một trang cài đặt, nơi mà người dùng có thể chỉnh sửa thông tin cá nhân của mình tại đây. Khi ấn vào một bạn bè, người dùng sẽ được chuyển hướng đến trang cá nhân của người dùng đó. Khi ấn vào một bài viết, người dùng có thể xem chi tiết nội dung bài đăng đó, bao gồm cả bình luận.

- Hiển thị danh sách bạn bè của người dùng, cùng với tùy chọn quản lý lời mời cũng như gợi ý kết bạn. Khi ấn vào một người dùng, người dùng sẽ được chuyển hướng đến trang cá nhân của người dùng đó. Người dùng cũng có thể hủy kết bạn với một người dùng tại đây.

- Cho phép người dùng tìm kiếm bạn bè hoặc bài đăng theo từ khóa.

- Tạo và gửi đi thông báo theo thời gian thực từ các hoạt động của bạn bè như lời mời kết bạn, bài đăng và bình luận.

## Thiết kế giao diện

- Màn hình đăng nhập/đăng ký cho phép người dùng tạo tài khoản mới hoặc đăng nhập vào tài khoản hiện có.

- Màn hình trang chủ hiển thị danh sách các bài viết nổi bật từ người dùng khác, cho phép người dùng đăng bài viết, đăng ảnh, thích, bình luận và xem thông báo.
  - Thanh menu nằm ở phía trên cùng của mỗi màn hình, chứa các nút điều hướng đến các màn hình khác, ví dụ: trang chủ, trang cá nhân, kết bạn, tìm kiếm. Cũng có nút đăng xuất để người dùng thoát khỏi tài khoản.

- Màn hình chi tiết bài viết hiển thị nội dung của một bài viết từ người dùng khác trên màn hình trang chủ hoặc từ chính người dùng trên màn hình trang cá nhân. Bao gồm ảnh đại diện, tên và thời gian đăng của người đăng; nội dung văn bản và ảnh (nếu có) của bài viết; số lượng thích và bình luận; các nút thích và bình luận để người dùng tương tác với bài viết.

- Màn hình đăng bài viết cho phép người dùng nhập nội dung bài viết, chọn ảnh để đính kèm và nhấn nút đăng để chia sẻ với mọi người.

- Màn hình kết quả tìm kiếm hiển thị thông tin của một bài viết hoặc một người dùng liên quan đến từ khóa được nhập trên màn hình tìm kiếm. Bao gồm ảnh đại diện, tên và nội dung rút gọn của bài viết hoặc người dùng; các nút xem chi tiết để chuyển đến màn hình trang cá nhân của người dùng hoặc màn hình chi tiết bài viết.

- Màn hình kết bạn hiển thị danh sách các gợi ý kết bạn từ hệ thống, cho phép người dùng gửi lời mời kết bạn hoặc chấp nhận lời mời kết bạn từ người dùng khác.
  - Khung gợi ý kết bạn hiển thị thông tin của một người dùng khác được hệ thống gợi ý là có thể quen biết hoặc có chung sở thích với người dùng hiện tại trên màn hình kết bạn. Bao gồm ảnh đại diện, tên, giới thiệu và số lượng bạn bè chung (nếu có) của người dùng được gợi ý; các nút gửi lời mời kết bạn hoặc từ chối để người dùng quyết định có muốn kết bạn với người đó hay không.

- Màn hình thông báo hiển thị các thông báo gửi đến người dùng, ví dụ: ai đó đã thích hoặc bình luận bài viết của bạn, ai đó đã gửi lời mời kết bạn cho bạn.

## Hướng dẫn cài đặt

- Cài đặt các gói package bằng lệnh `npm install`, sau đó khởi chạy bằng lệnh `npm start`.

> Nếu không có nhu cầu sử dụng chức năng thông báo theo thời gian thực, có thể build và deploy các static file trong thư mục `dist` sau khi chạy lệnh `npm run build`.

## Tác giả

- [Nguyễn Đào Minh Long](https://github.com/minhlong149) - Gửi nhận thông báo theo thời gian thực
- [Trần Trọng Nguyên](https://github.com/Norman-Tran) - Tạo tài khoản mới và đăng nhập
- [Quách Kiều Oanh](https://github.com/Qanh195) - Hiển thị và lọc danh sách các bài viết trên trang chủ
- [Lưu Chí Thịnh](https://github.com/Thinh446274) - Tìm kiếm bài viết và người dùng
- [Lương Phúc Vinh](https://github.com/vinhlp02) - Quản lý trang thông tin cá nhân
- [Mai Ngọc Bích](https://github.com/bichmn) - Tạo bài viết mới
- [Lê Nguyễn Bá Duy](https://github.com/ZuyLeLe) - Quản lý danh sách bạn bè và lời mời kết bạn
