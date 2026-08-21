# Configuración manual de seguridad en GitHub

Estas opciones **no** se activan solas con archivos del repositorio. Debes aplicarlas en la cuenta/organización de GitHub. CODEOWNERS y Actions **no** impiden por sí solos borrar `main` ni hacer force push.

## Ruleset para `main`

Ruta:

```text
GitHub → Repository → Settings → Rules → Rulesets
```

1. Crear un **Branch Ruleset** dirigido a la rama predeterminada (`main`).
2. Activar:
   - **Restrict deletions**
   - **Block force pushes**
   - **Require a pull request before merging**
   - **Require status checks to pass** → check obligatorio: `quality-and-security`
   - **Require conversation resolution**
   - **Require linear history**
   - **Require code owner review** (recomendado si hay más de un colaborador)
   - **Dismiss stale pull request approvals when new commits are pushed**
   - Impedir bypass innecesario de administradores cuando el plan lo permita
   - No permitir pushes directos a `main`

### Si eres el único desarrollador

- Mantén obligatorio el **pull request**.
- Puedes configurar **0 aprobaciones** externas.
- El build y las validaciones (`quality-and-security`) deben seguir siendo obligatorios.
- No bloquees por completo la recuperación ante un fallo temporal del CI (ten un camino documentado de hotfix con PR).

También:

- Marca `main` como **Default branch** (Settings → General → Default branch).
- Con **Restrict deletions** del ruleset, la rama no debería poder eliminarse.

## Acceso

- Revisar colaboradores y eliminar quien ya no trabaje en el proyecto.
- Revisar GitHub Apps instaladas (incluido Vercel).
- Dar acceso solo al repositorio necesario.
- Eliminar tokens personales antiguos.
- Revisar sesiones activas.
- Activar **2FA** o passkey.
- Descargar códigos de recuperación.
- No compartir cuentas.

## Actions

Ruta:

```text
Settings → Actions → General
```

- Permisos de workflows en modo **lectura** por defecto.
- Permitir solamente acciones necesarias y confiables (idealmente pin a commit SHA).
- No permitir Actions de fuentes desconocidas.
- No permitir que workflows de forks tengan acceso a secretos.
- Requerir aprobación para workflows de colaboradores externos.

## Code security

Ruta:

```text
Settings → Code security
```

Activar cuando el plan lo permita:

- Dependency graph
- Dependabot alerts
- Dependabot security updates
- Secret scanning
- Push protection
- Code scanning
- Private vulnerability reporting (si aplica)

Algunas opciones dependen del plan (Free/Team/Enterprise) o requieren activación manual en la organización.

## Relación con este repositorio

- `.github/workflows/ci.yml` ejecuta el job `quality-and-security`.
- `.github/CODEOWNERS` solo se aplica de verdad si el ruleset exige revisión de code owners.
- `.github/dependabot.yml` abre PRs; **no** hace merge automático.
