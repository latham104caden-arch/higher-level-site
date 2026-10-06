'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const C = {
  wall: '#f3f0ea',
  trim: '#ffffff',
  roof: '#6b1317',
  door: '#7a1418',
  glass: '#26303b',
  garage: '#dcd7cf',
  groove: '#c4beb5',
  stone: '#e3dfd8',
  lawn: '#8e9c7e',
  path: '#cdc6bb',
  bush: '#5d7550',
  leaf: '#6b8459',
  trunk: '#6d5847',
  chimney: '#8b8580',
}

function mat(color: string, opts: Partial<THREE.MeshStandardMaterialParameters> = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0, ...opts })
}

function box(w: number, h: number, d: number, color: string, x: number, y: number, z: number, opts?: Partial<THREE.MeshStandardMaterialParameters>) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(color, opts))
  m.position.set(x, y, z)
  m.castShadow = true
  m.receiveShadow = true
  return m
}

/** Gable prism: triangle (width x height) extruded `length` along X, centered. */
function gableAlongX(width: number, height: number, length: number, color: string) {
  const s = new THREE.Shape()
  s.moveTo(-width / 2, 0)
  s.lineTo(width / 2, 0)
  s.lineTo(0, height)
  s.closePath()
  const g = new THREE.ExtrudeGeometry(s, { depth: length, bevelEnabled: false })
  g.translate(0, 0, -length / 2)
  g.rotateY(Math.PI / 2)
  const m = new THREE.Mesh(g, mat(color, { roughness: 0.7 }))
  m.castShadow = true
  m.receiveShadow = true
  return m
}

/** Gable prism extruded along Z (gable end faces the front). */
function gableAlongZ(width: number, height: number, length: number, color: string) {
  const s = new THREE.Shape()
  s.moveTo(-width / 2, 0)
  s.lineTo(width / 2, 0)
  s.lineTo(0, height)
  s.closePath()
  const g = new THREE.ExtrudeGeometry(s, { depth: length, bevelEnabled: false })
  g.translate(0, 0, -length / 2)
  const m = new THREE.Mesh(g, mat(color, { roughness: 0.7 }))
  m.castShadow = true
  m.receiveShadow = true
  return m
}

function windowAt(x: number, y: number, z: number, rotY = 0, w = 0.6, h = 0.62) {
  const g = new THREE.Group()
  g.add(box(w + 0.12, h + 0.12, 0.05, C.trim, 0, 0, 0))
  g.add(box(w, h, 0.07, C.glass, 0, 0, 0.01, { roughness: 0.15, metalness: 0.35 }))
  g.add(box(0.04, h, 0.09, C.trim, 0, 0, 0.02))
  g.add(box(w, 0.04, 0.09, C.trim, 0, 0, 0.02))
  g.add(box(w + 0.22, 0.05, 0.14, C.trim, 0, -h / 2 - 0.08, 0.04))
  g.position.set(x, y, z)
  g.rotation.y = rotY
  return g
}

function buildHouse() {
  const root = new THREE.Group()

  // Floating stone plinth with a lawn top.
  const plinth = new THREE.Mesh(new THREE.CylinderGeometry(3.3, 3.3, 0.32, 72), mat(C.stone, { roughness: 0.6 }))
  plinth.position.y = -0.18
  plinth.receiveShadow = true
  plinth.castShadow = true
  root.add(plinth)
  const lawn = new THREE.Mesh(new THREE.CylinderGeometry(3.18, 3.18, 0.05, 72), mat(C.lawn, { roughness: 1 }))
  lawn.position.y = 0
  lawn.receiveShadow = true
  root.add(lawn)

  const house = new THREE.Group()
  house.position.x = -0.5
  root.add(house)

  // Main body
  house.add(box(3.2, 1.7, 2.2, C.wall, -0.3, 0.875, 0))
  const roof = gableAlongX(2.75, 1.1, 3.6, C.roof)
  roof.position.set(-0.3, 1.72, 0)
  house.add(roof)
  // Fascia trim along the eaves
  house.add(box(3.6, 0.07, 0.08, C.trim, -0.3, 1.72, 1.36))
  house.add(box(3.6, 0.07, 0.08, C.trim, -0.3, 1.72, -1.36))

  // Garage wing
  house.add(box(1.7, 1.25, 2.0, C.wall, 2.15, 0.65, 0.1))
  const groof = gableAlongZ(2.0, 0.7, 2.3, C.roof)
  groof.position.set(2.15, 1.27, 0.1)
  house.add(groof)
  house.add(box(1.3, 0.95, 0.05, C.garage, 2.15, 0.5, 1.12))
  for (let i = 0; i < 3; i++) house.add(box(1.3, 0.025, 0.07, C.groove, 2.15, 0.25 + i * 0.25, 1.13))
  house.add(box(1.42, 0.06, 0.08, C.trim, 2.15, 1.0, 1.12))

  // Front door, porch, steps
  house.add(box(0.62, 1.08, 0.05, C.trim, -0.3, 0.57, 1.11))
  house.add(box(0.5, 0.98, 0.07, C.door, -0.3, 0.52, 1.12, { roughness: 0.5 }))
  const knob = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 12), mat('#d4b06a', { metalness: 0.8, roughness: 0.3 }))
  knob.position.set(-0.14, 0.5, 1.17)
  house.add(knob)
  house.add(box(1.0, 0.06, 0.5, C.trim, -0.3, 1.2, 1.32))
  house.add(box(0.05, 1.2, 0.05, C.trim, -0.74, 0.6, 1.52))
  house.add(box(0.05, 1.2, 0.05, C.trim, 0.14, 0.6, 1.52))
  house.add(box(0.9, 0.1, 0.45, C.stone, -0.3, 0.05, 1.35))

  // Windows: front, sides, back
  house.add(windowAt(-1.3, 0.95, 1.11))
  house.add(windowAt(0.7, 0.95, 1.11))
  house.add(windowAt(-1.91, 0.95, 0.4, -Math.PI / 2))
  house.add(windowAt(-1.91, 0.95, -0.5, -Math.PI / 2))
  house.add(windowAt(-1.3, 0.95, -1.11, Math.PI))
  house.add(windowAt(0.7, 0.95, -1.11, Math.PI))
  house.add(windowAt(3.01, 0.7, 0.1, Math.PI / 2, 0.5, 0.45))

  // Chimney
  house.add(box(0.36, 1.0, 0.36, C.chimney, -1.25, 2.2, -0.45))
  house.add(box(0.44, 0.08, 0.44, C.stone, -1.25, 2.72, -0.45))

  // Walk + driveway
  house.add(box(0.55, 0.03, 1.3, C.path, -0.3, 0.03, 2.2))
  house.add(box(1.35, 0.03, 1.4, C.path, 2.15, 0.03, 1.85))

  // Shrubs
  const shrub = (x: number, z: number, r: number) => {
    const m = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 1), mat(C.bush, { flatShading: true }))
    m.position.set(x, r * 0.8, z)
    m.castShadow = true
    house.add(m)
  }
  shrub(-1.1, 1.4, 0.24)
  shrub(-1.6, 1.38, 0.2)
  shrub(0.45, 1.4, 0.22)
  shrub(1.05, 1.36, 0.18)

  // Tree
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.1, 0.9, 10), mat(C.trunk))
  trunk.position.set(-2.55, 0.45, -1.0)
  trunk.castShadow = true
  root.add(trunk)
  const crown = new THREE.Mesh(new THREE.IcosahedronGeometry(0.62, 1), mat(C.leaf, { flatShading: true }))
  crown.position.set(-2.55, 1.25, -1.0)
  crown.castShadow = true
  root.add(crown)

  return root
}

/** Soft round shadow texture for the floor under the floating plinth. */
function blobTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const g = c.getContext('2d')!
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  grd.addColorStop(0, 'rgba(40,20,20,0.42)')
  grd.addColorStop(1, 'rgba(40,20,20,0)')
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
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
    } catch {
      return // No WebGL: the static fallback stays visible.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100)
    const viewDir = new THREE.Vector3(9.5, 5.2, 11).normalize()
    camera.position.copy(viewDir).multiplyScalar(18)

    scene.add(new THREE.HemisphereLight('#fffaf2', '#b9b3aa', 1.6))
    const sun = new THREE.DirectionalLight('#ffffff', 2.4)
    sun.position.set(5, 9, 6)
    sun.castShadow = true
    sun.shadow.mapSize.set(1024, 1024)
    sun.shadow.camera.left = -5
    sun.shadow.camera.right = 5
    sun.shadow.camera.top = 5
    sun.shadow.camera.bottom = -5
    sun.shadow.bias = -0.0005
    scene.add(sun)
    const fill = new THREE.DirectionalLight('#ffe9e0', 0.6)
    fill.position.set(-6, 3, -4)
    scene.add(fill)

    const model = buildHouse()
    scene.add(model)

    // Floating map pin over the house: "local".
    const pin = new THREE.Group()
    const pinMat = new THREE.MeshPhysicalMaterial({ color: C.door, roughness: 0.22, metalness: 0.15, clearcoat: 1, clearcoatRoughness: 0.15 })
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.42, 40, 40), pinMat)
    head.position.y = 0.55
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.36, 0.85, 40), pinMat)
    tip.rotation.x = Math.PI
    tip.position.y = 0.05
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.16, 24, 24), mat('#ffffff', { roughness: 0.3 }))
    dot.position.set(0, 0.6, 0.33)
    pin.add(head, tip, dot)
    pin.traverse((o) => ((o as THREE.Mesh).castShadow = true))
    pin.position.set(-0.6, 3.5, 0.2)
    scene.add(pin)

    // Glossy orbs drifting around the plinth.
    const orbMat = new THREE.MeshPhysicalMaterial({ color: '#ffffff', roughness: 0.12, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.1 })
    const orbMatBrand = new THREE.MeshPhysicalMaterial({ color: C.door, roughness: 0.2, clearcoat: 1 })
    const orbs = [
      { r: 0.22, rad: 3.9, h: 1.8, speed: 0.35, phase: 0, m: orbMat },
      { r: 0.14, rad: 3.6, h: 0.6, speed: -0.5, phase: 2.1, m: orbMatBrand },
      { r: 0.3, rad: 4.2, h: 2.6, speed: 0.25, phase: 4.0, m: orbMat },
    ].map((o) => {
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(o.r, 32, 32), o.m)
      mesh.castShadow = true
      mesh.position.set(Math.cos(o.phase) * o.rad, o.h, Math.sin(o.phase) * o.rad)
      scene.add(mesh)
      return { ...o, mesh }
    })

    const blobMat = new THREE.MeshBasicMaterial({ map: blobTexture(), transparent: true, depthWrite: false })
    const blob = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), blobMat)
    blob.rotation.x = -Math.PI / 2
    blob.position.y = -1.5
    scene.add(blob)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0, 0.6, 0)
    controls.enableZoom = false
    controls.enablePan = false
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.rotateSpeed = 0.7
    controls.minPolarAngle = 0.55
    controls.maxPolarAngle = 1.45
    controls.autoRotate = !reduced
    controls.autoRotateSpeed = 1.6
    controls.update()

    // Pause auto-rotate while the visitor is dragging, resume a moment after.
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

    const resize = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      // Pull back on narrow screens so the whole plinth always fits.
      const dist = camera.aspect < 1 ? 21 : camera.aspect < 1.3 ? 19.5 : 18
      const offset = camera.position.clone().sub(controls.target)
      const dir = offset.lengthSq() > 0 ? offset.normalize() : viewDir
      camera.position.copy(controls.target).addScaledVector(dir, dist)
      controls.update()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    resize()

    // Only animate while on screen.
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
      const bob = reduced ? 0 : Math.sin(t * 1.1) * 0.12
      model.position.y = bob
      if (!reduced) {
        pin.position.y = 3.5 + Math.sin(t * 1.6 + 1) * 0.18
        pin.rotation.y = t * 0.9
        for (const o of orbs) {
          const a = o.phase + t * o.speed
          o.mesh.position.set(Math.cos(a) * o.rad, o.h + Math.sin(t * 1.3 + o.phase) * 0.2, Math.sin(a) * o.rad)
        }
      }
      const s = 1 - bob * 0.6
      blob.scale.set(s, s, s)
      blobMat.opacity = 0.9 - bob * 1.5
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
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [onReady])

  return <div ref={host} className="house-canvas" />
}
