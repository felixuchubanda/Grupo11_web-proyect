import { Usuario } from './patitasfelices/usuarios.model.js';
import { Adoptante } from './patitasfelices/adoptante.model.js';
import { Perro } from './patitasfelices/perro.model.js';
import { Estado } from './patitasfelices/estado.model.js';
import { SolicitudAdopcion } from './patitasfelices/solicitudadop.model.js';
import { Recursoedu } from './patitasfelices/recursoedu.model.js';

// Importar relaciones después de inicializar los modelos
import './patitasfelices/relationships.js';

export {
    Usuario,
    Adoptante,
    Perro,
    Estado,
    SolicitudAdopcion,
    Recursoedu,
};
