// get elements
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let count = document.getElementById('count');
let category = document.getElementById('category');
let search = document.getElementById('search');
let create = document.getElementById('create');
let tbody = document.getElementById('tbody');
let updateBtn = document.getElementById('update-putton');
let deleteBtn = document.getElementById('delete-putton');
let clear = document.getElementById('clear');
let clearsData = document.getElementById('clearsData');
let titleBtn = document.getElementById('title-search');
let categoryBtn = document.getElementById('category-search');
let total = document.getElementsByClassName('total')[0];

let mood = 'create';
let tmp;

// total function
function getTotal() {
	if (price.value != '') {
		let result = +price.value + +taxes.value + +ads.value - +discount.value;
		total.innerHTML = result;
		total.style.backgroundColor = '#040';
	}
	else {
		total.style.backgroundColor = 'rgb(199, 11, 12)';
		total.innerHTML = '';
	}
}

// create product
let proData;
if (localStorage.product != undefined) {
	proData = JSON.parse(localStorage.product);
}
else {
	proData = [];
}

function products() {
	let product = {
		title: title.value,
		price: price.value,
		taxes: taxes.value,
		ads: ads.value,
		discount: discount.value,
		total: total.innerHTML,
		category: category.value,
	};

	if(title.value != '' && price.value != '' && category.value != '' && count.value <= 100) {
		if (mood == 'create') {
			if (count.value > 1) {
				for (let i = 0; i < count.value; i++) {
					proData.push(product);
				}
			} else {
				proData.push(product);
			}
		} else if (mood == 'update') {
			proData[tmp] = product;
			mood = 'create';
			create.innerText = 'create';
			count.style.display = 'block';
		}
		clearInputs();
	}

	localStorage.setItem('product', JSON.stringify(proData));
}

create.onclick = function () {
	products();
	showProducts();
}

// show products
function showProducts() {
	let row = '';
	for (let i = 0; i < proData.length; i++) {
		row += `
		<tr>
		<td>${i + 1}</td>
		<td>${proData[i].title}</td>
		<td>${proData[i].price}</td>
		<td>${proData[i].taxes}</td>
		<td>${proData[i].ads}</td>
		<td>${proData[i].discount}</td>
		<td>${proData[i].total}</td>
		<td>${proData[i].category}</td>
		<td id='update-putton'><button onclick='updateInputs(${i})'>update</button></td>
		<td id='delete-putton'><button onclick='deleteInputs(${i})'>delete</button></td>
		</tr>
		`
	}
	tbody.innerHTML = row;
	if (proData.length > 0) {
		clearsData.style.display = 'block';
		clearsData.innerHTML = `delete all (${proData.length})`;
	} else {
		clearsData.style.display = 'none';
	}
}
showProducts();

// clear inputs
function clearInputs() {
	title.value = '';
	price.value = '';
	taxes.value = '';
	ads.value = '';
	discount.value = '';
	total.innerHTML = '';
	count.value = '';
	category.value = '';
	getTotal();
}

// product buttons
function deleteInputs(i) {
	proData.splice(i, 1);
	localStorage.product = JSON.stringify(proData);
	showProducts();
}

function updateInputs(i) {
	title.value = proData[i].title;
	price.value = proData[i].price;
	taxes.value = proData[i].taxes;
	ads.value = proData[i].ads;
	discount.value = proData[i].discount;
	category.value = proData[i].category;
	count.style.display = 'none';
	create.innerText = 'update';
	getTotal();
	mood = 'update';
	tmp = i;
	window.scroll({
		top: 0,
		behavior: "smooth",
	});
}

// clear all data function

function clearData() {
	proData.splice(0);
	localStorage.clear();
	showProducts();
}

// search buttons
let searchMood = 'title';
function changeMood(id) {
	if (id == 'title-search') {
		searchMood = 'title';
	}
	else if (id == 'category-search') {
		searchMood = 'category';
	}
	search.placeholder = `search by ${searchMood}`
	search.focus();
	search.value = '';
	showProducts();
}

function lettersSearch(value) {
	let num = 0;
	let row = '';
	if (searchMood == 'title') {
		for (let i = 0; i < proData.length; i++) {
			if (proData[i].title.includes(value)) {
				num++;
				row += `
				<tr>
				<td>${num}</td>
				<td>${proData[i].title}</td>
				<td>${proData[i].price}</td>
				<td>${proData[i].taxes}</td>
				<td>${proData[i].ads}</td>
				<td>${proData[i].discount}</td>
				<td>${proData[i].total}</td>
				<td>${proData[i].category}</td>
				<td id='update-putton'><button onclick='updateInputs(${i})'>update</button></td>
				<td id='delete-putton'><button onclick='deleteInputs(${i})'>delete</button></td>
				</tr>
				`
				clearsData.innerHTML = `delete all (${num})`;
			}
		}
	}
	else if (searchMood == 'category') {
		for (let i = 0; i < proData.length; i++) {
			if (proData[i].category.includes(value)) {
				row += `
				<tr>
				<td>${i + 1}</td>
				<td>${proData[i].title}</td>
				<td>${proData[i].price}</td>
				<td>${proData[i].taxes}</td>
				<td>${proData[i].ads}</td>
				<td>${proData[i].discount}</td>
				<td>${proData[i].total}</td>
				<td>${proData[i].category}</td>
				<td id='update-putton'><button onclick='updateInputs(${i})'>update</button></td>
				<td id='delete-putton'><button onclick='deleteInputs(${i})'>delete</button></td>
				</tr>
				`
			}
		}
	}
	tbody.innerHTML = row;
}
