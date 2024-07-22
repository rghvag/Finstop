const users=[]

const addUser=({id,username,room})=>{

    //clean the data =>lowercase,trim extraspace
    username=username.trim().toLowerCase()
    room=room.trim().toLowerCase()

    // validation data
    if(!username || !room)
    {
        return {
            error:'Username and room are required!'
        }
    }

    // check for existing user in that room
    const existingUser=users.find((user)=>{
        return user.room===room && user.username===username
    })

    //validate username
    if(existingUser)
    {
        return{
            error:'Username is in use'
        }
    }

    // storing user
    const user={id,username,room}
    users.push(user)
    console.log(users);
    return {user}
}

const removeUser=(id)=>{
    const index=users.findIndex((user)=>{
        return user.id===id
    })

    if(index!=-1)
    {
        // will give array of all the items that are removed here it is only 1
        return users.splice(index,1)[0]
    }
}

const getUser=(id)=>{
    console.log(id);
    return users.find((user)=>user.id===id)
}

const getUsersInRoom=(room)=>{
    room=room.trim().toLowerCase()
    return users.filter((user)=>user.room===room)
}

module.exports={
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}
