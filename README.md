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
    Este comando creará las tablas necesarias y cargará las categorías iniciales (Trabajo, Personal, Compras):

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
