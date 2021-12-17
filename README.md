# Practical test

**Proyecto creado por Judith Mula Molina (judith.mm1803@gmail.com)**

<small>No se han puesto las tíldes a los títulos para que funcionase el enlace del índice. Soy consciente de que de haberlo hecho en inglés no existiría este problema pero debido a mi tiempo y dificultad con el idioma he preferido hacer este documento en español.</small>

**Índice**
- [Dependencias](#dependencias)
- [Instrucciones de inicio](#instrucciones-de-inicio)
- [Aclaracion](#aclaracion)
- [Flujo inicial](#flujo-inicial)
- [Descripcion de la web. Decisiones tomadas](#descripcion-de-la-web-decisiones-tomadas)
  * [Currencies o monedas](#currencies-o-monedas)
  * [Portfolios o carteras](#portfolios-o-carteras)
  * [Lineas](#lineas)
- [Caracteristicas no realizadas](#caracteristicas-no-realizadas)
- [Caracteristicas que incluiria para mejorar](#caracteristicas-que-incluiria-para-mejorar)
  * [Dockerizar](#dockerizar)
  * [Error de json-server sin solucionar](#error-de-json-server-sin-solucionar)
  * [Catch errors](#catch-errors)
  * [Otras mejoras para la UX del usuario](#otras-mejoras-para-la-ux-del-usuario)
- [Notas extra](#notas-extra)
  * [El endpoint para PUT y DELETE de las lineas de portfolio no es correcto](#el-endpoint-para-put-y-delete-de-las-lineas-de-portfolio-no-es-correcto)
  * [Las BBDD de las APIs externas no son iguales](#las-bbdd-de-las-apis-externas-no-son-iguales)


## Dependencias
---

Este proyecto ha sido generado con:
* [Node.js](https://nodejs.org/es/) v14.17.5
* [npm](https://www.npmjs.com) v6.14.15
* [Angular CLI](https://github.com/angular/angular-cli) v12.2.3

## Instrucciones de inicio
---

Si es la primera vez que desea iniciar el proyecto, deberá generar la carpeta `node_modules` para instalar los paquetes y dependencias de nuestro proyecto listados en `package.json`. Para ello, debe ejecutar en la terminal el comando `npm ci`.

Si se instala una nueva dependencia debe de volverse a ejecutar el anterior comando.

Antes de iniciar el proyecto, hay que levantar la API que crea `json-server` usando el archivo `db.json` o no tendremos disponibles los datos. Para ello, ejecute `json-server --watch db.json` desde la raíz del proyecto.
Para comprobar que el servidor está disponible puede navegar a `http://localhost:3000`.

Por último, ejecute `ng serve` para iniciar el proyecto y navega hasta `http://localhost:4200/`.

## Aclaracion
---

Debido a que debía compaginar mi trabajo con la realización de esta prueba prácticas, hay ciertas características de la prueba que no he podido implementar. No lo dejé para fin de semana debido a que tenía otros compromisos y no era adecuado pedir hacerla dentro de demasiado tiempo.

...
## Flujo inicial

Antes de iniciar la programación, leí bien la prueba práctica y me hice un *TO-DO list* con las tareas que debía de realizar. Ejemplos: Listar monedas, crear una moneda, editar una moneda...

Después, las ordené por prioridad: 
* Primero debía realizar la parte obligatoria y más tarde si podría, la opcional.
* Dentro de cada bloque también las ordené. En el caso de las opcionales dejé para el final aquello que veía más complejo.

Una vez organizadas las tareas, estudié el archivo `db.json` y decidí la manera en la que quería mostrar la información. Seguidamente, creé el proyecto y empecé.

...
## Descripcion de la web. Decisiones tomadas

Al navegar a la ruta `http://localhost:4200` redirige a `http://localhost:4200/portfolios`, la vista principal.

En todo momento, a través de la barra de navegación podemos acceder a las carteras o *portfolios*, o a las monedas o *currencies*.

En cada una de ellas se listará la información correspondiente.

Decidí utilizar distintos modos de presentación para cada una para demostrar que se puede representar la información de maneras muy diferentes. De hecho, según la información a mostrar, a veces una tabla no es la mejor opción, sobre todo cuando hay muchos datos que mostrar (complica el responsive).

En ambas páginas tenemos arriba a la derecha un botón para añadir una nueva entidad y cada fila de moneda o tarjeta de cartera tiene sus correspondientes botones de editar y borrar.

Las creaciones/ediciones se realizan a través de un *dialog*, pues apenas hay que escribir datos. Los formularios son muy pequeños como para redirigir a otra página y considero que crea mejor impresión al usuario.

El borrado también tiene un *dialog* de confirmación.

Para el listado de estos y los siguientes, al usar un *dialog* que realiza las acciones de crear/editar/borrar, se actualiza cuando uno de estos se hace de manera exitosa.

### Currencies o monedas

El listado de las monedas muestra toda la información de estas y tan solo es el identificador, el acrónimo y el nombre, por lo que no vi adecuado hacer una vista de detalles.

Como se indica en el primer opcional, a la hora de crear/editar una moneda, se valida la existencia de esta. Primero se obtiene la lista a través de una petición Http y entonces se inicializa el formulario validando el acrónimo mediante una `ValidatorFn`.
Decidí que ambos campos eran obligatorios, por lo que también incluí validación de estos. No deja crear ni editar si el formulario no es válido.

Decidí utilizar esa aproximación para validar la existencia del acrónimo debido a que la cantidad de monedas posibles es altísima y aunque para una mejor experiencia de usuario, quizás lo adecuado sería utilizar **un select con buscador** (eran +7000 monedas posibles), no disponía de este componente en `ng-bootstrap` para hacerlo rápidamente. Lo que había que hacer era validar la existencia del acrónimo, con un *select*, te aseguras de que elija lo que elija, existe.

### Portfolios o carteras

Al igual que con las monedas, el listado muestra la información de cada *portfolio* pero en este caso, debido a querer listar las líneas, si cree una vista de detalles.

Las creaciones/ediciones de estos *portfolios* también tienen los datos son requeridos.

### Lineas

Si haces click encima de una tarjeta de un *portfolio* accedes a sus detalles, donde podrás ver listadas las líneas que tiene, donde se pueden crear/editar/borrar. En esta vista también he decidido utilizar las tarjetas.  Debido a que estas son hijas de los *portfolios* y que no tienen un identificativo más allá de si #ID, decidí no crear una vista solo para mostrar y gestionar las líneas, de esta manera, están mejor organizadas.

> Es cierto que haber tomado esta aproximación obliga a que la creación de una línea sea sobre el tablero actual, al igual que en la edición, por lo que no se puede cambiar una línea de un *portfolio* a otro. Sin embargo, lo ví más organizado.
>
> Si se hubiese decidido listar las líneas y gestionarlas por separado, además de en los detalles del *portfolio*, solo habría que añadir una página más con su correspondiente routing y el formulario de edición y creación en está página, incluiría el seleccionar uno de los *portfolios* existentes.

Para cada línea, se muestra la información relativa a cada una. No se muestra nada sobre el *portfolio* ya que ya estás en la vista de detalles al que pertenece. En sus tarjetas de información se muestra la moneda y **como indicaba en otro opcional** el valor total en EUR (valor de la moneda * cantidad).


## Caracteristicas no realizadas

Hay dos tareas principales (las dos opcionales) que no he podido realizar por falta de tiempo.

* Almacenar la información de pedir el valor de las monedas en caché
  * Esta tarea además no sabía muy bien como realizarla. Busqué información y vi que se podría utilizar un HttpInterceptor para comprobar la *request* y si ya teníamos datos almacenados en un mapa (variable de clase de este interceptor) sobre lo que pedíamos, devolvíamos esos datos y no hacíamos la petición. Sin embargo, no se si esto es lo correcto.

* Último opcional relativo a obtener el valor total de un *portfolio* en EUR en la vista de listado.
  * Debido a que en los detalles ya tenía la información del valor de cada línea, calculé fácilmente el total y lo indiqué. Pero para acceder a esta información hay que acceder al *portfolio*, no es lo que se pedía.
  * Tenía un par de ideas sobre como obtener esta información, aunque era complejo y no pude comprobarlo por falta de tiempo.
    * No se puede pedir la información de todos los portfolios y sus líneas y además la moneda correspondiente a cada línea (al menos que haya visto en la documentación de *json-server*, esto hubiese sido lo ideal), por lo que quizás se debía obtener las líneas y la información de la moneda para cada *portfolio*
    * Al tener ya todas las monedas, podría obtener sus valores usando la API externa, se multiplica el valor correspondiente con la cantidad de monedas de la línea y el resultado (para cada *portfolio*) se sumaría para obtener el total del *portfolio* para mostrarlo.
  
...
## Caracteristicas que incluiria para mejorar

### Dockerizar

* Dockerizar el proyecto hubiese estado muy bien para que nadie tuviera que instalarse dependencias; sin embargo, no tengo estos conocimientos. Justo iba a aprender en mi empresa a hacerlo a través de un seminario interno (usamos docker para el *build* de cada desarrollo y además también otra imagen para producción), pero no ha podido ser.

### Error de json-server sin solucionar

* Quise añadir la cantidad de líneas que había en cada *portfolio* en el listado de estos. Obtenía la información de esa vista usando el *endpoint*: http://localhost:3000/portfolios?_embed=lines. Sin embargo había un problema con esto.
  * Los POST de creación de una entidad con claves ajenas (líneas) almacenan estas claves como *string* en vez de *number*. Al no ser *number* el *endpoint* anterior no reconocía estas entidades como hijos y por tanto no las devolvía.
  * Debido a que el dato mostrado podía ser erróneo, decidí no mostrarla.
  * Este problema está reportado en la siguiente [issue de github](https://github.com/typicode/json-server/issues/925), la cual se abrió en 2019 y que hasta ahora, todavía no se ha solucionado.

### Catch errors 
Es algo que considero muy importante cuando la web usa llamadas Http, pero para seguir el desarrollo de lo demás también lo dejé con menos prioridad.
* Toast de error cuando no se puede realizar una petición POST/PUT/DELETE. En el caso de los POST/PUT no se cerraría el *dialog*.
* Vista de no conexión con el servidor.
* No permitir crear una moneda si falla la obtención de las existentes.

### Otras mejoras para la UX del usuario
A continuación, listo una serie de características que ayudarían a mejorar la UX del usuario, pero por orden de prioridad y debido a que esto son extras que he listado yo por mi cuenta no se han incluido por el tiempo disponible:

* Alert/Toast de éxito a la hora de crear/editar/borrar entidades.
* Paginar los listados.
* Incluir filtros en los listados.
* Refactorización en más componentes.
* Poner una imagen para cuando un *portfolio* no tiene líneas.
* El *select* con buscador para el acrónimo de la moneda.
* Spinners de carga en los listados.
* Multi idioma.

...
## Notas extra
---
### El endpoint para PUT y DELETE de las lineas de portfolio no es correcto

Pese a que en la documentación del test práctico indica que el *endpoint* para hacer PU o DELETE de una línea es: 'http://localhost:3000/portfolios/1/lines/1'. Sin embargo, no es cierto, ya que esa URL no devuelve la línea (devuelve {}) y por lo tanto daba error 404. Para editar y eliminar, hay que trabajar con la entidad base y por tanto el *endpoint* correcto era: 'http://localhost:3000/lines/1'

...
### Las BBDD de las APIs externas no son iguales

Podías crear una moneda que en la base de datos de las monedas existentes esté, pero no existe en la de obtención del valor. Esto había que tenerlo muy en cuenta y se muestra para esas monedas 'Currently has no value'. En la suma del total del valor del *portfolio* no se tiene en cuenta estas líneas.

En caso de haber podido realizar el último opcional, mostraría en un mensaje de warning aquellas monedas que en ese momento no tenían valor y que no se han tenido en cuenta para la cantidad total en Euros de cada *portfolio*.