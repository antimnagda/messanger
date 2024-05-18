const io = require('socket.io')(8000, {
    cors: {
        origin: 'http://127.0.0.1:5500', // Allow requests from this origin
        methods: ['GET', 'POST'] // Allow only specific HTTP methods
    }
});

const users = {};

io.on('connection', socket =>{
    // If any new user joins, let other users connected to the server know!
    socket.on('new-user-joined', name =>{ 
        users[socket.id] = name;
        console.log(name);
        socket.broadcast.emit('user-joined', name);
    });

    // If someone sends a message, broadcast it to other people
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    socket.on('disconnect', name=>{
        socket.broadcast.emit('left',  users[socket.id]);
        delete users[socket.id];
    })
});

// const io= require('socket.io')(8000)
// const user= {};



//     io.on('connection', Socket=>{
//         Socket.on('new user', name=>{
//             user[Socket.id]= name;
//             console.log(name);
//             Socket.broadcast.emit('user joined', name);
//         })
//         Socket.on('send', message=>{
//             Socket.broadcast.emit('receive',{message: message, name: [socket.id]} );
            
//         })
        
        
    
//     })
    
    

