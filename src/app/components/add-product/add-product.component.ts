import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-add-product',
	templateUrl: './add-product.component.html',
	styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {

	submitted = false;
	product: Product = {
		reference: '',
		name: '',
		description: '',
		image: '',
		price: 0
	};

	constructor(private productService: ProductService, private _snackBar: MatSnackBar) { }

	/* FormControl Validation */
	refCntrl = new FormControl('', [Validators.required]);
	nameCntrl = new FormControl('', [Validators.required]);
	descCntrl = new FormControl('', [Validators.required]);
	priceCntrl = new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]);
	// imageCntrl = new FormControl('', [Validators.required]);

	getRefErrorMessage() { return this.refCntrl.hasError('required') ? 'You must enter a Reference for the product' : ''; }
	getNameErrorMessage() { return this.nameCntrl.hasError('required') ? 'You must enter a Name for the product' : ''; }
	getDescErrorMessage() { return this.descCntrl.hasError('required') ? 'You must enter a Description for the product' : ''; }
	getPriceErrorMessage() { return this.priceCntrl.invalid ? 'You must enter a valid Price for the product' : ''; }
	// getImageErrorMessage() { return this.imageCntrl.hasError('required') ? 'You must enter a valid Image for the product' : ''; }
	/********/

	saveProduct(): void {
		if (this.refCntrl.invalid || this.nameCntrl.invalid || this.descCntrl.invalid || this.priceCntrl.invalid) {
			return this.openSnackBar('Please check the fields before submitting.')
		}

		const data = {
			reference: this.product.reference,
			name: this.product.name,
			description: this.product.description,
			image: this.product.image,
			price: this.product.price,
		};
		// const data = {
		// 	reference: this.refCntrl.value,
		// 	name: this.nameCntrl.value,
		// 	description: this.descCntrl.value,
		// 	image: this.imageCntrl.value,
		// 	price: this.priceCntrl.value,
		// };

		this.productService.create(data)
			.subscribe({
				next: (res) => {
					console.log(res);
					this.submitted = true;
				},
				error: (e) => console.error(e)
			});
	}

	newProduct(): void {
		this.submitted = false;
		this.refCntrl.markAsUntouched()
		this.nameCntrl.markAsUntouched()
		this.descCntrl.markAsUntouched()
		this.priceCntrl.markAsUntouched()
		// this.imageCntrl.markAsUntouched()
		this.product = {
			reference: '',
			name: '',
			description: '',
			image: '',
			price: 0
		};
	}

	openSnackBar(message: string, action: string = "Dismiss") {
		this._snackBar.open(message, action);
	}
}
