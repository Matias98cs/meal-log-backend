<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>


# NestJS Startup Boilerplate

Este es un proyecto base (boilerplate) construido con **NestJS**, diseñado para trabajar en un entorno contenedorizado con **Docker** y **PostgreSQL**.

## 🚀 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:
* [Docker Desktop](https://www.docker.com/products/docker-desktop/)
* [Node.js](https://nodejs.org/) (v20 recomendado)
* [Yarn](https://yarnpkg.com/)

---

## 🛠️ Configuración Inicial

### 1. Clonar el repositorio e instalar dependencias
```bash
yarn install
```

### 2. Configurar variables de entorno

El proyecto requiere un archivo `.env` para funcionar correctamente. **Debes crear este archivo manualmente** copiando el contenido de ejemplo y ajustando los valores a tu preferencia.

1. Crea un archivo llamado **`.env`** en la raíz del proyecto.
2. Copia y pega el siguiente bloque, modificando los valores según necesites:

```env
# Entorno
STAGE=dev
PORT=3000
HOST_API=http://localhost:3000/api
JWT_SECRET=secret_password_123

# Base de Datos (PostgreSQL)
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nest-db
DB_USER=postgres


# Configuración General
DEFAULT_LIMIT=10

```

> **Nota Importante:** Para que el backend se conecte correctamente a la base de datos dentro de Docker, el `DB_HOST` debe ser **`db`** (el nombre del servicio definido en el `docker-compose.yaml`).

---

## 🐳 Despliegue con Docker

Para levantar todo el entorno de desarrollo (Base de datos + Aplicación):

```bash
docker-compose -f docker-compose.dev.yaml build
docker-compose -f docker-compose.dev.yaml up -d
```

Si se quiere borrar todo el entorno
```bash
docker-compose -f docker-compose.dev.yaml down -v
```

Esto ejecutará la aplicación en modo "watch" (`yarn start:dev`), lo que permite que cualquier cambio en el código se refleje automáticamente sin reiniciar los contenedores.

**Para detener los servicios:**

```bash
docker-compose down
```

---

## 📜 Scripts Útiles

* `yarn start:dev`: Inicia la aplicación localmente fuera de Docker.
* `yarn build`: Compila el proyecto para producción.
* `yarn lint`: Ejecuta el linter para verificar la calidad del código.