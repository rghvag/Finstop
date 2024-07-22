const mongoose =require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')

const jwt=require('jsonwebtoken')

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,

    },
    phone_no:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        validate(value){
            
            if(value.length!=10){
                throw new Error("Phone no shuld be of length 10");
            }
        }

    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
       
        validate(value)
        {
            if(!validator.isEmail(value))
            {
                throw new Error ('Email is not valid')
            } 
        }
    },
    password:{
        type:String,
        required:true, 
        trim:true,
        minlength:7,
        validate(value){
            
            if(value.toLowerCase()=="password"){
                throw new Error('password cant be password');
            }
        }
    },
    score: {
        type: Number,
        default: 0
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
},{
    timestamps:true
})


userSchema.methods.generateAuthToken=async function(){
    const user=this;
    const token=jwt.sign({_id:user.id.toString()},"thisisasecretformyapp")
    user.tokens=user.tokens.concat({token:token})

    await user.save()
    return token
}

userSchema.pre('save',async function(next){
    const user=this

    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }
    next()
})

userSchema.methods.toJSON=function(){
    const user=this;
    const userObject=user.toObject();
    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.statics.findByCredentials=async (email,password)=>{
   
    const user =await User.findOne({email:email})
   
    if(!user){
        throw new Error('Unable to login in')
    }

    const isMatched =await bcrypt.compare(password,user.password)
    if(!isMatched)
    {
        throw new Error('unable to login')
    }
    return user
}

const User = mongoose.model('User',userSchema)
module.exports=User