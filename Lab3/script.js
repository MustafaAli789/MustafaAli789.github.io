
// initialzing selected items
document.querySelector("#vegetarianOption .userCardOpionYes").classList.add("userOptionNonActive")
document.querySelector("#glutenFreeOption .userCardOpionYes").classList.add("userOptionNonActive")
document.querySelector("#organicOption .userCardOpionYes").classList.add("userOptionNonActive");

let tabsAndContent = {
    Product : [document.getElementById("step2"), document.getElementById("productsTabContent")],
    Client: [document.getElementById("step1"), document.getElementById("clientTabContent")],
    Cart: [document.getElementById("step3"), document.getElementById("cartTabContent")]
}

//initial visible page
tabsAndContent.Client[1].classList.add("showTabContent");

let userOptions = {
    vegetarian: false,
    glutenFree: false,
    organic: false,
    filter: 'All'
}
let userSelectedProducts = []

sortProductByPrice = (prod1, prod2) => {
    if (prod1[1] === prod2[1]){
        return 0;
    } else {
        return (prod1[1] < prod2[1] ? -1 : 1)
    }
}

addToCart = (productName, productPrice, productImageURL) => {
    let selectId = productName+"_select";
    let addToCartBtnId = productName+"_addToCartBtn";
    let selectedIconId = productName+"_selectedIcon";
    let select = document.getElementById(selectId);
    let addToCartButton = document.getElementById(addToCartBtnId);
    let selectedIcon = document.getElementById(selectedIconId);

    // means already existed before, being deleed now
    let addState = true;

    if (userSelectedProducts.some(prod => prod[0] === productName)) {
        addState = false;
    }

    if (addState) {
        select.disabled = true;
        addToCartButton.classList.remove("addToCartButton");
        addToCartButton.classList.add("removeFromCartButton");
        addToCartButton.textContent = "Remove"
        selectedIcon.classList.remove("hideIcon")
        let numItems = select.options[select.selectedIndex].value;
        userSelectedProducts.push([productName, productPrice, numItems, productImageURL]);

    } else {
        select.disabled = false;
        addToCartButton.classList.add("addToCartButton");
        addToCartButton.classList.remove("removeFromCartButton");
        addToCartButton.textContent = "Add"
        selectedIcon.classList.add("hideIcon")
        for (let i = userSelectedProducts.length-1; i>=0; i--) {
            if (userSelectedProducts[i][0] === productName) {
                userSelectedProducts.splice(i, 1);
                break;
            }
        }
    }

}

reselecingItemUponChangingFilter = (productName) =>{

    let selectId = productName+"_select";
    let addToCartBtnId = productName+"_addToCartBtn";
    let selectedIconId = productName+"_selectedIcon";
    let select = document.getElementById(selectId);
    let addToCartButton = document.getElementById(addToCartBtnId);
    let selectedIcon = document.getElementById(selectedIconId);

    let selItem = []

    for (let i = userSelectedProducts.length-1; i>=0; i--) {
        if (userSelectedProducts[i][0] === productName) {
            selItem = userSelectedProducts[i];
            break;
        }
    }

    select.value = selItem[2];
    select.disabled = true;
    addToCartButton.classList.remove("addToCartButton");
    addToCartButton.classList.add("removeFromCartButton");
    addToCartButton.textContent = "Remove"
    selectedIcon.classList.remove("hideIcon")
}

generateProductCards = () => {
    let products = grocerylist;

    let userPreferences = `You have selected your preferences to be ${userOptions.vegetarian ? ' |Vegetarian| ' : ''} ${userOptions.glutenFree ? ' |Gluten Free| ' : ''} ${userOptions.organic ? ' |Organic|' : ''}`
    if (!userOptions.vegetarian && !userOptions.glutenFree && !userOptions.organic) {
        userPreferences = 'You have not selected any preferences.'
    }
    document.getElementById('preferencesMessage').textContent=`The products shown below have been filtered based on your preferences.
    ${userPreferences}`

    //sorting by price
    let productNameAndPriceArray = []
    Object.keys(products).forEach(elem => {
        productNameAndPriceArray.push([elem, products[elem].Price]);
    })
    productNameAndPriceArray.sort(sortProductByPrice);

    //Resetting products before rendering
    document.querySelector("#productsTabContent").removeChild(document.querySelector(".productsContainer"));
    let productsContainer = document.createElement("div");
    productsContainer.classList.add("productsContainer")
    document.querySelector("#productsTabContent").appendChild(productsContainer);

    productNameAndPriceArray.forEach(productNameAndPrice => {
        
        let product = productNameAndPrice[0];
        let productContainer = document.createElement("div");
        let productInfo = products[product];

        let vegetarian = productInfo.Vegetarian ? "" : "hideIcon";
        let glutenFree = productInfo.GlutenFree ? "" : "hideIcon";
        let organic = productInfo.Organic ? "" : "hideIcon";
        let selected = "hideIcon";
        if (userSelectedProducts.some(prod => prod[0] === product)) {
            selected = ""
        }

        if (userOptions.vegetarian && !productInfo.Vegetarian ||
            userOptions.glutenFree && !productInfo.GlutenFree ||
            userOptions.organic && !productInfo.Organic ||
            (userOptions.filter !== 'All' && userOptions.filter !== productInfo.Category)) {
                return;
            }
        
        productContainer.innerHTML = `
        <div class="product" id=${product}>
            <div class="productInfoBar">
                <img title="Vegetarian" class="icon ${vegetarian}" src="./images/vegetarianIcon.png">
                <img title="Gluten Free"  class="icon ml-1 ${glutenFree}" src="./images/glutenFreeIcon.png">
                <img title="Organic"  class="icon ml-1 ${organic}" src="./images/organicIcon.png">
                <img title="Selected" id="${product}_selectedIcon"  class="icon ml-auto ${selected}" src="./images/selectedIcon.png">
            </div>
            <img class="productImage" src=${productInfo.URL}>
            <p class="font-5">${product}</p>
            <div class="priceRow">
                <p class="font-3 bold">$${productInfo.Price}</p>
                <p class="font-4" style="margin-left: 0.5rem">${productInfo.Condition}</p>
            </div>
            <div class="addToCartRow">
                <button onclick="addToCart('${product}', ${productInfo.Price}, '${productInfo.URL}')" id="${product}_addToCartBtn" class="addToCartButton">Add</button>
                <select id="${product}_select" name="numItems">
                    <option value="1">1</option>
                    <option value="2">2</option>   
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </select>
            </div>
        </div>
        `
        productsContainer.appendChild(productContainer);
        
        if (selected === "" ) {
            reselecingItemUponChangingFilter(product)
        }
    })
}

generateShoppingCart = () => {
    let oldShopCartContainer = document.getElementById("shoppingCartContainer");
    oldShopCartContainer.parentElement.removeChild(oldShopCartContainer);
    let newShoppingCartContainer = document.createElement("div");
    newShoppingCartContainer.id = "shoppingCartContainer"
    let cartSummary = document.querySelector(".cartSummary");
    let subtotal = 0
    userSelectedProducts.forEach(prod => {
        newShoppingCartContainer.innerHTML += `
            <div class="productSummary">
                <img class="productSummaryImage" src=${prod[3]}>
                <div class="productSummaryItem">
                    <p class="font-4">${prod[0]}</p>
                </div>
                <div class="productSummaryItem">
                    <p class="font-4">${prod[2]}</p>
                </div>
                <div class="productSummaryItem">
                    <p class="font-4 bold">X</p>
                </div>
                <div class="productSummaryItem">
                    <p class="font-4 bold">$${prod[1]}</p>
                </div>
            </div>
        `
        subtotal += prod[1]
    })   
    newShoppingCartContainer.innerHTML += `
        <div id="subtotalRow">
            <p class="font-4" style="grid-column: 4; grid-row: 1; text-align: end;">Subtotal</p>
            <p class="font-4 bold" style="grid-column: 5; grid-row: 1; text-align: end;">$${Math.round(subtotal*100)/100}</p>
        </div>
        <div id="totalRow">
            <p class="font-3" style="grid-column: 4; grid-row: 1; text-align: end;">Total</p>
            <p class="font-3 bold" style="grid-column: 5; grid-row: 1; text-align: end;">$${Math.round(subtotal*1.13 * 100) / 100}</p>
        </div>
    ` 
    cartSummary.appendChild(newShoppingCartContainer)

    //css hack to fix this whitespace bug 
    if (userSelectedProducts.length > 4) {
        let numExtensions = userSelectedProducts.length-5;
        document.body.style.height = window.innerHeight + numExtensions*81 + 160;
    } else if (userSelectedProducts.length === 4) {
        document.body.style.height = window.innerHeight + 100;
    } else {
        document.body.style.height = window.innerHeight;
    }
}

generateProductCards();


//hovering over standard shipping
document.getElementById("standardShippingOption").addEventListener("mouseenter", ()=>{
    document.getElementById("standardShippingIcon").src="./images/standardShippingWhite.png";
});
document.getElementById("standardShippingOption").addEventListener("mouseleave", ()=>{
    document.getElementById("standardShippingIcon").src="./images/standardShipping.png";
});

//hovering over premier shipping
document.getElementById("premierShippingOption").addEventListener("mouseenter", ()=>{
    document.getElementById("premierShippingIcon").src="./images/premierShippingWhite.png";
});
document.getElementById("premierShippingOption").addEventListener("mouseleave", ()=>{
    document.getElementById("premierShippingIcon").src="./images/premierShipping.png";
});

//adding active colr to product filter tab
productFilterActiveTabUpdate = (tabClicked) => {
    document.querySelectorAll(".productFilterTab").forEach(prodTab => {
        if (prodTab !== tabClicked) {
            if (prodTab.classList.contains('productFilterTabActive')) {
                prodTab.classList.remove('productFilterTabActive')
            }
        } else if (prodTab === tabClicked) {
            if (!tabClicked.classList.contains('productFilterTabActive')) {
                tabClicked.classList.add('productFilterTabActive');
            }
        }
    
    })
}

//Changing active tab and associated color
tabsClicked = (tabId, arrowId) => {

    let tab = document.getElementById(tabId);

    if (tab === tabsAndContent.Cart[0]) {
        generateShoppingCart();
    }
    if (tab === tabsAndContent.Product[0] || tab == tabsAndContent.Client[0]) {
        document.body.style.height = window.innerHeight;
    }

    document.getElementById("firstArrow").classList.remove('activeStepArrow');
    document.getElementById("secondArrow").classList.remove('activeStepArrow');
    document.getElementById("thirdArrow").classList.remove('activeStepArrow');

    Object.keys(tabsAndContent).forEach(elem => {
        if (tabsAndContent[elem][0] === tab) {
            tabsAndContent[elem][0].classList.add("activeStep");
            document.getElementById(arrowId).classList.add("activeStepArrow")
            tabsAndContent[elem][1].classList.add("showTabContent");
        }
        else { 
            tabsAndContent[elem][0].classList.remove("activeStep");
            tabsAndContent[elem][1].classList.remove("showTabContent");
        }
    })
}


// Changing Tabs
tabsAndContent.Cart[0].addEventListener("click", ()=> tabsClicked("step3", "thirdArrow"));
tabsAndContent. Product[0].addEventListener("click", ()=>tabsClicked("step2", "secondArrow"));
tabsAndContent.Client[0].addEventListener("click", ()=>tabsClicked("step1", "firstArrow"));

userCardOptionClicked = (item, optionClicked) => {

    switch(optionClicked){
        case "VEGETARIAN_YES":
            userOptions.vegetarian = true;
            item.classList.remove("userOptionNonActive");
            document.querySelector("#vegetarianOption .userCardOpionNo").classList.add("userOptionNonActive")
            break;
        case "VEGETARIAN_NO":
            userOptions.vegetarian = false;
            item.classList.remove("userOptionNonActive");
            document.querySelector("#vegetarianOption .userCardOpionYes").classList.add("userOptionNonActive")
            break;
        case "GLUTEN_FREE_YES":
            userOptions.glutenFree = true;
            item.classList.remove("userOptionNonActive");
            document.querySelector("#glutenFreeOption .userCardOpionNo").classList.add("userOptionNonActive")
            break;
        case "GLUTEN_FREE_NO":
            userOptions.glutenFree = false;
            item.classList.remove("userOptionNonActive");
            document.querySelector("#glutenFreeOption .userCardOpionYes").classList.add("userOptionNonActive")
            break;
        case "ORGANIC_YES":
            userOptions.organic = true;
            item.classList.remove("userOptionNonActive");
            document.querySelector("#organicOption .userCardOpionNo").classList.add("userOptionNonActive");
            break;
        case "ORGANIC_NO":
            userOptions.organic = false;
            item.classList.remove("userOptionNonActive");
            document.querySelector("#organicOption .userCardOpionYes").classList.add("userOptionNonActive")
            break; 
    }
    generateProductCards()  
}

productFilterClicked = (event, option) => {
    //to update the active tab
    productFilterActiveTabUpdate(event.target);
    userOptions.filter = option;
    generateProductCards()
}

wizardHeaderStepHoverOff = (arrowId) => {
    let arrow = document.getElementById(arrowId);
    arrow.classList.remove('arrowHover')
}
wizardHeaderStepHover = (arrowId) => {
    let arrow = document.getElementById(arrowId);
    arrow.classList.add('arrowHover')
}



