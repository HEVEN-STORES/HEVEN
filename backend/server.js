// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config' ;
// import connnectDb from './config/mogodb.js'
// import connectClouinary from './config/cloudinary.js'
// import userRouter from './routes/userRoute.js'
// import productRouter from './routes/productRoute.js';
// import cartRouter from './routes/cartRoute.js';
// import orderRouter from './routes/orderRoute.js';

// // APP CONFIG

// const app = express()
// const port = process.env.PORT || 4000
// connnectDb()
// connectClouinary()

// // MiddleWares

// app.use(express.json())
// app.use(cors())

// // API endPoints

// app.use('/api/user',userRouter)
// app.use('/api/product',productRouter)
// app.use('/api/cart',cartRouter)
// app.use('/api/order',orderRouter)



// app.get('/',(req,res)=>{
//         res.send("API WORKING")
// })

// app.listen(port,()=>console.log('server sarted on PORT :'+port))




import express from 'express'
import cors from 'cors'
import 'dotenv/config' ;
import connnectDb from './config/mogodb.js'
import connectClouinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import couponRoutes from './routes/coupon.js';


// APP CONFIG

const app = express()
const port = process.env.PORT || 4000
connnectDb()
connectClouinary()



// MiddleWares
app.use('/api/coupon', couponRoutes);

app.use(express.json())
app.use(cors())
// app.use('/api/coupon', couponRoutes);

// API endPoints

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)






app.get('/',(req,res)=>{
        res.send("API WORKING")
})

app.listen(port,()=>console.log('server sarted on PORT :'+port))
