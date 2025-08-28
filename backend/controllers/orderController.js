import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import razopay from 'razorpay'
import nodemailer from 'nodemailer'
import productModel from "../models/productModel.js";



// global varibles
const currency = 'inr'
const delivery_fee = 69


//gateway initialize

const razorpayInstance = new razopay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET,
})


// Placing Order using COD

const placeOrder = async (req, res) => {

    // try {
    //     const { userId, items, amount, address } = req.body;

    //     const orderData = {
    //         userId,
    //         items,
    //         address,
    //         amount,
    //         paymentMethod :"COD",
    //         payment:false,
    //         date: Date.now()

    //     }

    //     const newOrder = new orderModel(orderData)
    //     await newOrder.save()

    //     await userModel.findByIdAndUpdate(userId,{cartData:{}})

    //     res.json({success:true,message:'Order Placed'})


    // } catch (error) {
    //     console.log(error);
    //     res.json({success:false,message:error.message})
        

    // }

}



// placing order using stripe
const placeOrderStripe = async (req, res) => {

}

// plcing order using razorpay
const placeOrderRazorpay = async (req, res) => {

    try {
        const {userId, items, amount, address} = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"Razorpay",
            payment:false,
            date:Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()


        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt : newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options,(error,order)=>{

            if(error){
                console.log(error)
                return res.json({success:false,message:error})
            }
            res.json({success:true,order})

        })




    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

    


}
const verifyRazorpay = async (req,res)=>{
    try {
        const {userId,razorpay_order_id} = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status==='paid'){
            await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success:true,message:"Payment Successful"})

        } else {
            res.json({success:false,message:"Payment Failed"})
        }


        
    } catch (error) {
         console.log(error)
        res.json({success:false,message:error.message})
    }
}

// ALL ORDERS DATA FOR ADMIN PANEL
const AllOrders = async (req, res) => {

            try {
                const orders = await orderModel.find({})
                res.json({success:true,orders})
            } catch (error) {

                console.log(error);
                res.json({success:false,message:error.message})
                
            }



}
// USER ORDER DATA FOR FRONTEND
// const userOrder = async (req, res) => {
//     try {
//         const { userId } = req.body
//         const orders = await orderModel.find({userId}) 
//         res.json({success:true,orders})
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:error.message})
//     }

// }

const userOrder = async (req, res) => {
  try {
    const {userId} = req.body; // Adjust as per your auth logic
    const orders = await orderModel.find({ userId });

    const productMap = {};
    const products = await productModel.find();
    products.forEach(p => {
      productMap[p._id] = p;
    });

    const enrichedOrders = orders.map(order => {
      const enrichedItems = order.items.map(item => {
        const product = productMap[item._id] || {};
        return {
          ...item,
          image: product.image,
          name: product.name,
          price: product.price,
          isPreOrder: product.isPreOrder || false,
          preOrderAvailableDate: product.preOrderAvailableDate || null,
        };
      });
      return {
        ...order.toObject(),
        items: enrichedItems,
      };
    });

    res.json({ success: true, orders: enrichedOrders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching user orders" });
  }
};
// Update Order Status from Admin panel
// const updateStatus = async (req, res) => {

//     try {
//         const {orderId, status} = req.body
//         await orderModel.findByIdAndUpdate(orderId,{status})
//         res.json({success:true,message:'Starus Updated'})
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:error.message})
        
//     }

// }

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body

    const order = await orderModel.findByIdAndUpdate(orderId , {status})
    if (!order) return res.status(404).json({ success: false, message: "Order not found" })

    order.status = status
    await order.save()

    // Prepare mail transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    const mailOptions = {
      from: process.env.EMAIL_ID,
      to: order.address.email, // Make sure email exists in order
      subject: `Order Status Updated - Order ID: ${order._id}`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Hello ${order.address.firstName},</h2>
          <p>Your order <strong>${order._id}</strong> status has been updated to:</p>
          <h3 style="color: green;">${status}</h3>
          <p>Thank you for shopping with <strong>Heven</strong>.</p>
        </div>
      `,
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        toast.error("Failed")
        console.error("Failed to send email:", error)
      } else {
                toast.error("Success")

        console.log("Email sent: " + info.response)
      }
    })

    res.status(200).json({ success: true, message: "Order status updated and email sent" })

  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
}

export {verifyRazorpay, placeOrder, placeOrderStripe, placeOrderRazorpay, AllOrders, userOrder, updateStatus }

