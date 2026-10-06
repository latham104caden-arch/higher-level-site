'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

/* ------------------------------------------------------------------ */
/* Procedural textures (canvas), so the house needs no image downloads */
/* ------------------------------------------------------------------ */

type Painter = (g: CanvasRenderingContext2D, s: number, rnd: () => number) => void

function seeded(seed: number) {
  let t = seed
  return () => {
    t = (t + 0x6d2b79f5) | 0
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

function canvasTex(size: number, paint: Painter, seed = 1, color = true) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const g = c.getContext('2d')!
  paint(g, size, seeded(seed))
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.anisotropy = 8
  if (color) t.colorSpace = THREE.SRGBColorSpace
  return t
}

function noise(g: CanvasRenderingContext2D, s: number, rnd: () => number, n: number, alpha: number, light = true) {
  for (let i = 0; i < n; i++) {
    const v = light ? 255 : 0
    g.fillStyle = `rgba(${v},${v},${v},${rnd() * alpha})`
    g.fillRect(rnd() * s, rnd() * s, 1 + rnd() * 2, 1 + rnd() * 2)
  }
}

// White board-and-batten siding.
const paintSiding: Painter = (g, s, rnd) => {
  g.fillStyle = '#eeebe5'
  g.fillRect(0, 0, s, s)
  noise(g, s, rnd, 9000, 0.05, false)
  noise(g, s, rnd, 6000, 0.08, true)
  const step = s / 8
  for (let x = 0; x < s; x += step) {
    g.fillStyle = 'rgba(0,0,0,0.16)'
    g.fillRect(x + step * 0.16, 0, 3, s)
    g.fillStyle = '#f6f4f0'
    g.fillRect(x, 0, step * 0.16, s)
    g.fillStyle = 'rgba(255,255,255,0.6)'
    g.fillRect(x, 0, 2, s)
  }
}

// Cedar planks (porch posts, garage door).
const paintCedar: Painter = (g, s, rnd) => {
  g.fillStyle = '#9a6a43'
  g.fillRect(0, 0, s, s)
  const rows = 8
  for (let r = 0; r < rows; r++) {
    const y = (r * s) / rows
    const h = s / rows
    const base = 140 + rnd() * 35
    g.fillStyle = `rgb(${base},${base * 0.68},${base * 0.43})`
    g.fillRect(0, y, s, h)
    for (let i = 0; i < 40; i++) {
      g.strokeStyle = `rgba(60,30,10,${0.08 + rnd() * 0.12})`
      g.lineWidth = 1
      g.beginPath()
      const yy = y + rnd() * h
      g.moveTo(0, yy)
      g.bezierCurveTo(s * 0.3, yy + (rnd() - 0.5) * 6, s * 0.7, yy + (rnd() - 0.5) * 6, s, yy)
      g.stroke()
    }
    g.fillStyle = 'rgba(30,15,5,0.45)'
    g.fillRect(0, y, s, 2)
  }
}

const paintGrass: Painter = (g, s, rnd) => {
  g.fillStyle = '#6f8a4c'
  g.fillRect(0, 0, s, s)
  for (let i = 0; i < 26000; i++) {
    const h = 72 + rnd() * 26
    const l = 30 + rnd() * 20
    g.strokeStyle = `hsla(${h},${26 + rnd() * 16}%,${l}%,0.5)`
    g.lineWidth = 1
    const x = rnd() * s
    const y = rnd() * s
    g.beginPath()
    g.moveTo(x, y)
    g.lineTo(x + (rnd() - 0.5) * 3, y - 2 - rnd() * 4)
    g.stroke()
  }
}

const paintSoil: Painter = (g, s, rnd) => {
  const grd = g.createLinearGradient(0, 0, 0, s)
  grd.addColorStop(0, '#7a5638')
  grd.addColorStop(1, '#4e3522')
  g.fillStyle = grd
  g.fillRect(0, 0, s, s)
  noise(g, s, rnd, 14000, 0.12, false)
  for (let i = 0; i < 90; i++) {
    const r = 1 + rnd() * 3
    const v = 110 + rnd() * 70
    g.fillStyle = `rgb(${v},${v * 0.92},${v * 0.82})`
    g.beginPath()
    g.ellipse(rnd() * s, rnd() * s, r, r * 0.7, rnd() * 3, 0, Math.PI * 2)
    g.fill()
  }
}

const paintConcrete: Painter = (g, s, rnd) => {
  g.fillStyle = '#cfcac2'
  g.fillRect(0, 0, s, s)
  noise(g, s, rnd, 16000, 0.07, false)
  noise(g, s, rnd, 9000, 0.1, true)
  g.fillStyle = 'rgba(0,0,0,0.22)'
  g.fillRect(0, 0, s, 2)
  g.fillRect(0, 0, 2, s)
}

const paintMulch: Painter = (g, s, rnd) => {
  g.fillStyle = '#3a2618'
  g.fillRect(0, 0, s, s)
  for (let i = 0; i < 3500; i++) {
    const v = 50 + rnd() * 60
    g.fillStyle = `rgb(${v},${v * 0.62},${v * 0.4})`
    g.save()
    g.translate(rnd() * s, rnd() * s)
    g.rotate(rnd() * Math.PI)
    g.fillRect(0, 0, 3 + rnd() * 6, 1 + rnd() * 2)
    g.restore()
  }
}

const paintLeaves: Painter = (g, s, rnd) => {
  g.fillStyle = '#4a6a34'
  g.fillRect(0, 0, s, s)
  for (let i = 0; i < 5000; i++) {
    const l = 18 + rnd() * 26
    g.fillStyle = `hsla(${85 + rnd() * 30},${35 + rnd() * 25}%,${l}%,0.8)`
    g.beginPath()
    g.ellipse(rnd() * s, rnd() * s, 2 + rnd() * 3, 1 + rnd() * 2, rnd() * 3, 0, Math.PI * 2)
    g.fill()
  }
}

/** Box-projected UVs so textures keep real-world scale on any mesh. */
function projectUV(geo: THREE.BufferGeometry, scale: number) {
  geo.computeVertexNormals()
  const p = geo.attributes.position
  const n = geo.attributes.normal
  const uv = new Float32Array(p.count * 2)
  for (let i = 0; i < p.count; i++) {
    const ax = Math.abs(n.getX(i))
    const ay = Math.abs(n.getY(i))
    const az = Math.abs(n.getZ(i))
    let u: number
    let v: number
    if (ax >= ay && ax >= az) {
      u = p.getZ(i)
      v = p.getY(i)
    } else if (ay >= az) {
      u = p.getX(i)
      v = p.getZ(i)
    } else {
      u = p.getX(i)
      v = p.getY(i)
    }
    uv[i * 2] = u / scale
    uv[i * 2 + 1] = v / scale
  }
  geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2))
  return geo
}

/* ------------------------------------------------------------------ */
/* The house: modern farmhouse on a floating cut-away lawn             */
/* ------------------------------------------------------------------ */

function buildScene() {
  const T = {
    siding: canvasTex(512, paintSiding, 3),
    cedar: canvasTex(512, paintCedar, 5),
    grass: canvasTex(512, paintGrass, 7),
    soil: canvasTex(512, paintSoil, 11),
    concrete: canvasTex(512, paintConcrete, 13),
    mulch: canvasTex(256, paintMulch, 17),
    leaves: canvasTex(256, paintLeaves, 19),
  }

  const M = {
    siding: new THREE.MeshStandardMaterial({ map: T.siding, bumpMap: T.siding, bumpScale: 1.2, roughness: 0.85, color: '#fffaf2' }),
    trim: new THREE.MeshStandardMaterial({ color: '#f7f5f1', roughness: 0.6 }),
    metal: new THREE.MeshStandardMaterial({ color: '#262626', metalness: 0.55, roughness: 0.42 }),
    black: new THREE.MeshStandardMaterial({ color: '#17181a', metalness: 0.4, roughness: 0.4 }),
    glass: new THREE.MeshPhysicalMaterial({
      color: '#1e252c',
      metalness: 0.1,
      roughness: 0.04,
      clearcoat: 1,
      emissive: '#ffb066',
      emissiveIntensity: 0.12,
    }),
    cedar: new THREE.MeshStandardMaterial({ map: T.cedar, bumpMap: T.cedar, bumpScale: 1, roughness: 0.7 }),
    door: new THREE.MeshPhysicalMaterial({ color: '#7a1418', roughness: 0.35, clearcoat: 0.8 }),
    brass: new THREE.MeshStandardMaterial({ color: '#c9a25a', metalness: 0.9, roughness: 0.25 }),
    concrete: new THREE.MeshStandardMaterial({ map: T.concrete, bumpMap: T.concrete, bumpScale: 0.6, roughness: 0.9 }),
    foundation: new THREE.MeshStandardMaterial({ color: '#a9a49c', roughness: 0.9 }),
    grass: new THREE.MeshStandardMaterial({ map: T.grass, bumpMap: T.grass, bumpScale: 0.8, roughness: 1 }),
    soil: new THREE.MeshStandardMaterial({ map: T.soil, bumpMap: T.soil, bumpScale: 1, roughness: 1 }),
    mulch: new THREE.MeshStandardMaterial({ map: T.mulch, bumpMap: T.mulch, bumpScale: 2, roughness: 1 }),
    leaves: new THREE.MeshStandardMaterial({ map: T.leaves, bumpMap: T.leaves, bumpScale: 3, roughness: 0.95 }),
    leavesDark: new THREE.MeshStandardMaterial({ map: T.leaves, bumpMap: T.leaves, bumpScale: 3, roughness: 0.95, color: '#9fb08f' }),
    bark: new THREE.MeshStandardMaterial({ color: '#5b4636', roughness: 1 }),
    lamp: new THREE.MeshStandardMaterial({ color: '#ffd9a0', emissive: '#ffb45e', emissiveIntensity: 1.6 }),
  }

  const root = new THREE.Group()

  const add = (parent: THREE.Object3D, geo: THREE.BufferGeometry, mat: THREE.Material, x: number, y: number, z: number, uvScale?: number) => {
    if (uvScale) projectUV(geo, uvScale)
    const m = new THREE.Mesh(geo, mat)
    m.position.set(x, y, z)
    m.castShadow = true
    m.receiveShadow = true
    parent.add(m)
    return m
  }
  const box = (parent: THREE.Object3D, w: number, h: number, d: number, mat: THREE.Material, x: number, y: number, z: number, uvScale?: number) =>
    add(parent, new THREE.BoxGeometry(w, h, d), mat, x, y, z, uvScale)

  /* Floating lawn slab with soil cross-section */
  const slabShape = (w: number, d: number, r: number) => {
    const s = new THREE.Shape()
    const x = -w / 2
    const y = -d / 2
    s.moveTo(x + r, y)
    s.lineTo(x + w - r, y)
    s.quadraticCurveTo(x + w, y, x + w, y + r)
    s.lineTo(x + w, y + d - r)
    s.quadraticCurveTo(x + w, y + d, x + w - r, y + d)
    s.lineTo(x + r, y + d)
    s.quadraticCurveTo(x, y + d, x, y + d - r)
    s.lineTo(x, y + r)
    s.quadraticCurveTo(x, y, x + r, y)
    return s
  }
  const layer = (depth: number, mat: THREE.Material, top: number, uv: number, bevel = false) => {
    const g = new THREE.ExtrudeGeometry(slabShape(9.6, 7.8, 0.9), {
      depth,
      bevelEnabled: bevel,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 3,
      curveSegments: 16,
    })
    g.rotateX(-Math.PI / 2)
    g.translate(0, top - depth, 0)
    const m = add(root, g, mat, 0, 0, 0, uv)
    m.castShadow = false
    return m
  }
  layer(0.08, M.grass, 0, 2.2, true)
  layer(0.55, M.soil, -0.08, 1.4)

  const house = new THREE.Group()
  house.position.set(-0.95, 0, -0.45)
  root.add(house)

  /* Window unit facing +z */
  const windowUnit = (w: number, h: number, panes: [number, number] = [2, 2]) => {
    const g = new THREE.Group()
    const t = 0.05
    box(g, w + 0.1, h + 0.1, 0.04, M.trim, 0, 0, -0.01)
    box(g, w, h, 0.02, M.glass, 0, 0, 0.01)
    box(g, w, t, 0.06, M.black, 0, h / 2 - t / 2, 0.03)
    box(g, w, t, 0.06, M.black, 0, -h / 2 + t / 2, 0.03)
    box(g, t, h, 0.06, M.black, -w / 2 + t / 2, 0, 0.03)
    box(g, t, h, 0.06, M.black, w / 2 - t / 2, 0, 0.03)
    for (let i = 1; i < panes[0]; i++) box(g, 0.022, h, 0.05, M.black, -w / 2 + (w * i) / panes[0], 0, 0.03)
    for (let i = 1; i < panes[1]; i++) box(g, w, 0.022, 0.05, M.black, 0, -h / 2 + (h * i) / panes[1], 0.03)
    box(g, w + 0.18, 0.05, 0.12, M.trim, 0, -h / 2 - 0.06, 0.05)
    return g
  }
  const place = (obj: THREE.Object3D, x: number, y: number, z: number, ry = 0) => {
    obj.position.set(x, y, z)
    obj.rotation.y = ry
    house.add(obj)
  }

  /* Main block */
  const W = 3.4
  const D = 2.6
  const WALL = 1.8
  const BASE = 0.12
  const TOP = BASE + WALL
  box(house, W + 0.08, BASE, D + 0.08, M.foundation, 0, BASE / 2, 0)
  box(house, W, WALL, D, M.siding, 0, BASE + WALL / 2, 0, 1.2)

  // Front-facing gable ends (siding triangles)
  const RISE = 1.45
  const tri = (base: number, rise: number) => {
    const s = new THREE.Shape()
    s.moveTo(-base / 2, 0)
    s.lineTo(base / 2, 0)
    s.lineTo(0, rise)
    s.closePath()
    return s
  }
  for (const z of [D / 2 - 0.05, -D / 2]) {
    const g = new THREE.ExtrudeGeometry(tri(W, RISE), { depth: 0.05, bevelEnabled: false })
    add(house, g, M.siding, 0, TOP, z, 1.2)
  }

  // Standing-seam metal roof
  const theta = Math.atan(RISE / (W / 2))
  const OV = 0.2
  const slopeLen = (W / 2 + OV) / Math.cos(theta)
  const roofDepth = D + 0.4
  const eaveY = TOP - OV * Math.tan(theta)
  for (const side of [-1, 1]) {
    const panel = new THREE.Group()
    panel.position.set((side * (W / 2 + OV)) / 2, (TOP + RISE + eaveY) / 2 + 0.03, 0)
    panel.rotation.z = -side * theta
    box(panel, slopeLen, 0.05, roofDepth, M.metal, 0, 0, 0)
    for (let z = -roofDepth / 2 + 0.12; z < roofDepth / 2; z += 0.2) box(panel, slopeLen, 0.035, 0.018, M.metal, 0, 0.04, z)
    house.add(panel)
    // gutter
    box(house, 0.07, 0.07, roofDepth, M.black, side * (W / 2 + OV), eaveY - 0.03, 0)
  }
  box(house, 0.16, 0.07, roofDepth, M.metal, 0, TOP + RISE + 0.06, 0)
  // Rake trim on the front gable
  for (const side of [-1, 1]) {
    const rake = box(house, slopeLen + 0.02, 0.08, 0.06, M.trim, (side * (W / 2 + OV)) / 2, (TOP + RISE + eaveY) / 2 - 0.02, D / 2 + 0.2)
    rake.rotation.z = -side * theta
  }
  // Chimney pipe
  add(house, new THREE.CylinderGeometry(0.07, 0.07, 0.6, 20), M.black, -0.7, TOP + RISE - 0.15, -0.6)

  // Front: door, transom, windows, attic window
  const F = D / 2 + 0.005
  const PORCH_TOP = 0.16
  box(house, 0.7, 1.22, 0.04, M.trim, 0, PORCH_TOP + 0.61, F)
  box(house, 0.56, 1.1, 0.06, M.door, 0, PORCH_TOP + 0.55, F + 0.01)
  for (let i = 0; i < 3; i++) box(house, 0.14, 0.3, 0.02, M.glass, -0.16 + i * 0.16, PORCH_TOP + 0.85, F + 0.045)
  add(house, new THREE.SphereGeometry(0.03, 16, 16), M.brass, 0.2, PORCH_TOP + 0.5, F + 0.06)
  place(windowUnit(0.62, 1.0), -1.05, BASE + 1.0, F)
  place(windowUnit(0.62, 1.0), 1.05, BASE + 1.0, F)
  place(windowUnit(0.46, 0.46, [2, 2]), 0, TOP + 0.55, F)
  // Wall lanterns
  for (const x of [-0.5, 0.5]) {
    box(house, 0.09, 0.16, 0.07, M.black, x, BASE + 1.15, F + 0.05)
    box(house, 0.06, 0.1, 0.05, M.lamp, x, BASE + 1.15, F + 0.07)
  }

  // Sides and back
  place(windowUnit(0.62, 1.0), -W / 2 - 0.005, BASE + 1.0, 0.55, -Math.PI / 2)
  place(windowUnit(0.62, 1.0), -W / 2 - 0.005, BASE + 1.0, -0.55, -Math.PI / 2)
  place(windowUnit(0.62, 1.0), -0.9, BASE + 1.0, -D / 2 - 0.005, Math.PI)
  place(windowUnit(0.62, 1.0), 0.9, BASE + 1.0, -D / 2 - 0.005, Math.PI)
  place(windowUnit(0.42, 0.42), 0, TOP + 0.5, -D / 2 - 0.005, Math.PI)

  // Porch: deck, steps, cedar posts and beam, metal shed roof
  const PZ0 = D / 2
  const PD = 0.8
  box(house, W + 0.1, 0.16, PD, M.concrete, 0, 0.08, PZ0 + PD / 2, 1.6)
  box(house, 1.0, 0.08, 0.3, M.concrete, 0, 0.04, PZ0 + PD + 0.15, 1.6)
  for (const x of [-1.62, -0.5, 0.5, 1.62]) box(house, 0.12, 1.5, 0.12, M.cedar, x, 0.16 + 0.75, PZ0 + PD - 0.08, 0.8)
  box(house, W + 0.1, 0.14, 0.14, M.cedar, 0, 1.72, PZ0 + PD - 0.08, 0.8)
  const porchRoof = new THREE.Group()
  const pr = Math.atan(0.22 / (PD + 0.15))
  porchRoof.position.set(0, 1.9, PZ0 + (PD + 0.15) / 2)
  porchRoof.rotation.x = pr
  box(porchRoof, W + 0.3, 0.05, (PD + 0.15) / Math.cos(pr), M.metal, 0, 0, 0)
  for (let x = -W / 2; x <= W / 2; x += 0.2) box(porchRoof, 0.018, 0.035, (PD + 0.15) / Math.cos(pr), M.metal, x, 0.04, 0)
  house.add(porchRoof)

  /* Garage wing (side gable) */
  const GX0 = W / 2
  const GW = 2.0
  const GZ0 = -1.1
  const GZ1 = 1.0
  const GD = GZ1 - GZ0
  const GH = 1.5
  const GTOP = BASE + GH
  const gcx = GX0 + GW / 2
  const gcz = (GZ0 + GZ1) / 2
  box(house, GW + 0.04, BASE, GD + 0.08, M.foundation, gcx, BASE / 2, gcz)
  box(house, GW, GH, GD, M.siding, gcx, BASE + GH / 2, gcz, 1.2)
  const GR = 0.75
  const g2 = new THREE.ExtrudeGeometry(tri(GD, GR), { depth: 0.05, bevelEnabled: false })
  g2.rotateY(Math.PI / 2)
  add(house, g2, M.siding, GX0 + GW - 0.05, GTOP, gcz, 1.2)
  const th2 = Math.atan(GR / (GD / 2))
  const sl2 = (GD / 2 + 0.18) / Math.cos(th2)
  const gEave = GTOP - 0.18 * Math.tan(th2)
  for (const side of [1, -1]) {
    const panel = new THREE.Group()
    panel.position.set(gcx + 0.1, (GTOP + GR + gEave) / 2 + 0.03, gcz + (side * (GD / 2 + 0.18)) / 2)
    panel.rotation.x = side * th2
    box(panel, GW + 0.22, 0.05, sl2, M.metal, 0, 0, 0)
    for (let x = -GW / 2; x <= GW / 2 + 0.1; x += 0.2) box(panel, 0.018, 0.035, sl2, M.metal, x, 0.04, 0)
    house.add(panel)
    box(house, GW + 0.22, 0.07, 0.07, M.black, gcx + 0.1, gEave - 0.03, gcz + side * (GD / 2 + 0.18))
  }
  box(house, GW + 0.22, 0.07, 0.16, M.metal, gcx + 0.1, GTOP + GR + 0.06, gcz)
  // Cedar garage door with window strip
  const GF = GZ1 + 0.005
  box(house, 1.62, 1.2, 0.04, M.trim, gcx, BASE + 0.6, GF)
  box(house, 1.5, 1.12, 0.06, M.cedar, gcx, BASE + 0.56, GF + 0.01, 0.7)
  for (let i = 0; i < 4; i++) box(house, 0.3, 0.16, 0.02, M.glass, gcx - 0.53 + i * 0.355, BASE + 0.98, GF + 0.045)
  for (const x of [gcx - 0.95, gcx + 0.95]) {
    box(house, 0.09, 0.16, 0.07, M.black, x, BASE + 1.0, GF + 0.05)
    box(house, 0.06, 0.1, 0.05, M.lamp, x, BASE + 1.0, GF + 0.07)
  }
  place(windowUnit(0.5, 0.6), GX0 + GW + 0.005, BASE + 0.9, gcz, Math.PI / 2)

  /* Hardscape and planting (root coords: house is offset by -0.95, -0.45) */
  const driveStart = GZ1 - 0.45
  const driveEnd = 3.9
  box(root, 1.9, 0.03, driveEnd - driveStart, M.concrete, gcx - 0.95, 0.015, (driveStart + driveEnd) / 2, 1.6)
  box(root, 0.7, 0.025, 1.9, M.concrete, -0.95, 0.0125, 2.85, 0.7)
  const bedZ = PZ0 + PD + 0.3
  box(house, 1.15, 0.04, 0.5, M.mulch, -1.15, 0.02, bedZ, 0.9)
  box(house, 1.15, 0.04, 0.5, M.mulch, 1.15, 0.02, bedZ, 0.9)

  const shrub = (x: number, z: number, r: number, mat: THREE.Material, parent: THREE.Object3D = house) => {
    const g = new THREE.Group()
    const n = 5
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2
      const rr = r * (0.55 + (i % 2) * 0.15)
      add(g, new THREE.IcosahedronGeometry(rr, 2), mat, Math.cos(a) * r * 0.45, rr * 0.9, Math.sin(a) * r * 0.45, 0.6)
    }
    add(g, new THREE.IcosahedronGeometry(r * 0.7, 2), mat, 0, r * 1.15, 0, 0.6)
    g.position.set(x, 0.03, z)
    parent.add(g)
  }
  shrub(-1.5, bedZ, 0.24, M.leaves)
  shrub(-0.85, bedZ, 0.2, M.leavesDark)
  shrub(0.85, bedZ, 0.2, M.leavesDark)
  shrub(1.5, bedZ, 0.24, M.leaves)

  const tree = (x: number, z: number, h: number, s: number) => {
    const g = new THREE.Group()
    add(g, new THREE.CylinderGeometry(0.06 * s, 0.1 * s, h, 12), M.bark, 0, h / 2, 0)
    const blobs: [number, number, number, number][] = [
      [0, h + 0.35, 0, 0.62],
      [0.38, h + 0.1, 0.1, 0.45],
      [-0.35, h + 0.15, -0.05, 0.48],
      [0.05, h + 0.05, 0.36, 0.42],
      [-0.1, h + 0.62, -0.1, 0.42],
    ]
    for (const [bx, by, bz, br] of blobs) add(g, new THREE.IcosahedronGeometry(br * s, 3), M.leaves, bx * s, by, bz * s, 0.6)
    g.position.set(x, 0, z)
    root.add(g)
  }
  tree(-3.85, -2.4, 1.3, 1.15)
  tree(-3.7, 2.6, 0.7, 0.75)
  shrub(3.9, -2.8, 0.3, M.leavesDark, root)
  shrub(4.05, 0.2, 0.22, M.leaves, root)

  return { root, textures: Object.values(T) }
}

/** Soft round contact shadow under the floating slab. */
function blobTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const g = c.getContext('2d')!
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  grd.addColorStop(0, 'rgba(40,25,20,0.4)')
  grd.addColorStop(1, 'rgba(40,25,20,0)')
  g.fillStyle = grd
  g.fillRect(0, 0, 128, 128)
  return new THREE.CanvasTexture(c)
}

export default function HouseScene({ onReady }: { onReady?: () => void }) {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = host.current
    if (!el) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch {
      return // No WebGL: the static fallback stays visible.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.0
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 200)
    const viewDir = new THREE.Vector3(9.5, 5.6, 11).normalize()

    // Neutral studio lighting (product-shot look) plus a warm sun for shadows.
    const pmrem = new THREE.PMREMGenerator(renderer)
    const roomEnv = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = roomEnv
    scene.environmentIntensity = 0.55

    const sun = new THREE.DirectionalLight('#fff1e0', 2.9)
    sun.position.set(6, 10, 7)
    sun.castShadow = true
    sun.shadow.mapSize.set(2048, 2048)
    sun.shadow.camera.left = -7
    sun.shadow.camera.right = 7
    sun.shadow.camera.top = 7
    sun.shadow.camera.bottom = -7
    sun.shadow.bias = -0.0004
    sun.shadow.normalBias = 0.02
    sun.shadow.radius = 4
    scene.add(sun)

    const { root, textures } = buildScene()
    scene.add(root)

    const blobMat = new THREE.MeshBasicMaterial({ map: blobTexture(), transparent: true, depthWrite: false })
    const blob = new THREE.Mesh(new THREE.PlaneGeometry(14, 12), blobMat)
    blob.rotation.x = -Math.PI / 2
    blob.position.y = -1.6
    scene.add(blob)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0, 0.7, 0)
    controls.enableZoom = false
    controls.enablePan = false
    controls.enableDamping = true
    controls.dampingFactor = 0.07
    controls.rotateSpeed = 0.6
    controls.minPolarAngle = 0.6
    controls.maxPolarAngle = 1.38
    controls.autoRotate = !reduced
    controls.autoRotateSpeed = 0.9
    camera.position.copy(controls.target).addScaledVector(viewDir, 26)
    controls.update()

    let resumeTimer: ReturnType<typeof setTimeout> | undefined
    const onStart = () => {
      controls.autoRotate = false
      clearTimeout(resumeTimer)
    }
    const onEnd = () => {
      if (reduced) return
      resumeTimer = setTimeout(() => (controls.autoRotate = true), 2500)
    }
    controls.addEventListener('start', onStart)
    controls.addEventListener('end', onEnd)

    // Fit the whole diorama in view at any aspect ratio.
    const resize = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      // Tighter framing on narrow screens; the slab corners may just kiss the edges.
      const radius = camera.aspect < 1.05 ? 5.5 : 6.3
      const vFov = THREE.MathUtils.degToRad(camera.fov) / 2
      const hFov = Math.atan(Math.tan(vFov) * camera.aspect)
      const dist = radius / Math.sin(Math.min(vFov, hFov))
      const dir = camera.position.clone().sub(controls.target).normalize()
      camera.position.copy(controls.target).addScaledVector(dir, dist)
      controls.update()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    resize()

    let visible = true
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 })
    io.observe(el)

    const clock = new THREE.Clock()
    let raf = 0
    let first = true
    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      const t = clock.getElapsedTime()
      const bob = reduced ? 0 : Math.sin(t * 0.9) * 0.1
      root.position.y = bob
      const s = 1 - bob * 0.5
      blob.scale.set(s, s, s)
      blobMat.opacity = 0.9 - bob * 1.2
      controls.update()
      renderer.render(scene, camera)
      if (first) {
        first = false
        onReady?.()
      }
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(resumeTimer)
      ro.disconnect()
      io.disconnect()
      controls.dispose()
      scene.traverse((o) => {
        const m = o as THREE.Mesh
        if (m.geometry) m.geometry.dispose()
        const mm = m.material as THREE.Material | THREE.Material[] | undefined
        if (Array.isArray(mm)) mm.forEach((x) => x.dispose())
        else mm?.dispose()
      })
      textures.forEach((t) => t.dispose())
      roomEnv.dispose()
      pmrem.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [onReady])

  return <div ref={host} className="house-canvas" />
}
