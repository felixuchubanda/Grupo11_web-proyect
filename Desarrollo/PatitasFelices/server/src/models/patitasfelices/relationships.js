import { Adoptante } from './adoptante.model.js';
import { Estado } from './estado.model.js';
import { Perro } from './perro.model.js';
import { Recursoedu } from './recursoedu.model.js';
import { SolicitudAdopcion } from './solicitudadop.model.js';
import { Usuario } from './usuarios.model.js';

// Adoptante

Adoptante.hasMany(SolicitudAdopcion, { foreignKey: 'id_adoptante' });
SolicitudAdopcion.belongsTo(Adoptante, { foreignKey: 'id_adoptante' });

// Perro

Perro.hasMany(SolicitudAdopcion, { foreignKey: 'id_perro' });
SolicitudAdopcion.belongsTo(Perro, { foreignKey: 'id_perro' });


Estado.hasMany(Perro, { foreignKey: 'id_estado' });
Perro.belongsTo(Estado, { foreignKey: 'id_estado' });

// Usuario
Usuario.hasOne(Adoptante, { foreignKey: 'id_usuario' });
Adoptante.belongsTo(Usuario, { foreignKey: 'id_usuario' });

Usuario.hasMany(Recursoedu, { foreignKey: 'id_usuario' });
Recursoedu.belongsTo(Usuario, { foreignKey: 'id_usuario' });
