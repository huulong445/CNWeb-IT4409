# Bài tập 3 – JS thư viện ảnh và tin nhanh

## Thứ tự nạp file

- **index.html** (Bài A) chỉ nạp `bai-a-gallery.js`.
- **news.html** (Bài B) nạp `ho-tro.js`, rồi `bai-b-tin-nhanh.js`, rồi `kiem-tra.js`.

Các thẻ `<script>` nằm ở cuối `<body>`, nên khi script chạy thì toàn bộ HTML phía trên đã có trong cây DOM. Nhờ vậy `querySelector` và `getElementById` tìm được phần tử. Hàm `homNay()` nằm trong `ho-tro.js` nên đã có sẵn khi Bài B đăng tin. `kiem-tra.js` nạp sau cùng và gắn sự kiện cho nút "Chạy kiểm tra Bài B".

## Bài A. Điền chỗ trống – js/bai-a-gallery.js

**(1) `querySelector`**
Trả về phần tử đầu tiên khớp với bộ chọn CSS.

**(2) `querySelectorAll`**
Trả về NodeList gồm tất cả phần tử khớp.

**(3) `getElementById`**
Tìm phần tử theo id (không có dấu `#`).

**(4) `6`**
Trong `#gallery ul` có 6 thẻ `<li>`, mỗi thẻ chứa một `<img>`.

**(5) `3`**
Giữa `<ul>` và `<li>` đầu tiên có dấu xuống dòng và tab, nên `firstChild` là một nút văn bản (text node). Nút văn bản có `nodeType` là 3.

**(6) `13`**
`childNodes` đếm cả nút văn bản: 6 nút `<li>` và 7 nút khoảng trắng (trước, giữa và sau các `<li>`), tổng 6 + 7 = 13.

**(7) `parentNode`**
Đi từ `<img>` lên phần tử cha của nó là `<li>`. Có thể dùng `parentElement`, kết quả như nhau.

**(8) `createElement`**
Tạo một phần tử mới, ở đây là thẻ `<p>`.

**(9) `textContent`**
Gán nội dung dạng văn bản thuần, trình duyệt không diễn giải thẻ HTML. `innerHTML` thì có diễn giải.

**(10) `appendChild`**
Chèn vào cuối danh sách con của thẻ `<div>` chứa ảnh lớn. Có thể dùng `append`.

**(11) `!==`**
Nếu phần tử bị bấm không phải `<img>` thì không làm gì cả.

**(12) `return`**
Thoát khỏi hàm ngay.

**(13) `target`**
`e.target` là phần tử thật sự bị bấm, ở đây là `<img>`. Nó khác với `e.currentTarget` là phần tử gắn trình lắng nghe (`<ul>`).

**(14) `of`**
`for...of` duyệt từng phần tử trong NodeList.

**(15) `className`**
Gán lớp `dang-chon` cho thẻ `<li>` chứa ảnh vừa bấm.

**(16) `addEventListener`**
Đăng ký trình lắng nghe sự kiện.

**(17) `doiAnh`**
Truyền chính hàm (không có ngoặc `()`), để trình duyệt tự gọi hàm khi có click. Một trình lắng nghe đặt trên `<ul>` bắt được click của cả 6 ảnh nhờ cơ chế nổi bọt (event delegation).

**(18) (B)**
`doiAnh()` có ngoặc nghĩa là gọi hàm ngay lúc tải trang, không truyền đối số nên `e` là `undefined`. Dòng `e.target` vì thế báo lỗi `TypeError: Cannot read properties of undefined`.

**(19) `focus`**
Sự kiện xảy ra khi ô nhập được chọn để gõ. Sự kiện ngược lại là `blur`.

**(20) `removeEventListener`**
Gỡ trình lắng nghe đã đăng ký.

**(21) `doiAnh`**
Phải truyền đúng hàm đã dùng khi đăng ký thì mới gỡ được.

**(22) `click`**
`e.type` là tên sự kiện.

**(23) `nut-khoa`**
`e.target` là nút vừa bấm, có id là `nut-khoa`.

**(24) không**
Mỗi lần viết `(e) => doiAnh(e)` là tạo ra một hàm mới. Hàm truyền vào `removeEventListener` không phải là hàm đã đăng ký, nên không gỡ được.

**(25) `prepend`**
Chèn vào đầu danh sách con.

**(26) Hiện NGUYÊN cả cặp thẻ `<b>…</b>`**
Nội dung được gán bằng `textContent` nên `<b>` chỉ là ký tự thường, chữ không in đậm. Trên trang hiện đúng dòng chữ `Khuyến mãi <b>thiệp cưới</b>`.

**(27) `3`**
`#posts ul` ban đầu có 2 `<li>`, thêm 1 mục mới thành 3.

**Kết quả trong Console (index.html):**

```
6
3
13
LI
3
```

Khi bấm vào ảnh nhỏ đầu tiên, ảnh lớn đổi thành `images/meeting.jpg`, chú thích hiện "Đang xem: meeting.jpg" và `<li>` của ảnh đó được viền vàng (`dang-chon`). Sau khi bấm "Khoá thư viện ảnh", Console in `click` và `nut-khoa`, chú thích đổi thành "Thư viện ảnh đã khoá.", và bấm ảnh nhỏ không còn đổi ảnh nữa.

## Bài B. Viết code – js/bai-b-tin-nhanh.js

```js
const oTimKiem = document.getElementById("o-tim-kiem");
const dsTin = document.getElementById("list");
const boDem = document.getElementById("bo-dem");
const khongThay = document.getElementById("khong-thay");
const oTieuDe = document.getElementById("tin-tieu-de");
const oNoiDung = document.getElementById("tin-noi-dung");
const nutDang = document.getElementById("nut-dang");
const baoLoi = document.getElementById("bao-loi");

// F1. Bộ đếm "Đang hiển thị x/y tin" trong #bo-dem.
function capNhatBoDem() {
	const cacMuc = dsTin.querySelectorAll("li");
	let soHien = 0;
	for (const muc of cacMuc) {
		if (!muc.classList.contains("an")) {
			soHien++;
		}
	}
	boDem.textContent = `Đang hiển thị ${soHien}/${cacMuc.length} tin`;
	return soHien;
}

// F2 + F3. Lọc tin khi gõ vào #o-tim-kiem (sự kiện keyup) và thông báo #khong-thay.
function locTin() {
	const tuKhoa = oTimKiem.value;
	const tuKhoaThuong = tuKhoa.toLowerCase();
	for (const muc of dsTin.querySelectorAll("li")) {
		const vanBan = muc.querySelector("h3").textContent + " " + muc.querySelector("p").textContent;
		const khop = vanBan.toLowerCase().includes(tuKhoaThuong);
		muc.classList.toggle("an", !khop);
	}
	const soHien = capNhatBoDem();
	if (soHien === 0) {
		// textContent: từ khoá có thẻ HTML vẫn hiện nguyên văn.
		khongThay.textContent = `Không tìm thấy tin nào cho "${tuKhoa}"`;
		khongThay.classList.remove("an");
	} else {
		khongThay.textContent = "";
		khongThay.classList.add("an");
	}
}

oTimKiem.addEventListener("keyup", locTin);
locTin();

// F4. Nút "Read more >>" / "Thu gọn <<" — MỘT trình lắng nghe đặt trên #list.
dsTin.addEventListener("click", (e) => {
	// Chỉ xử lý khi bấm trúng nút .more; bấm vào tiêu đề, đoạn văn hay <li> thì bỏ qua.
	if (!e.target.classList.contains("more")) {
		return;
	}
	const doan = e.target.parentNode.querySelector("p");
	doan.classList.toggle("day-du");
	e.target.textContent = doan.classList.contains("day-du") ? "Thu gọn <<" : "Read more >>";
});

// F5. Nút #nut-dang: kiểm tra dữ liệu, tạo <li> mới, chèn vào đầu #list.
nutDang.addEventListener("click", () => {
	const tieuDe = oTieuDe.value.trim();
	const noiDung = oNoiDung.value.trim();
	if (tieuDe === "" || noiDung === "") {
		baoLoi.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
		return;
	}

	// Tạo phần tử bằng createElement + textContent để nội dung người dùng nhập không thành thẻ HTML.
	const muc = document.createElement("li");
	const ngay = document.createElement("span");
	const h3 = document.createElement("h3");
	const doan = document.createElement("p");
	const nut = document.createElement("button");
	ngay.className = "time";
	ngay.textContent = homNay();
	h3.textContent = tieuDe;
	doan.textContent = noiDung;
	nut.type = "button";
	nut.className = "more";
	nut.textContent = "Read more >>";
	muc.append(ngay, h3, doan, nut);
	dsTin.prepend(muc);

	oTieuDe.value = "";
	oNoiDung.value = "";
	baoLoi.textContent = "";
	// Lọc lại theo từ khoá đang gõ, đồng thời cập nhật bộ đếm.
	locTin();
});
```

**Giải thích:**

1. **F1 – Bộ đếm**: `capNhatBoDem()` đếm số `<li>` trong `#list` không có lớp `an` (lớp `an` được CSS ẩn bằng `display: none`). Sau đó ghi `Đang hiển thị x/y tin` vào `#bo-dem`. Hàm luôn đếm lại từ DOM, nên tin vừa đăng cũng được tính (T1, T5, T14).
2. **F2 – Lọc tin**: mỗi lần nhả phím (`keyup`), hàm `locTin()` ghép chữ của `<h3>` và `<p>` trong từng tin, đổi cả văn bản lẫn từ khoá sang chữ thường rồi dùng `includes` để so khớp. Nhờ vậy tìm được cả từ chỉ có trong nội dung và không phân biệt hoa thường (T2 → T4). `classList.toggle("an", !khop)` ẩn tin không khớp và hiện lại tin khớp. Hàm cũng được gọi một lần ngay khi tải trang để bộ đếm có giá trị ban đầu.
3. **F3 – Không tìm thấy**: khi không còn tin nào hiện, bỏ lớp `an` của `#khong-thay` và ghi câu thông báo bằng `textContent`. Vì vậy từ khoá như `<b>x</b>` hiện nguyên văn chứ không thành thẻ (T6, T7). Trang chỉ dùng lại đúng một phần tử `#khong-thay` có sẵn, không tạo thêm. Khi có kết quả thì thêm lại lớp `an` để ẩn (T8).
4. **F4 – Read more**: chỉ đặt một trình lắng nghe trên `#list` (event delegation). Khi click, kiểm tra `e.target` có lớp `more` hay không. Nếu bấm vào tiêu đề, đoạn văn hay `<li>` thì `return`, không đổi gì (T10). Đoạn văn được lấy từ `e.target.parentNode`, tức là `<li>` của chính nút đó, nên mở tin này không làm tin khác mở theo (T11). `toggle("day-du")` mở hoặc thu gọn đoạn văn, chữ trên nút đổi giữa "Read more >>" và "Thu gọn <<" (T9). Vì trình lắng nghe nằm trên `#list`, nút của tin đăng sau này cũng tự hoạt động mà không cần gắn thêm sự kiện (T16).
5. **F5 – Đăng tin**: dùng `trim()` để chuỗi chỉ có khoảng trắng cũng bị coi là trống. Thiếu tiêu đề hoặc nội dung thì báo lỗi và dừng lại (T12). Nếu hợp lệ thì tạo `<li>` bằng `createElement`, gồm `span.time` (ngày lấy từ `homNay()`), `<h3>`, `<p>` và `button.more` có `type="button"`. Mọi nội dung đều gán bằng `textContent` nên người dùng nhập thẻ HTML hay `<script>` cũng chỉ hiện ra như văn bản (T15). Tin mới được chèn vào đầu danh sách bằng `prepend` (T13). Sau đó xoá trắng hai ô nhập và câu báo lỗi, rồi gọi lại `locTin()`. Nhờ vậy nếu đang lọc thì tin mới cũng bị ẩn hoặc hiện theo từ khoá, và bộ đếm được cập nhật (T14, T17, T18).

## Kết quả trang news.html (bấm "Chạy kiểm tra Bài B")

```
KIỂM TRA BÀI B: 18/18 đạt  (tải lại trang để xoá các tin thử)
✅ Đạt  T1  không có từ khoá: hiện tất cả, bộ đếm "Đang hiển thị N/N tin"
✅ Đạt  T2  gõ "cotton": chỉ còn các tin có chữ cotton trong tiêu đề hoặc nội dung
✅ Đạt  T3  không phân biệt hoa thường: "CoTToN" cho kết quả như "cotton"
✅ Đạt  T4  từ khoá chỉ có trong nội dung ("phong bì") vẫn tìm thấy
✅ Đạt  T5  bộ đếm cập nhật theo kết quả lọc
✅ Đạt  T6  không tin nào khớp: #khong-thay hiện ra với đúng nội dung, bộ đếm 0/N
✅ Đạt  T7  từ khoá chứa thẻ HTML được hiện nguyên văn, không thành phần tử
✅ Đạt  T8  xoá từ khoá: hiện lại tất cả, #khong-thay ẩn, cả trang chỉ có một #khong-thay
✅ Đạt  T9  bấm "Read more >>": đoạn văn có lớp day-du, nút đổi thành "Thu gọn <<"; bấm lần nữa thì trở lại
✅ Đạt  T10 bấm vào tiêu đề hoặc đoạn văn (không phải nút) thì không có gì thay đổi
✅ Đạt  T11 mở tin thứ nhất không làm tin thứ hai mở theo
✅ Đạt  T12 thiếu tiêu đề hoặc thiếu nội dung: báo lỗi đúng câu, không thêm tin
✅ Đạt  T13 đăng hợp lệ: <li> mới nằm ĐẦU danh sách, đủ span.time, h3, p, button.more
✅ Đạt  T14 sau khi đăng: hai ô nhập trống, hết báo lỗi, bộ đếm tăng
✅ Đạt  T15 nội dung người dùng nhập được hiện nguyên văn, không thành thẻ HTML
✅ Đạt  T16 nút "Read more >>" của tin VỪA ĐĂNG cũng hoạt động
✅ Đạt  T17 đang lọc "cotton" mà đăng tin không chứa cotton: tin mới bị ẩn, bộ đếm vẫn đúng
✅ Đạt  T18 đang lọc "cotton" mà đăng tin CÓ chữ Cotton: tin mới hiện ra
```
