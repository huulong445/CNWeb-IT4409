# Bài tập 2 – JS tin tức và giỏ hàng

## Thứ tự nạp file

- **news.html** (Bài A) nạp `ho-tro.js` rồi đến `bai-a-tin-tuc.js`.
- **index.html** (Bài B) nạp `ho-tro.js`, rồi `bai-b-gio-hang.js`, rồi `kiem-tra.js`.

Các hàm `hienThi`, `veDanhSachTin` và `veGioHang` nằm trong `ho-tro.js`, nên đã có sẵn khi file bài làm gọi đến. Class `GioHang` và hàm `napGioHang` cũng được khai báo xong trước khi `kiem-tra.js` chạy 20 testcase.

## Bài A. Điền chỗ trống – js/bai-a-tin-tuc.js

**(1) `parse`**
`JSON.parse` biến chuỗi JSON thành mảng object.

**(2) `push`**
Thêm phần tử vào cuối mảng. Mảng lúc này có 6 bài (id 1 → 6).

**(3) `unshift`**
Thêm phần tử vào đầu mảng. Mảng có 7 bài (id 0 → 6).

**(4) `pop`**
Lấy ra và xoá phần tử cuối.

**(5) `6`**
Phần tử cuối vừa bị `pop` là bài id 6.

**(6) `shift`**
Lấy ra và xoá phần tử đầu (bài id 0).

**(7) `5`**
7 bài, bỏ đi 2 bài vừa `pop` và `shift`, còn lại 5 bài (id 1 → 5).

**(8) `["tac gia"]`**
Khoá có dấu cách thì không viết dạng `baiMot.tac gia` được, phải dùng ngoặc vuông: `baiMot["tac gia"]`.

**(9) `delete`**
Toán tử `delete` xoá một thuộc tính khỏi object.

**(10) `undefined`**
Thuộc tính `noiBat` đã bị xoá, nên đọc ra là `undefined`.

**(11) `[GHIM] Mẫu thiệp cưới mùa thu`**
`baiGhim` và `dsBai[1]` cùng trỏ tới một object (kiểu tham chiếu), nên sửa qua `baiGhim` thì `dsBai[1]` cũng đổi theo.

**(12) `filter`**
Giữ lại các phần tử thoả điều kiện, trả về mảng mới.

**(13) `4`**
Trong 5 bài chỉ có bài id 4 là `draft: true`, nên còn 4 bài đã đăng.

**(14) `map`**
Biến mỗi phần tử thành một giá trị mới, trả về mảng mới cùng độ dài.

**(15) `toUpperCase`**
Đổi chuỗi sang chữ in hoa.

**(16) `bai.views`**
Mỗi bước cộng thêm lượt xem của bài hiện tại vào biến tích luỹ.

**(17) `0`**
Giá trị khởi đầu của biến tích luỹ `tong`.

**(18) `2600`**
320 + 870 + 540 + 870 = 2600.

**(19) (B)**
Nếu không có giá trị khởi đầu, `tong` ở bước đầu tiên là cả object bài đầu tiên. Object cộng với số thì JS đổi object thành chuỗi `"[object Object]"` rồi nối chuỗi, nên kết quả là `"[object Object]870540870"`.

**(20) `>`**
Dùng `>` (không dùng `>=`) để khi hai bài bằng lượt xem thì giữ bài `max` đứng trước.

**(21) `2`**
Bài id 2 và id 5 cùng có 870 lượt xem. Vì dùng `>` nên giữ bài đứng trước là id 2.

**(22) `undefined`**
Hàm mũi tên có thân `{ ... }` mà không có `return` thì trả về `undefined`, nên mọi phần tử của mảng `thu` đều là `undefined`.

**(23) `of`**
`for...of` duyệt lần lượt từng giá trị trong mảng `tags`.

**(24) `the`**
Lấy số đếm hiện tại của thẻ đó. Nếu chưa có thì `undefined || 0` cho ra 0, rồi cộng thêm 1.

**(25) `2`**
Thẻ `"mau moi"` xuất hiện ở bài id 2 và id 5.

**(26) `constructor`**
Hàm khởi tạo của class, chạy khi gọi `new`.

**(27) `this`**
`this` trỏ tới object đang được tạo.

**(28) `new`**
Tạo một đối tượng mới từ class `BaiViet`.

**(29) `stringify`**
`JSON.stringify` biến object thành chuỗi JSON để gửi đi.

**(30) không**
`JSON.stringify` chỉ lấy các thuộc tính dữ liệu riêng của object (`title`, `date`, `views`). Phương thức `tomTat` nằm trên prototype của class và là hàm, nên không có trong chuỗi. Chuỗi in ra là `{"title":"Khai trương xưởng in mới","date":"01-03-2012","views":320}`.

**Kết quả trên trang news.html:**

```
Đã đăng: 4 bài — tổng 2600 lượt xem — bài hot: #2
Tiêu đề: KHAI TRƯƠNG XƯỞNG IN MỚI | [GHIM] MẪU THIỆP CƯỚI MÙA THU | HƯỚNG DẪN CHỌN GIẤY COTTON | ƯU ĐÃI IN DANH THIẾP
#su kien: 1 bài
#xuong in: 1 bài
#thiep cuoi: 1 bài
#mau moi: 2 bài
#huong dan: 1 bài
#giay: 1 bài
#khuyen mai: 1 bài
```

## Bài B. Viết code – js/bai-b-gio-hang.js

```js
class GioHang {
	constructor() {
		// Mỗi dòng của giỏ là một object { id, ten, loai, gia, soLuong }.
		this.dsDong = [];
	}

	// 1. Thêm sản phẩm; trả về true nếu thêm được, false nếu soLuong không hợp lệ.
	them(sanPham, soLuong) {
		// Chỉ nhận số nguyên dương kiểu number (loại 0, số âm, số lẻ, NaN, null, undefined, chuỗi).
		if (!Number.isInteger(soLuong) || soLuong <= 0) {
			return false;
		}
		const dongCu = this.dsDong.find(dong => dong.id === sanPham.id);
		if (dongCu) {
			dongCu.soLuong += soLuong;
		} else {
			// Chép từng thuộc tính để giỏ không giữ tham chiếu tới object sản phẩm bên ngoài.
			this.dsDong.push({
				id: sanPham.id,
				ten: sanPham.ten,
				loai: sanPham.loai,
				gia: sanPham.gia,
				soLuong: soLuong
			});
		}
		return true;
	}

	// 2. Xoá dòng có id tương ứng; trả về true nếu có xoá, false nếu không tìm thấy.
	xoa(id) {
		const viTri = this.dsDong.findIndex(dong => dong.id === id);
		if (viTri === -1) {
			return false;
		}
		this.dsDong.splice(viTri, 1);
		return true;
	}

	// 3. Tổng tiền cả giỏ.
	tongTien() {
		return this.dsDong.reduce((tong, dong) => tong + dong.gia * dong.soLuong, 0);
	}

	// 4. Object thống kê: { "<loai>": tổng tiền của loại đó, ... }.
	thongKeTheoLoai() {
		const thongKe = {};
		for (const dong of this.dsDong) {
			thongKe[dong.loai] = (thongKe[dong.loai] || 0) + dong.gia * dong.soLuong;
		}
		return thongKe;
	}

	// 5. Dòng có thành tiền lớn nhất (bản sao, có thêm thanhTien); null nếu giỏ rỗng.
	dongDatNhat() {
		const ds = this.layDanhSach();
		if (ds.length === 0) {
			return null;
		}
		// Dùng ">" để khi bằng nhau thì giữ dòng đứng trước.
		return ds.reduce((max, dong) => dong.thanhTien > max.thanhTien ? dong : max);
	}

	// 6. Mảng BẢN SAO các dòng, mỗi dòng có thêm thuộc tính thanhTien.
	layDanhSach() {
		return this.dsDong.map(dong => ({ ...dong, thanhTien: dong.gia * dong.soLuong }));
	}

	// 7. Chuỗi JSON của mảng các dòng.
	xuatJSON() {
		return JSON.stringify(this.dsDong);
	}
}

// 8. Tạo lại một GioHang từ chuỗi JSON do xuatJSON() sinh ra.
function napGioHang(chuoiJSON) {
	// JSON.parse chỉ cho object thường (không có phương thức), nên phải tạo GioHang mới rồi nạp dữ liệu vào.
	const gio = new GioHang();
	gio.dsDong = JSON.parse(chuoiJSON);
	return gio;
}
```

**Giải thích:**

1. **them**: `Number.isInteger(soLuong)` chỉ đúng khi `soLuong` là số nguyên kiểu number. Vì vậy nó loại được 2.5, `NaN`, `null`, `undefined` và cả chuỗi `"50"` (T4, T5). Thêm điều kiện `soLuong <= 0` để loại 0 và số âm. Nếu sản phẩm đã có trong giỏ thì cộng dồn số lượng (T3). Nếu chưa có thì tạo một object mới bằng cách chép từng thuộc tính. Nhờ vậy `DANH_MUC` không bị thêm `soLuong` (T6), và sửa object sản phẩm bên ngoài không ảnh hưởng tới giỏ (T7).
2. **xoa**: `findIndex` tìm vị trí dòng cần xoá, trả về -1 nếu không có. Sau đó `splice(viTri, 1)` xoá đúng một phần tử (T8).
3. **tongTien**: `reduce` với giá trị khởi đầu là `0`, nên giỏ rỗng trả về 0 (T1, T9).
4. **thongKeTheoLoai**: dùng loại sản phẩm làm khoá của object, `(thongKe[loai] || 0)` để cộng dồn theo loại. Giỏ rỗng thì trả về `{}` (T10, T11).
5. **dongDatNhat**: lấy từ `layDanhSach()` nên kết quả đã là bản sao và có sẵn `thanhTien`. Dùng `>` để khi hai dòng bằng nhau thì giữ dòng đứng trước (T12, T13).
6. **layDanhSach**: `map` kết hợp spread `{ ...dong, thanhTien }` tạo object mới cho từng dòng. Sửa hay `pop` mảng trả về đều không làm đổi giỏ (T14, T15). Mỗi dòng chỉ có các giá trị nguyên thuỷ nên sao chép nông là đủ.
7. **xuatJSON**: `JSON.stringify(this.dsDong)` cho ra mảng, mỗi phần tử có đúng 5 khoá. Thuộc tính `thanhTien` không được lưu trong `dsDong` (T16).
8. **napGioHang**: `JSON.parse` chỉ trả về mảng object thường, không có các phương thức `tongTien`, `them`... Vì vậy cần tạo `new GioHang()` rồi gán `dsDong` bằng dữ liệu vừa parse. Mỗi lần parse tạo ra object mới nên giỏ nạp lại độc lập với giỏ gốc (T17 → T20).

## Kết quả trang index.html

```
JSON gửi lên máy chủ: [{"id":"TC01","ten":"Thiệp cưới cotton","loai":"thiep cuoi","gia":1500,"soLuong":150},{"id":"PB01","ten":"Phong bì lót lụa","loai":"phu kien","gia":500,"soLuong":200}]

KIỂM TRA BÀI B: 20/20 đạt
✅ Đạt  T1  giỏ mới: tongTien() là 0, layDanhSach() là mảng rỗng
✅ Đạt  T2  them trả về true, dòng mới có đủ id, ten, loai, gia, soLuong
✅ Đạt  T3  thêm cùng một sản phẩm hai lần → vẫn 1 dòng, số lượng cộng dồn (100 + 50 = 150)
✅ Đạt  T4  số lượng 0, âm, lẻ (2.5), NaN, null, undefined → false, giỏ không đổi
✅ Đạt  T5  số lượng là CHUỖI "50" → false; số lượng cũ vẫn là number 100
✅ Đạt  T6  DANH_MUC không bị thay đổi sau khi thêm vào giỏ
✅ Đạt  T7  giỏ không giữ tham chiếu tới object sản phẩm bên ngoài
✅ Đạt  T8  xoa: có → true và mất dòng; không có → false và giữ nguyên
✅ Đạt  T9  tongTien của giỏ mẫu là 340000
✅ Đạt  T10 thongKeTheoLoai: { "thiep cuoi": 240000, "phu kien": 100000 }, không thừa khoá
✅ Đạt  T11 thongKeTheoLoai của giỏ rỗng là object rỗng
✅ Đạt  T12 dongDatNhat: dòng A, thanhTien 150000; giỏ rỗng → null
✅ Đạt  T13 dongDatNhat: hai dòng bằng nhau → lấy dòng ĐỨNG TRƯỚC
✅ Đạt  T14 layDanhSach có thanhTien cho từng dòng
✅ Đạt  T15 sửa kết quả của layDanhSach / dongDatNhat KHÔNG làm đổi giỏ
✅ Đạt  T16 xuatJSON trả về chuỗi; parse ra mảng, mỗi phần tử có ĐÚNG 5 khoá id, ten, loai, gia, soLuong
✅ Đạt  T17 napGioHang trả về giỏ dùng được phương thức: tongTien() là 340000
✅ Đạt  T18 giỏ nạp lại vẫn cộng dồn đúng và độc lập với giỏ gốc
✅ Đạt  T19 napGioHang("[]") → giỏ rỗng, tongTien() là 0
✅ Đạt  T20 xuất → nạp → xuất cho ra đúng chuỗi ban đầu
```

Ô giỏ hàng bên phải hiện: Thiệp cưới cotton 150 cái — 225000 đ; Phong bì lót lụa 200 cái — 100000 đ; Tổng: 325000 đ.
