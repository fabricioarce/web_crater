# CRATER · Web del equipo

**Costa Rican Aerospace Team for Experimental Rocketry**

Aplicación web del equipo universitario de cohetería CRATER, de Costa Rica. Presenta al equipo, su trayectoria, proyectos, patrocinadores y catálogo de mercancía con una identidad visual aeroespacial.

El contenido se administra mediante **archivos JSON locales**: añadir proyectos, integrantes o productos no requiere modificar los componentes de la aplicación.

> **Estado actual:** la web contiene datos e ilustraciones de demostración. No representan integrantes, resultados, proyectos ni productos oficiales. Todavía no hay patrocinadores publicados. La merch es únicamente un catálogo, **sin carrito ni pasarelas de pago**.

## Contenido

- [Qué incluye](#qué-incluye)
- [Guía desde cero: si no tienes nada instalado](#guía-desde-cero-si-no-tienes-nada-instalado)
- [Inicio rápido para quien ya tiene las herramientas](#inicio-rápido-para-quien-ya-tiene-las-herramientas)
- [Editar el contenido](#editar-el-contenido)
- [Comandos disponibles](#comandos-disponibles)
- [Comprobar el proyecto](#comprobar-el-proyecto)
- [Probar la versión de producción](#probar-la-versión-de-producción)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Tecnologías e identidad visual](#tecnologías-e-identidad-visual)
- [Solución de problemas](#solución-de-problemas)
- [Antes de publicar](#antes-de-publicar)

## Qué incluye

| Página | Ruta | Contenido |
| --- | --- | --- |
| Inicio | `/` | Presentación general, cifras, pilares y proyectos destacados |
| Trayectoria | `/trayectoria` | Línea de tiempo de hitos, competencias y actividades |
| Equipo | `/equipo` | Estadísticas, liderazgo, project managers y áreas de trabajo |
| Proyectos | `/proyectos` | Catálogo con filtros por estado y fichas desplegables |
| Patrocinadores | `/patrocinadores` | Aliados por categoría y propuesta de colaboración |
| Merch | `/merch` | Catálogo con categorías, búsqueda y detalles de los productos |

También incluye navegación responsiva, imágenes y fuentes locales, validación de datos, una página 404 y pruebas automáticas.

Para aprender a añadir o modificar cada tipo de contenido, consulta **[MANUAL.md](./MANUAL.md)**. Este README se centra en instalar, ejecutar y entender el proyecto.

## Guía desde cero: si no tienes nada instalado

### 1. Qué necesitas y para qué sirve

| Herramienta | Para qué sirve | ¿Es necesaria? |
| --- | --- | --- |
| Un navegador moderno | Ver la web: Chrome, Firefox, Edge o Safari | Sí |
| Node.js | Ejecutar la aplicación en tu computadora | Sí |
| npm | Descargar las librerías del proyecto; viene incluido con Node.js | Sí |
| Git | Descargar el repositorio y actualizarlo después | Recomendado; también puedes descargar un ZIP |
| Un editor como Visual Studio Code | Abrir la carpeta y modificar el contenido | Recomendado para editar |

**Versión recomendada:** Node.js **22 LTS**, en su revisión más reciente y como mínimo 22.13. El proyecto tiene un archivo `.nvmrc` que selecciona la rama 22. La instalación inicial se verificó con Node 22.22.2 y npm 10.9.7.

No necesitas instalar Next.js, React, Tailwind ni TypeScript por separado: se instalarán automáticamente con las dependencias del proyecto. Tampoco necesitas Docker, una base de datos, claves API, un archivo `.env` ni pagar un servicio para ejecutarlo localmente.

Necesitas conexión a Internet para descargar las herramientas y las dependencias. La web base utiliza contenido, imágenes y fuentes locales.

### 2. Instalar las herramientas en tu sistema

**Sigue solo el apartado de tu sistema operativo**, no los tres.

#### Windows

1. Abre la [página oficial de Node.js](https://nodejs.org/en/download).
2. Selecciona **Node.js 22 LTS**, Windows y el instalador **`.msi`** para la arquitectura de tu equipo. En la mayoría de los equipos será **x64**; si tu Windows es ARM, selecciona **ARM64**. Puedes comprobarlo en *Configuración → Sistema → Acerca de → Tipo de sistema*.
3. Ejecuta el instalador y conserva la instalación de **npm** y la opción de añadir Node.js al **PATH**. Esta opción permite que la terminal encuentre el programa. No necesitas instalar herramientas adicionales de compilación para comenzar con este proyecto.
4. Descarga e instala Git desde la [página oficial de Git para Windows](https://git-scm.com/install/windows). Deja habilitada su utilización desde la línea de comandos.
5. Opcionalmente, instala [Visual Studio Code](https://code.visualstudio.com/download).
6. **Cierra y vuelve a abrir las terminales y el editor** después de instalar las herramientas.
7. Abre el menú Inicio, escribe **`cmd`** y abre **Símbolo del sistema**. Usaremos esa terminal para evitar problemas con las políticas de ejecución de PowerShell.
8. Escribe estos comandos, uno por uno, pulsando Enter después de cada línea:

   ```text
   node --version
   npm --version
   git --version
   ```

Si los tres muestran una versión, continúa con el paso 3. Si Windows solicita permisos de administrador durante la instalación y no los tienes, pide ayuda a la persona que administra el equipo.

#### macOS

1. Abre la [página oficial de Node.js](https://nodejs.org/en/download).
2. Selecciona **Node.js 22 LTS**, macOS y el instalador **`.pkg`**. Elige la opción compatible con tu Mac: **ARM64** para Apple Silicon o **x64** para Intel, si la página te pide elegir arquitectura. Puedes comprobar el chip en *Menú Apple → Acerca de esta Mac*.
3. Instala el paquete: incluye Node.js y npm.
4. Abre **Terminal** desde Spotlight: pulsa `Command + Espacio`, escribe `Terminal` y pulsa Enter.
5. Comprueba si tienes Git:

   ```bash
   git --version
   ```

6. Si macOS propone instalar las herramientas de línea de comandos, acepta y espera a que finalicen. Si no aparece la propuesta y falta Git, ejecuta:

   ```bash
   xcode-select --install
   ```

   No necesitas descargar el entorno completo de Xcode; las herramientas de línea de comandos incluyen Git. También puedes consultar las [opciones oficiales de instalación de Git en macOS](https://git-scm.com/install/mac).

7. Opcionalmente, instala [Visual Studio Code](https://code.visualstudio.com/download).
8. Cierra y vuelve a abrir Terminal. Comprueba:

   ```bash
   node --version
   npm --version
   git --version
   ```

#### Linux: Ubuntu, Debian, Linux Mint o Fedora

Usaremos **nvm**, una herramienta para instalar Node.js en tu cuenta de usuario sin depender de la versión que incluya la distribución. Estos pasos están pensados para una terminal Bash.

1. Abre la aplicación **Terminal**.
2. Instala Git, curl y los certificados HTTPS con el comando de tu distribución.

   **Ubuntu, Debian o Linux Mint:**

   ```bash
   sudo apt update
   sudo apt install git curl ca-certificates
   ```

   **Fedora:**

   ```bash
   sudo dnf install git ca-certificates
   curl --version
   ```

   Si `curl --version` muestra una versión, ya tienes curl y no debes reinstalarlo. Si indica que el comando no existe, instálalo:

   ```bash
   sudo dnf install curl
   ```

   `sudo` puede pedir la contraseña de tu cuenta. Al escribirla normalmente no aparecen caracteres; es normal. Si no tienes permisos administrativos, pide ayuda a quien administra el equipo. En otras distribuciones, instala los mismos paquetes mediante su gestor de paquetes.

3. Instala nvm siguiendo su [documentación oficial](https://github.com/nvm-sh/nvm#installing-and-updating). Este es el comando del instalador de la versión 0.40.3:

   ```bash
   curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
   ```

   Este comando descarga y ejecuta un script del repositorio oficial de nvm. Puedes [revisar el instalador antes de ejecutarlo](https://github.com/nvm-sh/nvm/blob/v0.40.3/install.sh). No añadas `sudo` a este comando.

4. Cierra la terminal y abre una nueva para cargar nvm. Comprueba que se instaló:

   ```bash
   nvm --version
   ```

5. Instala y activa Node.js 22, y selecciónalo para futuras terminales:

   ```bash
   nvm install 22
   nvm use 22
   nvm alias default 22
   ```

6. Comprueba las herramientas:

   ```bash
   node --version
   npm --version
   git --version
   ```

7. Opcionalmente, instala [Visual Studio Code](https://code.visualstudio.com/download): `.deb` para Ubuntu/Debian o `.rpm` para Fedora.

Si nvm no aparece en una terminal nueva, consulta el apartado de problemas frecuentes. Si utilizas Fish u otra shell no compatible directamente con nvm, usa Bash para estos pasos o sigue la guía oficial de nvm para tu entorno.

### 3. Descargar el proyecto

Tienes dos opciones. **Elige una sola.** No hace falta configurar una clave SSH para empezar.

#### Opción A: con Git, recomendada

Abre tu terminal y ejecuta:

```bash
git clone https://github.com/fabricioarce/web_crater.git
cd web_crater
```

- El primer comando crea una carpeta llamada `web_crater` en la ubicación actual y descarga el código.
- El segundo comando entra en esa carpeta. `cd` significa «cambiar de directorio».
- Si acabas de abrir una terminal, normalmente estarás en la carpeta de tu usuario. Si prefieres otra ubicación, abre primero una terminal en esa carpeta.
- Si ya descargaste el proyecto antes, no necesitas clonarlo otra vez: entra en su carpeta.

Usamos **HTTPS**, no la dirección `git@github.com:…`, porque esta última necesita que ya tengas configuradas claves SSH.

Si el repositorio es público, no necesitas una cuenta de GitHub para descargarlo. Si es privado, necesitas acceso autorizado: inicia sesión con el método que te ofrezca Git o utiliza la descarga ZIP desde tu cuenta. La contraseña de GitHub no sirve como contraseña de Git por HTTPS. No pegues contraseñas ni tokens en los archivos del proyecto.

#### Opción B: descargar ZIP, sin instalar Git

1. Entra en [fabricioarce/web_crater](https://github.com/fabricioarce/web_crater).
2. Pulsa **Code → Download ZIP**.
3. Descomprime el archivo: no trabajes directamente dentro del ZIP.
4. La carpeta normalmente se llamará **`web_crater-main`**.
5. Abre una terminal dentro de esa carpeta, donde está `package.json`:
   - **Windows:** abre la carpeta en el Explorador, escribe `cmd` en su barra de direcciones y pulsa Enter.
   - **macOS:** abre Terminal, escribe `cd ` —con un espacio al final—, arrastra la carpeta descomprimida hasta la ventana de Terminal y pulsa Enter.
   - **Linux:** haz clic derecho dentro de la carpeta y elige **Abrir en una terminal**, si tu explorador ofrece esa opción.
   - **Visual Studio Code:** abre la carpeta con *Archivo → Abrir carpeta* y luego *Terminal → Nueva terminal*. En Windows, puedes elegir **Command Prompt / Símbolo del sistema** como perfil de terminal.

La descarga ZIP permite ejecutar y editar la web, pero no incluye el historial de Git ni permite actualizar con `git pull`.

### 4. Instalar las dependencias del proyecto

Ya dentro de la carpeta que contiene `package.json`, ejecuta:

```bash
npm ci
```

Este comando descarga las librerías necesarias usando las versiones guardadas en `package-lock.json`. Espera a que termine y vuelva a aparecer la línea donde puedes escribir comandos. La carpeta `node_modules` se crea automáticamente.

**No ejecutes este comando con `sudo` ni como administrador.** No necesitas instalar paquetes globales. Si aparece un error, resuélvelo antes de continuar; consulta [Solución de problemas](#solución-de-problemas).

### 5. Encender la web

Ejecuta:

```bash
npm run dev
```

Cuando la terminal indique que está lista —normalmente con `Ready`—, abre en tu navegador:

**http://localhost:3000**

```text
Terminal abierta                  Navegador
npm run dev             ────────>  http://localhost:3000
                                  Aquí ves la web de CRATER
```

- **Deja la terminal abierta.** Mientras ese comando esté ejecutándose, la web estará disponible.
- Para apagar el servidor, pulsa **`Ctrl + C`** en esa terminal; también en macOS. Si Windows pide confirmar que deseas terminar el proceso, confirma.
- Si el puerto 3000 está ocupado, Next.js puede elegir otro. Abre la dirección que muestre la terminal. También puedes elegir uno:

  ```bash
  npm run dev -- --port 3001
  ```

  En ese caso abre **http://localhost:3001**.

`localhost` significa «esta computadora»: esa dirección no publica la web en Internet. Los scripts escuchan en `0.0.0.0`, por lo que también pueden aceptar conexiones desde tu red local si el firewall lo permite. Trabaja en una red de confianza.

### 6. Abrirla otro día

No tienes que reinstalar Node.js, Git ni volver a descargar todo cada vez.

1. Abre una terminal dentro de la carpeta del proyecto.
2. Si usas nvm, ejecuta `nvm use`. Leerá la versión de `.nvmrc`.
3. Ejecuta `npm run dev`.
4. Abre la dirección local que indique la terminal.

Repite `npm ci` si cambió `package-lock.json`, si acabas de descargar el proyecto o si faltan sus dependencias. No hace falta hacerlo por cada cambio de texto o imagen.

## Inicio rápido para quien ya tiene las herramientas

Con Node.js 22 LTS y Git instalados:

```bash
git clone https://github.com/fabricioarce/web_crater.git
cd web_crater
npm ci
npm run dev
```

Abre **http://localhost:3000**. Si ya tienes el repositorio, omite la clonación y entra en tu carpeta existente.

## Editar el contenido

Abre la carpeta en tu editor y modifica los archivos de `src/data/`:

| Archivo | Qué modifica |
| --- | --- |
| [`sitio.json`](./src/data/sitio.json) | Presentación de Inicio, navegación, identidad, correo, redes y pie de página |
| [`proyectos.json`](./src/data/proyectos.json) | Proyectos, estados, fichas y destacados de Inicio |
| [`productos.json`](./src/data/productos.json) | Merch, precios, tallas, categorías y disponibilidad |
| [`equipo.json`](./src/data/equipo.json) | Estadísticas, líderes, project managers, integrantes y áreas |
| [`trayectoria.json`](./src/data/trayectoria.json) | Hitos y eventos ordenados por fecha |
| [`patrocinadores.json`](./src/data/patrocinadores.json) | Patrocinadores, categorías y propuesta de apoyo |

Las nuevas imágenes van en **`public/images/`**. Por ejemplo:

```text
Archivo guardado:     public/images/cohete-real.jpg
Ruta dentro del JSON: /images/cohete-real.jpg
```

Guarda con `Ctrl + S` o `Command + S`. Si el servidor de desarrollo sigue encendido, la página se actualizará. Para comprobar los datos, abre otra terminal en la carpeta y ejecuta:

```bash
npm run validate:data
```

No cambies los nombres de los campos ni repitas ids. Los textos van entre comillas dobles y los precios son números sin símbolos de moneda. Consulta **[el manual completo](./MANUAL.md)** para ver ejemplos listos para adaptar, esquemas de las tarjetas y cómo gestionar cada sección.

El JSON controla el contenido, no genera páginas nuevas: añadir una ruta, cambiar el diseño o implementar funciones nuevas requiere modificar código.

## Comandos disponibles

Todos se ejecutan desde la carpeta que contiene `package.json`.

| Comando | Función |
| --- | --- |
| `npm ci` | Instala las versiones exactas del archivo de bloqueo |
| `npm run dev` | Inicia el servidor de desarrollo con actualización al guardar |
| `npm run validate:data` | Valida los JSON y la existencia de las imágenes referenciadas |
| `npm run lint` | Revisa buenas prácticas del código |
| `npm run typecheck` | Genera los tipos de rutas y comprueba TypeScript |
| `npm test` | Ejecuta las pruebas de validación de datos |
| `npm run test:e2e` | Ejecuta las pruebas de navegador en escritorio y móvil |
| `npm run build` | Valida los datos y crea la compilación de producción |
| `npm start` | Sirve una compilación de producción ya creada |

## Comprobar el proyecto

Para una revisión completa de contenido, código y compilación:

```bash
npm run validate:data
npm run lint
npm run typecheck
npm test
npm run build
```

Ejecuta los comandos uno por uno y comprueba que cada uno termine correctamente. Estas verificaciones no requieren publicar nada en Internet.

### Pruebas de navegador, opcionales para empezar

La primera vez, instala el navegador de pruebas:

```bash
npx playwright install chromium
```

Después ejecuta:

```bash
npm run test:e2e
```

Playwright comprueba las seis páginas, carga de imágenes, navegación móvil, filtros, búsqueda y apertura y cierre de las fichas de productos.

- Usa `http://localhost:3000`, no `127.0.0.1`, para respetar las protecciones de origen de Next.js en desarrollo.
- Las pruebas reutilizan un servidor local en el puerto 3000 o inician uno temporal. No debe haber otra aplicación usando ese puerto.
- Las capturas y trazas quedan en `test-results/`, que no se sube a Git.
- Si Linux informa de bibliotecas del sistema faltantes, consulta la [guía de navegadores de Playwright](https://playwright.dev/docs/browsers#install-system-dependencies) y pide ayuda al administrador si necesitas permisos. No necesitas estas pruebas para abrir y editar la web.

## Probar la versión de producción

Detén el servidor anterior con `Ctrl + C` si vas a usar el mismo puerto. Después ejecuta:

```bash
npm run build
npm start
```

Abre **http://localhost:3000**. `npm start` necesita que la compilación haya terminado antes.

A diferencia de desarrollo, esta versión **no se actualiza al guardar**. Después de cambiar contenido o código, detén el servidor, vuelve a ejecutar `npm run build` y arráncalo de nuevo.

### Vista previa mediante una herramienta o proxy

Algunos proxies de vista previa interfieren con HMR, la conexión que usa Next.js para recargar durante el desarrollo. Si la página aparece pero los botones no responden:

1. Prueba directamente `http://localhost:3000` en el navegador.
2. Para la herramienta de vista previa, usa una compilación de producción en otro puerto:

   ```bash
   npm run build
   npm start -- --port 3001
   ```

3. Configura la herramienta para abrir **http://localhost:3001**.

No hace falta desactivar las protecciones de origen. Esta vista es una compilación fija y debe reconstruirse para reflejar cambios.

## Estructura del proyecto

```text
web_crater/
├── README.md                 Instalación, ejecución y resumen del proyecto
├── MANUAL.md                 Guía detallada para editar contenido
├── agents.md                 Directrices visuales y de mantenimiento
├── package.json              Comandos y dependencias
├── package-lock.json         Versiones reproducibles
├── .nvmrc                    Rama de Node recomendada: 22
├── next.config.ts            Configuración de Next.js y compatibilidad del logo
├── public/
│   ├── Logo.jpeg             Logotipo original
│   └── images/               Ilustraciones y fotografías locales
├── src/
│   ├── app/                  Páginas, layout, metadatos y estilos
│   ├── components/           Navbar, pie, catálogos y tarjetas
│   ├── data/                 Los seis archivos JSON editables
│   └── lib/                  Carga tipada y validación de datos
├── scripts/
│   └── validate-data.ts      Validación del contenido y las imágenes
└── tests/
    ├── data.test.ts          Pruebas de datos
    └── e2e/                  Pruebas de navegador
```

`node_modules/`, `.next/` y `test-results/` son carpetas generadas. No hay que crearlas a mano ni subirlas a Git. El archivo `next-env.d.ts` también lo genera Next.js.

## Tecnologías e identidad visual

- **Next.js 16**, con App Router y generación de páginas en la compilación.
- **React 19**, **TypeScript** y **Tailwind CSS 4**.
- **Zod** para validar los archivos de datos.
- **Lucide** para iconos.
- **Inter** y **Space Grotesk**, servidas localmente mediante Fontsource.
- **ESLint**, pruebas con **Node/tsx** y pruebas de navegador con **Playwright**.

Las versiones exactas están en [`package.json`](./package.json) y `package-lock.json`. Se mantiene ESLint 9 por compatibilidad con los plugins de `eslint-config-next`; actualizar solo ESLint a la versión 10 rompe esa combinación. Aunque npm muestre un aviso de deprecación de ESLint 9, no significa que la instalación haya fallado. Su actualización debe hacerse junto con los plugins compatibles.

La identidad está definida en [`agents.md`](./agents.md). Los colores se declaran en [`src/app/globals.css`](./src/app/globals.css):

| Color | Hexadecimal |
| --- | --- |
| Celeste | `#BFD7F5` |
| Azul | `#003052` |
| Azul oscuro | `#00143D` |
| Verde claro | `#145200` |
| Verde oscuro | `#003D00` |
| Beige claro | `#FFF8D6` |
| Amarillo | `#CD9700` |
| Rojo | `#A30000` |

El logotipo entregado se llama **`public/Logo.jpeg`**, con `L` mayúscula. Se conserva intacto; una regla en `next.config.ts` permite utilizar también la ruta **`/logo.jpeg`**. En Linux, mayúsculas y minúsculas importan.

## Solución de problemas

### «node», «npm» o «git» no se reconoce / command not found

Cierra y vuelve a abrir la terminal y el editor después de instalar. Revisa `node --version`, `npm --version` y `git --version`. En Windows, confirma que los instaladores añadieron las herramientas al PATH. Si usaste nvm, ejecuta `nvm use 22`.

### PowerShell dice que no puede ejecutar `npm.ps1`

Abre **Símbolo del sistema (`cmd`)** y ejecuta allí los comandos. También puedes usar `npm.cmd ci` y `npm.cmd run dev` desde PowerShell. No necesitas cambiar las políticas de ejecución del equipo.

### nvm no se encuentra en Linux

Abre una terminal nueva. En Bash, puedes cargar la configuración con:

```bash
source ~/.bashrc
```

Después prueba `nvm --version`. Si sigue sin aparecer, revisa los mensajes del instalador y las instrucciones de tu shell en la documentación oficial de nvm. No intentes solucionarlo con `sudo nvm`.

### No encuentra `package.json` o aparece ENOENT

Estás en otra carpeta. Entra en `web_crater` —o `web_crater-main` si descargaste el ZIP— y verifica visualmente que allí esté `package.json`. Abre la terminal en esa carpeta y vuelve a intentar.

### Node es demasiado antiguo o aparece EBADENGINE

Utiliza Node.js 22 LTS actualizado. Con nvm, dentro del repositorio:

```bash
nvm install
nvm use
```

Ambos comandos leen `.nvmrc`. Después repite `npm ci`. En Windows o macOS, si instalaste Node con un instalador, actualízalo mediante el mismo método y abre una terminal nueva.

### «Permission denied (publickey)» al clonar

Estás usando una URL SSH sin tener claves configuradas. Para empezar, usa la dirección HTTPS de esta guía. Si el repositorio es privado, necesitas además que su propietario te conceda acceso. Cambiar a HTTPS no sustituye ese permiso.

### `npm ci` falla

Lee el error que aparece al final. Comprueba la conexión a Internet, la versión de Node y que existan tanto `package.json` como `package-lock.json`. Si indican que los dos archivos no coinciden, consulta a quien mantiene el proyecto: no borres el archivo de bloqueo ni uses `--force` para ocultar el problema. No desactives la validación HTTPS ni uses `sudo npm ci`.

### El puerto 3000 está ocupado / EADDRINUSE

Detén tu otro servidor con `Ctrl + C`, si es uno que abriste tú, o usa otro puerto:

```bash
npm run dev -- --port 3001
```

Abre la nueva dirección mostrada en la terminal. Las pruebas de navegador del proyecto siguen usando el puerto 3000.

### El navegador no puede abrir localhost

Comprueba que `npm run dev` siga ejecutándose, que la terminal no muestre un error y que estés usando el puerto correcto. Abrir los archivos `.tsx` directamente en el navegador no arranca la aplicación.

### No aparece una imagen o falla la validación

Revisa el nombre exacto, su extensión y las mayúsculas. La ruta debe empezar con `/images/`, no con `/public/images/`, para imágenes guardadas en `public/images`. Ejecuta `npm run validate:data`. El logo tiene la excepción de compatibilidad explicada arriba.

### La web muestra un error después de editar JSON

Revisa comillas dobles, comas, llaves e ids únicos. La validación indica el archivo y el campo que debes corregir. El [manual](./MANUAL.md) explica ejemplos y errores frecuentes con más detalle.

### Guardé los cambios, pero no se ven

En desarrollo, confirma que guardaste el archivo y recarga el navegador. Si estás usando `npm start`, debes volver a compilar y reiniciar el servidor. Una vista previa de producción no tiene recarga automática.

## Antes de publicar

- Sustituye o retira los datos ficticios; confirma las cifras, fechas, precios y disponibilidad.
- Obtén permiso para publicar nombres, fotos y logotipos.
- Configura correo y redes oficiales. Deja esos campos vacíos si todavía no hay información confirmada.
- Ajusta las categorías y beneficios de patrocinio a lo realmente acordado.
- Ejecuta las validaciones y revisa móvil y escritorio.
- Solo después cambia `modoDemo` a `false` en `src/data/sitio.json`.

Ese indicador retira el aviso general de demostración y permite indexación en los metadatos, pero **no reemplaza los datos de ejemplo automáticamente**. Mientras está activado se solicita no indexar la web; eso no protege información privada.

**Subir el código a GitHub no publica la web por sí solo.** Para una dirección pública permanente necesitas un servicio compatible con Next.js o un servidor Node que instale, compile y ejecute la aplicación. No es una exportación HTML lista para GitHub Pages: utiliza el servidor de Next.js, optimización de imágenes y una regla de compatibilidad para el logo.

No subas credenciales, archivos `.env`, documentos privados ni datos sensibles. Todo lo guardado en `public/` se puede servir públicamente. La merch debe seguir siendo un catálogo sin pasarelas de pago, según las directrices del proyecto.
