// example import asset
// import imgPath from './assets/img.jpg'

// Libs
var THREE = require("three")
const FBXLoader = require("three-fbx-loader")
const OrbitControls = require("three-orbit-controls")(THREE)
const OBJLoader = require('three-obj-loader')(THREE);
// Models
import cubeModel from "../assets/models/cube7.fbx"
import cubeModel2 from "../assets/models/cube.obj"

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
        this.camera.position.set(0, 0, 50)

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector("canvas"),
            antialias: true
        })
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(window.innerWidth, window.innerHeight)

        // Controls
        this.controls = new OrbitControls(this.camera)

        // Listeners
        window.addEventListener("resize", this.onWindowResize.bind(this), false)
        this.onWindowResize()

        // Scene settings
        this.modelsArr = []

        // Start scene
        this.launchScene()

        // Update loop
        this.update()

    }

    launchScene() {
        // Helpers
        let axesHelper = new THREE.AxesHelper(10)
        this.scene.add(axesHelper)

        // Lights
        let ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        this.scene.add(ambientLight)

        let pointLight = new THREE.PointLight(0x00ffff, 1, 100)
        pointLight.position.set(0, 50, 0)
        this.scene.add(pointLight)

        let pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
        this.scene.add(pointLightHelper)

        // console.log(OBJLoader)
        new THREE.OBJLoader().load(cubeModel2, (mesh) => {
            console.log(mesh)
            this.scene.add(mesh)
        })

        // Meshes
        // this.loadModel(cubeModel, "cube").then((model) => {
        //     console.log("chargé ! :D", this.modelsArr.cube)

        //     this.modelsArr.cube.scale.set(0.1, 0.1, 0.1)
        //     this.scene.add(this.modelsArr.cube)
        // })
    }

    loadModel(path, id) {
        return new Promise((resolve, reject) => {
            new FBXLoader().load(path, model => {
                this.modelsArr[id] = model
                resolve()
            })
        })
    }

    // loadModel(path, id) {
    //     return new Promise((resolve, reject) => {
    //         OBJLoader().load(path, model => {
    //             this.modelsArr[id] = model
    //             resolve()
    //         })
    //     })
    // }

    update() {
        this.renderer.render(this.scene, this.camera)
        requestAnimationFrame(this.update.bind(this))
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }
}
