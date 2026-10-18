/* BÀI B — VIẾT CODE: Lọc tin và đăng tin nhanh (news.html)
   Viết code theo đặc tả.
   Không sửa news.html, không sửa css; chỉ viết JavaScript trong file này. */

// ---------- ĐÃ CHO SẴN (không sửa) ----------
// Chặn việc gửi form tìm kiếm khi nhấn Enter, để trang không bị tải lại.
document.querySelector("#searchbar form").addEventListener("submit", (e) => e.preventDefault());

// ---------- PHẦN BẠN VIẾT ----------

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
