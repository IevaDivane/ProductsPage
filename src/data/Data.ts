export type ProductData = {
    success:number;
    product: Product;
}

export type Product = {
    name:string;
    tags:string[],
    options:ProductOptions,
    discount:ProductDiscount;
    gallery:ProductGallery[];
    shipping:ProductShipping;
    // eslint-disable-next-line camelcase
    lead_time: {
        'value': string,
        'info': string
    },
    props:ProductProps;
    reviews:ProductReviews;
}

export type ProductOptions = {
    '1080p': ProductOption,
    '4K': ProductOption,
    // eslint-disable-next-line camelcase
    battery_accessories: ProductOption,
}

export type ProductOption = {
    label:string;
    price:OptionPrice;
    // eslint-disable-next-line camelcase
    old_price:OptionOldPrice;
}

type OptionPrice = {
    value:string;
    currency: {
        'code': string,
        'symbol': string,
        'format': string,
    }
}

type OptionOldPrice = {
    value:string;
    currency: {
        'code': string,
        'symbol': string,
        'format': string,
    }
}

type ProductDiscount ={
    amount:string;
    // eslint-disable-next-line camelcase
    end_date:string;
}

type ProductGallery = {
    main:string;
}

type ProductShipping = {
    method:ShippingMethod;
}

type ShippingMethod ={
    country:string;
    title:string;
    // eslint-disable-next-line camelcase
    shipping_time:MethodShippingTime;
    cost:MethodCost;
}

export type MethodShippingTime= {
    value:string;
    info:string;
}

type MethodCost = {
    value:string
    currency: {
        'code': string,
        'symbol': string,
        'format': string,
    }
}

type ProductLeadTime = {
    value:string;
    info: string
}

export type ProductProps = {
    // eslint-disable-next-line camelcase
    ready_to_ship:boolean;
    // eslint-disable-next-line camelcase
    in_stock:boolean;
    // eslint-disable-next-line camelcase
    fast_dispatch:boolean;
}

type ProductReviews ={
    rating:string;
    count:number;
    // eslint-disable-next-line camelcase
    total_buyers: number;
}
