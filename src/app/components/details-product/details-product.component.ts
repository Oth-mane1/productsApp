import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
	selector: 'app-details-product',
	templateUrl: './details-product.component.html',
	styleUrls: ['./details-product.component.scss']
})
export class DetailsProductComponent {
	/* FormControl Validation */
	refCntrl = new FormControl('', [Validators.required]);
	nameCntrl = new FormControl('', [Validators.required]);
	descCntrl = new FormControl('', [Validators.required]);
	priceCntrl = new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]);

	getRefErrorMessage() { return this.refCntrl.hasError('required') ? 'You must enter a Reference for the product' : ''; }
	getNameErrorMessage() { return this.nameCntrl.hasError('required') ? 'You must enter a Name for the product' : ''; }
	getDescErrorMessage() { return this.descCntrl.hasError('required') ? 'You must enter a Description for the product' : ''; }
	getPriceErrorMessage() { return this.priceCntrl.invalid ? 'You must enter a valid Price for the product' : ''; }
	/********/

	message = '';
	@Input() viewMode = false;
	@Input() currentProduct: Product = {
		id: '',
		reference: '',
		name: '',
		description: '',
		image: '',
		price: 0
	};

	constructor(
		private productService: ProductService,
		private route: ActivatedRoute,
		private router: Router) { }

	ngOnInit(): void {
		if (!this.viewMode) {
			this.message = '';
			this.getProduct(this.route.snapshot.params["id"]);
		}
	}

	getProduct(id: string): void {
		this.productService.get(id)
			.subscribe({
				next: (data) => {
					this.currentProduct = data;
					console.log(data);
				},
				error: (e) => console.error(e)
			});
	}

	updateProduct(): void {
		this.message = '';

		this.productService.update(this.currentProduct.id, this.currentProduct)
			.subscribe({
				next: (res) => {
					console.log(res);
					this.message = res.success ? 'This product was updated successfully!': 'An error occured during the update! please try again!';
				},
				error: (e) => console.error(e)
			});
	}

	deleteProduct(): void {
		this.productService.delete(this.currentProduct.id)
			.subscribe({
				next: (res) => {
					console.log(res);
					this.router.navigate(['/products']);
				},
				error: (e) => console.error(e)
			});
	}
}
