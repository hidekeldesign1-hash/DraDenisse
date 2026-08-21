# Configuración manual de seguridad en Vercel

Cursor **no** puede activar estas opciones por ti. Revísalas en el dashboard de Vercel.

## Accesos

- Confirmar que el propietario correcto controle el proyecto.
- Eliminar exsocios o colaboradores antiguos.
- Revisar miembros del equipo e integraciones.
- Activar **2FA** o passkey.
- No compartir cuentas.

## Git

- **Production Branch** = `main`.
- No permitir deploys desde repositorios desconocidos.
- Revisar la instalación de la GitHub App de Vercel.
- Dar acceso solamente al repositorio necesario.
- Activar **Git Fork Protection**.

## Variables

- Separar **Production**, **Preview** y **Development**.
- No usar variables de producción en previews sin necesidad.
- Nunca usar `NEXT_PUBLIC_` para secretos (todo lo `NEXT_PUBLIC_*` es visible en el cliente).
- Rotar variables si alguna se expuso.
- No imprimirlas durante el build.
- No guardar secretos en `vercel.json` ni en el repositorio.

Variables públicas esperadas (no secretas):

```text
NEXT_PUBLIC_SITE_URL=https://www.dradenisse.com
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=   # opcional
```

## Deployments

- Activar **Deployment Protection** para previews.
- Mantener público únicamente el dominio de producción.
- Mantener **Build Logs and Source Protection** activado.
- Revisar deployments desconocidos.
- Conocer el procedimiento de **rollback**.
- No eliminar inmediatamente versiones estables anteriores.

## Firewall

- Revisar Vercel Firewall.
- Conservar protección DDoS.
- Usar **Attack Challenge Mode** solo durante ataques o tráfico anormal.
- **No** bloquear permanentemente Googlebot ni `OAI-SearchBot`.
- Preferir reglas específicas frente a bloqueos amplios de países/rangos sin evidencia.

## Dominios

- Confirmar dominio principal (`www.dradenisse.com` / apex según DNS).
- Revisar y eliminar dominios desconocidos.
- Mantener HTTPS y certificados automáticos activos.
