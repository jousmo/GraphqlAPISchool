# Graphql Example With Mongo DB

Este es un proyecto paso a paso de como configurar un Server de Graphql con Express, esta API tiene como motor de base de datos Mongo DB

## Requisitos
  * Node JS 12.16 LTS
  * Docker Desktop 2.3

## Como Ejecutarlo

  * Clonar el proyecto
  * Crear dentro del proyecto el archivo **.env** el cual contendra la siguiente información

```bash
  DB_NAME=nombredeladb
  DB_USER=usuariodeladb
  DB_PASSWORD=passworddeladb
  DB_HOST=localhost
  DB_PORT=27017
````

  * Iniciar docker-compose

```bash
  docker-compose up -d
```

  * Ejecutar **GraphiQL** abrir tu navegador y escribir http://localhost:3001/api


### Comentarios

**Revisar schema.graphql** para sus consultas

### Queries

#### Obtener cursos con sus estudiantes

```graphql
{
  getCourses{
    _id
    title
    teacher
    description
    topic
    students{
      _id
      name
      email
    }
  }
}
```

#### Alias y Fragments

```graphql
{
  AllCourses: getCourses{
    ...CourseFields
  }

  Course1: getCourse(id: "5ec04a91881ea63ec6445e8b"){
    ...CourseFields
    teacher
  }

  Course2: getCourse(id: "5ec05d7485b2191a7c0c0f3d"){
    ...CourseFields
    topic
  }
}

fragment CourseFields on Course {
  _id
  title
  description
  students {
    _id
    name
  }
}
```

#### Consultar un curso por ID con variables

```graphql
query GetCourseById($course: ID!) {
  getCourse(id: $course) {
    _id
    title
    description
  }
}


{
  "course": "5ec05d7485b2191a7c0c0f3d"
}
```

### Mutations

#### Craar un curso

```graphql
mutation{
  createCourse(input: {
    title: "Mongo DB Yeha"
    description: "Full Course Mongo DB Yeha"
    topic: "Mongo DB"
    teacher: "Jousmo"
  }){
    _id
    title
  }
}
```

#### Craar un estudiante

```graphql
mutation {
  createStudent(input: {
    name: "Gabriela Cruz Cornelio"
    email: "gab2012corne@gmail.com"
  }){
    _id
    name
    email
  }
}
```

#### Agregar un estudiante a un curso

```graphql
mutation {
  addStudentCourse(
    idCourse: "5ec16e169e18da3608deead2",
    idStudent: "5ec061319583cd1cf5907e24"
  ){
    _id
    title
  }
}
```

#### Agregar un estudiante a un curso con varibles

```graphql
mutation AddStudentCourse($course: ID!, $student: ID!) {
  addStudentCourse(idCourse: $course, idStudent: $student) {
  	title
  }
}

{
  "course": "5ec04a91881ea63ec6445e8c",
  "student": "5ec061319583cd1cf5907e24"
}
```
