import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
	selector: 'app-list-products',
	templateUrl: './list-products.component.html',
	styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent {

	products?: Product[];
	currentProduct: Product = {};
	currentIndex = -1;
	name = '';

	constructor(private productService: ProductService) { }

	ngOnInit(): void {
		this.retrieveProducts();
	}

	retrieveProducts(): void {
		this.productService.getAll()
			.subscribe({
				next: (data) => {
					this.products = data
					console.log(data);
				},
				error: (e) => console.error(e)
			});
	}

	refreshList(): void {
		this.retrieveProducts();
		this.currentProduct = {};
		this.currentIndex = -1;
	}

	setActiveProduct(product: Product, index: number): void {
		this.currentProduct = product;
		this.currentIndex = index;
	}

	removeAllProducts(): void {
		this.productService.deleteAll()
			.subscribe({
				next: (res) => {
					console.log(res);
					this.refreshList();
				},
				error: (e) => console.error(e)
			});
	}

	searchTitle(): void {
		this.currentProduct = {};
		this.currentIndex = -1;

		this.productService.findByName(this.name)
			.subscribe({
				next: (data) => {
					this.products = data;
					console.log(data);
				},
				error: (e) => console.error(e)
			});
	}
}
