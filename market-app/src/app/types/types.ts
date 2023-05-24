export interface User {
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    password: string;
    token?: string;
    id?: Number;
}

export interface Product {
    id: number;
    ownerID: number;
    title: string;
    description: string;
    price: number;
    currency: string;
    photos: string[];
    discussionID: string;
    category: string;
    brand: string;
    condition: string;
  }

export type CartItem = Product & { quantity: number };

export class EMPTY_TYPE {
    public static EMPTY_USER: User = {
        firstName: "",
        lastName: "",
        email: "",
        telephone: "",
        password: "",
        token: "",
        id: 0
    }

    public static EMPTY_PRODUCT: Product = {
        title: "",
        description: "",
        price: 0,
        currency: "",
        photos: [],
        discussionID: "",
        category: "",
        brand: "",
        condition: "",
        id: 0,
        ownerID: 0
    };
}
