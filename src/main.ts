async function runExample() {
  var msg_array = ["<h1>Ch02_ObjectCreation</h1>"];

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

  // Create a command encoder
  const encoder = device.createCommandEncoder();
  if (!encoder) {
    throw new Error("Failed to create a GPUCommandEncoder");
  } else {
    msg_array.push("GPUCommandEncoder created");
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

  msg_array.forEach((a) => console.log(a));
}

runExample();
