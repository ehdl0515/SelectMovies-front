document.addEventListener("DOMContentLoaded", function() {
    var dropdownTrigger = document.querySelector('.dropdown-trigger');
    var dropdownMenu = dropdownTrigger.querySelector('.dropdown');

    dropdownTrigger.addEventListener('mouseover', function() {
        dropdownMenu.style.display = 'block';
    });

    dropdownTrigger.addEventListener('mouseout', function() {
        dropdownMenu.style.display = 'none';
    });
});