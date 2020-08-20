import socket from 'socket.io';

export default (server: any) => {
    const io = socket(server)

    io.on('connection', socket => {
        console.log('Made socket connection', socket.id)

        socket.on('chat', data => {
            console.log('data recu : '+ data)
            io.sockets.emit('chat', data)
        })
    })

    console.log('socket.io initialized');
}