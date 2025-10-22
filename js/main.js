document.addEventListener('DOMContentLoaded', function() {
    // General navegacion de menu
    const navElement = document.getElementById('main-nav');
    const categories = menuData.menu.categories;
    
    const navList = document.createElement('ul');
    categories.forEach(category => {
        const navItem = document.createElement('li');
        const navLink = document.createElement('a');
        navLink.href = `#${category.name.toLowerCase().replace(' ', '-')}`;
        navLink.textContent = category.name;
        navItem.appendChild(navLink);
        navList.appendChild(navItem);
    });
    navElement.appendChild(navList);

    // General menu itens
    const menuContainer = document.getElementById('menu-container');
    
    categories.forEach(category => {
        const section = document.createElement('section');
        section.id = category.name.toLowerCase().replace(' ', '-');
        section.className = 'menu-category';
        
        const categoryHeader = document.createElement('h3');
        categoryHeader.textContent = category.name;
        section.appendChild(categoryHeader);
        
        const itemsList = document.createElement('div');
        itemsList.className = 'menu-items';
        
        category.items.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            
            const itemHeader = document.createElement('div');
            itemHeader.className = 'item-header';
            
            const itemName = document.createElement('h4');
            itemName.textContent = item.name;
            
            const itemPrice = document.createElement('span');
            itemPrice.className = 'price';
            itemPrice.textContent = `$${item.price.toLocaleString('es-AR')}`;
            
            itemHeader.appendChild(itemName);
            itemHeader.appendChild(itemPrice);
            
            const itemDescription = document.createElement('p');
            itemDescription.className = 'description';
            itemDescription.textContent = item.description;
            
            menuItem.appendChild(itemHeader);
            menuItem.appendChild(itemDescription);
            itemsList.appendChild(menuItem);
        });
        
        section.appendChild(itemsList);
        menuContainer.appendChild(section);
    });
});