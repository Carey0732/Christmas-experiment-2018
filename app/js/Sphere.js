export default class Sphere extends THREE.Group {
    constructor(children, texture, envMap) {
        super()

        this.children = children
        this.texture = texture
        this.envMap = envMap
        this.canFloat = false

        this._minPosition = 0
        this._maxPosition = 0.8
        this.render()
    }

    render() {
        const goldMaterial = new THREE.MeshPhongMaterial({
            color: 0xb38e41,
            reflectivity: 0,
            specular: 0xeee8aa,
            shininess: 40,
            emissive: 0xffffff,
            emissiveIntensity: 0.06
        })

        const sphereMaterial = new THREE.MeshStandardMaterial({
            transparent: true,
            opacity: 0.3,
            metalness: 0.8,
            roughness: 0,
            emissive: 0xffffff,
            emissiveIntensity: 0.2,
            envMap: this.envMap,
            depthWrite: false
        })

        // Adding each element to the sphere
        this.children.forEach(child => {
            if (child.name === "Sphere") {
                child.material = sphereMaterial
                child.castShadow = true
            } else if (child.name === "Palissade") {
                child.material.map = this.texture
            } else {
                child.material = goldMaterial
            }

            this.add(child)
        })
    }

    update(canLevitate, time) {
        if (canLevitate) {
            this.rotation.y += 0.005

            if (this.position.y < this._maxPosition && !this.canFloat) {
                this.position.y += 0.005
            } else {
                this.canFloat = true
                this.position.y += Math.sin(time) * 0.005
            }
        } else {
            if (this.position.y > this._minPosition) {
                this.position.y -= 0.005
            }
        }
    }
}
