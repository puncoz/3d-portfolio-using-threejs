import * as THREE        from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import "../css/style.css"

// We need three component for 3d
// 1. Scene
// 2. Camera
// 3. Renderer

// Scene == Container
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#background"),
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

camera.position.setZ(30)
camera.position.setX(-3)

renderer.render(scene, camera)

// Creating Object to add in the scene
// 1. Geometry
// the {x,y,z} points that makeup a shape
//
// 2. Material
// the wrapping paper for an object
//
// 3. Mesh
// geometry + material

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)

const material = new THREE.MeshStandardMaterial({
    color: 0xff6347,
})

const torus = new THREE.Mesh(geometry, material)

// Adding material to the scene
scene.add(torus)

// Adding light source
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

// Three.js helper to point the light source
// const lightHelper = new THREE.PointLightHelper(pointLight)
// Three.js helper to view the grid
// const gridHelper = new THREE.GridHelper(200, 50)

// scene.add(lightHelper, gridHelper)

// Adding interaction with mouse
// const controls = new OrbitControls(camera, renderer.domElement)

// Background
const spaceTexture = new THREE.TextureLoader().load("../img/space.jpg")
scene.background = spaceTexture

// Randomly generated components
const addStar = () => {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24)
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
    const star = new THREE.Mesh(geometry, material)

    const [x, y, z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(100))
    star.position.set(x, y, z)
    scene.add(star)
}

Array(200).fill(0).forEach(() => addStar())

// Adding images in 3d object
const addAvatar = () => {
    const avatarTexture = new THREE.TextureLoader().load("../img/puncoz.jpg")

    const avatar = new THREE.Mesh(
        new THREE.BoxGeometry(3, 3, 3),
        // Basic Mesh Material does not required light
        new THREE.MeshBasicMaterial({ map: avatarTexture }),
    )

    scene.add(avatar)

    return avatar
}
const avatar = addAvatar()
avatar.position.z = -5
avatar.position.x = 2

// Complex images in mapping in 3d Object
const addMoon = () => {
    const moonTexture = new THREE.TextureLoader().load("../img/moon.jpg")

    const moonWithoutLand = new THREE.Mesh(
        new THREE.SphereGeometry(3, 32, 32),
        new THREE.MeshStandardMaterial({
            map: moonTexture,
        }),
    )

    scene.add(moonWithoutLand)
}

const addMoonWithAddedTexture = () => {
    const moonTexture = new THREE.TextureLoader().load("../img/moon.jpg")
    const moonLandTexture = new THREE.TextureLoader().load("../img/normal.jpg")

    const moon = new THREE.Mesh(
        new THREE.SphereGeometry(3, 32, 32),
        new THREE.MeshStandardMaterial({
            map: moonTexture,
            normalMap: moonLandTexture,
        }),
    )

    scene.add(moon)

    return moon
}
// addMoon()
const moon = addMoonWithAddedTexture()

moon.position.z = 30
moon.position.setX(-10)

// Scroll Event
const moveCamera = () => {
    const t = document.body.getBoundingClientRect().top
    moon.rotation.x += 0.05
    moon.rotation.y += 0.075
    moon.rotation.z += 0.05

    avatar.rotation.y += 0.01
    avatar.rotation.z += 0.01

    camera.position.z = t * -0.01
    camera.position.x = t * -0.0002
    camera.rotation.y = t * -0.0002
}

document.body.onscroll = moveCamera
moveCamera()

const animate = () => {
    requestAnimationFrame(animate)

    torus.rotation.x += 0.01
    torus.rotation.y += 0.005
    torus.rotation.z += 0.01

    moon.rotation.x += 0.005

    // controls.update()

    renderer.render(scene, camera)
}

animate()
