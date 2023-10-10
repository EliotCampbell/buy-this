import {ShippingCost} from "@/models/models";
import {NextResponse} from "next/server";

export const GET = async () => {
    try {
        const shippingCosts = await ShippingCost.findAll({
            order: [['country', 'ASC']],
        })
        if (shippingCosts.length)
            return NextResponse.json({
                ok: true,
                message: 'Shipping costs found successfully',
                dataObject: { shippingCosts }
            })
        else
            return NextResponse.json({
                ok: false,
                message: 'Shipping costs not found',
                dataObject: {}
            })
    } catch (e) {
        return NextResponse.json({
            ok: false,
            message: 'Error',
            dataObject: { error: e.message }
        })
    }
}