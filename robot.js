import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x08111f);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    antialias:true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

document.body.appendChild(renderer.domElement);

/* LIGHTS */

const ambient = new THREE.AmbientLight(
    0xffffff,
    2
);

scene.add(ambient);

const pointLight = new THREE.PointLight(
    0xffffff,
    5
);

pointLight.position.set(5,5,5);

scene.add(pointLight);

/* MATERIAL */

const robotMaterial =
new THREE.MeshStandardMaterial({
    color:0xffffff,
    metalness:0.8,
    roughness:0.2
});

/* ROBOT GROUP */

const robot = new THREE.Group();

/* HEAD */

const head = new THREE.Mesh(
    new THREE.BoxGeometry(1.5,1.5,1.5),
    robotMaterial
);

head.position.y = 3;

robot.add(head);

/* EYES */

const eyeMaterial =
new THREE.MeshBasicMaterial({
    color:0x00ffff
});

const eye1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.12),
    eyeMaterial
);

eye1.position.set(-0.3,3,0.8);

robot.add(eye1);

const eye2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.12),
    eyeMaterial
);

eye2.position.set(0.3,3,0.8);

robot.add(eye2);

/* BODY */

const body = new THREE.Mesh(
    new THREE.BoxGeometry(2,2.5,1),
    robotMaterial
);

body.position.y = 1;

robot.add(body);

/* ARMS */

const leftArm = new THREE.Mesh(
    new THREE.BoxGeometry(
        0.5,
        2,
        0.5
    ),
    robotMaterial
);

leftArm.position.set(
    -1.5,
    1,
    0
);

robot.add(leftArm);

const rightArm = new THREE.Mesh(
    new THREE.BoxGeometry(
        0.5,
        2,
        0.5
    ),
    robotMaterial
);

rightArm.position.set(
    1.5,
    1,
    0
);

robot.add(rightArm);

/* LEGS */

const leftLeg = new THREE.Mesh(
    new THREE.BoxGeometry(
        0.6,
        2,
        0.6
    ),
    robotMaterial
);

leftLeg.position.set(
    -0.5,
    -1.5,
    0
);

robot.add(leftLeg);

const rightLeg = new THREE.Mesh(
    new THREE.BoxGeometry(
        0.6,
        2,
        0.6
    ),
    robotMaterial
);

rightLeg.position.set(
    0.5,
    -1.5,
    0
);

robot.add(rightLeg);

scene.add(robot);

camera.position.z = 8;

/* ANIMATION */

function animate(){

    requestAnimationFrame(
        animate
    );

    robot.rotation.y += 0.005;

    robot.position.y =
        Math.sin(
            Date.now()*0.002
        )*0.2;

    renderer.render(
        scene,
        camera
    );
}

animate();

/* RESIZE */

window.addEventListener(
    "resize",
    ()=>{

        camera.aspect=
        window.innerWidth/
        window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );
    }
);