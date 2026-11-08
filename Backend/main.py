from fastapi import FastAPI
import mysql.connector
from pydantic import BaseModel
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500", "http://localhost:5500"],
    allow_methods=["*"],
    allow_headers=["*"],
)

#esto lo pondre mas adelante en un archivo ya sea .env u otro privado
conexion = mysql.connector.connect(
    host=os.getenv("DB_HOST"),
    port=int(os.getenv("DB_PORT")),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME"),
)


#Modelos

class RegistroIn(BaseModel):
    usuario: str
    email: str
    password: str



@app.get("/")
def inicio():
    return {"message": "Bienvenido a mi pagina"}

@app.get("/usuarios")
def usuarios():
    return {"message": "Bienvenido usuario"}


@app.post("/registro", status_code=201)#el codigo 201 significa "creado exitosamente"
def registro(datos: RegistroIn):
    try:
        cursor = conexion.cursor() #el cursos sirve para ejecutar sql y recorrer resultados
        cursor.execute(
            "INSERT INTO usuarios (NombreUsuario, CorreoElectronicoUsuario, ContraseñaUsuario) VALUES (%s, %s, %s)",
            (datos.usuario, datos.email, datos.password),
        )
        conexion.commit()

    except mysql.connector.IntegrityError:
        conexion.rollback()
        raise HTTPException(status_code=409, detail="El usuario o el correo ya existe")
    finally:
        cursor.close()
    return {"mensaje": "Usuario creado"}


