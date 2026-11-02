
function appendGetStartedTimeline(mainTimeline, {
  sceneRoot,
  matches,
  cssRoot
}) {
  mainTimeline.label("SPONSORS");
  mainTimeline.label("SPONSORS_END");
  mainTimeline.label("GET_STARTED");
  mainTimeline.add(sceneRoot, {
    id: "scene rotate x 2",
    rotateX: 100,
    z: {
      to: 60,
      ease: "out(3)"
    },
    duration: 4e3,
    ease: "in(2)"
  }, "GET_STARTED");
  mainTimeline.add(sceneRoot, {
    id: "scene y",
    y: matches.minM ? 58 : 200,
    ease: "in(2)",
    duration: 4e3
  }, "GET_STARTED+=350");
  mainTimeline.add(cssRoot, {
    id: "css z 4",
    z: 20,
    duration: 1e3
  }, "GET_STARTED");
  mainTimeline.label("GET_STARTED_END");
  mainTimeline.init();
}

export { appendGetStartedTimeline };
