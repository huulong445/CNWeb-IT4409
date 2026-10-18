# Bài tập 1 – JS phiếu báo giá và xác nhận đơn in

## Thứ tự nạp file

- **index.html** nạp `ho-tro.js` rồi đến `bai-a-bao-gia.js`.
- **about.html** nạp `ho-tro.js`, rồi `bai-b-phieu-in.js`, rồi `kiem-tra.js`.

Các thẻ `<script>` nằm ở cuối `<body>`, nên khi script chạy thì phần tử `#ket-qua` đã có trên trang. Script chạy theo đúng thứ tự trên. Vì vậy hàm `hienThi` (trong `ho-tro.js`) đã có sẵn khi bài A và bài B gọi đến. Bốn hàm của bài B cũng đã được khai báo xong trước khi `kiem-tra.js` chạy 12 testcase.

## 1a. Điền chỗ trống – js/bai-a-bao-gia.js

**(1) `const`**
Tên xưởng không bao giờ được gán lại, nên khai báo hằng.

**(2) `let`**
`soLuong` còn được cập nhật ở Phần 2 và chỉ dùng trong phạm vi khối. `const` không gán lại được, còn `var` không có phạm vi khối.

**(3) `300200`**
`300 + "200"`: có một vế là chuỗi nên `+` nối chuỗi chứ không cộng số.

**(4) `true`**
`==` đổi kiểu trước khi so sánh: `"200"` thành `200`, và `200 == 200`.

**(5) `false`**
`===` so sánh cả kiểu: string khác number.

**(6) `let`**
`giamGia` được gán lại trong `if` và còn dùng sau khối `if`, nên phải khai báo ở ngoài khối và không dùng `const`.

**(7) `ReferenceError` (lyDo is not defined)**
`lyDo` khai báo bằng `const` bên trong khối `if`, nên ra ngoài khối thì biến không còn tồn tại.

**(8) `undefined`**
Hoisting: khai báo `var maDon` được đưa lên đầu, nhưng phép gán thì không, nên lúc in ra giá trị còn là `undefined`.

**(9) Báo lỗi `ReferenceError: Cannot access 'maDon' before initialization`**
Biến `let` cũng được hoisting nhưng nằm trong "vùng chết tạm thời" (TDZ), nên dùng trước dòng khai báo là báo lỗi.

**(10) `==`**
`ghiChu == null` chỉ đúng khi giá trị là `null` hoặc `undefined`, còn với `""` và `0` thì sai. Đúng yêu cầu chỉ dùng một phép so sánh.

**(11) `500`**
`donKhach = donMau` chỉ chép tham chiếu, hai biến cùng trỏ tới một object. Sửa `donKhach.soLuong` thì `donMau.soLuong` cũng đổi.

**(12) `true`**
Cùng một tham chiếu nên `===` cho kết quả `true`.

**(13) Dòng (B)**
`donMau = {}` là gán lại một hằng, gây lỗi `TypeError: Assignment to constant variable`. Dòng (A) chỉ sửa thuộc tính của object nên hợp lệ: `const` khóa biến, không khóa nội dung object.

**(14) `{`**
Dấu mở ngoặc của object phải nằm cùng dòng với `return`.

**(15) `undefined`**
ASI (tự chèn dấu chấm phẩy) sẽ chèn `;` ngay sau `return` khi `return` đứng một mình một dòng, nên hàm trả về `undefined`.

**(16) `` ` `` (dấu backtick)**
Dùng để mở và đóng template literal.

**(17) `${soLuong}`**
Chèn biến vào template literal.

**(18) `log`**
`console.log` in thông tin thông thường.

**(19) `table`**
`console.table` in mảng object dưới dạng bảng.

**Kết quả chạy:**

```
=== Blakletterpress ===
Số lượng : 500 thiệp
Tạm tính : 600000 đ
Giảm giá : 60000 đ (10 %)
VAT      : 54000 đ
Tổng     : 594000 đ
Ghi chú  : (không có)
```

Cách tính: tạm tính = 500 × 1200 = 600 000. Giảm 10 % = 60 000. VAT = (600 000 − 60 000) × 10 % = 54 000. Tổng = 600 000 − 60 000 + 54 000 = 594 000.

## 1b. Viết code – js/bai-b-phieu-in.js

```js
// 1. Trả về tổng tiền (kiểu number) = soLuong × donGia + VAT + phiGiao.
function tinhTong(soLuong, donGia, phiGiao) {
	const tamTinh = Number(soLuong) * Number(donGia);
	const vat = tamTinh * VAT_PHAN_TRAM / 100;
	return tamTinh + vat + Number(phiGiao);
}

// 2. Trả về chuỗi mô tả số lần in lại.
function moTaInLai(soLan) {
	if (soLan == null) {            // đúng cho cả null và undefined
		return "Chưa rõ";
	}
	if (soLan === 0) {
		return "In lần đầu";
	}
	return `In lại lần ${soLan}`;
}

// 3. Trả về chuỗi phiếu xác nhận gồm đúng 5 dòng.
function inPhieu(don) {
	const tong = tinhTong(don.soLuong, don.donGia, don.phiGiao);
	return `=== ${TEN_XUONG.toUpperCase()} ===
Mã đơn : ${don.ma}
Khách  : ${don.khach.ten} (${don.khach.sdt})
Tổng   : ${tong} đ
Ghi chú: ${moTaInLai(don.soLanIn)}`;
}

// 4. Trả về một đơn MỚI để in lại; đơn cũ không được thay đổi.
function taoDonInLai(donCu, sdtMoi) {
	return {
		...donCu,
		khach: { ...donCu.khach, sdt: sdtMoi },
		soLanIn: donCu.soLanIn + 1
	};
}
```

**Giải thích:**

1. **tinhTong**: dữ liệu lấy từ form là chuỗi. Nếu không đổi kiểu thì `+` sẽ nối chuỗi, ví dụ `"375000" + "30000"`. Vì vậy cả ba tham số đều được đổi bằng `Number()`, và kết quả luôn là number (T3).
   Ví dụ: 250 × 1500 = 375 000. VAT 10 % = 37 500. Cộng phí giao 30 000 thì được **442 500**.
2. **moTaInLai**: `soLan == null` bắt được cả `null` lẫn `undefined` trong một phép so sánh. Sau đó dùng `=== 0` để không nhầm 0 với giá trị khác. Các số dương còn lại trả về `In lại lần n` bằng template literal.
3. **inPhieu**: viết bằng một template literal nhiều dòng. Dấu backtick mở ngay trước `===` và đóng ngay sau dòng 5, nên chuỗi không có dòng trống hay khoảng trắng thừa ở đầu và cuối. Các dòng 2 đến 5 viết sát lề trái, vì nếu thụt lề thì khoảng trắng sẽ nằm luôn trong chuỗi. Dòng 1 dùng `TEN_XUONG.toUpperCase()`. Dòng 4 gọi `tinhTong`. Dòng 5 gọi `moTaInLai(don.soLanIn)`.
4. **taoDonInLai**: object là kiểu tham chiếu. Nếu chỉ viết `{ ...donCu }` (sao chép nông) thì `khach` vẫn là object dùng chung, nên sửa `moi.khach.ten` cũng làm đơn cũ đổi theo (T12 sẽ sai). Vì vậy cần sao chép riêng cả object lồng bên trong: `khach: { ...donCu.khach, sdt: sdtMoi }`. Hàm không gán vào `donCu`, nên đơn cũ giữ nguyên `sdt` và `soLanIn` (T11).

## Kết quả trang about.html

```
=== BLAKLETTERPRESS ===
Mã đơn : BL-001
Khách  : Nguyễn An (0901234567)
Tổng   : 442500 đ
Ghi chú: In lần đầu

=== BLAKLETTERPRESS ===
Mã đơn : BL-001
Khách  : Nguyễn An (0988888888)
Tổng   : 442500 đ
Ghi chú: In lại lần 1

KIỂM TRA BÀI B: 12/12 đạt
✅ Đạt  T1  tinhTong nhận số: (250, 1500, 30000) → 442500
✅ Đạt  T2  tinhTong nhận chuỗi: ("250", "1500", "30000") → 442500
✅ Đạt  T3  tinhTong trả về kiểu number
✅ Đạt  T4  tinhTong("100", "2000", "0") → 220000
✅ Đạt  T5  moTaInLai(0) → "In lần đầu"
✅ Đạt  T6  moTaInLai(2) → "In lại lần 2"
✅ Đạt  T7  moTaInLai(null) và moTaInLai(undefined) → "Chưa rõ"
✅ Đạt  T8  inPhieu đúng từng ký tự (5 dòng)
✅ Đạt  T9  taoDonInLai trả về object MỚI (khác đơn cũ)
✅ Đạt  T10 đơn mới: sdt mới, soLanIn tăng 1
✅ Đạt  T11 đơn cũ KHÔNG đổi sdt và soLanIn
✅ Đạt  T12 sửa tên khách trên đơn mới không ảnh hưởng đơn cũ
```
