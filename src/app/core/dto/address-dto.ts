export class AddressDto {
    addressId!: number;
    address1!: string;
    address2!: string;
    city!: string;
    state!: string;
    zipCode!: string;
    country!: string;
    addressType!: string;

    public add(addressDto: AddressDto) : AddressDto {
        this.addressId = addressDto?.addressId;
        this.address1 = addressDto?.address1;
        this.address2 = addressDto?.address2;
        this.city = addressDto?.city;
        this.state = addressDto?.state;
        this.zipCode = addressDto?.zipCode;
        this.country = addressDto?.country;
        this.addressType = addressDto?.addressType;

        return this;

    }
}
