# New_Vegas_WEB

## Descripcion del proyecto
Proyecto Proyectez inspirado en la pip-boy del Fallout New Vegas, desarrollada con puro React, dominican papi.  
Incluye navegacion por pestañas (`STAT`, `INV`, `DATA`, `MAP`, `RADIO`), autenticacion con Supabase (login/registro), roles de usuario (`user/admin`), PWA y base preparada para compilacion Android con Capacitor.

## Framework y librerias (con versiones)
- `react` `^19.2.0`
- `react-dom` `^19.2.0`
- `react-router-dom` `^7.13.1`
- `@supabase/supabase-js` `^2.98.0`
- `vite` `^7.3.1`
- `@vitejs/plugin-react` `^5.1.1`
- `vite-plugin-pwa` `^1.2.0`
- `@capacitor/core` `^8.2.0`
- `@capacitor/cli` `^8.2.0`
- `@capacitor/android` `^8.2.0`
- `eslint` `^9.39.1`

## Licencia de uso
Este proyecto se distribuye bajo licencia `MIT`.  
Consulta el archivo `LICENSE`.

## Guia de instalacion
1. Clona el repositorio y entra al proyecto:
```bash
git clone <URL_DEL_REPO>
cd proyectoAndres2Ev
```

2. Instala dependencias:
```bash
npm install
```

3. Configura variables de entorno en `.env` (en la raiz):
```env
VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=TU_PUBLISHABLE_KEY
```

4. En Supabase, ejecuta el script SQL de tablas/policies (profiles, quests, inventory y RLS).

5. Arranca en desarrollo:
```bash
npm run dev
```

6. Build de produccion:
```bash
npm run build
```
