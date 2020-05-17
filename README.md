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

  * Ejecutar el proyecto con Node JS

```bash
  npm run dev
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

#### Consutar Personas por tipo Student o Monitor

```graphql
{
  getPersons{
    _id
    name
    email
    ... on Student {
      avatar
    }
    ... on Monitor {
      phone
    }
  }
}
```

#### Consultar las Personas con directiva en Student -> Avatar y Email con variables

```graphql
query GetPersonWithAvatar ($avatar: Boolean!, $email: Boolean!) {
  getPersons{
    _id
    name
    email @include(if: $email)
    ... on Student @include(if: $avatar) {
      avatar
    }
  }
}

{
  "avatar": true,
  "email": false
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

#### Agregar un curso con variables

```graphql
mutation CreateNewCourse($createInput: CourseInput!){
  createCourse(input: $createInput) {
    _id
    title
    level
  }
}

{
  "createInput": {
    "title": "Docker Yeha",
    "description": "Full Course Docker Yeha",
    "topic": "Docker",
    "level": "avanzado",
    "teacher": "Jousmo"
  }
}
```

#### Agregar una Persona de tipo Monitor con variables

```graphql
mutation CreateNewMonitor($monitorInput: PersonInput!) {
  createPerson(input: $monitorInput) {
    _id
    name
    email
  }
}

{
  "monitorInput": {
    "name": "Paulo Martinez",
    "email": "pauloner@gmail.com",
    "phone": "1234567890"
  }
}
```

#### Eliminar una Curso

```graphql
mutation {
  deleteCourse(id: "5ec189b904308042617a5bb4")
}
```

#### Eliminar una Persona

```graphql
mutation{
  deletePerson(id: "5ec189fb04308042617a5bb5")
}
```
