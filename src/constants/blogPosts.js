export const blogPosts = [
  {
    id: 1,
    slug: 'opengl-light-simulation',
    title: 'Small OpenGL Light Simulation',
    date: 'Project Deep Dive',
    description:
      'A closer look at the Phong lighting demo: ambient, diffuse, and specular lighting with an interactive camera and ImGui controls.',
    content: `# Small OpenGL Light Simulation

This project explores fundamental lighting concepts in computer graphics through an interactive OpenGL application.

## Project Overview

A real-time 3D scene demonstrating the **Phong Reflection Model**, one of the most widely used lighting models in computer graphics.

## The Phong Model

The Phong model combines three types of light reflection:

### 1. Ambient Light

The simplest component—uniform lighting from all directions.

\`\`\`glsl
vec3 ambient = ambientStrength * lightColor;
\`\`\`

This ensures no parts of the scene are completely black, even when not directly lit.

### 2. Diffuse Reflection

Light scattered equally in all directions, creating a matte surface effect.

\`\`\`glsl
float diff = max(dot(norm, lightDir), 0.0);
vec3 diffuse = diff * lightColor;
\`\`\`

The dot product of the surface normal and light direction determines intensity.

### 3. Specular Highlights

Shiny reflections that mimic glossy or polished surfaces.

\`\`\`glsl
vec3 reflectDir = reflect(-lightDir, norm);
float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess);
vec3 specular = spec * lightColor;
\`\`\`

The shininess factor controls how sharp or blurry the highlight is.

## Implementation Details

### Camera Control

Interactive mouse and keyboard controls allow exploration of the scene:
- **Mouse**: Rotate view
- **WASD**: Move through scene
- **Scroll**: Zoom in/out

### ImGui Integration

A user-friendly GUI provides real-time control over:
- Light color and position
- Material properties (ambient, diffuse, specular coefficients)
- Shininess factor
- Background color

This allows immediate visual feedback when tweaking parameters.

### Shader Architecture

The lighting calculations happen in the **fragment shader**, calculated per-pixel for smooth gradients:

\`\`\`glsl
#version 330 core

in vec3 FragPos;
in vec3 Normal;

uniform vec3 lightPos;
uniform vec3 viewPos;
uniform vec3 lightColor;

out vec4 FragColor;

void main() {
    // Normalize for per-pixel lighting
    vec3 norm = normalize(Normal);
    vec3 lightDir = normalize(lightPos - FragPos);
    vec3 viewDir = normalize(viewPos - FragPos);
    
    // Calculate all three components
    vec3 ambient = 0.1 * lightColor;
    
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = diff * lightColor;
    
    vec3 reflectDir = reflect(-lightDir, norm);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
    vec3 specular = spec * lightColor;
    
    vec3 result = (ambient + diffuse + specular) * objectColor;
    FragColor = vec4(result, 1.0);
}
\`\`\`

## What Went Well

✅ **Real-time responsiveness** - ImGui updates feel snappy
✅ **Clear visual feedback** - Changes are immediately visible
✅ **Good educational value** - The separation of lighting components is clear
✅ **Extensible** - Easy to add new materials or light sources

## Challenges & Solutions

### Issue: Shading Artifacts

**Problem**: Visible facets on low-poly models
**Solution**: Increased geometry or used smooth normals from higher-poly bake

### Issue: Light Flickering

**Problem**: Camera movement caused erratic highlights
**Solution**: Normalized all vectors in fragment shader

### Issue: GUI Overlap

**Problem**: ImGui covering important parts of the scene
**Solution**: Made GUI draggable and resizable

## Key Takeaways

1. **Lighting is fundamental** - Good lighting can make simple geometry look amazing
2. **Per-pixel calculations matter** - Fragment shaders are worth optimizing
3. **User feedback loops are crucial** - ImGui made iteration much faster
4. **Math foundations matter** - Understanding dot products and reflections is essential

## Technical Specs

- **Graphics API**: OpenGL 3.3 core
- **Language**: C++17
- **Dependencies**: GLFW, GLEW, GLM, ImGui
- **Model Format**: OBJ files
- **Frame Rate**: 60+ FPS on most hardware

---

This project proved to be an excellent foundation for understanding more complex rendering techniques!
`,
  }
];
