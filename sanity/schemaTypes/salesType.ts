import { TagIcon } from "@sanity/icons";
import { defineField } from "sanity";
import { defineType } from "sanity";

export const salesType = defineType({
    name: "sales",
    title: "Sales",
    type: "document",
    icon: TagIcon,
    fields: [
        defineField({
            name: "title",
            type: "string",
            title:"sale title",
        }),
        defineField({
            name:"description",
            type: "text",
            title:"sale description",
        }),
        defineField({
            name:"discountAmount",
            type: "number",
            title:"discount amount",
            description:"amount off in in percentage or fixe value",
        }),
        defineField({
            name:"couponCode",
            type: "string",
            title:"coupon code",
        }),
        defineField({
            name:"validForm",
            type: "string",
            title:"valid form",
        }),
        defineField({
            name:"validUntil",
            type: "datetime",
            title:"valid until",
        }),
        defineField({
            name:"isActive",
            type: "boolean",
            title:"is active",
            description:"Toggle to activate/deactivate sales",
            initialValue: true,
        }),
    ],
    preview:{
        select:{
            title:'title',
            discountAmount:'discountAmount',
            couponCode:'couponCode',
            isActive:'isActive',
        },
        prepare(selection){
           const { title, discountAmount, couponCode, isActive } = selection;
           const status = isActive ? "Active" : "Inactive";
           return{
                title:title,
                subtitle:`Discount: ${discountAmount}% | Coupon: ${couponCode} | Status: ${status}`,
            }
        },
    },
});