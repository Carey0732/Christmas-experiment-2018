// Libs
import "../utils/OrbitControls"
import "../utils/OBJLoader"

// Classes
import Fire from "./Fire2"

// Models
import cubeModel from "../assets/models/model.obj"



export default class App {
    constructor() {
        // Scene
        this.scene = new THREE.Scene()

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            70,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        this.camera.position.set(0, 0, 10)

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector("canvas"),
            antialias: true
        })
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(window.innerWidth, window.innerHeight)

        // Controls
        this.controls = new THREE.OrbitControls(this.camera)

        // Timer
        this.clock = new THREE.Clock()

        // Listeners
        window.addEventListener("resize", this.onWindowResize.bind(this), false)
        this.onWindowResize()

        // Scene settings
        this.modelsArr = []
        this.texturesArr = []

        // Start scene
        this.launchScene()
    }

    launchScene() {
        // Helpers
        let axesHelper = new THREE.AxesHelper(10)
        this.scene.add(axesHelper)

        // Lights
        let ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        this.scene.add(ambientLight)

        let pointLight = new THREE.PointLight(0x00ffff, 1, 20)
        pointLight.position.set(0, 10, 0)
        this.scene.add(pointLight)

        let pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
        this.scene.add(pointLightHelper)

        

        // Meshes
        this.loadModel(cubeModel, "cube").then(model => {
            console.log("chargé ! :D", this.modelsArr.cube)
            this.scene.add(this.modelsArr.cube)
        })
        
        this.loadTexture("/app/assets/textures/fire2.png", "fireTexture").then(fireTexture => {
            this.fire = new Fire(fireTexture).draw()
            this.scene.add(this.fire)

            // Update loop
            this.update()
        })
    }

    loadModel(path, id) {
        return new Promise((resolve, reject) => {
            new THREE.OBJLoader().load(path, model => {
                this.modelsArr[id] = model
                resolve()
            })
        })
    }

    loadTexture(path, id) {
        return new Promise((resolve, reject) => {
            new THREE.TextureLoader().load(path, texture => {
                resolve(texture)
            })
        })
    }

    update() {
        this.clock.getDelta()
        this.time = this.clock.elapsedTime
        this.fire.update(this.time)

        this.renderer.render(this.scene, this.camera)
        requestAnimationFrame(this.update.bind(this))
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }
}
