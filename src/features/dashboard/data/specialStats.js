import { resolveAssetPath } from '../../../utils/basePath'

export const specialStats = [
  {
    id: 'strength',
    titulo: 'Fuerza',
    descripcion:
      'Define tu potencia fisica: dano cuerpo a cuerpo, capacidad de carga y manejo de armas pesadas.',
    imagen: resolveAssetPath('images/attributes/strength.svg'),
  },
  {
    id: 'perception',
    titulo: 'Percepcion',
    descripcion:
      'Mejora la deteccion de amenazas, la precision a distancia y la lectura del entorno en combate.',
    imagen: resolveAssetPath('images/attributes/perception.svg'),
  },
  {
    id: 'endurance',
    titulo: 'Resistencia',
    descripcion:
      'Aumenta la vida maxima, la tolerancia al dano y la capacidad para sobrevivir en zonas hostiles.',
    imagen: resolveAssetPath('images/attributes/endurance.svg'),
  },
  {
    id: 'charisma',
    titulo: 'Carisma',
    descripcion:
      'Potencia tu influencia social, opciones de dialogo y precios favorables al comerciar.',
    imagen: resolveAssetPath('images/attributes/charisma.svg'),
  },
  {
    id: 'intelligence',
    titulo: 'Inteligencia',
    descripcion:
      'Mejora el aprendizaje, la eficiencia tecnica y el acceso a soluciones avanzadas en el yermo.',
    imagen: resolveAssetPath('images/attributes/intelligence.svg'),
  },
  {
    id: 'agility',
    titulo: 'Agilidad',
    descripcion:
      'Aumenta la velocidad de reaccion, el sigilo y la precision al moverte o disparar bajo presion.',
    imagen: resolveAssetPath('images/attributes/agility.svg'),
  },
  {
    id: 'luck',
    titulo: 'Suerte',
    descripcion:
      'Influye en eventos aleatorios, golpes criticos y resultados favorables en combate y exploracion.',
    imagen: resolveAssetPath('images/attributes/luck.svg'),
  },
]
