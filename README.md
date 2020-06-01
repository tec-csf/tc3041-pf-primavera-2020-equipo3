# TC3041 Proyecto Final Primavera 2020

# *8-Twelve, your best choice*
---

##### Integrantes:
1. Daniel Roa - A01021960 - Campus Santa Fe
2. Camila Rovirosa - A01024192 - Campus Santa Fe
3. Julio Villazón - A01370190 - Campus Santa Fe

---
## 1. Aspectos generales

Las orientaciones del proyecto se encuentran disponibles en la plataforma **Canvas**.

Este documento es una guía sobre qué información debe entregar como parte del proyecto, qué requerimientos técnicos debe cumplir y la estructura que debe seguir para organizar su entrega.

### 1.1 Requerimientos técnicos

A continuación se mencionan los requerimientos técnicos mínimos del proyecto, favor de tenerlos presente para que cumpla con todos.

* El equipo tiene la libertad de elegir las tecnologías de desarrollo a utilizar en el proyecto, sin embargo, debe tener presente que la solución final se deberá ejecutar en una plataforma en la nube. Puede ser  [Google Cloud Platform](https://cloud.google.com/?hl=es), [Azure](https://azure.microsoft.com/en-us/) o [AWS](https://aws.amazon.com/es/free/).
* El proyecto debe utilizar al menos dos modelos de bases de datos diferentes, de los estudiados en el curso.
* La solución debe utilizar una arquitectura de microservicios. Si no tiene conocimiento sobre este tema, le recomiendo la lectura [*Microservices*](https://martinfowler.com/articles/microservices.html) de [Martin Fowler](https://martinfowler.com).
* La arquitectura debe ser modular, escalable, con redundancia y alta disponibilidad.
* La arquitectura deberá estar separada claramente por capas (*frontend*, *backend*, *API RESTful*, datos y almacenamiento).
* Los diferentes componentes del proyecto (*frontend*, *backend*, *API RESTful*, bases de datos, entre otros) deberán ejecutarse sobre contenedores [Docker](https://www.docker.com/) y utilizar [Kubernetes](https://kubernetes.io/) como orquestador.
* Todo el código, *datasets* y la documentación del proyecto debe alojarse en este repositorio de GitHub siguiendo la estructura que aparece a continuación.

### 1.2 Estructura del repositorio
El proyecto debe seguir la siguiente estructura de carpetas:
```
- / 			        # Raíz de todo el proyecto
    - README.md			# Archivo con los datos del proyecto (este archivo)
    - frontend			# Carpeta con la solución del frontend (Web app)
    - backend			# Carpeta con la solución del backend (CMS)
    - api			# Carpeta con la solución de la API
    - datasets		        # Carpeta con los datasets y recursos utilizados (csv, json, audio, videos, entre otros)
    - dbs			# Carpeta con los modelos, catálogos y scripts necesarios para generar las bases de datos
    - docs			# Carpeta con la documentación del proyecto
        - stage_f               # Documentos de la entrega final
        - manuals               # Manuales y guías
```

### 1.3 Documentación  del proyecto

Como parte de la entrega final del proyecto, se debe incluir la siguiente información:

* Justificación de los modelo de *bases de datos* que seleccionaron.
* Descripción del o los *datasets* y las fuentes de información utilizadas.
* Guía de configuración, instalación y despliegue de la solución en la plataforma en la nube  seleccionada.
* Documentación de la API. Puede ver un ejemplo en [Swagger](https://swagger.io/). 
* El código debe estar documentado siguiendo los estándares definidos para el lenguaje de programación seleccionado.

## 2. Descripción del proyecto

Como proyecto final, decidimos hacer una tienda en línea donde un usuario pueda realizar compras con los productos disponibles. 
Los usuarios podrán explorar los top 5 artículos mas vendidos, agregarlos al carrito, duplicarlos y añadirlos a su wishlist conforme vayan explorando esta misma. Asi mismo, podrán añadir diversas formas de pago y podrán editar sus datos personales, en caso que se realice un cambio en alguno de estos (e.g. cambio de dirección).
Dentro de la aplicación web, contamos con las siguientes características:

* Agregar un producto a un carrito
* Realizar la compra de un producto
* Bloqueo del perfil en caso de inactividad de mas de 5 minutos
* Duplicación de items en el carrito
* Añadir métodos de pago
* Lista de los productos mas populares

Para poder llevar a cabo la elaboración de este proyecto, se creó una solución usando JavaScript y las librerías ofrecidas por Node.js. A continuación se pueden ver las librerías utilizadas de Node:

* body-parser
* edge.js
* express
* express-edge
* express-validator
* mongodb
* nodemon
* password-hash
* redis

Las librerías de *Redis* y *MongoDB*  se encargan del manejo de su DB correspondiente.

## 3. Solución

A continuación aparecen descritos los diferentes elementos que forman parte de la solución del proyecto.

Para acceder a la versión final del proyecto, puede ser encontrada aquí:
http://35.193.212.207:4000

### 3.1 Modelos de *bases de datos* utilizados

Para el desarrollo de este proyecto, se están utilizando dos bases de datos distintas, MongoDB y Redis.
Se decidio utilizar MongoDB principalmente por que es una de las bases de datos NoSql mas usasda lo que permite una integracion mucho mas sencilla con otras aplicaciones. De igual menara, MongoDB permite el control de grandes cantidades de informacion con consultas optimizadas y gran capacidad de escalabilidad para agregar productos y usuarios.

Tambien, se utilizo Redis para mantenr nuestra pagina rapida y agil en el manejod de usuarios gracias a que la información queda almacenada en memoria en lugar del disco, Redis ofrece rápidos accesos en la recuperación de los datos. Redis da la posiblidad de manejar tiempos de expiracion que cierren la cuenta de un usuario en caso de que este se encuentre inactivo por mucho tiempo, esto es util para temas de seguirdad y administracion de recursos dentro de la base de datos.

Ambos son esquemas NoSQL, que no utilizan un modelo relacional, y esto es útil cuando las estructuras de los datos que utilizamos pueden variar. Es posible hacer cambios de los esquemas sin tener que parar la base de datos. Las bases NoSQL pueden adaptarse a proyectos reales más fácilmente que un modelo entidad-relación.


#### 3.1.1 MongoDB

  Se decidió implementar una base de datos en MongoDB debido a la sencillez que tiene a la hora de manejar los datos insertados por los usuarios.
  Esto consiste en las operaciones que están siendo explicadas en la sección *3.4.0.1 MongoDB*.
  
  En pocas palabras, la implementación de MongoDB nos permite tener un modelo accesible desde una computadora que cuente con un sistema operativo Windows 10/Linux/MacOS, en el cual el usuario puede descargar un software proprietario de MongoDB llamado [Compass](https://www.mongodb.com/products/compass), en este software, se pueden ver los valores que insertó en la colección correspondiente.

  Una colección de MongoDB puede ser visto como una tabla en MySQL, aquí se están alojando los valores de cada campo que se insertó y, lo mas importante, el ObjectID (el id que genera MongoDB de manera automática).

![](Arquitectura/pfUML.png)


#### 3.1.2 Redis
Redis: sirve para mantener las sesiones activas y actualizadas.Esto funciona de manera que redis se mantenie revisando si el usuario esta activo y en caso de que no lo este empieza un timer de 5 minutos en los que al expirar cierra la sesion y el usuario tiene que volver a iniciar sesison.

### 3.2 Arquitectura de la solución



### 3.3 Frontend

Para el frontend, se utilizó una librería de Node llamada **express-edge**. Gracias a esta librería, se puede crear una página web como si se estuvieran manejando documentos de HTML. La diferencia que presentan con un documento de HTML es el uso de *layouts*. Gracias a los layouts se puede crear un documento que se encargue de cargar el contenido de una página que se encuentra en otro sitio.
Como ejemplo, ingrese a los siguientes documentos [home.edge](./frontend/home.edge) y [menu.edge](./frontend/layouts/menu.edge).

Para poder desplegar la información solicitada, tal y como los productos en la página principal o las tarjetas en los ajustes de los usuarios, se utilizaron procesos ofrecidos por la librería de MongoDB (esto será explicado mas a fondo en la sección **3.4 Backend**).

#### 3.3.1 Lenguaje de programación

El frontend fue programado usando HTML en documentos con la terminación *.edge*, esto permite mandar a llamar la plantilla solicitada por la página al momento que se requiere cambiar de página. Para ver como está mandando a llamar el contenido de una página para que se despliegue se puede ver a continuación:

```
@!section('homeMenu')
```

Esto significa que la página que contenga la sección *homeMenu* y que se haya mandado a llamar desde el backend, será cargado en el buscador del usuario. El frontend de la aplicación web está siendo dividido en diferentes layouts, así cada uno maneja una carga distinta.
Es decir, para el manejo de usuarios, se utiliza algo como lo que puede ser visto en[userSettings.edge](./frontend/layouts/userSettings.edge). Como se puede notar, allí se encuentra la barra de navegación que permite que el usuario pueda moverse entre páginas.

Dentro de las páginas que realizan operaciones de tipo *RESTful*, se carga la página con los datos deseados usando un formato como el siguiente:

```
{{address.PC}}
```

Esto manda a llamar la variable con el valor manejado en el backend, así puede ser desplegado correctamente.

#### 3.3.2 Framework

Para el frontend no se utilizó ningún framework, todo fue programado desde cero.

#### 3.3.3 Librerías de funciones o dependencias

Para poder añadirle diseño a la página web, se está utilizando **Bootstrap**. 
Bootstrap permitió que le dieramos un diseño *básico* al sitio web, pero es porque no se utilizó ningún framework para poder llevar a cabo la interacción con el usuario.

Es importante recalcar, para poder añadir Bootstrap a nuestro proyecto, se utilizó el link de la siguiente manera:

```
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
```

Se vinculó como si fuera un documento .css (**Cascade Style Sheet**) y así se pudo utilizar de manera apropiada en el sitio web.

La documentación oficial de Bootstrap se puede encontrar [aquí](https://getbootstrap.com/docs/4.3/getting-started/introduction/).

### 3.4 Backend

La solución del backend fue llevada a cabo utilizando JavaScript, esta compuesta por librerías de Node JS utilizando el comando `npm install <nombre de la librería>`. 

Aquí se pueden presenciar las operaciones de tipo _RESTful_, es decir, **POST** y **GET**. 
Para cargar la página web (render) en la que el usuario se encuentra, se esta utilizando **app.get()**, esto manda a llamar la página a la cual el usuario está accediendo.

##### 3.4.0.1 MongoDB

La librería de MongoDB se está encargando de realizar una conexión a la base de datos que se creó para el uso de este proyecto.
Para elló, sea realizó una conexión al principio del documento, esto puede ser visto a continuación:

```
const MongoClient = require("mongodb").MongoClient;

const mongo = require("mongodb");

const url = "mongodb+srv://equipo3:******@cluster-1xa1r.gcp.mongodb.net/test?retryWrites=true&w=majority";
```

- Nota, la cadena de asteriscos que se encuentra después del nombre, representa la contraseña.

En las primeras lineas se está mandando a llamar la librería de *mongodb* para que el **index.js** pueda tener acceso a las funciones que vienen incluidas en esta misma.

Lo importante de la librería, es el acceso que nos da a las operaciones que se encuentran en el aggregation framework ofrecido por MongoDB.

Como ejemplo, se puede ver en la creación de un usuario nuevo, para poder realizar esta operación, se esta realizando una operación que se llama _findOne_. 
Esta operación se esta encargando de buscar el correo que el usuario está intentando registrar, en el caso que el correo ya se encuentre en la base de datos, va a cargar una página en blanco para que el usuario inserte un correo que no se encuentre registrado.
En el caso que el usuario haya insertado un correo que **no** se encuentra registrado, va a redireccionar al usuario a la página de login, para que pueda ingresar su correo y contraseña.

A lo largo del proyecto se están utilizando operaciones como la que se mencionó anteriormente, hay campos en los que si se tuvieron que utilizar mas operaciones del tipo _find_ para que se buscara el valor que haya insertado el usuario.

##### 3.4.0.2 Redis

#### 3.4.1 Lenguaje de programación

El desarrollo fue llevado a cabo utilizando JavaScript, esto nos permite desplegar la aplicación y manejar valores que se tienen que desplegar en el frontend.

Como se mencionó anteriormente, aquí también se encuentran el manejo de las transacciones de tipo _RESTful_, es decir, las operaciones **POST** y **GET**.

Este script se encarga de cargar las páginas usando una operación get y mandando a llamar la el script de express que se encarga de llevar a cabo la operación para desplegarla.

#### 3.4.2 Framework
#### 3.4.3 Librerías de funciones o dependencias

El script esta compuesto por las siguientes librerías de Node JS:

* body-parser
* edge.js
* express
* express-edge
* express-validator
* mongodb
* nodemon
* password-hash
* redis

Las librerías de body-parser, edge.js y express están siendo implementadas para el uso y manejo de los documentos que componen el *frontend* de esta aplicación web, de estas liberías, la que tiene una funcionalidad diferente son body-parser, mongodb, nodemon y redis.
La librería de body-parser nos está permitiendo leer los valores a los cuales se están haciendo solicitudes de *POST*, de tal manera, permitiendo que el backend lo pueda manejar.
Nodemon es una librería que se encarga del reinicio y del manejo de la aplicación web, esto nos permite poder mantener la aplicación web corriendo y, si se hicieron cambios en el index.js, pueda reiniciar la aplicación con los cambios recientes. *Password-hash* se encarga de realizar una operación hash en la contraseña recién creada por un usuario, eso permite que, tanto los administradores como los usuarios, no puedan ver las contraseñas sin el hash.

Por último, las últimas librerías, *mongodb* y *redis*, se encargan de realizar conexiones a las bases de datos que se les espefiquen, a continuación, se puede ver mas información de estas librerías y su implementación correspondiente.

### 3.5 API

*[Incluya aquí una explicación de la solución utilizada para implementar la API del proyecto. No olvide incluir las ligas o referencias donde se puede encontrar información de los lenguajes de programación, frameworks y librerías utilizadas.]*

#### 3.5.1 Lenguaje de programación
#### 3.5.2 Framework
#### 3.5.3 Librerías de funciones o dependencias

*[Incluya aquí una explicación de cada uno de los endpoints que forman parte de la API. Cada endpoint debe estar correctamente documentado.]*

*[Por cada endpoint debe incluir lo siguiente:]*

* **Descripción**:
* **URL**:
* **Verbos HTTP**:
* **Headers**:
* **Formato JSON del cuerpo de la solicitud**: 
* **Formato JSON de la respuesta**:
* **Códigos de error**:

## 3.6 Pasos a seguir para utilizar el proyecto

*[Incluya aquí una guía paso a paso para poder utilizar el proyecto, desde la clonación del repositorio hasta el despliegue de la solución en una plataforma en la nube.]*

- NOTA
  - Es necesario tener instalado Node.js para poder correr esta aplicación, en caso que no cuente con Node JS, lo puede descargar e instalar de [aquí](https://nodejs.org/es/download/).

1. Primero, se necesita clonar el repositorio, con el siguiente comando:

   ```
    git clone https://github.com/tec-csf/tc3041-pf-primavera-2020-equipo3.git
    ```

    Una vez que se haya descargado el repositorio, se tendrán las siguientes carpetas de manera local:

     - Arquitectura	      
     - backend
     - dbs
     - frontend

    También el [README.md](README.md) que se encuentra en la carpeta raíz.


  3. Una vez que tenga el repositorio en su computadora, entre a la carpeta llamada _backend_ con el siguiente comando:

  `
  cd tc3041-pf-primavera-2020-equipo3/backend
  `

 4. Para instalar las librerías necesarias para que el proyecto corra, es necesario correr el siguiente comando.

    `
    npm install
    `

 5. Para poder el correr el proyecto de manera local, es necesario correr el siguiente comando:
    
    `
    npm start
    `

  6. Una vez que este corriendo, se puede conectar mediante su buscador preferido ingresando a la siguiente página <localhost:4000>.

  7. Este último comando lo va a llevar a la pagina de inicio donde puede entrar con un usuario existente o crear uno nuevo.

  8. Una vez que haya ingresado con su cuenta recién hecha, podrá realizar las operaciones que se encuentran disponibles en la página web. 
  Esto incluye:

   - Añadir/borrar una tarjeta de crédito
   - Añadir/borrar una dirección.
   - Añadir/borrar productos del carrito.
   - Añadir productos a un _wishlist_
   - Ver los pedidos anteriores de un usuario.


## 4. Referencias

- https://edge.adonisjs.com/
- https://docs.mongodb.com/
- https://redis.io/documentation
