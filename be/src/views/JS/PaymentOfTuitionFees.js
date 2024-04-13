// Dữ liệu mẫu
const tuitionFeesData = [
    { id: 1, type: 'Type 1', name: 'Tuition Fee 1', price: 100, link: 'PaymentInformationPage.html' },
    { id: 2, type: 'Type 2', name: 'Tuition Fee 2', price: 200, link: 'link2' },
    { id: 3, type: 'Type 3', name: 'Tuition Fee 3', price: 300, link: 'link3' },
    // Thêm dữ liệu mẫu để vượt quá 10 hàng
    { id: 4, type: 'Type 4', name: 'Tuition Fee 4', price: 400, link: 'link4' },
    { id: 5, type: 'Type 5', name: 'Tuition Fee 5', price: 500, link: 'link5' },
    { id: 6, type: 'Type 6', name: 'Tuition Fee 6', price: 600, link: 'link6' },
    { id: 7, type: 'Type 7', name: 'Tuition Fee 7', price: 700, link: 'link7' },
    { id: 8, type: 'Type 8', name: 'Tuition Fee 8', price: 800, link: 'link8' },
    { id: 9, type: 'Type 9', name: 'Tuition Fee 9', price: 900, link: 'link9' },
    { id: 10, type: 'Type 10', name: 'Tuition Fee 10', price: 1000, link: 'link10' },
    { id: 11, type: 'Type 11', name: 'Tuition Fee 11', price: 1100, link: 'link11' },
    { id: 12, type: 'Type 12', name: 'Tuition Fee 12', price: 1200, link: 'link12' }
];

// Lặp qua dữ liệu và chèn vào bảng
const tableBody = document.getElementById('table-body');
tuitionFeesData.forEach(data => {
    const row = document.createElement('tr');
    row.innerHTML = `
                <td>${data.id}</td>
                <td>${data.type}</td>
                <td>${data.name}</td>
                <td>${data.price}</td>
                <td><a href="${data.link}" class="link-button">Chuyển đến trang</a></td>
            `;
    tableBody.appendChild(row);
});

// Kiểm tra số lượng hàng và hiển thị thanh cuộn dọc nếu cần
const tableBodyWrapper = document.getElementById('table-body-wrapper');
if (tableBody.childElementCount > 10) {
    tableBodyWrapper.style.overflowY = 'auto';
}