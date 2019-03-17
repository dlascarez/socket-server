import { Socket } from "socket.io";
import { UsuarioLista } from "../clases/usuarios-lista";
import { Usuario } from "../clases/usuario";
import { mapa } from "../routes/router";

export const usuariosConectados = new UsuarioLista();

// Mapas
export const marcadorNuevo = (cliente: Socket) => {
    cliente.on('marcador-nuevo', (marcador) => {
        mapa.agregarMarcadores(marcador);
        cliente.broadcast.emit('marcador-nuevo', marcador);
    });
};
export const marcadorBorrar = (cliente: Socket) => {
    cliente.on('marcador-borrar', (id) => {
        mapa.borrarMarcador(id);
        cliente.broadcast.emit('marcador-borrar', id);
    });
};
export const marcadorMover = (cliente: Socket) => {
    cliente.on('marcador-mover', (marcador) => {
        mapa.moverMarcador(marcador);
        cliente.broadcast.emit('marcador-mover', marcador);
    });
};




export const conectarCliente = (cliente: Socket, io: SocketIO.Server) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
};

export const desconectar = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('disconnect', () => {
        usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', usuariosConectados.getLista());
    });
};

export const message = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {
        // console.log('Mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload);
    });
};

export const configurarUsuario = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('configurar-usuario', (payload: { nombre: string }, callback: Function) => {
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        io.emit('usuarios-activos', usuariosConectados.getLista());
        callback();
    });
};

export const obtenerUsuarios = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('obtener-usuarios', () => {
        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
    });
};
