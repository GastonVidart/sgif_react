# Entrega 4 SI WEB

El siguiente trabajo es la última entrega para la materia Sistemas de Información para la Web, cursado durante el segúndo cuatrimestre del 2020 en la Facultad de Informática de la Universidad Nacional del Comahue, en la carrera Lic. en Sistemas de Información. Los alumnos que la desarrollaron son Maximiliano Ceballos y Gastón Vidart.

## Introducción

El trabajo consiste en la implementación del frontend de la aplicación diseñada en Especificación de Diseño de Software (EDS), cursada en 2019. La implementación se realizará utilizando la Biblioteca de fronted React y con el sistema de diseño Bootstrap v4.5. Lo que se busca es seguir el diseño desarrollado en EDS, donde no se implementarán todas las transacciones, sino 4 de las mismas. Las transacciones fueron divididas con otro grupo que también cursó la materia.

### Transacciones Desarrolladas completas según el diseño de EDS
*  Inscribir Alumno
*  Completar Familia Alumno

### Transacciones Desarrolladas parcialmente
*  Alta Curso
*  Registrar Notas Trimestrales

## Instrucciones

En este repositorio solo se encuentra el frontend de la aplicación, por lo tanto, para poder hacer uso de sus funciones se tiene que acceder al repositorio del backend.
La release del backend se encuentra en: https://github.com/maxxCeballos/sgif/releases/tag/v1.1.0 y acontinuación se describe como iniciar el backend y frontend, para hacer uso de ellos.

### Inciando el Backend
  1. Descargar Release v1.1.0
  2. Ejecutar `$ cd carpeta_descargada/backend/`
  3. Ejecutar `$ npm init`
  4. Ejecutar `$ npm i`
  5. Actualizar ATLAS_URI en /backend/.env
  6. Ejecutar `$ npm start`

    Aclaración paso 5: Comunicarse con los desarrolladores, para que se le envíen los datos de acceso a MongoAtlas.    
    O conectar a una base Mongo, considerar los datos de prueba, que no se van a poseer.

### Iniciando el Frontend
  1. Descargar Release v1.1.0
  2. Ejecutar `$ cd carpeta_descargada/frontend/`
  3. Ejecutar `$ npm init`
  4. Ejecutar `$ npm i'
  5. Ejecutar `$ npm start`
  6. Si no se abre automaticamente, en el buscador ingresar: http://localhost:3000
