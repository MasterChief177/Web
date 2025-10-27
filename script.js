import * as THREE from 'https://unpkg.com/three@0.161.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.161.0/examples/jsm/controls/OrbitControls.js';

const REMOTE_DATA_URL =
  'https://raw.githubusercontent.com/typpo/spacekit/master/data/planets.json';
const LOCAL_DATA_URL = './data/solar_system.json';

const embeddedBodies = [
  {
    name: 'Sun',
    type: 'star',
    radiusKm: 696340,
    color: '#FDB813',
    description:
      'The G-type main-sequence star at the center of the Solar System, providing the gravitational anchor and energy for all orbiting bodies.'
  },
  {
    name: 'Mercury',
    type: 'planet',
    color: '#b0b0b0',
    radiusKm: 2439.7,
    description:
      'Closest planet to the Sun with a heavily cratered surface and extreme temperature variations.',
    orbit: {
      semiMajorAxisKm: 57909050,
      orbitalPeriodDays: 87.969,
      eccentricity: 0.2056,
      inclinationDeg: 7.0
    },
    moons: []
  },
  {
    name: 'Venus',
    type: 'planet',
    color: '#e0c085',
    radiusKm: 6051.8,
    description:
      'Second planet from the Sun with a dense CO₂ atmosphere causing a runaway greenhouse effect.',
    orbit: {
      semiMajorAxisKm: 108208000,
      orbitalPeriodDays: 224.701,
      eccentricity: 0.0068,
      inclinationDeg: 3.4
    },
    moons: []
  },
  {
    name: 'Earth',
    type: 'planet',
    color: '#4f93d2',
    radiusKm: 6371,
    description:
      "Our home world, the only known planet to host life, with abundant liquid water and a protective atmosphere.",
    orbit: {
      semiMajorAxisKm: 149598023,
      orbitalPeriodDays: 365.256,
      eccentricity: 0.0167,
      inclinationDeg: 0.0
    },
    moons: [
      {
        name: 'Moon',
        type: 'moon',
        color: '#cccccc',
        radiusKm: 1737.4,
        description:
          "Earth's only natural satellite, responsible for tides and stabilizing Earth's axial tilt.",
        orbit: {
          semiMajorAxisKm: 384400,
          orbitalPeriodDays: 27.322,
          eccentricity: 0.0549,
          inclinationDeg: 5.1
        }
      }
    ]
  },
  {
    name: 'Mars',
    type: 'planet',
    color: '#d14b2f',
    radiusKm: 3389.5,
    description:
      'The Red Planet with a thin atmosphere, evidence of ancient water, and the tallest volcano in the Solar System.',
    orbit: {
      semiMajorAxisKm: 227939200,
      orbitalPeriodDays: 686.98,
      eccentricity: 0.0934,
      inclinationDeg: 1.85
    },
    moons: [
      {
        name: 'Phobos',
        type: 'moon',
        color: '#88807c',
        radiusKm: 11.27,
        description:
          'Innermost Martian moon, a captured asteroid on a decaying orbit.',
        orbit: {
          semiMajorAxisKm: 9376,
          orbitalPeriodDays: 0.3189,
          eccentricity: 0.0151,
          inclinationDeg: 1.1
        }
      },
      {
        name: 'Deimos',
        type: 'moon',
        color: '#a3978f',
        radiusKm: 6.2,
        description:
          'Outer Martian moon, a small, irregularly shaped body with a smooth regolith layer.',
        orbit: {
          semiMajorAxisKm: 23463,
          orbitalPeriodDays: 1.263,
          eccentricity: 0.0002,
          inclinationDeg: 1.8
        }
      }
    ]
  },
  {
    name: 'Jupiter',
    type: 'planet',
    color: '#d9b38c',
    radiusKm: 69911,
    description:
      'The largest planet with powerful storms like the Great Red Spot and a strong magnetic field.',
    orbit: {
      semiMajorAxisKm: 778299000,
      orbitalPeriodDays: 4332.59,
      eccentricity: 0.0489,
      inclinationDeg: 1.3
    },
    moons: [
      {
        name: 'Io',
        type: 'moon',
        color: '#f4d35e',
        radiusKm: 1821.6,
        description:
          'Volcanically active Galilean moon with hundreds of active lava flows.',
        orbit: {
          semiMajorAxisKm: 421800,
          orbitalPeriodDays: 1.769,
          eccentricity: 0.0041,
          inclinationDeg: 0.0
        }
      },
      {
        name: 'Europa',
        type: 'moon',
        color: '#c1d1e3',
        radiusKm: 1560.8,
        description: 'Ice-covered world suspected to harbor a subsurface ocean.',
        orbit: {
          semiMajorAxisKm: 671100,
          orbitalPeriodDays: 3.551,
          eccentricity: 0.009,
          inclinationDeg: 0.5
        }
      },
      {
        name: 'Ganymede',
        type: 'moon',
        color: '#b8a48b',
        radiusKm: 2634.1,
        description:
          'Largest moon in the Solar System and the only moon with its own magnetic field.',
        orbit: {
          semiMajorAxisKm: 1070400,
          orbitalPeriodDays: 7.155,
          eccentricity: 0.0013,
          inclinationDeg: 0.2
        }
      },
      {
        name: 'Callisto',
        type: 'moon',
        color: '#9d8771',
        radiusKm: 2410.3,
        description:
          'A heavily cratered moon with one of the oldest surfaces in the Solar System.',
        orbit: {
          semiMajorAxisKm: 1882700,
          orbitalPeriodDays: 16.689,
          eccentricity: 0.0074,
          inclinationDeg: 0.2
        }
      }
    ]
  },
  {
    name: 'Saturn',
    type: 'planet',
    color: '#f5deb3',
    radiusKm: 58232,
    description:
      'Gas giant famous for its spectacular ring system composed of ice and rocky debris.',
    orbit: {
      semiMajorAxisKm: 1429394000,
      orbitalPeriodDays: 10759.22,
      eccentricity: 0.0565,
      inclinationDeg: 2.5
    },
    moons: [
      {
        name: 'Titan',
        type: 'moon',
        color: '#d4a373',
        radiusKm: 2574.7,
        description:
          'Largest moon of Saturn with a thick nitrogen-rich atmosphere and methane lakes.',
        orbit: {
          semiMajorAxisKm: 1221870,
          orbitalPeriodDays: 15.945,
          eccentricity: 0.0288,
          inclinationDeg: 0.3
        }
      },
      {
        name: 'Enceladus',
        type: 'moon',
        color: '#f1f5f9',
        radiusKm: 252.1,
        description: 'Icy moon with geysers that hint at a subsurface ocean.',
        orbit: {
          semiMajorAxisKm: 237948,
          orbitalPeriodDays: 1.37,
          eccentricity: 0.0047,
          inclinationDeg: 0.0
        }
      },
      {
        name: 'Rhea',
        type: 'moon',
        color: '#d8d5d0',
        radiusKm: 763.5,
        description: 'Second-largest moon of Saturn with a heavily cratered icy surface.',
        orbit: {
          semiMajorAxisKm: 527108,
          orbitalPeriodDays: 4.518,
          eccentricity: 0.001,
          inclinationDeg: 0.3
        }
      },
      {
        name: 'Iapetus',
        type: 'moon',
        color: '#c4b39a',
        radiusKm: 734.5,
        description:
          'Moon with a distinctive two-tone coloration and an equatorial ridge.',
        orbit: {
          semiMajorAxisKm: 3561300,
          orbitalPeriodDays: 79.322,
          eccentricity: 0.0286,
          inclinationDeg: 7.5
        }
      }
    ]
  },
  {
    name: 'Uranus',
    type: 'planet',
    color: '#77c1d4',
    radiusKm: 25362,
    description:
      'Ice giant tipped on its side, leading to extreme seasonal variations.',
    orbit: {
      semiMajorAxisKm: 2870658000,
      orbitalPeriodDays: 30688.5,
      eccentricity: 0.0463,
      inclinationDeg: 0.8
    },
    moons: [
      {
        name: 'Titania',
        type: 'moon',
        color: '#b7c7cf',
        radiusKm: 788.4,
        description:
          'Largest moon of Uranus with canyon systems and fault valleys.',
        orbit: {
          semiMajorAxisKm: 436300,
          orbitalPeriodDays: 8.706,
          eccentricity: 0.0011,
          inclinationDeg: 0.1
        }
      },
      {
        name: 'Oberon',
        type: 'moon',
        color: '#b3c1c7',
        radiusKm: 761.4,
        description:
          'Outer major moon of Uranus featuring ancient, cratered terrain.',
        orbit: {
          semiMajorAxisKm: 583500,
          orbitalPeriodDays: 13.463,
          eccentricity: 0.0014,
          inclinationDeg: 0.1
        }
      },
      {
        name: 'Umbriel',
        type: 'moon',
        color: '#9daeb6',
        radiusKm: 584.7,
        description:
          'Dark moon rich in carbon compounds with few impact features.',
        orbit: {
          semiMajorAxisKm: 266000,
          orbitalPeriodDays: 4.144,
          eccentricity: 0.0039,
          inclinationDeg: 0.1
        }
      },
      {
        name: 'Ariel',
        type: 'moon',
        color: '#bfcdd4',
        radiusKm: 578.9,
        description:
          'Bright Uranian moon with relatively young tectonically resurfaced plains.',
        orbit: {
          semiMajorAxisKm: 190900,
          orbitalPeriodDays: 2.52,
          eccentricity: 0.0012,
          inclinationDeg: 0.1
        }
      },
      {
        name: 'Miranda',
        type: 'moon',
        color: '#c7d6de',
        radiusKm: 235.8,
        description:
          "Smallest of Uranus's five major moons, famed for its dramatic cliffs and ridges.",
        orbit: {
          semiMajorAxisKm: 129900,
          orbitalPeriodDays: 1.414,
          eccentricity: 0.0013,
          inclinationDeg: 4.2
        }
      }
    ]
  },
  {
    name: 'Neptune',
    type: 'planet',
    color: '#4976e6',
    radiusKm: 24622,
    description:
      'Farthest known planet with supersonic winds and dynamic storms in its atmosphere.',
    orbit: {
      semiMajorAxisKm: 4498396000,
      orbitalPeriodDays: 60182,
      eccentricity: 0.0086,
      inclinationDeg: 1.8
    },
    moons: [
      {
        name: 'Triton',
        type: 'moon',
        color: '#c5d4e0',
        radiusKm: 1353.4,
        description:
          'Largest moon of Neptune with geysers and a retrograde orbit, likely captured.',
        orbit: {
          semiMajorAxisKm: 354759,
          orbitalPeriodDays: 5.877,
          eccentricity: 0.000016,
          inclinationDeg: 156.9
        }
      },
      {
        name: 'Proteus',
        type: 'moon',
        color: '#9099a1',
        radiusKm: 210,
        description:
          'Second-largest Neptunian moon with an irregular, boxy shape.',
        orbit: {
          semiMajorAxisKm: 117647,
          orbitalPeriodDays: 1.122,
          eccentricity: 0.0005,
          inclinationDeg: 0.5
        }
      }
    ]
  }
];

async function loadBodies() {
  try {
    const response = await fetch(REMOTE_DATA_URL);
    if (!response.ok) {
      throw new Error(`Remote response ${response.status}`);
    }
    const remote = await response.json();
    if (remote && Array.isArray(remote.bodies)) {
      return remote;
    }
    throw new Error('Remote data missing expected structure');
  } catch (remoteError) {
    console.warn('Remote data fetch failed, attempting local cache.', remoteError);
    try {
      const localResponse = await fetch(LOCAL_DATA_URL);
      if (!localResponse.ok) {
        throw new Error(`Local response ${localResponse.status}`);
      }
      const local = await localResponse.json();
      if (local && Array.isArray(local.bodies)) {
        return local;
      }
    } catch (localError) {
      console.warn('Local data fetch failed, falling back to embedded dataset.', localError);
    }
  }

  return {
    updated: '2024-01-01',
    source: 'Embedded fallback dataset',
    bodies: embeddedBodies
  };
}

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('solarCanvas'),
  antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x02040a, 0.0008);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1e9
);
camera.position.set(0, 100, 320);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 20;
controls.maxDistance = 1500;
controls.enablePan = false;

const ambient = new THREE.AmbientLight(0x404040, 0.7);
scene.add(ambient);

const sunLight = new THREE.PointLight(0xfff4d6, 3, 0, 2);
sunLight.castShadow = false;
scene.add(sunLight);

const starfield = createStarfield(1600, 5000);
scene.add(starfield);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2(-1, -1);

const infoName = document.getElementById('info-name');
const infoType = document.getElementById('info-type');
const infoDetails = document.getElementById('info-details');
const infoDescription = document.getElementById('info-description');

const distanceScale = 1 / 5e6;
const radiusScale = 1 / 1200;
const minBodyRadius = 0.5;

const bodyInstances = [];
const interactiveMeshes = [];

function createStarfield(count, radius) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const color = new THREE.Color();

  for (let i = 0; i < count; i += 1) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = radius * (0.4 + 0.6 * Math.random());

    const index = i * 3;
    positions[index] = r * Math.sin(phi) * Math.cos(theta);
    positions[index + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[index + 2] = r * Math.cos(phi);

    const hue = 0.55 + Math.random() * 0.1;
    const saturation = 0.1 + Math.random() * 0.2;
    const lightness = 0.7 + Math.random() * 0.3;
    color.setHSL(hue, saturation, lightness);

    colors[index] = color.r;
    colors[index + 1] = color.g;
    colors[index + 2] = color.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 2,
    vertexColors: true,
    transparent: true,
    opacity: 0.85
  });

  return new THREE.Points(geometry, material);
}

function buildOrbitLine(orbit, color) {
  const segments = 256;
  const positions = [];
  const a = orbit.semiMajorAxisKm * distanceScale;
  const e = orbit.eccentricity;
  const b = a * Math.sqrt(1 - e * e);
  const inclination = THREE.MathUtils.degToRad(orbit.inclinationDeg || 0);
  const cosInc = Math.cos(inclination);
  const sinInc = Math.sin(inclination);

  for (let i = 0; i <= segments; i += 1) {
    const angle = (i / segments) * Math.PI * 2;
    const x = a * (Math.cos(angle) - e);
    const zPrime = b * Math.sin(angle);
    const y = zPrime * sinInc;
    const z = zPrime * cosInc;
    positions.push(x, y, z);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(positions, 3)
  );

  const material = new THREE.LineBasicMaterial({
    color,
    opacity: 0.35,
    transparent: true
  });

  return new THREE.LineLoop(geometry, material);
}

function createBodyMesh(body) {
  const radius = Math.max(body.radiusKm * radiusScale, minBodyRadius);
  const geometry = new THREE.SphereGeometry(radius, 48, 32);
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(body.color || 0xffffff),
    emissive:
      body.type === 'star' ? new THREE.Color(body.color || 0xffffff) : 0x000000,
    emissiveIntensity: body.type === 'star' ? 0.6 : 0,
    metalness: body.type === 'planet' ? 0.3 : 0.1,
    roughness: body.type === 'planet' ? 0.6 : 0.8
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = false;
  mesh.receiveShadow = false;
  mesh.userData.body = body;
  return mesh;
}

function createBodyInstance(bodyData, parentGroup = scene, parentInstance = null) {
  const group = new THREE.Group();
  parentGroup.add(group);

  const mesh = createBodyMesh(bodyData);
  group.add(mesh);

  if (bodyData.type === 'star') {
    sunLight.position.copy(group.position);
  }

  const orbitLine = bodyData.orbit
    ? buildOrbitLine(bodyData.orbit, bodyData.type === 'moon' ? 0x888888 : 0x3366ff)
    : null;

  if (orbitLine) {
    if (parentGroup === scene) {
      scene.add(orbitLine);
    } else {
      parentGroup.add(orbitLine);
    }
  }

  const instance = {
    data: bodyData,
    group,
    mesh,
    parent: parentInstance,
    orbitLine,
    children: []
  };

  mesh.userData.instance = instance;
  bodyInstances.push(instance);
  interactiveMeshes.push(mesh);

  (bodyData.moons || []).forEach((moon) => {
    const moonInstance = createBodyInstance(moon, group, instance);
    instance.children.push(moonInstance);
  });

  return instance;
}

function computePosition(orbit, elapsedDays) {
  const period = orbit.orbitalPeriodDays;
  const meanMotion = (2 * Math.PI) / period;
  const meanAnomaly = meanMotion * elapsedDays;

  let eccentricAnomaly = meanAnomaly;
  for (let i = 0; i < 6; i += 1) {
    eccentricAnomaly =
      meanAnomaly + orbit.eccentricity * Math.sin(eccentricAnomaly);
  }

  const a = orbit.semiMajorAxisKm * distanceScale;
  const e = orbit.eccentricity;
  const b = a * Math.sqrt(1 - e * e);

  let x = a * (Math.cos(eccentricAnomaly) - e);
  let z = b * Math.sin(eccentricAnomaly);
  let y = 0;

  if (orbit.inclinationDeg) {
    const inc = THREE.MathUtils.degToRad(orbit.inclinationDeg);
    const sinInc = Math.sin(inc);
    const cosInc = Math.cos(inc);
    const rotatedY = z * sinInc;
    const rotatedZ = z * cosInc;
    y = rotatedY;
    z = rotatedZ;
  }

  return new THREE.Vector3(x, y, z);
}

function updateInfoPanel(instance) {
  if (!instance) {
    infoName.textContent = 'Solar System Explorer';
    infoType.textContent = 'Hover over a body to learn more.';
    infoDetails.innerHTML = '';
    infoDescription.textContent =
      'Experience an interactive tour of our solar system. Move the mouse to inspect worlds, drag to orbit the camera, and scroll to zoom.';
    return;
  }

  const { data } = instance;
  infoName.textContent = data.name;
  infoType.textContent =
    data.type === 'moon' ? 'Moon' : data.type === 'star' ? 'Star' : 'Planet';

  const rows = [
    { label: 'Radius', value: `${data.radiusKm.toLocaleString()} km` }
  ];

  if (data.orbit) {
    rows.push({
      label: 'Orbital Period',
      value: `${data.orbit.orbitalPeriodDays.toLocaleString()} days`
    });
    rows.push({
      label: 'Semi-major Axis',
      value: `${(data.orbit.semiMajorAxisKm / 1e6).toFixed(2)} million km`
    });
    if (data.orbit.eccentricity !== undefined) {
      rows.push({
        label: 'Eccentricity',
        value: data.orbit.eccentricity.toFixed(4)
      });
    }
  }

  infoDetails.innerHTML = rows
    .map(
      (row) => `
        <dt>${row.label}</dt>
        <dd>${row.value}</dd>
      `
    )
    .join('');

  infoDescription.textContent = data.description;
}

function updateRaycast() {
  raycaster.setFromCamera(pointer, camera);
  const intersections = raycaster.intersectObjects(interactiveMeshes, true);
  if (intersections.length > 0) {
    const { instance } = intersections[0].object.userData;
    updateInfoPanel(instance);
  } else {
    updateInfoPanel(null);
  }
}

renderer.domElement.addEventListener('pointermove', (event) => {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
});

renderer.domElement.addEventListener('pointerleave', () => {
  pointer.set(-1, -1);
  updateInfoPanel(null);
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animateBodies(elapsedDays) {
  bodyInstances.forEach((instance) => {
    if (instance.data.orbit) {
      const position = computePosition(instance.data.orbit, elapsedDays);
      instance.group.position.set(position.x, position.y, position.z);
    }
  });
}

let startTime = performance.now();
const dayScale = 30; // simulated days per real second

function animate(now) {
  const elapsedMs = now - startTime;
  const elapsedDays = (elapsedMs / 1000) * dayScale;

  animateBodies(elapsedDays);
  updateRaycast();

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

loadBodies()
  .then((dataset) => {
    const sunData = dataset.bodies.find((body) => body.type === 'star');
    const planets = dataset.bodies.filter((body) => body.type === 'planet');

    if (!sunData) {
      throw new Error('Dataset missing sun data.');
    }

    const sunInstance = createBodyInstance(sunData);
    updateInfoPanel(sunInstance);

    planets.forEach((planet) => {
      const planetInstance = createBodyInstance(planet);
      sunInstance.children.push(planetInstance);
    });

    requestAnimationFrame(animate);
  })
  .catch((error) => {
    console.error('Failed to start simulation', error);
    infoName.textContent = 'Unable to load solar system data';
    infoType.textContent = 'Check the console for details.';
  });
