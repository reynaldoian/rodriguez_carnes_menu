document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Obtener datos y referencias
    const categories = menuData.menu.categories;
    const navElement = document.getElementById('main-nav');
    const menuContainer = document.getElementById('menu-container');
    
    // Referencias del formulario
    const categorySelect = document.getElementById('item-category');
    const form = document.getElementById('add-item-form');
    
    // Función para poblar el dropdown de categorías en el formulario
    function populateCategorySelect() {
        // Limpiar opciones previas
        categorySelect.innerHTML = '';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.name;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    }

    // 2. Función principal para renderizar TODO el menú (Navegación y Contenido)
    function renderMenu() {
        // Limpiar contenido existente antes de redibujar
        navElement.innerHTML = '';
        menuContainer.innerHTML = '';

        // A) Generación Dinámica de la Navegación
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

        // B) Generación Dinámica de los Ítems del Menú
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
                // Formato de moneda usando toLocaleString
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
        
        // C) Actualizar el select después de renderizar
        populateCategorySelect();
    }
    
    // 3. Manejar el envío del formulario y la Actualización Dinámica
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        // Obtener valores del formulario
        const name = document.getElementById('item-name').value;
        const description = document.getElementById('item-description').value;
        // Convertir precio a número
        const price = parseFloat(document.getElementById('item-price').value); 
        const categoryName = document.getElementById('item-category').value;
        
        // Crear el nuevo ítem
        const newItem = {
            name: name,
            description: description,
            price: price
        };
        
        // Encontrar la categoría y añadir el nuevo ítem
        const targetCategory = categories.find(cat => cat.name === categoryName);
        
        if (targetCategory) {
            targetCategory.items.push(newItem);
            
            // Redibujar el menú con el nuevo ítem
            renderMenu();
            
            alert(`Plato "${name}" agregado a la categoría "${categoryName}".`);
            form.reset(); // Limpiar formulario
        } else {
            alert('Error: Categoría no encontrada.');
        }
    });

    // 4. Inicializar la aplicación al cargar
    renderMenu();
});
