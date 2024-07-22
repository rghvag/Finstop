const path=require('path')
const http=require('http')
const express=require('express')
const socketio=require('socket.io')
const Filter=require('bad-words')
const {generateMessage,generateLocationMessage} =require('./utils/messages')
const {addUser,removeUser,getUser,getUsersInRoom}=require('./utils/users')

const app=express()
const server=http.createServer(app)
const io=socketio(server)

const port=process.env.PORT || 5000
const publicDirectortPath=path.join(__dirname,'../public')

app.use(express.static(publicDirectortPath))

// code run when client connected
io.on('connection',(socket)=>{
    console.log('New Websocket connection');

    //socket.emit('message',generateMessage('welcome'))
    // send the message to all except itself  
    //socket.broadcast.emit('message',generateMessage('A new user has joined'))

    socket.on('join',({username,room},callback)=>{
        const {user,error}=addUser({id:socket.id,username,room})
        if(error){
            return callback(error)
        }
        socket.join(user.room)
        socket.emit('message',generateMessage('Admin','welcome'))
        socket.broadcast.to(user.room).emit('message',generateMessage('Admin',`${user.username} has joined`))
        // to display list of all member in that room
        // we will do this when someone enter the room or someone leaves the room
        io.to(user.room).emit('roomData',{
            room:user.room,
            users:getUsersInRoom(user.room)
        })
        callback()
    })

    // so for other user also we have to send message in particular room only 
    // so i have to maintain room corresponding to each username

    socket.on('sendMessage',(message,callback)=>{
        const user=getUser(socket.id)
        const filter= new Filter() 
        if(filter.isProfane(message))
        {
            return callback('Profanity is not allowed')
        }

        io.to(user.room).emit('message',generateMessage(user.username,message))
        callback()
    })

    socket.on('sendLocation',(coords,callback)=>{
        const user=getUser(socket.id)
        io.to(user.room).emit('locationMessage',generateLocationMessage(user.username,`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })

    // this will run when client disconnected (close the window)
    socket.on('disconnect',()=>{
        const user=removeUser(socket.id)
        if(user){
            io.to(user.room).emit('message',generateMessage('Admin',`${user.username} has left`))
            io.to(user.room).emit('roomData',{
                room:user.room,
                users:getUsersInRoom(user.room)
            })
        }
        // io.emit('message',generateMessage('A user has left!'))
    })
    
}) 



server.listen(port,()=>{
    console.log('server is up on port ' +  port);
})


// let count=0
// io.on('connection',(socket)=>{
//     console.log('New Websocket connection');
//     socket.emit('countUpdated',count)
//     socket.on('increment',()=>{
//         count++
//         //socket.emit('countUpdated',count)
//         // here we emitting to single connection who updated
//         // but we want that every client get message 
//         io.emit('countUpdated',count)
//     })
// })
