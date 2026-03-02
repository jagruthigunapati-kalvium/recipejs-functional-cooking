// Wrap entire app in IIFE for encapsulation
const RecipeApp = (() => {

    // ============================================
    // Recipe Data
    // ============================================
    const recipes = [
    {
        id: 1,
        title: "Classic Spaghetti Carbonara",
        time: 25,
        difficulty: "easy",
        description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
        category: "pasta",
        ingredients: [
            "400g spaghetti",
            "200g pancetta",
            "4 eggs",
            "100g Parmesan cheese",
            "Black pepper",
            "Salt"
        ],
        steps: [
            "Boil salted water in a large pot",
            "Cook spaghetti until al dente",
            "Cook pancetta until crispy",
            "Beat eggs and mix with grated cheese",
            "Combine hot pasta with pancetta (off heat)",
            "Quickly mix in egg mixture",
            "Add pepper and serve immediately"
        ]
    },

    {
        id: 2,
        title: "Chicken Tikka Masala",
        time: 45,
        difficulty: "medium",
        description: "Tender chicken pieces in a creamy, spiced tomato sauce.",
        category: "curry",
        ingredients: [
            "500g chicken",
            "1 cup yogurt",
            "2 onions",
            "2 tomatoes",
            "2 tbsp tikka masala paste",
            "1/2 cup cream",
            "Salt and oil"
        ],
        steps: [
            {
                text: "Marinate the chicken",
                substeps: [
                    "Mix yogurt and tikka masala paste",
                    "Add chicken pieces",
                    "Refrigerate for 30 minutes"
                ]
            },
            "Cook onions until golden",
            "Add tomatoes and cook until soft",
            "Add marinated chicken and cook thoroughly",
            "Stir in cream and simmer for 10 minutes",
            "Serve with rice or naan"
        ]
    },

    {   
        id: 3,
        title: "Homemade Croissants",
        time: 180,
        difficulty: "hard",
        description: "Buttery, flaky French pastries that require patience but deliver amazing results.",
        category: "baking",
        ingredients: [
            "3 cups flour",
            "1 cup butter",
            "1 cup milk",
            "2 tbsp sugar",
            "1 tsp yeast",
            "1 tsp salt"
        ],
        steps: [
            "Mix flour, sugar, yeast, and salt",
            "Add milk and knead into dough",
            "Chill dough for 1 hour",
            "Roll and fold butter into dough",
            "Repeat rolling and folding 3 times",
            "Shape into croissants",
            "Bake at 200°C for 15-20 minutes"
        ]
    },

    {
        id: 4,
        title: "Greek Salad",
        time: 15,
        difficulty: "easy",
        description: "Fresh vegetables, feta cheese, and olives tossed in olive oil and herbs.",
        category: "salad",
        ingredients: [
            "2 cucumbers",
            "3 tomatoes",
            "1 onion",
            "100g feta cheese",
            "Olives",
            "Olive oil",
            "Oregano"
        ],
        steps: [
            "Chop vegetables",
            "Combine in a bowl",
            "Add olives and feta",
            "Drizzle olive oil",
            "Sprinkle oregano",
            "Toss and serve"
        ]
    },

    {
        id: 5,
        title: "Beef Wellington",
        time: 120,
        difficulty: "hard",
        description: "Tender beef fillet coated with mushroom duxelles and wrapped in puff pastry.",
        category: "meat",
        ingredients: [
            "Beef fillet",
            "Mushrooms",
            "Puff pastry",
            "Mustard",
            "1 egg (for wash)",
            "Salt and pepper"
        ],
        steps: [
            {
                text: "Prepare beef",
                substeps: [
                    "Season beef with salt and pepper",
                    "Sear on all sides",
                    "Brush with mustard"
                ]
            },
            "Cook chopped mushrooms until dry",
            "Wrap beef with mushrooms in pastry",
            "Brush with egg wash",
            "Bake at 200°C for 35-40 minutes",
            "Rest before slicing"
        ]
    },

    {
        id: 6,
        title: "Vegetable Stir Fry",
        time: 20,
        difficulty: "easy",
        description: "Colorful mixed vegetables cooked quickly in a savory sauce.",
        category: "vegetarian",
        ingredients: [
            "Broccoli",
            "Carrots",
            "Bell peppers",
            "Soy sauce",
            "Garlic",
            "Oil"
        ],
        steps: [
            "Chop vegetables",
            "Heat oil in a pan",
            "Add garlic and sauté",
            "Add vegetables and stir fry",
            "Add soy sauce",
            "Cook for 5 minutes and serve"
        ]
    },

    {
        id: 7,
        title: "Pad Thai",
        time: 30,
        difficulty: "medium",
        description: "Thai stir-fried rice noodles with shrimp, peanuts, and tangy tamarind sauce.",
        category: "noodles",
        ingredients: [
            "Rice noodles",
            "Shrimp",
            "Eggs",
            "Bean sprouts",
            "Peanuts",
            "Tamarind paste",
            "Soy sauce"
        ],
        steps: [
            "Soak rice noodles",
            "Cook shrimp until pink",
            "Scramble eggs in pan",
            "Add noodles and sauce",
            "Stir in bean sprouts",
            "Top with peanuts and serve"
        ]
    },

    {
        id: 8,
        title: "Margherita Pizza",
        time: 60,
        difficulty: "medium",
        description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil.",
        category: "pizza",
        ingredients: [
            "Pizza dough",
            "Tomato sauce",
            "Fresh mozzarella",
            "Fresh basil",
            "Olive oil",
            "Salt"
        ],
        steps: [
            "Preheat oven to 220°C",
            "Roll out dough",
            "Spread tomato sauce",
            "Add mozzarella slices",
            "Bake for 12-15 minutes",
            "Top with basil and drizzle olive oil",
            "Serve hot"
        ]
    }
];

    // ============================================
    // STATE MANAGEMENT
    // ============================================
    let currentFilter = 'all';
    let currentSort = 'none';

    // ============================================
    // DOM REFERENCES
    // ============================================
    const recipeContainer = document.querySelector('#recipe-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortButtons = document.querySelectorAll('.sort-btn');

    // ============================================
    // FILTER FUNCTIONS
    // ============================================
    const filterByDifficulty = (recipes, difficulty) =>
        recipes.filter(recipe => recipe.difficulty === difficulty);

    const filterByTime = (recipes, maxTime) =>
        recipes.filter(recipe => recipe.time <= maxTime);

    const applyFilter = (recipes, filterType) => {
        switch(filterType) {
            case 'easy': return filterByDifficulty(recipes, 'easy');
            case 'medium': return filterByDifficulty(recipes, 'medium');
            case 'hard': return filterByDifficulty(recipes, 'hard');
            case 'quick': return filterByTime(recipes, 30);
            default: return recipes;
        }
    };

    // ============================================
    // SORT FUNCTIONS
    // ============================================
    const sortByName = (recipes) =>
        [...recipes].sort((a, b) => a.title.localeCompare(b.title));

    const sortByTime = (recipes) =>
        [...recipes].sort((a, b) => a.time - b.time);

    const applySort = (recipes, sortType) => {
        switch(sortType) {
            case 'name': return sortByName(recipes);
            case 'time': return sortByTime(recipes);
            default: return recipes;
        }
    };

    // ============================================
    // MAIN UPDATE FUNCTION
    // ============================================
    const updateDisplay = () => {
        let recipesToDisplay = recipes;
        recipesToDisplay = applyFilter(recipesToDisplay, currentFilter);
        recipesToDisplay = applySort(recipesToDisplay, currentSort);
        renderRecipes(recipesToDisplay);

        console.log(`Displaying ${recipesToDisplay.length} recipes`);
    };

    // ============================================
    // STEP RENDERING (RECURSIVE)
    // ============================================
    const renderSteps = (steps, level = 0) => {
        const listClass = level === 0 ? 'steps-list' : 'substeps-list';
        let html = `<ol class="${listClass}">`;

        steps.forEach(step => {
            if (typeof step === 'string') {
                html += `<li>${step}</li>`;
            } else {
                html += `<li>${step.text}`;
                if (step.substeps && step.substeps.length > 0) {
                    html += renderSteps(step.substeps, level + 1);
                }
                html += `</li>`;
            }
        });

        html += `</ol>`;
        return html;
    };

    const createStepsHTML = (steps) => {
        if (!steps || steps.length === 0) {
            return '<p>No steps available</p>';
        }
        return renderSteps(steps);
    };

    // ============================================
    // CARD CREATION
    // ============================================
    const createRecipeCard = (recipe) => `
        <div class="recipe-card" data-id="${recipe.id}">
            <h3>${recipe.title}</h3>
            <div class="recipe-meta">
                <span>⏱️ ${recipe.time} min</span>
                <span class="difficulty ${recipe.difficulty}">
                    ${recipe.difficulty}
                </span>
            </div>
            <p>${recipe.description}</p>

            <div class="card-actions">
                <button class="toggle-btn"
                    data-recipe-id="${recipe.id}"
                    data-toggle="steps">
                    📋 Show Steps
                </button>
                <button class="toggle-btn"
                    data-recipe-id="${recipe.id}"
                    data-toggle="ingredients">
                    🥗 Show Ingredients
                </button>
            </div>

            <div class="ingredients-container"
                data-recipe-id="${recipe.id}">
                <h4>Ingredients:</h4>
                <ul>
                    ${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}
                </ul>
            </div>

            <div class="steps-container"
                data-recipe-id="${recipe.id}">
                <h4>Cooking Steps:</h4>
                ${createStepsHTML(recipe.steps)}
            </div>
        </div>
    `;

    const renderRecipes = (recipesToRender) => {
        recipeContainer.innerHTML =
            recipesToRender.map(createRecipeCard).join('');
    };

    // ============================================
    // UI HELPERS
    // ============================================
    const updateActiveButtons = () => {
        filterButtons.forEach(btn => {
            btn.classList.toggle(
                'active',
                btn.dataset.filter === currentFilter
            );
        });

        sortButtons.forEach(btn => {
            btn.classList.toggle(
                'active',
                btn.dataset.sort === currentSort
            );
        });
    };

    // ============================================
    // EVENT HANDLERS
    // ============================================
    const handleFilterClick = (event) => {
        currentFilter = event.target.dataset.filter;
        updateActiveButtons();
        updateDisplay();
    };

    const handleSortClick = (event) => {
        currentSort = event.target.dataset.sort;
        updateActiveButtons();
        updateDisplay();
    };

    const handleToggleClick = (event) => {
        if (!event.target.classList.contains('toggle-btn')) return;

        const button = event.target;
        const recipeId = button.dataset.recipeId;
        const toggleType = button.dataset.toggle;

        const containerClass =
            toggleType === 'steps'
                ? 'steps-container'
                : 'ingredients-container';

        const container = document.querySelector(
            `.${containerClass}[data-recipe-id="${recipeId}"]`
        );

        if (container) {
            container.classList.toggle('visible');
            const isVisible = container.classList.contains('visible');

            if (toggleType === 'steps') {
                button.textContent = isVisible
                    ? '📋 Hide Steps'
                    : '📋 Show Steps';
            } else {
                button.textContent = isVisible
                    ? '🥗 Hide Ingredients'
                    : '🥗 Show Ingredients';
            }
        }
    };

    // ============================================
    // EVENT LISTENER SETUP
    // ============================================
    const setupEventListeners = () => {
        filterButtons.forEach(btn =>
            btn.addEventListener('click', handleFilterClick)
        );

        sortButtons.forEach(btn =>
            btn.addEventListener('click', handleSortClick)
        );

        recipeContainer.addEventListener('click', handleToggleClick);
    };

    // ============================================
    // INITIALIZATION FUNCTION
    // ============================================
    const init = () => {
        console.log('RecipeApp initializing...');
        setupEventListeners();
        updateDisplay();
        console.log('RecipeApp ready!');
    };

    // ============================================
    // PUBLIC API
    // ============================================
    return {
        init
    };

})();  // IIFE runs immediately


// ============================================
// START THE APP
// ============================================
RecipeApp.init();