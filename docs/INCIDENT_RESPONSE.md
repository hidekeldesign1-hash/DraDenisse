# Respuesta a incidentes y recuperación

Ningún procedimiento garantiza recuperación perfecta. Actúa con calma y documenta cada paso.

## Se filtra un secreto

1. **Revocar** la credencial en el proveedor (GitHub, Vercel, etc.).
2. Crear una **nueva**.
3. Actualizarla en Vercel (y donde más se use).
4. Revisar logs y accesos.
5. Eliminarla del código en un commit nuevo.
6. Determinar si está en el historial de Git (si está, asume compromiso; no basta con borrarla del tip).
7. **No** reutilizarla.
8. Invalidar sesiones relacionadas.

Eliminar un secreto del código **no** invalida el secreto filtrado.

## Alguien modifica la página

1. No uses `git reset --hard` sobre trabajo no respaldado.
2. Identifica el último deployment correcto en Vercel.
3. Haz **rollback temporal** en Vercel.
4. En Git, preferir `git revert` del commit malicioso (historial lineal).
5. Revisar quién hizo el cambio (audit log / commits).
6. Revocar accesos sospechosos.
7. Rotar tokens y deploy hooks.
8. Revisar workflows y la GitHub App de Vercel.

## Se elimina o daña `main`

1. No crear una rama vacía como “nueva main”.
2. Identificar el último commit correcto (local, remoto, tag o deployment).
3. Restaurar desde esa referencia conocida mediante PR o recuperación documentada.
4. Revisar audit logs de GitHub.
5. Activar o corregir el **ruleset** (ver `docs/GITHUB_SECURITY_SETUP.md`).
6. Evitar reescribir el historial salvo autorización expresa y backup previo.

## El dominio apunta a otro sitio

1. Entrar al **registrador** del dominio (no solo a Vercel).
2. Revisar DNS (A/AAAA/CNAME/nameservers).
3. Revocar sesiones del registrador.
4. Cambiar contraseña.
5. Activar 2FA.
6. Restaurar registros DNS correctos hacia Vercel.
7. Revisar cambios de nameservers o transferencia.
8. Contactar al registrador si hubo transferencia no autorizada.

## Ataque de tráfico

1. Revisar Vercel Firewall / métricas.
2. Activar temporalmente **Attack Challenge Mode**.
3. Revisar patrones (IP, paths, user-agents).
4. Bloquear solo fuentes verificadas como maliciosas.
5. No bloquear buscadores (`Googlebot`, `OAI-SearchBot`) de forma permanente.
6. Desactivar Challenge Mode cuando el tráfico se normalice.
