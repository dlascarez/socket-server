import { Usuario } from "./usuario";

export class UsuarioLista {
    private lista: Usuario[];

    constructor() {
        this.lista = [];
    }

    // Agregar un usuario
    public agregar(usuario: Usuario) {
        this.lista.push(usuario);
        return usuario;
    }

    // Actualizar nombre
    public actualizarNombre(id: string, nombre: string) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
        console.log(id);
    }

    public getLista() {
        return this.lista;
    }

    public getUsuario(id: string) {
        return this.lista.find(Usuario => Usuario.id === id);
    }

    // Obtener usuarios en una sala en particular
    public getUsuariosEnSala(sala: string) {
        return this.lista.filter(Usuario => Usuario.sala === sala);
    }

    // Borrar usuario
    public borrarUsuario(id: string) {
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(Usuario => Usuario.id !== id);

        return tempUsuario;
    }
}
