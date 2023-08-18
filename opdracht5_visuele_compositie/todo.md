# Visualisatie van noten

basic idee: particle generator. genereert particles of vormpjes vanuit het midden en schiet die naar buiten.
voor elke noot genereert hij een willekeurige vorm vanuit een voorgedefinieerde lijst.

wat kunnen we allemaal visualiseren?
- color
  - hue
  - saturation
  - lightness
  - opacity
- motion
  - acceleration
  - speed
  - direction
- shape
  - circle
  - square
  - lines
  - triangle
  - rectangle
  - etc.
- size
- collision physics (met de wand)
  - restitutioncoefficient
  - mass



bij toonhoogte:
- launch angle: to the sides low notes, straight up for high notes
- color (hue): low - high notes go from 0 - 360 degrees

bij duratie:
- hoe snel de vorm krimpt en verdwijnt?
- snelheid, lang sloom en kort snel

bij amplitudes:
- initial size
- kleur van donker(zachter) naar lichter(harder) | Lightness van HSL (Hue, Saturation, Lightness)

## noot generatie algoritme

pitch binnen een toonsoort
toonsoort filter
