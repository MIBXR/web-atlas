
const materialsShader1 = await fetch(new URL('./materialsShader1.glsl', import.meta.url)).then(response => response.text());
const materialsShader2 = await fetch(new URL('./materialsShader2.glsl', import.meta.url)).then(response => response.text());
const materialsShader3 = await fetch(new URL('./materialsShader3.glsl', import.meta.url)).then(response => response.text());
const materialsShader4 = await fetch(new URL('./materialsShader4.glsl', import.meta.url)).then(response => response.text());
const materialsShader5 = await fetch(new URL('./materialsShader5.glsl', import.meta.url)).then(response => response.text());
const materialsShader6 = await fetch(new URL('./materialsShader6.glsl', import.meta.url)).then(response => response.text());
const materialsShader7 = await fetch(new URL('./materialsShader7.glsl', import.meta.url)).then(response => response.text());

export { materialsShader1, materialsShader2, materialsShader3, materialsShader4, materialsShader5, materialsShader6, materialsShader7 };
