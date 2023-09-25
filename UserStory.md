    1.Dành cho Host:

Với mỗi người đăng bài (host), tôi có thể đăng thông tin về phòng trọ của mình.
Các model liên quan: Phòng trọ (Room)
Các field của model: Tên phòng, mô tả, giá, địa chỉ, hình ảnh


Với mỗi người đăng bài (host), tôi có thể chỉnh sửa thông tin về phòng trọ của mình.
Các model liên quan: Phòng trọ (Room)
Các field của model: Tên phòng, mô tả, giá, địa chỉ, hình ảnh


Với mỗi người đăng bài (host), tôi có thể xem danh sách các phòng trọ của mình đã đăng
Các model liên quan: Phòng trọ (Room)

    2.Dành cho Guest:

Với mỗi người xem và đặt phòng (guest), tôi có thể xem danh sách các phòng trọ có sẵn để thuê
Các model liên quan: Phòng trọ (Room)

Với mỗi người xem và đặt phòng (guest), tôi có thể xem chi tiết về một phòng trọ cụ thể
Các model liên quan: Phòng trọ (Room)

Với mỗi người xem và đặt phòng (guest), tôi có thể đánh giá phòng trọ sau khi ở đó
Các model liên quan: Đánh giá (Rating)

Với mỗi người xem và đặt phòng (guest), tôi có thể thêm phòng trọ vào danh sách yêu thích của tôi
Các model liên quan: Yêu thích (Favorite)

Với mỗi người xem và đặt phòng (guest), tôi có thể đặt phòng trọ và nhận xác nhận đặt phòng
Các model liên quan: Đặt phòng (Booking)

    3.Dành cho Admin:

Với mỗi admin, tôi có thể quản lý thông tin các phòng trọ đã được đăng
Các model liên quan: Phòng trọ (Room)

Với mỗi admin, tôi có thể quản lý thông tin người dùng, bao gồm quyền hạn và vai trò của họ
Các model liên quan: Người dùng (User)

Với mỗi admin, tôi có thể xem danh sách đánh giá và quản lý chúng (xóa hoặc chỉnh sửa)
Các model liên quan: Đánh giá (Rating)

Với mỗi admin, tôi có thể xem danh sách các đặt phòng và quản lý chúng (xóa hoặc chỉnh sửa)
Các model liên quan: Đặt phòng (Booking)