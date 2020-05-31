	
// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products		 

var products = [
	{
		name: "brocoli",
		vegetarian: true,
		glutenFree: true,
		organic: true,
		price: 1.99
	},
	{
		name: "bread",
		vegetarian: true,
		glutenFree: false,
		organic: false,
		price: 2.35
	},
	{
		name: "salmon",
		vegetarian: false,
		glutenFree: true,
		organic: true,
		price: 10.00
	},
	{
		name: "pasta",
		vegetarian: true,
		glutenFree: false,
		organic: false,
		price: 10.99
	},
	{
		name: "rice",
		vegetarian: true,
		glutenFree: true,
		organic: true,
		price: 5.99
	},
	{
		name: "pringles",
		vegetarian: true,
		glutenFree: false,
		organic: false,
		price: 1.00
	},
	{
		name: "milk",
		vegetarian: true,
		glutenFree: true,
		organic: false,
		price: 2.99
	},
	{
		name: "eggs",
		vegetarian: true,
		glutenFree: true,
		organic: false,
		price: 3.99
	},
	{
		name: "sweetened yogurt",
		vegetarian: true,
		glutenFree: false,
		organic: true,
		price: 4.99
	},
	{
		name: "white meat",
		vegetarian: false,
		glutenFree: true,
		organic: true,
		price: 12.99
	}
];
	
sortProductByPrice = (prod1, prod2) => {
    if (prod1.price === prod2.price){
        return 0;
    } else {
        return (prod1.price < prod2.price ? -1 : 1)
    }
}


// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function restrictListProducts(prods, restriction) {

	prods = prods.sort(sortProductByPrice);
	let product_names_and_price = [];

	prods.forEach(prod => {
		if (restriction.Vegetarian && !prod.vegetarian ||
			restriction.GlutenFree && !prod.glutenFree ||
			restriction.Organic && !prod.organic) {
				return; // skip this iteration since the prod doesnt match the restriction
			}
			product_names_and_price.push([prod.name, prod.price]);
	});
	return product_names_and_price;
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
	totalPrice = 0;
	for (let i=0; i<products.length; i+=1) {
		if (chosenProducts.indexOf(products[i].name) > -1){
			totalPrice += products[i].price;
		}
	}
	return totalPrice;
}
