# TC3041 Proyecto Final Primavera 2020

# *Tienda virtual*
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

*[Falta explicar mas a fondo]*

Como proyecto final, decidimos hacer una tienda en línea donde un usuario pueda realizar compras con los productos disponibles. Dentro de la aplicación web, contamos con las siguientes características:

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

### 3.1 Modelos de *bases de datos* utilizados

*[Incluya aquí una explicación del análisis realizado y la justificación de los modelos de *bases de datos* seleccionados. Incluya todo lo que considere necesario para que una persona sin conocimientos técnicos pueda entender de que trata su solución.]*

### 3.2 Arquitectura de la solución

*[Incluya aquí un diagrama donde se aprecie la arquitectura de la solución propuesta, así como la interacción entre los diferentes componentes de la misma.]*

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

*[Incluya aquí una explicación de la solución utilizada para el backend del proyecto. No olvide incluir las ligas o referencias donde se puede encontrar información de los lenguajes de programación, frameworks y librerías utilizadas.]*

#### 3.4.1 Lenguaje de programación
#### 3.4.2 Framework
#### 3.4.3 Librerías de funciones o dependencias

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

## 4. Referencias

*[Incluya aquí las referencias a sitios de interés, datasets y cualquier otra información que haya utilizado para realizar el proyecto y que le puedan ser de utilidad a otras personas que quieran usarlo como referencia]*
