showNotifications(0);

function showNotifications(index) {
    var notificationButtons = document.querySelectorAll('.notification-button');
    notificationButtons.forEach(function (button) {
        button.classList.remove('active');
    });
    document.querySelector('.notification-button:nth-child(' + (index + 1) + ')').classList.add('active');

    var notificationLists = document.querySelectorAll('.notification-list');
    notificationLists.forEach(function (list) {
        list.style.display = 'none';
    });
    document.getElementById('notificationList' + index).style.display = 'block';
}