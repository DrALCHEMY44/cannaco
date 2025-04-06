import { BasketIcon } from "@sanity/icons";
import { defineArrayMember, defineField} from "sanity";
import { defineType } from "sanity";

export const orderType = defineType(
    {
        name:'order',
        title:'orders',
        type:'document',
        icon: BasketIcon,
        fields:[
            defineField({
                name:'orderNumber',
                title:'order Number',
                type:'string',
                validation: (Rule) => Rule.required(),
            }),
            defineField({
                name:'stripeCheckoutSessionId',
                title:'stripe Checkout Session ID',
                type:'string',
            }),
            defineField({
                name:'stripeCustomerId',
                title:'stripe Customer ID',
                type:'string',
                validation: (Rule) => Rule.required(),
            }),
            defineField({
                name:'clerkUserId',
                title:'store user ID',
                type:'string',
                validation: (Rule) => Rule.required(),
            }),
            defineField({
                name:'customerName',
                title:'Customer Name',
                type:'string',
                validation: (Rule) => Rule.required(),
            }),
            defineField({
                name:'email',
                title:'Email',
                type:'string',
                validation: (Rule) => Rule.required().email(),
            }),
            defineField({
                name:'stripePaymentIntentId',
                title:'stripe Payment Intent ID',
                type:'string',
                validation: (Rule) => Rule.required(),
            }),
            defineField({
                name:'products',
                title:'Products',
                type:'array',
                of: [
                   defineArrayMember({
                        type:'object',
                        fields:[
                            defineField({
                                name: 'product',
                                title: 'Product bought',
                                type: 'reference',
                                to: {type: 'reference',to:[{type: 'product'}]},
                            }),
                            defineField({
                                name:'quantity',
                                title:'Quantit purchased',
                                type:'number',
                            }),
                        ],
                        preview: {
                            select:{
                                product:'product.name',
                                quantity:'quantity',
                                image:'product.image',
                                price:'product.price',
                                currency:'product.currency',
                            },
                            prepare(select){
                                return{
                                    title:`${select.product} x ${select.quantity}`,
                                    media:select.image,
                                    subtitle:`$${select.price.toFixed(2)}`,
                                    currency:select.currency,
                                    quantity:select.quantity,
                                    price:select.price,
                                    totalPrice:select.quantity * select.price,
                                    totalCurrency:select.currency,
                                    
                                    // add more details if needed for preview table
                                    
                                    // example:
                                    // product: select.product.title,
                                    // quantity: select.quantity,
                                    // price: select.price,
                                    // totalPrice: select.price * select.quantity,
                                    // currency: select.currency,
                                    
                                    
                                    // return {title, media, subtitle} for a simple preview
                                    // return {title, media, subtitle, currency, quantity, price, totalPrice, totalCurrency} for a more detailed preview
                                }
                            }
                        },
                    }),
                ],
            }),
            defineField({
                name:'totalPrice',
                title:'Total Price',
                type:'number',
                validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
                name:'totalCurrency',
                title:'Total Currency',
                type:'string',
                validation: (Rule) => Rule.required(),
            }),
            defineField({
                name:'amountDiscount',
                title:'Amount Discount',
                type:'number',
                validation: (Rule) => Rule.min(0),
            }),
            defineField({
                name:'status',
                title:'order status',
                type:'string',
                options:{
                    list:[
                        { title:'Pending', value:'pending' },
                        {title:'paid',value:'paid'},
                        {title:'cancelled', value:'cancelled'},
                        {title:'refunded', value:'refunded'},
                        {title:'shipped', value:'shipped'},
                        {title:'delivered', value:'delivered'},
                        {title:'returned', value:'returned'},
                    ],
                },
            }),
            defineField({
                name:'orderDate',
                title:'order Date',
                type:'datetime',
                validation:(Rule) => Rule.required()
             }),
        ],
        preview:{
            select:{
                name:'customerName',amount:'totalPrice',currency:'currency',orderID:'orderNumber',
                email:'email',
            },
            prepare(select){
                const orderIDSnippet = '${select.orderID.slice(0, 5)}..${select.orderID.slice(-5)}';
                return{
                    title:'${select.name},${orderIDSnippet}',
                    subtitle:'${select.amount},${select.currency},${select.email}',
                    media:BasketIcon,
                };
            },
        },
    });