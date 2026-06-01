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

## Los Drivers de PHP (sqlsrv y pdo_sqlsrv)

**PHP** no se comunica con **SQL** Server por arte de magia; necesita unos *traductores* (drivers) creados por Microsoft. Como **PHP** se actualiza constantemente, Microsoft lanza versiones específicas de estos archivos .dll para cada versión de **PHP**. Si usas un driver que no coincide con tu versión exacta de **PHP**, simplemente no cargará.

Paso A: Identificar tu versión exacta de **PHP** Abre tu terminal y ejecuta estos comandos para saber qué descargar:

php -v: Te dirá tu versión (por ejemplo, 8.1, 8.2 o 8.3).

php -i | findstr *Thread*: Esto es crucial. Te dirá si tu **PHP** es Thread Safe (TS) o Non-Thread Safe (**NTS**). Si usas **XAMPP** o Laragon, casi siempre es Thread Safe.

Paso B: Descargar y extraer los archivos Ve a la página oficial de Microsoft Drivers for **PHP** for **SQL** Server.

Descarga el ejecutable (suele ser un archivo .exe que solo extrae archivos).

Al extraerlo, verás una lista enorme de archivos .dll. Debes elegir solo dos que coincidan con tu sistema. Por ejemplo, si tienes **PHP** 8.2 y es Thread Safe (TS) de 64 bits (x64), buscarás:

php_sqlsrv_82_ts_x64.dll

php_pdo_sqlsrv_82_ts_x64.dll

Paso C: Pegar los archivos en la carpeta ext Busca dónde está instalado tu **PHP** (si usas **XAMPP**, suele estar en C:\xampp\php\ext).

Copia los dos archivos .dll que elegiste y pégalos directamente dentro de esa carpeta ext.

Paso D: Habilitarlos en el php.ini En la carpeta principal de tu **PHP** (ej. C:\xampp\php), busca el archivo llamado php.ini y ábrelo con un editor de texto.

Busca la sección donde hay muchas líneas que empiezan con extension=.

Al final de esa lista, agrega los nombres exactos de los archivos que pegaste, de esta manera:

Ini, **TOML** extension=php_sqlsrv_82_ts_x64.dll extension=php_pdo_sqlsrv_82_ts_x64.dll Guarda el archivo. Muy importante: Cierra todas tus terminales y reinicia tu servidor local para que **PHP** lea la nueva configuración.

## Habilitar el Puerto 1433 en SQL Server

Por defecto, cuando instalas **SQL** Server (especialmente la versión Express), Microsoft lo configura para usar *Puertos Dinámicos* por razones de seguridad. Esto significa que cada vez que reinicias la PC, el puerto cambia. Laravel necesita un puerto estático para conectarse, y el estándar universal para **SQL** Server es el **1433**.

Así es como lo fijas:

Paso A: Abrir el Administrador de Configuración Presiona la tecla Windows en tu teclado y busca Administrador de configuración de **SQL** Server (**SQL** Server Configuration Manager). Es una herramienta independiente de **SSMS**.

Paso B: Habilitar **TCP**/IP En el panel izquierdo, despliega Configuración de red de **SQL** Server (**SQL** Server Network Configuration).

Haz clic en Protocolos de **SQLEXPRESS** (o el nombre de tu instancia, como **MSSQLSERVER**).

En el panel derecho, verás un protocolo llamado **TCP**/IP. Si está deshabilitado, haz clic derecho sobre él y selecciona Habilitar.

Paso C: Configurar el Puerto **1433** Haz clic derecho de nuevo sobre **TCP**/IP y selecciona Propiedades.

Ve a la pestaña Direcciones IP.

Desplázate hasta el fondo, hasta la sección que dice IPAll (Todas las IP).

Aquí está el truco:

Donde dice Puertos dinámicos **TCP** (**TCP** Dynamic Ports), borra cualquier número que haya. Déjalo completamente en blanco.

Donde dice Puerto **TCP** (**TCP** Port), escribe **1433**.

Haz clic en Aplicar y luego en Aceptar. Te saldrá una advertencia diciendo que debes reiniciar el servicio.

Paso D: Reiniciar el Servicio de **SQL** Server En el mismo Administrador de Configuración, ve a la parte superior del panel izquierdo y haz clic en Servicios de **SQL** Server (**SQL** Server Services).

En el panel derecho, busca el servicio principal (usualmente se llama **SQL** Server (**SQLEXPRESS**)).

Haz clic derecho sobre él y selecciona Reiniciar.

Una vez hecho esto, tu entorno estará perfectamente preparado. Tu archivo .env en Laravel podrá comunicarse por el puerto **1433** a través de los drivers de **PHP** que acabas de instalar, y comandos como php artisan migrate funcionarán sin arrojar errores de conexión.

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
