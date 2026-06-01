# DevTask (Prueba Técnica)

Esta es una aplicación web para la gestión de tareas personales, desarrollada como prueba técnica. Cumple con los requerimientos de crear, listar, editar y eliminar tareas, incluyendo categorización dinámica, filtrado a nivel de servidor y manejo de estados.

## 🛠 Stack Tecnológico
* **Backend:** Laravel 10
* **Frontend:** React 18 + Inertia.js + Tailwind CSS
* **Base de Datos:** SQL Server

## ⚙️ Requisitos Previos
Para levantar este proyecto en tu entorno local, asegúrate de tener instalado:
* PHP (v8.1 o superior)
* Composer
* Node.js y npm
* SQL Server (y SSMS preferentemente)
* **Importante:** Los drivers `pdo_sqlsrv` y `sqlsrv` deben estar instalados y habilitados en tu archivo `php.ini`.
* Descarga oficial:

[Microsoft Drivers for PHP for SQL Server](https://learn.microsoft.com/en-us/sql/connect/php/download-drivers-php-sql-server?view=sql-server-ver17)

# Guía de Configuración: PHP y SQL Server en Windows

Entender a fondo esta configuración es vital, ya que conectar PHP con SQL Server suele ser el mayor obstáculo inicial en este tipo de proyectos. Al dominar esta parte, garantizas que Laravel pueda comunicarse fluidamente con la base de datos local.

## 1. Los Drivers de PHP (`sqlsrv` y `pdo_sqlsrv`)

**¿Por qué son necesarios?**
PHP no se comunica con SQL Server de forma nativa; necesita "traductores" (drivers) creados específicamente por Microsoft. Como PHP se actualiza constantemente, Microsoft lanza versiones de estos archivos `.dll` para cada versión de PHP. Si usas un driver que no coincide exactamente con la arquitectura y versión de tu PHP, la conexión fallará.

### Paso A: Identificar tu versión exacta de PHP
Abre tu terminal (Símbolo del sistema o PowerShell) y ejecuta estos comandos para saber qué versión descargar:
1. Ejecuta `php -v`: Te dirá tu versión exacta (por ejemplo, 8.1, 8.2 o 8.3).
2. Ejecuta `php -i | findstr "Thread"`: Esto es crucial. Te indicará si tu instalación de PHP es *Thread Safe* (TS) o *Non-Thread Safe* (NTS). Si utilizas herramientas como XAMPP o Laragon, casi siempre será *Thread Safe*.

### Paso B: Descargar y extraer los archivos
1. Ve a la página oficial de descargas: **Microsoft Drivers for PHP for SQL Server**.
2. Descarga el archivo ejecutable (`.exe`) correspondiente a tu versión de Windows. Este archivo funciona como un extractor.
3. Al extraerlo, verás una lista extensa de archivos `.dll`. Debes elegir únicamente los dos que coincidan con tu sistema. Por ejemplo, si tienes PHP 8.2, es Thread Safe (TS) y tu sistema es de 64 bits (x64), debes buscar:
   * `php_sqlsrv_82_ts_x64.dll`
   * `php_pdo_sqlsrv_82_ts_x64.dll`

### Paso C: Ubicar los archivos en la carpeta `ext`
1. Busca el directorio donde está instalado PHP en tu computadora (si usas XAMPP, la ruta típica es `C:\xampp\php\ext`).
2. Copia los dos archivos `.dll` seleccionados en el paso anterior y pégalos directamente dentro de esa carpeta `ext`.

### Paso D: Habilitar los drivers en el archivo `php.ini`
1. En el directorio principal de PHP (ej. `C:\xampp\php`), localiza el archivo de configuración principal llamado `php.ini` y ábrelo con un editor de texto (como el Bloc de notas o VS Code).
2. Busca la sección de extensiones dinámicas (donde hay múltiples líneas que comienzan con `extension=`).
3. Al final de esa lista, agrega los nombres exactos de los archivos que pegaste en la carpeta `ext`:
   ```ini
   extension=php_sqlsrv_82_ts_x64.dll
   extension=php_pdo_sqlsrv_82_ts_x64.dll

### Paso E: Guarda los cambios en el archivo.

### Paso crítico: Cierra todas tus terminales y reinicia tu servidor web local (Apache/Nginx en XAMPP o Laragon) para que PHP cargue la nueva configuración.

## 2. Habilitar el Puerto 1433 en SQL Server

**¿Por qué es necesario?**
Por defecto, al instalar SQL Server (especialmente las ediciones Express), Microsoft lo configura para utilizar "Puertos Dinámicos" por motivos de seguridad. Esto hace que el puerto de conexión cambie cada vez que se reinicia el servicio. Sin embargo, frameworks como Laravel necesitan apuntar a un puerto estático constante. El estándar universal de la industria para SQL Server es el puerto **1433**.

### Paso A: Abrir el Administrador de Configuración
1. Presiona la tecla Windows, busca y abre el **Administrador de configuración de SQL Server** (SQL Server Configuration Manager). 
> *Nota: Esta es una herramienta administrativa del sistema, independiente de SQL Server Management Studio (SSMS).*

### Paso B: Habilitar el protocolo TCP/IP
1. En el panel izquierdo, expande la sección **Configuración de red de SQL Server** (SQL Server Network Configuration).
2. Selecciona **Protocolos de SQLEXPRESS** (el nombre puede variar según tu instancia, ej. MSSQLSERVER).
3. En el panel derecho, verifica el estado del protocolo **TCP/IP**. Si dice "Deshabilitado", haz clic derecho sobre él y selecciona **Habilitar**.

### Paso C: Configurar el Puerto Estático 1433
1. Haz clic derecho nuevamente sobre **TCP/IP** y selecciona **Propiedades**.
2. Dirígete a la pestaña **Direcciones IP**.
3. Desplázate hasta la última sección de la lista, llamada **IPAll** (Todas las IP).
4. Realiza estos dos ajustes fundamentales:
   * **Puertos dinámicos TCP** (TCP Dynamic Ports): Borra cualquier número que aparezca aquí. Debe quedar completamente en blanco.
   * **Puerto TCP** (TCP Port): Escribe el número **1433**.
5. Haz clic en **Aplicar** y luego en **Aceptar**. El sistema te mostrará una advertencia indicando que los cambios no surtirán efecto hasta que se reinicie el servicio.

### Paso D: Reiniciar el Servicio de SQL Server
1. En el mismo Administrador de Configuración, ve al panel izquierdo y selecciona **Servicios de SQL Server** (SQL Server Services).
2. En el panel derecho, localiza el servicio del motor de base de datos (usualmente nombrado como `SQL Server (SQLEXPRESS)` o similar).
3. Haz clic derecho sobre este servicio y selecciona **Reiniciar**.

¡Listo! Con esto, tu entorno local en Windows está perfectamente configurado. Tu archivo `.env` de Laravel podrá establecer una conexión exitosa a través del puerto 1433 utilizando los drivers nativos de PHP.

## 🚀 Instrucciones de Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DE_TU_REPOSITORIO>
   cd devtask
   
2. **Instalar dependencias de PHP y Node:**
    ```bash
    composer install
    npm install

3. **Configurar las variables de entorno:**
    Duplica el archivo de ejemplo y renómbralo:
   ```bash
   cp .env.example .env

   Genera la clave de la aplicación:
   
   php artisan key:generate
  
   
4. **Configuración de SQL Server (.env):**
    Abre el archivo .env y ajusta el bloque de base de datos para que apunte a tu instancia local de SQL Server. Ejemplo:

   ```bash
   Fragmento de código
    DB_CONNECTION=sqlsrv
    DB_HOST=127.0.0.1
    DB_PORT=1433
    DB_DATABASE=devtask
    DB_USERNAME=tu_usuario_sa
    DB_PASSWORD=tu_contraseña
   
   (Asegúrate de haber creado la base de datos devtask vacía en SSMS antes de continuar).
   
5. **Ejecutar Migraciones y Seeders:**
    Este comando creará las tablas necesarias y cargará las categorías iniciales (Trabajo, Personal, Compras) y algunos registros de tareas:

    ```bash
   php artisan migrate --seed

6. **Levantar los servidores:**
    Necesitarás dos terminales abiertas.
    En la primera, compila los assets del frontend en tiempo real:

   ```bash
   npm run dev

   En la segunda, levanta el servidor de Laravel:

   php artisan serve

7. **Acceder a la aplicación:**
   Abre tu navegador y visita: http://localhost:8000/tareas

---

### 2. Respuestas del Cuestionario Teórico

Estas son las respuestas correctas a las opciones planteadas en el documento:

* **Pregunta 1:** C) Usando el método `Inertia::render('Nombre Componente', ['datos' => $datos])`.
* **Pregunta 2:** D) El hook `useForm` de `@inertiajs/React`. 
* **Pregunta 3:** B) El driver `pdo_sqlsrv` (y `sqlsrv`).
* **Pregunta 4:** D) `dangerouslySetInnerHTML`.
* **Pregunta 5:** D) `User::where('name', 'like', '%juan%')->get();`. 
* **Pregunta 6:** C) Retornando `redirect()->route('nombre.ruta');` de la forma habitual en Laravel.
* **Pregunta 7:** A) Pasando un array vacío `[]` como segundo argumento.
* **Pregunta 8:** D) `$table->text('contenido');` (que mapea a nvarchar(max) en SQL Server).
* **Pregunta 9:** A) Previene la recarga completa del navegador, interceptando el clic para realizar una petición AJAX transparente y actualizar la página mediante la SPA.
* **Pregunta 10:** B) Transacciones de Base de Datos mediante `DB::transaction(function () { ... });`.
