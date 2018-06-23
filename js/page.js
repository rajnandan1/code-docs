(function() {
    var menuCounter = 1;
    for (var key in dummyData) {
        //make the first level menu dynamically
        $("#firstLevelMenu").append('<li class="menu__item" role="menuitem"><a class="menu__link" data-submenu="submenu-' + menuCounter + '" aria-owns="submenu-' + menuCounter + '" id="FirstLevel' + menuCounter + '" href="#">' + key + '</a></li>')
        //make the second level menu
        var secondLevelHtml = '<ul data-menu="submenu-' + menuCounter + '" id="submenu-' + menuCounter + '" class="menu__level" tabindex="-1" role="menu" aria-label="' + key + '">';
        for (var code in dummyData[key]) {
            secondLevelHtml = secondLevelHtml + ' <li class="menu__item" role="menuitem"><a parent-menu="FirstLevel' + menuCounter + '" class="menu__link" href="#">' + code + '</a></li>';
        }
        var secondLevelHtml = secondLevelHtml + '</ul>';
        $("#firstLevelMenu").after(secondLevelHtml);
        menuCounter++
    }
    var menuEl = document.getElementById('ml-menu'),
        mlmenu = new MLMenu(menuEl, {
            // breadcrumbsCtrl : true, // show breadcrumbs
            // initialBreadcrumb : 'all', // initial breadcrumb text
            backCtrl: false, // show back button
            // itemsDelayInterval : 60, // delay between each menu item sliding animation
            onItemClick: loadDummyData // callback: item that doesn´t have a submenu gets clicked - onItemClick([event], [inner HTML of the clicked item])
        });

    // mobile menu toggle
    var openMenuCtrl = document.querySelector('.action--open'),
        closeMenuCtrl = document.querySelector('.action--close');

    openMenuCtrl.addEventListener('click', openMenu);
    closeMenuCtrl.addEventListener('click', closeMenu);

    function openMenu() {
        classie.add(menuEl, 'menu--open');
        closeMenuCtrl.focus();
    }

    function closeMenu() {
        classie.remove(menuEl, 'menu--open');
        openMenuCtrl.focus();
    }

    // simulate grid content loading
    var gridWrapper = document.querySelector('.content');

    function loadDummyData(ev, itemName, xyz) {
        ev.preventDefault();
        var key = $("#" + xyz).text();
        console.log(key, itemName)
        closeMenu();
        gridWrapper.innerHTML = '';
        classie.add(gridWrapper, 'content--loading');
        var codeObj = dummyData[key][itemName];
        $.get("codes/" + codeObj.code).then(function(data) {
            console.log(codeObj.type);
            classie.remove(gridWrapper, 'content--loading');
            gridWrapper.innerHTML = '<h1>' + itemName + ' For ' + key + '</h1><pre id="code-block" class="code-block language-' + codeObj.type + '"><code  >' + data + '</code></pre>';
            var block = document.getElementById('code-block')
            Prism.highlightElement(block);
        })

    }



})();