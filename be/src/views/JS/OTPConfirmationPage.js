// Các tham chiếu ban đầu
const otpInputs = document.querySelectorAll('input[type="number"]');
const submitButton = document.getElementById("submit");
let inputCount = 0,
    finalInput = "";

// Cập nhật input khi nhap xong thi se blur
const updateInputConfig = (element, disabledStatus) => {
    if (element) {
        element.disabled = disabledStatus;
        if (!disabledStatus) {
            element.focus();
        } else {
            element.blur();
        }
    }
};
function sendOTP() {
    // Gửi yêu cầu HTTP đến máy chủ để gửi email
    fetch('/sendMail', { // Sửa đổi URL thành "/sendMail"
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: 'asdassgsgs2q321@gmail.com' // Thay recipient bằng email muốn gửi OTP
        })
    }).then(response => {
        if (response.ok) {
            alert('Email đã được gửi thành công!');
        } else {
            alert('Đã xảy ra lỗi khi gửi email.1');
        }
    }).catch(error => {
        console.error('Error:', error);
    });
}

// Remove require statements and server.js code here


otpInputs.forEach((element, index) => {
    element.addEventListener("keyup", (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
        let { value } = e.target;

        if (value.length === 1) {
            updateInputConfig(e.target, true);
            finalInput += value;
            console.log({ index });
            if (inputCount < 4 && index < otpInputs.length - 1) {
                updateInputConfig(otpInputs[index + 1], false); // Kích hoạt input tiếp theo
            }

            inputCount++;
        } else if (value.length === 0 && e.key === "Backspace") {
            finalInput = finalInput.substring(0, finalInput.length - 1);
            if (inputCount === 0) {
                updateInputConfig(e.target, false);
                return false;
            }
            updateInputConfig(e.target, true);
            e.target.previousElementSibling.value = "";
            updateInputConfig(e.target.previousElementSibling, false);
            inputCount--;
        } else if (value.length > 1) {
            e.target.value = value.split("")[0];
        }

        submitButton.classList.add("hide");
    });
});


window.addEventListener("keyup", (e) => {
    if (inputCount > 4) {
        submitButton.classList.remove("hide");
        submitButton.classList.add("show");
        if (e.key == "Backspace") {
            finalInput = finalInput.substring(0, finalInput.length - 1);
            updateInputConfig(otpInputs[otpInputs.length - 1], false);
            otpInputs[otpInputs.length - 1].value = "";
            inputCount -= 1;
            submitButton.classList.add("hide");
        }
    }
});

const validateOTP = () => {
    alert("Thành công");
};

// Bắt đầu
const startInput = () => {
    inputCount = 0;
    finalInput = "";
    otpInputs.forEach((element) => {
        element.value = "";
    });
    updateInputConfig(otpInputs[0], false);
};

window.onload = startInput();
const resetButton = document.getElementById("resetButton");

if (resetButton) {
    resetButton.addEventListener("click", function () {
        // Xóa tất cả các giá trị đã nhập
        otpInputs.forEach((element) => {
            element.value = "";
        });

        // Vô hiệu hóa tất cả các input
        disableAllInputs();

        // Bắt đầu nhập lại từ input đầu tiên
        startInput();
    });
}
function disableAllInputs() {
    otpInputs.forEach((element) => {
        element.disabled = true;
    });
}
