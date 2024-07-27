function initSimulation() {
  var Engine = Matter.Engine,
    Render = Matter.Render,
    Events = Matter.Events,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Runner = Matter.Runner;

  const matterContainer = document.querySelector("#world");
  const THICCNESS = 60;
  let containerWidth = matterContainer.clientWidth;
  let containerHeight = matterContainer.clientHeight;

  // Create an engine
  const engine = Engine.create();

  // Create a renderer
  const render = Render.create({
    element: matterContainer,
    engine: engine,
    options: {
      width: containerWidth,
      height: containerHeight,
      background: "transparent",
      wireframes: false,
      showAngleIndicator: false,
    },
  });

  // Create HTML elements
  const aboutElement = document.getElementById("about");
  const instagramElement = document.getElementById("instagram");
  const randomElement = document.getElementById("random");

  // Create Matter.js bodies
  const about = Bodies.rectangle(
    230,
    140,
    aboutElement.clientWidth,
    aboutElement.clientHeight,
    { chamfer: { radius: 20 }, render: { fillStyle: "transparent" } }
  );
  const instagram = Bodies.rectangle(
    320,
    180,
    instagramElement.clientWidth,
    instagramElement.clientHeight,
    { chamfer: { radius: 20 }, render: { fillStyle: "transparent" } }
  );
  const random = Bodies.rectangle(
    230,
    180,
    randomElement.clientWidth,
    randomElement.clientHeight,
    { chamfer: { radius: 20 }, render: { fillStyle: "transparent" } }
  );

  // Create ground and wallsd
  const ground = Bodies.rectangle(
    containerWidth / 2,
    containerHeight + THICCNESS / 2,
    containerWidth,
    THICCNESS,
    { isStatic: true }
  );

  const leftWall = Bodies.rectangle(
    -THICCNESS / 2,
    containerHeight / 2,
    THICCNESS,
    containerHeight,
    { isStatic: true }
  );

  const rightWall = Bodies.rectangle(
    containerWidth + THICCNESS / 2,
    containerHeight / 2,
    THICCNESS,
    containerHeight,
    { isStatic: true }
  );

  // Create roof
  const roof = Bodies.rectangle(
    containerWidth / 2,
    -THICCNESS / 2,
    containerWidth,
    THICCNESS,
    { isStatic: true }
  );

  Composite.add(engine.world, [
    ground,
    leftWall,
    rightWall,
    roof,
    about,
    instagram,
    random,
  ]);

  // Add mouse control
  const mouse = Mouse.create(render.canvas);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  });

  Composite.add(engine.world, mouseConstraint);

  // Allow scroll through the canvas
  mouseConstraint.mouse.element.removeEventListener(
    "mousewheel",
    mouseConstraint.mouse.mousewheel
  );
  mouseConstraint.mouse.element.removeEventListener(
    "DOMMouseScroll",
    mouseConstraint.mouse.mousewheel
  );

  // Run the renderer
  Render.run(render);

  // Create runner
  const runner = Runner.create();

  // Run the engine
  Runner.run(runner, engine);

  // Sync HTML elements with Matter.js bodies
  function syncElements() {
    aboutElement.style.transform = `translate(${
      about.position.x - aboutElement.clientWidth / 2
    }px, ${about.position.y - aboutElement.clientHeight / 2}px)`;
    instagramElement.style.transform = `translate(${
      instagram.position.x - instagramElement.clientWidth / 2
    }px, ${instagram.position.y - instagramElement.clientHeight / 2}px)`;
    randomElement.style.transform = `translate(${
      random.position.x - randomElement.clientWidth / 2
    }px, ${random.position.y - randomElement.clientHeight / 2}px)`;
  }

  Events.on(engine, "afterUpdate", syncElements);

  // Handle resize with debounce
  let resizeTimeout;
  function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      containerWidth = matterContainer.clientWidth;
      containerHeight = matterContainer.clientHeight;

      // Set canvas size to new values
      render.canvas.width = containerWidth;
      render.canvas.height = containerHeight;

      // Reposition ground and walls
      Matter.Body.setPosition(ground, {
        x: containerWidth / 2,
        y: containerHeight + THICCNESS / 2,
      });

      Matter.Body.setPosition(leftWall, {
        x: -THICCNESS / 2,
        y: containerHeight / 2,
      });

      Matter.Body.setPosition(rightWall, {
        x: containerWidth + THICCNESS / 2,
        y: containerHeight / 2,
      });

      // Reposition roof
      Matter.Body.setPosition(roof, {
        x: containerWidth / 2,
        y: -THICCNESS / 2,
      });
    }, 100); // Adjust debounce time as needed
  }

  window.addEventListener("resize", handleResize);

  // Handle click events to open URLs
  Events.on(mouseConstraint, "mouseup", function (event) {
    var mouseConstraint = event.source;
    var bodies = engine.world.bodies;
    if (!mouseConstraint.bodyB) {
      for (let i = 0; i < bodies.length; i++) {
        var body = bodies[i];
        if (
          Matter.Bounds.contains(body.bounds, mouseConstraint.mouse.position)
        ) {
          var bodyUrl = body.url;
          console.log("Body.Url >> " + bodyUrl);
          if (bodyUrl != undefined) {
            window.open(bodyUrl, "_blank");
            console.log("Hyperlink was opened");
          }
          break;
        }
      }
    }
  });
}

// Initialize the simulation when the element is in view
const matterContainer = document.querySelector("#world");

var observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      initSimulation();
      observer.disconnect();
    }
  });
}, {});

observer.observe(matterContainer);
