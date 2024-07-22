const socket=io() 

//elements
const $messageForm=document.querySelector('#message-form')
const $messageFormInput=$messageForm.querySelector('input')
const $messageFormButton=$messageForm.querySelector('button')
const $sendLocationButton=document.querySelector('#send-location')
const $messages=document.querySelector('#messages')

//templates
const messageTemplate=document.querySelector('#message-template').innerHTML
const locationMessageTemplate=document.querySelector('#location-message-template').innerHTML
const sidebarTemplate=document.querySelector('#sidebar-template').innerHTML

//option
const {username,room}=Qs.parse(location.search,{ignoreQueryPrefix:true})

// direct code is taken from internet
const autoscroll=()=>{
    // new message element
    const $newMessage=$messages.lastElementChild

    //getting height of new message
    const newMessageStyle=getComputedStyle($newMessage)
    const newMessageMargin=parseInt(newMessageStyle.marginBottom)
    const newMessageHeight=$newMessage.offsetHeight+newMessageMargin

    // visible height
    const visibleHeight=$messages.offsetHeight

    // height of messages container
    const containerHeight=$messages.scrollHeight

    // how far i have scrolled
    const scrollOffSet=$messages.scrollTop+visibleHeight

    if(containerHeight-newMessageHeight<= scrollOffSet){
        //autoscroll
        // if i want to scroll always then only this line is needed
        $messages.scrollTop=$messages.scrollHeight
    }
}

socket.on('message',(message)=>{
    console.log(message);
    const html=Mustache.render(messageTemplate,{
        username:message.username,
        message:message.text,
        // createdAt:message.createdAt
        createdAt:moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend',html)
    autoscroll()
}) 

socket.on('locationMessage',(message)=>{
    console.log(message);
    const html=Mustache.render(locationMessageTemplate,{
        username:message.username,
        url:message.url,
        createdAt:moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend',html)
    autoscroll()
})

socket.on('roomData',({room,users})=>{
    console.log('hii');
    console.log(room);
    console.log(users);
    const html=Mustache.render(sidebarTemplate,{
        room,
        users
    })
    document.querySelector('#sidebar').innerHTML=html
    
}) 

$messageForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    // disabling the submit buttom
    $messageFormButton.setAttribute('disabled','disabled')
 
    const message=e.target.elements.message.value

    socket.emit('sendMessage',message,(error)=>{
        // enabling the submit button
        $messageFormButton.removeAttribute('disabled')
        // clearing the input
        $messageFormInput.value=''
        // cursor will be inside input box only
        $messageFormInput.focus()

        if(error){
            return console.log(error);
        }
        console.log('Message Delivered');
    })
})

$sendLocationButton.addEventListener('click',()=>{
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser')
    }
    // disable location button
    $sendLocationButton.setAttribute('disabled','disabled')

    navigator.geolocation.getCurrentPosition((position)=>{
        //console.log(position);
        socket.emit('sendLocation',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        },()=>{
            // enabling button
            $sendLocationButton.removeAttribute('disabled')
            console.log('Location Shared');
        })
    })
    
})

socket.emit('join',{username,room},(error)=>{
    if(error){
        alert(error)
        location.href='/'
    }
})

// socket.on('countUpdated',(count)=>{
//     console.log('the count has been updated', count);

// })

// document.querySelector('#increment').addEventListener('click',()=>{
//     console.log('print click');
//     socket.emit('increment')
// })

