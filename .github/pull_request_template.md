## Checklist de seguridad y calidad

- [ ] `npm run build` funciona en local
- [ ] No se agregaron secretos, tokens ni archivos `.env` reales
- [ ] No se modificaron variables de producción en Vercel desde este PR
- [ ] No se desactivaron headers de seguridad
- [ ] No se amplió la CSP sin justificación documentada
- [ ] No se agregaron scripts externos innecesarios
- [ ] No se añadieron dependencias innecesarias
- [ ] No se eliminaron pruebas ni el check `security:check`
- [ ] El cambio fue revisado visualmente (si aplica a UI)
- [ ] Existe un procedimiento de rollback (revert / deployment anterior en Vercel)
- [ ] No se incluyeron datos personales o médicos de pacientes

## Resumen

<!-- Qué cambia y por qué -->

## Riesgos / notas

<!-- CSP, dependencias, accesos, etc. -->
