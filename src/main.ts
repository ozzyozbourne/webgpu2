// The first step is check if the webgpu is supported or not
// The next two step are linked
// First we request the webgpu adapter from the navigator.gpu
// the adapater tells info about the browser support for the webgpu, ie which gpu spec can it
// handle it doesnt tell client gpu spec, only the browser spec for handling webgpu
// Then from the adapter we request the devices ie the actual client webgptu device and we can use
// the property present in the adapter to configure the actual client webgpu
// so from adapter we get the actual gpu device
//
// Then we to get the canvas from the html since gpu need a surface to draw to and the canvas is that surface
// then we need to configure canvas type to webgpu since current two types of canvas are support webgl and
// webgpu so we need to configure the canvas to webgpu, so we do that by getting the webpgu context from the canvas
//
// These are the very basic steps for wegpu
// First -> check is webgpu is supported ie check if navigator has a webgpu field
//
// Second -> get the adapter (browser capabilies to handle gpu) and then device (the actual gpu on the client machine)
//
// Third -> get the canvas from the html and get a webgpu context and configure if for webgpu
async function runExample() {
  const msg_array = ["<h1>Ch02_ObjectCreation</h1>"];

  // Check if WebGPU is supported
  if (!navigator.gpu) {
    throw new Error("WebGPU not supported");
  } else {
    msg_array.push("WebGPU supported");
  }

  // Access the GPUAdapter
  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    throw new Error("No GPUAdapter found");
  } else {
    msg_array.push("GPUAdapter found");
  }

  // Access the GPU
  const device = await adapter.requestDevice();
  if (!device) {
    throw new Error("Failed to create a GPUDevice");
  } else {
    msg_array.push("GPUDevice created");
  }

  // Access the canvas
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (!canvas) {
    throw new Error("Could not access canvas in page");
  } else {
    msg_array.push("Accessed canvas in page");
  }

  //Acces the webgpu context from the canvas
  const context = canvas.getContext("webgpu");
  if (!context) {
    throw new Error("Could not obtain WebGPU context for canvas");
  } else {
    msg_array.push("Obtained WebGPU context for canvas");
  }

  // Get the best pixel format for WebGPU
  const format = navigator.gpu.getPreferredCanvasFormat();

  //Configure the context with device and preffered format
  context.configure({
    device: device,
    format: format,
  });

  // Create a command encoder
  const encoder = device.createCommandEncoder();
  if (!encoder) {
    throw new Error("Failed to create a GPUCommandEncoder");
  } else {
    msg_array.push("GPUCommandEncoder created");
  }

  //Create a render pass encoder
  const renderpass = encoder.beginRenderPass({
    colorAttachments: [
      {
        view: context.getCurrentTexture().createView(),
        loadOp: "clear",
        clearValue: { r: 0.2, g: 0.2, b: 1.0, a: 1.0 },
        storeOp: "store",
      },
    ],
  });

  renderpass.end();

  device.queue.submit([encoder.finish()]);

  msg_array.forEach((a) => console.log(a));
}

runExample();
