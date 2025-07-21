# Carrion-Web

Carrion-Web es una aplicación web desarrollada con Vite y JavaScript que permite la gestión de notas y usuarios, separando funcionalidades para estudiantes, profesores y administradores. El sistema está diseñado para facilitar el manejo académico, permitiendo la generación de reportes en PDF, así como la administración eficiente de la información.

## Características principales

- Separación de roles: funcionalidades diferenciadas para estudiantes, profesores y administradores.
- Generación de reportes de notas en formato PDF.
- Interfaz moderna y rápida gracias a Vite.
- Arquitectura basada en componentes.
- Administración de usuarios y gestión académica eficiente.

## Tecnologías utilizadas

- **Vite** para el desarrollo y bundling rápido de la aplicación.
- **JavaScript** como lenguaje principal.
- **Componentes** reutilizables para la interfaz.
- Dependencias adicionales para generación de PDF y administración de estados (detalladas en `package.json`).

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/JFVela/Carrion-Web.git
   cd Carrion-Web
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia la aplicación en modo desarrollo:
   ```bash
   npm run dev
   ```

## Uso

- Accede a la interfaz según tu rol (estudiante, profesor o administrador).
- Realiza la gestión de notas, usuarios y generación de reportes según permisos.
- Los profesores pueden generar y descargar reportes en PDF.
- Los administradores gestionan usuarios y configuraciones del sistema.

## Estructura general del proyecto

- Código fuente organizado por componentes y roles.
- Configuración centralizada con Vite.
- Uso de librerías para la generación de PDF.

## Despliegue

La aplicación está desplegada en [Vercel](https://carrion-web.vercel.app), donde se puede acceder a la versión en línea.

## Contribución

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad o corrección (`git checkout -b feature/nueva-funcionalidad`).
3. Sube tus cambios (`git commit -am 'Agrega nueva funcionalidad'`).
4. Haz push a tu rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Autor

- [JFVela](https://github.com/JFVela)

## Licencia

Este proyecto actualmente no especifica licencia. Si deseas contribuir o reutilizar el código, contacta al autor.

---

Visita el proyecto en [GitHub](https://github.com/JFVela/Carrion-Web) o prueba la aplicación en [Vercel](https://carrion-web.vercel.app).
